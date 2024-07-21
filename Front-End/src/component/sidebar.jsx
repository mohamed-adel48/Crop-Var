import { useLocation } from "react-router-dom";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { TbSeeding } from "react-icons/tb";
import { IoAnalyticsOutline } from "react-icons/io5";
import { ReactComponent as AppLogo } from "../assets/applogo.svg";
import { useLanguage } from "../LanguageContext";
import Cookies from "js-cookie";

function SideBar() {
  const [activeLink, setActiveLink] = useState(null);
  const { toggleLanguage, getText } = useLanguage();
  const [language, setLanguage] = useState("en");
  // eslint-disable-next-line 
  const location = useLocation();

  const handleLinkClick = (index) => {
    if (index === 4){
      Cookies.remove("jwt");
    }
    setActiveLink(index === activeLink ? null : index);
  };
  

  const renderLink = (to, enText, arText, icon, index) => {
    const isActive = index === activeLink;
   
    return (
      <Link
        to={to}
        key={index}
        className={`${
          isActive ? "text-primaryColor" : "text-secondaryColor"
        } no-underline block py-2 hover:bg-gray-700 hover:text-primaryColor`}
        onClick={() => handleLinkClick(index)}
      >
        <div className="flex flex-row justify-start gap-2 items-center">
          {React.cloneElement(icon, { className: "w-6" })}
          {getText(enText, arText)}
        </div>
      </Link>
    );
  };

  return (
    <div className="w-64 bg-white text-secondaryColor p-4">
      <div className="gap-2 text-secondaryColor flex flex-row justify-center items-center">
        <AppLogo className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center" />
        <span className="font-bold text-[20px]">Crop Var</span>
      </div>
      <hr className="bg-secondaryColor w-3/4" />
      <nav className="mt-4 flex flex-col justify-center gap-1 pl-6">
        {renderLink(
          "/dashboard",
          "Dashboard",
          "لوحة القيادة",
          <MdDashboard />,
          0
        )}
        {renderLink(
          "user-management",
          "User Management",
          "إدارة المستخدمين",
          <IoPersonSharp />,
          1
        )}
        {renderLink(
          "assumption",
          "Assumption",
          "افتراض",
          <IoAnalyticsOutline />,
          2
        )}
        {renderLink(
          "seeds-details",
          "Seeds Details",
          "تفاصيل البذور",
          <TbSeeding />,
          3
        )}
        {renderLink("/", "Logout", "تسجيل الخروج", <IoIosLogOut />, 4)}
      </nav>
      <div className="mt-4 ml-7">
        <button
          className="text-sm bg-primaryColor text-white px-3 py-1 rounded outline-none border-none cursor-pointer"
          onClick={() => {
            toggleLanguage();
            setLanguage(language === "en" ? "ar" : "en");
          }}
        >
          {language === "en" ? "Change to Arabic" : "تغيير إلى الإنجليزية"}
        </button>
      </div>
    </div>
  );
}

export default SideBar;
