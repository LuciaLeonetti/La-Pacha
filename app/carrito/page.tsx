"use client"

import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppModal } from "@/components/whatsapp-modal"
import { CartProvider, useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Trash2, Plus, Minus, ShoppingBag, MessageCircle } from "lucide-react"
import { useState } from "react"

function CartContent() {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart()
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false)
  const [deliveryMethod, setDeliveryMethod] = useState<"delivery" | "pickup">("delivery")

  const SHIPPING_COST = 500 // 💰 Definí el costo de envío acá
  const shippingCost = deliveryMethod === "delivery" ? SHIPPING_COST : 0
  const totalWithShipping = totalPrice + shippingCost


  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto text-center space-y-6">
              <div className="w-24 h-24 mx-auto rounded-full bg-muted flex items-center justify-center">
                <ShoppingBag className="h-12 w-12 text-muted-foreground" />
              </div>
              <h1 className="text-3xl font-bold">Tu carrito está vacío</h1>
              <p className="text-muted-foreground text-lg">Agregá productos para comenzar tu pedido</p>
              <Button asChild size="lg">
                <Link href="/productos">Explorar Productos</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">Tu Carrito</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                        <p className="text-sm text-muted-foreground capitalize mb-3">{item.category}</p>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 bg-transparent"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center font-semibold">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 bg-transparent"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <p className="font-bold text-lg text-primary">${item.price * item.quantity}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-20">
                <CardContent className="p-6 space-y-6">
                  <h2 className="text-2xl font-bold">Resumen del Pedido</h2>

                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {item.name} x{item.quantity}
                        </span>
                        <span className="font-medium">${item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-3">
                    <p className="font-semibold text-sm">Método de entrega:</p>
                    <div className="space-y-2">
                      <button
                        onClick={() => setDeliveryMethod("delivery")}
                        className={`w-full p-3 rounded-lg border-2 text-left transition-colors ${
                          deliveryMethod === "delivery"
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <p className="font-medium">Envío a domicilio</p>
                        <p className="text-xs text-muted-foreground">Solo Santa Fe Capital - $500</p>
                      </button>
                      <button
                        onClick={() => setDeliveryMethod("pickup")}
                        className={`w-full p-3 rounded-lg border-2 text-left transition-colors ${
                          deliveryMethod === "pickup"
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <p className="font-medium">Retiro en domicilio</p>
                        <p className="text-xs text-muted-foreground">Sin cargo</p>
                      </button>
                    </div>
                  </div>

                  <div className="border-t pt-4 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">${totalPrice}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {deliveryMethod === "delivery" ? "Envío" : "Retiro"}
                      </span>
                      <span className="font-medium">${shippingCost}</span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-lg font-semibold">Total</span>
                      <span className="text-3xl font-bold text-primary">${totalWithShipping}</span>
                    </div>

                    <Button size="lg" className="w-full text-lg" onClick={() => setShowWhatsAppModal(true)}>
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Enviar por WhatsApp
                    </Button>

                    <Button asChild variant="outline" className="w-full mt-3 bg-transparent">
                      <Link href="/productos">Seguir Comprando</Link>
                    </Button>
                  </div>

                  <p className="text-xs text-muted-foreground text-center leading-relaxed">
                    Al enviar tu pedido, te contactaremos por WhatsApp para confirmar la entrega y el pago.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppModal
        open={showWhatsAppModal}
        onOpenChange={setShowWhatsAppModal}
        shippingCost={shippingCost}
        deliveryMethod={deliveryMethod}
      />
    </div>
  )
}

export default function CarritoPage() {
  return (
    <CartProvider>
      <CartContent />
    </CartProvider>
  )
}