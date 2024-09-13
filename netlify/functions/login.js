export default async (request, context) => {
  try {
    // Primer fetch (GET a http://192.168.0.105/scada-vis/)
    const response1 = await fetch("http://192.168.0.105/scada-vis/", {
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "es-419,es;q=0.9",
        authorization: "Basic YWRtaW46YWRtaW4=",
        "cache-control": "max-age=0",
        "upgrade-insecure-requests": "1",
        cookie: "user_language=; x-logout=0; x-auth=; x-login=1; x-fail-cnt=0",
      },
      method: "GET",
    });

    const data1 = await response1.text();

    // Segundo fetch (POST a http://192.168.0.105/apps/localbus.lp?)
    const response2 = await fetch("http://192.168.0.105/apps/localbus.lp?", {
      headers: {
        "accept": "application/json, text/javascript, */*; q=0.01",
        "accept-language": "es-419,es;q=0.9",
        "authorization": "Basic YWRtaW46YWRtaW4=",
        "x-requested-with": "XMLHttpRequest",
        cookie: "user_language=; x-auth=; x-fail-cnt=0; pin=; x-logout=0; x-login=1",
        Referer: "http://192.168.0.105/apps/",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      method: "POST",
    });

    const data2 = await response2.json();

    // Combina los resultados de ambos fetch
    const combinedData = {
      scadaVisData: data1,  // Respuesta del primer fetch (HTML)
      localbusData: data2,  // Respuesta del segundo fetch (JSON)
    };

    // Retorna la respuesta combinada a Netlify
    return new Response(JSON.stringify(combinedData), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // Permite todas las solicitudes de origen
        "Access-Control-Allow-Methods": "GET, POST",
      },
    });
  } catch (error) {
    // Manejo de errores en caso de que alguno de los fetch falle
    return new Response(`Error fetching data: ${error.message}`, {
      status: 500,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
};
