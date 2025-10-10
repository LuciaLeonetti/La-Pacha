"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { CartProvider } from "@/lib/cart-context"
import { products, categories } from "@/lib/products"
import { ArrowRight, Leaf, Heart, Truck } from "lucide-react"

export default function HomePage() {
  const featuredProducts = products.filter((p) => p.featured)

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative overflow-hidden py-20 md:py-32">
            {/* Background Image with Blur */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/fresh-organic-vegetables-and-healthy-food-ingredie.jpg"
                alt="Healthy food background"
                fill
                className="object-cover blur-[2px] opacity-40"
                priority
              />
                 <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-background/60 to-primary/20" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl mx-auto text-center space-y-6">
                <h1 className="text-4xl md:text-6xl font-bold text-balance leading-tight">
                  Comé rico, sano y sustentable
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed text-pretty">
                  Descubrí nuestras hamburguesas vegetales, snacks naturales y productos artesanales. Alimentación
                  consciente para vos y el planeta.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <Button asChild size="lg" className="text-lg">
                    <Link href="/productos">
                      Ver Productos
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="text-lg border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
                  >
                    <Link href="/contacto">Contactanos</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="py-16 border-b">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Leaf className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg">100% Natural</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Ingredientes orgánicos y de origen vegetal
                  </p>
                </div>
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <Heart className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-lg">Hecho con Amor</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Productos artesanales elaborados a mano
                  </p>
                </div>
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Truck className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg">Pedí por WhatsApp</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Proceso simple y directo para tu comodidad
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Categories */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestras Categorías</h2>
                <p className="text-muted-foreground text-lg">Explorá nuestra selección de productos saludables</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {categories.map((category) => (
                  <Link key={category.id} href={`/productos?categoria=${category.id}`}>
                    <Card className="overflow-hidden group hover:shadow-xl transition-all">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={category.image || "/placeholder.svg"}
                          alt={category.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <CardContent className="p-6 text-center">
                        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-muted-foreground text-sm">{category.description}</p>
                        <Button variant="link" className="mt-4 text-accent hover:text-accent/80">
                          Explorar
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>

           {/* About Us Section */}
          <section className="py-20 bg-primary/5">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Sobre Nosotros</h2>
                  <div className="w-20 h-1 bg-accent mx-auto mb-6" />
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <p className="text-lg leading-relaxed text-muted-foreground">
                      En <span className="font-semibold text-foreground">La Pacha</span>, creemos que la alimentación
                      consciente es el camino hacia un futuro más saludable y sustentable. Elaboramos productos
                      vegetales y naturales con ingredientes de la más alta calidad.
                    </p>
                    <p className="text-lg leading-relaxed text-muted-foreground">
                      Cada hamburguesa, snack y producto artesanal está hecho con amor y dedicación, respetando el medio
                      ambiente y tu bienestar. Nuestra misión es hacer que comer sano sea delicioso, accesible y
                      amigable con el planeta.
                    </p>
                    <div className="flex flex-wrap gap-4 pt-4">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-accent" />
                        <span className="text-sm font-medium">100% Vegetal</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-accent" />
                        <span className="text-sm font-medium">Sin Conservantes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-accent" />
                        <span className="text-sm font-medium">Producción Local</span>
                      </div>
                    </div>
                  </div>                

                  <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src="\Imagen de WhatsApp 2025-10-10 a las 18.30.01_a3f68813.jpg"
                      alt="La Pacha - Preparación artesanal"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Products */}
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Productos Destacados</h2>
                <p className="text-muted-foreground text-lg">Los favoritos de nuestros clientes</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <div className="text-center mt-12">
                <Button asChild size="lg" variant="outline">
                  <Link href="/productos">
                    Ver Todos los Productos
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </CartProvider>
  )
}
