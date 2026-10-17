import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9335;
const FILE_PATH = path.resolve("kvarta_claude", "lighthouse-report.report.html");
const FILE_URL = "file:///" + FILE_PATH.replace(/\\/g, "/");

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const chromeProcess = spawn(
    CHROME,
    [
      `--remote-debugging-port=${PORT}`,
      "--headless=new",
      "--disable-gpu",
      "--hide-scrollbars",
      "--no-first-run",
      "--no-default-browser-check",
      "--user-data-dir=" + path.join(process.cwd(), ".temp-chrome-lh"),
      "about:blank",
    ],
    { stdio: "ignore" }
  );

  try {
    let wsUrl = null;
    for (let i = 0; i < 30; i++) {
      await sleep(300);
      try {
        const res = await fetch(`http://127.0.0.1:${PORT}/json/version`);
        if (res.ok) {
          const data = await res.json();
          wsUrl = data.webSocketDebuggerUrl;
          break;
        }
      } catch {}
    }

    if (!wsUrl) throw new Error("Could not connect to Chrome debugging port");

    const newTabRes = await fetch(`http://127.0.0.1:${PORT}/json/new?${encodeURIComponent(FILE_URL)}`, {
      method: "PUT",
    });
    const tabData = await newTabRes.json();
    const tabWs = new WebSocket(tabData.webSocketDebuggerUrl);

    await new Promise((resolve, reject) => {
      tabWs.onopen = resolve;
      tabWs.onerror = reject;
    });

    let msgId = 1;
    const pending = new Map();
    tabWs.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && pending.has(msg.id)) {
        const { resolve, reject } = pending.get(msg.id);
        pending.delete(msg.id);
        if (msg.error) reject(msg.error);
        else resolve(msg.result);
      }
    };

    function send(method, params = {}) {
      return new Promise((resolve, reject) => {
        const id = msgId++;
        pending.set(id, { resolve, reject });
        tabWs.send(JSON.stringify({ id, method, params }));
      });
    }

    await send("Page.enable");
    await send("DOM.enable");

    // Desktop view of the report
    await send("Emulation.setDeviceMetricsOverride", {
      width: 1200,
      height: 950,
      deviceScaleFactor: 2,
      mobile: false,
    });

    await sleep(2500);

    const shot = await send("Page.captureScreenshot", {
      format: "png",
      captureBeyondViewport: false,
    });

    await fs.mkdir("screenshots", { recursive: true });
    await fs.writeFile("screenshots/claude-lighthouse-mobile.png", Buffer.from(shot.data, "base64"));
    console.log("Successfully captured screenshots/claude-lighthouse-mobile.png");

    tabWs.close();
  } finally {
    chromeProcess.kill();
    try {
      await fs.rm(path.join(process.cwd(), ".temp-chrome-lh"), { recursive: true, force: true });
    } catch {}
  }
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
