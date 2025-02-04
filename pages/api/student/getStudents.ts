import { chosenClassMiddleware, getAllStudentsMiddleware } from "../utility";

// Get all students
const handler = async (req, res) => {
	const chosenClass = await chosenClassMiddleware(req);

	const allStudents = await getAllStudentsMiddleware(chosenClass);

	res.json({ data: { students: allStudents } });
};

export default handler;