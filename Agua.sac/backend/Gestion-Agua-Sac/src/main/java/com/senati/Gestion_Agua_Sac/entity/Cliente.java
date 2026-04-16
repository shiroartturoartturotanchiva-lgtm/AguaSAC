package com.senati.Gestion_Agua_Sac.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "clientes")
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "nombre_completo", nullable = false)
    private String nombreCompleto;

    @Column(nullable = false, unique = true, length = 8)
    private String dni;

    private String direccion;
    private String referencia; // Coincide con tu SQL
    private String celular;

    @Column(name = "fecha_registro")
    private LocalDate fechaRegistro; // Coincide con tu DATE de SQL

    @Column(name = "estado_medidor")
    private String estadoMedidor; // Asegúrate de que la 'e' sea minúscula aquí

    public Cliente() {}

    // Getters y Setters (Usa el clic derecho -> Generate -> Getter and Setter)
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getNombreCompleto() { return nombreCompleto; }
    public void setNombreCompleto(String nombreCompleto) { this.nombreCompleto = nombreCompleto; }
    public String getDni() { return dni; }
    public void setDni(String dni) { this.dni = dni; }
    public String getDireccion() { return direccion; }
    public void setDireccion(String direccion) { this.direccion = direccion; }
    public String getReferencia() { return referencia; }
    public void setReferencia(String referencia) { this.referencia = referencia; }
    public String getCelular() { return celular; }
    public void setCelular(String celular) { this.celular = celular; }
    public LocalDate getFechaRegistro() { return fechaRegistro; }
    public void setFechaRegistro(LocalDate fechaRegistro) { this.fechaRegistro = fechaRegistro; }
    public String getEstadoMedidor() { return estadoMedidor; }
    public void setEstadoMedidor(String estadoMedidor) { this.estadoMedidor = estadoMedidor; }
}