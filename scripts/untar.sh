#!/usr/bin/env sh
set -x

cd /home/rrsilaya/apps/sagip.ph && \
tar zxvf package.tgz -C . && \
mv build/package.json . && \
npm install && \
node build/main.js
