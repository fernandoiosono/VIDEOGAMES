-- Insomnia GET Genres/All
-- Insomnia GET Platforms/All

INSERT INTO public."Games" ("idGame", name, description, image, released, rating)
VALUES ('b19d597c-8f54-41ba-ba73-02299c1adf92', 
		'Nombre del Juego', 'Descripción del Juego', 
		'ruta_de_la_imagen.jpg', now(), 4.5);

INSERT INTO public."GamesGenres" ("idGame", "idGenre")
VALUES ('b19d597c-8f54-41ba-ba73-02299c1adf92', 1),
	('b19d597c-8f54-41ba-ba73-02299c1adf92', 2),
	('b19d597c-8f54-41ba-ba73-02299c1adf92', 3);
	
INSERT INTO public."GamesPlatforms" ("idGame", "idPlatform")
VALUES ('b19d597c-8f54-41ba-ba73-02299c1adf92', 12),
	('b19d597c-8f54-41ba-ba73-02299c1adf92', 13),
	('b19d597c-8f54-41ba-ba73-02299c1adf92', 14);
	
SELECT * FROM public."Games";
SELECT * FROM public."Genres";
SELECT * FROM public."Platforms";
SELECT * FROM public."GameGenre";
SELECT * FROM public."GamePlatform";

--DROP TABLE public."GamesGenres";