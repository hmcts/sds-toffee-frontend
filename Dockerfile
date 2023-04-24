# ---- Base image ----
FROM hmctspublic.azurecr.io/base/node:18-alpine as base

USER root
RUN apk add --no-cache python3 py3-pip make gcc g++
COPY .yarn .yarn
COPY .pnp.cjs .yarnrc.yml package.json yarn.lock ./
RUN corepack enable
USER hmcts

COPY --chown=hmcts:hmcts . .

# ---- Build image ----
FROM base as build

RUN yarn build:prod && \
    rm -rf webpack/ webpack.config.js

# ---- Runtime image ----
FROM base as runtime

COPY --from=build $WORKDIR/src/main ./src/main
# TODO: expose the right port for your application
EXPOSE 3100
