import React from "react";
const policies = [
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
const GovernmentPolicy = () => {
  return (
<div className="min-h-screen bg-[rgb(248,248,211)] text-black p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center mb-12 text-gradient bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg">
          Government Policies
        </h1>
        <div className="flex flex-wrap justify-center gap-10"> {/* Use flexbox to wrap the cards */}
          {policies.map((policy, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-yellow-600 via-yellow-500 to-yellow-400 p-6 rounded-lg shadow-2xl transform hover:scale-105 hover:rotate-1 transition-transform duration-300 w-72"
 // Set a fixed width for cards
            >
              <h2 className="text-2xl font-bold mb-4 text-black drop-shadow-md">
                {policy.title}
              </h2>
              <ul className="list-inside space-y-3">
                {policy.content.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start text-lg leading-relaxed text-brown-200"
                  >
                    <span className="w-3 h-3 mt-1 mr-2 bg-yellow-400 rounded-full flex-shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default GovernmentPolicy;

