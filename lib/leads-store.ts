import fs from "fs/promises";
import path from "path";
import { LeadPayload, LeadRecord } from "./types";
import { normalizeBelarusPhone } from "./validations";

const DEDUPLICATION_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const LEADS_FILE_PATH = path.join(process.cwd(), "data", "leads.json");

// In-memory cache for fast deduplication and serverless hot-instances
const recentPhonesCache = new Map<string, number>();

/**
 * Checks if phone was submitted within the last 10 minutes
 */
export function isDuplicateSubmission(phone: string): boolean {
  const normalized = normalizeBelarusPhone(phone);
  const now = Date.now();

  // 1. In-memory quick check
  const lastTime = recentPhonesCache.get(normalized);
  if (lastTime && now - lastTime < DEDUPLICATION_WINDOW_MS) {
    return true;
  }

  return false;
}

/**
 * Saves lead to storage, checking 10-minute duplicate policy
 */
export async function saveLead(
  payload: LeadPayload
): Promise<{ record: LeadRecord; isDuplicate: boolean }> {
  const normalizedPhone = normalizeBelarusPhone(payload.phone);
  const now = Date.now();

  // Check in-memory deduplication first
  if (isDuplicateSubmission(payload.phone)) {
    return {
      record: {
        ...payload,
        id: "duplicate",
        createdAt: new Date().toISOString(),
      },
      isDuplicate: true,
    };
  }

  // Check persistent file deduplication (if leads exist on disk)
  let existingLeads: LeadRecord[] = [];
  try {
    const data = await fs.readFile(LEADS_FILE_PATH, "utf-8");
    existingLeads = JSON.parse(data);
    const existingDuplicate = existingLeads.find((lead) => {
      if (normalizeBelarusPhone(lead.phone) === normalizedPhone) {
        const leadTime = new Date(lead.createdAt).getTime();
        return now - leadTime < DEDUPLICATION_WINDOW_MS;
      }
      return false;
    });

    if (existingDuplicate) {
      recentPhonesCache.set(normalizedPhone, new Date(existingDuplicate.createdAt).getTime());
      return {
        record: existingDuplicate,
        isDuplicate: true,
      };
    }
  } catch {
    // File doesn't exist yet or cannot be read, which is fine
  }

  // Register in deduplication cache
  recentPhonesCache.set(normalizedPhone, now);

  // Clean up cache entries older than 20 minutes
  for (const [ph, time] of recentPhonesCache.entries()) {
    if (now - time > DEDUPLICATION_WINDOW_MS * 2) {
      recentPhonesCache.delete(ph);
    }
  }

  // Create new record
  const newRecord: LeadRecord = {
    ...payload,
    id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
  };

  // Persist to file
  try {
    await fs.mkdir(path.dirname(LEADS_FILE_PATH), { recursive: true });
    existingLeads.unshift(newRecord);
    await fs.writeFile(LEADS_FILE_PATH, JSON.stringify(existingLeads, null, 2), "utf-8");
  } catch (err) {
    console.warn("[LeadsStore] Could not write to filesystem (expected in some serverless runtimes):", err);
  }

  return {
    record: newRecord,
    isDuplicate: false,
  };
}

/**
 * Reads all stored leads
 */
export async function getLeads(): Promise<LeadRecord[]> {
  try {
    const data = await fs.readFile(LEADS_FILE_PATH, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}
