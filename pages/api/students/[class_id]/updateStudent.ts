import prisma from "@/lib/prisma";
import { authDecoder, chosenStudentMiddleware } from "../../utility";

// Update student
const handler = async (req, res) => {
    const decodedAuth = authDecoder(req);

	const nameRegex = /^[a-zA-Z]+$/;

	const firstname = req.body.firstname.trim();
	const lastname = req.body.lastname.trim();

	if (firstname.length === 0 || !firstname.match(nameRegex)) {
		return res.status(401).json({ message: 'Invalid input!' });
	} else if (lastname.length === 0 || !lastname.match(nameRegex)) {
		return res.status(401).json({ message: 'Invalid input!' });
	}
	
	const chosenStudent = await chosenStudentMiddleware(req);

	if (chosenStudent === null) {
		return res.status(400).json({ message: 'Something went wrong!' });
	}

	const updatedStudent = await prisma.student.update({
		where: {
			id: chosenStudent.student_Id,
		},
		data: {
			firstname: req.body.firstname,
			lastname: req.body.lastname,
		},
		select: {
			id: true,
			firstname: true,
			lastname: true,
		}
	});

	const updatedStudentId = Number(updatedStudent.id);

	await prisma.historyLog.create({
		data: {
			teacher_Id: parseInt(decodedAuth.id),
			activity: `updated an existing student with id ${updatedStudentId}`,
		},
	});

	const handeledUpdatedStudent = {
		...updatedStudent,
		id: updatedStudentId,
	};

	res.json({ data: { updatedStudent: handeledUpdatedStudent } });
};

export default handler;