# Serverless Backend - Portfolio
## Development time (10hrs~)


## Requirements
- NodeJS 12.x
- AWS Credentials with required IAM roles
- Serverless CLI

## Technologies
- NodeJs
- TypeScript
- AWS Lambda
- DynamoDB
- Serverless
- Twitter API


## Environment Setup

Clone the project and install dependencies

```bash
git clone https://github.com/ImJesusDev/zemoga-backend.git
```
```bash
cd zemoga-backend
npm i
```


Configure env variables

`cp .env.example .env`

```
TWITTER_TOKEN_URL=https://api.twitter.com/oauth2/token   
TWITTER_TIMELINE_URL=https://api.twitter.com/1.1/statuses/user_timeline.json   
TWITTER_API_KEY=   
TWITTER_API_SECRET=   
```

## Running tests

The project uses jest for tests
```bash
npm run test
```

## Building the project

The project is built with NodeJS and typescript and deployed to AWS lambda through the Serverless Framework. In order to deploy, the project needs to be build first.

```bash
npm run build
```


Before deploying, configure Serverless CLI with the required [AWS credentials](https://www.serverless.com/framework/docs/providers/aws/guide/credentials/) and run

```bash
serverless deploy
```

## Endpoints

The api has the following endpoints:

- POST /users : Creates a new user
body:
```json
{
  firstName: User's First Name
  lastName: User's Last Name
  username: Twitter username
  title: User job title
  photo: Url of user's photo
  description: User's bio
}
```

- GET /users/:userId : Get user by id
- PUT /users/:userId : Update user

- GET /recent-tweets : Return user recent tweets (5)
query params:
```
username: Twitter username
```
