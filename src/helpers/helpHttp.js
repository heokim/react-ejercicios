export const helpHttp = () => {
  const customFetch = (endpoint, options) => {
    const defaultHeaders = {
      accept: "application/json",
    };

    // constrollador para poder abortar el fetch, cuando no recibe respuesta del servidor porque este esta caido
    const controller = new AbortController();
    options.signal = controller.signal;

    // settea el METODO del fetch, por defecto "GET"
    options.method = options.method || "GET";

    // settea el HEADERS del fetch
    options.headers = options.headers ? { ...defaultHeaders, ...options.headers } : defaultHeaders;

    // settea el BODY del fetch
    options.body = JSON.stringify(options.body) || false;
    if (!options.body) delete options.body;

    // imprimimos las opciones que va a tener finalmente el fetch
    console.log("options:", options);

    // para controllar si le llega respuesta del servidor a esperar X milisegundos
    setTimeout(() => controller.abort(), 3000);

    return fetch(endpoint, options)
      .then((res) =>
        res.ok
          ? res.json()
          : Promise.reject({
              err: true,
              status: res.status || "00",
              statusText: res.statusText || "Ocurrio un Error",
            })
      )
      .catch((err) => err);
  };

  const get = (url, options = {}) => customFetch(url, options);

  const post = (url, options) => {
    options.method = "POST";
    return customFetch(url, options);
  };

  const put = (url, options) => {
    options.method = "PUT";
    return customFetch(url, options);
  };

  const del = (url, options) => {
    options.method = "DELETE";
    return customFetch(url, options);
  };

  return {
    get,
    post,
    put,
    del,
  };
};
