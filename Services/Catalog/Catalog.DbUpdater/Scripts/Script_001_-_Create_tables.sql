
--
-- PostgreSQL database dump
--

SET statement_timeout = 0; -- Abort any statement that takes more than the specified amount of time. Setting statement_timeout in postgresql.conf is not recommended because it would affect all sessions.
SET lock_timeout = 0; -- Abort any statement that waits longer than the specified amount of time while attempting to acquire a lock on a table, index, row, or other database object. Setting lock_timeout in postgresql.conf is not recommended because it would affect all sessions.
SET idle_in_transaction_session_timeout = 0; -- Terminate any session that has been idle (that is, waiting for a client query) within an open transaction for longer than the specified amount of time. A value of zero (the default) disables the timeout.
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on; --the default is on, meaning that backslash escapes are recognized only in escape string constants. \n \r
SET check_function_bodies = false; --it disables validation of the routine body string during CREATE FUNCTION and CREATE PROCEDURE. Disabling validation avoids side effects of the validation process, in particular preventing false positives due to problems such as forward references.
SET xmloption = content; --Sets whether DOCUMENT or CONTENT is implicit when converting between XML and character string values.
SET client_min_messages = warning; --Controls which message levels are sent to the client.
SET row_security = off; --Controls which message levels are sent to the client.

--
-- Name: case_insensitive; Type: COLLATION; Schema: public; Owner: -
--

CREATE COLLATION public.case_insensitive (provider = icu, deterministic = false, locale = '@colStrength=secondary');

SET default_tablespace = '';

SET default_table_access_method = heap;

CREATE TABLE public.product (
                              id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 NO MAXVALUE CACHE 1 ),
                              author character varying(255) NOT NULL COLLATE public.case_insensitive,
                              title character varying(255) NOT NULL COLLATE public.case_insensitive,
                              description character varying NOT NULL,
                              price numeric NOT NULL CHECK (price > 0),
                              preview_image character varying NOT NULL,
                              main_image character varying,
                              time_created timestamp with time zone NOT NULL,
                              CONSTRAINT "PK_product" PRIMARY KEY (id)
);

CREATE TABLE public.genre (
                              id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 NO MAXVALUE CACHE 1 ),
                              name character varying(255) NOT NULL COLLATE public.case_insensitive,
                              CONSTRAINT "PK_genre" PRIMARY KEY (id)
);

CREATE TABLE public.feature (
                              id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 NO MAXVALUE CACHE 1 ),
                              name character varying(255) NOT NULL COLLATE public.case_insensitive,
                              CONSTRAINT "PK_feature" PRIMARY KEY (id)
);

CREATE TABLE public.platform (
                              id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 NO MAXVALUE CACHE 1 ),
                              name character varying(255) NOT NULL COLLATE public.case_insensitive,
                              CONSTRAINT "PK_platform" PRIMARY KEY (id)
);

CREATE TABLE public.product_genre (
                              products_id integer NOT NULL REFERENCES public.product (id) ON UPDATE NO ACTION ON DELETE CASCADE,
                              genres_id integer NOT NULL REFERENCES public.genre (id) ON UPDATE NO ACTION ON DELETE CASCADE,
                              CONSTRAINT "PK_product_genre" PRIMARY KEY (genres_id, products_id)
);

CREATE TABLE public.product_feature (
                              products_id integer NOT NULL REFERENCES public.product (id) ON UPDATE NO ACTION ON DELETE CASCADE,
                              features_id integer NOT NULL REFERENCES public.feature (id) ON UPDATE NO ACTION ON DELETE CASCADE,
                              CONSTRAINT "PK_product_feature" PRIMARY KEY (features_id, products_id)
);

CREATE TABLE public.product_platform (
                              products_id integer NOT NULL REFERENCES public.product (id) ON UPDATE NO ACTION ON DELETE CASCADE,
                              platforms_id integer NOT NULL REFERENCES public.platform (id) ON UPDATE NO ACTION ON DELETE CASCADE,
                              CONSTRAINT "PK_product_platform" PRIMARY KEY (platforms_id, products_id)
);

CREATE INDEX "IX_product_genre_product_id"
              ON public.product_genre USING btree
              (products_id ASC NULLS LAST);

CREATE INDEX "IX_product_feature_product_id"
              ON public.product_feature USING btree
              (products_id ASC NULLS LAST);

CREATE INDEX "IX_product_platform_product_id"
              ON public.product_platform USING btree
              (products_id ASC NULLS LAST);