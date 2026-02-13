import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react';
import { Navbar } from '@/sections/Navbar';
import { Footer } from '@/sections/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20">
        {/* Header */}
        <div className="section-padding mb-16">
          <div className="container-narrow mx-auto text-center">
            <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-basque-slate mb-6">
              Contacto
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              ¿Tienes alguna pregunta o sugerencia? Estamos aquí para ayudarte.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="section-padding">
          <div className="container-wide mx-auto">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Contact Info */}
              <div className="lg:col-span-1">
                <div className="space-y-8">
                  <div>
                    <h3 className="font-serif text-xl font-semibold mb-6">
                      Información de Contacto
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-basque-red/10 flex items-center justify-center flex-shrink-0">
                          <Mail className="w-5 h-5 text-basque-red" />
                        </div>
                        <div>
                          <p className="font-medium">Email</p>
                          <a
                            href="mailto:info@basquechoralmusic.com"
                            className="text-muted-foreground hover:text-basque-red transition-colors"
                          >
                            info@basquechoralmusic.com
                          </a>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-basque-red/10 flex items-center justify-center flex-shrink-0">
                          <Phone className="w-5 h-5 text-basque-red" />
                        </div>
                        <div>
                          <p className="font-medium">Teléfono</p>
                          <a
                            href="tel:+34944123456"
                            className="text-muted-foreground hover:text-basque-red transition-colors"
                          >
                            +34 944 123 456
                          </a>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-basque-red/10 flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-5 h-5 text-basque-red" />
                        </div>
                        <div>
                          <p className="font-medium">Dirección</p>
                          <p className="text-muted-foreground">
                            Calle Licenciado Poza 1
                            <br />
                            48011 Bilbao, España
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-basque-red/10 flex items-center justify-center flex-shrink-0">
                          <Clock className="w-5 h-5 text-basque-red" />
                        </div>
                        <div>
                          <p className="font-medium">Horario</p>
                          <p className="text-muted-foreground">
                            Lunes - Viernes
                            <br />
                            9:00 - 18:00
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl border border-border p-8">
                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 mx-auto rounded-full bg-basque-green/10 flex items-center justify-center mb-4">
                        <Send className="w-8 h-8 text-basque-green" />
                      </div>
                      <h3 className="font-serif text-xl font-semibold mb-2">
                        ¡Mensaje enviado!
                      </h3>
                      <p className="text-muted-foreground">
                        Gracias por contactarnos. Te responderemos lo antes posible.
                      </p>
                      <Button
                        className="mt-6"
                        variant="outline"
                        onClick={() => setIsSubmitted(false)}
                      >
                        Enviar otro mensaje
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nombre *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({ ...formData, email: e.target.value })
                            }
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Asunto *</Label>
                        <Input
                          id="subject"
                          value={formData.subject}
                          onChange={(e) =>
                            setFormData({ ...formData, subject: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Mensaje *</Label>
                        <Textarea
                          id="message"
                          rows={6}
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({ ...formData, message: e.target.value })
                          }
                          required
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-basque-red hover:bg-basque-red/90 py-6"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          'Enviando...'
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Enviar Mensaje
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
}
