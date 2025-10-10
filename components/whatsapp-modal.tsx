"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { sendWhatsAppOrder } from "@/lib/whatsapp"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/hooks/use-toast"
import { MessageCircle } from "lucide-react"

interface WhatsAppModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  shippingCost: number
  deliveryMethod: "delivery" | "pickup"
}

export function WhatsAppModal({ open, onOpenChange, shippingCost, deliveryMethod }: WhatsAppModalProps) {
  const { cart, totalPrice, clearCart } = useCart()
  const { toast } = useToast()
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [paymentMethod, setPaymentMethod] = useState<"efectivo" | "transferencia">("efectivo")
  const [notes, setNotes] = useState("")

  const totalWithShipping = totalPrice + shippingCost

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      toast({
        title: "Error",
        description: "Por favor ingresá tu nombre",
        variant: "destructive",
      })
      return
    }

    if (deliveryMethod === "delivery" && !address.trim()) {
      toast({
        title: "Error",
        description: "Por favor ingresá tu dirección de entrega",
        variant: "destructive",
      })
      return
    }

    const cartItems = cart.map((item) => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    }))

    sendWhatsAppOrder(cartItems, totalPrice, shippingCost, deliveryMethod, {
      name: name.trim(),
      phone: phone.trim() || undefined,
      address: address.trim() || undefined,
      paymentMethod,
      notes: notes.trim() || undefined,
    })

    toast({
      title: "¡Pedido enviado!",
      description: "Se abrió WhatsApp con tu pedido",
    })

    // Clear form and cart
    setName("")
    setPhone("")
    setAddress("")
    setPaymentMethod("efectivo")
    setNotes("")
    clearCart()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-primary" />
            Enviar pedido por WhatsApp
          </DialogTitle>
          <DialogDescription>
            Completá tus datos para enviar el pedido. Te contactaremos para confirmar la entrega.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                Nombre <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                placeholder="Tu nombre completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono de contacto</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+54 9 341 123 4567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            {deliveryMethod === "delivery" && (
              <div className="space-y-2">
                <Label htmlFor="address">
                  Dirección de entrega <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="address"
                  placeholder="Calle, número, barrio"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
                <p className="text-xs text-muted-foreground">Solo envío Santa Fe Capital</p>
              </div>
            )}
            <div className="space-y-2">
              <Label>
                Método de pago <span className="text-destructive">*</span>
              </Label>
              <RadioGroup
                value={paymentMethod}
                onValueChange={(value) => setPaymentMethod(value as "efectivo" | "transferencia")}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="efectivo" id="efectivo" />
                  <Label htmlFor="efectivo" className="font-normal cursor-pointer">
                    Efectivo
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="transferencia" id="transferencia" />
                  <Label htmlFor="transferencia" className="font-normal cursor-pointer">
                    Transferencia
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Observaciones</Label>
              <Textarea
                id="notes"
                placeholder="Horario de entrega preferido, indicaciones adicionales, etc."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>

            {/* Order Preview */}
            <div className="rounded-lg bg-muted p-4 space-y-2">
              <p className="font-semibold text-sm">Vista previa del pedido:</p>
              <div className="text-sm space-y-1">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span>
                      • {item.name} x{item.quantity}
                    </span>
                    <span className="font-medium">${item.price * item.quantity}</span>
                  </div>
                ))}
                <div className="border-t pt-2 mt-2 space-y-1">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-medium">${totalPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{deliveryMethod === "delivery" ? "Envío:" : "Retiro:"}</span>
                    <span className="font-medium">${shippingCost}</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span className="text-primary">${totalWithShipping}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="gap-2">
              <MessageCircle className="h-4 w-4" />
              Enviar por WhatsApp
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
