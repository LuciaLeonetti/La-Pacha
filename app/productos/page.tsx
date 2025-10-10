"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { CartProvider } from "@/lib/cart-context"
import { products } from "@/lib/products"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"

export default function ProductosPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [priceRange, setPriceRange] = useState<number[]>([0, 2000])

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch = selectedCategory === "all" || product.category === selectedCategory
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1]
      return categoryMatch && priceMatch
    })
  }, [selectedCategory, priceRange])

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 py-12">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2">Nuestros Productos</h1>
              <p className="text-muted-foreground text-lg">Descubrí toda nuestra línea de productos saludables</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Filters Sidebar */}
              <aside className="lg:col-span-1 space-y-6">
                <div className="rounded-lg border bg-card p-6 space-y-6">
                  <div>
                    <h3 className="font-semibold mb-4">Categoría</h3>
                    <RadioGroup value={selectedCategory} onValueChange={setSelectedCategory}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="all" id="all" />
                        <Label htmlFor="all" className="cursor-pointer">
                          Todas
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="hamburguesas" id="hamburguesas" />
                        <Label htmlFor="hamburguesas" className="cursor-pointer">
                          Hamburguesas
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="snacks" id="snacks" />
                        <Label htmlFor="snacks" className="cursor-pointer">
                          Snacks
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="veganos" id="veganos" />
                        <Label htmlFor="veganos" className="cursor-pointer">
                          Veganos
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4">Rango de Precio</h3>
                    <Slider
                      min={0}
                      max={2000}
                      step={50}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="mb-4"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={() => {
                      setSelectedCategory("all")
                      setPriceRange([0, 2000])
                    }}
                  >
                    Limpiar Filtros
                  </Button>
                </div>
              </aside>

              {/* Products Grid */}
              <div className="lg:col-span-3">
                <div className="mb-4 text-sm text-muted-foreground">
                  Mostrando {filteredProducts.length} producto{filteredProducts.length !== 1 ? "s" : ""}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                {filteredProducts.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground text-lg">
                      No se encontraron productos con los filtros seleccionados
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </CartProvider>
  )
}
