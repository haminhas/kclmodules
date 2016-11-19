// const { API_GATEWAY_URL } = process.env;

export async function callAPI(
  method,
  route = '',
  body,
  fetch = global.fetch
) {
  const response = await fetch(
    `http://localhost:3000${route}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body && JSON.stringify({
        ...body,
      }),
    }
  );
  return await response.json();
}

export default function* fetchWrapper(...args) {
  try {
    const response = yield callAPI(...args);
    return response;
  } catch (err) {
    throw new Error(err);
  }
}
