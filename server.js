const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const initSqlJs = require('sql.js');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors({
    origin: ['http://127.0.0.1:5500', 'http://localhost:5500', 'http://127.0.0.1:5501', 'http://localhost:5501', 'null'], // Allow Live Server and file protocol
    credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Session configuration
app.use(session({
    secret: 'motoclip-secret-key-change-in-production',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Set to true if using HTTPS
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// Initialize SQLite Database
let db;
const dbPath = './motoclip.db';

async function initDatabase() {
    const SQL = await initSqlJs();
    
    try {
        // Load existing database if it exists
        if (fs.existsSync(dbPath)) {
            const buffer = fs.readFileSync(dbPath);
            db = new SQL.Database(buffer);
            console.log('Loaded existing database');
        } else {
            db = new SQL.Database();
            console.log('Created new database');
        }
        
        // Create users table
        db.run(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password_hash TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);
        
        saveDatabase();
        console.log('Users table ready');
    } catch (err) {
        console.error('Error initializing database:', err);
    }
}

function saveDatabase() {
    if (db) {
        const data = db.export();
        const buffer = Buffer.from(data);
        fs.writeFileSync(dbPath, buffer);
    }
}

// Initialize database on startup
initDatabase();

// Middleware to check authentication
function isAuthenticated(req, res, next) {
    if (req.session.userId) {
        next();
    } else {
        res.status(401).json({ success: false, message: 'Unauthorized' });
    }
}

// Register endpoint
app.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    if (password.length < 6) {
        return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
    }

    try {
        // Hash password
        const passwordHash = await bcrypt.hash(password, 10);

        // Check if user exists
        const checkStmt = db.prepare('SELECT * FROM users WHERE username = ? OR email = ?');
        checkStmt.bind([username, email]);
        if (checkStmt.step()) {
            checkStmt.free();
            return res.status(400).json({ 
                success: false, 
                message: 'Username or email already exists' 
            });
        }
        checkStmt.free();

        // Insert user
        db.run('INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)', 
            [username, email, passwordHash]);
        saveDatabase();

        // Get the inserted user ID
        const getUserStmt = db.prepare('SELECT id FROM users WHERE username = ?');
        getUserStmt.bind([username]);
        getUserStmt.step();
        const userId = getUserStmt.getAsObject().id;
        getUserStmt.free();

        // Set session
        req.session.userId = userId;
        req.session.username = username;

        res.json({ 
            success: true, 
            message: 'Registration successful',
            user: { id: userId, username, email }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    try {
        const stmt = db.prepare('SELECT * FROM users WHERE username = ? OR email = ?');
        stmt.bind([username, username]);
        
        if (!stmt.step()) {
            stmt.free();
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
        
        const user = stmt.getAsObject();
        stmt.free();

        const isValid = await bcrypt.compare(password, user.password_hash);

        if (!isValid) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Set session
        req.session.userId = user.id;
        req.session.username = user.username;

        res.json({
            success: true,
            message: 'Login successful',
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Logout endpoint
app.post('/api/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error logging out' });
        }
        res.json({ success: true, message: 'Logout successful' });
    });
});

// Get current user endpoint
app.get('/api/user', isAuthenticated, (req, res) => {
    try {
        const stmt = db.prepare('SELECT id, username, email, created_at FROM users WHERE id = ?');
        stmt.bind([req.session.userId]);
        
        if (!stmt.step()) {
            stmt.free();
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        
        const user = stmt.getAsObject();
        stmt.free();
        res.json({ success: true, user });
    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Check authentication status
app.get('/api/auth/status', (req, res) => {
    if (req.session.userId) {
        try {
            const stmt = db.prepare('SELECT id, username, email, created_at FROM users WHERE id = ?');
            stmt.bind([req.session.userId]);
            
            if (!stmt.step()) {
                stmt.free();
                return res.json({ authenticated: false });
            }
            
            const user = stmt.getAsObject();
            stmt.free();
            res.json({ authenticated: true, user });
        } catch (error) {
            console.error('Auth status error:', error);
            res.json({ authenticated: false });
        }
    } else {
        res.json({ authenticated: false });
    }
});

// Update profile endpoint
app.put('/api/update-profile', isAuthenticated, (req, res) => {
    const { username, email } = req.body;

    if (!username || !email) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    try {
        // Check if username/email is taken by another user
        const checkStmt = db.prepare('SELECT id FROM users WHERE (username = ? OR email = ?) AND id != ?');
        checkStmt.bind([username, email, req.session.userId]);
        
        if (checkStmt.step()) {
            checkStmt.free();
            return res.status(400).json({ 
                success: false, 
                message: 'Username or email already taken by another user' 
            });
        }
        checkStmt.free();

        // Update user
        db.run('UPDATE users SET username = ?, email = ? WHERE id = ?', 
            [username, email, req.session.userId]);
        saveDatabase();

        res.json({ 
            success: true, 
            message: 'Profile updated successfully'
        });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Change password endpoint
app.post('/api/change-password', isAuthenticated, async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    if (newPassword.length < 6) {
        return res.status(400).json({ success: false, message: 'New password must be at least 6 characters' });
    }

    try {
        // Get current user
        const stmt = db.prepare('SELECT password_hash FROM users WHERE id = ?');
        stmt.bind([req.session.userId]);
        
        if (!stmt.step()) {
            stmt.free();
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        
        const user = stmt.getAsObject();
        stmt.free();

        // Verify current password
        const isValid = await bcrypt.compare(currentPassword, user.password_hash);

        if (!isValid) {
            return res.status(401).json({ success: false, message: 'Current password is incorrect' });
        }

        // Hash new password
        const newPasswordHash = await bcrypt.hash(newPassword, 10);

        // Update password
        db.run('UPDATE users SET password_hash = ? WHERE id = ?', 
            [newPasswordHash, req.session.userId]);
        saveDatabase();

        res.json({ 
            success: true, 
            message: 'Password changed successfully'
        });
    } catch (error) {
        console.error('Change password error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Delete account endpoint
app.delete('/api/delete-account', isAuthenticated, (req, res) => {
    try {
        db.run('DELETE FROM users WHERE id = ?', [req.session.userId]);
        saveDatabase();

        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error deleting account' });
            }
            res.json({ success: true, message: 'Account deleted successfully' });
        });
    } catch (error) {
        console.error('Delete account error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
