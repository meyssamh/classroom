import prisma from "@/lib/prisma";
import { authDecoder, chosenClassMiddleware } from '../../utility';

// Update class
const handler = async (req, res) => {
    const decodedAuth = authDecoder(req);

	const classname = req.body.classname.trim();

	if (classname.length === 0) {
		return res.status(401).json({ message: 'Invalid input!' });
	}

	const chosenClass = await chosenClassMiddleware(req);

	if (chosenClass === null) {
		return res.status(400).json({ message: 'Something went wrong!' });
	}

	const updatedClass = await prisma.class.update({
		where: {
			id: chosenClass.class_Id,
		},
		data: {
			classname: classname,
		},
		select: {
			id: true,
			classname: true,
		}
	});

	const updatedClassId = Number(updatedClass.id);

	await prisma.historyLog.create({
		data: {
			teacher_Id: parseInt(decodedAuth.id),
			activity: `updated an existing class with id ${updatedClassId}`,
		}
	});

	const handeledUpdatedClass = {
		...updatedClass,
		id: updatedClassId,
	};

	res.status(200).json({ data: { updatedClass: handeledUpdatedClass } });
};

export default handler;