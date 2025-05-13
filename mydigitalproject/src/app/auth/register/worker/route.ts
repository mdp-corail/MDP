import { prisma } from '@/app/lib/prisma';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';


export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {
            email,
            password,
            name,
            surname,
            country,
            description,
            picture,
            resumeFile,
            xp,
            level,
        } = body;

        if (!email || !password || !name || !surname || !country) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });

        if (existingUser) {
            return NextResponse.json({ error: 'User already exists' }, { status: 409 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                type: 'WORKER',
                worker: {
                    create: {
                        name,
                        surname,
                        country,
                        description,
                        picture,
                        resumeFile,
                        xp: xp ?? 0,
                        level: level ?? 1,
                    },
                },
            },
        });

        return NextResponse.json({ message: 'User created', userId: newUser.id }, { status: 201 });
    } catch (err) {
        console.error('Worker registration error:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
