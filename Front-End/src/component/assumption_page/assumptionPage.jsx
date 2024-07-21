import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import UserManagementBtns from "../user_management/usermanagment-btns";
import axios from "axios";
import Cookies from "js-cookie";
import { useLanguage } from "../../LanguageContext"; 
import FromMapBtn from "../from_map/from-map-btn";
import { Link } from "react-router-dom";

function Assumption() {
  const membersPerPage = 7;
  const [currentPage, setCurrentPage] = useState(1);
  const [assumptions, setAssumptions] = useState([]);
  // eslint-disable-next-line
  const [deleted,setDeleted] = useState(false);
  const [totalMembers, setTotalMembers] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const { getText } = useLanguage(); 

  const getAssumptions = async () => {
    try {
      const response = await axios.get("http://207.154.232.68/api/assumption/", {
        headers: {
          "authorization": `Bearer ${Cookies.get("jwt")}`
        }
      });
      console.log(response);
      setAssumptions(response.data.assumptions);
      setTotalMembers(response.data.assumptions.length);
      setTotalPages(Math.ceil(response.data.assumptions.length / membersPerPage));      
    } catch (error) {
      console.log(error);
    }
  };
  const deleteAssumption = async (id)=>{
    try {
      const response = await axios.delete(`http://207.154.232.68/api/assumption/${id}`,{
        headers: {
          authorization: `Bearer ${Cookies.get("jwt")}`,
        },
      });
      setDeleted(!deleted);
     
      console.log(response);
  
    } catch (error) {
      console.log(error);

    }
  }
  useEffect(() => {
    async function fetchData() {
      await getAssumptions();
    }
    fetchData();   
  }, [deleted]);
  useEffect(() => {
    // Compare pages here
    if (Math.ceil(assumptions.length / membersPerPage) < currentPage) {
      handleClickBack();
    }
  }, [assumptions, currentPage, membersPerPage]);
  const handleClickNext = () => {
    setCurrentPage((prevPage) =>
      prevPage < totalPages ? prevPage + 1 : prevPage
    );
  };

  const handleClickBack = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  }; 

  return (
    <>
      <div className="w-full px-6 bg-transparentColor mt-2 mb-2 ml- flex flex-row justify-between ">
        {/* addnew export import filter */}
        <UserManagementBtns assumptions={assumptions}/>
      </div>
      <div className="flex flex-col bg-transparentColor rounded-t-2xl">
        {/* header */}
        <div className="flex justify-center items-center gap-2">
          <div className="py-4 text-center font-semibold text-[15px] bg-primaryColor text-white w-1/5">
            {getText("National ID", "الرقم القومي")}
          </div>
          <div className="py-4 text-center font-semibold text-[15px] bg-primaryColor text-white w-1/5">
            {getText("Photo", "الصورة")}
          </div>
          <div className="py-4 text-center font-semibold text-[15px] bg-primaryColor text-white w-1/5">
            {getText("Member Name", "اسم العضو")}
          </div>
          <div className="py-4 text-center font-semibold text-[15px] bg-primaryColor text-white w-1/5">
            ID
          </div>
          <div className="py-4 text-center font-semibold text-[15px] bg-primaryColor text-white w-1/5">
            {getText("Seed", "البذور")}
          </div>
          <div className="py-4 text-center font-semibold text-[15px] bg-primaryColor text-white w-1/5">
            {getText("Status", "الحالة")}
          </div>
          <div className="py-4 text-center font-semibold text-[15px] bg-primaryColor text-white w-1/5">
            {getText("Result", "النتيجة")}
          </div>
          <div className="py-4 text-center font-semibold text-[15px] bg-primaryColor text-white w-1/5 rounded-tr-2xl">
            {getText("Operations", "العمليات")}
          </div>
        </div>

        {assumptions
          .slice(
            (currentPage - 1) * membersPerPage,
            currentPage * membersPerPage
          )
          .map((assumption) => (
            <div
              key={assumption.id}
              className="flex justify-center items-center gap-2 bg-white mt-2 mb-2"
            >
              <div className="py-4 text-secondaryColor font-bold text-[14px] text-center w-1/5">
                {assumption.farmer.nationalId}
              </div>
              <div className="py-4 text-center self-center flex justify-center w-1/5">
                <div className="w-8 h-8 overflow-hidden rounded-full">
                  <img
                    src={assumption.farmer.photo}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="py-4 text-center font-semibold text-[15px] w-1/5 text-secondaryColor">
                {assumption.farmer.name}
              </div>
              <div className="py-4 text-center font-semibold text-[15px] w-1/5 text-secondaryColor">
                {assumption.id}
              </div>
              <div className="py-4 text-center font-semibold text-[15px] w-1/5 text-secondaryColor">
                {assumption.farmerAssumption.name}
              </div>
              <div className="text-secondaryColor font-bold text-[14px] text-center w-1/5">
                <div
                  className={`text-sm p-2 font-normal rounded-md ${getStatusColor(
                    assumption.status
                  )}`}
                >
                  <span>{assumption.status}</span>
                </div>
              </div>
              <div className="py-4 text-center font-semibold text-[15px] w-1/5 text-secondaryColor">
                {assumption.plantId_ai ? assumption.ai_Assumption.name : assumption.status}
              </div>
              <div className="py-4 flex items-center justify-center w-1/5">
                <button className="cursor-pointer border-none outline-none px-2 py-1 rounded bg-transparentColor">
                  <Link to={`edit-assumption/${assumption.id}`} >
                    <i className="text-primaryColor">
                      <FiEdit size={15} />
                    </i>
                  </Link>
                </button>
                <button onClick={()=>{deleteAssumption(assumption.id)}} className="cursor-pointer border-none outline-none px-2 py-1 rounded bg-transparentColor">
                  <i className="text-primaryColor">
                    <FaRegTrashAlt size={15} />
                  </i>
                </button>
                <FromMapBtn id={assumption.id}   />
              </div>
            </div>
          ))}
      </div>
      <div className="flex justify-center items-center mt-2 mb-2">
        <button
          className="cursor-pointer font-semibold text-center p-2 px-10 bg-gradient-to-r from-[#01E5B2] to-[#01B68D] text-white rounded-lg outline-none border-none"
          onClick={handleClickBack}
        >
          <span className="font-extrabold">{getText("Back", "خلف")}</span>
        </button>
        <span className="mx-4 text-secondaryColor">
          {getText("Page", "الصفحة")} {currentPage} {getText("of", "من")} {totalPages}
        </span>
        <button
          className="cursor-pointer font-semibold text-center p-2 px-10 bg-gradient-to-r from-[#01E5B2] to-[#01B68D] text-white rounded-lg outline-none border-none"
          onClick={handleClickNext}
        >
          <span className="font-extrabold">{getText("Next", "التالي")}</span>
        </button>
      </div>
    </>
  )
}

const getStatusColor = (status) => {
  switch (status) {
    case "Wrong":
      return "bg-banned-background text-banned-text";
    case "Right":
    case "Pending":
      return "bg-not-violated-background text-not-violated-text";
    default:
      return "bg-black text-white";
  }
};

export default Assumption;
