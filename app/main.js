const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Uncomment this block to pass the first stage
rl.question("$ ", (answer) => {
  console.log(`${answer}: command not found\n`);
  r1.close();
});
