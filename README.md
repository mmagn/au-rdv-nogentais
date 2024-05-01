# Dev setup

## Prisma

`npx prisma init`

`createdb au_rdb_nogentais_dev`
`psql -d au_rdv_nogentais_dev`
`CREATE USER "user" WITH PASSWORD 'password';`
`GRANT ALL PRIVILEGES ON DATABASE au_rdv_nogentais_dev TO "user";`
`ALTER USER "user" WITH CREATEDB;`
