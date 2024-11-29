import React from "react";

const arts = [
  {
    title: "Thangka Painting",
    content: [
      "A traditional Tibetan Buddhist painting on cotton or silk.",
      "Known for intricate details and vibrant colors.",
      "Depicts Buddhist deities, mandalas, and spiritual teachings.",
    ],
  },
  {
    title: "Mithila Art",
    content: [
      "Originating from the Mithila region, known for wall and floor art.",
      "Features bright colors, geometric patterns, and cultural motifs.",
      "Often portrays Hindu deities and social themes.",
    ],
  },
  {
    title: "Paubha Painting",
    content: [
      "A sacred art form practiced by the Newar community.",
      "Similar to Thangka but with a distinctive Newar style.",
      "Depicts religious stories, mandalas, and spiritual elements.",
    ],
  },
  {
    title: "Wood Carving",
    content: [
      "An ancient craft seen in temples and historical monuments.",
      "Known for intricate designs and cultural motifs.",
      "Popular examples include the windows and doors of Kathmandu Valley.",
    ],
  },
  {
    title: "Stone Sculpture",
    content: [
      "Art of carving stones into statues of gods, goddesses, and historical figures.",
      "Commonly seen in temples and heritage sites.",
      "Highlights Nepali craftsmanship and cultural devotion.",
    ],
  },
  {
    title: "Metal Craft",
    content: [
      "Includes making statues, utensils, and decorative items.",
      "Uses metals like bronze, copper, and silver.",
      "Often involves repoussé and casting techniques.",
    ],
  },
  {
    title: "Pottery",
    content: [
      "A traditional craft practiced in places like Bhaktapur and Thimi.",
      "Produces clay pots, decorative items, and kitchenware.",
      "Represents the cultural heritage of Nepal.",
    ],
  },
  {
    title: "Mask Making",
    content: [
      "Involves crafting masks for traditional dances and rituals.",
      "Masks depict deities, demons, and mythical characters.",
      "Reflects cultural beliefs and artistic creativity.",
    ],
  },
];

const Arts = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 to-pink-100 text-gray-800 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-10 text-red-600 drop-shadow-md">
          Nepali Art Forms
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {arts.map((art, index) => (
            <div
              key={index}
              className="bg-white border-2 border-gradient-to-r from-red-500 to-red-300 rounded-lg shadow-lg hover:shadow-2xl p-4 transition-all duration-300"
            >
              <h2 className="text-lg font-bold mb-3 text-red-600">
                {art.title}
              </h2>
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
                {art.content.map((item, i) => (
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

export default Arts;
