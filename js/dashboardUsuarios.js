

document.addEventListener('DOMContentLoaded', () => {
    // auth.js se encarga de la seguridad.
    
    const tablaUsuariosBody = document.getElementById('tabla-usuarios-body');

    async function cargarUsuarios() {
        try {
            const response = await fetch('https://dummyjson.com/users');
            if (!response.ok) throw new Error('Error al cargar los datos de usuarios.');
            
            const data = await response.json();
            renderizarTabla(data.users);

        } catch (error) {
            tablaUsuariosBody.innerHTML = `<tr><td colspan="6" class="text-center text-danger p-4">${error.message}</td></tr>`;
        }
    }

    function renderizarTabla(users) {
        tablaUsuariosBody.innerHTML = '';
        if (users.length === 0) {
            tablaUsuariosBody.innerHTML = `<tr><td colspan="6" class="text-center p-4">No se encontraron usuarios.</td></tr>`;
            return;
        }
        users.forEach(user => {
            // Se omite deliberadamente información sensible como contraseñas, etc.
            tablaUsuariosBody.innerHTML += `
                <tr>
                    <td>${user.id}</td>
                    <td><img src="${user.image}" alt="Avatar" class="rounded-circle" style="width: 40px; height: 40px; object-fit: cover;"></td>
                    <td>${user.firstName} ${user.lastName}</td>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td>${user.phone}</td>
                </tr>
            `;
        });
    }

    cargarUsuarios();
});