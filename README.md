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