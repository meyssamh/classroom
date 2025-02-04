# Classroom
Attendance Management for Professors and Teachers

## Project Overview
This project is a website designed for professors and teachers to easily record and manage student attendance. Initially developed using **React** and **Node.js**, it has now been rewritten using **Next.js**.

## Technologies Used
- **Next.js** - A React framework for optimized and server-side rendered websites
- **PostgreSQL** - Database used for storing user and attendance data
- **Prisma** - ORM for interacting with PostgreSQL
- **Tailwind CSS** - For modern and responsive UI design
- **Node.js** - Used in the initial version of the project

## Installation & Setup

### Prerequisites
- Node.js version 18 or higher
- PostgreSQL installed and configured
- `.env` file with database settings and other environment variables

### Installation Steps
```bash
# Clone the repository
git clone https://github.com/meyssamh/classroom.git
cd classroom

# Install dependencies
npm install

# Run database migrations
npx prisma migrate dev

# Start the development server
npm run dev
```

### Running in Production
```bash
npm run build
npm start
```

## Project Structure
```
📂 classroom
├── 📂 app                 # Next.js pages
├── 📂 components          # UI components
├── 📂 lib                 # Utility functions and data management
│   ├── 📂 store           # Redux settings and files
│   └── prisma.ts           # Prisma settings
├── 📂 pages               # API routes and backend logic
├── 📂 prisma              # Database configurations and migrations
├── 📂 public
│   └── 📂 assets          # Assets of the project like fonts, icons and images
├── 📂 test                # Unit-Test configurations
├── 📂 types               # TypeScript type definitions
├── .env                    # Environment variables (ignored in Git for security purposes)
├── .eslintrc.json          # Eslint configuration
├── jest.config.ts          # Jest configurations
├── package.json            # Project settings and dependencies
├── postcss.config.mjs      # PostCSS configurations
├── README.md               # Project documentation
├── tailwind.config.ts      # Tailwind configurations and styles
└── tsconfig.json           # TypeScript configurations
```

## Features
✅ **Professor Account Management** - Manage accounts for professors and teachers.

✅ **Student List Management** - Add, edit, and remove students from courses.

✅ **Online Attendance Tracking** - Easily mark student attendance digitally.

✅ **Course and Class Management** - Create and manage multiple courses.

✅ **Attendance Reporting** - Generate reports on student attendance.

## Contributing
If you are interested in contributing to this project:
1. **Fork** the repository.
2. Create a new **Branch** for your changes.
3. Submit a **Pull Request**.

## License
This project is released under the **MIT License**.