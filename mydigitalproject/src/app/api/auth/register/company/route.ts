import { prisma } from '@/app/lib/prisma';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, country, employeeCount, email, password } = body;

        // Validate required fields
        if (!name || !country || !employeeCount || !email || !password) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json({ error: 'User already exists' }, { status: 409 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Step 1: Create User
        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                type: 'COMPANY',
            },
        });

        // Step 2: Create Company Profile
        await prisma.companyProfile.create({
            data: {
                name,
                country,
                employeeCount: parseInt(employeeCount, 10),
                userId: newUser.id,
            },
        });

        return NextResponse.json({ message: 'Company account created', userId: newUser.id }, { status: 201 });
    } catch (err: any) {
        console.error('❌ Company registration error:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
