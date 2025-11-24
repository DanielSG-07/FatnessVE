// Menu data with ingredients for each item
const menuData = {
  items: {
    //Entradas
    "Tequeños": {
      baseIngredients: ["3 Unidades de Tequeños", "Salsa Bic Mac"]
    },
    //HAMBURGESAS
    "CHESSE BURGUER": {
      baseIngredients: ["Croqueta de carne 180 gr", "tocineta", "queso amarillo", "cebolla morada o caramelizada", "tomate", "lechuga", "salsas"],
      optionalIngredients: [
        { name: "Extra queso", price: 0.50 },
        { name: "Extra tocineta", price: 1.00 },
        { name: "Sin cebolla", price: 0 },
        { name: "Sin tomate", price: 0 },
        { name: "Sin lechuga", price: 0 }
      ]
    },
    "MECHADA BURGUER": {
      baseIngredients: ["Carne mechada 150 gr", "huevo", "tocineta", "queso", "cebolla morada o caramelizada", "tomate", "lechuga", "salsas"],
      optionalIngredients: [
        { name: "Extra queso", price: 0.50 },
        { name: "Extra tocineta", price: 1.00 },
        { name: "Sin cebolla", price: 0 },
        { name: "Sin tomate", price: 0 },
        { name: "Sin lechuga", price: 0 }
      ]
    },
    "MOMMY BURGUER": {
      baseIngredients: ["Croqueta de carne 180 gr rellena de queso amarillo y tocineta", "cebolla caramelizada", "salsa americana"],
      optionalIngredients: [
        { name: "Extra queso", price: 0.50 },
        { name: "Extra tocineta", price: 1.00 },
        { name: "Sin cebolla", price: 0 }
      ]
    },
    "CRISPY BURGER": {
      baseIngredients: ["200gr de pollo crispy", "Salsa de Pepinillos", "Queso Crema con Cebollin", "tomate", "lechuga", "salsas"],
      optionalIngredients: [
        { name: "Extra queso", price: 0.50 },
        { name: "Sin champiñones", price: 0 },
        { name: "Sin cebolla", price: 0 },
        { name: "Sin tomate", price: 0 },
        { name: "Sin lechuga", price: 0 }
      ]
    },
    "PIG BURGUER": {
      baseIngredients: ["Chuleta de cerdo ahumada 200 gr", "tocineta", "queso amarillo", "cebolla morada o caramelizada", "tomate", "lechuga", "salsas"],
      optionalIngredients: [
        { name: "Extra queso", price: 0.50 },
        { name: "Extra tocineta", price: 1.00 },
        { name: "Sin cebolla", price: 0 },
        { name: "Sin tomate", price: 0 },
        { name: "Sin lechuga", price: 0 }
      ]
    },
    "RANCHERA PICANTE": {
      baseIngredients: ["Croqueta de carne 180 gr", "salchicha kosaca", "jalapeños", "salsa agria", "queso blanco", "maíz", "cebolla morada", "tomate", "lechuga"],
      optionalIngredients: [
        { name: "Sin jalapeños", price: 0 },
        { name: "Extra queso", price: 0.50 },
        { name: "Sin cebolla", price: 0 },
        { name: "Sin tomate", price: 0 },
        { name: "Sin lechuga", price: 0 }
      ]
    },
    "SMASH BURGER": {
      baseIngredients: ["Doble o Triple de croqueta de Res (SMASH)", "Queso Amarillo", "Pepinillo", "Tocineta", "tomate", "lechuga", "salsa Americana"],
      optionalIngredients: [
        { name: "Extra queso", price: 0.50 },
        { name: "Extra tocineta", price: 1.00 },
        { name: "Sin cebolla", price: 0 },
        { name: "Sin tomate", price: 0 },
        { name: "Sin lechuga", price: 0 }
      ]
    },
    "FITNESS BURGUER": {
      baseIngredients: ["Croqueta de carne 360 gr", "tocineta", "queso", "champiñón natural", "pepinillos", "cebolla morada", "tomate", "lechuga"],
      optionalIngredients: [
        { name: "Extra queso", price: 0.50 },
        { name: "Extra tocineta", price: 1.00 },
        { name: "Sin champiñones", price: 0 },
        { name: "Sin pepinillos", price: 0 },
        { name: "Sin cebolla", price: 0 },
        { name: "Sin tomate", price: 0 },
        { name: "Sin lechuga", price: 0 }
      ]
    },
    "BYE GYM": {
      baseIngredients: ["Croqueta de carne 180 gr", "chuleta de cerdo ahumada 200 gr", "pechuga de pollo asada 150 gr", "champiñones en crema de leche", "cebolla morada o caramelizada", "tomate", "lechuga", "salsas"],
      optionalIngredients: [
        { name: "Extra queso", price: 0.50 },
        { name: "Extra tocineta", price: 1.00 },
        { name: "Sin champiñones", price: 0 },
        { name: "Sin cebolla", price: 0 },
        { name: "Sin tomate", price: 0 },
        { name: "Sin lechuga", price: 0 }
      ]
    },
    //PAPAS FRANCESAS
    "French Fries": {
      baseIngredients: ["Papas fritas"],
      optionalIngredients: [
        { name: "Con queso", price: 0.50 },
        { name: "Con tocineta", price: 1.00 }
      ]
    },
    "Onion Rings": {
      baseIngredients: ["Aros de cebolla"],
      optionalIngredients: [
        { name: "Con salsa", price: 0.50 }
      ]
    },
    "Soda": {
      baseIngredients: ["Refresco"],
      optionalIngredients: []
    },
    "Milkshake": {
      baseIngredients: ["Malteada"],
      optionalIngredients: [
        { name: "Extra topping", price: 0.50 }
      ]
    },
    "VIENA": {
      baseIngredients: ["Salchicha de carne de res"," Pan brioche", "cebolla"," maíz", "papas fritas tipo cabello de ángel", "salsas", " queso blanco o amarillo." ],
      optionalIngredients: [
        { name: "Extra queso", price: 0.50 },
        { name: "Sin Cebolla", price: 0.50 }
      ],
      eleccionSalchicha: [
        { name: "Salchicha Viena", price: 0.50 },
        { name: "Salchica Alemana", price: 0.50 },
        { name: "Salchica Chorifrito", price: 0.50 }
      ]
    },
    "CHORIFRITO": {
      baseIngredients: ["Chorizo ahumado de carne de cerdo y res"," Pan brioche", "cebolla"," maíz", "papas fritas tipo cabello de ángel", "salsas", " queso blanco o amarillo." ],
      optionalIngredients: [
        { name: "Extra queso", price: 0.50 },
        { name: "Sin Cebolla", price: 0.50 }
      ],
      eleccionSalchicha: [
        { name: "Salchicha Viena", price: 0.50 },
        { name: "Salchica Alemana", price: 0.50 },
        { name: "Salchica Chorifrito", price: 0.50 }
      ]
    },
    "ALEMANA": {
      baseIngredients: ["Salchicha de carne de cerdo, ahumada"," Pan brioche", "cebolla"," maíz", "papas fritas tipo cabello de ángel", "salsas", " queso blanco o amarillo." ],
      optionalIngredients: [
        { name: "Extra queso", price: 0.50 },
        { name: "Sin Cebolla", price: 0.50 }
      ],
      eleccionSalchicha: [
        { name: "Salchicha Viena", price: 0.50 },
        { name: "Salchica Alemana", price: 0.50 },
        { name: "Salchica Chorifrito", price: 0.50 }
      ]
    },
    "ANTIOQUEÑO": {
      baseIngredients: ["Chorizo de carne de cerdo y res, con especias naturales"," Pan brioche", "cebolla"," maíz", "papas fritas tipo cabello de ángel", "salsas", " queso blanco o amarillo." ],
      optionalIngredients: [
        { name: "Extra queso", price: 0.50 },
        { name: "Sin Cebolla", price: 0.50 }
      ],
      eleccionSalchicha: [
        { name: "Salchicha Viena", price: 0.50 },
        { name: "Salchica Alemana", price: 0.50 },
        { name: "Salchica Chorifrito", price: 0.50 }
      ]
    },
    "KOSACA": {
      baseIngredients: ["Salchicha Picante"," Pan brioche", "cebolla"," maíz", "papas fritas tipo cabello de ángel", "salsas", " queso blanco o amarillo." ],
      optionalIngredients: [
        { name: "Extra queso", price: 0.50 },
        { name: "Sin Cebolla", price: 0.50 }
      ],
      eleccionSalchicha: [
        { name: "Salchicha Viena", price: 0.50 },
        { name: "Salchica Alemana", price: 0.50 },
        { name: "Salchica Chorifrito", price: 0.50 }
      ]
    },
     "SELVA NEGRA": {
      baseIngredients: ["Chorizo jamonado"," Pan brioche", "cebolla"," maíz", "papas fritas tipo cabello de ángel", "salsas", " queso blanco o amarillo." ],
      optionalIngredients: [
        { name: "Extra queso", price: 0.50 },
        { name: "Sin Cebolla", price: 0.50 }
      ],
      eleccionSalchicha: [
        { name: "Salchicha Viena", price: 0.50 },
        { name: "Salchica Alemana", price: 0.50 },
        { name: "Salchica Chorifrito", price: 0.50 }
      ]
    },
     "POLACA": {
      baseIngredients: ["Salchicha de carne de cerdo, con hierbas frescas, especias y semillas de mostaza"," Pan brioche", "cebolla"," maíz", "papas fritas tipo cabello de ángel", "salsas", " queso blanco o amarillo." ],
      optionalIngredients: [
        { name: "Extra queso", price: 0.50 },
        { name: "Sin Cebolla", price: 0.50 }
      ],
      eleccionSalchicha: [
        { name: "Salchicha Viena", price: 0.50 },
        { name: "Salchica Alemana", price: 0.50 },
        { name: "Salchica Chorifrito", price: 0.50 }
      ]
    },
    "BAVARIA": {
      baseIngredients: ["Salchicha de carne y finas especias"," Pan brioche", "cebolla"," maíz", "papas fritas tipo cabello de ángel", "salsas", " queso blanco o amarillo." ],
      optionalIngredients: [
        { name: "Extra queso", price: 0.50 },
        { name: "Sin Cebolla", price: 0.50 }
      ],
      eleccionSalchicha: [
        { name: "Salchicha Viena", price: 0.50 },
        { name: "Salchica Alemana", price: 0.50 },
        { name: "Salchica Chorifrito", price: 0.50 }
      ]
    },
    "FATNESS": {
      baseIngredients: [" salchicha polacas", "chorifrito", "huevo" ," Pan brioche", "cebolla"," maíz", "papas fritas tipo cabello de ángel", "salsas", " queso blanco o amarillo." ],
      optionalIngredients: [
        { name: "Extra queso", price: 0.50 },
        { name: "Sin Cebolla", price: 0.50 }
      ],
      eleccionSalchicha: [
        { name: "Salchicha Viena", price: 0.50 },
        { name: "Salchica Alemana", price: 0.50 },
        { name: "Salchica Chorifrito", price: 0.50 }
      ]
    }
  }
};
