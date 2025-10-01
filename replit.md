# Adorned Community Church Website

## Overview

This is a full-stack church website application built with React, Express, and Drizzle ORM. The application serves as a digital platform for Adorned Church providing features for sharing sermons, devotions, church information, and contact functionality. The website includes audio playback for sermons, categorized devotional content, church leadership information, and a contact form for community engagement.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management and data fetching
- **UI Components**: Radix UI primitives with shadcn/ui design system for consistent, accessible components
- **Styling**: Tailwind CSS with custom CSS variables for theming and responsive design
- **Forms**: React Hook Form with Zod validation for type-safe form handling

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **API Design**: RESTful API structure with organized route handlers
- **Database Layer**: Drizzle ORM for type-safe database operations
- **Storage Interface**: Abstract storage interface (IStorage) with in-memory implementation for development
- **Request Logging**: Custom middleware for API request tracking and performance monitoring
- **Error Handling**: Centralized error handling middleware

### Data Storage Solutions
- **Database**: PostgreSQL configured through Drizzle ORM
- **Connection**: Neon Database serverless PostgreSQL via DATABASE_URL environment variable
- **Schema**: Strongly typed schema definitions for users, sermons, devotions, contact messages, and leaders
- **Migrations**: Drizzle Kit for database schema migrations and management

### Key Features
- **Audio Player**: Custom React component for sermon audio playback with progress tracking
- **Content Management**: CRUD operations for sermons, devotions, and church leadership information
- **Categorized Content**: Devotions organized by categories (morning, evening, bible-study, youth)
- **Search Functionality**: Real-time search filtering for sermons and content
- **Responsive Design**: Mobile-first approach with adaptive layouts

### Build and Development
- **Build Tool**: Vite for fast development and optimized production builds
- **Development**: Hot module replacement and development server with custom middleware
- **Production**: ESBuild for server bundling and static asset optimization
- **TypeScript**: Strict type checking across frontend, backend, and shared schemas

## External Dependencies

### Database Services
- **Neon Database**: Serverless PostgreSQL database hosting
- **Drizzle ORM**: Type-safe database toolkit for PostgreSQL interactions
- **connect-pg-simple**: PostgreSQL session store for Express sessions

### Frontend Libraries
- **Radix UI**: Comprehensive set of accessible, unstyled UI primitives
- **TanStack Query**: Powerful data synchronization for React applications
- **React Hook Form**: Performant forms with minimal re-renders
- **Zod**: TypeScript-first schema validation library
- **Wouter**: Minimalist routing library for React

### Styling and UI
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **shadcn/ui**: Pre-built component library built on Radix UI and Tailwind
- **Lucide React**: Icon library for consistent iconography
- **Class Variance Authority**: Utility for creating variant-based component APIs

### Development Tools
- **Vite**: Next-generation frontend build tool with fast HMR
- **ESBuild**: Fast JavaScript bundler for production builds
- **TypeScript**: Static type checking for enhanced developer experience
- **Replit Integration**: Development environment plugins for Replit platform

### Media and Assets
- **Unsplash**: Stock photography for church imagery and visual content
- **Google Fonts**: Web typography (Architects Daughter, DM Sans, Fira Code, Geist Mono)
- **Audio Support**: HTML5 audio with custom controls for sermon playback