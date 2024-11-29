import React from "react";

const dances = [
  {
    title: "Charya Dance",
    content: [
      "A classical dance form rooted in Buddhist traditions.",
      "Performed by priests to express meditation and spiritual stories.",
      "Features intricate costumes and symbolic hand gestures.",
    ],
  },
  {
    title: "Lakhey Dance",
    content: [
      "A traditional dance performed during the Indra Jatra festival.",
      "Known for its energetic movements and the use of a demon mask.",
      "Symbolizes the protector of children and a guardian against evil spirits.",
    ],
  },
  {
    title: "Ghatu Dance",
    content: [
      "Performed by the Gurung community, especially during the Baisakh Purnima festival.",
      "Dancers enact stories of mythical heroes and romantic tales.",
      "Features traditional costumes and slow, graceful movements.",
    ],
  },
  {
    title: "Dhan Nach",
    content: [
      "A cultural dance of the Limbu community, performed during celebrations.",
      "Highlights the harvesting process and communal harmony.",
      "Dancers form circles and sway to traditional music and beats.",
    ],
  },
  {
    title: "Deuda Dance",
    content: [
      "Popular in the mid-western and far-western regions of Nepal.",
      "Dancers hold hands and sing Deuda songs while stepping in rhythmic patterns.",
      "Often performed to celebrate festivals and express social unity.",
    ],
  },
  {
    title: "Maruni Dance",
    content: [
      "A traditional dance of the Magar community, symbolizing joy and celebration.",
      "Male dancers dress as women, showcasing vibrant costumes and jewelry.",
      "Performed during Dashain, Tihar, and other festivals.",
    ],
  },
  {
    title: "Sakela Dance",
    content: [
      "Known as 'Chandi Nach,' it is the main dance of the Rai community.",
      "Performed during the Sakela festival to honor nature and ancestors.",
      "Dancers form a circle, clapping and stepping in rhythmic patterns.",
    ],
  },
  {
    title: "Tamang Selo Dance",
    content: [
      "A lively dance accompanied by the traditional Tamang drum called 'Damphu.'",
      "Depicts themes of love, sorrow, and daily life.",
      "Performed by the Tamang community during various celebrations.",
    ],
  },
];

const Dance = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-orange-100 text-gray-800 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-10 text-yellow-600 drop-shadow-md">
          Nepali Cultural Dances
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {dances.map((policy, index) => (
            <div
              key={index}
              className="bg-white border-2 border-gradient-to-r from-yellow-500 to-yellow-300 rounded-lg shadow-lg hover:shadow-2xl p-4 transition-all duration-300"
            >
              <h2 className="text-lg font-bold mb-3 text-yellow-600">
                {policy.title}
              </h2>
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
                {policy.content.map((item, i) => (
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
export default Dance;
