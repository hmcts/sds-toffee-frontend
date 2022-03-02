FROM hmctspublic.azurecr.io/base/node:12-alpine as base

RUN apk add --no-cache python3 py3-pip
COPY package.json yarn.lock ./
RUN yarn install --production

FROM base as runtime
COPY . .
USER hmcts
