# a exchange api

exchange api for converting some currency to other currency
also fetching countries and rates of them

## How to run

```bash
npm install
npm start
```

The server runs on `http://localhost:5555`.

## API endpoints
```text
GET /api/countries — get all countries, e.g. /api/countries

GET /api/country — search country by type and its corresponding value, e.g. /api/country?type=code&value=USD
Available type -> value:
'symbol' -> $ ,
'name' -> United States Dollar ,
'code' -> USD

GET /api/convert — convert an amount from one currency to another (live), e.g. /api/convert?from=USD&to=THB&amount=1000
Params:
'from' -> base currency code (e.g. USD)
'to' -> target currency code (e.g. THB)
'amount' -> number to convert (optional, default 1)

GET /api/rates — get all exchange rates for a given code country, e.g. /api/rates?code=USD
```
## Example

Request:

```bash
GET request to: https://localhost:5555//api/convert?from=USD&to=THB&amount=1000
```

Response:

```json
{"from":"USD","to":"THB","amount":1000,"rate":32.555,"result":32555,"date":"2026-06-16"}
```