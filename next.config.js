const os = require("os");

function getDevOrigins() {
  const base = [
    "localhost",
    "localhost:3000",
    "127.0.0.1",
    "127.0.0.1:3000",
    "26.197.165.199",
    "26.197.165.199:3000",
  ];

  try {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
      for (const iface of interfaces[name] || []) {
        if (iface.family === "IPv4") {
          base.push(iface.address);
          base.push(`${iface.address}:3000`);
        }
      }
    }
  } catch (e) {
    // Ignore error
  }

  return Array.from(new Set(base));
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: getDevOrigins(),
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = nextConfig;
