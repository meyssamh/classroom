import { chosenClassMiddleware, getAllSessionsMiddleware } from "../utility";

// Get all sessions
const handler = async (req, res) => {
	const chosenClass = await chosenClassMiddleware(req);

	const allSessions = await getAllSessionsMiddleware(chosenClass);

	res.status(200).json({ data: { sessions: allSessions } });
};

export default handler;