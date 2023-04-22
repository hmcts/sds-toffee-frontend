ARG PLATFORM=""
# Please also upodate acb.tpl.yaml when updating base image.
FROM hmctspublic.azurecr.io/base/node:18-alpine as base

USER root
RUN apk add --no-cache python3 py3-pip make gcc g++
COPY .yarn .yarn
COPY .pnp.cjs .yarnrc.yml package.json yarn.lock ./
RUN corepack enable #&& yarn workspaces focus --production

FROM base as runtime
COPY . .
USER hmcts
