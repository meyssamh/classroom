import prisma from "@/lib/prisma";
import { authDecoder } from '../utility';

// Get all classes
const handler = async (req, res) => {
    const decodedAuth = authDecoder(req);

    const classname = req.body.classname.trim();

    if (classname.length === 0) {
        return res.status(401).json({ message: 'Invalid input!' });
    }

    const newClass = await prisma.class.create({
        data: {
            classname: classname,
        },
        select: {
            id: true,
            classname: true,
        }
    });

    await prisma.teacherClass.create({
        data: {
            teacher_Id: parseInt(decodedAuth.id),
            class_Id: newClass.id
        },
    });

    const newClassId = Number(newClass.id);

    await prisma.historyLog.create({
        data: {
            teacher_Id: parseInt(decodedAuth.id),
            activity: `added a new class with id ${newClassId}`,
        }
    });

    const handeledNewClass = {
        ...newClass,
        id: newClassId,
    };

    res.status(201).json({ data: { newClass: handeledNewClass } });
};

export default handler;