# DevstockHub

## Table of Contents

- [General Information](#general-information)
- [Technologies](#technologies)
- [Features](#features)
- [Environment Variables](#environment-variables)
- [Installation and Setup](#installation-and-setup)
- [Contributing](#contributing)
- [Contact](#contact)

---

## General Information

DevstockHub is a web application designed for browsing and purchasing electronic equipment such as computer mice, keyboards, monitors, headphones, and webcams. The platform includes an AI-powered advisor to help users choose the right products based on their needs. Users can add products to their cart, provide a delivery address, and complete the purchase process seamlessly.

---

## Technologies

This project is built using the following technologies:

- **Next.js** – React-based framework for building full-stack web applications.
- **React 19** – Frontend library for building interactive UIs.
- **Tailwind CSS** – Utility-first CSS framework for styling.
- **TypeScript** – Strongly typed language for safer and more maintainable code.
- **Prisma** – ORM (Object-Relational Mapping) for database interaction.
- **PostgreSQL** – Relational database used as the main data store.
- **NextAuth.js** – Authentication system for secure user login.
- **React Hook Form** – Library for managing forms and validations.
- **Zod** – Type-safe schema validation.
- **OpenAI API** – Integration with AI assistant for product recommendations.
- **Radix UI** – Accessible UI components for consistent design.
- **Embla Carousel** – Lightweight carousel component for product sliders.

Additional tools:

- **use-debounce** – Utility for debounced input handling.
- **dotenv** – Environment variable management.
- **bcrypt** – Password hashing.
- **Vercel Analytics & Speed Insights** – Performance monitoring and analytics.

---

## Features

- **User Authentication**: Secure login and registration functionality for users.
- **Product Catalog**:
  - Display the full assortment of products.
  - Detailed product pages for each item.
- **Product Filtering and Sorting**:
  - Filter products by brand, category, minimum price, and maximum price.
  - Sort products by the latest additions or by price (ascending or descending).
- **Shopping Cart**:
  - Add and remove products from the cart.
  - Add insurance for products.
  - Adjust the quantity of products in the cart.
- **Address Management**: Allows users to change their delivery address during the checkout process.
- **User Profile**:
  - View user details, including order history and saved addresses.
- **AI-Powered Product Recommendations**: An AI shopping assistant that knows the entire product catalog and helps users choose the right products.
- **Responsive Design**: Optimized for both mobile and desktop devices.

---

## Environment Variables

To run the application, you need to configure the following environment variables:

### Application Environment Variables

Create a `.env` file in the root directory and include the following variables:

- `BASE_URL` – Specifies the main hostname (e.g., `http://localhost:3000`).
- `DATABASE_URL` – Connection string for your local PostgreSQL database.
- `NEXTAUTH_SECRET` – Secret key used for session encryption and authentication.
- `OPENAI_API_KEY` – Your OpenAI API key for enabling the AI assistant feature.

### Docker Environment Variables

If you are using Docker, ensure your `docker-compose.yml` file includes these variables:

- `POSTGRES_USER` – The database username.
- `POSTGRES_PASSWORD` – The database password.
- `POSTGRES_DB` – The name of your database.

You can also configure the `docker-compose.yml` file manually using the values above.

---

## Installation and Setup

To run the application locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/krzysztofmisiejuk/deploy
   ```

2. **Pull the latest version of the files**:

   ```bash
   git pull
   ```

3. **Navigate to the project directory**:

   ```bash
   cd deploy
   ```

4. **Install dependencies**:

   ```bash
   npm install
   ```

   This will install all the necessary packages required to run the application.

5. **Initialize the local database and seed it with sample data**:

   ```bash
   npm run db:setup
   ```

6. **Start the application in development mode**:

   ```bash
   npm run dev
   ```

---

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. **Fork the repository**:
   Click the "Fork" button at the top of this repository to create a copy in your GitHub account.

2. **Clone your forked repository**:

   ```bash
   git clone https://github.com/your-username/deploy
   ```

3. **Create a new branch**:

   ```bash
   git checkout -b feature-name
   ```

   Replace `feature-name` with a descriptive name for your feature or bug fix.

4. **Make your changes**:
   Implement your feature or fix the bug in your local environment.

5. **Commit your changes**:

   ```bash
   git commit -m "Add feature-name"
   ```

6. **Push your changes to your forked repository**:

   ```bash
   git push origin feature-name
   ```

7. **Open a pull request**:
   Go to the original repository and click on the "Pull Requests" tab.

---

## Contact

For any questions or feedback, feel free to contact:

- **Author**: Krzysztof Misiejuk
- **Email**: kmisiejuk15@gmail.com
- **GitHub**: [krzysztofmisiejuk](https://github.com/krzysztofmisiejuk)
