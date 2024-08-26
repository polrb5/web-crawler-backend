# Web Crawler Backend

## Table of Contents

- [Project Setup](#project-setup)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Building the Application](#building-the-application)
  - [Running the Application Locally](#running-the-application-locally)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [API](#api)
- [Testing](#testing)
- [License](#license)
- [Author](#author)

## Project Setup

### Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: Version 16.x or higher
- **Yarn**: Latest version

### Installation

1. **Clone the repository**:

   ```bash
   git clone git@github.com:polrb5/web-crawler-backend.git
   cd web-crawler-backend

   ```

2. **Install dependencies using Yarn:**:
   ```sh
   yarn install
   ```

#### Building the Application

To build the application (lint JavaScript and compile LESS files), run:

```sh
yarn build
```

#### Running the Application Locally

1. **Set up environment variables**: Create a `.env` file in the root directory with the following content::
   ```bash
   MONGODB_URI=
   JWT_SECRET=
   PORT=
   ```
   Replace the placeholders with your actual values. You can use the provided .env.example file as a template:

```bash
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
PORT=3003
```

2. **Start the server**:
   ```bash
   yarn start
   ```

## Usage

The Web Crawler Backend application allows users to interact with a web crawling service via a GraphQL API. Key functionalities include:

- **User Registration and Login**: Allows users to register and log in to obtain authentication tokens.
- **Crawl Job Management**: Users can create crawl jobs by providing a URL, which the application then processes to find and store URLs from the specified site.
- **Job Status Retrieval**: Users can query the status and results of their crawl jobs.

The application provides endpoints to perform these actions, manage user authentication, and interact with the web crawling service.

## Technologies Used

- **Node.js**: JavaScript runtime
- **TypeScript**: For type-safe development
- **Express**: Web framework for Node.js
- **GraphQL**: API query language
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling tool
- **Bcryptjs**: Password hashing library
- **Jest**: Testing framework
- **Prettier**: Code formatter
- **ESLint**: Linting tool

## API

### GraphQL Schema

- **User**:

  - `id`: ID!
  - `email`: String!

- **CrawlJob**:

  - `id`: ID!
  - `url`: String!
  - `status`: String!
  - `foundUrls`: [String!]!

- **AuthPayload**:
  - `token`: String!

### Queries

- **getCrawlJob(id: ID!)**

  ```graphql
  query {
    getCrawlJob(id: "job-id") {
      id
      url
      status
      foundUrls
    }
  }
  ```

### Mutations

- **register(email: String!, password: String!)**

  ```graphql
  mutation {
    register(email: "user@example.com", password: "password123") {
      token
    }
  }
  ```

- **login(email: String!, password: String!)**

  ```graphql
  mutation {
    login(email: "user@example.com", password: "password123") {
      token
    }
  }
  ```

- **createCrawlJob(url: String!)**

  ```graphql
  mutation {
    createCrawlJob(url: "http://example.com") {
      id
      url
      status
      foundUrls
    }
  }
  ```

##Testing

- **Run Tests**:
  ```bash
  yarn test
  ```
  - **Run Tests in watch Mode**:
  ```bash
  yarn test:watch
  ```

## License

This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) License - see the LICENSE file for details.

## Author

Pol Reig
[polreigbroto@gmail.com](polreigbroto@gmail.com)
