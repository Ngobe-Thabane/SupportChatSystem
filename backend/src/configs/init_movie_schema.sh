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
DROP TABLE genres CASCADE;
DROP TABLE movies CASCADE;
DROP TABLE movie_genres;
DROP TABLE theaters CASCADE;
DROP TABLE showtimes CASCADE;
DROP TABLE seats CASCADE;
DROP TABLE bookings;

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

CREATE TABLE IF NOT EXISTS theaters(
theater_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
name VARCHAR(100) NOT NULL,
location VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS showtimes(
showtime_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
movie_id UUID NOT NULL REFERENCES movies(movie_id) ON DELETE CASCADE,
theater_id UUID NOT NULL REFERENCES theaters(theater_id) ON DELETE CASCADE,
show_date DATE NOT NULL,
start_time TIME NOT NULL
);

CREATE TABLE IF NOT EXISTS seats (
  seat_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  showtime_id UUID NOT NULL REFERENCES showtimes(showtime_id) ON DELETE CASCADE,
  seat_number VARCHAR(10) NOT NULL, -- e.g., A1, B3
  is_reserved BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS bookings (
  booking_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  seat_id UUID NOT NULL REFERENCES seats(seat_id) ON DELETE CASCADE,
  booked_at TIMESTAMP DEFAULT NOW(),
  status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'cancelled')),
  canceled_at TIMESTAMP,
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(seat_id)
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

INSERT INTO theaters (name, location) VALUES
  ('AMC Empire 25', 'New York, USA'),
  ('Regal LA Live', 'Los Angeles, USA'),
  ('Odeon Leicester Square', 'London, UK'),
  ('Vue West End', 'London, UK'),
  ('Cineplex Scotiabank Theatre', 'Toronto, Canada'),
  ('Landmark Cinemas', 'Calgary, Canada'),
  ('Hoyts Melbourne Central', 'Melbourne, Australia'),
  ('Event Cinemas George St', 'Sydney, Australia'),
  ('Pathé La Villette', 'Paris, France'),
  ('UGC Ciné Cité Les Halles', 'Paris, France'),
  ('CineStar Berlin', 'Berlin, Germany'),
  ('CinemaxX Hamburg-Dammtor', 'Hamburg, Germany'),
  ('Toho Cinemas Shinjuku', 'Tokyo, Japan'),
  ('United Cinemas Toyosu', 'Tokyo, Japan'),
  ('PVR ICON', 'Mumbai, India'),
  ('INOX Leisure', 'Delhi, India'),
  ('Cinépolis JK Iguatemi', 'São Paulo, Brazil'),
  ('UCI New York City Center', 'Rio de Janeiro, Brazil'),
  ('Ster-Kinekor Sandton City', 'Johannesburg, South Africa'),
  ('Nu Metro Hyde Park', 'Johannesburg, South Africa');

EOF
  )
fi

echo "$SQL_COMMANDS" | psql -U "$DB_USER" -d "$DB_NAME" -h "$DB_HOST" -p "$DB_PORT"
