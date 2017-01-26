import fetch from 'node-fetch';
const { API_GATEWAY_URL } = process.env;

export async function callAPI(
  method,
  route = '',
  body,
) {
  const response = await fetch(
    `${API_GATEWAY_URL}${route}`, {
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
    console.log(err);
    throw new Error(err);
  }
}
