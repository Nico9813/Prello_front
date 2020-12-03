module.exports = {
  env: {
    HOST: process.env.NODE_ENV == 'development'? '127.0.0.1:3000' : process.env.HOST 
  },
}