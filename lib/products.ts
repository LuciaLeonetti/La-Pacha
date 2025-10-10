export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: "hamburguesas" | "snacks" | "veganos"
  ingredients?: string[]
  featured?: boolean
}

export const products: Product[] = [
  {
    id: "1",
    name: "Hamburguesa de Lentejas",
    description: "Deliciosa hamburguesa artesanal hecha con lentejas rojas, especias y vegetales frescos",
    price: 850,
    image: "/lentil-burger-vegetarian-healthy.jpg",
    category: "hamburguesas",
    ingredients: ["Lentejas rojas", "Cebolla", "Ajo", "Especias", "Pan rallado integral"],
    featured: true,
  },
  {
    id: "2",
    name: "Hamburguesa de Garbanzos",
    description: "Hamburguesa proteica de garbanzos con hierbas mediterráneas",
    price: 900,
    image: "/chickpea-burger-falafel-healthy.jpg",
    category: "hamburguesas",
    ingredients: ["Garbanzos", "Perejil", "Cilantro", "Comino", "Tahini"],
    featured: true,
  },
  {
    id: "3",
    name: "Hamburguesa de Quinoa",
    description: "Superalimento en forma de hamburguesa, rica en proteínas y nutrientes",
    price: 950,
    image: "/quinoa-burger-vegetarian-patty.jpg",
    category: "hamburguesas",
    ingredients: ["Quinoa", "Zanahoria", "Espinaca", "Semillas de chía", "Avena"],
    featured: false,
  },
  {
    id: "4",
    name: "Mix de Frutos Secos",
    description: "Mezcla premium de almendras, nueces, castañas y pasas",
    price: 650,
    image: "/mixed-nuts-healthy-snack.jpg",
    category: "snacks",
    ingredients: ["Almendras", "Nueces", "Castañas de cajú", "Pasas de uva"],
    featured: true,
  },
  {
    id: "5",
    name: "Chips de Kale",
    description: "Snack crujiente y saludable de kale deshidratado con especias",
    price: 550,
    image: "/kale-chips-healthy-green-snack.jpg",
    category: "snacks",
    ingredients: ["Kale orgánico", "Aceite de oliva", "Sal marina", "Levadura nutricional"],
    featured: false,
  },
  {
    id: "6",
    name: "Barritas de Quinoa",
    description: "Barritas energéticas con quinoa, frutos secos y miel",
    price: 450,
    image: "/quinoa-energy-bar-healthy-snack.jpg",
    category: "snacks",
    ingredients: ["Quinoa inflada", "Miel", "Almendras", "Dátiles", "Coco"],
    featured: true,
  },
  {
    id: "7",
    name: "Hummus Artesanal",
    description: "Hummus cremoso hecho con garbanzos orgánicos y tahini",
    price: 700,
    image: "/hummus-chickpea-dip-healthy.jpg",
    category: "veganos",
    ingredients: ["Garbanzos orgánicos", "Tahini", "Limón", "Ajo", "Aceite de oliva"],
    featured: false,
  },
  {
    id: "8",
    name: "Queso Vegano de Anacardos",
    description: "Queso cremoso 100% vegetal elaborado con anacardos",
    price: 1200,
    image: "/vegan-cashew-cheese-plant-based.jpg",
    category: "veganos",
    ingredients: ["Anacardos", "Levadura nutricional", "Probióticos", "Sal marina"],
    featured: true,
  },
  {
    id: "9",
    name: "Leche de Almendras",
    description: "Bebida vegetal artesanal sin azúcares añadidos",
    price: 600,
    image: "/almond-milk-plant-based-drink.jpg",
    category: "veganos",
    ingredients: ["Almendras", "Agua filtrada", "Dátiles", "Vainilla"],
    featured: false,
  },
]

export const categories = [
  {
    id: "hamburguesas",
    name: "Hamburguesas",
    description: "Hamburguesas vegetales artesanales",
    image: "/vegetarian-burger-patties-healthy.jpg",
  },
  {
    id: "snacks",
    name: "Snacks",
    description: "Snacks naturales y saludables",
    image: "/healthy-snacks-nuts-seeds.jpg",
  },
  {
    id: "veganos",
    name: "Veganos",
    description: "Productos 100% vegetales",
    image: "/vegan-plant-based-food.jpg",
  },
]
