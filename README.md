# Secure Scout 🛡️

A modern web-based vulnerability scanning tool built with React, Express, and TypeScript. Secure Scout helps you identify and analyze security vulnerabilities in web applications.

## Features

- **Quick Scan**: Fast vulnerability scanning for quick assessments
- **Deep Scan**: Comprehensive security analysis with detailed reports
- **User Authentication**: Secure user registration and login
- **Scan History**: Track and manage all your scans
- **Vulnerability Reporting**: Detailed vulnerability information with severity levels
- **Real-time Scanning**: Live scan status updates
- **Responsive UI**: Beautiful, modern interface built with React and Tailwind CSS

## Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Next-generation frontend build tool
- **React Query** - Server state management
- **React Hook Form** - Efficient form handling
- **Framer Motion** - Animation library
- **Three.js** - 3D graphics (for enhanced UI)

### Backend
- **Express.js** - Web framework
- **Node.js** - JavaScript runtime
- **Drizzle ORM** - Type-safe SQL query builder
- **PostgreSQL** - Database (optional - uses in-memory storage by default)
- **Passport.js** - Authentication middleware
- **Express Session** - Session management

## Getting Started

### Prerequisites

- Node.js 18+ (Node 20+ recommended)
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Sagaryj/secure-scout.git
cd secure-scout/dse
```

2. Install dependencies:
```bash
npm install
```

3. (Optional) Set environment variables:
```bash
# Session secret - defaults to "secure-scout-secret" if not set
export SESSION_SECRET="your-strong-secret"

# Database URL - only needed if using PostgreSQL (optional)
export DATABASE_URL="postgres://user:password@host:port/database"
```

### Running the Project

#### Development Mode
Start the development server with hot reload (client and server):
```bash
npm run dev
```

The app will be available at **http://localhost:5000**

#### Production Build
Build and run for production:
```bash
npm run build
npm start
```

#### Type Checking
Run TypeScript type checking:
```bash
npm run check
```

#### Database Migrations (if using PostgreSQL)
```bash
npm run db:push
```

## Project Structure

```
dse/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions
│   │   └── App.tsx        # Main app component
│   └── index.html         # HTML entry point
├── server/                # Express backend
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API routes
│   ├── auth.ts           # Authentication setup
│   ├── storage.ts        # Data storage (in-memory by default)
│   └── vite.ts           # Vite middleware setup
├── shared/                # Shared code
│   └── schema.ts         # Data schemas and validation
├── package.json           # Dependencies and scripts
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
└── drizzle.config.ts      # Drizzle ORM configuration
```

## API Endpoints

### Authentication
- `POST /api/register` - Register a new user
- `POST /api/login` - Log in a user
- `POST /api/logout` - Log out the current user
- `GET /api/user` - Get current user info

### Scanning
- `POST /api/scan` - Create a new scan
- `GET /api/scan/:id` - Get scan details and results
- `GET /api/scans` - Get all scans for authenticated user

## How It Works

1. **Register/Login**: Users create an account or log in with existing credentials
2. **Create Scan**: Enter a target URL and choose between Quick or Deep scan
3. **Scan Process**: The backend simulates a vulnerability scan with realistic results
4. **View Results**: Access detailed vulnerability reports with severity levels, descriptions, and recommendations
5. **Track History**: All scans are saved and can be accessed from the dashboard

## Vulnerability Types Detected

- **XSS** (Cross-site Scripting) - High severity
- **SQLi** (SQL Injection) - Critical severity
- **CSRF** (Cross-site Request Forgery) - Medium severity
- **Information Disclosure** - Low severity
- **Outdated Software** - Medium severity
- **Insecure Cookies** - Low severity
- **Insecure Headers** - Low severity
- **Open Ports** - Medium severity

## Development Notes

- The app uses **in-memory storage** by default - no database required for local development
- To use PostgreSQL, set `DATABASE_URL` environment variable and it will work with Drizzle ORM
- Vite provides hot module replacement (HMR) for both client and server in development
- The server serves both the API and the built frontend from port 5000

## Troubleshooting

**Port 5000 already in use:**
```bash
# Kill the process using port 5000
lsof -i :5000
kill -9 <PID>
```

**Dependencies issues:**
```bash
rm -rf node_modules
npm install
```

**Build fails:**
Make sure you have the latest Node.js version:
```bash
node -v  # Should be 18+
npm -v   # Should be 8+
```

**Database connection errors:**
If you see DATABASE_URL errors, you can either:
1. Set a valid DATABASE_URL environment variable, or
2. Remove the DATABASE_URL requirement and use the in-memory storage

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

Built with ❤️ by the Secure Scout team