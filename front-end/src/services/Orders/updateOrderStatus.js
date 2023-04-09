const apiUrl = process.env.REACT_APP_API_URL;

const updateOrderStatus = (status, saleId) => {
  const requestResult = fetch(`${apiUrl}/sales/${saleId}`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      console.error(error);
      return error;
    });

  return requestResult;
};

export default updateOrderStatus;
