const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const bulitinCommands = ["exit", "help", "echo", "clear", "pwd", "cd", "type"];

function prompt(){
      // Arrow function
      rl.question("$ ", (input) => {
        handleCommand(input.trim());
        });
} 


function handleCommand(input) {
  const [command, ...args] = input.split(" ");

  const { spawnSync } = require("child_process");
  
  switch (command) {
    case "exit":
      console.log("Exiting shell...");
      rl.close();
      process.exit(0);
      prompt();
      break;
    case "help":
      args.join("me");
      for (let index = 0; index < bulitinCommands.length; index++) {
        console.log(bulitinCommands[index]+"\t"); 
      }
      prompt();
      break;

    case "echo":
      console.log(args.join(" "));
      prompt();
      break;

    case "clear":
          console.clear();
          prompt();
          break;

    case "type":
      if (args.length === 0){
        console.log("type: missing argument");
        prompt();
      }else{
        const cmd = args[0];
        if (bulitinCommands.includes(cmd)) {
          console.log(`${cmd} is a built-in command`);
        } else {
          const which = spawnSync("which", [cmd]);
          if (which.status === 0) {
            const path = which.stdout.toString().trim();
            console.log(`${cmd} is ${path}`);
          }else{
            console.log(`${cmd} is not a built-in command or executable`);
          }
      }
    }

    prompt();
    break;
    case "pwd":
      console.log(process.cwd());
      prompt();
      break;
    default:
      console.log(`${command}: command not found\n`);
      prompt();
  }
}

prompt();
