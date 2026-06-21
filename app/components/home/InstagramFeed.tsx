// TODO: Instagram API — replace mock data with real posts from @tska_store
// See /lib/instagram.ts for API integration details
import { getInstagramPosts } from '@/lib/instagram';

const postEmojis = ['👗', '🧢', '🩱', '💄', '🛋️', '✨'];
const postBgs = [
  'bg-brand-pale', 'bg-brand-light/50', 'bg-rose-50',
  'bg-pink-50', 'bg-fuchsia-50', 'bg-brand-pale',
];

export default async function InstagramFeed() {
  // TODO: Instagram API — getInstagramPosts() will return real images when INSTAGRAM_ACCESS_TOKEN is set
  const posts = await getInstagramPosts();

  return (
    <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-8">
        <div>
          <h2 className="font-display text-4xl font-semibold text-brand-ink">Shoppe le Feed</h2>
          <p className="text-brand-muted font-ui text-sm mt-1">Suivre @tska_store</p>
        </div>
        <a
          href="https://instagram.com/tska_store"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-ui font-semibold text-brand-primary border border-brand-primary rounded-full px-4 py-1.5 hover:bg-brand-primary hover:text-white transition-colors"
        >
          Suivre @tska_store
        </a>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {posts.slice(0, 6).map((post, i) => (
          <a
            key={post.id}
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square rounded-2xl overflow-hidden"
          >
            {/* TODO: Instagram API — replace emoji placeholder with <img src={post.media_url} alt={post.caption} /> */}
            <div className={`w-full h-full ${postBgs[i]} flex items-center justify-center`}>
              <span className="text-4xl sm:text-5xl">{postEmojis[i]}</span>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-brand-ink/0 group-hover:bg-brand-ink/50 transition-all duration-300 flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-xs font-ui font-semibold bg-brand-primary rounded-full px-3 py-1.5">
                Acheter
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
