import axios from 'axios'
const postRequest = async (route, data, headerData) => {
  const post = await axios.post(`http://punkhublive.herokuapp.com/api/v1/${route}`,
  data,
  {headers:headerData}
  )
  return post
}

export default postRequest;
