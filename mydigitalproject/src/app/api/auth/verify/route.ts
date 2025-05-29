import { prisma } from '../../../lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');

    if (!token) {
        return NextResponse.json({ error: 'Token manquant' }, { status: 400 });
    }

    // Try to activate worker
    const worker = await prisma.workerProfile.findFirst({ where: { token } });
    if (worker) {
        await prisma.workerProfile.update({
            where: { id: worker.id },
            data: { isActive: true, token: null },
        });
        return NextResponse.redirect('/signin');
    }

    // Try to activate company
    const company = await prisma.companyProfile.findFirst({ where: { token } });
    if (company) {
        await prisma.companyProfile.update({
            where: { id: company.id },
            data: { isActive: true, token: null },
        });
        return NextResponse.redirect('/signin');
    }

    return NextResponse.json({ error: 'Token invalide' }, { status: 404 });
}
