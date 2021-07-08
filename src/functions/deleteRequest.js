import axios from 'axios'
const deleteRequest = async (route, data, headerData) => {
  const del = await axios.post(`https://punkhublive.herokuapp.com/api/v1/${route}`,
  data,
  {headers:headerData}
  )
  return del;
}

export default deleteRequest;
