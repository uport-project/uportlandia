const readline = require("readline");
const { spawn } = require("child_process");
const args = require("commander");

module.exports.argParse = function argParse() {
  args.option("--env <n>", "env").parse(process.argv);
  if(!args.env) {
    console.error("--env missing");
    process.exit(1);
  }
  if(!["stage", "prod"].find(s => s === args.env)) {
    console.error("--env must be one of stage, prod ")
    process.exit(1);
  }
  return args;
}

module.exports.run = async function(cmd, args, options={}) {
  options = {
    ...options,
    shell: true,
    stdio: "inherit"
  };
  const proc = spawn(cmd, args, options);
  return new Promise((resolve, reject) => {
    proc.on("close", (code) => {
      if(code) {
        reject();
      } else {
        resolve();
      }
    });
  });
}

module.exports.getInput = async function getInput(message) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  return new Promise((resolve, reject) => {
    rl.question(message, response => {
      rl.close();
      resolve(response);
    });
  });
}
