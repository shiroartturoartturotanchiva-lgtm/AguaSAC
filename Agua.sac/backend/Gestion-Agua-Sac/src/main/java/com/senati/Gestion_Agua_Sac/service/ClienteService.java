package com.senati.Gestion_Agua_Sac.service;

import com.senati.Gestion_Agua_Sac.entity.Cliente;
import com.senati.Gestion_Agua_Sac.repository.ClienteRepository;
import org.springframework.stereotype.Service;
import java.util.List;

/**
 * Capa de Negocio para la gestión de clientes en Gestion_Agua_Sac.
 * Aquí podrías añadir validaciones, como verificar si el cliente tiene deudas
 * antes de permitir su eliminación.
 */
@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;

    // Inyección de dependencias por constructor
    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    // Obtener todos los abonados registrados en la base de datos
    public List<Cliente> listarTodos() {
        return clienteRepository.findAll();
    }

    // Eliminar a un abonado (por ejemplo, por retiro definitivo del servicio)
    public void eliminarCliente(Long id) {
        // Podrías agregar una validación aquí:
        // if (clienteRepository.existsById(id)) ...
        clienteRepository.deleteById(id);
    }
}
