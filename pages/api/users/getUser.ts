import { chosenUserMiddleware } from "../utility";

const handler = async (req, res) => {
    try {
        const foundUser = await chosenUserMiddleware(req);

        res.status(200).json({ data: { user: foundUser } });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export default handler;