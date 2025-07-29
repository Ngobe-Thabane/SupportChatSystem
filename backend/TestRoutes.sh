#!/bin/bash

BASE_URL='http://localhost:5000'
HEADER="Content-Type:application/json"
TOKEN="Authorization:Bearer"

if [ "$1" = "login" ]; then
  curl POST -v -H ${HEADER} -d '{"email":"admin@gmail.com","password":"admin"}' "${BASE_URL}/api/auth/login"

elif [ "$1" = "register" ]; then
  curl POST -v -H ${HEADER} -d '{"username":"admin", "email":"admin@gmail.com", "password": "admin"}' "${BASE_URL}/api/auth/register"

elif [ "$1" = "addMovie" ]; then
  curl POST -v -H ${HEADER} -H "${TOKEN} $2" -d '{"title": "Inception","poster_url": "inception.jpg","description": "A mind-bending thriller","genres": [28, 878, 12]}' ${BASE_URL}/movie
elif [ "$1" = "movies" ]; then
  curl GET -v -H ${HEADER} -H "${TOKEN} $2" "${BASE_URL}/movies"
fi
