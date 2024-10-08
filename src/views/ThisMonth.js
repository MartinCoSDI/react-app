import React, { useEffect, useState } from "react";
import "./ThisMonth.css";
import TrendlineBar from './PlotTrendLineBar';
import BarHorizontal from "./PlotBarHorizontal";

function Month() {

  //https://martinco.pythonanywhere.com/api/today
  const [month_data, setMonth_Data] = useState(null);
  const fetchDatafunc  = async(url, dataset) => {
    try {
        const response = await fetch(url);
        const jsonData = await response.json();
        dataset(jsonData);
    }
    catch(error){
        console.error('Erro fetching data:' , error);
    }
};

  useEffect(() => {
      fetchDatafunc('https://martinco.pythonanywhere.com/api/month', setMonth_Data);
  },[])

  //http://127.0.0.1:5000/api/year_month_order_with_para
  const [value, setValue] = useState(null);
  useEffect(() => {
    fetchDatafunc('https://martinco.pythonanywhere.com/api/year_month_order_with_para', setValue);
},[])



    const [x_year, setX_Year] = useState(null);

    const [x_month, setX_Month] = useState(null);
    const handleYear = (event) => {
      setX_Year(event.target.value);
  }
    const handleMonth = (event) => {
          setX_Month(event.target.value);
  }

  //https://martinco.pythonanywhere.com/api/year_month_order_vendor_with_para
  const [vendor_value, setVendor_Value] = useState(null);
  useEffect(() => {
    fetchDatafunc('https://martinco.pythonanywhere.com/api/year_month_order_vendor_with_para', setVendor_Value);
  },[])

  const [vendor_year, setV_Year] = useState(null);

  const [vendor_month, setV_Month] = useState(null);
  const handleV_Year = (event) => {
    setV_Year(event.target.value);
}
  const handleV_Month = (event) => {
        setV_Month(event.target.value);
}

 
   

  return (


  <section className="report-month">
    <h1 className="title">Today Purchase</h1>
    <div className="area-one-month">
    {month_data ? (
          
      Object.entries(month_data).map(([key,value]) => (
        <div className="report-card" key={key}>
            <h3 className="card-title">{key}</h3>
            <p>{value}</p>
        </div>
      ))) : 
      (
        <p>Loading...</p>
      )
  } 

    </div>
    <div className="area-one-month">
    <h1 className="title">Today Purchase</h1>

                <label>Year:</label><input value={x_year} onChange={handleYear}></input>
                <label>Month:</label><input value={x_month} onChange={handleMonth}></input>          
           
                <div className="grid-img-test" id = 'test'>
                {value && 
                    (
                                    value[x_year] && 
                                    (value[x_year][x_month] && (
                                    <TrendlineBar xaxis = {value[x_year][x_month].Weekday} yaxis ={value[x_year][x_month].Value} ybar ={value[x_year][x_month].Orders}  xname ='Weekday' yname = 'Orders' name = 'Orders over Month'></TrendlineBar>
                                    ))
                    )
                }
      </div>
           
           
           
            </div>

     <div className="area-one-month">
     <h1 className="title">Today Purchase</h1>

                <label>Year:</label><input value={vendor_year} onChange={handleV_Year}></input>
                <label>Month:</label><input value={vendor_month} onChange={handleV_Month}></input>          
           
                <div className="grid-img-test" id = 'test'>
                {vendor_value && 
                    (
                        vendor_value[vendor_year] && 
                        (vendor_value[vendor_year][vendor_month] && (
                        <BarHorizontal xaxis = {vendor_value[vendor_year][vendor_month].Orders} yaxis ={vendor_value[vendor_year][vendor_month].Vendor}  xname ='Orders' yname = 'Vendor' name = 'Orders over Month per Vendors'></BarHorizontal>
                        ))
                    )
                }
        

      </div>
       </div>
  </section>

  )
}

export default Month;
