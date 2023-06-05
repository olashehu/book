<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# NestJS Book API

A RESTful API built with NestJS for managing books.

### Features
- Create a new book
- Retrieve all books
- Retrieve a book by ID
- Update a book by ID
- Delete a book by ID
- Create a new category
- Retrieve all category

### Prerequisites

- Node.js (version X.X.X)
- npm (version X.X.X)
- postgresql a database

### Installation

1 Clone the repository:
```
https://github.com/olashehu/book.git
```

Clone the repository
```bash
https://github.com/olashehu/book.git
```

2 Install dependencies:
```
cd book
npm install
```

3 Configure the environment variables:
Create a .env file in the project root directory and provide the necessary environment variables:
```
DATABASE_USERNAME=postgres
DATABASE_PASSWORD='your password'
DATABASE_NAME='your database name'
DATABASE_PORT='your database port'
HOST=localhost
DATABASE_LOGGING=true
PORT=4000
NODE_ENV=development
```

Modify the .env file according to your postgresql database configuration.

## Usage
1 Start the server:
```
# watch mode
npm run start:dev
```

2 The API will be accessible at http://localhost:4000.

## API Endpoints
- GET /v1/books - Retrieve all books
- GET /v1/books/:id - Retrieve a book by ID
- POST /v1/books - Create a new book
- PUT /v1/books/:id - Update a book
- DELETE /v1/books/:id - Delete a book
- POST /v1/categories - Create a new categories
- GET /v1/categories - Retrieve all categories

### Request Body To Create A Book
```
{
    "name": "Book 1",
    "author": "Author name",
    "price": 400,
    "description": "Book description 5",
    "fileUrl": "home.png",
    "coverImage": "cover.jpeg",
    "categoryId": 5,
    "readTime": 18
}
```
### Response Body (Create/Get Single Book)
```
{
  id: rtyu123,
  name: Book name,
  author: Author name,
  price: price,
  description: description,
  fileUrl: name.jpeg,
  categoryId: 1,
  readTime: 5,
  coverImage: name.png,
  tags: [tags],
  category: {
    id: 1,
  },
}
```
### Retrieve all books
Request
```
GET /v1/books
```
### Response:

```
books: [
   {
     "id": "uqCVG-FA3",
     "name": "Test book",
     "author": "Shehu",
     "price": 1000,
     "readCount": 0,
     "viewCount": 0,
     "description": null,
     "coverImage": "cover.jpeg",
     "fileUrl": "home.png",
     "tags": [],
     "readTime": 5,
     "createdAt": "2023-06-04T23:59:42.665Z",
     "updatedAt": "2023-06-04T23:59:42.665Z"
  },
  {
     "id": "5ZBTTRdvU",
     "name": "Book 3",
     "author": "Micheal",
     "price": 500,
     "readCount": 0,
     "viewCount": 0,
     "description": "Book description 3",
     "coverImage": "cover.jpeg",
     "fileUrl": "home.png",
     "tags": [],
     "readTime": 2,
     "createdAt": "2023-06-05T00:14:28.496Z",
     "updatedAt": "2023-06-05T00:14:28.496Z"
  },
]
```
### Retrieve a book by ID
Request

```
GET /v1/book/ruhfg-5y8
```
### Response:

```
{
    "id": "PCms5ZZV5",
    "name": "Book 5",
    "author": "Kausara",
    "price": 400,
    "readCount": 0,
    "viewCount": 0,
    "description": "Book description 5",
    "coverImage": "cover.jpeg",
    "fileUrl": "home.png",
    "tags": [],
    "readTime": 18,
    "createdAt": "2023-06-05T01:53:35.559Z",
    "updatedAt": "2023-06-05T01:53:35.559Z",
    "category": {
        "id": 5,
        "name": "Drama",
        "description": "Category description",
        "createdAt": "2023-06-05T01:40:20.269Z",
        "updatedAt": "2023-06-05T01:40:20.269Z"
    }
}
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Shehu Abdulkadir]

## License

Nest is [MIT licensed](LICENSE).
