import prisma from "@/lib/prisma";
import { authDecoder } from '../utility';

// Create session
const handler = async (req, res) => {
    const decodedAuth = authDecoder(req);

	const classId = parseInt(req.body.classId);

	const chosenClass = await prisma.teacherClass.findFirst({
		where: {
			teacher_Id: parseInt(decodedAuth.id),
			class_Id: classId,
		},
		select: {
			class_Id: true,
		},
	});

	const newSession = await prisma.session.create({
		data: {
			situation: req.body.situation,
		},
		select: {
			id: true,
			date: true,
			situation: true,
		}
	});

	await prisma.classSession.create({
		data: {
			class_Id: Number(chosenClass?.class_Id),
			session_Id: newSession.id,
		},
	});

	const newSessionId = Number(newSession.id);
	const newSessionSituation = JSON.parse(newSession.situation);

	await prisma.historyLog.create({
		data: {
			teacher_Id: parseInt(decodedAuth.id),
			activity: `created session with id ${newSessionId}`,
		},
	});

	const handeledNewSession = {
		...newSession,
		id: newSessionId,
		situation: newSessionSituation,
	};

	res.status(200).json({ data: { newSession: handeledNewSession } });
};

export default handler;