# 💧 Sistema de Gestión de Recibos y Cobranzas - Gestion_Agua_Sac

> **Proyecto Final:** Curso de Java Web - SENATI.  
> Sistema web integral para la administración de consumo de agua, facturación mensual y control de estados de medidores.

---

## 📝 Descripción del Negocio

* **Nombre:** Sistema de Facturación `Gestion_Agua_Sac`
* **Giro:** Empresa de saneamiento y distribución de agua potable.
* **Tamaño:** Pequeña/Mediana empresa de recaudación local.
* **Contexto:** Digitalización del proceso de control de consumo de agua, reemplazando registros manuales por una emisión de recibos automatizada.
* **Justificación:** Centralizar el control de cobranzas para identificar rápidamente deudas pendientes y monitorear el estado técnico de los medidores.

---

## 🛠️ Identificación del Problema y Solución

* **Problema:** Dificultad para calcular montos basados en consumo, pérdida de control en recibos vencidos y falta de inventario real sobre el estado de los medidores.
* **Solución Tecnológica:** Aplicación web desarrollada con **Java Spring Boot 3** y **MySQL** que automatiza la generación de recibos y permite la actualización de estados de pago en tiempo real.

---

## ⚙️ Requerimientos Funcionales

| Código | Descripción |
| :--- | :--- |
| **RF01** | Registro de clientes con DNI, dirección, celular y **estado del medidor**. |
| **RF02** | Creación de recibos mensuales asociados a un cliente específico. |
| **RF03** | **Control de Pagos:** Actualización del estado `ya_pago` de 'NO' a 'SI'. |
| **RF04** | Cálculo automático del `monto_total` según `cantidad_agua_usada`. |
| **RF05** | Filtros avanzados por estado de medidor: *Bueno, Malogrado, Sin Medidor*. |

---

## 🚀 Pila Tecnológica (Stack)

* **Backend:** Java 17, Spring Boot 3, Spring Data JPA, Spring Security.
* **Frontend:** HTML5, CSS3, JavaScript, Thymeleaf.
* **Base de Datos:** MySQL 8 (Gestionada con MySQL Workbench).
* **Herramientas:** * **Gestión:** Trello (Kanban).
    * **Diseño:** Figma & Draw.io.
    * **Entorno:** IntelliJ IDEA & XAMPP (Tomcat/MySQL).

---

## 📂 Estructura del Proyecto

```plaintext
Gestion_Agua_Sac/
├── 📁 backend/ (Spring Boot)
│   ├── 📁 src/main/java/com/agua/
│   │   ├── 📄 controller/   → Manejo de rutas y peticiones.
│   │   ├── 📄 model/        → Entidades de la BD (Cliente, Recibo).
│   │   ├── 📄 repository/   → Interfaces JPA/SQL.
│   │   └── 📄 service/      → Lógica de negocio y cobros.
│   └── 📄 pom.xml           → Dependencias del proyecto.
├── 📁 frontend/
│   └── 📁 templates/        → Vistas (UI) del sistema.
└── 📁 sql/
    └── 📄 script_bd.sql     → Script de creación de la base de datos.
```:

## 📊 Modelo Relacional y Cardinalidades

Para asegurar la integridad de los datos, el sistema se basa en las siguientes reglas de negocio:

* **USUARIO — COBRO (1:N):** Un usuario (cobrador) puede registrar muchos cobros, pero cada cobro es procesado por un solo usuario.
* **CLIENTE — RECIBO (1:N):** Un cliente puede tener múltiples recibos mensuales, pero cada recibo pertenece a un único abonado.
* **RECIBO — COBRO (1:N):** Un recibo puede generar varios registros de cobro (pagos parciales), asociados siempre a un recibo padre.

| Entidad A | Relación | Entidad B | Cardinalidad |
| :--- | :--- | :--- | :--- |
| **USUARIO** | gestiona | **COBRO** | 1:N |
| **CLIENTE** | solicita | **RECIBO** | 1:N |
| **RECIBO** | genera | **COBRO** | 1:N |

---

## 🗄️ Base de Datos

El sistema cuenta con 4 tablas principales perfectamente normalizadas para evitar redundancia:

```sql
CREATE DATABASE IF NOT EXISTS Gestion_Agua_Sac;
USE Gestion_Agua_Sac;

-- 1. Tabla de Usuarios (Seguridad y Acceso)
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_usuario VARCHAR(50) NOT NULL UNIQUE,
    clave VARCHAR(100) NOT NULL,
    rol ENUM('ADMIN', 'COBRADOR') DEFAULT 'COBRADOR'
);

-- 2. Tabla de Clientes (Abonados)
CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_completo VARCHAR(150) NOT NULL,
    dni CHAR(8) NOT NULL UNIQUE,
    direccion VARCHAR(255) NOT NULL,
    celular VARCHAR(15),
    tipo_de_uso VARCHAR(50) DEFAULT 'Casa Familiar',
    estado_medidor ENUM('Bueno', 'Malogrado', 'Sin Medidor') DEFAULT 'Bueno'
);

-- 3. Tabla de Recibos (Consumo y Deuda)
CREATE TABLE recibos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    mes_cobrado VARCHAR(20) NOT NULL,
    cantidad_agua_usada INT NOT NULL,
    monto_total DECIMAL(10,2) NOT NULL,
    ya_pago ENUM('SI', 'NO') DEFAULT 'NO',
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE
);

-- 4. Tabla de Cobros (Trazabilidad Financiera)
CREATE TABLE cobros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    recibo_id INT NOT NULL,
    usuario_id INT NOT NULL,
    fecha_pago DATETIME DEFAULT CURRENT_TIMESTAMP,
    medio_pago ENUM('Efectivo', 'Yape', 'Transferencia') DEFAULT 'Efectivo',
    monto_recibido DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (recibo_id) REFERENCES recibos(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
