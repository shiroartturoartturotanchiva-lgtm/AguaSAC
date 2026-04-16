package com.senati.Gestion_Agua_Sac.controller;

import com.senati.Gestion_Agua_Sac.entity.Cliente;
import com.senati.Gestion_Agua_Sac.service.ClienteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clientes") // URL para acceder a los datos
@CrossOrigin(origins = "*") // Permite que otras aplicaciones se conecten
public class ClienteController {

    private final ClienteService clienteService;

    // El constructor conecta el Controlador con el Servicio
    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    // Listar todos los vecinos de Gestion_Agua_Sac
    @GetMapping
    public List<Cliente> listar() {
        return clienteService.listarTodos();
    }

    // Eliminar un cliente por su ID (ej. cuando se da de baja el servicio)
    @DeleteMapping("{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        clienteService.eliminarCliente(id);
        return ResponseEntity.noContent().build();
    }
}
