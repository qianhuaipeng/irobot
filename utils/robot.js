// const URI = 'https://i.xiaoi.com/robot'
const URI = 'https://qianhuai.natapp4.cc/irobot'
const fetch = require('./fetch')

function fetchApi(type, params) {
  return fetch(URI, type, params)
}

function ask(question,userId,platform){
  const params = {question:question,userId:userId,platform:platform}
  // console.log('params:'+params)
  return fetchApi('ask.do', Object.assign(params, { format: 'json' })).then(res => res.data)
}

module.exports = { ask } 