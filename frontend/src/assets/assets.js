import p_img1_1 from './img_1_1.webp'
import p_img1_2 from './img_1_2.webp'

export const products = [
    {
        _id: "aaaab",
        name: "Sky Blue Full Rim Round",
        price: 2000,
        discounted_price: 1500,
        image: [p_img1_1, p_img1_2],
        category: "Men",
        subCategory: "Round",
        sizes: ["small", "medium", "large"],
        frameWidth: "136 mm",
        frameDimensions: "51-19-145",
        frameColour: "Sky Blue",
        brand: "Fossil",
        rating: 4.7,
        reviews: 309,
        review_data: [
            {
                title: "Cool",
                desc: "Cool One",
                name: "Bhumika c",
                date: "Jan 14 2025",
            },
            {
                title: "Excellent",
                desc: "Quality is Superb",
                name: "Heena D",
                date: "Jan 17 2025",
            },
            {
                title: "Best quality",
                desc: "it's Good looking and comfortable",
                name: "Nirupama N",
                date: "Dec 24 2024",
            },
        ]
    }
]