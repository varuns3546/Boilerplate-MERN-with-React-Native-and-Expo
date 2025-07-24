# Secure MERN React Native Expo App

A full-stack application with secure authentication and user data isolation built with MongoDB, Express.js, React Native, Expo, and Node.js.

## 🔐 Security Features

### Authentication & Authorization
- **JWT-based authentication** with access and refresh tokens
- **Password hashing** using bcrypt with salt rounds of 12
- **Account lockout** after 5 failed login attempts (2-hour lockout)
- **Rate limiting** on authentication endpoints
- **Automatic token refresh** with axios interceptors
- **Secure token storage** using AsyncStorage

### Data Isolation & Privacy
- **User-specific data access** - users can only access their own data
- **Database-level isolation** with user ID filtering on all queries
- **API endpoint protection** with authentication middleware
- **Input validation** and sanitization on all endpoints

### Additional Security Measures
- **Password strength requirements** (8+ characters, uppercase, lowercase, number)
- **Email validation** and normalization
- **Request payload validation**
- **Error handling** without information leakage
- **CORS configuration** for cross-origin requests

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator or Android Emulator (for testing)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your configuration:
   ```env
   # Database
   MONGO_URI=mongodb://localhost:27017/your-app-name

   # JWT Secrets (Generate strong secrets for production)
   JWT_ACCESS_SECRET=your-super-secret-access-token-key-change-this-in-production
   JWT_REFRESH_SECRET=your-super-secret-refresh-token-key-change-this-in-production

   # Server
   PORT=3000
   ```

5. Start the backend server:
   ```bash
   npm start
   ```

The backend will run on `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file:
   ```env
   # API Configuration
   EXPO_PUBLIC_API_URL=http://localhost:3000/api
   ```

5. Start the Expo development server:
   ```bash
   npm start
   ```

6. Use the Expo Go app on your phone or run on a simulator to test the app.

## 📱 Features

### User Authentication
- **Registration** with email, password, first name, and last name
- **Login** with email and password
- **Automatic token refresh** for seamless user experience
- **Logout** with token invalidation
- **Account lockout** protection against brute force attacks

### User Data Management
- **Personal dashboard** showing user-specific entries
- **Create, read, update, delete** operations for entries
- **Data isolation** - users can only access their own data
- **Real-time updates** with pull-to-refresh functionality

### User Experience
- **Modern, responsive UI** with clean design
- **Form validation** with real-time error feedback
- **Loading states** and error handling
- **Secure navigation** between authenticated and unauthenticated states

## 🏗️ Architecture

### Backend Structure
```
backend/
├── models/
│   ├── User.js          # User model with authentication methods
│   └── Entry.js         # Entry model with user ownership
├── routes/
│   ├── auth.js          # Authentication endpoints
│   └── entries.js       # CRUD operations for entries
├── middleware/
│   └── auth.js          # JWT authentication middleware
└── index.js             # Express server setup
```

### Frontend Structure
```
frontend/
├── src/
│   ├── context/
│   │   └── AuthContext.js     # Authentication state management
│   ├── services/
│   │   └── authService.js     # API calls and token management
│   └── screens/
│       ├── LoginScreen.js     # Login interface
│       ├── RegisterScreen.js  # Registration interface
│       ├── DashboardScreen.js # Main app interface
│       └── CreateEntryScreen.js # Entry creation interface
└── App.js               # Navigation and app structure
```

## 🔒 Security Best Practices Implemented

1. **Password Security**
   - Passwords are hashed using bcrypt with 12 salt rounds
   - Minimum password requirements enforced
   - Passwords never stored in plain text

2. **Token Management**
   - Short-lived access tokens (15 minutes)
   - Longer-lived refresh tokens (7 days)
   - Automatic token rotation
   - Secure token storage on device

3. **Rate Limiting**
   - Authentication endpoints limited to 5 requests per 15 minutes
   - Login attempts limited with account lockout

4. **Data Validation**
   - Input sanitization on all endpoints
   - Email format validation
   - Data type and length validation

5. **Error Handling**
   - Generic error messages to prevent information leakage
   - Proper HTTP status codes
   - Comprehensive logging for debugging

## 🛡️ Data Isolation

The app ensures complete data isolation between users:

- **Database Level**: All queries include user ID filtering
- **API Level**: Authentication middleware verifies user identity
- **Frontend Level**: User context manages authentication state
- **Storage Level**: Tokens are stored securely per user

Users cannot access, modify, or delete data belonging to other users.

## 🚀 Production Deployment

Before deploying to production:

1. **Environment Variables**
   - Generate strong, unique JWT secrets
   - Use a production MongoDB instance
   - Set appropriate CORS origins

2. **Security Headers**
   - Implement HTTPS
   - Add security headers (helmet.js)
   - Configure proper CORS settings

3. **Monitoring**
   - Set up logging and monitoring
   - Implement error tracking
   - Monitor authentication attempts

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Entries (Protected)
- `GET /api/entries` - Get user's entries
- `POST /api/entries` - Create new entry
- `GET /api/entries/:id` - Get specific entry
- `PUT /api/entries/:id` - Update entry
- `DELETE /api/entries/:id` - Delete entry

All entry endpoints require authentication and only return data belonging to the authenticated user.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.