Here’s a translation and slight enhancement for your README to serve as a comprehensive example for your repository:  

---

# Back-End Starter Template with Node.js

This repository serves as an example of how to build a complete and well-structured back-end application using **Node.js**. It provides a foundation that can be used as a starting point for any project.

## Branch Structure

### `main`
A complete yet basic back-end structure developed with the following stack:
- **Node.js**
- **Express**
- **Prisma**
- **MongoDB** (as the database)
- **Jest** (for unit testing)

### `develop`
A refined back-end structure following my custom code pattern, which adheres to the principles of **Clean Architecture**. This branch uses the same stack:
- **Node.js**
- **Express**
- **Prisma**
- **MongoDB** (as the database)
- **Jest** (for unit testing)

## Getting Started

### Prerequisites
Make sure you have the following installed:
- **Node.js** (v14 or higher)
- **MongoDB** (local or cloud database)
- A package manager (**npm** or **yarn**)

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/express-app.git
   cd express-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Configure environment variables:
   - Create a `.env` file at the root of the project and add your MongoDB connection URL:
     ```
     DATABASE_URL=<your-mongodb-url>
     ```
   - Set the application's port in `.env.config`:
     ```
     PORT=5000
     ```

4. Run the application:
   ```bash
   npm dev
   # or
   yarn dev
   ```

### Testing
Run unit tests with Jest:
```bash
npm test
# or
yarn test
```

## Features
- Modular folder structure for scalability and maintainability
- Prisma ORM for database access
- Clean and extensible code following best practices
- Preconfigured unit tests with Jest

## Contributions
Feel free to fork this repository and submit pull requests to enhance its functionality. Contributions are always welcome!

---

This README should provide clear guidance for developers looking to use your repository. Let me know if you want to add more sections or adjustments!
