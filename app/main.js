const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function prompt(){

      rl.question("$ ", (answer) => {
        if(answer.trim() === "exit"){
          console.log("Exiting shell...");
          rl.close();
        } 
        else{
      console.log(`${answer}: command not found\n`);
      //recursively call prompt
      prompt();
    }}
  );  
}

prompt();