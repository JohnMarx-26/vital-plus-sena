-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 16-12-2025 a las 21:03:10
-- Versión del servidor: 9.1.0
-- Versión de PHP: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `vitalplus`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bancos`
--

DROP TABLE IF EXISTS `bancos`;
CREATE TABLE IF NOT EXISTS `bancos` (
  `id_banco` int NOT NULL AUTO_INCREMENT,
  `nombre_banco` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_banco`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `bancos`
--

INSERT INTO `bancos` (`id_banco`, `nombre_banco`) VALUES
(1, 'Bancolombia'),
(2, 'Davivienda'),
(3, 'BBVA'),
(4, 'Caja social');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ciudades`
--

DROP TABLE IF EXISTS `ciudades`;
CREATE TABLE IF NOT EXISTS `ciudades` (
  `id_ciudad` int NOT NULL AUTO_INCREMENT,
  `nombre_ciudad` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_ciudad`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `ciudades`
--

INSERT INTO `ciudades` (`id_ciudad`, `nombre_ciudad`) VALUES
(1, 'Pereira'),
(2, 'Manizales'),
(3, 'Medellin'),
(4, 'Bogotá'),
(5, 'Barranquilla'),
(6, 'Bucaramanga'),
(7, 'Cali'),
(8, 'ibagué'),
(9, 'Armenia');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

