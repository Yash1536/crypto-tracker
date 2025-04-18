# 🪙 Crypto Tracker

## 📌 Project Info

This is a live **Cryptocurrency Price Tracker** built with [Next.js](https://nextjs.org), fetching real-time data using a public crypto API. It shows prices of multiple cryptocurrencies like Bitcoin, Ethereum, etc., in a clean and responsive UI.

---

## Developed By

- **Yash Patel**  
- **Course:** CPAN 144 – Advanced Front-End Development  
- **Project Phase:** Phase 1 Submission  
- **College:** Humber College  
- **Team:** Solo

---

## Features (Phase 1)

- Live price updates of top cryptocurrencies
- Built with React + Next.js
- Simple UI layout with multiple coin cards
- Fully responsive design
- Data fetched using API

---

# CPAN 144 Group Project - Phase 2

## Project Overview
This is the Phase 2 development of the **Live Crypto Price Tracker** app. The goal of Phase 2 was to implement intermediate functionality, routing structure, and component layout. Additionally, the focus was on improving the visual appeal and ensuring a cohesive user experience.

## Components

- **CoinList**: Displays a list of cryptocurrencies. This component fetches and displays a paginated list of coins.
- **CoinItem**: Represents a single cryptocurrency in the list. It shows the coin's name, price, and market data.
- **Header**: The navigation header, which includes links to different pages of the app (e.g., home, coin details).
- **Pagination**: Manages the display of the list of cryptocurrencies across multiple pages for easier navigation.
- **ThemeToggler**: A component that allows users to toggle between light and dark themes for the application.

## Routing Structure

- **/coin/[id]**: A dynamic route that displays detailed information about a specific coin based on its unique ID.
- **/**: The homepage that displays a list of cryptocurrencies with pagination.
- **/favorites**: A page that displays the list of favorite coins.

## State Management

- **Page Navigation**: Managed with the `page` state to handle the current page number for pagination of the coin list.
- **Favorites**: Managed with the `favorites` state, allowing users to mark their favorite coins and view them on a dedicated page.
- **Theme**: Managed with the `theme` state, allowing users to toggle between light and dark themes.

## Styling and Theming

- **CSS Modules** and **styled-components** have been used to style the application.
- The app is responsive, ensuring it looks good on both desktop and mobile devices.
- **Conditional styling** is applied based on state, such as changing the background color when toggling between light and dark themes.

## API Integration (Preparation for Phase 3)
Although not fully implemented in Phase 2, placeholder functions have been set up to fetch data for cryptocurrency prices, favorited coins, and theme settings. These functions will be fully integrated in Phase 3 when the API data is ready.

## Screenshots

- **Home Page**:(https://i.imgur.com/a/zD75Ln6)
- **Coin Detail Page**: ![Coin Detail Page Screenshot](https://imgur.com/a/Q1wgZd7)
- **Favorites Page**: ![Favorites Page Screenshot](https://imgur.com/a/V5iHmFl)

## ⚙️ How to Run Locally

### 1. Clone the Repo
```bash
git clone https://github.com/Yash1536/crypto-tracker.git
cd crypto-tracker

2. Install Dependencies

npm install

3. Run the App

npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
