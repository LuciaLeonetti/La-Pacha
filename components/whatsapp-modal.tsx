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
import { sendWhatsAppOrder } from "@/lib/whatsapp"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/hooks/use-toast"
import { MessageCircle } from "lucide-react"

interface WhatsAppModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function WhatsAppModal({ open, onOpenChange }: WhatsAppModalProps) {
  const { cart, totalPrice, clearCart } = useCart()
  const { toast } = useToast()
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [notes, setNotes] = useState("")

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

    const cartItems = cart.map((item) => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    }))

    sendWhatsAppOrder(cartItems, totalPrice, {
      name: name.trim(),
      phone: phone.trim() || undefined,
      notes: notes.trim() || undefined,
    })

    toast({
      title: "¡Pedido enviado!",
      description: "Se abrió WhatsApp con tu pedido",
    })

    // Clear form and cart
    setName("")
    setPhone("")
    setNotes("")
    clearCart()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
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
                placeholder="+54 9 11 1234 5678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Observaciones</Label>
              <Textarea
                id="notes"
                placeholder="Horario de entrega, dirección, etc."
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
                <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                  <span>Subtotal:</span>
                  <span className="text-primary">${totalPrice}</span>
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
