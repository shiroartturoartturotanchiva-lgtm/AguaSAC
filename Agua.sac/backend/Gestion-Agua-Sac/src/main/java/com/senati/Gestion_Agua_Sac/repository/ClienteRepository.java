package com.senati.Gestion_Agua_Sac.repository;

// Importamos la entidad Cliente y las herramientas de Spring Data JPA
import com.senati.Gestion_Agua_Sac.entity.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Esta interfaz es el puente directo con tu tabla "clientes" en MySQL.
 * Al extender de JpaRepository, ya tienes listos métodos como:
 * - findAll() -> para listar todos.
 * - save() -> para registrar o actualizar.
 * - deleteById() -> para eliminar.
 */
@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    // Aquí podrías agregar búsquedas personalizadas en el futuro, por ejemplo:
    // List<Cliente> findByDni(String dni);
}