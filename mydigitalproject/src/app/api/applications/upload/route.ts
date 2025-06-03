import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
        return NextResponse.json({ error: 'Aucun fichier envoyé.' }, { status: 400 });
    }

    const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg'];
    if (!allowedTypes.includes(file.type)) {
        return NextResponse.json({ error: 'Format de fichier non autorisé.' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const extension = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${extension}`;
    const filePath = path.join('/tmp', fileName);

    try {
        await writeFile(filePath, buffer);
        return NextResponse.json({ message: 'Fichier envoyé avec succès.', filePath });
    } catch (err) {
        console.error('Erreur enregistrement fichier:', err);
        return NextResponse.json({ error: 'Erreur lors de l\'enregistrement du fichier.' }, { status: 500 });
    }
}
