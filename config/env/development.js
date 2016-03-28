module.exports = {

  env: 'development', // process.env.NODE_ENV

  port: 3000,
  paper_url: 'http://el-carabobeno.com/',

  logger_token: '',
  newrelic_key: '',

  redis: {
    // sections storage
    // expired every 5 days
    sections: {
      url:        'redis://localhost:6379/0',
      expiryTime: 60 * 60 * 24 * 5
    }
  }

};
