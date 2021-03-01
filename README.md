# Bongari

Ensimmäiset testit menee läpi.

## ENDPOINTIT:

/GET
api/objects/ ALL
api/objects/:id ONE
api/objects/:categories CATEGORIES

/GET/POST/PUT/DELETE
api/users ALL
api/users/:id ONE

/GET/POST/PUT/DELETE
api/finds/:userId
api/finds/:objectId
api/finds/:id

/POST
api/login POST
  - palauttaa tokenin

## MODELIT:

User:
  id
  username
  name
  email
  passwordHash
  finds:
    [findId]

Object:
  id
  name
  name_latin
  family
  image
  category

Find:
  id
  user
  object
  date
  location
  image
  information
