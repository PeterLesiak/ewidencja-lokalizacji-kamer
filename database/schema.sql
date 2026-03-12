CREATE TABLE roles (
  id         INT PRIMARY KEY AUTO_INCREMENT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  name       VARCHAR(255) NOT NULL
);

CREATE TABLE users (
  id         INT PRIMARY KEY AUTO_INCREMENT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  first_name VARCHAR(255) NOT NULL,
  last_name  VARCHAR(255) NOT NULL,
  login      VARCHAR(255) NOT NULL,
  password   VARCHAR(255) NOT NULL,

  role       INT NOT NULL,
  CONSTRAINT fk_users_role FOREIGN KEY (role) REFERENCES roles(id)
);

CREATE TABLE addresses (
  id               INT PRIMARY KEY AUTO_INCREMENT,
  updated_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  country          VARCHAR(255) NOT NULL,
  city             VARCHAR(255) NOT NULL,
  postal_code      VARCHAR(10) NOT NULL,
  street           VARCHAR(255) NOT NULL,
  building_number  VARCHAR(10) NOT NULL,
  apartment_number VARCHAR(10)
);

CREATE TABLE administrators (
  id           INT PRIMARY KEY AUTO_INCREMENT,
  updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  first_name   VARCHAR(255) NOT NULL,
  last_name    VARCHAR(255) NOT NULL,
  phone_number CHAR(9) NOT NULL,
  organization VARCHAR(255) NOT NULL
);

CREATE TABLE infrastructures (
  id            INT PRIMARY KEY AUTO_INCREMENT,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  latitude      DECIMAL(10, 8) NOT NULL,
  longitude     DECIMAL(11, 8) NOT NULL,
  object_type   TEXT NOT NULL,

  administrator INT NOT NULL,
  CONSTRAINT fk_infrastructures_administrator FOREIGN KEY (administrator) REFERENCES administrators(id),
  address       INT,
  CONSTRAINT fk_infrastructures_address FOREIGN KEY (address) REFERENCES addresses(id)
);

CREATE TABLE cameras (
  id                   INT PRIMARY KEY AUTO_INCREMENT,
  updated_at           TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  camera_type          VARCHAR(255) NOT NULL,
  installation_date    DATE NOT NULL,
  location_description TEXT,
  coverage_area        TEXT,

  infrastructure       INT NOT NULL,
  CONSTRAINT fk_cameras_infrastructure FOREIGN KEY (infrastructure) REFERENCES infrastructures(id)
);
