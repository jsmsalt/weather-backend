## Description

A simple weather API developed in NestJS. Here is a [demo](https://weather-backend.up.railway.app/docs).

## Features

- Weather, Forecast and Geolocation endpoints
- Modular Architecture
- DTOs Validation/Transformation
- Rate Limiting
- Caching Responses (Redis)
- Swagger/OpenAPI Documentation (/docs)
- Unit Testing
- E2E Testing

## Documentation

`http//localhost:8080/docs`

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run build
$ npm run start:prod

# docker
$ docker-compose up -d
```

## Ngrok

Use [Ngrok](https://ngrok.com/) to expose the app on a public URL in development mode to manually test the geolocation feature.

```bash
$ ngrok http 8080
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## TODO

- Add Husky Git hooks\_

- Add semantic versioning

- GitHub Actions

.
