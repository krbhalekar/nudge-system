# AI-Powered Retail Performance Nudge System for FMCG Brand

Design and implement a scalable system using NodeJS, ExpressJS, MongoDB, Redis and OpenAI to analyze high-volume retailer sales data and automatically generate nudges based on individualperformance or group behavior trends.

## Features

- Create Sales Entry API
- Store the Sales Entry in MongoDB
- Create Nudge API for a specific Retailer ID
- Checks and Compares Last Month and Total Month Sales, Analyse the Sales Drop > 30%
- Pass the Nudge Message to Open AI

## Project Structure

```text
nudge_system/
├── config/
├── controller/
├── jobs/
├── models/
├── node_modules/
├── routes/
├── services/
└── .dockerignore
└── .env
└── app.js
└── docker-compose.yml
└── Dockerfile
└── package.json
└── queue.js
└── README.md
```

## Usage

- Run the below command to install all NodeJS packages and dependencies
  ```bash
  npm install

- Create .env file if not present
  ```bash
  MONGO_URI=mongodb://localhost:27017/fmcg
  OPENAI_API_KEY=<OPENAI_API_KEY>
  SERVER_PORT=9766

- Run the docker command as mentioned below
  ```bash
  docker-compose up --build


## Example

- Create Sales Entry API
  ```bash
  curl --location 'http://localhost:9766/api/sales' \--header 'Content-Type: application/json' \--data '{"date": "2025-04-26T00:00:00.000Z","retailerId": "RET101","invoiceNo": "INV1001",   "brandId": "BRD001","itemId": "ITEM789","qty": 200,"rate": 50,"amount": 10000}'

- Create Nudge API for a specific Retailer ID
  ```bash
  curl --location 'http://localhost:9766/trigger-nudge' \--header 'Content-Type: application/json' \--data '{"retailerId": "RET101"}'
