function mostrarSeccion(seccion) {
    const tabla = document.getElementById('vista-tabla');
    const formulario = document.getElementById('vista-formulario');
    const breadcrumb = document.getElementById('breadcrumb');

    if (seccion === 'formulario') {
        tabla.style.display = 'none';
        formulario.style.display = 'block';
        breadcrumb.innerText = 'Panel > Registro de Cliente';
    } else {
        tabla.style.display = 'block';
        formulario.style.display = 'none';
        breadcrumb.innerText = 'Panel > Clientes';
        obtenerClientes(); // Refresca la lista automáticamente
    }
}

// Al cargar la página, asegurar que se vea la lista
window.onload = () => {
    mostrarSeccion('tabla');
};