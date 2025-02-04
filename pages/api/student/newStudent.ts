import prisma from "@/lib/prisma";
import { authDecoder } from '../utility';

// Create student
const handler = async (req, res) => {
	const nameRegex = /^[a-zA-Z]+$/;

    const decodedAuth = authDecoder(req);

	const firstname = req.body.firstname.trim();
	const lastname = req.body.lastname.trim();
	const classId = parseInt(req.body.classId);

	if (firstname.length === 0 || !firstname.match(nameRegex)) {
		return res.status(401).json({ message: 'Invalid input!' });
	} else if (lastname.length === 0 || !lastname.match(nameRegex)) {
		return res.status(401).json({ message: 'Invalid input!' });
	}


	const chosenClass = await prisma.teacherClass.findFirst({
		where: {
			teacher_Id: parseInt(decodedAuth.id),
			class_Id: classId,
		},
		select: {
			class_Id: true,
		}
	});

	const newStudent = await prisma.student.create({
		data: {
			firstname: firstname,
			lastname: lastname,
		},
		select: {
			id: true,
			firstname: true,
			lastname: true,
		}
	});

	await prisma.classStudent.create({
		data: {
			class_Id: Number(chosenClass?.class_Id),
			student_Id: newStudent.id,
		},
	});

	const newStudentId = Number(newStudent.id);

	await prisma.historyLog.create({
		data: {
			teacher_Id: parseInt(decodedAuth.id),
			activity: `created student with id ${newStudentId}`,
		},
	});

	const handeledNewStudent = {
		...newStudent,
		id: newStudentId,
	};

	res.json({ data: { newStudent: handeledNewStudent } });
};

export default handler;