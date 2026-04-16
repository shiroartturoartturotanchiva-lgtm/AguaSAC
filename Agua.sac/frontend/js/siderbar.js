document.addEventListener('DOMContentLoaded', () => {
    // Coincide con id="btn-menu" en tu HTML
    const btnMenu = document.getElementById('btn-menu');
    // Coincide con id="sidebar" en tu HTML
    const sidebar = document.getElementById('sidebar');
    // Coincide con id="overlay" en tu HTML
    const overlay = document.getElementById('overlay');
    // Coincide con id="btn-logout" en tu HTML
    const btnLogout = document.getElementById('btn-logout');
    // Coincide con class="menu-link" en tu HTML
    const links = document.querySelectorAll('.menu-link');

    // 1. Funcionalidad de las 3 rayitas
    if (btnMenu && sidebar) {
        btnMenu.onclick = () => {
            sidebar.classList.toggle('open');
            if (overlay) overlay.classList.toggle('active');
        };
    }

    // 2. Cerrar menú al hacer clic fuera (overlay)
    if (overlay) {
        overlay.onclick = () => {
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
        };
    }

    // 3. Manejo de botones del menú (Activo y cerrar en móvil)
    links.forEach(link => {
        link.addEventListener('click', () => {
            links.forEach(l => l.classList.remove('activo'));
            link.classList.add('activo');
            
            // Si estás en celular, cierra el menú al hacer clic en una opción
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('open');
                overlay.classList.remove('active');
            }
        });
    });

    // 4. Botón Cerrar Sesión
    if (btnLogout) {
        btnLogout.onclick = (e) => {
            e.preventDefault();
            const confirmar = confirm("¿Estás segura de que deseas cerrar sesión?");
            if (confirmar) {
                window.location.href = 'login.html'; 
            }
        };
    }
});

// Función para cambiar de sección (esta debe estar fuera del DOMContentLoaded)
function mostrarSeccion(seccion) {
    const tabla = document.getElementById('vista-tabla');
    const formulario = document.getElementById('vista-formulario');
    const bread = document.getElementById('breadcrumb');

    if (seccion === 'tabla') {
        tabla.style.display = 'block';
        formulario.style.display = 'none';
        bread.innerText = 'Panel > Lista de Clientes';
    } else {
        tabla.style.display = 'none';
        formulario.style.display = 'block';
        bread.innerText = 'Panel > Registro de Cliente';
    }
}