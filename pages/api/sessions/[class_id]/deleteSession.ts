import prisma from "@/lib/prisma";
import { authDecoder, chosenSessionMiddleware } from "../../utility";

// Delete session
const handler = async (req, res) => {
    const decodedAuth = authDecoder(req);

	const chosenSession = await chosenSessionMiddleware(req);

	if (chosenSession === null) {
		return res.status(400).json({ message: 'Something went wrong!' });
	}

	await prisma.classSession.delete({
		where: {
			id: chosenSession.id
		},
	});

	const deletedSession = await prisma.session.delete({
		where: {
			id: chosenSession.session_Id
		},
		select: {
			id: true,
			date: true,
			situation: true,
		},
	});

	const deletedSessionId = Number(deletedSession.id);
	const deletedSessionSituation = JSON.parse(deletedSession.situation);

	await prisma.historyLog.create({
		data: {
			teacher_Id: parseInt(decodedAuth.id),
			activity: `deleted an existing session with id ${deletedSessionId}`,
		},
	});

	const handeledDeletedSession = {
		...deletedSession,
		id: deletedSessionId,
		situation: deletedSessionSituation,
	};

	res.status(200).json({ data: { deletedSession: handeledDeletedSession } });
};

export default handler;