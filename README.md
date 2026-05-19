# Noartument Backend

## Overview

The backend of [Noartument](https://crack-fe-harits-gh.vercel.app/) used for handling HTTP requests and database operations.

## Features

- RESTful API
- Database operations
- HTTP requests handling

## Endpoints

Endpoints without * does not need authentication.

- /auth
  - *POST /auth/register - Register a new user
  - *POST /auth/login - Login user
  - POST /auth/refresh - Refresh access token
  - POST /auth/logout - Logout user
  - GET /auth - Get current user info

- /user
  - GET /user - Get current user profile
  - GET /user/search - Search users by username
  - POST /user/usernames - Get users by IDs
  - PATCH /user - Update user profile
  - PATCH /user/edit - Change user password
  - DELETE /user - Delete user account

- /tournament
  - POST /tournament - Create a new tournament (auto-adds user as admin)
  - *GET /tournament - Get all tournaments with pagination 
  - GET /tournament/check-for-admin - Check if user is admin of any tournament
  - *GET /tournament/:tourid - Get tournament by ID 
  - *GET /tournament/search - Search tournaments by name with pagination 
  - PATCH /tournament/:tourid - Update tournament by ID
  - DELETE /tournament/:tourid - Delete tournament by ID
  - PUT /tournament/:tourid/admins - Update tournament admins

- /participant
  - POST /participant/:tourid - Join/participate in a tournament
  - GET /participant - Get all tournaments the user is participating in
  - *GET /participant/:tourid - Get all participants of a tournament 
  - PATCH /participant/:tourid - Update participation details (only if tournament hasn't started)
  - DELETE /participant/:tourid - Cancel participation (only if tournament hasn't started)

- /bracket-score
  - POST /bracket-score - Initialize tournament bracket scores
  - *GET /bracket-score/:tourid - Get all scores for a tournament 
  - PATCH /bracket-score/:tourid - Update score for a match

## Tech Stack

- NestJS
- PostgreSQL
- Prisma
- JWT
- Bcrypt