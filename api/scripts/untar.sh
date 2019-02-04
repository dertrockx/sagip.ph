#!/usr/bin/env sh
set -x

PATH=/home/rrsilaya/.nvm/versions/node/v10.8.0/bin/:$PATH && \
cd /home/rrsilaya/apps/sagip.ph && \
tar zxvf package.tgz -C . && \
mv build/package.json . && \
npm install && \
pm2 restart build/main.js
