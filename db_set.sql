-- Create the schema
CREATE SCHEMA travelers_community;

-- Create the user table
CREATE TABLE travelers_community."user" (
	id bigserial NOT NULL,
	first_name varchar(20) NOT NULL,
	last_name varchar(20) NOT NULL,
	age int8 NOT NULL,
	sex char(1) NOT NULL,
	nationality varchar(30) NOT NULL,
	country varchar(40) NOT NULL,
	email varchar(30) NOT NULL,
	"password" varchar NOT NULL,
	date_signed date NOT NULL,
	avatar_filepath varchar(30) NULL,
	CONSTRAINT user_pk PRIMARY KEY (id)
	CONSTRAINT user_unique UNIQUE (email)
);

-- Set table owner and permissions
ALTER TABLE travelers_community."user" OWNER TO postgres;
GRANT ALL ON TABLE travelers_community."user" TO postgres;

--- Set the autoincrement start one number up to the id value of the last record
ALTER SEQUENCE travelers_community.user_id_seq RESTART WITH 1000;

-- Insert data into the user table
INSERT INTO travelers_community."user" 
(first_name, last_name, age, sex, nationality, country, email, "password", date_signed, avatar_filepath) 
VALUES
    ('Elvin','Schuchte',28,'M','German','Germany','nick@gmail.com','$2b$10$ubJEQy3XC3JSl','2023-02-03','user_avatars/img1'),
    ('Marie','Zepon',24,'F','French','France','helen@gmail.com','$2a$10$LsG9lJ1sLGjSj','2023-06-11','user_avatars/img2'),
    ('Jose','Pereldo',25,'M','Spanish','Spain','joperel@hotmail.com','$2a$10$LsG9lJ1sLGjSj','2024-06-11',NULL),
    ('Nikos','Papadakos',36,'M','Greek','Greece','nickpapp@gmail.com','$2a$10$LsG9lJ1sLGjSj','2024-02-11',NULL),
    ('William','Halley',28,'M','British','United Kingdom of Great Britain','williamhalley@gmail.com','$2a$10$LsG9lJ1sLGjSj','2024-02-11',NULL),
    ('Jennifer','Ashley',32,'F','British','United Kingdom of Great Britain','jenniashley@yahoo.com','$2a$10$LsG9lJ1sLGjSj','2024-02-11',NULL),
    ('Sofia','Severenski',31,'F','Serbian','Serbia','sofiaseverenski@gmail.com','$2a$10$LsG9lJ1sLGjSj','2024-02-11',NULL),
    ('Mario','Dolliati',24,'M','Italian','Italy','mariodolliati@gmail.com','$2a$10$LsG9lJ1sLGjSj','2024-02-11',NULL),
    ('Maria','Bellini',29,'F','Italian','Italy','mariabellini@hotmail.com','$2a$10$LsG9lJ1sLGjSj','2024-02-11',NULL),
    ('Mario','Balardi',30,'M','Italian','Italy','marioballardi@gmail.com','$2a$10$LsG9lJ1sLGjSj','2024-02-11',NULL),
    ('Marina','Fulgio',37,'F','Spanish','United States of America','marinafulgio@gmail.com','$2a$10$LsG9lJ1sLGjSj','2024-02-11',NULL),
    ('Angela','Berley',36,'F','American','United States of America','angelaberley@gmail.com','$2a$10$LsG9lJ1sLGjSj','2024-02-11',NULL),
    ('Barbara','Angey',33,'F','American','United States of America','barbarangie@gmail.com','$2a$10$LsG9lJ1sLGjSj','2024-02-11',NULL),
    ('ssaa','sdsds',20,'Female','Angolan','Anguilla','nickk@gmail.com','$2a$12$MlYkGcaJ8iAsIpKwyCJasuNty9E8DhnRZi0kTOmfVI3as7TLDiJ0a','2024-08-06',NULL);

-- Create the travel table
CREATE TABLE travelers_community."travel" (
	id bigserial NOT NULL,
	user_id int8 NOT NULL,
	date_started date NOT NULL,
	date_finished date NOT NULL,
	experience_rate int4 NOT NULL,
	description varchar(2000) NOT NULL,
	place varchar(30) NOT NULL,
	country varchar(30) NOT NULL,
	business_travel bool NOT NULL,
	suggest_it bool NOT NULL,
	CONSTRAINT travel_pk PRIMARY KEY (id)
);

-- Add foreign key constraint to the travel table
ALTER TABLE travelers_community.travel ADD CONSTRAINT travel_user_fk FOREIGN KEY (user_id) REFERENCES travelers_community."user"(id);

--- Set the autoincrement start one number up to the id value of the last record
ALTER SEQUENCE travelers_community.travel_id_seq RESTART WITH 1000;

-- Insert data into the travel table
INSERT INTO travelers_community.travel (user_id,date_started,date_finished,experience_rate,description,place,country,business_travel,suggest_it) VALUES
	 (1,'2024-06-07','2024-07-07',4,'4334sd','rtyrtr','Egypt',true,true),
	 (2,'2024-06-07','2024-07-12',7,'4334sd','rtyrtr','Russia',true,false),
	 (12,'2023-02-02','2023-04-02',5,'qeqeqeq','qeqweq','India',false,true),
	 (4,'2024-06-07','2025-07-07',5,'dftterersdfs','353sdds','India',false,false),
	 (2,'2024-06-07','2024-07-07',6,'Sasdsada','Agia Marina','Egypt',false,true),
	 (12,'2024-06-07','2024-11-07',6,'sdfsfsd','sdfsdfsdf','Egypt',false,true);
