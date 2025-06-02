
import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function GET() {
    try {
        const offers = await prisma.offer.findMany({
            include: { company: true },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json(offers);
    } catch (err) {
        console.error('Erreur de récupération des offres:', err);
        return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 });
    }
}
