"use client"

import { use } from "react"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { CartProvider, useCart } from "@/lib/cart-context"
import { products } from "@/lib/products"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { ShoppingCart, Minus, Plus, ArrowLeft } from "lucide-react"
import { useState } from "react"

function ProductDetailContent({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const product = products.find((p) => p.id === resolvedParams.id)
  const { addToCart } = useCart()
  const { toast } = useToast()
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    notFound()
  }

  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3)

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
      })
    }
    toast({
      title: "Producto agregado",
      description: `${quantity} x ${product.name} agregado al carrito`,
    })
    setQuantity(1)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <Button asChild variant="ghost" className="mb-6">
            <Link href="/productos">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a Productos
            </Link>
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            {/* Product Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <p className="text-sm text-primary font-medium uppercase tracking-wide mb-2">{product.category}</p>
                <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
                <p className="text-3xl font-bold text-primary mb-6">${product.price}</p>
                <p className="text-muted-foreground leading-relaxed text-lg">{product.description}</p>
              </div>

              {product.ingredients && (
                <div>
                  <h3 className="font-semibold text-lg mb-3">Ingredientes</h3>
                  <ul className="space-y-2">
                    {product.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-center text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mr-3" />
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="space-y-4 pt-6 border-t">
                <div className="flex items-center gap-4">
                  <span className="font-semibold">Cantidad:</span>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
                    <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Button onClick={handleAddToCart} size="lg" className="w-full text-lg">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Agregar al carrito - ${product.price * quantity}
                </Button>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section>
              <h2 className="text-3xl font-bold mb-8">Productos Similares</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <CartProvider>
      <ProductDetailContent params={params} />
    </CartProvider>
  )
}
