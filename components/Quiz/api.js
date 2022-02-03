const headers = {
  method: 'POST', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  },
}
export const fetchTrait = async (data) => {
  let response = await fetch('/api/calculate', {
    ...headers,
    body: JSON.stringify(data),
  })
  let res = await response.json()
  return res;
}
