export const products = [
    {
        id: 'nocal' , 
        name: 'Caneca/Copo Personalizado - Nocal', 
        occasions: ['Casamento', 'Aniversário', 'Pessoal'],
        image: 'images/cerveja.jpeg' 
    },

    {
        id: 'booster',
        name: 'Caneca/Copo Personalizado - Booster',
        occasions: ['Casamento', 'Aniversário', 'Pessoal'],
        flavors: [
            { id: 'normal', label: 'Normal' },
            { id: 'morango', label: 'Morango'}
    ],
        image: 'images/cuca.jpeg'
    },

    {
        id: 'cuca',
        name: 'Caneca/Copo Personalizada - Cuca',
        occasions: ['Casamento', 'Aniversário', 'Pessoal'],
        image: 'images/cuca.jpeg'
    },

    {
        id: 'redbull', 
        name: 'Caneca/Copo - Red Bull', 
        occasions: ['Casamento', 'Aniversário', 'Pessoal'],
        image: 'images/cerveja.jpeg' 
    },

]

export const occasions = ['Todos', 'Casamento', 'Aniversário', 'Pessoal'];

export const types = ['Todos', 'Caneca', 'Copo'];

export const sizes = [

        { id: 'grande', label: 'Grande', price: 5000 },
        { id: 'pequena-2-bordas', label: 'Pequena (2 bordas)', price: 2500 },
        { id: 'pequena-1-borda', label: 'Pequena (1 borda)', price: 2000 }
    ]

export const teams = [
  'Barcelona',
  'Real Madrid',
  'Manchester United',
  'PSG',
  'Petro de Luanda',
  '1º de Agosto',
  'Outra (Especifique)'
];

