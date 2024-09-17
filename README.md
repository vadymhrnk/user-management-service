# <div align="center">User Management Service</div>

Welcome to the Management Service project! This project is aimed to create a web application to manage users.

#### You can click on this link to view the OpenAPI interface: http://ec2-3-84-127-228.compute-1.amazonaws.com/swagger-ui/index.html#

#### Or follow this link to use the user-friendly interface: http://user-management-bckt.s3-website-us-east-1.amazonaws.com/


## Get Started

### To run the backend part of the project, follow this instruction:

1. Clone the repository:

   ```bash
   git clone https://github.com/vadymhrnk/user-management-service.git
   ```

2. Download [JDK](https://www.oracle.com/java/technologies/downloads/), [Apache Maven](https://maven.apache.org/download.cgi) and [Docker](https://docs.docker.com/get-docker/)

3. Go to this folder:

   ```bash
   cd user-management-service/backend
   ```

4. Build \*.jar file for the Docker:

   ```bash
   mvn package
   ```

5. Build and then run the project using Docker:

   ```bash
   docker compose build

   docker compose up
   ```

### To run the frontend part of the project, follow next instructions:

1. Download [Node.js](https://nodejs.org/en/download/package-manager)

2. Create new Terminal in the `user-management-service/frontend` folder.

3. Install all dependencies:

   ```bash
   npm install
   ```

4. Run the project using this command:

   ```bash
   npm start
   ```

## Technologies Used

### Backend Technologies

- **Java 17**: the primary programming language for backend development.
- **Spring Boot**: framework for building and deploying Java-based applications with ease.
  - **Spring Boot Starter Data JPA**: starter for using Spring Data JPA with Hibernate.
  - **Spring Boot Starter Web**: starter for building web applications, including RESTful APIs.
  - **Spring Boot Starter Validation**: starter for validation support.
  - **Spring Boot Starter Test**: starter for testing Spring Boot applications.
- **PostgreSQL**: robust, open-source relational database for storing data.
- **H2 Database**: in-memory database for testing purposes.
- **Liquibase Core**: database-independent library for tracking, managing, and applying database schema changes.
- **MapStruct**: simplifies the implementation of bean mappings, reducing manual coding effort.
- **Lombok**: tool to reduce boilerplate code, enhancing code readability and conciseness.
- **Springdoc OpenAPI UI**: OpenAPI tool for generating documentation with a UI interface.
- **Docker**: used for containerizing and deploying applications consistently across various environments.

### Frontend Technologies

- **React**: JavaScript library for building user interfaces.
- **Sass**: preprocessor scripting language that is interpreted or compiled into CSS.
- **Axios**: promise-based HTTP client for making API requests.

## Application Endpoints

### Backend Endpoints

- `POST: /users` -> Create a new user.
- `GET: /users` -> Get a list of all users.
- `PUT: /users/{id}` -> Update an existing user.
- `DELETE: /users/{id}` -> Delete a user by ID.
- `GET: /users/search?name={name}` -> Search users by name.
