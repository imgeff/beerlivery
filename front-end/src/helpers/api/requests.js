const apiUrl = process.env.REACT_APP_API_URL;

const fetchPost = (body, route, token) => {
  const fetchRoute = fetch(`${apiUrl}/${route}`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: token,
    },
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.log(error));

  return fetchRoute;
};

const getAll = (route) => {
  const fetchRoute = fetch(`${apiUrl}/${route}`)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.log(error));

  return fetchRoute;
};

export { fetchPost, getAll };
