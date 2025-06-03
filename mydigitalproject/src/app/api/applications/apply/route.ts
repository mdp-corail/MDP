import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { UserType } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { writeFile } from 'fs/promises';
import path from 'path';
import { mkdir } from 'fs/promises';

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const name = formData.get('name')?.toString();
        const surname = formData.get('surname')?.toString();
        const email = formData.get('email')?.toString();
        const phone = formData.get('phone')?.toString() || '';
        const file = formData.get('cv') as File;
        const offerId = formData.get('offerId')?.toString();

        // Validation des données
        if (!offerId) {
            return NextResponse.json(
                { error: 'Identifiant de l\'offre manquant.' },
                { status: 400 }
            );
        }

        if (!name || !surname || !email || !file || !phone) {
            return NextResponse.json(
                { error: 'Tous les champs obligatoires doivent être remplis.' },
                { status: 400 }
            );
        }

        // Vérifier que l'offre existe
        const offer = await prisma.offer.findUnique({
            where: { id: offerId }
        });

        if (!offer) {
            return NextResponse.json(
                { error: 'Offre non trouvée.' },
                { status: 404 }
            );
        }

        // Validation du type de fichier
        const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg'];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                { error: 'Type de fichier non supporté. Seuls les fichiers PDF, PNG et JPG sont acceptés.' },
                { status: 400 }
            );
        }

        // Validation de la taille du fichier (5MB max)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            return NextResponse.json(
                { error: 'Le fichier est trop volumineux. Maximum 5MB.' },
                { status: 400 }
            );
        }

        // Sauvegarde du fichier
        const buffer = Buffer.from(await file.arrayBuffer());
        const extension = file.name.split('.').pop();
        const filename = `${uuidv4()}.${extension}`;
        const uploadsDir = path.join(process.cwd(), 'public', 'uploads');

        await mkdir(uploadsDir, { recursive: true });
        const filePath = path.join(uploadsDir, filename);
        await writeFile(filePath, buffer);

        // Vérifier si l'utilisateur a déjà postulé pour cette offre
        const existingApplication = await prisma.application.findFirst({
            where: {
                offerId: offerId,
                user: {
                    email: email
                }
            }
        });

        if (existingApplication) {
            return NextResponse.json(
                { error: 'Vous avez déjà postulé pour cette offre.' },
                { status: 409 }
            );
        }

        // Créer ou récupérer l'utilisateur d'abord
        const user = await prisma.user.upsert({
            where: { email },
            update: {}, // Ne pas modifier si l'utilisateur existe
            create: {
                email,
                password: '', // Vous devriez générer un mot de passe temporaire
                type: UserType.WORKER,
            },
            include: {
                worker: true
            }
        });

        // Créer le profil worker s'il n'existe pas
        if (!user.worker) {
            await prisma.workerProfile.create({
                data: {
                    name,
                    surname,
                    country: 'France', // Utilisation d'une string pour correspondre au schéma
                    resumeFile: `/uploads/${filename}`,
                    userId: user.id
                }
            });
        }

        // Créer l'application
        const application = await prisma.application.create({
            data: {
                cv: `/uploads/${filename}`,
                status: 'PENDING',
                offerId: offerId,
                userId: user.id,
            },
            include: {
                user: {
                    include: {
                        worker: true
                    }
                },
                offer: {
                    include: {
                        company: true
                    }
                }
            }
        });

        return NextResponse.json({
            message: 'Candidature enregistrée avec succès.',
            id: application.id
        });

    } catch (err) {
        console.error('Erreur lors de la création de la candidature :', err ? String(err) : 'Erreur inconnue');
        return NextResponse.json(
            { error: 'Erreur serveur. Veuillez réessayer plus tard.' },
            { status: 500 }
        );
    }
}