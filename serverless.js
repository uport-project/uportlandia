const { config } = require("./setup_config");

const slsConfig = {
  service: config.serviceName,
  provider: {
    name: "aws",
    runtime: "nodejs8.10",
    region: config.region,
    environment: {
      ISSUERS: `$\{ssm:${config.ssmParam.issuers}~true}`
    }
  },
  custom: {
    "serverless-offline": {
      port: 3001
    },
    output: {
      file: "stack.json"
    }
  },
  plugins: [
    "serverless-express",
    "serverless-scriptable-plugin",
    "serverless-plugin-include-dependencies",
    "serverless-offline",
    "serverless-stack-output"
  ],
  functions: {
    server: {
      handler: "src/server.handler",
      timeout: 12,
      events: [{
        http: {
          method: "ANY",
          path: "/{proxy+}",
          cors: config.cors
        }
      }]
    }
  },
  package: {
    exclude: [ "./**" ],
    include: [ "src/server.js" ]
  }
};

module.exports = slsConfig;
