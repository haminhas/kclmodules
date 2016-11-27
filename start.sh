rm -rf ./dist
echo $NODE_ENV
if [ $NODE_ENV = 'production' ]; then
  webpack --config ./webpack.production.config.js --progress --colors
  babel server -d dist
  nodemon dist/server.js
else
  npm i
  webpack
  node server/server --ignore app/
fi
