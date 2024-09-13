document
  .getElementById("login-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevenir el comportamiento predeterminado del form

    try {
      const response = await fetch("/.netlify/functions/login", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }

      const data = await response.text();
      console.log("Respuesta del servidor:", data);

      window.location.href = "http://192.168.0.105/scada-vis/#2";
    } catch (error) {
      console.error("Error al hacer la solicitud:", error);
      // Manejar el error, mostrar un mensaje en la UI, etc.
    }
  });
