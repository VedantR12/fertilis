--
-- PostgreSQL database dump
--

\restrict GpnYXK3Wc9CyHnAwHdQmqbPjpTrhPeq2Mv6JWpckXTpOnJ1t4lNYiNVn8tT9y1i

-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: userrole; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.userrole AS ENUM (
    'ADMIN'
);


ALTER TYPE public.userrole OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: alembic_version; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.alembic_version (
    version_num character varying(32) NOT NULL
);


ALTER TABLE public.alembic_version OWNER TO postgres;

--
-- Name: dfis; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dfis (
    id integer NOT NULL,
    sample_id integer NOT NULL,
    dfi_percent double precision NOT NULL,
    hds_percent double precision NOT NULL,
    method character varying(50) NOT NULL,
    remarks text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.dfis OWNER TO postgres;

--
-- Name: dfis_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.dfis_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.dfis_id_seq OWNER TO postgres;

--
-- Name: dfis_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.dfis_id_seq OWNED BY public.dfis.id;


--
-- Name: morphologies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.morphologies (
    id integer NOT NULL,
    sample_id integer NOT NULL,
    normal_forms_percent double precision NOT NULL,
    head_defects_percent double precision NOT NULL,
    neck_midpiece_defects_percent double precision NOT NULL,
    tail_defects_percent double precision NOT NULL,
    excess_residual_cytoplasm_percent double precision NOT NULL,
    sperm_evaluated integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.morphologies OWNER TO postgres;

--
-- Name: morphologies_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.morphologies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.morphologies_id_seq OWNER TO postgres;

--
-- Name: morphologies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.morphologies_id_seq OWNED BY public.morphologies.id;


--
-- Name: patients; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.patients (
    id integer NOT NULL,
    patient_code character varying(9),
    first_name character varying(100) NOT NULL,
    last_name character varying(100),
    age integer NOT NULL,
    phone character varying(15),
    doctor character varying(150),
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.patients OWNER TO postgres;

--
-- Name: patients_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.patients_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.patients_id_seq OWNER TO postgres;

--
-- Name: patients_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.patients_id_seq OWNED BY public.patients.id;


--
-- Name: samples; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.samples (
    id integer NOT NULL,
    sample_code character varying(20),
    patient_id integer NOT NULL,
    sample_type character varying(50) NOT NULL,
    collection_datetime timestamp with time zone NOT NULL,
    abstinence_days integer NOT NULL,
    status character varying(30) NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    collection_method character varying(50),
    collection_place character varying(50),
    remarks text
);


ALTER TABLE public.samples OWNER TO postgres;

--
-- Name: samples_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.samples_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.samples_id_seq OWNER TO postgres;

--
-- Name: samples_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.samples_id_seq OWNED BY public.samples.id;


--
-- Name: semen_analyses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.semen_analyses (
    id integer NOT NULL,
    sample_id integer NOT NULL,
    volume_ml double precision NOT NULL,
    ph double precision NOT NULL,
    total_motility_percent double precision NOT NULL,
    progressive_motility_percent double precision NOT NULL,
    liquefaction_minutes integer NOT NULL,
    viscosity character varying(30) NOT NULL,
    appearance character varying(30) NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    criteria character varying(30) NOT NULL,
    sperm_concentration_million_ml double precision NOT NULL,
    wbc_concentration_million_ml double precision NOT NULL,
    pus_cells character varying(20) NOT NULL,
    debris character varying(20) NOT NULL,
    agglutination character varying(20) NOT NULL,
    rapid_progressive_percent double precision NOT NULL,
    slow_progressive_percent double precision NOT NULL,
    non_progressive_percent double precision NOT NULL,
    immotile_percent double precision NOT NULL,
    morphology_normal_percent double precision NOT NULL,
    morphology_abnormal_percent double precision NOT NULL,
    comments text
);


ALTER TABLE public.semen_analyses OWNER TO postgres;

--
-- Name: semen_analyses_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.semen_analyses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.semen_analyses_id_seq OWNER TO postgres;

--
-- Name: semen_analyses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.semen_analyses_id_seq OWNED BY public.semen_analyses.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    full_name character varying(150) NOT NULL,
    password_hash character varying NOT NULL,
    role public.userrole NOT NULL,
    is_active boolean NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: dfis id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dfis ALTER COLUMN id SET DEFAULT nextval('public.dfis_id_seq'::regclass);


--
-- Name: morphologies id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.morphologies ALTER COLUMN id SET DEFAULT nextval('public.morphologies_id_seq'::regclass);


--
-- Name: patients id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.patients ALTER COLUMN id SET DEFAULT nextval('public.patients_id_seq'::regclass);


--
-- Name: samples id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.samples ALTER COLUMN id SET DEFAULT nextval('public.samples_id_seq'::regclass);


--
-- Name: semen_analyses id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.semen_analyses ALTER COLUMN id SET DEFAULT nextval('public.semen_analyses_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: alembic_version; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.alembic_version (version_num) FROM stdin;
8221d302430a
\.


--
-- Data for Name: dfis; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.dfis (id, sample_id, dfi_percent, hds_percent, method, remarks, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: morphologies; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.morphologies (id, sample_id, normal_forms_percent, head_defects_percent, neck_midpiece_defects_percent, tail_defects_percent, excess_residual_cytoplasm_percent, sperm_evaluated, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: patients; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.patients (id, patient_code, first_name, last_name, age, phone, doctor, created_at, updated_at) FROM stdin;
1	P26000001	vedant	rode	20	7447892904	rekha	2026-07-31 10:52:13.155162+05:30	2026-07-31 10:52:13.155162+05:30
2	P26000002	aniket	shinde	20	7890020303	gupta	2026-07-31 10:52:59.200844+05:30	2026-07-31 10:52:59.200844+05:30
3	P26000003	rahul	shinde	20	7890057893	mrunali	2026-07-31 10:53:29.168436+05:30	2026-07-31 10:53:29.168436+05:30
4	P26000004	rohan	bhale	25	7898568427	rushali	2026-07-31 11:46:39.118768+05:30	2026-07-31 12:14:29.606898+05:30
5	P26000005	advait	kulkarni	24	8938495068	akash	2026-08-01 01:36:36.519736+05:30	2026-08-01 01:36:36.519736+05:30
6	P26000006	advait	kulkarni	24	8938495068	akash	2026-08-01 01:36:46.765748+05:30	2026-08-01 01:36:46.765748+05:30
7	P26000007	advait	kulkarni	24	8938495068	akash	2026-08-01 01:36:47.232411+05:30	2026-08-01 01:36:47.232411+05:30
8	P26000008	advait	deshpande	25	5678395748	reva	2026-08-01 01:40:13.911173+05:30	2026-08-01 01:40:13.911173+05:30
9	P26000009	soham	kirtankar	29	1234567890	pushkar	2026-08-01 01:46:01.263624+05:30	2026-08-01 01:46:01.263624+05:30
10	P26000010	subodh	tatkare	21	0987654321	rekha	2026-08-01 01:51:20.379599+05:30	2026-08-01 01:51:20.379599+05:30
\.


--
-- Data for Name: samples; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.samples (id, sample_code, patient_id, sample_type, collection_datetime, abstinence_days, status, created_at, updated_at, collection_method, collection_place, remarks) FROM stdin;
1	S26000001	4	urine	2026-07-31 13:32:00+05:30	6	Collected	2026-07-31 12:36:18.271356+05:30	2026-07-31 12:36:18.271356+05:30	urine	lab	na
2	S26000002	4	semen	2026-07-31 23:58:00+05:30	30	Collected	2026-07-31 23:58:40.290944+05:30	2026-07-31 23:58:40.290944+05:30	masturbation	lab	
3	S26000003	8	semen	2026-08-01 01:41:00+05:30	25	Collected	2026-08-01 01:41:19.10294+05:30	2026-08-01 01:41:19.10294+05:30	masutrbation	lab	
4	S26000004	8	semen	2026-08-02 01:43:00+05:30	20	Collected	2026-08-01 01:44:13.140419+05:30	2026-08-01 01:44:13.140419+05:30	masturbation	lab	
5	S26000005	9	semen	2026-08-01 01:46:00+05:30	30	Collected	2026-08-01 01:46:30.692134+05:30	2026-08-01 01:46:30.692134+05:30	masturbation	lab	
6	S26000006	10	semen	2026-08-01 01:51:00+05:30	20	Collected	2026-08-01 01:51:40.638022+05:30	2026-08-01 01:51:40.638022+05:30	masturbation	lab	
7	S26000007	10	semen	2026-08-01 02:18:00+05:30	15	Collected	2026-08-01 02:19:08.661791+05:30	2026-08-01 02:19:08.661791+05:30	masturbation	lab	
\.


--
-- Data for Name: semen_analyses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.semen_analyses (id, sample_id, volume_ml, ph, total_motility_percent, progressive_motility_percent, liquefaction_minutes, viscosity, appearance, created_at, updated_at, criteria, sperm_concentration_million_ml, wbc_concentration_million_ml, pus_cells, debris, agglutination, rapid_progressive_percent, slow_progressive_percent, non_progressive_percent, immotile_percent, morphology_normal_percent, morphology_abnormal_percent, comments) FROM stdin;
1	1	4	7.5	50	40	30	Normal	Normal	2026-07-31 16:29:42.036689+05:30	2026-07-31 23:06:34.894288+05:30	WHO 2021	56	25.7	Few	Mild	+	30	10	10	50	1	99	nothing
2	7	4	7.4	51	28	29	Normal	Normal	2026-08-01 02:23:02.987035+05:30	2026-08-01 02:23:02.987035+05:30	WHO 2021	55	0.8	None	Mild	None	2	26	23	49	1	99	nothing
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, full_name, password_hash, role, is_active, created_at, updated_at) FROM stdin;
1	admin	System Administrator	$2b$12$pt9dDaqstZaKz32p7eb7je1WQL7nBTu7ZR4P79qLNNdacnhgWPzTq	ADMIN	t	2026-07-31 00:39:49.105445+05:30	2026-07-31 00:39:49.105445+05:30
\.


--
-- Name: dfis_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.dfis_id_seq', 1, false);


--
-- Name: morphologies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.morphologies_id_seq', 1, false);


--
-- Name: patients_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.patients_id_seq', 10, true);


--
-- Name: samples_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.samples_id_seq', 7, true);


--
-- Name: semen_analyses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.semen_analyses_id_seq', 2, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- Name: alembic_version alembic_version_pkc; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alembic_version
    ADD CONSTRAINT alembic_version_pkc PRIMARY KEY (version_num);


--
-- Name: dfis dfis_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dfis
    ADD CONSTRAINT dfis_pkey PRIMARY KEY (id);


--
-- Name: dfis dfis_sample_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dfis
    ADD CONSTRAINT dfis_sample_id_key UNIQUE (sample_id);


--
-- Name: morphologies morphologies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.morphologies
    ADD CONSTRAINT morphologies_pkey PRIMARY KEY (id);


--
-- Name: morphologies morphologies_sample_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.morphologies
    ADD CONSTRAINT morphologies_sample_id_key UNIQUE (sample_id);


--
-- Name: patients patients_patient_code_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.patients
    ADD CONSTRAINT patients_patient_code_key UNIQUE (patient_code);


--
-- Name: patients patients_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.patients
    ADD CONSTRAINT patients_pkey PRIMARY KEY (id);


--
-- Name: samples samples_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.samples
    ADD CONSTRAINT samples_pkey PRIMARY KEY (id);


--
-- Name: semen_analyses semen_analyses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.semen_analyses
    ADD CONSTRAINT semen_analyses_pkey PRIMARY KEY (id);


--
-- Name: semen_analyses semen_analyses_sample_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.semen_analyses
    ADD CONSTRAINT semen_analyses_sample_id_key UNIQUE (sample_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: ix_dfis_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_dfis_id ON public.dfis USING btree (id);


--
-- Name: ix_morphologies_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_morphologies_id ON public.morphologies USING btree (id);


--
-- Name: ix_patients_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_patients_id ON public.patients USING btree (id);


--
-- Name: ix_samples_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_samples_id ON public.samples USING btree (id);


--
-- Name: ix_samples_sample_code; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX ix_samples_sample_code ON public.samples USING btree (sample_code);


--
-- Name: ix_semen_analyses_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_semen_analyses_id ON public.semen_analyses USING btree (id);


--
-- Name: ix_users_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_users_id ON public.users USING btree (id);


--
-- Name: dfis dfis_sample_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dfis
    ADD CONSTRAINT dfis_sample_id_fkey FOREIGN KEY (sample_id) REFERENCES public.samples(id);


--
-- Name: morphologies morphologies_sample_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.morphologies
    ADD CONSTRAINT morphologies_sample_id_fkey FOREIGN KEY (sample_id) REFERENCES public.samples(id);


--
-- Name: samples samples_patient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.samples
    ADD CONSTRAINT samples_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patients(id);


--
-- Name: semen_analyses semen_analyses_sample_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.semen_analyses
    ADD CONSTRAINT semen_analyses_sample_id_fkey FOREIGN KEY (sample_id) REFERENCES public.samples(id);


--
-- PostgreSQL database dump complete
--

\unrestrict GpnYXK3Wc9CyHnAwHdQmqbPjpTrhPeq2Mv6JWpckXTpOnJ1t4lNYiNVn8tT9y1i

