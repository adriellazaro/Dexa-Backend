# Dexa Attendance System - Backend

Backend API for attendance system built using NestJS.

## Features

- User Registration & Login (JWT Authentication)
- Check-in & Check-out system
- Attendance summary with date filter
- Role-based access (Admin & User)
- Update user profile

## Tech Stack

- NestJS
- TypeORM
- PostgreSQL
- JWT Authentication

## API Endpoints

Auth
POST /auth/register
POST /auth/login

Attendance
POST /attendance/check-in
POST /attendance/check-out
GET /attendance
GET /attendance/all (admin)

User
GET /users/profile
PUT /users/profile

## Install Dependencies
npm install
