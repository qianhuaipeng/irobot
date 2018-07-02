const URI = 'https://i.xiaoi.com/robot'
const fetch = require('./fetch')

function fetchApi(type, params) {
  return fetch(URI, type, params)
}

function ask(question,userId,platform){
  const params = {question:question,userId:userId,platform:platform}
  console.log('params:'+params)
  return fetchApi('ask.action', Object.assign(params, { format: 'json' })).then(res => res.data)
}

module.exports = { ask }