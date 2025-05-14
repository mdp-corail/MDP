import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { prisma } from '@/app/lib/prisma';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {
            email,
            password,
            name,
            logo,
            country,
            description,
            employeeCount,
            website,
            expertiseFields,
        } = body;

        if (!email || !password || !name || !country || !employeeCount || !expertiseFields) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });

        if (existingUser) {
            return NextResponse.json({ error: 'User already exists' }, { status: 409 });
        }

        const hashedPassword = await bcrypt.hash(password, 16);

        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                type: 'COMPANY',
                company: {
                    create: {
                        name,
                        logo,
                        country,
                        description,
                        employeeCount: Number(employeeCount),
                        website,
                        expertiseFields,
                    },
                },
            },
        });

        return NextResponse.json({ message: 'Company user created', userId: newUser.id }, { status: 201 });
    } catch (err) {
        console.error('Company registration error:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
