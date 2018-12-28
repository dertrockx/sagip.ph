#!/usr/bin/env sh
set -x

cd $REMOTE_APP_DIR && \
tar zxvf package.tgz -C . && \
mv build/package.json . && \
npm install && \
node build/main.js
