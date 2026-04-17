# 💧 Sistema de Gestión de Recibos y Cobranzas - Gestion_Agua_Sac

> **Proyecto:** Curso de Java Web - SENATI.  
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
    * **Diseño:** Figma & Gimini.
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
`````

## 📐 Diagrama Entidad-Relación (DER)

<img width="1264" height="847" alt="Gemini_Generated_Image_adolhjadolhjadol" src="https://github.com/user-attachments/assets/e291261b-8b54-4748-8539-c8c3dbe4aa01" />


## 📊 Modelo Relacional (MR)

<img width="1408" height="768" alt="Gemini_Generated_Image_yfenizyfenizyfen" src="https://github.com/user-attachments/assets/08af978d-c285-475a-beb6-7c4e3b79df87" />

---

## 🗄️ Base de Datos

El sistema cuenta con **4 tablas principales** diseñadas estratégicamente para garantizar la integridad y trazabilidad de la información:

| Tabla | 📝 Descripción |
| :--- | :--- |
| **`USUARIOS`** | Personal administrativo con acceso al sistema, encargados de gestionar perfiles y registrar los cobros de los recibos. |
| **`CLIENTES`** | Registro central de abonados; almacena datos de contacto, dirección y el **estado técnico del medidor**. |
| **`RECIBOS`** | Detalle de la facturación mensual que incluye el consumo de agua registrado y los montos calculados automáticamente. |
| **`COBROS`** | Historial financiero donde se valida y almacena el pago efectivo de cada recibo emitido por la empresa. |

---

(

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

-- Insertar Clientes
INSERT INTO clientes (nombre_completo, dni, direccion, referencia, celular, fecha_registro, tipo_de_uso, estado_medidor) VALUES  
('Aniebell Garcia', '72145566', 'Jr. Ucayali 123', 'Frente al parque', '900111222', '2024-01-15', 'Casa Familiar', 'Bueno'),
('Ricardo Huaman', '10458899', 'Jr. Constitución 490', 'Cerca al mercado', '900333444', '2024-02-10', 'Negocio', 'Malogrado'),
('Patricia Castro', '40552211', 'AA.HH. Las Moras Mz. C', 'Portón verde', '900555666', '2024-03-05', 'Casa Familiar', 'Bueno'),
('Juan Perez', '09887766', 'Av. Centenario 456', 'Costado farmacia', '900777888', '2024-03-20', 'Industrial', 'Sin Medidor'),
('Sofia Ramos', '44332211', 'Urb. Los Portales Mz. F', 'Esquina semáforo', '900999000', '2024-04-01', 'Casa Familiar', 'Bueno'),
('Fernando Vargas', '12345678', 'Jr. Progreso 334', 'Detrás iglesia', '900123456', '2024-04-12', 'Negocio', 'Bueno');

-- Insertar Usuarios
INSERT INTO usuarios (nombre_usuario, clave, rol) VALUES 
('admin', 'admin123', 'ADMIN'),
('cobrador_pucallpa', 'pucallpa123', 'COBRADOR');

-- Insertar Recibos
INSERT INTO recibos (cliente_id, mes_cobrado, cantidad_agua_usada, monto_total, ya_pago) VALUES  
(1, 'Abril', 15, 35.00, 'NO'),
(2, 'Abril', 10, 50.00, 'SI'),
(3, 'Abril', 12, 25.00, 'NO'),
(4, 'Abril', 20, 45.00, 'SI'),
(5, 'Abril', 08, 15.00, 'SI'),
(6, 'Abril', 25, 60.00, 'NO');

-- Registrar un cobro de prueba
INSERT INTO cobros (recibo_id, usuario_id, medio_pago, monto_recibido) VALUES (2, 2, 'Efectivo', 50.00);

);
```

## 🚀 Guía de Instalación y Ejecución

Para poner en marcha el sistema **Gestion_Agua_Sac**, sigue los pasos a continuación:

### 📋 Requisitos Previos
* **JDK 21** o superior instalado.
* **IntelliJ IDEA** (recomendado para el Backend).
* **VS Code** (recomendado para el Frontend).
* **XAMPP** (para el servicio de MySQL).
* **MySQL Workbench** (para la gestión de la base de datos).

---

### 🗄️ Configuración de la Base de Datos
1. Inicia **XAMPP** y activa el módulo **MySQL**.
2. Abre **MySQL Workbench** y crea la base de datos ejecutando el script SQL proporcionado en la sección anterior.
3. Asegúrate de que el nombre de la base de datos sea `Gestion_Agua_Sac`.

---

### ⚙️ Backend (Spring Boot)
1. Abre la carpeta `backend/` en **IntelliJ IDEA**.
2. Localiza el archivo `src/main/resources/application.properties`.
3. Configura las credenciales de tu base de datos local:

```properties
spring.application.name=gestion_agua_sac

# CONEXION A MYSQL
spring.datasource.url=jdbc:mysql://localhost:3306/Gestion_Agua_Sac
spring.datasource.username=root
spring.datasource.password=
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA / HIBERNATE
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect

# Puerto del servidor
server.port=8080
