import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-luxury-charcoal text-luxury-cream pt-20 pb-12 px-6 md:px-12 border-t border-luxury-onyx">
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 text-xs font-light">
        {/* Brand */}
        <div className="space-y-4">
          <span className="text-2xl font-serif tracking-extreme block">DIZANDA</span>
          <p className="text-luxury-muted leading-relaxed max-w-xs text-[11px]">
            Haute Pâtisserie & Bespoke Confectionary Architecture. Crafting timeless moments for extraordinary celebrations.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <p className="text-[10px] uppercase tracking-extreme text-luxury-champagne mb-4 font-normal">Navigation</p>
          <ul className="space-y-2.5 text-luxury-muted">
            <li><Link to="/gallery" className="hover:text-luxury-cream transition-colors">Atelier Gallery</Link></li>
            <li><Link to="/about" className="hover:text-luxury-cream transition-colors">Our Story & Artisans</Link></li>
            <li><Link to="/contact" className="hover:text-luxury-cream transition-colors">Bespoke Consultations</Link></li>
          </ul>
        </div>

        {/* Boutique Info */}
        <div>
          <p className="text-[10px] uppercase tracking-extreme text-luxury-champagne mb-4 font-normal">Flagship Store</p>
          <p className="text-luxury-muted leading-relaxed text-[11px]">
            742 Editorial Avenue<br />
            Design District, NY 10012<br />
            Tuesday – Sunday: 10AM – 7PM
          </p>
        </div>

        {/* Inquiries */}
        <div>
          <p className="text-[10px] uppercase tracking-extreme text-luxury-champagne mb-4 font-normal">Concierge</p>
          <p className="text-luxury-muted leading-relaxed text-[11px]">
            Direct: +1 (800) 492-8392<br />
            Email: concierge@dizanda.com
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-luxury-onyx/80 flex flex-col sm:flex-row items-center justify-between text-[10px] text-luxury-muted uppercase tracking-wider space-y-4 sm:space-y-0">
        <p>© {new Date().getFullYear()} Dizanda Haute Pâtisserie. All Rights Reserved.</p>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-luxury-cream transition-colors">Instagram</a>
          <a href="#" className="hover:text-luxury-cream transition-colors">Pinterest</a>
          <a href="#" className="hover:text-luxury-cream transition-colors">Vogue Weddings</a>
        </div>
      </div>
    </footer>
  );
}