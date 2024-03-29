-- DROP SCHEMA book_manager;

CREATE SCHEMA book_manager AUTHORIZATION postgres;

-- DROP SEQUENCE book_manager.book_id_seq;

CREATE SEQUENCE book_manager.book_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE book_manager.user_id_seq;

CREATE SEQUENCE book_manager.user_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;-- book_manager.book definition

-- Drop table

-- DROP TABLE book_manager.book;

CREATE TABLE book_manager.book (
	id bigserial NOT NULL,
	title varchar(30) NOT NULL,
	gender varchar(20) NOT NULL,
	pages int8 NOT NULL,
	isbn varchar(50) NOT NULL,
	publication_date date NULL,
	author varchar(30) NULL,
	CONSTRAINT book_pk PRIMARY KEY (id)
);


-- book_manager."user" definition

-- Drop table

-- DROP TABLE book_manager."user";

CREATE TABLE book_manager."user" (
	id bigserial NOT NULL,
	first_name varchar(20) NOT NULL,
	last_name varchar(20) NOT NULL,
	age int8 NOT NULL,
	sex _char NOT NULL,
	nationality varchar(20) NOT NULL,
	country varchar(20) NOT NULL,
	email varchar(30) NOT NULL,
	"password" varchar(30) NOT NULL,
	username varchar(20) NOT NULL,
	CONSTRAINT user_pk PRIMARY KEY (id),
	CONSTRAINT user_unique UNIQUE (username)
);


-- book_manager.has_read definition

-- Drop table

-- DROP TABLE book_manager.has_read;

CREATE TABLE book_manager.has_read (
	id bigserial NOT NULL,
	user_id int8 NOT NULL,
	book_id int8 NOT NULL,
	date_started date NULL,
	date_finished date NULL,
	enjoyness_level int4 NULL,
	CONSTRAINT has_read_pk PRIMARY KEY (id),
	CONSTRAINT has_read_book_fk FOREIGN KEY (book_id) REFERENCES book_manager.book(id),
	CONSTRAINT has_read_user_fk FOREIGN KEY (user_id) REFERENCES book_manager."user"(id)
);