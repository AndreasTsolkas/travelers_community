--
-- NOTE:
--
-- File paths need to be edited. Search for $$PATH$$ and
-- replace it with the path to the directory containing
-- the extracted data files.
--
--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE postgres;
--
-- Name: postgres; Type: DATABASE; Schema: -; Owner: -
--

CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';


\connect postgres

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- Name: travelers_community; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA travelers_community;


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: travel; Type: TABLE; Schema: travelers_community; Owner: -
--

CREATE TABLE travelers_community.travel (
    id bigint NOT NULL,
    user_id bigint,
    date_started date,
    date_finished date,
    experience_rate integer,
    description character varying(2000),
    place character varying(30),
    country character varying(30),
    business_travel boolean,
    suggest_it boolean
);


--
-- Name: travel_id_seq; Type: SEQUENCE; Schema: travelers_community; Owner: -
--

CREATE SEQUENCE travelers_community.travel_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: travel_id_seq; Type: SEQUENCE OWNED BY; Schema: travelers_community; Owner: -
--

ALTER SEQUENCE travelers_community.travel_id_seq OWNED BY travelers_community.travel.id;


--
-- Name: user; Type: TABLE; Schema: travelers_community; Owner: -
--

CREATE TABLE travelers_community."user" (
    id bigint NOT NULL,
    first_name character varying(20) NOT NULL,
    last_name character varying(20) NOT NULL,
    age bigint NOT NULL,
    sex character(3) NOT NULL,
    nationality character varying(20) NOT NULL,
    country character varying(20) NOT NULL,
    email character varying(30) NOT NULL,
    password character varying NOT NULL,
    username character varying(20) NOT NULL,
    date_signed date NOT NULL,
    avatar_filepath character varying(30),
    is_admin boolean
);


--
-- Name: user_id_seq; Type: SEQUENCE; Schema: travelers_community; Owner: -
--

CREATE SEQUENCE travelers_community.user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: travelers_community; Owner: -
--

ALTER SEQUENCE travelers_community.user_id_seq OWNED BY travelers_community."user".id;


--
-- Name: travel id; Type: DEFAULT; Schema: travelers_community; Owner: -
--

ALTER TABLE ONLY travelers_community.travel ALTER COLUMN id SET DEFAULT nextval('travelers_community.travel_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: travelers_community; Owner: -
--

ALTER TABLE ONLY travelers_community."user" ALTER COLUMN id SET DEFAULT nextval('travelers_community.user_id_seq'::regclass);


--
-- Data for Name: travel; Type: TABLE DATA; Schema: travelers_community; Owner: -
--

\i $$PATH$$/3350.dat

--
-- Data for Name: user; Type: TABLE DATA; Schema: travelers_community; Owner: -
--

\i $$PATH$$/3347.dat

--
-- Name: travel_id_seq; Type: SEQUENCE SET; Schema: travelers_community; Owner: -
--

SELECT pg_catalog.setval('travelers_community.travel_id_seq', 1, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: travelers_community; Owner: -
--

SELECT pg_catalog.setval('travelers_community.user_id_seq', 3, true);


--
-- Name: travel travel_pk; Type: CONSTRAINT; Schema: travelers_community; Owner: -
--

ALTER TABLE ONLY travelers_community.travel
    ADD CONSTRAINT travel_pk PRIMARY KEY (id);


--
-- Name: user user_pk; Type: CONSTRAINT; Schema: travelers_community; Owner: -
--

ALTER TABLE ONLY travelers_community."user"
    ADD CONSTRAINT user_pk PRIMARY KEY (id);


--
-- Name: user user_unique; Type: CONSTRAINT; Schema: travelers_community; Owner: -
--

ALTER TABLE ONLY travelers_community."user"
    ADD CONSTRAINT user_unique UNIQUE (username);


--
-- Name: travel travel_user_fk; Type: FK CONSTRAINT; Schema: travelers_community; Owner: -
--

ALTER TABLE ONLY travelers_community.travel
    ADD CONSTRAINT travel_user_fk FOREIGN KEY (user_id) REFERENCES travelers_community."user"(id);


--
-- PostgreSQL database dump complete
--

