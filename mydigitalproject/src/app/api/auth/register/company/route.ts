import { prisma } from '@/app/lib/prisma';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, country, employeeCount, email, password } = body;

        if (!name || !country || !employeeCount || !email || !password) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json({ error: 'User already exists' }, { status: 409 });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const token = randomBytes(32).toString('hex');

        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                type: 'COMPANY',
            },
        });

        await prisma.companyProfile.create({
            data: {
                name,
                country,
                employeeCount: parseInt(employeeCount, 10),
                userId: newUser.id,
                token,
            },
        });
        
        return NextResponse.json({ message: 'Company account created. Please check your email.' }, { status: 201 });
    } catch (err: any) {
        console.error('❌ Company registration error:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
