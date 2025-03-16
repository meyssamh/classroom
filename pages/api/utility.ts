import jwt from 'jsonwebtoken';

import prisma from '../../lib/prisma';

/**
 * Async middleware to find a user with the given username in database.
 * 
 * @param req Request from the frontend
 * 
 * @returns {Promise} If the user is found in database or not.
 */
export const findUser = async req => {
	return await prisma.teacher.findUnique({
		where: {
			username: req.body.username
		}
	});
};

/**
 * Async middleware to find an email in database.
 * 
 * @param req Request from the frontend
 * 
 * @returns {Promise} If the email is found in database or not.
 */
export const findEmail = async req => {
	return await prisma.teacher.findUnique({
		where: {
			email: req.body.email
		}
	});
};

/**
 * Async middleware to handle input errors
 * 
 * @param req Request from the frontend
 * @param res Response to the frontend
 * @param next To trigger the next function, that is in the row.
 * 
 * @returns {Promise} If the input is correct or not.
 */
export const handleInputErrors = (req, res, next) => {
	// const errors = validationResult(req);

	// if (!errors.isEmpty()) {
	// 	res.status(400);
	// 	res.json({ errors: errors.array() });
	// } else {
	// 	next();
	// }
};

const getTokenFromHeader = (header) => {
	if (!header) {
		throw new Error('Authorization header missing');
	}

	const parts = header.split(' ');

	if (parts.length !== 2) {
		throw new Error('Invalid authorization format');
	}

	return parts[1];
};

const decodeToken = (token) => {
	try {
		return jwt.verify(token, process.env.JWT_SECRET);
	} catch (error) {
		throw new Error('Invalid token');
	}
}

export const chosenUserMiddleware = async req => {
	const token = getTokenFromHeader(req.headers.cookie);
	const decodedAuth = decodeToken(token);

	const userToFind = await prisma.teacher.findUnique({
		where: {
			id: parseInt(decodedAuth?.id)
		},
		select: {
			username: true,
			firstname: true,
			lastname: true,
		}
	});

	return userToFind;
}

/**
 * Async middleware to find a chosen class in database.
 * 
 * @param req Request from the frontend
 * 
 * @returns {Promise} Chosen class
 */
export const chosenClassMiddleware = async req => {
	const token = getTokenFromHeader(req.headers.cookie);
	const decodedAuth = decodeToken(token);

	const { class_id } = req.query;

	const chosenClass = await prisma.teacherClass.findFirst({
		where: {
			teacher_Id: parseInt(decodedAuth?.id),
			class_Id: parseInt(class_id),
		},
		select: {
			id: true,
			class_Id: true,
		}
	});

	return chosenClass;
};

/**
 * Async middleware to find all classes from a user in database.
 * 
 * @param req Request from the frontend
 * 
 * @returns {Promise} All classes
 */
export const getAllClassesMiddleware = async req => {
	const token = getTokenFromHeader(req.headers.cookie);
	const decodedAuth = decodeToken(token);

	let teacherClasses;

	if (req.teacher) {
		teacherClasses = await prisma.teacherClass.findMany({
			where: {
				teacher_Id: parseInt(decodedAuth?.id),
			},
			select: {
				class_Id: true
			}
		});
	} else {
		teacherClasses = await prisma.teacherClass.findMany({
			where: {
				teacher_Id: Number(decodedAuth.id),
			},
			select: {
				class_Id: true
			}
		});
	}

	const classIds = teacherClasses.map(element => {
		return element.class_Id;
	});

	const classes = await prisma.class.findMany({
		where: {
			id: { in: classIds }
		},
		select: {
			id: true,
			classname: true,
		}
	});

	const allClasses = classes.map(element => {
		const _id = Number(element.id);
		return ({
			...element,
			id: _id,
		});
	});

	return allClasses;
};

/**
 * Async middleware to find all students from a chosen class in database.
 * 
 * @param {object} chosenClass An object with class id and it's id in teacherClass table.
 * 
 * @returns {Promise} All students
 */
export const getAllStudentsMiddleware = async chosenClass => {
	const classStudents = await prisma.classStudent.findMany({
		where: {
			class_Id: chosenClass.class_Id,
		},
		select: {
			student_Id: true
		}
	});

	const studentIds = classStudents.map(element => {
		return element.student_Id;
	});

	const students = await prisma.student.findMany({
		where: {
			id: { in: studentIds }
		},
		select: {
			id: true,
			firstname: true,
			lastname: true,
		}
	});

	const allStudents = students.map(element => {
		const _id = Number(element.id);
		return ({
			...element,
			id: _id,
		});
	});

	return allStudents;
};

/**
 * Async middleware to find a chosen student in database.
 * 
 * @param req Request from the frontend
 * 
 * @returns {Promise} Chosen student
 */
export const chosenStudentMiddleware = async req => {
	const studentId = parseInt(req.body.studentId);

	const chosenClass = await chosenClassMiddleware(req);

	const chosenStudent = await prisma.classStudent.findFirst({
		where: {
			class_Id: chosenClass?.class_Id,
			student_Id: studentId,
		},
		select: {
			id: true,
			student_Id: true,
		}
	});

	return chosenStudent;
};

/**
 * Async middleware to find all session from a chosen class in database.
 * 
 * @param {object} chosenClass An object with class id and it's id in teacherClass table.
 * 
 * @returns {Promise} All sessions
 */
export const getAllSessionsMiddleware = async chosenClass => {
	const classSession = await prisma.classSession.findMany({
		where: {
			class_Id: chosenClass.class_Id,
		},
		select: {
			session_Id: true,
		},
	});

	const sessionIds = classSession.map(element => {
		return element.session_Id;
	});

	const sessions = await prisma.session.findMany({
		where: {
			id: { in: sessionIds },
		},
		select: {
			id: true,
			date: true,
			situation: true,
		},
	});

	const allSessions = sessions.map(element => {
		const _id = Number(element.id);
		const _situation = JSON.parse(element.situation);
		return ({
			...element,
			id: _id,
			situation: _situation,
		});
	});

	return allSessions;
};

/**
 * Async middleware to find a chosen session in database.
 * 
 * @param req Request from the frontend
 * 
 * @returns {Promise} Chosen session
 */
export const chosenSessionMiddleware = async req => {
	const sessionId = parseInt(req.body.sessionId);

	const chosenClass = await chosenClassMiddleware(req);

	const chosenSession = await prisma.classSession.findFirst({
		where: {
			class_Id: chosenClass?.class_Id,
			session_Id: sessionId,
		},
		select: {
			id: true,
			session_Id: true,
		},
	});

	return chosenSession;
};

/**
 * Middleware to decode the cookie.
 * 
 * @param req Request from the frontend
 * 
 * @returns {Object} Decoded cookie.
 */
export const authDecoder = req => {
	const authHeader = req.headers.cookie;
	const token = authHeader.split(' ')[1];
	return (jwt.verify(token, process.env.JWT_SECRET));
};