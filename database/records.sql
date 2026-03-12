INSERT INTO roles (name) VALUES
('admin'),
('operator'),
('viewer');

INSERT INTO users (first_name, last_name, login, password, role) VALUES
('Jan', 'Kowalczyk', 'jkowalczyk', 'hashed_password_1', 0),
('Magdalena', 'Lewandowska', 'mlewandowska', 'hashed_password_2', 1),
('Paweł', 'Dąbrowski', 'pdabrowski', 'hashed_password_3', 2),
('Agnieszka', 'Piotrowska', 'apiotrowska', 'hashed_password_4', 1),
('Michał', 'Grabowski', 'mgrabowski', 'hashed_password_5', 0);

INSERT INTO addresses (country, city, postal_code, street, building_number, apartment_number) VALUES
('Poland', 'Kraków', '30-001', 'Floriańska', '12', '3'),
('Poland', 'Warszawa', '00-102', 'Marszałkowska', '45', NULL),
('Poland', 'Wrocław', '50-120', 'Świdnicka', '8', '12'),
('Poland', 'Gdańsk', '80-001', 'Długa', '21', NULL),
('Poland', 'Poznań', '60-101', 'Półwiejska', '15', '7');

INSERT INTO administrators (first_name, last_name, phone_number, organization) VALUES
('Piotr', 'Kowalski', '501234567', 'Kraków City Monitoring'),
('Anna', 'Nowak', '602345678', 'Warsaw Security Authority'),
('Marek', 'Wiśniewski', '503456789', 'Wrocław Infrastructure Dept'),
('Katarzyna', 'Zielińska', '604567890', 'Gdańsk Public Safety'),
('Tomasz', 'Kamiński', '505678901', 'Poznań Municipal Monitoring');

INSERT INTO infrastructures (latitude, longitude, object_type, administrator, address) VALUES
(50.06194740, 19.93685640, 'Traffic Intersection Monitoring', 1, 1),
(52.22967560, 21.01222870, 'Public Square Surveillance', 2, 2),
(51.10788520, 17.03853760, 'Pedestrian Crossing Monitoring', 3, 3),
(54.35202520, 18.64663840, 'Tourist Area Security', 4, 4),
(52.40637400, 16.92516810, 'Shopping District Monitoring', 5, 5);

INSERT INTO cameras (camera_type, installation_date, location_description, coverage_area, infrastructure) VALUES
('PTZ', '2022-05-10', 'Mounted on traffic light pole', '360-degree intersection coverage', 1),
('Dome', '2021-09-15', 'Ceiling mounted on public square', 'Central plaza monitoring', 2),
('Bullet', '2023-03-20', 'Installed near pedestrian crossing sign', 'Crosswalk and sidewalk area', 3),
('PTZ', '2020-11-05', 'Pole mounted near historical gate', 'Tourist entrance surveillance', 4),
('Dome', '2024-01-18', 'Attached to shopping street lamp post', 'Pedestrian shopping zone', 5);
