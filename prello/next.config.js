module.exports = {	
  env: {	
    HOST: process.env.NODE_ENV == 'development'? 'http://localhost:3000/' : process.env.HOST,	
    API: process.env.NODE_ENV == 'development'? 'http://127.0.0.1:5001/' : process.env.API,	
    REALTIME_HOST: process.env.NODE_ENV == 'development'? 'ws://localhost:8000/' : process.env.REALTIME_HOST
  },	
} 