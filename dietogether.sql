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
