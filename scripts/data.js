export const products = [
    {
        id: 'nocal' , 
        name: 'Nocal', 
        occasions: ['Casamento', 'Aniversário', 'Pessoal'],
        image: 'images/cerveja.jpeg' 
    },

    {
        id: 'booster',
        name: 'Booster',
        occasions: ['Casamento', 'Aniversário', 'Pessoal'],
        flavors: [
            { id: 'normal', label: 'Normal' },
            { id: 'morango', label: 'Morango'}
    ],
        image: 'images/cuca.jpeg'
    },

    {
        id: 'cuca',
        name: 'Cuca',
        occasions: ['Casamento', 'Aniversário', 'Pessoal'],
        image: 'images/cuca.jpeg'
    },

    {
        id: 'redbull', 
        name: 'Red Bull', 
        occasions: ['Casamento', 'Aniversário', 'Pessoal'],
        image: 'images/cerveja.jpeg' 
    },

]

export const occasions = ['Todos', 'Casamento', 'Aniversário', 'Pessoal'];

export const types = ['Caneca' , 'Copo' , 'Ambos' ];


export const teams = [
  'Barcelona',
  'Real Madrid',
  'Manchester United',
  'PSG',
  'Petro de Luanda',
  '1º de Agosto',
  'Outra (Especifique)'
];

//Lista de tamanhos simplificada (apenas para alimentar os <select>);
export const sizes = [
    {id: 'pequena' , label: 'Pequena'},
    {id: 'grande' , label: 'Grande'}
]

//Preços para o Modo Normal (baseado apenas no tamanho);
export const normalPrices =  {
    'pequena': 2000,
    'grande': 4000
}

//Preços para o Modo Personalizado (baseado em tamanho-tipo);
export const personalizedPrices = {
    'pequena-caneca': 3000,
    'pequena-copo': 2500,
    'grande-caneca': 5000,
    'grande-copo': 4500
}


