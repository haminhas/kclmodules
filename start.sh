rm -rf ./dist
source .env
echo $NODE_ENV
if [ $NODE_ENV = 'production' ]; then
  webpack --config ./webpack.production.config.js --progress --colors
  babel server -d dist
  node dist/server.js
else
  webpack --config ./webpack.config.js --progress --colors
  nodemon server/server --exec babel-node --ignore app/
fi
