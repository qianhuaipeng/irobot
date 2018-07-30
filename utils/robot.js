// const URI = 'http://127.0.0.1/irobot'
const URI = 'https://qianhuai.natapp4.cc/irobot'
const fetch = require('./fetch')
const platform = 'weixin'
function fetchApi(type, params) {
  return fetch(URI, type, params)
}

function ask(question,userId){
  const params = {question:question,userId:userId,platform:platform}
  //console.log('params:'+params)
  return fetchApi('ask.do', Object.assign(params, { format: 'json' })).then(res => res.data)
}

function getPoetryByTitle(title){
  return fetchApi('data/poetry/findByTitle.do?title='+title).then(res => res.data)
} 

module.exports = { ask, getPoetryByTitle} 