const updateOrderStatus = (status, saleId) => {
  const requestResult = fetch(`http://localhost:3001/sales/${saleId}`, {
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
