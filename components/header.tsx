"use client"

import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Header() {
  const { totalItems } = useCart()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 relative">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center z-10">
            <Image
              src="/logo.png"
              alt="La Pacha"
              width={120}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation (centrado) */}
          <nav className="hidden md:flex items-center gap-10 absolute left-1/2 transform -translate-x-1/2 text-lg font-semibold">
            <Link href="/" className="hover:text-primary transition-colors">
              Inicio
            </Link>
            <Link href="/productos" className="hover:text-primary transition-colors">
              Productos
            </Link>
            <Link href="/promociones" className="hover:text-primary transition-colors">
              Promociones
            </Link>
            <Link href="/contacto" className="hover:text-primary transition-colors">
              Contacto
            </Link>
          </nav>

          {/* Carrito + Mobile Menu */}
          <div className="flex items-center gap-2 z-10">
            <Link href="/carrito">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>

            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col gap-6 mt-8 text-lg font-semibold">
                  <Link href="/" className="hover:text-primary transition-colors">
                    Inicio
                  </Link>
                  <Link href="/productos" className="hover:text-primary transition-colors">
                    Productos
                  </Link>
                  <Link href="/promociones" className="hover:text-primary transition-colors">
                    Promociones
                  </Link>
                  <Link href="/contacto" className="hover:text-primary transition-colors">
                    Contacto
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
