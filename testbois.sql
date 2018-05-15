
DROP DATABASE IF EXISTS `studentenhuis`;
CREATE DATABASE `studentenhuis`;
USE `studentenhuis`;

-- studentenhuis_user aanmaken
CREATE USER 'studentenhuis_user'@'%' IDENTIFIED BY 'secret';
CREATE USER 'studentenhuis_user'@'localhost' IDENTIFIED BY 'secret';

-- geef in een keer alle rechten - soort administrator!
GRANT ALL ON `studentenhuis`.* TO 'studentenhuis_user'@'%';
GRANT ALL ON `studentenhuis`.* TO 'studentenhuis_user'@'localhost';

-- -----------------------------------------------------
-- Table `studentenhuis`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `studentenhuis` ;
CREATE TABLE IF NOT EXISTS `studentenhuis` (
	`ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`Naam` VARCHAR(32) NOT NULL,
	`Adres` VARCHAR(1000) NOT NULL,
	PRIMARY KEY (`ID`)
) 
ENGINE = InnoDB;

