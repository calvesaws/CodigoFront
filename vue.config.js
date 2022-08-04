const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
  

})
module.exports = {
  devServer: {
        proxy: 'https://d9ej61b4ah.execute-api.us-east-1.amazonaws.com',
    } }
