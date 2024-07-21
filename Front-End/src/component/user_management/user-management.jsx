import React, { useEffect, useState } from "react";
import { VscEye } from "react-icons/vsc";
import { FiEdit } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import UserManagementBtns from "../user_management/usermanagment-btns";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { useLanguage } from "../../LanguageContext";

function UserManagement() {
  const { getText } = useLanguage(); // Import getText function from the LanguageContext
  const membersPerPage = 7;
  const [currentPage, setCurrentPage] = useState(1);
  const [members, setMembers] = useState([]);
  // eslint-disable-next-line
  const [admin, setAdmin] = useState([]);
  const [deleted,setDeleted] = useState(false);
  // eslint-disable-next-line
  const [totalMembers, setTotalMembers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const getFarmers = async () => {
    try {
      const response = await axios.get("http://207.154.232.68/api/farmer/", {
        headers: {
          authorization: `Bearer ${Cookies.get("jwt")}`,
        },
      });
      console.log(response);
      setMembers(response.data.farmers);
      setTotalMembers(response.data.farmers.length);
      setTotalPages(Math.ceil(response.data.farmers.length / membersPerPage));
    } catch (error) {
      console.log(error);
    }
  };
  const deleteFarmer = async (id)=>{
    try {
      const response = await axios.delete(`http://207.154.232.68/api/farmer/${id}`,{
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
      await getFarmers();
    }
    fetchData();
  }, [deleted]);
  useEffect(() => {
    // Compare pages here
    if (Math.ceil(members.length / membersPerPage) < currentPage) {
      handleClickBack();
    }
  }, [members, currentPage, membersPerPage]);
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
      <div>
        <div className="w-[700px] bg-transparentColor flex flex-row gap-2 ml-6">
          {Cookies.get("role") === "Admin" && (
            <div className="bg-white rounded-t-lg flex flex-row justify-center text-center mb-2 w-1/3 gap-7 p-4">
              <div className="text-primaryColor flex flex-row justify-center items-center font-semibold text-center ">
                {getText("Members", "الأعضاء")}
              </div>
              <div className="text-secondaryColor flex flex-row justify-center items-center font-semibold text-center">
                {getText("Admins", "المسؤولون")}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="w-full px-6 bg-transparentColor mt-2 mb-2 ml- flex flex-row justify-between ">
        {/* addnew export import filter */}
        <UserManagementBtns members={members} />
      </div>
      <div className="flex flex-col bg-transparentColor rounded-t-2xl">
        {/* header */}
        <div className="flex justify-center items-center gap-2">
          <div className="p-4 text-center font-semibold text-[15px] bg-primaryColor text-white w-1/5">
            {getText("National ID", "الهوية الوطنية")}
          </div>
          <div className="p-4 text-center font-semibold text-[15px] bg-primaryColor text-white w-1/5">
            {getText("Photo", "الصورة")}
          </div>
          <div className="p-4 text-center font-semibold text-[15px] bg-primaryColor text-white w-1/5">
            {getText("Member Name", "اسم العضو")}
          </div>
          <div className="p-4 text-center font-semibold text-[15px] bg-primaryColor text-white w-1/5">
            {getText("Mobile Number", "الهاتف المحمول")}
          </div>
          <div className="p-4 text-center font-semibold text-[15px] bg-primaryColor text-white w-1/5">
            {getText("Status", "الحالة")}
          </div>
          <div className="p-4 text-center font-semibold text-[15px] bg-primaryColor text-white w-1/5 rounded-tr-2xl">
            {getText("Operations", "العمليات")}
          </div>
        </div>

        {members
          .slice(
            (currentPage - 1) * membersPerPage,
            currentPage * membersPerPage
          )
          .map((member) => (
            <div
              key={member.id}
              className="flex justify-center items-center gap-2 bg-white mt-2 mb-2 py-4"
            >
              <div className=" text-secondaryColor font-bold text-[14px] text-center w-1/5">
                {member.nationalId}
              </div>
              <div className="text-center self-center w-1/5 flex justify-center">
                <div className="w-8 h-8 overflow-hidden rounded-full">
                  <img
                    src={member.photo}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="text-secondaryColor font-bold text-[14px] text-center w-1/5">
                {member.name}
              </div>
              <div className="text-secondaryColor font-bold text-[14px] text-center w-1/5">
                {member.phoneNumber}
              </div>
              <div className="text-secondaryColor font-bold text-[14px] text-center w-1/5">
                <div
                  className={`text-sm p-2 font-normal rounded-md ${getStatusColor(
                    member.status
                  )}`}
                >
                  <span>{member.status}</span>
                </div>
              </div>
              <div className="flex items-center justify-center w-1/5">
                <button className="cursor-pointer border-none outline-none px-2 py-1 rounded bg-transparentColor">
                <Link to={`profile-member/${member.id}`}>
          
                  <i className="text-primaryColor">
                    <VscEye size={15} />
                  </i>
         
              </Link>
                </button>
                <button className="cursor-pointer border-none outline-none px-2 py-1 rounded bg-transparentColor">
                  <Link to={`edit-member/${member.id}`}>
                    <i className="text-primaryColor">
                      <FiEdit size={15} />
                    </i>
                  </Link>
                </button>
                <button onClick={()=>deleteFarmer(member.id)}
                  className="cursor-pointer border-none outline-none px-2 py-1 rounded bg-transparentColor"
                >
                  <i className="text-primaryColor">
                    <FaRegTrashAlt size={15} />
                  </i>
                </button>
              </div>
            </div>
          ))}
      </div>
      <div className="flex justify-center items-center mt-2 mb-2" id="tableId">
        <button
          className="cursor-pointer font-semibold text-center p-2 px-10 bg-gradient-to-r from-[#01E5B2] to-[#01B68D] text-white rounded-lg outline-none border-none"
          onClick={handleClickBack}
        >
          <span className="font-extrabold">{getText("Back", "رجوع")}</span>
        </button>
        <span className="mx-4 text-secondaryColor">
          {getText("Page", "الصفحة")} {currentPage} {getText("of", "من")}{" "}
          {totalPages}
        </span>
        <button
          className="cursor-pointer font-semibold text-center p-2 px-10 bg-gradient-to-r from-[#01E5B2] to-[#01B68D] text-white rounded-lg outline-none border-none"
          onClick={handleClickNext}
        >
          <span className="font-extrabold">{getText("Next", "التالي")}</span>
        </button>
      </div>
    </>
  );
}

const getStatusColor = (status) => {
  switch (status) {
    case "banned":
      return "bg-banned-background text-banned-text";
    case "Available":
      return "bg-not-violated-background text-not-violated-text";
    default:
      return "bg-black text-white";
  }
};

export default UserManagement;
