import React from "react";

const handmadeProducts = [
  {
    title: "Pashmina Shawls",
    content: [
      "Made from the fine wool of Himalayan goats.",
      "Renowned for their softness, warmth, and quality.",
      "Available in a variety of colors and patterns.",
    ],
  },
  {
    title: "Thangka Paintings",
    content: [
      "Traditional Buddhist paintings on cotton or silk.",
      "Depict deities, mandalas, and spiritual symbols.",
      "Created by skilled artisans with intricate details.",
    ],
  },
  {
    title: "Dhaka Fabric",
    content: [
      "A handwoven fabric originating from the eastern hills of Nepal.",
      "Used to make traditional attire like 'Dhaka Topi' and sarees.",
      "Features unique geometric patterns.",
    ],
  },
  {
    title: "Lokta Paper",
    content: [
      "Eco-friendly handmade paper from the bark of Lokta trees.",
      "Used for journals, lampshades, and gift wrapping.",
      "Durable and naturally resistant to insects.",
    ],
  },
  {
    title: "Handmade Jewelry",
    content: [
      "Features traditional designs with silver, turquoise, and coral.",
      "Includes necklaces, bracelets, and earrings.",
      "Reflects Nepal's rich cultural heritage.",
    ],
  },
  {
    title: "Wooden Carvings",
    content: [
      "Traditional carvings used in temples and home decor.",
      "Crafted from hardwood with intricate designs.",
      "Depicts cultural and religious motifs.",
    ],
  },
  {
    title: "Woolen Products",
    content: [
      "Includes sweaters, scarves, and hats made from sheep wool.",
      "Hand-knitted by local artisans.",
      "Known for their warmth and vibrant colors.",
    ],
  },
  {
    title: "Pottery",
    content: [
      "Traditional earthenware made in Bhaktapur and other regions.",
      "Includes pots, bowls, and decorative items.",
      "Crafted using ancient techniques and baked in kilns.",
    ],
  },
];

const Products = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-teal-100 text-gray-800 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-10 text-green-600 drop-shadow-md">
          Nepali Handmade Products
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {handmadeProducts.map((product, index) => (
            <div
              key={index}
              className="bg-white border-2 border-gradient-to-r from-green-500 to-green-300 rounded-lg shadow-lg hover:shadow-2xl p-4 transition-all duration-300"
            >
              <h2 className="text-lg font-bold mb-3 text-green-600">
                {product.title}
              </h2>
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
                {product.content.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
