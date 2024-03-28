
# Blog Site Backend

This is the backend component of a simple blog site project built with Express.js and Prisma, using PostgreSQL as the database.

## Features

- User authentication: Register, login, and logout functionalities.
- CRUD operations for managing blog posts.
- API endpoints for interacting with blog posts and users.
- JWT-based authentication and authorization.
- Database management with Prisma ORM and PostgreSQL.

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the backend directory:

   ```bash
   cd backend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables:

   - Create a `.env` file based on the `.env.example` template.
   - Configure the required environment variables, such as database connection details and JWT secret key.

5. Run database migration:

   ```bash
   npx prisma migrate dev
   ```

   This command will apply any pending migrations and create/update the database schema based on your Prisma schema file (`schema.prisma`).

6. Run the server:

   ```bash
   npm run start
   ```

   The server will start running on the specified port (default is port 3000).

## Endpoints

The following endpoints are available:

- **Authentication**:
  - `POST /auth/createUser`: Register a new user.
  - `POST /auth/login`: Login with existing credentials.
- **Blog Posts**:
  - `GET /posts`: Get all blog posts.
  - `GET /posts/:id`: Get a specific blog post by ID.
  - `POST /posts`: Create a new blog post.
  - `PUT /posts/:id`: Update an existing blog post by ID.
  - `DELETE /posts/:id`: Delete a blog post by ID.

## Technologies Used

- Express.js: Web framework for Node.js
- Prisma: Database toolkit and ORM for Node.js
- PostgreSQL: Relational database for storing blog posts and user data
- JSON Web Tokens (JWT): Token-based authentication mechanism

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues if you encounter any bugs or have suggestions for improvements.

## License

This project is not currently licensed.
---
# Blog
