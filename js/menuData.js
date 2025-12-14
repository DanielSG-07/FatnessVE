// Menu data with ingredients for each item
const menuData = {
  items: {
    //Entradas
    "Tequeños": {
      baseIngredients: ["3 Unidades de Tequeños", "Salsa Bic Mac"],
      delivery: ["eat-in"]
    },
    "Brownie":{
      baseIngredients: ["Brownie","Helado"],
      delivery: ["eat-in"]
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
    //BEBIDAS
    "Merengadas": {
      baseIngredients: ["Malteada a base de leche, Frutas"],
      optionalIngredients: [
        { name: "Extra topping", price: 0.50 },
        { name: "Agrandar Bebida", price: 0.50}
      ],
      eleccionSabor: [
        { name: "Fresa"},
        { name: "Piña",},
        { name: "Mango"},
        { name: "Parchita"},
        { name: "Mora"}
      ],
      delivery: ["eat-in"]
    },
     "Bebidas Naturales": {
      baseIngredients: ["Malteada a base de Agua, Frutas"],
      optionalIngredients: [
        { name: "Agrandar Bebida", price: 0.50 }
      ],
      eleccionSabor: [
        { name: "Fresa"},
        { name: "Piña",},
        { name: "Mango"},
        { name: "Parchita"},
        { name: "Limonada"},
        { name: "Mora"}
      ],
      delivery: ["eat-in"]
    },
    "Frappe": {
      baseIngredients: ["Malteada a base de Agua, Frutas"],
      optionalIngredients: [
        { name: "Agrandar Bebida", price: 0.50 }
      ],
      eleccionSabor: [
        { name: "Fresa"},
        { name: "Piña",},
        { name: "Mango"},
        { name: "Parchita"},
        { name: "Mora"}
      ],
      delivery: ["eat-in"]
    },
    
     "Refresco": {
      baseIngredients: ["Refresco a Eleccion de Presentacion"],
      optionalIngredients: [],
      eleccionMarca: [
        { name: "Coca-cola" },
        { name: "Pepsi" },
        { name: "Chinotto"},
        { name: "Seven-Up"},
        { name: "Frescolita"}
      ],
      eleccionPresentacion: [
        { name: "450ml", price: 0 },
        { name: "1Lt", price: 0.50 },
        { name: "1.5Lts", price: 1.00 },
        { name: "2Lts", price: 1.50 }
      ]
    },
    "Toddy": {
      baseIngredients: ["Bebida Chocolatada Toddy","Base de leche Completa"],
      optionalIngredients: [
        { name: "Agrandar Bebida", price: 0.50 }
      ],
      delivery: ["eat-in"]
    },
     "Vodka Breeze Ice": {
      baseIngredients: ["Bebida de Vodka Sabor Guarana","Presentacion de 0.27lts"],
      delivery: ["eat-in", "pickup", "delivery"]
    },
     "Cerveza": {
      baseIngredients: ["Vaso de Cerveza Fria","Hielo"],
      eleccionMarca: [
        { name : "Polar", price: 0 },
        { name : "Zulia", price: 0 },
        { name : "Solera", price: 0 }
      ],
      optionalIngredients: [
        { name: "Agrandar Bebida", price: 0.50 }
      ],
      delivery: ["eat-in"]
    },
     "Nestea": {
      baseIngredients: ["Vaso de Nestea"],
      eleccionSabor:[
        {name: "Sabor Original"},
        {name: "Con Frutas"}
      ],
        optionalIngredients: [
        { name: "Agrandar Bebida", price: 0.50 }
      ],
      delivery: ["eat-in"]
    },
    "Limonada de Coco": {
      baseIngredients: ["Limonada","Agua de Coco"],
        optionalIngredients: [
        { name: "Agrandar Bebida", price: 0.50 }
      ],
      delivery: ["eat-in"]
    },
    //Cocteles
    "Gin Tonic Frutos Rojos": {
      baseIngredients: ["Ginebra","Soda","Limon","Frutos Rojos","Hielo"],
      delivery: ["eat-in"]
    },
    "Mojito Clasico o Kiwi": {
      baseIngredients: ["Ron Blanco","Azucar","Limon","Chinotto","Hielo","Hierba Buena o Kiwi"],
      eleccionSabor: [
        {name: "Hierba Buena"},
        {name: "Kiwi"}
      ],
      delivery: ["eat-in"]
    },
    "Daiquirí Mango o Fresa": {
      baseIngredients: ["Ron Blanco","Azucar","Limon","Chinotto","Hielo","Mango o Fresa"],
      eleccionSabor: [
        {name: "Mango"},
        {name: "Fresa"}
      ],
      delivery: ["eat-in"]
    },
    "Piña Colada": {
      baseIngredients: ["Ron Blanco","Hielo","Piña","Licor de Coco","Crema de Coco","Leche Condensada"],
      delivery: ["eat-in"]
    },
    "Blue Margarita": {
      baseIngredients: ["Tequila","Blue Curacao","Triple Sec","Hielo","limon","Azucar"],
      delivery: ["eat-in"]
    },
    "Sangria con Frutas": {
      baseIngredients: ["Sangria","Trozos de Fresa","Trozos de Piña","Trozos de Mango","Trozos de Manzana"],
      delivery: ["eat-in"]
    },
    "Polvo de Medianoche": {
      baseIngredients: ["Licor de Café","Tequila","Hielo","Vodka","Canela"],
      delivery: ["eat-in"]
    },
    "Chelada Maracuya": {
      baseIngredients: ["Cerveza","Hielo","Limon","Parchita","Sal"],
      delivery: ["eat-in"]
    },
    "Cuba Libre": {
      baseIngredients: ["Ron Dorado","Hielo","Refresco de Cola","Limon"],
      delivery: ["eat-in"]
    },
    "Sneyk Pen": {
      baseIngredients: ["Whisky","Licor de Café","Hielo","Crema de Coco o Crema de Leche"],
        eleccionSabor: [
          { name: "Crema de Coco"},
          { name: "Crema de Leche"}
        ],
      delivery: ["eat-in"]
    },
    "Delta Sunset": {
      baseIngredients: ["Sambuca","Triple Sec","Hielo","Limon"],
      delivery: ["eat-in"]
    },
    //SHOTS
    "TEQUILA":{
      baseIngredients: ["Tequila","Limon","Sal"],
      delivery: ["eat-in"]
    },
    "SUBMARINO":{
      baseIngredients: ["Tequila","Cerveza"],
      delivery: ["eat-in"]
    },
    "LAYERS":{
      baseIngredients: ["Tequila","Blue Curacao","Granadina"],
      delivery: ["eat-in"]
    },
    //PERROS CALIENTES
    "VIENA": {
      baseIngredients: ["Salchicha de carne de res"," Pan brioche", "cebolla"," maíz", "papas fritas tipo cabello de ángel", "salsas" ],
      eleccionQueso: [
        { name: "Queso Amarillo", price: 0 },
        { name: "Queso Blanco", price: 0 },
        { name: "Queso Cheddar Fundido", price: 0.50 }
      ],
      optionalIngredients: [
        { name: "Extra queso", price: 0.50 },
        { name: "Sin Cebolla", price: 0.50 }
      ]
    },
    "CHORIFRITO": {
      baseIngredients: ["Chorizo ahumado de carne de cerdo y res"," Pan brioche", "cebolla"," maíz", "papas fritas tipo cabello de ángel", "salsas" ],
      eleccionQueso: [
        { name: "Queso Amarillo", price: 0 },
        { name: "Queso Blanco", price: 0 },
        { name: "Queso Cheddar Fundido", price: 0.50 }
      ],
      optionalIngredients: [
        { name: "Extra queso", price: 0.50 },
        { name: "Sin Cebolla", price: 0.50 }
      ]
    },
    "ALEMANA": {
      baseIngredients: ["Salchicha de carne de cerdo, ahumada"," Pan brioche", "cebolla"," maíz", "papas fritas tipo cabello de ángel", "salsas" ],
      eleccionQueso: [
        { name: "Queso Amarillo", price: 0 },
        { name: "Queso Blanco", price: 0 },
        { name: "Queso Cheddar Fundido", price: 0.50 }
      ],
      optionalIngredients: [
        { name: "Extra queso", price: 0.50 },
        { name: "Sin Cebolla", price: 0.50 }
      ]
    },
    "ANTIOQUEÑO": {
      baseIngredients: ["Chorizo de carne de cerdo y res, con especias naturales"," Pan brioche", "cebolla"," maíz", "papas fritas tipo cabello de ángel", "salsas" ],
      eleccionQueso: [
        { name: "Queso Amarillo", price: 0 },
        { name: "Queso Blanco", price: 0 },
        { name: "Queso Cheddar Fundido", price: 0.50 }
      ],
      optionalIngredients: [
        { name: "Extra queso", price: 0.50 },
        { name: "Sin Cebolla", price: 0.50 }
      ]
    },
    "KOSACA": {
      baseIngredients: ["Salchicha Picante"," Pan brioche", "cebolla"," maíz", "papas fritas tipo cabello de ángel", "salsas" ],
      eleccionQueso: [
        { name: "Queso Amarillo", price: 0 },
        { name: "Queso Blanco", price: 0 },
        { name: "Queso Cheddar Fundido", price: 0.50 }
      ],
      optionalIngredients: [
        { name: "Extra queso", price: 0.50 },
        { name: "Sin Cebolla", price: 0.50 }
      ]
    },
     "SELVA NEGRA": {
      baseIngredients: ["Chorizo jamonado"," Pan brioche", "cebolla"," maíz", "papas fritas tipo cabello de ángel", "salsas" ],
      eleccionQueso: [
        { name: "Queso Amarillo", price: 0 },
        { name: "Queso Blanco", price: 0 },
        { name: "Queso Cheddar Fundido", price: 0.50 }
      ],
      optionalIngredients: [
        { name: "Extra queso", price: 0.50 },
        { name: "Sin Cebolla", price: 0.50 }
      ]
    },
     "POLACA": {
      baseIngredients: ["Salchicha de carne de cerdo, con hierbas frescas, especias y semillas de mostaza"," Pan brioche", "cebolla"," maíz", "papas fritas tipo cabello de ángel", "salsas" ],
      eleccionQueso: [
        { name: "Queso Amarillo", price: 0 },
        { name: "Queso Blanco", price: 0 },
        { name: "Queso Cheddar Fundido", price: 0.50 }
      ],
      optionalIngredients: [
        { name: "Extra queso", price: 0.50 },
        { name: "Sin Cebolla", price: 0.50 }
      ]
    },
    "BAVARIA": {
      baseIngredients: ["Salchicha de carne y finas especias"," Pan brioche", "cebolla"," maíz", "papas fritas tipo cabello de ángel", "salsas" ],
      eleccionQueso: [
        { name: "Queso Amarillo", price: 0 },
        { name: "Queso Blanco", price: 0 },
        { name: "Queso Cheddar Fundido", price: 0.50 }
      ],
      optionalIngredients: [
        { name: "Extra queso", price: 0.50 },
        { name: "Sin Cebolla", price: 0.50 }
      ]
    },
    "FATNESS": {
      baseIngredients: [" salchicha polacas", "chorifrito", "huevo" ," Pan brioche", "cebolla"," maíz", "papas fritas tipo cabello de ángel", "salsas" ],
      eleccionQueso: [
        { name: "Queso Amarillo", price: 0 },
        { name: "Queso Blanco", price: 0 },
        { name: "Queso Cheddar Fundido", price: 0.50 }
      ],
      optionalIngredients: [
        { name: "Extra queso", price: 0.50 },
        { name: "Sin Cebolla", price: 0.50 }
      ]
    },
    //MENU KIDS
    "MINI HOT DOGS": {
      baseIngredients: ["Pan","Salchicha a Eleccion de Presentacion","Vegetales","Salsas","Papas Fritas"],
      eleccionPresentacion: [
        {name: "Viena"},
        {name: "Alemana"},
        {name: "ChoriFrito"},
        {name: "Kosaca"},
        {name: "Antioqueño"},
        {name: "Selva Negra"},
        {name: "Polaca"}
      ],
      optionalIngredients: [
        { name: "Extra queso", price: 0.50 },
        { name: "Sin Cebolla", price: 0.50 }
      ]
    },
    "MINI BURGERS":{
      baseIngredients: ["Carnes Segun Presentacion", "queso amarillo", "cebolla Morada", "tomate", "lechuga", "salsas","Pan Wooper"],
      eleccionPresentacion: [
        {name: "Cheese Burger"},
        {name: "Pig Burger"},
        {name: "Chicken Burger"}
      ],
       optionalIngredients: [
        { name: "Extra queso", price: 0.50 },
        { name: "Cebolla Caramelizada", price: 0.50 },
        { name: "Sin Cebolla" },
        { name: "Sin Tomate" },
        { name: "Sin Lechuga" }
      ]
    },
    "TENDERS DE POLLO": {
      baseIngredients: ["Pechuga de Pollo Empanizado","Papas a la francesa"]
    },
    //PAPAS A LA FRANCESA
    "CLÁSICAS":{
      baseIngredients: ["160gr de Papas Fritas"]
    },
    "CHEDDAR":{
      baseIngredients: ["160gr de Papas Fritas","Queso Cheddar Fundido"]
    },
    "SALCHICHA":{
      baseIngredients: ["160gr de Papas Fritas","Trozos de Salchicha a Eleccion"],
      eleccionSalchicha: [
        {name: "Viena"},
        {name : "Alemana"},
        {name: "Chorifrito"}
      ]
    },
    "SALCHICHA Y CHEDDAR":{
      baseIngredients: ["160gr de Papas Fritas","Trozos de Salchicha a Eleccion", "Queso Cheddar Fundido"],
      eleccionSalchicha: [
        {name: "Viena"},
        {name : "Alemana"},
        {name: "Chorifrito"}
      ]
    },
    "GRINGAS":{
      baseIngredients: ["160gr de Papas Fritas","Queso Cheddar Fundido","Tocineta","Maiz"]
    },
    "POLLO Y CHEDDAR": {
      baseIngredients: ["160gr de Papas Fritas","Trozos de Pechuga Asada","Queso Cheddar Fundido"]
    },
    "FATNESS (3-4 PERSONAS)": {
      baseIngredients: ["160gr de Papas Fritas","180gr de Carne de Res Segun presentacion","200gr de Chuleta Ahumada","200gr de Pechuga",
        "Salchicha a Eleccion","Queso Cheddar","Maiz","Tocineta"],
       eleccionPresentacion: [
        {name: "Carne en Croqueta"},
        {name: "Carne Mechada"}
       ],
       eleccionSalchicha: [
        {name: "Polaca"},
        {name: "Chorizo"},
        {name: "Antioqueño"}
       ]

      },
      "½ FATNESS (1-2 PERSONAS)": {
      baseIngredients: ["80gr de Papas Fritas","90gr de Carne de Res Segun presentacion","100gr de Chuleta Ahumada","100gr de Pechuga",
        "Salchicha a Eleccion","Queso Cheddar","Maiz","Tocineta"],
       eleccionPresentacion: [
        {name: "Carne en Croqueta"},
        {name: "Carne Mechada"}
       ],
       eleccionSalchicha: [
        {name: "Polaca"},
        {name: "Chorizo"},
        {name: "Antioqueño"}
       ]

      }
  }
};