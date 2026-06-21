import Link from 'next/link';

const shopLinks = [
  { label: 'Vêtements', href: '/shop?category=clothing' },
  { label: 'Casquettes', href: '/shop?category=caps' },
  { label: 'Robes', href: '/shop?category=robes' },
  { label: 'Maquillage', href: '/shop?category=makeup' },
  { label: 'Maison', href: '/shop?category=homeware' },
];

const infoLinks = [
  { label: 'À propos', href: '#' },
  { label: 'Contact', href: '#' },
  { label: 'FAQ', href: '#' },
  { label: 'Retours', href: '#' },
];

export default function Footer() {
  return (
    <footer className="bg-brand-ink text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-baseline gap-0.5 mb-3">
              <span className="font-ui font-bold text-2xl tracking-widest uppercase">TSKA</span>
              <span className="font-ui font-light text-2xl text-brand-primary">.store</span>
            </Link>
            <p className="text-brand-muted text-sm leading-relaxed">
              Streetwear & lifestyle — barcha style pour ceux qui se démarquent.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-ui font-semibold text-xs tracking-widest uppercase mb-4 text-white/60">Boutique</h4>
            <ul className="space-y-2">
              {shopLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-brand-muted hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-ui font-semibold text-xs tracking-widest uppercase mb-4 text-white/60">Infos</h4>
            <ul className="space-y-2">
              {infoLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-brand-muted hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-ui font-semibold text-xs tracking-widest uppercase mb-4 text-white/60">Suivre</h4>
            <ul className="space-y-2">
              {[
                { label: 'Instagram', icon: '📸' },
                { label: 'TikTok', icon: '🎵' },
                { label: 'Pinterest', icon: '📌' },
              ].map((s) => (
                <li key={s.label}>
                  <a href="#" className="flex items-center gap-2 text-sm text-brand-muted hover:text-white transition-colors">
                    <span>{s.icon}</span> {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-brand-muted text-xs">
            © {new Date().getFullYear()} Tska Store. Tous droits réservés.
          </p>
          <div className="flex items-center gap-2">
            {['VISA', 'MC', 'PayPal'].map((p) => (
              <span key={p} className="text-[10px] font-bold border border-white/20 px-2 py-1 rounded text-white/40">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
