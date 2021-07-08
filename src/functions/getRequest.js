import axios from 'axios'
const getRequest = async (route, data, headerData) => {
  const get = await axios.get(`https://punkhublive.herokuapp.com/api/v1/${route}`,
  {headers:headerData}
  )
  return get;
}

export default getRequest;
