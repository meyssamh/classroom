import prisma from '../../../lib/prisma';
import { createJWT, hashPassword } from '../auth/auth';
import { findUser, findEmail } from '../utility';

const maxAge = Number(process.env.COOKIE_MAX_AGE);

// Helper functions for validation
const isValidName = (name) => /^[a-zA-Z]+$/.test(name);
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidPassword = (password) => password.length >= 8;
const isValidUsername = (username) => username.length >= 4;

// Create new user
const handler = async (req, res) => {
    try {
        const { firstname, lastname, email, username, password, confirmPassword } = req.body;

        // Trim input values
        const trimmedFirstname = firstname.trim();
        const trimmedLastname = lastname.trim();
        const trimmedEmail = email.trim();
        const trimmedUsername = username.trim();
        const trimmedPassword = password.trim();
        const trimmedConfirmPassword = confirmPassword.trim();

        // Validate input
        if (
            (trimmedFirstname && !isValidName(trimmedFirstname)) ||
            (trimmedLastname && !isValidName(trimmedLastname)) ||
            !isValidEmail(trimmedEmail) ||
            !isValidUsername(trimmedUsername) ||
            !isValidPassword(trimmedPassword) ||
            trimmedPassword !== trimmedConfirmPassword
        ) {
            return res.status(400).json({ message: 'Invalid input!' });
        }

        // Check if username or email already exists
        const existingUser = await findUser(req);
        if (existingUser) return res.status(400).json({ message: 'Username is taken!' });

        const existingEmail = await findEmail(req);
        if (existingEmail) return res.status(400).json({ message: 'E-mail already exists!' });

        // Hash password and create new user
        const hashedPassword = await hashPassword(trimmedPassword);
        const user = await prisma.teacher.create({
            data: {
                firstname: trimmedFirstname,
                lastname: trimmedLastname,
                username: trimmedUsername,
                email: trimmedEmail,
                password: hashedPassword,
            },
        });

        const serializedUser = { ...user, id: user.id.toString() };
        const token = createJWT(serializedUser);

        const userData = {
            username: trimmedUsername,
            firstname: trimmedFirstname || '',
            lastname: trimmedLastname || '',
        };

        res.status(200);
        res.setHeader('Set-Cookie', [`access_token=Bearer ${token}; expires=${new Date(Date.now() + maxAge)}; maxAge=${maxAge}; Secure; Path=/; HttpOnly; SameSite=Strict`]);
        res.json({ data: userData });

    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export default handler;