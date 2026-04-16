// URL de tu API en Spring Boot
const API_URL = "http://localhost:8080/api/clientes";

// 1. Función para obtener y mostrar los clientes
async function obtenerClientes() {
    try {
        const respuesta = await fetch(API_URL);
        const clientes = await respuesta.json();

        const tablaBody = document.getElementById('lista-clientes');
        tablaBody.innerHTML = ''; // Limpiar la tabla

        clientes.forEach(cliente => {
            tablaBody.innerHTML += `
            <tr>
                <td>${cliente.id}</td>
                <td>${cliente.nombreCompleto}</td>
                <td>${cliente.dni}</td>
                <td>${cliente.direccion}</td>
                <td>${cliente.estadoMedidor}</td>
                <td>
                    <div class="d-flex gap-2">
                        <button class="btn btn-outline-primary btn-sm d-flex align-items-center px-3" 
                                style="border-radius: 10px; border-color: #6f42c1; color: #6f42c1;"
                                onclick="editarCliente(${cliente.id})">
                            <i class="fas fa-edit me-2"></i> Editar
                        </button>
                        <button class="btn btn-outline-danger btn-sm d-flex align-items-center px-3" 
                                style="border-radius: 10px;"
                                onclick="eliminarCliente(${cliente.id})">
                            <i class="fas fa-trash me-2"></i> Eliminar
                        </button>
                    </div>
                </td>
            </tr>`;
        });
    } catch (error) {
        console.error("Error al conectar con el servidor:", error);
    }
}

// 2. FUNCIÓN PARA GUARDAR (El código que me enviaste antes)
document.getElementById('form-cliente').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nuevoCliente = {
        nombreCompleto: document.getElementById('nombreCompleto').value,
        dni: document.getElementById('dni').value,
        direccion: document.getElementById('direccion').value,
        estadoMedidor: document.getElementById('estadoMedidor').value
    };

    try {
        const respuesta = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevoCliente)
        });

        if (respuesta.ok) {
            alert("¡Cliente guardado con éxito!");
            document.getElementById('form-cliente').reset(); // Limpia el formulario
            mostrarSeccion('tabla'); // Regresa a la lista para ver el cambio
        } else {
            alert("Error al guardar. Revisa si el DNI ya existe.");
        }
    } catch (error) {
        alert("Error al conectar con el servidor.");
    }
});

// 3. FUNCIÓN ELIMINAR
async function eliminarCliente(id) {
    if (confirm("¿Estás seguro de que deseas eliminar este cliente de Agua SAC?")) {
        try {
            const respuesta = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });

            if (respuesta.ok) {
                alert("Cliente eliminado correctamente.");
                obtenerClientes();
            } else {
                alert("Error al eliminar el cliente.");
            }
        } catch (error) {
            alert("No se pudo conectar con el servidor.");
        }
    }
}

// 4. Función para cambiar entre secciones
function mostrarSeccion(seccion) {
    const vistaTabla = document.getElementById('vista-tabla');
    const vistaFormulario = document.getElementById('vista-formulario');
    const breadcrumb = document.getElementById('breadcrumb');

    if (seccion === 'tabla') {
        vistaTabla.style.display = 'block';
        vistaFormulario.style.display = 'none';
        breadcrumb.innerText = "Panel > Lista de Clientes";
        obtenerClientes();
    } else {
        vistaTabla.style.display = 'none';
        vistaFormulario.style.display = 'block';
        breadcrumb.innerText = "Panel > Añadir Cliente";
    }
}

// 5. Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    obtenerClientes();
});