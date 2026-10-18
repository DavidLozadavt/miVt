
const formulario = document.getElementById("registroForm");
const mensaje = document.getElementById("mensaje");
const boton = document.getElementById("btnRegistro");

formulario.addEventListener("submit", async function (event) {
    event.preventDefault();

    const datos = {
        first_name: document.getElementById("first_name").value.trim(),
        last_name: document.getElementById("last_name").value.trim(),
        username: document.getElementById("username").value.trim(),
        email: document.getElementById("email").value.trim(),
        telefono: document.getElementById("telefono").value.trim(),
        password: document.getElementById("password").value
    };

    const confirmar = document.getElementById("confirmar").value;

    mensaje.className = "";

    if (datos.password !== confirmar) {
        mensaje.textContent = "Las contraseñas no coinciden.";
        mensaje.className = "error";
        return;
    }

    boton.disabled = true;
    mensaje.textContent = "Registrando usuario...";

    try {
        const respuesta = await fetch("/api/registro/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datos)
        });

        const resultado = await respuesta.json();

        if (respuesta.ok) {
            mensaje.textContent = "Usuario registrado correctamente.";
            mensaje.className = "exito";
            formulario.reset();

            // El usuario puede iniciar sesión con JWT.
            // No generamos tokens durante el registro.
        } else {
            const errores = Object.entries(resultado)
                .map(([campo, detalle]) => `${campo}: ${detalle}`)
                .join(" | ");

            mensaje.textContent = errores || "No se pudo registrar.";
            mensaje.className = "error";
        }

    } catch (error) {
        mensaje.textContent = "No se pudo conectar con Django.";
        mensaje.className = "error";
    } finally {
        boton.disabled = false;
    }
});
