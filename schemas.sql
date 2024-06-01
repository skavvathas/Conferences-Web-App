CREATE TABLE `conferences` (
  `conferenceId` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `author` varchar(45) DEFAULT NULL,
  `title` varchar(45) DEFAULT NULL,
  `acronym` varchar(45) NOT NULL,
  `webpage` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `firstday` date DEFAULT NULL,
  `lastday` varchar(45) DEFAULT NULL,
  `primaryarea` varchar(45) DEFAULT NULL,
  `secondaryarea` varchar(45) DEFAULT NULL,
  `organizer` varchar(45) DEFAULT NULL,
  `start_recommendation` tinyint DEFAULT '0',
  `finished_recommendation` tinyint DEFAULT '0',
  UNIQUE KEY `idconferences_UNIQUE` (`conferenceId`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `conferencetopapers` (
  `conferenceId` int NOT NULL,
  `paperId` int NOT NULL,
  PRIMARY KEY (`conferenceId`,`paperId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `paper` (
  `paperId` int NOT NULL AUTO_INCREMENT,
  `title` mediumtext,
  `abstract` longtext,
  PRIMARY KEY (`paperId`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `posts` (
  `postId` int NOT NULL AUTO_INCREMENT,
  `post` text NOT NULL,
  `reviewerId` int NOT NULL,
  `paperId` int NOT NULL,
  `username` varchar(45) NOT NULL,
  PRIMARY KEY (`postId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `recommendations` (
  `reviewerId` int NOT NULL,
  `conferenceId` int NOT NULL,
  `assignment1` int DEFAULT NULL,
  `assignment2` int DEFAULT NULL,
  `assignment3` int DEFAULT NULL,
  PRIMARY KEY (`reviewerId`,`conferenceId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `reviewers` (
  `reviewerId` int NOT NULL AUTO_INCREMENT,
  `email` varchar(45) DEFAULT NULL,
  `name` varchar(65) DEFAULT NULL,
  PRIMARY KEY (`reviewerId`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `users` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(45) DEFAULT NULL,
  `lastName` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `username` varchar(45) DEFAULT NULL,
  `password` varchar(500) DEFAULT NULL,
  UNIQUE KEY `idusers_UNIQUE` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
SELECT * FROM conference.paper;