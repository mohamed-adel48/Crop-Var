import React, { useEffect, useState } from 'react'
import { useLanguage } from "../../LanguageContext"; 
import { CiExport } from 'react-icons/ci';
import axios from 'axios';
import { useParams  } from 'react-router-dom';
import Cookies from 'js-cookie';

function EditMember() {
    const { getText } = useLanguage();
    const [member, setMember] = useState({nationalId : "" ,name:"",phoneNumber:"",status:"" });
    const [name,setName] = useState(member.name);
    const [nationalId,setNationalId] = useState(member.nationalId);
    const [phoneNumber,setPhoneNumber] = useState(member.phoneNumber);

  const { id } = useParams();
  const saveUser = async ()=>{
    try {
      const response = await axios.patch(`http://207.154.232.68/api/farmer/${id}`, {
        name,
        nationalId,
        phoneNumber,
      },{
        headers: {
          authorization: `Bearer ${Cookies.get("jwt")}`,
        },
      });
      console.log(response);
      
      
    } catch (error) {
      console.log(error);
    }
  }
  const getUser = async ()=>{
   
    try {
      const response = await axios.get(`http://207.154.232.68/api/farmer/${id}`, {
        headers: {
          authorization: `Bearer ${Cookies.get("jwt")}`,
        },
      });
    
      setMember(response.data.farmer);
      setName(response.data.farmer.name);
      setNationalId(response.data.farmer.nationalId);
      setPhoneNumber(response.data.farmer.phoneNumber);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    async function fetchData() {
      await getUser();
    }
    fetchData();
  },[]);
  
    return (
        <>
        
            <div className="flex flex-row items-center w-11/12 h-1/2 bg-white rounded-2xl">
              <div className="w-1/2 flex flex-col">
                <h2 className="text-secondaryColor font-bold m-5">{getText("Edit Member", "تعديل عضو")}</h2>
                <div className="flex flex-row gap-2">
                  <div className="p-4 rounded-lg">
                    <div class="relative">
                      <input
                        type="text"
                        id="national-id"
                        name="national-id"
                        className=" bg-transparent h-10 w-72 rounded-lg text-gray-200 placeholder-transparent px-2 ring-secondaryColor focus:outline-none border border-secondaryColor focus:border-secondaryColor"
                        placeholder=""
                        value={nationalId}
                        onChange={(e)=>{setNationalId(e.target.value);}}
                      />
                      <label
                        for="national-id"
                        className="absolute cursor-text left-0 -top-3 text-sm text-secondaryColor bg-white mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
                      >
                        {getText("National ID", "الهوية الوطنية")}
    
                      </label>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg">
                    <div class="relative">
                      <input
                      
                        type="text"
                        id="member-name"
                        name="member-name"
                        className=" bg-transparent h-10 w-72 rounded-lg text-gray-200 placeholder-transparent px-2 ring-white focus:outline-none border border-[#666666] focus:border-[#666666]"
                        placeholder=""
                        value={name}
                        onChange={(e)=>{setName(e.target.value);}}
                      />
                      <label
                        for="member-name"
                        className="absolute cursor-text left-0 -top-3 text-sm text-secondaryColor bg-white mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
                      >
                        {getText("Member Name", "اسم عضو")}
                      </label>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row gap-2">
                  <div className="p-4 rounded-lg">
                    <div class="relative">
                      <input
                        type="text"
                        id="mobile-number"
                        name="mobile-number"
                        className=" bg-transparent h-10 w-72 rounded-lg text-gray-200 placeholder-transparent px-2 ring-white focus:outline-none border border-[#666666] focus:border-[#666666]"
                        placeholder=""
                        value={phoneNumber}
                        onChange={(e)=>{setPhoneNumber(e.target.value);}}
                      />
                      <label
                        for="mobile-number"
                        className="absolute cursor-text left-0 -top-3 text-sm text-secondaryColor bg-white mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
                      >
                        {getText("Mobile Number", "رقم الهاتف")}
                      </label>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg">
                    <div class="relative">
                      <input
                        type="text"
                        id="mobile-number"
                        name="mobile-number"
                        className="bg-transparent h-10 w-72 rounded-lg text-gray-200 placeholder-transparent px-2 ring-white focus:outline-none border border-[#666666] focus:border-[#666666]"
                        placeholder=""
                        value={phoneNumber}
                        onChange={(e)=>{setPhoneNumber(e.target.value);}}
                      />
                      <label
                        for="mobile-number"
                        className="absolute cursor-text left-0 -top-3 text-sm text-secondaryColor bg-white mx-1 px-1peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
                      >
                       {getText("Mobile Number", "رقم الهاتف")}
                      </label>
                    </div>
                  </div>  
                </div>
                <div className="flex flex-row gap-2 m-4 mt-6">
                  <button
                      onClick={saveUser}
                     className="cursor-pointer font-semibold text-center w-28 py-2 bg-primaryColor text-white rounded-2xl outline-none border-none">
                      <div>{getText("Save", "حفظ")}</div>
                    </button>
                </div>
              </div>
              
            </div>
        </>
      );
}

export default EditMember