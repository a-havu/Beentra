*This project has been created as part of the 42 curriculum by mkhlouf, reerikai, lhaas, ahavu, hahamdan.*

---

# Beentra <img src="public/logo.svg" alt="beentralogo" width=50/>

## Description

**Beentra** is a community platform built for students at Hive Helsinki (42 school). It gives students a central place to discover and manage campus events, share personal projects, and stay updated on what's happening in the community.

### Key Features

- **Events Calendar** - Browse, create, and subscribe to student events. Includes a monthly calendar view and a weekly upcoming events list.
- **Projects Gallery** - Share your work with the community. Add a project with a description, tech stack, image, and link.
- **User Profiles** - Customizable profiles with avatars, full name, and activity status.
- **Friends & Online Status** - Add other users as friends and see who is currently online.
- **Authentication** - Secure login with email/password, OAuth 2.0 (42 / GitHub), and Two-Factor Authentication (2FA).
- **Role-Based Access** - Admin and user roles with different permissions.
- **Public API** - A rate-limited, API-key-protected REST API for external integrations.
- **Static Pages** - Privacy Policy, Terms of Service, and other informational pages managed via a rich-text editor.

---

## Instructions

### Prerequisites

Make sure the following are installed before running the project:

- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)
- A PostgreSQL database (local or hosted, e.g., [Neon](https://neon.tech/))
- An [ImageKit](https://imagekit.io/) account for file/image storage
- OAuth app credentials (42 and/or GitHub) if using OAuth login
- Node.js v20+ (only needed for local development without Docker)

### Environment Configuration

Copy the example environment file and fill in your values:

```bash
cp .env.example .env
```

Required variables in `.env`:

```env
# Database
DATABASE_URL=postgresql://user:password@host:5432/dbname

# Auth
JWT_SECRET=your_jwt_secret_here
SALT_ROUNDS=10

# OAuth (optional but needed for OAuth login)
OAUTH_42_CLIENT_ID=your_42_client_id
OAUTH_42_CLIENT_SECRET=your_42_client_secret
OAUTH_GITHUB_CLIENT_ID=your_github_client_id
OAUTH_GITHUB_CLIENT_SECRET=your_github_client_secret

# ImageKit (for file uploads)
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id

# App
NEXT_PUBLIC_APP_URL=https://localhost:8443
```

> **Note:** Never commit your `.env` file. It is listed in `.gitignore`.

### Running the Project

Start the entire application with a single command:

```bash
docker compose up --build
```

This will start:
- The **Next.js** application on port 3000 (internal)
- The **Nginx** reverse proxy on ports `8080` (HTTP) and `8443` (HTTPS)

The app will be available at: **https://localhost:8443**

### Database Setup

After the containers are running, apply the database schema:

```bash
# Run migrations
npx prisma migrate deploy

# (Optional) Seed the database with sample data
npx prisma db seed
```

### Running Tests

```bash
npx vitest run lib/validation.test.ts
```

### Local Development (without Docker)

```bash
npm install
npm run dev
```

The app will be available at: **http://localhost:3000**

---

## Resources

### Documentation & References

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma ORM Documentation](https://www.prisma.io/docs)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [Zod Schema Validation](https://zod.dev/)
- [React Hook Form](https://react-hook-form.com/)
- [jose - JWT Library](https://github.com/panva/jose)
- [otplib - TOTP/2FA](https://github.com/yeojz/otplib)
- [ImageKit Documentation](https://docs.imagekit.io/)
- [FullCalendar Documentation](https://fullcalendar.io/docs)
- [Tiptap Rich Text Editor](https://tiptap.dev/)
- [Docker Documentation](https://docs.docker.com/)
- [Nginx Documentation](https://nginx.org/en/docs/)

### AI Usage

AI tools (primarily Claude and GitHub Copilot) were used throughout the project in the following ways:

- **Research & decision-making** - Comparing libraries, frameworks, and implementation approaches to help select the best fit for our tech stack (e.g., choosing between authentication libraries, ORM options, and image hosting services).
- **Technical architecture** - Discussing and refining architectural decisions such as how to structure Next.js route handlers, how to implement JWT-based sessions, and how to handle rate limiting on the public API.
- **Debugging** - Using AI as a sounding board when debugging issues, particularly for async edge cases, Prisma query errors, and Docker/Nginx configuration.
- **Documentation** - Assisting in writing and structuring technical documentation.

All AI-generated content was reviewed, tested, and validated by team members before being included in the project.

---

## Team Information

| Name | 42 Login | Role(s) | Responsibilities |
|------|----------|---------|-----------------|
| Mohammad | `mkhlouf` | Technical Lead / Developer | Defined technical architecture and made technology stack decisions. Contributed full-stack (frontend + backend) to his assigned features, reviewed critical code changes |
| Hager | `hahamdan` | Project Manager / Developer | Facilitated team coordination, tracked progress, and ensured decisions were reviewed and aligned across the team. Contributed full-stack (frontend + backend) to her assigned features |
| Roni | `reerikai` | Product Owner / Developer | Defined product vision and priorities, validated completed work. Contributed full-stack (frontend + backend) to his assigned features including the admin dashboard and user management |
| Aino | `ahavu` | UI/UX Designer / Developer / QA | Designed the visual identity and component system. Conducted quality assurance and accessibility review. Contributed full-stack (frontend + backend) to her assigned features including users' uploaded projects, displaying the projects and image hosting. |
| Laurens | `lhaas` | Product Owner / Developer | Co-managed product backlog and led accessibility implementation. Contributed full-stack (frontend + backend) to his assigned features |

---

## Project Management

### Work Organization

The team followed a **Kanban** workflow using GitHub Projects:

- Each developer created and self-assigned GitHub Issues for their tasks
- Issues moved through Kanban stages: **Backlog → In progress → In review → Done**
- Regular team meetings (weekly or bi-weekly) were held to sync on progress and blockers
- Important decisions and technical notes were documented in per-member notes files

### Tools Used

| Tool | Purpose |
|------|---------|
| GitHub Projects | Main project tracker - issues, task assignment, progress tracking |
| GitHub Issues | Individual task creation and tracking |
| Discord | Primary team communication channel |
| Miro | Initial architecture and module planning board |

### Communication

The team communicated primarily via **Discord** for day-to-day coordination and held regular meetings (documented in `meeting_notes.md`) for larger decisions and planning sessions.

---

## Technical Stack

### Frontend

| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js (React) | 16.x | Full-stack framework - React for UI, App Router for routing and SSR |
| TypeScript | 5.x | Type safety across the codebase |
| Tailwind CSS | v4 | Utility-first styling |
| Tiptap | 3.x | Rich text editor for page content |
| FullCalendar | 6.x | Event calendar UI |
| React Hook Form | 7.x | Form state management |
| Zod | 4.x | Schema-based form and API validation |

### Backend

| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js API Routes | 16.x | Backend route handlers (REST API) |
| Prisma ORM | 7.x | Type-safe database access and migrations |
| jose | 6.x | JWT creation and verification |
| bcryptjs | 3.x | Password hashing and salting |
| otplib | 13.x | TOTP-based Two-Factor Authentication |
| nodemailer | 8.x | Transactional email |
| imagekit | 6.x | Image and file upload/storage |

### Infrastructure

| Technology | Purpose |
|-----------|---------|
| PostgreSQL | Relational database |
| Docker / Docker Compose | Containerization and single-command deployment |
| Nginx | Reverse proxy, HTTPS termination |

### Justification for Major Technical Choices

- **Next.js as full-stack framework**: Chosen because it provides both a React frontend and a backend API in one cohesive framework, reducing complexity. Its App Router enables SSR, dynamic routes, and server components out of the box.
- **PostgreSQL + Prisma**: PostgreSQL is a mature, reliable relational database well-suited to our data model (users, events, subscriptions, projects). Prisma provides type-safe database access and a clean migration system.
- **Tailwind CSS v4**: Enables rapid, consistent UI development with utility classes without the overhead of a component library. The team built reusable components from scratch on top of it.
- **ImageKit**; Chosen over storing images in the database (which would bloat it) or a self-hosted solution (which would require infrastructure we don't control). ImageKit provides a managed CDN-backed image service with an open API.
- **Docker + Nginx**: Ensures the application runs identically in all environments and can be started with a single command. Nginx handles HTTPS termination and proxying to the Next.js container.

---

## Database Schema

The database uses **PostgreSQL** with the following models:

### Models Overview

```
User
├── id (cuid, PK)
├── email (unique)
├── username (unique)
├── passwordHash
├── avatarUrl
├── fullName
├── role (user | admin | moderator)
├── twoFactorEnabled / twoFactorSecret
├── isOnline / lastActive
├── createdAt / updatedAt
│
├── → Event[] (created events)
├── → EventSubscription[]
├── → OauthAccount[]
├── → Project[] (created projects)
├── → Friend[] (as user)
└── → Friend[] (as friendOf)

Event
├── id (cuid, PK)
├── title, date, timeFrom, timeTo
├── location, organizer, description
├── type (Student | Hive | External)
├── maxSpots, image
├── creatorId → User (nullable)
├── publicCreatorId → PublicApiUser (nullable)
└── → EventSubscription[]

EventSubscription (junction)
├── id (cuid, PK)
├── eventId → Event
├── userId → User
└── unique(eventId, userId)

OauthAccount
├── id (cuid, PK)
├── userId → User
├── provider (e.g. "42", "github")
├── providerUserId
└── accessToken

PublicApiUser (API key holders)
├── id (cuid, PK)
├── email (unique)
├── key (unique, hashed API key)
├── requestCount / resetAt (rate limiting)
└── → Event[]

Project
├── id (cuid, PK)
├── projectName, oneLiner
├── link, techStack, description
├── image / imagekitFileId
└── creatorId → User (nullable)

Friend (junction)
├── id (autoincrement, PK)
├── userId → User
├── friendId → User
└── unique(userId, friendId)

Page (static content pages)
├── id (autoincrement, PK)
├── slug (unique), title (unique)
├── text (rich text content)
└── authorId → User
```

### Key Relationships

- A **User** can create many **Events** and **Projects**
- A **User** can subscribe to many **Events** via **EventSubscription**
- A **User** can have many **Friends** (self-referential many-to-many)
- A **User** can have multiple **OauthAccounts** (one per OAuth provider)
- **PublicApiUser** is separate from regular users - it represents external API clients identified by an API key

---

## Features List

| Feature | Description | Team Member(s) |
|---------|-------------|---------------|
| User Registration | Sign up with email and password, with validation on both frontend and backend | Hager |
| User Login | Secure login with JWT session tokens, bcrypt password verification | Mohammad |
| OAuth 2.0 Login | Login with 42 or GitHub accounts | Mohammad |
| Two-Factor Authentication | TOTP-based 2FA with QR code setup and verification flow | Mohammad |
| User Profile | View and edit profile info (name, username, avatar) | Hager |
| Avatar Upload | Upload and manage profile picture via ImageKit CDN | Hager |
| Friends System | Send, accept, and remove friend requests; view friends list | Roni |
| Online Status | See which users are currently online | Roni |
| Role Management | Admin and moderator roles with elevated permissions | Roni / Mohammad |
| User Admin Panel | View, manage, and moderate users (admin only) | Roni |
| Events Calendar | Monthly calendar view of all events | Laurens |
| Events List | Weekly upcoming events on the homepage with filtering by type | Laurens |
| Create / Edit Event | Form to create or update events (authenticated users) | Laurens |
| Event Subscription | Subscribe and unsubscribe from events, view attendee count | Laurens |
| Project Upload | Upload a project to the database | Aino |
| Projects Gallery | Paginated grid of student projects | Aino |
| Create / Edit Project | Form to add or update a project with image upload | Aino |
| My Projects | Fetch and display the projects the logged-in user has uploaded | Aino |
| Single project page | Display all information of a selected project on a page | Aino |
| Public API | Secured REST API for events with API key authentication and rate limiting | Mohammad |
| API Key Management | Users can generate and manage their own public API keys | Mohammad |
| Static Pages (CMS) | Rich-text editable informational pages (Privacy Policy, Terms, etc.) | Mohammad |
| Privacy Policy & Terms | Accessible static pages with relevant legal content | Mohammad |
| HTTPS + Nginx | Nginx reverse proxy with TLS termination | All members |
| Docker Deployment | Single-command deployment with Docker Compose | All members |

---

## Modules

### Claimed Modules

| # | Module | Type | Points | Who Implemented |
|---|--------|------|--------|----------------|
| 1 | **Use a framework for both frontend and backend** (Next.js as full-stack - React frontend + Next.js API routes backend) | Major | 2 | All members |
| 2 | **Public API** - Secured REST API with API key authentication, rate limiting, and at least 5 endpoints (GET/POST/PUT/DELETE for events) | Major | 2 | All members |
| 3 | **Standard user management and authentication** - Profile management, avatar upload, friends system, online status, profile pages | Major | 2 | Hager, Mohammad |
| 4 | **Advanced permissions system** - Admin/moderator/user roles, CRUD on users, different views and actions per role | Major | 2 | Hager, Mohammad |
| 5 | **ORM** - Prisma used for all database access with type-safe queries and migrations | Minor | 1 | All members |
| 6 | **OAuth 2.0** - Remote authentication via 42 and/or GitHub OAuth | Minor | 1 | Mohammad |
| 7 | **Two-Factor Authentication (2FA)** - Complete TOTP-based 2FA system with QR code setup | Minor | 1 | Mohammad |
| 8 | **Server-Side Rendering (SSR)** - Enabled through Next.js App Router for improved performance and SEO | Minor | 1 | All members |
| 9 | **File upload and management** - Image uploads for events and projects via ImageKit, with client/server validation | Minor | 1 | All members |
| 10 | **Custom-made design system** - A library of 10+ reusable components (Button, Input, Modal, ModalHeader, ModalBody, ModalFooter, ConfirmationModal, FormTitle, FunctionalButtons, SubmitFormButton, and more) with consistent color palette, typography, and icons | Minor | 1 | All members |
| 11 | **User activity analytics and insights dashboard** - Dashboard displaying user activity metrics and insights | Minor | 1 | Roni |
| 12 | **Module of choice: Static Pages CMS** - A custom content management system allowing admins to create, edit, and manage static informational pages (Privacy Policy, Terms of Service, etc.) via a rich-text editor (Tiptap), stored in the database with unique slugs | Minor | 1 | Mohammad |
| 13 | **Support for additional browsers** - Full compatibility tested and fixed for at least 2 additional browsers beyond Chrome | Minor | 1 | All members |
| 14 | **Complete accessibility compliance (WCAG 2.1 AA)** - Screen reader support, keyboard navigation, and assistive technology compatibility throughout the application *(pending confirmation by Laurens)* | Major | 2 | Laurens |

**Total: 5 × 2 + 8 × 1 = 18 points** *(need Laurens confirmation for module 14)*

### Module Details

**1. Full-Stack Framework (Major - 2pts)**
Next.js is used as a unified full-stack framework: the React App Router handles the frontend, and Next.js Route Handlers serve as the backend API layer. This eliminates the need for a separate backend server while maintaining a clean separation between UI and data logic.

**2. Public API (Major - 2pts)**
A REST API is available at `/api/` for developers. Access requires a unique API key, which users can generate from their account settings. Requests are rate-limited per API key. The API is documented via OpenAPI (`/api/openapi.json`) and browsable at `/reference`.

**3. Standard User Management (Major - 2pts)**
Users can register, log in, and manage their profile including uploading a custom avatar. The friends system allows users to add/remove friends and see their online status. Each user has a public profile page.

**4. Advanced Permissions (Major - 2pts)**
Three roles exist: `user`, `moderator`, and `admin`. Admins can view and manage all users (CRUD). Different UI views and API access are enforced based on role.

**5. Prisma ORM (Minor - 1pt)**
All database interactions go through Prisma Client, providing type-safe queries, auto-generated types from the schema, and a structured migration system.

**6. OAuth 2.0 (Minor - 1pt)**
Users can authenticate using their 42 or GitHub account. OAuth tokens are stored in the `OauthAccount` model, allowing one user to link multiple OAuth providers.

**7. Two-Factor Authentication (Minor - 1pt)**
Users can enable 2FA from their account settings. A QR code is generated using `otplib` and `qrcode`, which the user scans with an authenticator app. On subsequent logins, the TOTP code is verified before granting access.

**8. Server-Side Rendering (Minor - 1pt)**
Next.js App Router renders pages on the server by default, reducing time-to-first-byte and enabling proper SEO for public pages such as the events list and projects gallery.

**9. File Upload (Minor - 1pt)**
Event and project images are uploaded to ImageKit via a server-side upload handler. File type and size are validated on both the client and server. Files can be deleted through the ImageKit API when a project or event is removed.

**10. Custom-Made Design System (Minor - 1pt)**
The project includes a library of 10+ reusable UI components built from scratch, including Button, Input, Modal, ModalHeader, ModalBody, ModalFooter, ConfirmationModal, FormTitle, FunctionalButtons, and SubmitFormButton. Components share a consistent color palette, typography, and icon set used throughout the application.

**11. User Activity Analytics and Insights Dashboard (Minor - 1pt)**
A dashboard displaying user activity metrics and insights, giving admins and users visibility into platform usage and engagement.

**12. Module of Choice: Static Pages CMS (Minor - 1pt)**
A custom content management system that allows admins to create, edit, and delete static informational pages through a rich-text editor (Tiptap). Pages are stored in the database with unique slugs and titles, and are publicly accessible via their slug. This adds meaningful value by enabling non-technical content updates without code changes, and demonstrates technical skill through full-stack implementation (rich-text editing, server-side rendering of stored content, and role-protected write access).

**13. Support for Additional Browsers (Minor - 1pt)**
The application was tested and fixed for full compatibility with at least 2 additional browsers beyond Chrome (e.g. Firefox, Safari, Edge). Browser-specific issues were identified and resolved to ensure a consistent UI/UX across all supported browsers.

**14. Complete Accessibility Compliance - WCAG 2.1 AA (Major - 2pts)** *
Screen reader support, keyboard navigation, and compatibility with assistive technologies implemented throughout the application in compliance with WCAG 2.1 AA guidelines.

---

## Individual Contributions

### Mohammad - Technical Lead / Developer

*(to be filled in by Mohammad)*

### Hager - Project Manager / Developer

*(to be filled in by Hager)*

### Roni - Product Owner / Developer

Came up with the name "Beentra" and told some jokes

### Aino - UI/UX Designer / Developer / QA

Designed the visual identity, component system, and mobile support.
Conducted quality assurance and accessibility review, carefully picking out a colour palette that takes into account the visually impaired and colourblind.
Contributed full-stack (frontend + backend) to her assigned features:

- How users upload their projects onto the platform via React hook form
- Displaying the projects in a paginated grid
- Image hosting - researched and compared possibilities (setting up a dedicated server/using Hive's servers/using a third-party image hosting service).
- Fetching data from the logged-in user to display all of their projects in a dedicated "My Projects" page
- Display data of a selected project on a separate page

Also designed the Beentra happy bee logo.

### Laurens - Product Owner / Developer

*(to be filled in by Laurens)*

---

## Known Limitations

- The application is fully supported on the latest stable versions of **Google Chrome, Safari, and Microsoft Edge**. It has been tested and fixed across these browsers; minor differences may still appear in less common browsers.
- Image storage depends on a third-party service (ImageKit). A dedicated project email account (`beentra`) was created to manage access and avoid tying the service to any personal account.
- Real-time online status relies on periodic updates rather than persistent WebSocket connections, so there may be a short delay before status changes are reflected.
- The application requires a properly configured `.env` file to run. Missing or incorrect environment variables will cause startup to fail (enforced intentionally via `.env` validation).

---

## License

This project was created as part of the [42 curriculum](https://www.42.fr/). It is intended for educational use.
