import { Mail, Phone, MapPin, Facebook, Instagram, Youtube, Twitter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { navigateTo } from '@/hooks/useRouter';

const footerLinks = {
  explore: [
    { label: 'Catálogo Completo', page: 'catalog' as const },
    { label: 'Novedades', page: 'catalog' as const },
    { label: 'Más Populares', page: 'catalog' as const },
    { label: 'Gratis', page: 'catalog' as const },
    { label: 'Compositores', page: 'composers' as const },
  ],
  categories: [
    { label: 'Música Sacra', page: 'catalog' as const },
    { label: 'Tradicional', page: 'catalog' as const },
    { label: 'Contemporánea', page: 'catalog' as const },
    { label: 'Navidad', page: 'catalog' as const },
    { label: 'Himnos', page: 'catalog' as const },
  ],
  support: [
    { label: 'Centro de Ayuda', page: 'contact' as const },
    { label: 'Guía de Compra', page: 'about' as const },
    { label: 'Licencias', page: 'about' as const },
    { label: 'Contacto', page: 'contact' as const },
    { label: 'FAQ', page: 'about' as const },
  ],
  legal: [
    { label: 'Términos de Uso', page: 'about' as const },
    { label: 'Privacidad', page: 'about' as const },
    { label: 'Cookies', page: 'about' as const },
    { label: 'Licencias', page: 'about' as const },
  ],
};

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
];

export function Footer() {
  return (
    <footer className="bg-basque-slate text-white">
      {/* Main Footer */}
      <div className="section-padding py-16">
        <div className="container-wide mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-3 lg:col-span-2">
              <button 
                onClick={() => navigateTo('home')}
                className="flex items-center gap-3 mb-6"
              >
                <div className="w-12 h-12 rounded-full bg-basque-red flex items-center justify-center">
                  <span className="text-white font-serif text-xl font-bold">B</span>
                </div>
                <div className="text-left">
                  <span className="font-serif text-xl font-semibold">Basque Choral</span>
                  <span className="block text-xs text-white/60 -mt-1">Music</span>
                </div>
              </button>
              <p className="text-white/70 text-sm mb-6 max-w-xs">
                La plataforma líder en partituras corales vascas. 
                Conectando la tradición musical vasca con coros de todo el mundo.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3 text-sm">
                <a
                  href="mailto:info@basquechoralmusic.com"
                  className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  info@basquechoralmusic.com
                </a>
                <a
                  href="tel:+34944123456"
                  className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  +34 944 123 456
                </a>
                <div className="flex items-center gap-2 text-white/70">
                  <MapPin className="w-4 h-4" />
                  Bilbao, País Vasco
                </div>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-semibold mb-4">Explorar</h4>
              <ul className="space-y-2">
                {footerLinks.explore.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => navigateTo(link.page)}
                      className="text-sm text-white/70 hover:text-white transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Categorías</h4>
              <ul className="space-y-2">
                {footerLinks.categories.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => navigateTo(link.page)}
                      className="text-sm text-white/70 hover:text-white transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Ayuda</h4>
              <ul className="space-y-2">
                {footerLinks.support.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => navigateTo(link.page)}
                      className="text-sm text-white/70 hover:text-white transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="col-span-2 md:col-span-1">
              <h4 className="font-semibold mb-4">Newsletter</h4>
              <p className="text-sm text-white/70 mb-4">
                Recibe las últimas novedades y ofertas exclusivas.
              </p>
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="Tu email"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
                <Button className="w-full bg-basque-red hover:bg-basque-red/90">
                  Suscribirse
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="section-padding py-6">
          <div className="container-wide mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Copyright */}
              <div className="text-sm text-white/60 text-center md:text-left">
                <p>© {new Date().getFullYear()} Basque Choral Music. Todos los derechos reservados.</p>
              </div>

              {/* Legal Links */}
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                {footerLinks.legal.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => navigateTo(link.page)}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-basque-red transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
