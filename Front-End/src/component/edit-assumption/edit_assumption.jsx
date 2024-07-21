import  Axios from "axios";
import { useLanguage } from "../../LanguageContext"; 
import { CiExport } from 'react-icons/ci';
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useParams  } from 'react-router-dom';

function EditAssumption() {
    const { getText } = useLanguage();
    const [seeds,setSeeds] = useState([]);
    const [selectedSeed, setSelectedSeed] = useState(null);
    const [selectedResultSeed, setSelectedResultSeed] = useState(null);
    const { id } = useParams();
    const getSeeds = async ()=>{
      try {
        const response = await Axios.get("http://207.154.232.68/api/plant",{
          headers:{
            "authorization" : `Bearer ${Cookies.get("jwt")}`
          }
        });
        setSeeds(response.data.plants);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
    const getAssumption = async ()=>{
      try {
        const response = await Axios.get(`http://207.154.232.68/api/assumption/${id}`,{
          headers:{
            "authorization" : `Bearer ${Cookies.get("jwt")}`
          }
        });
        
        console.log(response.data);
        setSelectedSeed(response.data.assumption.farmerAssumption.id);
        setSelectedResultSeed(response.data.assumption.ai_Assumption.id)
      } catch (error) {
        console.log(error);
      }
    }
    const saveAssumption = async ()=>{
      try {
        const response = await Axios.post(`http://207.154.232.68/api/assumption/${id}`,{
          "result" : selectedResultSeed,
          "planted" : selectedSeed
        },{
          headers:{
            "authorization" : `Bearer ${Cookies.get("jwt")}`
          }
        });
        
        console.log(response.data);
       
      } catch (error) {
        console.log(error);
      }
    }
    useEffect(()=>{
      async function fetchData() {
        await getSeeds();
        await getAssumption();
      }
      fetchData();
    },[]);
    return (
        <>
            <div className="flex flex-row items-center w-11/12 h-1/2 bg-white rounded-2xl">
              <div className="w-1/2 flex flex-col">
                <h2 className="text-secondaryColor font-bold m-5">{getText("Edit Assumption", "تعديل افتراض")}</h2>
                <div className="flex flex-row gap-2">
                  
                
                </div>
                <div className="flex flex-row gap-2">
                  <div className="p-4 rounded-lg">
                    <div class="relative">
                    <div className="">
              <select
                value={selectedSeed || ''}
                onChange={(e) => {setSelectedSeed(e.target.value);}}
                className="inline-flex justify-center items-center w-full px-4 py-2 bg-white text-sm font-medium text-primaryColor rounded-md focus:outline-none focus:ring focus:border-blue-300"
              >
                <option value="" disabled>
                  Select a seed
                </option>
                {seeds.map((seed) => (
                  <option key={seed.id} value={seed.id}>
                    {seed.name}
                  </option>
                ))}
              </select>
            </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg">
                    <div class="relative">
                    <div className="">
              <select
                value={selectedResultSeed || ''}
                onChange={(e) => {setSelectedResultSeed(e.target.value);}}
                className="inline-flex justify-center items-center w-full px-4 py-2 bg-white text-sm font-medium text-primaryColor rounded-md focus:outline-none focus:ring focus:border-blue-300"
              >
                <option value="" disabled>
                  {getText("Result", "نتيجة")}
                </option>
                {seeds.map((seed) => (
                  <option key={seed.id} value={seed.id}>
                    {seed.name}
                  </option>
                ))}
              </select>
                    
                    </div>
                    </div>
                  </div>  
                </div>
                <div className="flex flex-row gap-2 m-4 mt-6">
               
                  <button onClick={saveAssumption}
                     className="cursor-pointer font-semibold text-center w-[150px] py-4  bg-primaryColor text-white rounded-2xl outline-none border-none">
                      <div>{getText("Save", "حفظ")}</div>
                    </button>
                </div>
              </div>
              
            </div>
        </>
      );
}

export default EditAssumption