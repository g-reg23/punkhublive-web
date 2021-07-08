import axios from 'axios'
const putRequest = async (route, data, headerData) => {
  const put = await axios.put(`https://punkhublive.herokuapp.com/api/v1/${route}`,
  data,
  {headers:headerData}
  )
  return put
}

export default putRequest;
