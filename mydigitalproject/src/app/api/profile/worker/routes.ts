import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { prisma } from '@/app/lib/prisma';
import { writeFile } from 'fs/promises';
import path from 'path';
import { v4 as uuid } from 'uuid';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { worker: true },
  });

  if (!user?.worker) {
    return NextResponse.json({ error: 'Worker profile not found' }, { status: 404 });
  }

  return NextResponse.json(user.worker);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const formData = await req.formData();
  const description = formData.get('description')?.toString() || '';
  const country = formData.get('country')?.toString() || '';
  const picture = formData.get('picture') as File | null;
  const resume = formData.get('resume') as File | null;

  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');

  let picturePath: string | undefined;
  if (picture && picture.size > 0) {
    const buffer = Buffer.from(await picture.arrayBuffer());
    const filename = `profile-${uuid()}-${picture.name}`;
    await writeFile(path.join(uploadsDir, filename), buffer);
    picturePath = `/uploads/${filename}`;
  }

  let resumePath: string | undefined;
  if (resume && resume.size > 0) {
    const buffer = Buffer.from(await resume.arrayBuffer());
    const filename = `cv-${uuid()}-${resume.name}`;
    await writeFile(path.join(uploadsDir, filename), buffer);
    resumePath = `/uploads/${filename}`;
  }

  await prisma.workerProfile.update({
    where: { userId: user.id },
    data: {
      description,
      country,
      ...(picturePath && { picture: picturePath }),
      ...(resumePath && { resumeFile: resumePath }),
    },
  });

  return NextResponse.json({ success: true });
}
