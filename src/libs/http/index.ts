const baseURL = 'http://localhost:3001/';

interface HTTPResponse<T> {
  ok: boolean;
  data: T;
}

export const http = {
  // Use extends on the generic parameter to hint the compiler that it's a generic
  get: <T extends unknown>(url: string, params?: RequestInit): Promise<HTTPResponse<T>> =>
    fetch(`${baseURL}${url}`, {
      ...params,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        ...(params ? params.headers : {}),
      },
      method: 'GET',
    })
      .then(async (res) => {
        if (res.body) {
          return { ok: res.ok, ...(await res.json()) };
        }

        return { ok: false, data: {} };
      })
      .then((res) => {
        if (res.ok) {
          return Promise.resolve(res);
        }

        return Promise.reject(res);
      }),
};