DROP TABLE IF EXISTS `clientes`;
CREATE TABLE IF NOT EXISTS `clientes` (
  `id_cliente` int NOT NULL AUTO_INCREMENT,
  `id_tipo_documento` int DEFAULT NULL,
  `n_documento` int DEFAULT NULL,
  `nombres_cliente` varchar(50) DEFAULT NULL,
  `apellidos_cliente` varchar(50) DEFAULT NULL,
  `correo_electronico` varchar(100) DEFAULT NULL,
  `numero_telefonico` bigint DEFAULT NULL,
  `id_direccion` int DEFAULT NULL,
  `contrasena` varchar(100) DEFAULT NULL,
  `fecha_registro` datetime DEFAULT NULL,
  `estado_cuenta` enum('activo','inactivo') DEFAULT 'activo',
  `Foto_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_cliente`),
  UNIQUE KEY `correo_electronico` (`correo_electronico`),
  KEY `id_tipo_documento` (`id_tipo_documento`),
  KEY `id_direccion` (`id_direccion`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id_cliente`, `id_tipo_documento`, `n_documento`, `nombres_cliente`, `apellidos_cliente`, `correo_electronico`, `numero_telefonico`, `id_direccion`, `contrasena`, `fecha_registro`, `estado_cuenta`, `Foto_url`) VALUES
(1, 1, 1056789452, 'Felipe', 'Perez', 'felipe@gmail.com', 3122563695, 1, 'no me la se', '2025-12-16 15:06:00', 'activo', 'https://fotourl.contenedor.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_ventas`
--

DROP TABLE IF EXISTS `detalle_ventas`;
CREATE TABLE IF NOT EXISTS `detalle_ventas` (
  `id_detalle` int NOT NULL AUTO_INCREMENT,
  `id_inventario` int DEFAULT NULL,
  `cantidad` int DEFAULT NULL,
  `id_metodo_pago` int DEFAULT NULL,
  `Subtotal` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id_detalle`),
  KEY `id_inventario` (`id_inventario`),
  KEY `id_metodo_pago` (`id_metodo_pago`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `detalle_ventas`
--

INSERT INTO `detalle_ventas` (`id_detalle`, `id_inventario`, `cantidad`, `id_metodo_pago`, `Subtotal`) VALUES
(1, 1, 4, 4, 34141.50);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `direcciones`
--

DROP TABLE IF EXISTS `direcciones`;
CREATE TABLE IF NOT EXISTS `direcciones` (
  `id_direccion` int NOT NULL AUTO_INCREMENT,
  `direccion` varchar(100) DEFAULT NULL,
  `id_ciudad` int DEFAULT NULL,
  PRIMARY KEY (`id_direccion`),
  KEY `id_ciudad` (`id_ciudad`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `direcciones`
--

INSERT INTO `direcciones` (`id_direccion`, `direccion`, `id_ciudad`) VALUES
(1, 'MZ B CS 18', 1),
(2, 'cra 8 #105-78', 2),
(3, 'cra 12 #12-15', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `facturas`
--

DROP TABLE IF EXISTS `facturas`;
CREATE TABLE IF NOT EXISTS `facturas` (
  `id_factura` int NOT NULL AUTO_INCREMENT,
  `id_venta` int DEFAULT NULL,
  `numero_factura` varchar(20) DEFAULT NULL,
  `fecha_emision` datetime DEFAULT NULL,
  `url_factura` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_factura`),
  KEY `id_venta` (`id_venta`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `facturas`
--

INSERT INTO `facturas` (`id_factura`, `id_venta`, `numero_factura`, `fecha_emision`, `url_factura`) VALUES
(1, 1, '45223', '2025-12-16 00:00:00', 'https://facturasurl.contenedor.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `formas_farmaceuticas`
--

DROP TABLE IF EXISTS `formas_farmaceuticas`;
CREATE TABLE IF NOT EXISTS `formas_farmaceuticas` (
  `id_forma_farmaceutica` int NOT NULL AUTO_INCREMENT,
  `nombre_forma` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_forma_farmaceutica`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `formas_farmaceuticas`
--

INSERT INTO `formas_farmaceuticas` (`id_forma_farmaceutica`, `nombre_forma`) VALUES
(1, 'Especial'),
(2, 'Liquidas'),
(3, 'Gaseosas'),
(4, 'Semisolidas'),
(5, 'Sólidas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `funcionarios`
--

DROP TABLE IF EXISTS `funcionarios`;
CREATE TABLE IF NOT EXISTS `funcionarios` (
  `id_funcionario` int NOT NULL AUTO_INCREMENT,
  `id_tipo_documento` int DEFAULT NULL,
  `n_documento` int DEFAULT NULL,
  `nombres_funcionario` varchar(50) DEFAULT NULL,
  `apellidos_funcionario` varchar(50) DEFAULT NULL,
  `correo_electronico` varchar(100) DEFAULT NULL,
  `numero_telefonico` bigint DEFAULT NULL,
  `id_direccion` int DEFAULT NULL,
  `contrasena` varchar(100) DEFAULT NULL,
  `fecha_registro` datetime DEFAULT NULL,
  `id_rol` int DEFAULT NULL,
  `estado_cuenta` enum('activo','inactivo') DEFAULT 'activo',
  `foto_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_funcionario`),
  UNIQUE KEY `correo_electronico` (`correo_electronico`),
  KEY `id_tipo_documento` (`id_tipo_documento`),
  KEY `id_direccion` (`id_direccion`),
  KEY `id_rol` (`id_rol`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `funcionarios`
--

INSERT INTO `funcionarios` (`id_funcionario`, `id_tipo_documento`, `n_documento`, `nombres_funcionario`, `apellidos_funcionario`, `correo_electronico`, `numero_telefonico`, `id_direccion`, `contrasena`, `fecha_registro`, `id_rol`, `estado_cuenta`, `foto_url`) VALUES
(1, 1, 1058138565, 'stiwen', 'pinzon', 'example@gmail.com', 3117415489, 3, '112233', '2025-12-15 12:05:00', 1, 'activo', 'https://fotourl.pdf');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial_sesiones_clientes`
--

DROP TABLE IF EXISTS `historial_sesiones_clientes`;
CREATE TABLE IF NOT EXISTS `historial_sesiones_clientes` (
  `id_historial_cliente` int NOT NULL AUTO_INCREMENT,
  `id_cliente` int DEFAULT NULL,
  `fecha_inicio` datetime DEFAULT NULL,
  `fecha_fin` datetime DEFAULT NULL,
  `ip_origen` varchar(45) DEFAULT NULL,
  `ultimo_acceso` datetime DEFAULT NULL,
  `estado_sesion` enum('activo','inactivo') DEFAULT 'activo',
  PRIMARY KEY (`id_historial_cliente`),
  KEY `id_cliente` (`id_cliente`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial_sesiones_funcionarios`
--

DROP TABLE IF EXISTS `historial_sesiones_funcionarios`;
CREATE TABLE IF NOT EXISTS `historial_sesiones_funcionarios` (
  `id_historial` int NOT NULL AUTO_INCREMENT,
  `id_funcionario` int DEFAULT NULL,
  `fecha_inicio` datetime DEFAULT NULL,
  `fecha_fin` datetime DEFAULT NULL,
  `ip_origen` varchar(45) DEFAULT NULL,
  `ultimo_acceso` datetime DEFAULT NULL,
  `estado_sesion` enum('activo','inactivo') DEFAULT 'activo',
  PRIMARY KEY (`id_historial`),
  KEY `id_funcionario` (`id_funcionario`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inventario`
--

DROP TABLE IF EXISTS `inventario`;
CREATE TABLE IF NOT EXISTS `inventario` (
  `id_inventario` int NOT NULL AUTO_INCREMENT,
  `id_medicamento` int DEFAULT NULL,
  `lote` int DEFAULT NULL,
  `fecha_de_fabricacion` date DEFAULT NULL,
  `fecha_de_vencimiento` date DEFAULT NULL,
  `stock` int DEFAULT NULL,
  `precio_compra` decimal(10,2) DEFAULT NULL,
  `precio_venta` decimal(10,2) DEFAULT NULL,
  `id_proveedor` int DEFAULT NULL,
  PRIMARY KEY (`id_inventario`),
  KEY `id_proveedor` (`id_proveedor`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `inventario`
--

INSERT INTO `inventario` (`id_inventario`, `id_medicamento`, `lote`, `fecha_de_fabricacion`, `fecha_de_vencimiento`, `stock`, `precio_compra`, `precio_venta`, `id_proveedor`) VALUES
(1, 1, 2030, '2025-07-01', '2026-01-30', 16, 8320.00, 14050.00, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `laboratorios`
--

DROP TABLE IF EXISTS `laboratorios`;
CREATE TABLE IF NOT EXISTS `laboratorios` (
  `id_laboratorio` int NOT NULL AUTO_INCREMENT,
  `nombre_laboratorio` varchar(50) DEFAULT NULL,
  `id_proveedor` int DEFAULT NULL,
  PRIMARY KEY (`id_laboratorio`),
  KEY `id_proveedor` (`id_proveedor`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `laboratorios`
--

INSERT INTO `laboratorios` (`id_laboratorio`, `nombre_laboratorio`, `id_proveedor`) VALUES
(1, 'Abbott Laboratories de Colombia S.A.', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medicamentos`
--

DROP TABLE IF EXISTS `medicamentos`;
CREATE TABLE IF NOT EXISTS `medicamentos` (
  `id_medicamento` int NOT NULL AUTO_INCREMENT,
  `nombre_medicamento` varchar(100) DEFAULT NULL,
  `id_forma_farmaceutica` int DEFAULT NULL,
  `id_presentacion` int DEFAULT NULL,
  `id_via_administracion` int DEFAULT NULL,
  `id_laboratorio` int DEFAULT NULL,
  `requiere_formula` enum('SI','NO') DEFAULT 'NO',
  `descripcion` varchar(255) DEFAULT NULL,
  `estado_medicamento` enum('activo','vencido','agotado','suspendido') DEFAULT 'activo',
  PRIMARY KEY (`id_medicamento`),
  KEY `id_forma_farmaceutica` (`id_forma_farmaceutica`),
  KEY `id_presentacion` (`id_presentacion`),
  KEY `id_via_administracion` (`id_via_administracion`),
  KEY `id_laboratorio` (`id_laboratorio`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `medicamentos`
--

INSERT INTO `medicamentos` (`id_medicamento`, `nombre_medicamento`, `id_forma_farmaceutica`, `id_presentacion`, `id_via_administracion`, `id_laboratorio`, `requiere_formula`, `descripcion`, `estado_medicamento`) VALUES
(1, 'Dolex', 3, 1, 7, 1, 'NO', 'Dolex Bebés Acetaminofén 160mg/5ml Sabor Frambuesa Jarabe Frasco X 60 Ml', 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `metodo_pago`
--

DROP TABLE IF EXISTS `metodo_pago`;
CREATE TABLE IF NOT EXISTS `metodo_pago` (
  `id_metodo_pago` int NOT NULL AUTO_INCREMENT,
  `nombre_metodo` varchar(50) DEFAULT NULL,
  `id_banco` int DEFAULT NULL,
  PRIMARY KEY (`id_metodo_pago`),
  KEY `id_banco` (`id_banco`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `metodo_pago`
--

INSERT INTO `metodo_pago` (`id_metodo_pago`, `nombre_metodo`, `id_banco`) VALUES
(1, 'transferencia', 1),
(2, 'tarjeta debito', 1),
(3, 'tarjeta credito', 1),
(4, 'transferencia', 2),
(5, 'tarjeta debito', 2),
(6, 'tarjeta credito', 2),
(7, 'transferencia', 3),
(8, 'tarjeta debito', 3),
(9, 'tarjeta credito', 3),
(10, 'transferencia', 4),
(11, 'tarjeta debito', 4),
(12, 'tarjeta credito', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `presentaciones`
--

DROP TABLE IF EXISTS `presentaciones`;
CREATE TABLE IF NOT EXISTS `presentaciones` (
  `id_presentacion` int NOT NULL AUTO_INCREMENT,
  `nombre_presentacion` varchar(50) DEFAULT NULL,
  `id_forma_farmaceutica` int DEFAULT NULL,
  PRIMARY KEY (`id_presentacion`),
  KEY `id_forma_farmaceutica` (`id_forma_farmaceutica`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `presentaciones`
--

INSERT INTO `presentaciones` (`id_presentacion`, `nombre_presentacion`, `id_forma_farmaceutica`) VALUES
(1, 'Jarabe', 3),
(2, 'dentifríco', 1),
(3, 'inhalador', 2),
(4, 'crema', 4),
(5, 'pildora', 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedores`
--

DROP TABLE IF EXISTS `proveedores`;
CREATE TABLE IF NOT EXISTS `proveedores` (
  `id_proveedor` int NOT NULL AUTO_INCREMENT,
  `id_tipo_documento` int DEFAULT NULL,
  `nombre_proveedor` varchar(100) DEFAULT NULL,
  `razon_social` varchar(100) DEFAULT NULL,
  `nombres_contacto` varchar(50) DEFAULT NULL,
  `apellidos_contacto` varchar(50) DEFAULT NULL,
  `telefono_contacto` bigint DEFAULT NULL,
  `correo_electronico` varchar(100) DEFAULT NULL,
  `id_direccion` int DEFAULT NULL,
  `estado` enum('activo','inactivo') DEFAULT 'activo',
  PRIMARY KEY (`id_proveedor`),
  UNIQUE KEY `correo_electronico` (`correo_electronico`),
  KEY `id_tipo_documento` (`id_tipo_documento`),
  KEY `id_direccion` (`id_direccion`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `proveedores`
--

INSERT INTO `proveedores` (`id_proveedor`, `id_tipo_documento`, `nombre_proveedor`, `razon_social`, `nombres_contacto`, `apellidos_contacto`, `telefono_contacto`, `correo_electronico`, `id_direccion`, `estado`) VALUES
(1, 4, 'Bluxus', ' bluxus S.A', 'Esteban', 'Lopez', 3167237777, 'gerencia@bluxus.com', 2, 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `id_rol` int NOT NULL AUTO_INCREMENT,
  `nombre_rol` varchar(30) NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  PRIMARY KEY (`id_rol`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id_rol`, `nombre_rol`, `descripcion`) VALUES
(1, 'Administrador', ' Tiene acceso a todos los modulos del sistema,ademas tieme la capacidad de crear usuarios, proveedor'),
(2, 'Farmaceuta', 'Usuario creado para el personal en cuestión, tiene acceso a los distintos modulos del sistema ademas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_documentos`
--

DROP TABLE IF EXISTS `tipo_documentos`;
CREATE TABLE IF NOT EXISTS `tipo_documentos` (
  `id_tipo_documento` int NOT NULL AUTO_INCREMENT,
  `tipo_documento` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_tipo_documento`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `tipo_documentos`
--

INSERT INTO `tipo_documentos` (`id_tipo_documento`, `tipo_documento`) VALUES
(1, 'Cédula de ciudadanía'),
(2, 'Cédula de Extranjeria'),
(3, 'Pasaporte'),
(4, 'NIT'),
(5, 'PEP'),
(6, 'PPT'),
(7, 'Tarjeta de Identidad');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

DROP TABLE IF EXISTS `ventas`;
CREATE TABLE IF NOT EXISTS `ventas` (
  `id_venta` int NOT NULL AUTO_INCREMENT,
  `fecha_venta` datetime DEFAULT NULL,
  `id_funcionario` int DEFAULT NULL,
  `id_cliente` int DEFAULT NULL,
  `id_detalle` int DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id_venta`),
  KEY `id_funcionario` (`id_funcionario`),
  KEY `id_cliente` (`id_cliente`),
  KEY `id_detalle` (`id_detalle`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `ventas`
--

INSERT INTO `ventas` (`id_venta`, `fecha_venta`, `id_funcionario`, `id_cliente`, `id_detalle`, `total`) VALUES
(1, '2025-12-16 00:00:00', 1, 1, 1, 42150.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `via_administracion`
--

DROP TABLE IF EXISTS `via_administracion`;
CREATE TABLE IF NOT EXISTS `via_administracion` (
  `id_via_administracion` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_via_administracion`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `via_administracion`
--

INSERT INTO `via_administracion` (`id_via_administracion`, `descripcion`) VALUES
(1, 'Bucal'),
(2, 'cutánea'),
(3, 'intrádermica'),
(4, 'inhalatoria'),
(5, 'intramuscular'),
(6, 'nasal'),
(7, 'oral');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
