import React from "react";

const celebrations = [
  {
    title: "Dashain",
    content: [
      "The biggest Hindu festival in Nepal, celebrated for 15 days.",
      "Represents the victory of good over evil and the goddess Durga.",
      "Involves family gatherings, feasts, and the exchange of blessings.",
    ],
  },
  {
    title: "Tihar",
    content: [
      "Also known as Deepawali, celebrated over five days.",
      "Honors animals like crows, dogs, and cows, and the goddess Laxmi.",
      "Involves lighting oil lamps, decorating homes, and festive songs.",
    ],
  },
  {
    title: "Indra Jatra",
    content: [
      "A Newar festival celebrated in the Kathmandu Valley.",
      "Commemorates the harvest and honors the god Indra.",
      "Features processions, dances, and the raising of the lingo (pole).",
    ],
  },
  {
    title: "Maghe Sankranti",
    content: [
      "A major festival marking the winter solstice.",
      "Celebrated with family gatherings and traditional foods.",
      "Represents the beginning of longer days and the sun's journey northward.",
    ],
  },
  {
    title: "Biska Jatra",
    content: [
      "A traditional Newar festival celebrated in Bhaktapur.",
      "Includes chariot processions, wrestling matches, and feasting.",
      "Marks the Nepali New Year and honors the goddess Bhadrakali.",
    ],
  },
  {
    title: "Holi",
    content: [
      "The festival of colors celebrated by Hindus in Nepal.",
      "Represents the arrival of spring and the victory of good over evil.",
      "Involves throwing colored powders, dancing, and singing.",
    ],
  },
  {
    title: "Shree Panchami",
    content: [
      "A festival dedicated to the goddess of knowledge, Saraswati.",
      "Celebrated by students, artists, and scholars.",
      "Involves worshiping books, musical instruments, and art supplies.",
    ],
  },
  {
    title: "Losar",
    content: [
      "The Tibetan New Year celebrated by the Tamang and Sherpa communities.",
      "Involves feasting, traditional dances, and cultural performances.",
      "Signifies the arrival of spring and the start of a new year.",
    ],
  },
];

const Celebrations = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 text-gray-800 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-10 text-purple-600 drop-shadow-md">
          Nepali Celebrations
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {celebrations.map((celebration, index) => (
            <div
              key={index}
              className="bg-white border-2 border-gradient-to-r from-purple-500 to-pink-300 rounded-lg shadow-lg hover:shadow-2xl p-4 transition-all duration-300"
            >
              <h2 className="text-lg font-bold mb-3 text-purple-600">
                {celebration.title}
              </h2>
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
                {celebration.content.map((item, i) => (
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

export default Celebrations;
