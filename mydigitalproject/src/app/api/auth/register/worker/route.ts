import { prisma } from "../../../../lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import { randomBytes } from "crypto";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password, name, surname, country } = body;

        if (!email || !password || !name || !surname || !country) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });

        if (existingUser) {
            return NextResponse.json({ error: 'User already exists' }, { status: 409 });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const token = randomBytes(32).toString('hex');

        // Step 1: Create the User
        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                type: 'WORKER',
            },
        });

        // Step 2: Create the WorkerProfile
        await prisma.workerProfile.create({
            data: {
                name,
                surname,
                country,
                userId: newUser.id,
                token
            },
        });

        return NextResponse.json({ message: 'User created', userId: newUser.id }, { status: 201 });

    } catch (err) {
        console.error('❌ Worker registration error:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
