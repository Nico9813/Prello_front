module.exports = {
  env: {
    HOST: process.env.NODE_ENV == 'development'? 'http://localhost:3000' : process.env.HOST,
    API: process.env.NODE_ENV == 'development'? 'http://localhost:5000/' : process.env.API
  },
}