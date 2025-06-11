#!/bin/bash

# Database connection variables
DB_NAME="postgres"
DB_USER="postgres"
DB_HOST="172.17.0.1"
DB_PORT="5432"
DB_PASSWORD="chatSytem"


SQL_COMMANDS=$(cat <<EOF
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
  genre_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  api_genre_id integer NOT NULL
);

CREATE TABLE IF NOT EXISTS movies (
  movie_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  image_url text,
  description TEXT,
  genres integer[],
  duration_minutes INT NOT NULL,
  release_date DATE
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
EOF
)

# Run the SQL commands using psql
echo "$SQL_COMMANDS" | psql -U "$DB_USER" -d "$DB_NAME" -h "$DB_HOST" -p "$DB_PORT"
