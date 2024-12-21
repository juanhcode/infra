-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 15-12-2024 a las 14:54:36
-- Versión del servidor: 8.3.0
-- Versión de PHP: 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `lavadero`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `admins`
--

DROP TABLE IF EXISTS `admins`;
CREATE TABLE IF NOT EXISTS `admins` (
  `id_admin` varchar(50) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `telefono` varchar(15) NOT NULL,
  PRIMARY KEY (`id_admin`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `admins`
--

INSERT INTO `admins` (`id_admin`, `nombre`, `email`, `password`, `telefono`) VALUES
('admin', 'Juan', 'juan@correo.com', '123qwe', '123456789');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `agendamientos`
--

DROP TABLE IF EXISTS `agendamientos`;
CREATE TABLE IF NOT EXISTS `agendamientos` (
  `id_agendamiento` int NOT NULL AUTO_INCREMENT,
  `id_usuario` varchar(50) NOT NULL,
  `placa` varchar(20) NOT NULL,
  `fecha_agendada` date NOT NULL,
  `hora_agendada` time NOT NULL,
  `servicios_ids` text NOT NULL,
  PRIMARY KEY (`id_agendamiento`),
  KEY `id_usuario` (`id_usuario`),
  KEY `placa` (`placa`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `agendamientos`
--

INSERT INTO `agendamientos` (`id_agendamiento`, `id_usuario`, `placa`, `fecha_agendada`, `hora_agendada`, `servicios_ids`) VALUES
(34, 'acerrin', 'asd123', '2024-12-14', '22:41:00', '[1]'),
(35, 'acerrin', 'gfd123', '2024-12-14', '14:25:00', '[1,2]'),
(36, 'Jmcoc', 'ASD100', '2024-12-15', '10:45:00', '[1,2]');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios`
--

DROP TABLE IF EXISTS `servicios`;
CREATE TABLE IF NOT EXISTS `servicios` (
  `id_servicio` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id_servicio`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `servicios`
--

INSERT INTO `servicios` (`id_servicio`, `nombre`, `precio`) VALUES
(1, 'Limpieza interior', 20.00),
(2, 'Lavado exterior', 15.00),
(3, 'Lavado de ruedas', 10.00),
(4, 'Pulido de carrocería', 25.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `Usuarios`;
CREATE TABLE IF NOT EXISTS `Usuarios` (
  `id_usuario` varchar(50) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `telefono` varchar(15) NOT NULL,
  `tipo_usuario` varchar(50) NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `Usuarios` (`id_usuario`, `nombre`, `email`, `password`, `telefono`, `tipo_usuario`) VALUES
('acerrin', 'Kevin Steven', 'prueba222@corre.com', '123qwe', '123456789', 'persona'),
('felipe123', 'felipe andrade', 'felipe@correo.com', '123asd', '3202803445', 'persona'),
('Jmcoc', 'Juan Manuel', 'juanmanuelramirezagudelo4@gmail.com', 'naran5', '3155906456', 'persona'),
('prueba', 'prueba', 'kevinramirez0629@gmail.com', '123zxc', '3214567890', 'persona');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vehiculos`
--

DROP TABLE IF EXISTS `vehiculos`;
CREATE TABLE IF NOT EXISTS `vehiculos` (
  `id_usuario` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `marca` varchar(50) NOT NULL,
  `modelo` varchar(50) NOT NULL,
  `color` varchar(20) NOT NULL,
  `placa` varchar(20) NOT NULL,
  `Foto` varchar(255) NOT NULL,
  PRIMARY KEY (`placa`),
  KEY `id_usuario` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `vehiculos`
--

INSERT INTO `vehiculos` (`id_usuario`, `marca`, `modelo`, `color`, `placa`, `Foto`) VALUES
('Jmcoc', 'Toyota', 'Pickup', 'Negro', 'ABC123', '/uploads/foto-1734227561254-805802731.png'),
('acerrin', 'D', 'D', 'D', 'ASD004', '/uploads/foto-1734137377116-860412998.png'),
('acerrin', 'D', 'D', 'D', 'ASD006', '/uploads/foto-1734145228569-444895823.JPG'),
('acerrin', 'E', 'E', 'E', 'ASD008', '/uploads/foto-1734147139320-66054986.png'),
('Jmcoc', 'Toyota', 'Supra', 'Negro', 'ASD100', '/uploads/foto-1734187277389-224076892.png'),
('acerrin', 'nissan', 'skyline', 'rojo', 'asd123', '/uploads/foto-1733631323469-687917455.PNG'),
('acerrin', 'nissan', 'skyline', 'azul', 'gfd123', '/uploads/foto-1733635106763-133625930.jpg');

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `agendamientos`
--
ALTER TABLE `agendamientos`
  ADD CONSTRAINT `agendamientos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `Usuarios` (`id_usuario`) ON DELETE CASCADE,
  ADD CONSTRAINT `agendamientos_ibfk_2` FOREIGN KEY (`placa`) REFERENCES `vehiculos` (`placa`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
