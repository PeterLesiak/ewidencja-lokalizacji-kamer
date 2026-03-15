CREATE TABLE `addresses` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`country` text NOT NULL,
	`city` text NOT NULL,
	`postal_code` text NOT NULL,
	`street` text NOT NULL,
	`building_number` text NOT NULL,
	`apartment_number` text
);
--> statement-breakpoint
CREATE TABLE `cameras` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`camera_type` text NOT NULL,
	`installation_date` text NOT NULL,
	`storage_duration` integer NOT NULL,
	`location_description` text,
	`coverage_area` text,
	`infrastructure_id` integer,
	CONSTRAINT `fk_cameras_infrastructure_id_infrastructures_id_fk` FOREIGN KEY (`infrastructure_id`) REFERENCES `infrastructures`(`id`)
);
--> statement-breakpoint
CREATE TABLE `inf_administrators` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`phone_number` text NOT NULL,
	`organization` text,
	`nip` text,
	`notice` text,
	`address_id` integer,
	CONSTRAINT `fk_inf_administrators_address_id_addresses_id_fk` FOREIGN KEY (`address_id`) REFERENCES `addresses`(`id`)
);
--> statement-breakpoint
CREATE TABLE `infrastructures` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`latitude` real NOT NULL,
	`longitude` real NOT NULL,
	`object_type` text NOT NULL,
	`inf_administrator_id` integer,
	`address_id` integer,
	CONSTRAINT `fk_infrastructures_inf_administrator_id_inf_administrators_id_fk` FOREIGN KEY (`inf_administrator_id`) REFERENCES `inf_administrators`(`id`),
	CONSTRAINT `fk_infrastructures_address_id_addresses_id_fk` FOREIGN KEY (`address_id`) REFERENCES `addresses`(`id`)
);
--> statement-breakpoint
CREATE TABLE `roles` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`login` text NOT NULL,
	`password` text NOT NULL,
	`role_id` integer,
	CONSTRAINT `fk_users_role_id_roles_id_fk` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`)
);

PRAGMA foreign_keys=OFF;

INSERT INTO addresses VALUES(1,'Poland','Warsaw','00-001','Marszałkowska','10','5');
INSERT INTO addresses VALUES(2,'Poland','Warsaw','00-950','Puławska','25',NULL);
INSERT INTO addresses VALUES(3,'Poland','Kraków','30-001','Floriańska','12',NULL);
INSERT INTO addresses VALUES(4,'Poland','Gdańsk','80-001','Długa','18','3');

INSERT INTO cameras VALUES(1,'PTZ','2023-05-10',30,'Mounted on traffic light pole','Intersection overview',1);
INSERT INTO cameras VALUES(2,'Bullet','2023-06-15',14,'Station entrance','Entry monitoring',2);
INSERT INTO cameras VALUES(3,'Dome','2022-11-20',21,'Square center lamp post','Pedestrian area',3);
INSERT INTO cameras VALUES(4,'PTZ','2024-01-05',30,'Harbor control tower','Dock area monitoring',4);
INSERT INTO cameras VALUES(5,'Bullet','2024-02-12',14,'Metro platform end','Platform safety',2);

INSERT INTO inf_administrators VALUES(1,'Tomasz','Kamiński','501234567','City Monitoring Warsaw','12345678901','Main city operator',1);
INSERT INTO inf_administrators VALUES(2,'Agnieszka','Lewandowska','502345678','Kraków Security','23456789012',NULL,3);
INSERT INTO inf_administrators VALUES(3,'Michał','Wójcik','503456789','Gdańsk Surveillance','34567890123','Handles port area cameras',4);

INSERT INTO infrastructures VALUES(1,52.22977000000000202,21.01178000000000168,'traffic_intersection',1,1);
INSERT INTO infrastructures VALUES(2,52.21800000000000352,21.01500000000000056,'metro_station',1,2);
INSERT INTO infrastructures VALUES(3,50.06143000000000142,19.93657999999999931,'public_square',2,3);
INSERT INTO infrastructures VALUES(4,54.35204999999999842,18.64637000000000099,'harbor_area',3,4);

INSERT INTO roles VALUES(1,'admin');
INSERT INTO roles VALUES(2,'operator');
INSERT INTO roles VALUES(3,'viewer');

INSERT INTO users VALUES(1,'Jan','Kowalski','admin','admin123',1);
INSERT INTO users VALUES(2,'Anna','Nowak','operator1','operator123',2);
INSERT INTO users VALUES(3,'Piotr','Zieliński','operator2','operator123',2);
INSERT INTO users VALUES(4,'Maria','Wiśniewska','viewer1','viewer123',3);
