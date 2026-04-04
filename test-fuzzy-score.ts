import { fuzzyScore } from "./utils/commands";

const tests = [
  { query: "cmd", target: "CommandPalette.tsx", expected: true },
  { query: "top", target: "TopBar.tsx", expected: true },
  { query: "abc", target: "def", expected: false },
  { query: "app", target: "AppShell.tsx", expected: true },
  { query: "proj", target: "ProjectsTab.tsx", expected: true },
];

console.log("Running fuzzyScore tests...");

let passed = 0;
for (const test of tests) {
  const result = fuzzyScore(test.query, test.target);
  const isOk = test.expected ? result !== null : result === null;
  if (isOk) {
    passed++;
    console.log(`✅ Passed: query="${test.query}", target="${test.target}", result=${result}`);
  } else {
    console.log(`❌ Failed: query="${test.query}", target="${test.target}", result=${result}, expected=${test.expected}`);
  }
}

console.log(`\nTests finished: ${passed}/${tests.length} passed.`);
if (passed !== tests.length) {
  process.exit(1);
}
