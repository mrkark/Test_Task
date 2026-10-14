import { normalizeBelarusPhone, isValidBelarusPhone } from "./lib/validations.ts";
import { saveLead, isDuplicateSubmission } from "./lib/leads-store.ts";

async function runTests() {
  console.log("=== Testing Belarusian Phone Validation ===");
  const testCases = [
    { phone: "+375 (29) 123-45-67", expected: true },
    { phone: "80336789012", expected: true },
    { phone: "+375447654321", expected: true },
    { phone: "+375259876543", expected: true },
    { phone: "+375172001122", expected: true }, // Minsk landline
    { phone: "+79991234567", expected: false }, // Russian number -> reject
    { phone: "+375 (22) 123-45-67", expected: false }, // Invalid code
    { phone: "12345", expected: false },
  ];

  let passed = 0;
  for (const tc of testCases) {
    const valid = isValidBelarusPhone(tc.phone);
    if (valid === tc.expected) {
      console.log(`✓ "${tc.phone}" -> ${valid}`);
      passed++;
    } else {
      console.error(`✗ "${tc.phone}" -> got ${valid}, expected ${tc.expected}`);
    }
  }

  console.log(`\nPhone validation tests: ${passed}/${testCases.length} passed.`);

  console.log("\n=== Testing 10-Minute Deduplication & Persistence ===");
  const testLead = {
    name: "Иван Тестовый",
    phone: "+375 (29) 999-88-77",
    interest: "Эфиопия Иргачеффе",
    comment: "Помол под воронку V60",
    utm_source: "instagram_ad",
    utm_medium: "stories",
  };

  const res1 = await saveLead(testLead);
  console.log("1st submission isDuplicate:", res1.isDuplicate);

  const res2 = await saveLead(testLead);
  console.log("2nd submission (within 10 min) isDuplicate:", res2.isDuplicate);

  if (!res1.isDuplicate && res2.isDuplicate) {
    console.log("✓ Deduplication successfully blocked duplicate submission!");
  } else {
    console.error("✗ Deduplication check failed!");
  }
}

runTests().catch(console.error);
