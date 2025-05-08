# Setup Instructions

## Node Version

- Please make sure you are using Node.js v20 or above.
- This is required because crypto.randomUUID() is used in the project.

## Package Installation

- Install all project dependencies using:

npm install --legacy-peer-deps

✅ This will also install Swagger packages properly without any peer dependency issues.

(If you face issues with Swagger, make sure @nestjs/swagger and swagger-ui-express are installed.)

## Environment Variables (.env)

Create a `.env` file in the root directory with the following contents:

POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USERNAME=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DATABASE=greekaTaskCRUD
PORT=4000
BASE_URL=localhost
NODE_ENV=development
HASH_NUMBER=10

**Important Notes:**
- Do NOT use quotes in env values (no ' or ").
- Create the PostgreSQL database and enable the uuid-ossp extension before running.

To create the database and enable UUID extension:

psql -h localhost -U postgres

Then run:

CREATE DATABASE "greekaTaskCRUD";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
