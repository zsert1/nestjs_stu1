### 목표

- TypeScript 기반으로 GraphQL, NestJS, node-json-db, RxJS, Jest와 통신 라이브러리를 함께 사용하여 간단한 결제 시스템의 구조를 구현

### 라이브러리

- pnpm
- graphql
- apollo-server-express
- graphql-codegen
- node-json-db
- rxjs
- axios

```
# pnpm 설치
npm install -g pnpm


# GraphQL, Codegen, node-json-db, RxJS, Jest, Axios 설치
pnpm add @nestjs/graphql graphql apollo-server-express @graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/typescript-resolvers node-json-db rxjs axios

# Jest 및 관련 라이브러리 설치
pnpm add -D jest @types/jest ts-jest @nestjs/testing

```
