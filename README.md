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

- Add Husky Git hooks_

- Add semantic versioning

- GitHub Actions
