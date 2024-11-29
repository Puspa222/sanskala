import React from "react";

const musicForms = [
  {
    title: "Classical Nepali Music",
    content: [
      "Rooted in ancient Hindu and Buddhist traditions.",
      "Incorporates ragas and spiritual themes.",
      "Prominent instruments include sitar, sarangi, and tabla.",
    ],
  },
  {
    title: "Folk Music",
    content: [
      "Represents the diverse cultures and traditions of Nepal.",
      "Popular forms include Dohori, Tamang Selo, and Bhajan.",
      "Often accompanied by traditional instruments like madal and bansuri.",
    ],
  },
  {
    title: "Dohori Songs",
    content: [
      "A conversational style of singing between male and female groups.",
      "Popular in rural Nepal and often performed during festivals.",
      "Focuses on themes of love, humor, and daily life.",
    ],
  },
  {
    title: "Tamang Selo",
    content: [
      "A lively music genre popular among the Tamang community.",
      "Accompanied by the traditional Damphu drum.",
      "Features themes of love, sorrow, and social commentary.",
    ],
  },
  {
    title: "Modern Nepali Music",
    content: [
      "Blends traditional elements with contemporary styles.",
      "Genres include pop, rock, and hip-hop.",
      "Prominent artists include Narayan Gopal, 1974 AD, and Bipul Chettri.",
    ],
  },
  {
    title: "Instrumental Music",
    content: [
      "Focuses on the use of traditional instruments like sarangi, sitar, and madal.",
      "Often played during meditative and cultural events.",
      "Highlights the skill and artistry of Nepali musicians.",
    ],
  },
  {
    title: "Religious Music",
    content: [
      "Features devotional songs like Bhajan and Mantra chanting.",
      "Played during Hindu and Buddhist ceremonies.",
      "Instruments like harmonium, cymbals, and conch shell are used.",
    ],
  },
  {
    title: "Fusion Music",
    content: [
      "Combines Nepali traditional music with global genres.",
      "Creates a unique sound that appeals to younger audiences.",
      "Popular in urban areas and international music festivals.",
    ],
  },
];
const Music = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 text-gray-800 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-10 text-blue-600 drop-shadow-md">
          Nepali Music Forms
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {musicForms.map((music, index) => (
            <div
              key={index}
              className="bg-white border-2 border-gradient-to-r from-blue-500 to-blue-300 rounded-lg shadow-lg hover:shadow-2xl p-4 transition-all duration-300"
            >
              <h2 className="text-lg font-bold mb-3 text-blue-600">
                {music.title}
              </h2>
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
                {music.content.map((item, i) => (
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

export default Music;
