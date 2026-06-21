import { InstagramPost } from '@/types';

// TODO: Instagram API — replace mock data with real posts from @tska_store
const mockPosts: InstagramPost[] = [
  { id: '1', caption: 'New drop just landed 🔥 #TskaStore', media_type: 'IMAGE', media_url: '', permalink: 'https://instagram.com/tska_store' },
  { id: '2', caption: 'Satin Kimono in the wild 🌸', media_type: 'IMAGE', media_url: '', permalink: 'https://instagram.com/tska_store' },
  { id: '3', caption: 'Cap szn is here 🧢 #TskaStyle', media_type: 'IMAGE', media_url: '', permalink: 'https://instagram.com/tska_store' },
  { id: '4', caption: 'Glow up with our highlighter ✨', media_type: 'IMAGE', media_url: '', permalink: 'https://instagram.com/tska_store' },
  { id: '5', caption: 'Oversized fits only 👕 #OOTD', media_type: 'IMAGE', media_url: '', permalink: 'https://instagram.com/tska_store' },
  { id: '6', caption: 'Silk pillowcase = best sleep 🛋️', media_type: 'IMAGE', media_url: '', permalink: 'https://instagram.com/tska_store' },
];

export async function getInstagramPosts(): Promise<InstagramPost[]> {
  if (!process.env.INSTAGRAM_ACCESS_TOKEN) {
    // TODO: Instagram API — return real posts when INSTAGRAM_ACCESS_TOKEN is set
    return mockPosts;
  }

  const res = await fetch(
    `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) return mockPosts;

  const data = await res.json();
  return data.data as InstagramPost[];
}
