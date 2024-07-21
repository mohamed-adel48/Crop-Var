import React from 'react';
import { useLanguage } from "../../LanguageContext";

const SeedItem = ({ icon, name, count }) => {
  return (
    <div className="bg-gradient-to-r from-[#01E5B2] to-[#01B68D] pl-5 w-[90%] flex self-center items-center rounded-2xl mb-2 ">
      <div className="p-2 m-2 text-white bg-white rounded-xl">
        {icon}
      </div>
      <div className="">
        <h5 className="font-semibold">{name}</h5>
        <p className="text-sm">{count}</p>
      </div>
    </div>
  );
};

function MostSeeds() {
  const { getText } = useLanguage();
  const seedsData = [
    { icon: '🥕', name: getText('Carrot', 'جزر'), count: 498 },
    { icon: '🌾', name: getText('Rice', 'أرز'), count: 236 },
    { icon: '🍅', name: getText('Tomatoes', 'طماطم'), count: 168 }
  ];

  return (
    <div className="bg-white rounded-2xl flex justify-center items-center flex-col p-5 m-2">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-semibold text-secondaryColor">{getText('Most Seeds', 'أكثر البذور')}</span>
        <button className="cursor-pointer text-sm text-primaryColor outline-none bg-transparentColor border-none">{getText('View all', 'عرض الكل')}</button>
      </div>
      {seedsData.map((seed, index) => (
        <SeedItem key={index} icon={seed.icon} name={seed.name} count={seed.count} />
      ))}
    </div>
  );
};

export default MostSeeds;
