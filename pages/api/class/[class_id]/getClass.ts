import prisma from "@/lib/prisma";
import { chosenClassMiddleware, getAllSessionsMiddleware, getAllStudentsMiddleware } from "../../utility";

// Get one class
const handler = async (req, res) => {
	const chosenClass = await chosenClassMiddleware(req);

	if (chosenClass === null) {
		return res.status(400).json({ message: 'Something went wrong!' });
	}

	const classInformation = await prisma.class.findUnique({
		where: {
			id: chosenClass.class_Id
		},
		select: {
			id: true,
			classname: true,
		}
	});

	const selectedClass = { ...classInformation, id: Number(classInformation?.id) };

	const allStudents = await getAllStudentsMiddleware(chosenClass);

	const allSessions = await getAllSessionsMiddleware(chosenClass);

	res.status(200).json({
		data: {
			class: selectedClass,
			students: allStudents,
			sessions: allSessions
		}
	});
};

export default handler;