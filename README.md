# uPortlandia

uPortlandia is our vision of the future of data and identity management.  We hope that the examples contained within this repository will serve as a guide for your adoption of sovereign identity solution(s).

![uportlandia](https://j.gifs.com/wVrrvr.gif)

What's inside:

- [x] Serverless artifacts created:
  - [x] KMS key for SSM
  - [x] S3 Bucket for static site deployment
  - [x] API gateway lambda function to securely sign claims
- [x] Setup task:
  - [x] Creates Issuer (application) Identities
  - [x] Stores the generated Identity key/pairs in SSM 

### Requirements

- NodeJS 10+
- [Yarn](https://yarnpkg.com) ( `curl -o- -L https://yarnpkg.com/install.sh | bash` )
- Serverless Framework (`npm install serverless -g`)
- AWS (managed by serverless)

### Initial Setup

**Step 1**

Change [setup_config.js](./setup_config.js) to suit your requirements

**Step 2**

Save your AWS credentials in `~/.aws/credentials` under the `[default]` profile.

**Step 3**

```
yarn setup --env stage
```

The setup script
- registers Issuer Entities
- saves private keys and DIDs to SSM parameter store
- deploys the signer lambdas
- builds the static bundle and uploads to an S3 bucket

**Step 4:**

Repeat the process for `--env prod`.


### Running Locally

**Lambdas**

Start Serverless Offline:
```
yarn local:api
```

**Front End**

In a separate terminal window, run
```
yarn start
```
Open http://localhost:3000/


### Deploying Changes

**Lambdas**
```
yarn deploy:api --env stage
```

**Front End**
```
yarn deploy:static  --env stage
```

**Note:** `--env` must be `stage` or `prod`.


## Whitelabel Config

1. Change the [Whitelabel Config](src/constants/config.js)
1. Customize the Static Text: [English](src/constants/i18-en.js) and [Spanish](src/constants/i18-es.js)
1. Change the [Color Palette](src/components/shared/theme.js)


[FAQ and helpdesk support](http://bit.ly/uPort_helpdesk)
