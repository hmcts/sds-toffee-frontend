ARG PLATFORM=""
FROM hmctspublic.azurecr.io/base/node${PLATFORM}:16-alpine as base

USER root
RUN apk add --no-cache python3 py3-pip make gcc g++
COPY package.json yarn.lock ./
RUN corepack enable
RUN yarn plugin import workspace-tools
RUN yarn workspaces focus --production

FROM base as runtime
COPY . .
USER hmcts
