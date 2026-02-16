Mandatory:
# we have to create docker, 
Deployment must use a containerization solution (Docker, Podman, or equivalent) and run with a single command

# make file must be created also.

# No warnings or errors should appear in the browser console.

# Your application must have a basic user management system. Users must be
able to sign up and log in securely:
◦ At minimum: email and password authentication with proper security (hashed
passwords, salted, etc.).
◦ Additional authentication methods (OAuth, 2FA, etc.) can be implemented
via modules.
• All forms and user inputs must be properly validated in both the frontend and
backend.




# techinical workflow:

## database:
        it is a postgress neon.tech, i have only one user, i cannot add anyextra      users. so if you need any edit or to check the database please come to me and check it from my account. i am so sorry for this.

### we have Prisma ORM, and prisma is : 
        Prisma is a modern ORM (Object-Relational Mapping) tool for Node.js and TypeScript that acts as a bridge between your application code and your database.
        # What it does:
        Prisma lets you interact with databases using JavaScript/TypeScript instead of writing raw SQL queries. You define your database schema in a readable format, and Prisma generates a type-safe client that you use to query and manipulate data.
        
### Why you might need it:
        You get auto-completion and type safety when writing database queries, which catches errors before runtime. It supports multiple databases (PostgreSQL, MySQL, SQLite, MongoDB, etc.) with the same API, making it easier to switch if needed. Prisma handles complex things like migrations, relations between tables, and connection pooling automatically.

### how to create the schema, models for database?
        the schema file founded in /primsa/schema.prisma, access this file and add your model.
        after you edit your model. you have to:
**Create a migration**
        - npx prisma migrate dev --name add_user_name.
    
    This does three things:
        Creates a new migration file in prisma/migrations/ with the SQL needed
        Applies the migration to your database
        Regenerates the Prisma Client with updated types

    For production:
        When deploying:

        run npx prisma migrate deploy
        
        to apply pending migrations without the dev-specific features.
    If you mess up:
        You can reset your database with

        npx prisma migrate reset
        
        (warning: deletes all data) or manually roll back by deleting the migration file and running migrations again.

