const headers = {
  method: 'POST', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  },
}
export const fetchTrait = async (data) => {
  // fetch('/api/calculate', { ...headers, body: JSON.stringify(data) })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     return data
  //   })
  //   .catch((error) => {
  //     return error
  //   })
  let response = await fetch('/api/calculate', {
    ...headers,
    body: JSON.stringify(data),
  })
  let res = await response.json()
  return res;
}
