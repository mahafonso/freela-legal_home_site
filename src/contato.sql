-- phpMyAdmin SQL Dump
-- version 3.5.8.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Aug 19, 2015 at 03:57 PM
-- Server version: 5.5.42-37.1-log
-- PHP Version: 5.4.23

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "-03:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `legalhome_landingpage_v1`
--

-- --------------------------------------------------------

--
-- Table structure for table `contatos`z
--

DROP TABLE IF EXISTS `contatos`;
CREATE TABLE IF NOT EXISTS `contatos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `data_registro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `email` char(200) NOT NULL,
  `nome` char(200) NOT NULL,
  `ddd_celular` int(11) DEFAULT NULL,
  `celular` varchar(100) DEFAULT NULL,
  `ddd` int(11) DEFAULT NULL,
  `telefone` varchar(100) DEFAULT NULL,
  `funcao` varchar(100) DEFAULT NULL,
  `mensagem` varchar(1000) NOT NULL,
  `origem` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=0 ;

--
-- Dumping data for table `contatos`
--

-- --------------------------------------------------------

--
-- Table structure for table `contatos_log`
--

DROP TABLE IF EXISTS `contatos_log`;
CREATE TABLE IF NOT EXISTS `contatos_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_contato` int(11) DEFAULT NULL,
  `data_registro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status_envio_email` varchar(250) DEFAULT NULL,
  `disparado_para` varchar(1000) DEFAULT NULL,
  `http_referer` varchar(500) DEFAULT NULL,
  `php_self` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=0 ;

--
-- Dumping data for table `contatos_log`
--


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
