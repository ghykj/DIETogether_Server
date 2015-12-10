CREATE SCHEMA `dietogether` DEFAULT CHARACTER SET utf8 ;

CREATE TABLE `dietogether`.`user` (
  `id` VARCHAR(50) NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  `gender` VARCHAR(10) NOT NULL,
  `age` INT NOT NULL,
  `height` INT NULL,
  `weight` INT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE `dietogether`.`friendship` (
  `id` VARCHAR(50) NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  'friends' JSON,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE `health` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `id` varchar(50) NOT NULL,
  `date` varchar(50) NOT NULL,
  `health_name` varchar(45) NOT NULL,
  `health_count` int(11) NOT NULL,
  PRIMARY KEY (`idx`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

CREATE TABLE `walking` (
  `index` int(11) NOT NULL AUTO_INCREMENT,
  `id` varchar(50) DEFAULT NULL,
  `date` varchar(50) DEFAULT NULL,
  `walking_count` int(11) DEFAULT NULL,
  `calorie` int(11) DEFAULT NULL,
  PRIMARY KEY (`index`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
