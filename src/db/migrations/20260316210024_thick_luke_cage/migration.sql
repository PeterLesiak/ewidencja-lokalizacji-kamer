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
	`name` text NOT NULL UNIQUE
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` text PRIMARY KEY,
	`user_id` integer,
	`expires_at` integer NOT NULL,
	CONSTRAINT `fk_sessions_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`login` text NOT NULL UNIQUE,
	`password` text NOT NULL,
	`role_id` integer,
	CONSTRAINT `fk_users_role_id_roles_id_fk` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`)
);
