import imgs from './cultive_imgs'

const cultives = [
    {
        id: "alface",
        name: {br: "Alface", en: "Lettuce" },
        group: 1
    },
    {
        id: "tomate",
        name: {br: "Tomate", en: "Tomato" },
        group: 2
    },
    {
        id: "uva",
        name: {br: "Uva", en: "Grape" },
        group: 2
    },
    {
        id: "pimentao",
        name: {br: "Pimentão", en: "Bell pepper" },
        group: 2
    },
    {
        id: "pessego",
        name: {br: "Pêssego", en: "Peach" },
        group: 2
    },
    {
        id: "mamao",
        name: {br: "Mamão", en: "Papaya" },
        group: 2
    },
    {
        id: "citros",
        name: {br: "Citros", en: "Citrus fruits" },
        group: 2
    },
    {
        id: "feijao",
        name: {br: "Feijão", en: "Beans" },
        group: 3
    },
    {
        id: "couve",
        name: {br: "Couve", en: "Kale" },
        group: 1
    },
    {
        id: "maca",
        name: {br: "Maçã", en: "Apple" },
        group: 2
    },
    {
        id: "brocolis",
        name: {br: "Brócolis", en: "Broccoli" },
        group: 1
    },
    {
        id: "banana",
        name: {br: "Banana", en: "Banana" },
        group: 2
    },
    {
        id: "pera",
        name: {br: "Pêra", en: "Pears" },
        group: 2
    },
    {
        id: "pepino",
        name: {br: "Pepino", en: "Cucumber" },
        group: 1
    },
    {
        id: "melancia",
        name: {br: "Melancia", en: "Watermelon" },
        group: 2
    },
    {
        id: "arroz",
        name: {br: "Arroz", en: "Rice" },
        group: 3
    },
    {
        id: "repolho",
        name: {br: "Repolho", en: "Head cabbage" },
        group: 1
    },
    {
        id: "berinjela",
        name: {br: "Berinjela", en: "Eggplant" },
        group: 1
    },
    {
        id: "ervilha",
        name: {br: "Ervilha", en: "Peas" },
        group: 3
    },
    {
        id: "batata",
        name: {br: "Batata", en: "Potato" },
        group: 1
    },
    {
        id: "cebola",
        name: {br: "Cebola", en: "Onion" },
        group: 1
    },
    {
        id: "figo",
        name: {br: "Figo", en: "Figs" },
        group: 2
    },
    {
        id: "cafe",
        name: {br: "Café", en: "Coffee beans" },
        group: 4
    },
    {
        id: "melao",
        name: {br: "Melão", en: "Melon" },
        group: 2
    },
    {
        id: "manga",
        name: {br: "Manga", en: "Mango" },
        group: 2
    },
    {
        id: "canadeacucar",
        name: {br: "Cana de açúcar", en: "Sugar canes" },
        group: 1
    },
    {
        id: "couveflor",
        name: {br: "Couve flor", en: "Cauliflower" },
        group: 1
    },
    {
        id: "milho",
        name: {br: "Milho", en: "Maize" },
        group: 3
    },
    {
        id: "maracuja",
        name: {br: "Maracujá", en: "Passionfruit" },
        group: 2
    },
    {
        id: "alho",
        name: {br: "Alho", en: "Garlic" },
        group: 1
    },
    {
        id: "abobora",
        name: {br: "Abóbora", en: "Pumpkin" },
        group: 1
    },
    {
        id: "abacate",
        name: {br: "Abacate", en: "Avocado" },
        group: 2
    },
    {
        id: "morango",
        name: {br: "Morango", en: "Strawberry" },
        group: 2
    },
    {
        id: "cenoura",
        name: {br: "Cenoura", en: "Carrot" },
        group: 1
    },
    {
        id: "couvedebruxelas",
        name: {br: "Couve de bruxelas", en: "Brussels sprouts" },
        group: 1
    },
    {
        id: "amendoim",
        name: {br: "Amendoim", en: "Peanuts" },
        group: 4
    },
    {
        id: "beterraba",
        name: {br: "Beterraba", en: "Beetroot" },
        group: 1
    },
    {
        id: "goiaba",
        name: {br: "Goiaba", en: "Guava" },
        group: 2
    },
    {
        id: "cacau",
        name: {br: "Cacau", en: "Cocoa beans" },
        group: 4
    },
    {
        id: "abobrinha",
        name: {br: "Abobrinha", en: "Courgettes" },
        group: 1
    },
    {
        id: "inhame",
        name: {br: "Inhame", en: "Yam" },
        group: 1
    },
    {
        id: "batatadoce",
        name: {br: "Batata doce", en: "Sweet potato" },
        group: 1
    },
    {
        id: "mandioca",
        name: {br: "Mandioca", en: "Cassava root" },
        group: 1
    },
    {
        id: "nabo",
        name: {br: "Nabo", en: "Turnip" },
        group: 1
    },
    {
        id: "rabanete",
        name: {br: "Rabanete", en: "Radish" },
        group: 1
    },
    {
        id: "ameixa",
        name: {br: "Ameixa", en: "Pum" },
        group: 2
    },
    {
        id: "nespera",
        name: {br: "Nêspera", en: "Loquat" },
        group: 2
    },
    {
        id: "caqui",
        name: {br: "Caqui", en: "Kaki" },
        group: 2
    },
    {
        id: "carambola",
        name: {br: "Carambola", en: "Starfruit" },
        group: 2
    },
    {
        id: "abacaxi",
        name: {br: "Abacaxi", en: "Pineapple" },
        group: 2
    },
    {
        id: "castanhadopara",
        name: {br: "Castanha do Pará", en: "Brazil nuts" },
        group: 4
    },
    {
        id: "macadamia",
        name: {br: "Macadâmia", en: "Macadamia" },
        group: 2
    },
    {
        id: "pinhao",
        name: {br: "Pinhão", en: "Pine nut kernels" },
        group: 4
    },
    {
        id: "kiwi",
        name: {br: "Kiwi", en: "Kiwi fruit" },
        group: 2
    },
    {
        id: "coco",
        name: {br: "Côco", en: "Coconut" },
        group: 2
    },
    {
        id: "roma",
        name: {br: "Romã", en: "Granate apple" },
        group: 2
    },
    {
        id: "dende",
        name: {br: "Dendê", en: "Palm oil" },
        group: 4
    },
    {
        id: "lentilha",
        name: {br: "Lentilha", en: "Lentils" },
        group: 3
    },
    {
        id: "centeio",
        name: {br: "Centeio", en: "Rye" },
        group: 3
    },
    {
        id: "trigo",
        name: {br: "Trigo", en: "Wheat" },
        group: 3
    },
    {
        id: "soja",
        name: {br: "Soja", en: "Soyabeans" },
        group: 3
    },
    {
        id: "cevada",
        name: {br: "Cevada", en: "Barley" },
        group: 3
    },
    {
        id: "aveia",
        name: {br: "Aveia", en: "Oat" },
        group: 3
    },
    {
        id: "sorgo",
        name: {br: "Sorgo", en: "Sorghum" },
        group: 3
    },
].map(d => ({...d, img: imgs[d.id]}))


export default cultives