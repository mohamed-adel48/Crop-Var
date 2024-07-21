import React from 'react'
import { useLanguage } from "../../LanguageContext"; 
import { Link } from 'react-router-dom';

function FromMapBtn(id) {
    const { getText } = useLanguage(); 
    
    return (
    <>
    <Link 
    to={`/dashboard/user-map/${id.id}`}
    className="cursor-pointer font-semibold no-underline text-sm text-center py-2 bg-gradient-to-r from-[#01E5B2] to-[#01B68D] text-white rounded-lg outline-none border-none">
        {getText("From Map", "من الخريطة")}
    </Link>
    </>
  )
}

export default FromMapBtn