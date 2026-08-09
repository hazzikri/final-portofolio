import { WakaTimeService } from '@/services/wakatime';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const stats = await WakaTimeService.getTotalTime();

    if (!stats) {
      return res.status(500).json({ error: 'Failed to fetch WakaTime stats' });
    }

    // Headers para garantir SEMPRE sem cache
    res.setHeader(
      'Cache-Control',
      'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
    );
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Last-Modified', new Date().toUTCString());
    res.setHeader('ETag', `"${Date.now()}-${Math.random()}"`);
    res.setHeader('Vary', '*');

    return res.status(200).json(stats);
  } catch (error) {
    console.error('WakaTime API route error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
