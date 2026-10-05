# Chapter 1 Project Brief

This file is maintained by TikkaBurrito so future edits understand the app intent, design direction, and change history.

## Current Intent
A simple 1 page website for a small bookstore called Chapter 1. Includes a hero section, a list of 3 featured books with short descriptions, store hours, a contact email, and an AI-powered chatbot widget where visitors can ask questions about the store.

## Audience
Not specified

## Visual Direction
clean and minimal

## Pages and Sections
- Home
- Products
- Product Detail
- Cart
- Checkout
- Orders
- HomePage

## Workflows and Features
- Customer browses products with inventory/pricing.
- Customer adds items to cart and starts checkout/order submission.
- Owner can view orders or inventory records.
- User can complete: Hero section
- User can complete: Featured books list with 3 books and short descriptions
- User can complete: Store hours
- User can complete: Contact email
- User can complete: AI-powered chatbot for visitor questions
- Hero section
- Featured books list with 3 books and short descriptions
- Store hours
- Contact email
- AI-powered chatbot for visitor questions

## Backend and Data Needs
Auth: No sign-in required unless later requirements introduce private saved data.
Backend: Use the selected generated stack for real persistence/integrations. Required backend: database persistence, AI/provider route, product catalog storage, cart/order persistence, checkout route. Data visibility: private.
Required tables: products, inventory_items, orders, order_items, customers, messages
Required API routes: /api/products, /api/orders, /api/checkout, /api/coach/chat

## Acceptance Criteria
- The first screen communicates the app purpose, primary user, and most important action without generic placeholder copy.
- Primary buttons, links, tabs, filters, or forms are wired to visible state changes or real routes.
- The generated app includes loading, empty, and error states for the main workflow.
- Products have real prices/inventory fields.
- Checkout/order action is server-backed.
- Missing Stripe config shows a setup blocker instead of fake payment success.

## Change History
- 2026-10-01T04:12:35.200Z: Initial project brief created.
