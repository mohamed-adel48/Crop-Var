import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { CiExport } from "react-icons/ci";
import { ToastContainer,toast } from 'react-toastify';

function NewSeeds() {
  const [fertilizerQuan, setFertilizerQuan] = useState("");
  const [name,setName] = useState("");
  const [desc,setDesc] = useState("");
  const [fert,setFert] = useState("");
 
  const [image,setImage] = useState("");
  const handleSave = async ()=>{
    try {
      const data = new FormData();
      data.append("name",name);
      data.append("fertlizerConsumption",fertilizerQuan);
      data.append("image",image);
      const response = await axios.post("http://207.154.232.68/api/plant/",data, {
        headers: {
          authorization: `Bearer ${Cookies.get("jwt")}`,
          'Content-Type': 'multipart/form-data'
        },
      });
      if (response.status === 201){
        toast.success("Added Seed Successfully");
      }
     
    
    } catch (error) {
      console.log(error);
      toast.error("Error, try again later");
    }
  }
  const handleFertilizerQuanChange = (event) => {
    const inputValue = event.target.value;
    if (!isNaN(inputValue)) {
      setFertilizerQuan(inputValue);
    } else {
      setFertilizerQuan("");
    }
  };
  return (
    <>
      <div className="flex flex-row items-center w-11/12 h-1/2 bg-white rounded-2xl">
        <div className="w-1/2 flex flex-col">
          <h2 className="text-secondaryColor font-bold ml-5">Add New Seeds </h2>
          <div className="flex flex-row gap-2">
            <div className="p-4 rounded-lg">
              <div class="relative">
                <input
                  type="text"
                  id="first-name"
                  name="first-name"
                  className="peer bg-transparent h-10 w-72 rounded-lg text-gray-200 placeholder-transparent px-2 ring-secondaryColor focus:outline-none border border-secondaryColor focus:border-secondaryColor"
                  placeholder=""
                  onChange={(e)=>{setName(e.target.value);}}
                />
                <label
                  for="first-name"
                  className="absolute cursor-text left-0 -top-3 text-sm text-secondaryColor bg-white mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
                >
                  Name
                </label>
              </div>
            </div>
            <div className="p-4 rounded-lg">
              <div class="relative">
                <input
                  type="text"
                  id="last-name"
                  name="last-name"
                  className="peer bg-transparent h-10 w-72 rounded-lg text-gray-200 placeholder-transparent px-2 ring-white focus:outline-none border border-[#666666] focus:border-[#666666]"
                  placeholder=""
                  onChange={(e)=>{setDesc(e.target.value);}}
                />
                <label
                  for="last-name"
                  className="absolute cursor-text left-0 -top-3 text-sm text-secondaryColor bg-white mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
                >
                  Descreption
                </label>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <div className="p-4 rounded-lg">
              <div class="relative">
                <input
                  type="text"
                  id="nation-id"
                  name="nation-id"
                  className="peer bg-transparent h-10 w-72 rounded-lg text-gray-200 placeholder-transparent px-2 ring-white focus:outline-none border border-[#666666] focus:border-[#666666]"
                  placeholder=""
                  onChange={(e)=>{setFert(e.target.value);}}
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
                  type="text"
                  id="mobile-number"
                  name="mobile-number"
                  className="peer bg-transparent h-10 w-72 rounded-lg text-gray-200 placeholder-transparent px-2 ring-white focus:outline-none border border-[#666666] focus:border-[#666666]"
                  placeholder=""
                  value={fertilizerQuan}
                onChange={handleFertilizerQuanChange}
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
            <div>
            <button className="cursor-pointer flex flex-row gap-2 justify-center items-center font-semibold text-center py-2 px-4 bg-primaryColor text-white rounded-lg outline-none border-primaryColor border">
                <div>
                  <CiExport size={14} />
                </div>
                <label htmlFor="photo-input" className="cursor-pointer">
                  Upload photo
                  <input id="photo-input" type="file" className="hidden" onChange={(e)=>{setImage(e.target.files[0])}}/>
                </label>
            </button>

            </div>
            <button onClick={handleSave} className="cursor-pointer font-semibold text-center w-28 py-2 bg-primaryColor text-white rounded-2xl outline-none border-none">
              <div>Save</div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewSeeds;
