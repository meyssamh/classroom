import prisma from "@/lib/prisma";
import { authDecoder, chosenStudentMiddleware } from "../../utility";

// Delete student
const handler = async (req, res) => {
    const decodedAuth = authDecoder(req);

	const chosenStudent = await chosenStudentMiddleware(req);

	if (chosenStudent === null) {
		return res.status(400).json({ message: 'Something went wrong!' });
	}

	await prisma.classStudent.delete({
		where: {
			id: chosenStudent.id
		}
	});

	const deletedStudent = await prisma.student.delete({
		where: {
			id: chosenStudent.student_Id,
		},
		select: {
			id: true,
			firstname: true,
			lastname: true,
		}
	});

	const deletedStudentId = Number(deletedStudent.id);

	await prisma.historyLog.create({
		data: {
			teacher_Id: parseInt(decodedAuth.id),
			activity: `deleted an existing student with id ${deletedStudentId}`,
		},
	});

	const handeledDeletedStudent = {
		...deletedStudent,
		id: deletedStudentId,
	};

	res.json({ data: { deletedStudent: handeledDeletedStudent } });
};

export default handler;