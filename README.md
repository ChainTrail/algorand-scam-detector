# Scam Detector by Chaintrail

A simple and easy to use API in order to identify whether a transaction is a known scam or not. This service relies on the free to use indexer by [Nodely.io](https://nodely.io) and the domain & addresses blacklist maintained by [Chaintrail.io](https://chaintrail.io).

Scam Detector is developed to be deployed on Cloudflare Workers, which is a serverless solution. This repository is maintained by NFNomad, the creator of Chaintrail.io. Although everyone is invited to contribute, improve or run their own version of the Scam Detector API.

## How to integrate

You can simply use the hosted version available on [scam-detector.chaintrail.io](https://scam-detector.chaintrail.io). There you can use the `/api/scam/{txId}` endpoint to validate whether a response is a scam.

```json
{
   "success":true,
   "scam":{
      "txId":"EIJR63IRTZ22NMVGPNOLJ77XFZFGBQAMTLCHC5EVLQI5A4MDQTJQ",
      "isScam":true
   }
}
```

If `scam.isScam` is `true`, the transaction is deemed a known scam by the system. This means you can show a warning message around the note field or simply on top of a transaction view. 

If you like to give a bit more information to the end-user. You can link to our explainer page by creating a link to `scam-detector.chaintrail.io/scam/{txId}` where end-users can get more information from.

## Get started

1. Sign up for [Cloudflare Workers](https://workers.dev). The free tier is more than enough for a dApp with decent traffic.
2. Clone this project and install dependencies with `npm install`
3. Run `wrangler login` to login to your Cloudflare account in wrangler
4. Run `wrangler deploy` to publish the API to Cloudflare Workers

## Project structure

1. The main router, including docs, is described in `src/index.ts`.
2. scamDetectorFetch is registered under `src/endpoints/`.
3. The utils folder contains utility classes which are used to fetch a transaction, fetch the latest blacklist and validate a transaction.

## Development

1. Run `wrangler dev` to start a local instance of the API.
2. Open `http://localhost:8787/` in your browser to see the Swagger interface where you can try the endpoints.
3. Changes made in the `src/` folder will automatically trigger the server to reload, you only need to refresh the Swagger interface.
