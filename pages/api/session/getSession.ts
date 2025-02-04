import prisma from "@/lib/prisma";
import { chosenSessionMiddleware } from "../utility";

// Get one session
const handler = async (req, res) => {
	const chosenSession = await chosenSessionMiddleware(req);

	if (chosenSession === null) {
		return res.status(400).json({ message: 'Something went wrong!' });
	}

	const session = await prisma.session.findFirst({
		where: {
			id: chosenSession.session_Id,
		},
		select: {
			date: true,
			situation: true,
		}
	});

	res.status(200).json({ data: session });
};

export default handler;