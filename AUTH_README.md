# MotoClip Authentication System

## ✅ Setup Complete!

The authentication system has been successfully added to MotoClip with the following features:

### Features Implemented
- ✅ User Registration with validation
- ✅ Secure Login/Logout functionality
- ✅ Password hashing using bcryptjs
- ✅ Session-based authentication
- ✅ SQLite database for user storage
- ✅ User profile display in navbar
- ✅ Beautiful UI with modal forms

## 🚀 Quick Start

### 1. Server is Already Running!
The authentication server is running on `http://localhost:3000`

### 2. Open the Application
Open [index.html](index.html) in your browser:
- Use Live Server extension in VS Code (Right-click → Open with Live Server)
- Or open directly in your browser

### 3. Try the Features
- Click the **Login** button in the navbar
- **Register** a new account
- **Login** with your credentials
- Your username will appear in the navbar
- **Logout** using the logout button

## 📁 Files Created/Modified

### Backend Files
- `server.js` - Express.js authentication server
- `package.json` - Node.js dependencies
- `motoclip.db` - SQLite database (auto-created)

### Frontend Files
- `auth.js` - Authentication JavaScript logic
- `index.html` - Updated with login UI and user profile
- `styles.css` - Added authentication styles

### Documentation
- `AUTH_README.md` - This file
- `.gitignore` - Updated to ignore node_modules and database

## 🔌 API Endpoints

The server provides the following REST API endpoints:

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/register` | Register new user | No |
| POST | `/api/login` | Login user | No |
| POST | `/api/logout` | Logout user | Yes |
| GET | `/api/user` | Get current user info | Yes |
| GET | `/api/auth/status` | Check authentication status | No |

## 💾 Database Schema

```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## 🔒 Security Features

- **Password Hashing**: bcryptjs with salt rounds
- **Session Management**: express-session with secure cookies
- **Input Validation**: Client and server-side validation
- **SQL Injection Protection**: Prepared statements
- **CORS Protection**: Configured for local development

## 📝 Usage Examples

### Register a New User
```javascript
fetch('http://localhost:3000/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
        username: 'rider123',
        email: 'rider@motoclip.com',
        password: 'securepass'
    })
});
```

### Login
```javascript
fetch('http://localhost:3000/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
        username: 'rider123',
        password: 'securepass'
    })
});
```

## 🛠️ Managing the Server

### Start Server
```bash
npm start
```

### Stop Server
Press `Ctrl+C` in the terminal

### Restart Server (with auto-reload during development)
```bash
npm run dev
```

## 🔧 Configuration

### Change Server Port
Edit `server.js` line 11:
```javascript
const PORT = 3000; // Change to your desired port
```

### Update Session Secret
Edit `server.js` line 24:
```javascript
secret: 'your-production-secret-key-here'
```

### CORS Settings
Edit `server.js` line 15 to allow different origins:
```javascript
origin: 'http://your-frontend-url.com'
```

## 📦 Dependencies

- **express** - Web framework
- **bcryptjs** - Password hashing
- **express-session** - Session management
- **body-parser** - Request body parsing
- **sql.js** - SQLite database (pure JavaScript)
- **cors** - Cross-origin resource sharing

## 🐛 Troubleshooting

### Server won't start
```bash
# Make sure no other process is using port 3000
# Kill any running Node processes
taskkill /F /IM node.exe

# Reinstall dependencies
npm install
```

### Can't connect from frontend
- Make sure server is running on `http://localhost:3000`
- Check browser console for CORS errors
- Verify `credentials: 'include'` in fetch calls

### Database errors
- Delete `motoclip.db` and restart server
- Server will create a fresh database

## 🚀 Next Steps

Consider adding:
- Password reset functionality
- Email verification
- User profile editing
- Social login (Google, Facebook)
- Remember me functionality
- Two-factor authentication

## 📄 License

Part of the MotoClip project. All rights reserved.
