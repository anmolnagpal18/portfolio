import connectDB from '@/lib/mongodb';
import Profile from '@/models/Profile';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();
    const profile = await Profile.findOne({});
    
    if (!profile || !profile.cvPath) {
      return new Response('CV not found', { status: 404 });
    }

    const cvData: string = profile.cvPath;
    const profileName: string = profile.name || 'Anmol Nagpal';
    const downloadName = `${profileName.replace(/\s+/g, '_')}_CV.pdf`;

    // Handle Base64 Data URL if present, otherwise assume file path (legacy)
    let buffer: Buffer;
    if (cvData.startsWith('data:application/pdf;base64,')) {
      const base64Content = cvData.split(';base64,').pop() || '';
      buffer = Buffer.from(base64Content, 'base64');
    } else {
      // Legacy support: read from file system if not Base64
      const path = await import('path');
      const fs = await import('fs/promises');
      const filePath = path.join(process.cwd(), 'public', cvData.replace(/^\//, ''));
      buffer = await fs.readFile(filePath);
    }

    return new Response(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${downloadName}"`,
        'Content-Length': String(buffer.byteLength),
        'Cache-Control': 'no-store',
      },
    });
  } catch (err) {
    console.error('[/api/cv] error:', err);
    return new Response('CV error', { status: 500 });
  }
}
