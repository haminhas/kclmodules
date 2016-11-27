rm -rf ./dist
echo $NODE_ENV
if [ $NODE_ENV = 'production' ]; then
  webpack --config ./webpack.production.config.js --progress --colors
  babel server -d dist
  node dist/server.js
else
  webpack
  nodemon server/server --exec babel-node --ignore app/
fi
