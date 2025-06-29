const readline = require("readline");
const { spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const bulitinCommands = ["exit", "help", "echo", "clear", "pwd", "cd", "type"];

function prompt() {
  // Arrow function
  rl.question("$ ", (input) => {
    handleInput(input.trim());
  });
}


function handleInput(input){
  
  if(input.includes("&&")){
    const commands = input.split("&&").map(cmd => cmd.trim());
    
    
    for (const cmd of commands) {
      const success = handleCommand(cmd);
      if(!success){
        prompt();
        return;
      }
    }

  prompt();
  }

  
  else if(input.includes("||")){
    const commands = input.split("||").map(cmd => cmd.trim());
    
    for(const cmd of commands){
      const success = handleCommand(cmd);
      if(success){
        break; // Stop on first successful command
      }
    }
    prompt();
  }
  else{
    handleCommand(input);
    prompt();
  }
}


function handleCommand(input) {
  const [command, ...args] = input.split(" ");



  switch (command) {
    case "exit":
      console.log("Exiting shell...");
      rl.close();
      process.exit(0);
      return true;
      break;
    case "help":
      args.join("me");
      for (let index = 0; index < bulitinCommands.length; index++) {
        console.log(bulitinCommands[index] + "\t");
      }
      return true;
      break;

    case "echo":
      console.log(args.join(" "));
      return true;
      break;

    case "clear":
      console.clear();
      return true;
      break;

    case "type":
      if (args.length === 0) {
        console.log("type: missing argument");
        return false;
      } else {
        const cmd = args[0];
        if (bulitinCommands.includes(cmd)) {
          console.log(`${cmd} is a built-in command`);
        } else {
          const which = spawnSync("which", [cmd]);
          if (which.status === 0) {
            const path = which.stdout.toString().trim();
            console.log(`${cmd} is ${path}`);
          } else {
            console.log(`${cmd} is not a built-in command or executable`);
          }
        }
      }

      return true;
      break;
    case "pwd":
      console.log(process.cwd());
      return true;
      break;


    case "cd":
      if (args.length === 0) {
        console.log("cd: missing argument");
      } else {
        const dir = args[0];
        try {
          process.chdir(dir);
        } catch (err) {
          console.error(`cd: ${err.message}`);
        }
      }
      return true;
      break;

    case "ls":
      try {
        const files = fs.readdirSync(process.cwd()); //current working directory
        for (const file of files) {
          process.stdout.write(file + " ");
        }
        console.log(); // New line
      } catch (err) {
        console.error(`ls: error reading directory`);
      }
      return true;
      break;

    default:
      console.log(`${command}: command not found\n`);
      return false;
  }
}

prompt();
