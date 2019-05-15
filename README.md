# uPortlandia


## Development

Serve pages using:
```
yarn start
```

Start the Serverless Offline APIs:
```
yarn local:api
```

Deploy using

```
yarn deploy:stage
```

and

```
yarn deploy:production
```

## Whitelabel Config

1. Change the [Config](src/constants/config.js)
1. Customize the Static Text: [English](src/constants/i18-en.js) and [Spanish](src/constants/i18-es.js)
1. Change the [Color Palette](src/components/shared/theme.js)
