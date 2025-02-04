import { getAllClassesMiddleware } from "../utility";

// Get all classes
const handler = async (req, res) => {
	const allClasses = await getAllClassesMiddleware(req);

	res.status(200).json({ data: { classes: allClasses } });
};

export default handler;