const form = document.getElementById('loginForm');
    const message = document.getElementById('message');
    const submitBtn = document.getElementById('submitBtn');
    const password = document.getElementById('password');
    const toggle = document.getElementById('togglePassword');
    toggle.addEventListener('click', () => {
      const visible = password.type === 'password';
      password.type = visible ? 'text' : 'password';
      toggle.textContent = visible ? 'Ocultar' : 'Mostrar';
      toggle.setAttribute('aria-label', visible ? 'Ocultar contraseña' : 'Mostrar contraseña');
    });
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const username = document.getElementById('username').value.trim();
      const pass = password.value;
      message.className = 'error';
      if (!username || !pass) { message.textContent = 'Ingresa tu usuario y contraseña.'; return; }
      submitBtn.disabled = true;
      submitBtn.textContent = 'Validando...';
      message.textContent = '';
      try {
        // Cambia esta ruta si tu endpoint JWT de Django es diferente.
        const response = await fetch('/api/token/', {
          method:'POST', headers:{'Content-Type':'application/json'},
          body:JSON.stringify({username, password:pass})
        });
        if (!response.ok) { message.textContent = response.status === 401 ? 'Usuario o contraseña incorrectos.' : 'No fue posible iniciar sesión.'; return; }
        const tokens = await response.json();
        // En una aplicación real, utiliza un diseño de sesión seguro en el backend.
        // No almacenar tokens en localStorage ni exponerlos en la URL.
        message.className = 'success';
        message.textContent = 'Credenciales correctas. Integra aquí la navegación autenticada.';
        console.info('Inicio de sesión correcto', Boolean(tokens.access));
      } catch (error) {
        message.textContent = 'No se pudo conectar al servidor. Verifica que Django esté ejecutándose.';
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Ingresar →';
      }
    });