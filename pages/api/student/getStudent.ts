import prisma from "@/lib/prisma";
import { chosenStudentMiddleware } from "../utility";

// Get one student
const handler = async (req, res) => {
	const chosenStudent = await chosenStudentMiddleware(req);

	if (chosenStudent === null) {
		return res.status(400).json({ message: 'Something went wrong!' });
	}

	const studentInformation = await prisma.student.findFirst({
		where: {
			id: chosenStudent.student_Id,
		},
		select: {
			firstname: true,
			lastname: true,
		},
	});

	res.json({ data: { student: studentInformation } });
};

export default handler;