export function notFound() {
  return new Response(undefined, { status: 404 });
}

export function json<T>(data: T, statusCode?: SuccessStatusCode) {
  return new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
    status: statusCode,
  });
}

export function text(payload: string, statusCode?: number) {
  return new Response(payload, { status: statusCode });
}

function serverError(payload?: string | Record<string, string>) {
  let data =
    payload ?? typeof payload === "object" ? JSON.stringify(payload) : payload;
  return new Response(data, { status: 500 });
}

export type SuccessStatusCode = 200 | 201 | 202 | 203;
