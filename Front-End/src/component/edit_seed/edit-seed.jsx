import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CiExport } from "react-icons/ci";
import { useParams } from 'react-router-dom';
import Cookies from "js-cookie";

function EditSeed() {
  const { id } = useParams();
  const {plant,setPlant} = useState({});
  // const savePlant = async()=>{
  //   try {
  //     const response = await axios.post(`http://207.154.232.68/api/plant/${id}`, {
  //       headers: {
  //         authorization: `Bearer ${Cookies.get("jwt")}`,
  //       },
  //     });
      
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  const getPlant = async ()=>{
   
    try {
      const response = await axios.get(`http://207.154.232.68/api/plant/${id}`, {
        headers: {
          authorization: `Bearer ${Cookies.get("jwt")}`,
        },
      });
    
      setPlant(response.data.plant);
      
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    async function fetchData() {
     
      await getPlant();
    }
    fetchData();
  },[]);
    return (
    <>
      <div className="flex flex-row items-center w-11/12 h-1/2 bg-white rounded-2xl">
        <div className="w-1/2 flex flex-col">
          <h2 className="text-secondaryColor font-bold ml-5">Edit New Seeds </h2>
          <div className="flex flex-row gap-2">
            <div className="p-4 rounded-lg">
              <div class="relative">
                <input
                value={plant.name}
                  type="text"
                  id="first-name"
                  name="first-name"
                  className=" bg-transparent h-10 w-72 rounded-lg text-gray-200 placeholder-transparent px-2 ring-secondaryColor focus:outline-none border border-secondaryColor focus:border-secondaryColor"
                  placeholder=""
                />
                <label
                  for="first-name"
                  className="absolute cursor-text left-0 -top-3 text-sm text-secondaryColor bg-white mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
                >
                  Name
                </label>
              </div>
            </div>
           
          </div>
          <div className="flex flex-row gap-2">
            <div className="p-4 rounded-lg">
              <div class="relative">
                <input
                value={"Nitrogen"}
                  type="text"
                  id="nation-id"
                  name="nation-id"
                  className=" bg-transparent h-10 w-72 rounded-lg text-gray-200 placeholder-transparent px-2 ring-white focus:outline-none border border-[#666666] focus:border-[#666666]"
                  placeholder=""
                />
                <label
                  for="nation-id"
                  className="absolute cursor-text left-0 -top-3 text-sm text-secondaryColor bg-white mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
                >
                  Fertilizer
                </label>
              </div>
            </div>
            <div className="p-4 rounded-lg">
              <div class="relative">
                <input
                value={plant.fertlizerConsumption}
                  type="text"
                  id="mobile-number"
                  name="mobile-number"
                  className=" bg-transparent h-10 w-72 rounded-lg text-gray-200 placeholder-transparent px-2 ring-white focus:outline-none border border-[#666666] focus:border-[#666666]"
                  placeholder=""
                />
                <label
                  for="mobile-number"
                  className="absolute cursor-text left-0 -top-3 text-sm text-secondaryColor bg-white mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
                >
                  Fertilizer Quan
                </label>
              </div>
            </div>
          </div>

          <div className="flex flex-row gap-2 ml-4 mt-6">
            <button className="cursor-pointer font-semibold text-center w-28 py-2 bg-primaryColor text-white rounded-2xl outline-none border-none">
              <div>Save</div>
            </button>
          </div>
        </div>
      </div>
    </>
  );

}

export default EditSeed