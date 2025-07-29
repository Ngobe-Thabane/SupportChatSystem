#!/bin/bash

# Database connection variables
DB_NAME="postgres"
DB_USER="postgres"
DB_HOST="172.17.0.1"
DB_PORT="5432"
DB_PASSWORD="supportChat"
SQL_COMMANDS=""

if [ "$1" = "drop" ]; then
  SQL_COMMANDS=$(
    cat <<EOF
DROP TABLE users;
DROP TABLE genres;
DROP TABLE movies CASCADE;
DROP TABLE movie_genres;
DROP TABLE theater CASCADE;
DROP TABLE showtimes CASCADE;
EOF
  )

else
  SQL_COMMANDS=$(
    cat <<EOF
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS users (
user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
username VARCHAR(100) NOT NULL,
email VARCHAR(255) UNIQUE NOT NULL,
password TEXT NOT NULL,
role VARCHAR(20) DEFAULT 'user' NOT NULL CHECK (role IN ('user', 'admin')),
created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS genres (
genre_id integer PRIMARY KEY,
name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS movies (
movie_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
title VARCHAR(255) NOT NULL,
poster_url TEXT,
description TEXT
);

CREATE TABLE IF NOT EXISTS movie_genres (
movie_id UUID REFERENCES movies(movie_id) ON DELETE CASCADE,
genre_id INTEGER REFERENCES genres(genre_id) ON DELETE CASCADE,
PRIMARY KEY (movie_id, genre_id)
);

CREATE TABLE IF NOT EXISTS theater(
theater_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
name VARCHAR(100) NOT NULL,
location VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS showtimes(
showtime_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
movie_id UUID NOT NULL REFERENCES movies(movie_id) ON DELETE CASCADE,
theater_id UUID NOT NULL REFERENCES theater(theater_id) ON DELETE CASCADE,
show_date DATE NOT NULL,
start_time TIME NOT NULL
);

INSERT INTO genres (genre_id, name) VALUES
(28, 'Action'),
(12, 'Adventure'),
(16, 'Animation'),
(35, 'Comedy'),
(80, 'Crime'),
(99, 'Documentary'),
(18, 'Drama'),
(10751, 'Family'),
(14, 'Fantasy'),
(36, 'History'),
(27, 'Horror'),
(10402, 'Music'),
(9648, 'Mystery'),
(10749, 'Romance'),
(878, 'Science Fiction'),
(10770, 'TV Movie'),
(53, 'Thriller'),
(10752, 'War'),
(37, 'Western');

EOF
  )
fi
# Run the SQL commands using psql
echo "$SQL_COMMANDS" | psql -U "$DB_USER" -d "$DB_NAME" -h "$DB_HOST" -p "$DB_PORT"
