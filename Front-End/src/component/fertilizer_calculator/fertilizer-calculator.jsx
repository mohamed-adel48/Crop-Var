import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import fBag from "../../assets/fertilizer-bag.svg";

function FertilizerCalculator() {
  const nutrients = [
    "Nitrogen",
    "Phosphorus",
    "Potassium as Potash",
    "Magnesium",
  ];
  const [value, setValue] = useState("");
  const [nitrogen, setNitrogen] = useState("");
  const [phosphorus, setPhosphorus] = useState("");
  const [potassium, setPotassium] = useState("");

  const handleChange = (event, setter) => {
    const result = event.target.value.replace(/\D/g, "");
    if (typeof setter === "function") {
      setter(result);
    }
  };

  const [selectedNutrient, setSelectedNutrient] = useState(null);

  const handleNutrientSelect = (value) => {
    setSelectedNutrient((prevValue) =>
      prevValue === value ? null : value
    );
  };

  return (
    <>
      <div className="flex flex-col justify-start gap-3 ml-4 mb-3 mt-3">
        <div className="flex justify-start items-center mt-2 mb-2">
          <Link
            to="/dashboard/seeds-details"
            className="no-underline flex flex-row gap-2 font-semibold text-center py-3 px-4 bg-gradient-to-r from-[#01E5B2] to-[#01B68D] text-white rounded-lg outline-none border-none"
          >
            <div>
              <FaArrowLeftLong size={17} />
            </div>
            <div className="text-sm">Back</div>
          </Link>
          <span className="mx-4 text-secondaryColor">
            Fertilizer Calculator
          </span>
        </div>
        <div className="w-full flex flex-row gap-4">
          <div className="bg-white w-2/5 p-4 flex flex-col gap-4 rounded-md">
            <div className="gap-3 flex flex-row items-center">
              <span className="bg-gradient-to-r from-[#01E5B2] to-[#01B68D] text-white font-semibold p-3 rounded-md">
                1
              </span>
              <span className="text-secondaryColor font-medium">
                Choose Fertilizer Type:
              </span>
            </div>
            <div>
              <div className="flex flex-row justify-around">
                <div className="bg-[#F5F5F5] cursor-pointer w-1/4 rounded-md flex justify-center items-center p-4 hover:outline-primaryColor hover:outline hover:outline-[3px]">
                  <img
                    src={fBag}
                    alt="#"
                    width={"110px"}
                    height={"110px"}
                  />
                </div>
                <div className="bg-[#F5F5F5] cursor-pointer w-1/4 rounded-md hover:outline-primaryColor hover:outline-[3px] hover:outline flex justify-center items-center p-4 ">
                  <img
                    src={fBag}
                    alt="#"
                    width={"110px"}
                    height={"110px"}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white w-2/5 p-4 flex flex-col gap-4 rounded-md">
            <div className="gap-3 flex flex-row items-center">
              <span className="bg-gradient-to-r from-[#01E5B2] to-[#01B68D] text-white font-semibold p-3 rounded-md">
                2
              </span>
              <span className="text-secondaryColor font-medium">
                Choose Nutrient You Want to Apply:
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {nutrients.map((nutrient) => (
                <label key={nutrient}>
                  <input
                    type="radio"
                    value={nutrient}
                    checked={selectedNutrient === nutrient}
                    onChange={() => handleNutrientSelect(nutrient)}
                  />
                  {nutrient}
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-white w-[84%] p-4 flex flex-col gap-y-10 rounded-md">
          <div className="gap-3 flex flex-row items-center">
            <span className="bg-gradient-to-r from-[#01E5B2] to-[#01B68D] text-white font-semibold p-3 rounded-md">
              2
            </span>
            <span className="text-secondaryColor font-medium">
              Choose Nutrient You Want to Apply:
            </span>
          </div>
          <div className="flex flex-col gap-3 ml-20">
            <label>Area to be fertilized</label>
            <input
              className="bg-[#F5F5F5] w-60 outline-none border-none p-4 rounded-2xl"
              type="text"
              placeholder="Total area to be fertilized"
              value={value}
              onChange={(e) => handleChange(e, setValue)}
            />
          </div>
          <div className="flex flex-row gap-4 ml-20">
            <div>
              <label>Nitrogen</label>
              <input
                className="bg-[#F5F5F5] w-60 outline-none border-none p-4 rounded-2xl mt-2"
                type="text"
                placeholder="Total area to be fertilized"
                value={nitrogen}
                onChange={(e) => handleChange(e, setNitrogen)}
              />
            </div>
            <div>
              <label>Phosphorus</label>
              <input
                className="bg-[#F5F5F5] w-60 outline-none border-none p-4 rounded-2xl mt-2"
                type="text"
                placeholder="Total area to be fertilized"
                value={phosphorus}
                onChange={(e) => handleChange(e, setPhosphorus)}
              />
            </div>
            <div>
              <label>Potassium</label>
              <input
                className="bg-[#F5F5F5] w-60 outline-none border-none p-4 rounded-2xl mt-2"
                type="text"
                placeholder="Total area to be fertilized"
                value={potassium}
                onChange={(e) => handleChange(e, setPotassium)}
              />
            </div>
          </div>
          <div className="w-full flex justify-center mt-5">
            <button
              type="submit"
              className="cursor-pointer no-underline flex flex-row gap-2 font-semibold text-center py-3 px-16 bg-gradient-to-r from-[#01E5B2] to-[#01B68D] text-white rounded-lg outline-none border-none"
            >
              Calculator
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default FertilizerCalculator;
