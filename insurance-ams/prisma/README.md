# Data Base Information

## General Information
schema.prisma file is the layout/tables of our data base. We are using neon site to hold our data base `https://console.neon.tech/app/projects`. You edit file to edite our data tables then push the update to server with command `npx prisma db push`. We can test queries with scripts

## Connecting to Data Base
Must have `.env` file in root of `insurance-ams` folder. Ensure to enclude the file name in your `.gitignore` file which is in same root location. Define `DATABASE_URL= ... ` variable in your `.env` this is your end point to connect to db. We can make branches of out db like github. I have created a "dummyData" branch that is a child of main which already hold our starting table layout. I will be adding dummd data to serve us during this project.

## Scripts Information
`insurance-ams/prisma/db_Scripts` contains scripts to test and query bd.

To run update `package.json` in root directory and add Script Name like `dbSandBox` with the command `nodemon (filepath)`. Then to execute script file run `npm run (Script Name)`. In this example it would be `npm run dbSandBox`.

Must have `tsx` package installed to run the .tsx script. Run `npm install -g tsx` in terminal.

```
 "scripts": {
    "dbSandBox": "npx tsx prisma/db_Scripts/sandbox.tsx",
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
```

### Script files
1. `deleteData` - deletes all the data from the tables but leaves the table formate
2. `createDefaultClient` - creates 1 client names John Joe
3. `sandbox` - space to play with db
4. `syntheticData` - populates data at random using `@faker-js/faker`. Must install using `npm install --save-dev @faker-js/faker`.
5. `dashBoardData` - demonstrates all functions for data displayed on dashBoard.

# Commands:

## View Tables
`npx prisma studio` - Locally will display tables in a localhost:port on your machine (better than looking through neon site)

## Dependancies
`npm install -g tsx` - package to run .tsx files
`npm install --save-dev @faker-js/faker` - prisma's buit-in seeding to add synthetic data

## Development
1. `npx prisma validate` - checks syntax (do before you generate generator Client)
2. `npx prisma generate` - Generate Prisma Client (Required After Schema Changes). Allows to use prisma objects/tables (ex. cliam, client) in our project.
3. `npx prisma db push` - db push (Development Mode). Update current db
4. `npx prisma migrate dev --name your_migration_name` - migrate dev. Creates branch like github.

# Clean cache
```
rm -rf node_modules/.prisma
npx prisma generate
```