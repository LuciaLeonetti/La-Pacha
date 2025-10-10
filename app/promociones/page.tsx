"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartProvider } from "@/lib/cart-context"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Percent, Gift, Sparkles } from "lucide-react"

export default function PromocionesPage() {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 py-12">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h1 className="text-4xl font-bold mb-4">Promociones</h1>
              <p className="text-muted-foreground text-lg">Aprovechá nuestras ofertas especiales</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Card className="overflow-hidden border-primary/20">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Percent className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <Badge className="mb-2">Descuento</Badge>
                    <h3 className="text-xl font-bold mb-2">15% OFF en tu primer pedido</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Mencioná el código PACHA15 al hacer tu pedido por WhatsApp
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-primary/20">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Gift className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <Badge className="mb-2">Regalo</Badge>
                    <h3 className="text-xl font-bold mb-2">Snack gratis</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      En compras mayores a $3000, llevate un snack de regalo
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-primary/20">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <Badge className="mb-2">Combo</Badge>
                    <h3 className="text-xl font-bold mb-2">Combo Saludable</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      3 hamburguesas + 2 snacks por $4500 (ahorrás $500)
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 text-center">
              <p className="text-muted-foreground">
                Las promociones están sujetas a disponibilidad. Consultá al hacer tu pedido.
              </p>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </CartProvider>
  )
}
