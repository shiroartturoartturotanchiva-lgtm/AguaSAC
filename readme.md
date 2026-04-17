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
