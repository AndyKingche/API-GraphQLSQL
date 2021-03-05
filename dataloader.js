'use strict'
const DataLoader = require('dataloader')
module.exports = ({Users}) =>({
    // 3
    userLoader: new DataLoader(
      keys => batchUsers(Users, keys),
      {cacheKeyFn: key => key.toString()},
    ),
  });