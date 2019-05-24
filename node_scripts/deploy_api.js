const { argParse, run } = require("./helpers");

async function deployAPI() {
  const args = argParse();
  await run("./node_modules/.bin/sls", [ "deploy", "-v", "-s", args.env ]);
}

deployAPI();
