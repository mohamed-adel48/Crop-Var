import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { CiExport } from "react-icons/ci";
import { useLanguage } from "../../LanguageContext"; 
import { ToastContainer,toast } from 'react-toastify';
function Member({ closeModal }) {
  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");
  const [nationalId,setNationalId] = useState("");
  const [phone,setPhone] = useState("");
  const [profile,setProfile] = useState("");
  const [farmerCard,setFarmerCard] = useState("");
  const { getText } = useLanguage();
  

  const handleSave = async ()=>{
    try {
      if (firstName&&lastName&&nationalId&&phone&&profile&&farmerCard){
        const data = new FormData();
        data.append('name', `${firstName} ${lastName}`);
        data.append('phoneNumber', phone);
        data.append('nationalId', nationalId);
        data.append('profile', profile);
        data.append('farmerCard', farmerCard);
        const response = await axios.post("http://207.154.232.68/api/farmer/",data,{headers : {
          authorization : `Bearer ${Cookies.get("jwt")}`,
          'Content-Type': 'multipart/form-data',
        }});
        if (response.status === 200 || response.status===201){
          toast.success("Added User Successfully");
        }
        else {
          console.log(response);
        }
        
      }
    } catch (error) {
      console.log(error);
      toast.error("Error, try again later");
    }
  }
  return (
    <>
        <div className="flex flex-row items-center w-11/12 h-1/2 bg-white rounded-2xl">
          <div className="w-1/2 flex flex-col">
            <h2 className="text-secondaryColor font-bold m-5">{getText("Add New Member", "إضافة عضو جديد")}</h2>
            <div className="flex flex-row gap-2">
              <div className="p-4 rounded-lg">
                <div class="relative">
                  <input
                  onChange={(e)=>{
                    setFirstName(e.target.value);
                  }}
                    type="text"
                    id="first-name"
                    name="first-name"
                    className="peer bg-transparent h-10 w-72 rounded-lg text-gray-200 placeholder-transparent px-2 ring-secondaryColor focus:outline-none border border-secondaryColor focus:border-secondaryColor"
                    placeholder=""
                  />
                  <label
                    for="first-name"
                    className="absolute cursor-text left-0 -top-3 text-sm text-secondaryColor bg-white mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
                  >
                    {getText("First Name", "اسمك")}

                  </label>
                </div>
              </div>
              <div className="p-4 rounded-lg">
                <div class="relative">
                  <input
                  onChange={(e)=>{
                    setLastName(e.target.value);
                  }}
                    type="text"
                    id="last-name"
                    name="last-name"
                    className="peer bg-transparent h-10 w-72 rounded-lg text-gray-200 placeholder-transparent px-2 ring-white focus:outline-none border border-[#666666] focus:border-[#666666]"
                    placeholder=""
                  />
                  <label
                    for="last-name"
                    className="absolute cursor-text left-0 -top-3 text-sm text-secondaryColor bg-white mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
                  >
                    {getText("Last Name", "اسم العائلة")}
                  </label>
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-2">
              <div className="p-4 rounded-lg">
                <div class="relative">
                  <input
                  onChange={(e)=>{
                    setNationalId(e.target.value);
                  }}
                    type="text"
                    id="nation-id"
                    name="nation-id"
                    className="peer bg-transparent h-10 w-72 rounded-lg text-gray-200 placeholder-transparent px-2 ring-white focus:outline-none border border-[#666666] focus:border-[#666666]"
                    placeholder=""
                  />
                  <label
                    for="nation-id"
                    className="absolute cursor-text left-0 -top-3 text-sm text-secondaryColor bg-white mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
                  >
                    {getText("Nation ID  ", "البطاقة")}

                  </label>
                </div>
              </div>
              <div className="p-4 rounded-lg">
                <div class="relative">
                  <input
                  onChange={(e)=>{
                    setPhone(e.target.value);
                  }}
                    type="text"
                    id="mobile-number"
                    name="mobile-number"
                    className="peer bg-transparent h-10 w-72 rounded-lg text-gray-200 placeholder-transparent px-2 ring-white focus:outline-none border border-[#666666] focus:border-[#666666]"
                    placeholder=""
                  />
                  <label
                    for="mobile-number"
                    className="absolute cursor-text left-0 -top-3 text-sm text-secondaryColor bg-white mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
                  >
                   {getText("Mobile Number", "رقم الهاتف")}

                  </label>
                </div>
              </div>
              
            </div>
            
            <div className="flex flex-row gap-2 m-4 mt-6">
              <div>
              <button className="cursor-pointer flex flex-row gap-2 justify-center items-center font-semibold text-center py-2 px-4 bg-primaryColor text-white rounded-lg outline-none border-primaryColor border">
                <div>
                  <CiExport size={14} />
                </div>
                <label htmlFor={"farmerCard"} className="cursor-pointer">
                  {getText("Upload Farmer Card", "تحميل بطاقة المزارع")}
                  <input id="farmerCard" type="file" className="hidden" accept="image/*" onChange={(e)=>{setFarmerCard(e.target.files[0])}} />
                </label>
              </button>
              </div>
              <div>
              <button className="cursor-pointer flex flex-row gap-2 justify-center items-center font-semibold text-center py-2 px-4 bg-primaryColor text-white rounded-lg outline-none border-primaryColor border">
                <div>
                  <CiExport size={14} />
                </div>
                <label htmlFor={"profile"} className="cursor-pointer">
                  {getText("Upload photo", "حمل الصورة")}
                  <input id="profile" type="file" className="hidden" accept="image/*" onChange={(e)=>{setProfile(e.target.files[0])}} />
                </label>
            </button>

                
              </div>
              <button
                onClick={async()=>{ await handleSave();}}
                 className="cursor-pointer font-semibold text-center w-28 py-2 bg-primaryColor text-white rounded-2xl outline-none border-none">
                  <div>{getText("Save", "حفظ")}</div>
                </button>
            </div>
          </div>
          
        </div>
    </>
  );
}

export default Member;
