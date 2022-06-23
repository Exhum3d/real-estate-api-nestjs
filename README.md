## Description

A real estate search API built with NestJS.

## Technologies used:

- NestJS
- TypeORM
- ExpressJS
- SQLite

## Entity Relationship Diagram (ERD)
![ERD](./real-estate-erd.png)

## Endpoints
- show all users:
```GET - http://localhost:3000/users```
- show user by id:
```GET - http://localhost:3000/users/{id}```
- update a specific user:
```PATCH - http://localhost:3000/users/{id}```
- delete a specific user:
```DELETE - http://localhost:3000/users/{id}```

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
$ npm run start:prod
```

## License

Nest is [MIT licensed](LICENSE).
# real-estate-api-nestjs
