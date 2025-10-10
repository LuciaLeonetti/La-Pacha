export interface CustomerInfo {
  name: string
  phone?: string
  address?: string
  paymentMethod: "efectivo" | "transferencia"
  notes?: string
}

export interface CartItem {
  name: string
  quantity: number
  price: number
}

export function buildWhatsAppMessage(
  cart: CartItem[],
  subtotal: number,
  shippingCost: number,
  deliveryMethod: "delivery" | "pickup",
  customer: CustomerInfo,
): string {
  const lines = ["*Pedido La Pacha* 🌱", ""]

  cart.forEach((item) => {
    lines.push(`• ${item.name} x${item.quantity} - $${item.price * item.quantity}`)
  })

  lines.push("")
  lines.push(`*Subtotal: $${subtotal}*`)
  lines.push(`*${deliveryMethod === "delivery" ? "Envío" : "Retiro"}: $${shippingCost}*`)
  lines.push(`*Total: $${subtotal + shippingCost}*`)
  lines.push("")
  lines.push(`📦 *Método de entrega:* ${deliveryMethod === "delivery" ? "Envío a domicilio" : "Retiro en local"}`)
  lines.push(`👤 *Nombre:* ${customer.name}`)

  if (customer.phone) {
    lines.push(`📱 *Teléfono:* ${customer.phone}`)
  }

  if (deliveryMethod === "delivery" && customer.address) {
    lines.push(`📍 *Dirección:* ${customer.address}`)
  }

  lines.push(`💳 *Método de pago:* ${customer.paymentMethod === "efectivo" ? "Efectivo" : "Transferencia"}`)

  if (customer.notes) {
    lines.push(`📝 *Observaciones:* ${customer.notes}`)
  }

  return encodeURIComponent(lines.join("\n"))
}

export function sendWhatsAppOrder(
  cart: CartItem[],
  subtotal: number,
  shippingCost: number,
  deliveryMethod: "delivery" | "pickup",
  customer: CustomerInfo,
): void {
  const message = buildWhatsAppMessage(cart, subtotal, shippingCost, deliveryMethod, customer)
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "3412241228"
  const url = `https://wa.me/${whatsappNumber}?text=${message}`

  window.open(url, "_blank")
}
