import prisma from "@/lib/prisma";
import { authDecoder, chosenClassMiddleware } from '../../utility';

// Delete class
const handler = async (req, res) => {
    const decodedAuth = authDecoder(req);

	const chosenClass = await chosenClassMiddleware(req);

	if (chosenClass === null) {
		return res.status(400).json({ message: 'Something went wrong!' });
	}

	await prisma.teacherClass.delete({
		where: {
			id: chosenClass.id
		}
	});

	const chosenStudents = await prisma.classStudent.findMany({
		where: {
			class_Id: chosenClass.class_Id,
		},
		select: {
			student_Id: true,
		}
	});

	const chosenStudentsIds = chosenStudents.map(classStudents => {
		return classStudents.student_Id;
	});

	await prisma.classStudent.deleteMany({
		where: {
			class_Id: chosenClass.id
		}
	});

	await prisma.student.deleteMany({
		where: {
			id: {
				in: chosenStudentsIds
			},
		}
	});

	const chosenSessions = await prisma.classSession.findMany({
		where: {
			class_Id: chosenClass.class_Id,
		},
		select: {
			session_Id: true,
		},
	});

	const chosenSessionsIds = chosenSessions.map(classSessions => {
		return classSessions.session_Id;
	});

	await prisma.classSession.deleteMany({
		where: {
			class_Id: chosenClass.id
		},
	});

	await prisma.session.deleteMany({
		where: {
			id: {
				in: chosenSessionsIds
			}
		}
	});

	const deletedClass = await prisma.class.delete({
		where: {
			id: chosenClass.class_Id,
		},
		select: {
			id: true,
			classname: true,
		}
	});

	const deletedClassId = Number(deletedClass.id);

	await prisma.historyLog.create({
		data: {
			teacher_Id: parseInt(decodedAuth.id),
			activity: `deleted an existing class with id ${deletedClassId}`,
		}
	});

	const handeledDeletedClass = {
		...deletedClass,
		id: deletedClassId,
	};

	res.status(200).json({ data: { deletedClass: handeledDeletedClass } });
};

export default handler;