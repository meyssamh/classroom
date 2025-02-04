const handler = (req, res) => {
    if (req.method === "POST") {
        res.setHeader('Set-Cookie', [`access_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; maxAge=0; Secure; Path=/; HttpOnly; SameSite=Strict`]);
        return res.status(200).json({ message: "Signout was successful" });
    } else {
        return res.status(405).json({ message: "Invalid method!" });
    }
};

export default handler;