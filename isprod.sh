echo $NODE_ENV
if [ $NODE_ENV == production ]
then
  webpack --config ./webpack.production.config.js --progress --colors
fi
