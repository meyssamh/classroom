import prisma from "@/lib/prisma";
import { authDecoder, chosenSessionMiddleware } from "../../utility";

// Update session
const handler = async (req, res) => {
    const decodedAuth = authDecoder(req);

	const chosenSession = await chosenSessionMiddleware(req);

	if (chosenSession === null) {
		return res.status(400).json({ message: 'Something went wrong!' });
	}

	const updatedSession = await prisma.session.update({
		where: {
			id: chosenSession.session_Id,
		},
		data: {
			situation: req.body.situation,
		},
		select: {
			id: true,
			date: true,
			situation: true,
		},
	});

	const updatedSessionId = Number(updatedSession.id);
	const updatedSessionSituation = JSON.parse(updatedSession.situation);

	await prisma.historyLog.create({
		data: {
			teacher_Id: parseInt(decodedAuth.id),
			activity: `updated an existing session with id ${updatedSessionId}`,
		},
	});

	const handeledupdatedSession = {
		...updatedSession,
		id: updatedSessionId,
		situation: updatedSessionSituation,
	};

	res.status(200).json({ data: { updatedSession: handeledupdatedSession } });
};

export default handler;