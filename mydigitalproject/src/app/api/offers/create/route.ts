import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/app/lib/prisma';
import { authOptions } from '../../auth/[...nextauth]/route';


export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
        return NextResponse.json({ error: 'Non autorisé.' }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { title, description, country, duration } = body;

        if (!title || !description || !country || !duration) {
            return NextResponse.json({ error: 'Tous les champs sont requis.' }, { status: 400 });
        }

        // Find the company profile for the current user
        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            include: { company: true },
        });

        if (!user?.company) {
            return NextResponse.json({ error: 'Profil entreprise introuvable.' }, { status: 403 });
        }

        const offer = await prisma.offer.create({
            data: {
                title,
                description,
                country,
                duration,
                companyId: user.company.id,
            },
        });

        return NextResponse.json(offer, { status: 201 });
    } catch (error) {
        console.error('Erreur création offre:', error);
        return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 });
    }
}
