module.exports = {

  env: 'development',

  port: 3000,
  paper_url: 'http://el-carabobeno.com/',

  // logger_token: '6afa2cbc-7b31-4d3c-acce-92684ea14b17',

  redis: {
    // sections storage
    // expired every 5 days
    sections: {
      url:        'redis://localhost:6379/0',
      pass:       '',
      expiryTime: 60 * 60 * 24 * 5
    }
  }

};
