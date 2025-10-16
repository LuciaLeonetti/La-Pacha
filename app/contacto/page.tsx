"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartProvider } from "@/lib/cart-context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Mail, MessageCircle, Clock } from "lucide-react"

export default function ContactoPage() {
  const handleWhatsApp = () => {
    window.open("https://wa.me/3412241228", "_blank")
  }

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 py-12">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h1 className="text-4xl font-bold mb-4">Contacto</h1>
              <p className="text-muted-foreground text-lg">
                Estamos para ayudarte. Contactanos por cualquier consulta.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Teléfono</h3>
                      <p className="text-muted-foreground">+54 341 224 1228</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">WhatsApp</h3>
                      <p className="text-muted-foreground mb-2">+54 341 224 1228</p>
                      <Button onClick={handleWhatsApp} size="sm">
                        Enviar mensaje
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <p className="text-muted-foreground">info@lapacha.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Ubicación</h3>
                      <p className="text-muted-foreground"> Santa Fe, Argentina</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3">Horarios de Atención</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Lunes a Viernes</span>
                          <span className="font-medium">9:00 - 20:00</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Sábados</span>
                          <span className="font-medium">10:00 - 18:00</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Domingos</span>
                          <span className="font-medium">Cerrado</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t">
                    <h3 className="font-semibold mb-3">Preguntas Frecuentes</h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <p className="font-medium mb-1">¿Hacen envíos?</p>
                        <p className="text-muted-foreground leading-relaxed">
                          Sí, hacemos envíos en Santa Fe capital. Consultá el costo al hacer tu pedido.
                        </p>
                      </div>
                      
                      <div>
                        <p className="font-medium mb-1">¿Cuál es el pedido mínimo?</p>
                        <p className="text-muted-foreground leading-relaxed">
                          No tenemos pedido mínimo. Podés pedir desde una unidad.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </CartProvider>
  )
}
