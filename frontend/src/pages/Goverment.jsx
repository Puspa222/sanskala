import React from "react";
const policies = [
  {
    title: "Cultural Preservation Policies",
    content: [
      "Promotion of cultural festivals, traditions, and languages.",
      "Government grants for preserving endangered cultural practices.",
      "Policies supporting artists, craftsmen, and traditional performers.",
    ],
  },
  {
    title: "Digitization and Documentation",
    content: [
      "Initiatives to digitally archive cultural artifacts, music, art, and literature.",
      "Use of AI/ML for analyzing and cataloging cultural data.",
      "Policies encouraging digitization of museums and libraries.",
    ],
  },
  {
    title: "Education and Awareness",
    content: [
      "Inclusion of cultural studies in educational curriculums.",
      "Policies to organize workshops and seminars on cultural heritage.",
      "Grants for research in cultural diversity and preservation.",
    ],
  },
  {
    title: "Infrastructure Development",
    content: [
      "Construction and maintenance of cultural centers and museums.",
      "Preservation of historical sites and monuments through eco-friendly practices.",
      "Promotion of tourism to fund cultural preservation.",
    ],
  },
  {
    title: "Community Engagement",
    content: [
      "Involvement of local communities in decision-making.",
      "Policies supporting intergenerational sharing of knowledge about traditions.",
      "Encouragement of community-based cultural festivals.",
    ],
  },
  {
    title: "International Collaboration",
    content: [
      "Agreements with international organizations for cultural exchange programs.",
      "Preservation of UNESCO-listed heritage sites.",
      "Participation in global cultural forums and events.",
    ],
  },
  {
    title: "Funding and Grants",
    content: [
      "Financial support for artists and cultural organizations.",
      "Tax incentives for businesses promoting cultural heritage.",
      "Transparent allocation of funds for preservation projects.",
    ],
  },
  {
    title: "Laws and Regulations",
    content: [
      "Intellectual property rights for traditional knowledge and cultural practices.",
      "Strict laws against illicit trafficking of cultural artifacts.",
      "Regulations to protect cultural sites from urbanization and exploitation.",
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

