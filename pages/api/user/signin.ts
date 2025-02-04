import { createJWT, comparePassword } from '../auth/auth';
import { findUser } from '../utility';

const maxAge = Number(process.env.COOKIE_MAX_AGE);

// Helper functions for validation
const isValidUsername = (username) => username.length >= 4;
const isValidPassword = (password) => password.length >= 8;

// Signin user
const handler = async (req, res) => {
	try {
		const { username, password } = req.body;

		// Validate input
		if (!isValidUsername(username.trim()) || !isValidPassword(password.trim())) {
			return res.status(400).json({ message: 'Invalid input!' });
		}

		// Find user by username
		const user = await findUser(req);
		if (!user) return res.status(401).json({ message: 'Wrong Username or Password!' });

		// Compare passwords
		const isPasswordValid = await comparePassword(password, user.password);
		if (!isPasswordValid) return res.status(401).json({ message: 'Wrong Username or Password!' });

		// Create JWT token
		const serializedUser = { ...user, id: user.id.toString() };
		const token = createJWT(serializedUser);

		const userData = {
			username: user.username,
			firstname: user.firstname || '',
			lastname: user.lastname || '',
		};

		// Set cookie with JWT token and respond
		res.status(200);
		res.setHeader('Set-Cookie', [`access_token=Bearer ${token}; expires=${new Date(Date.now() + maxAge)}; maxAge=${maxAge}; Secure; Path=/; HttpOnly; SameSite=Strict`]);
		res.json({ data: { user: userData } });
	} catch (error) {
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

export default handler;