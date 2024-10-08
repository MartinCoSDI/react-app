import React, { useEffect, useState } from "react";
import "./This.css";
import "./This_tailwind.css"
import TrendlineBar from './PlotTrendLineBar';
//import BarHorizontal from "./PlotBarHorizontal";
import Trendline from './PlotTrendLine';
//import Bar from "./PlotBar";
//import Plot from 'react-plotly.js';
import Gadget from "./gadget";
import Plot from 'react-plotly.js';
import { useStateValue } from "../StateProvider";

function This() {
    const [{user, cond_test, user_email, user_color, test}, dispatch] = useStateValue();
    
  //https://martinco.pythonanywhere.com/api/today
    const [year_data, setYear_Data] = useState(null);
    const fetchDatafunc  = async(url, dataset) => {
        try {
            const response = await fetch(url
            );
            const jsonData = await response.json();
            dataset(jsonData);
        }
        catch(error){
            console.error('Erro fetching data:' , error);
        }
    };

    const [order, setOrder] = useState();


    //http://127.0.0.1:5000/api/year
    //https://martinco.pythonanywhere.com/api/year
    //https://martinco.pythonanywhere.com/api/year_new
    useEffect(() => {
        fetchDatafunc('https://martinco.pythonanywhere.com/api/year_new', setYear_Data);
    },[])
        

    //http://127.0.0.1:5000//api/order_trend_dashboard
    useEffect(() => {
        fetchDatafunc('https://martinco.pythonanywhere.com/api/order_trend_dashboard', setOrder);
    },[])
  
    

    //http://127.0.0.1:5000/api/delivery_rate_over_time
    const [x_datadeliveryrate, setX_DataDeliveryRate] = useState();
    
    const [y_datadeliveryrate, setY_DataDeliveryRate] = useState();
        
    useEffect(() =>{
        const fetchData = async() => {
            try {
                const response = await fetch('https://martinco.pythonanywhere.com/api/delivery_rate_over_time');
                const jsonData = await response.json();
                setX_DataDeliveryRate(jsonData.Total);
                setY_DataDeliveryRate(jsonData.Tatol);
            }
            catch(error){
                console.error('Erro fetching data:' , error);
            }
        };
    
        fetchData();
    },[]);
   
    //https://martinco.pythonanywhere.com/api/year_items
    const [item_year, setItem_Year] = useState(2024);
   
    const handleItemYear = (event) => {
        setItem_Year(event.target.value);
    }

    const [item, setItem] = useState(null);
    useEffect(() => {
        fetchDatafunc('https://martinco.pythonanywhere.com/api/year_items', setItem);
    },[])

    //http://127.0.0.1:5000/api/top_5_vendor
    //https://martinco.pythonanywhere.com/api/top_5_vendor
    const [vendors, setVendor] = useState(null);
    useEffect(() => {
        fetchDatafunc('https://martinco.pythonanywhere.com/api/top_5_vendor', setVendor);
    },[])

    const [shipping_days, setShipping_Days] = useState(null);
    useEffect(() => {
        fetchDatafunc('https://martinco.pythonanywhere.com/api/date_ship', setShipping_Days);
    },[])

    const [temp, setTemp] = useState();
    const [control, setControl] = useState(false);

    const tempdata = {
        A: {value1: 10, value2: 20, value3: 30},
        B: {value1: 20, value2: 30, value3: 40},
        C: {value1: 30, value2: 40, value3: 50},

    }

    const category = Object.keys(tempdata)

    const handleGraph1click = (e) => {

        const category = e.points[0].x;
        
        setTemp(category);
        setControl(true);
    }
    
    useEffect(() => {
        if (control !== false){
            console.log(temp)
            setControl(false)
        }

    }, [control])

    

    if (vendors === null) {
        return <div>Loading...</div>
    }

    if (year_data === null) {
        return <div>Loading...</div>
    }
    
    if (shipping_days === null) {
        return <div>Loading...</div>
    }



  return (
    <section className="report">
        <div className="div-one">
            <div className="area one">

                {
                    Object.entries(year_data).map(([key,value]) => (
                    <div className="report-card" key={key}>
                        <h3 className="card-title">{key}</h3>
                        {test ? <p className="number">{value[String(test)]}</p>
                            : <p className="number">{value['total']}</p>
                        }
                    </div>
                ))}
            </div>

            <div className="area two">
            
                <h3 className="card-title">Value and Quantity Trend Monthly</h3>
                <div className="trendline">
                        {order && 
                                (
                                    order['2024'] && 
                                    (
                                    <Trendline xaxis = {order['2024'].month} yaxis ={order['2024'].order} xname ='Month' yname = 'Orders' name = 'Orders over Month' width = {350} height={300}></Trendline>
                                    )
                                )
                            }
                </div>
            </div>  

            <div className="area two">
                <h3 className="card-title">Delivery Rate</h3>
                <p className="number">5,000</p>
                <div className="trendline">
                    <Trendline xaxis = {x_datadeliveryrate} yaxis ={y_datadeliveryrate} xname ='Month' yname = 'Percentage' name = 'Delivery Rate over Month' width = {350} height={300} ></Trendline>
                </div>
            </div>     
        </div>

        <div className="div-one">
            <div className="area two gau">
                <Gadget className='data-delivery' min ={shipping_days.start} middle_1 = {shipping_days.mid_1} middle_2 = {shipping_days.mid_2} max ={shipping_days.end}/>
                
            </div>

            <div className="area two">
                <h3 className="card-title">Value and Quantity Percentage Change Over Month</h3>
                <div className="grid-img-test" id = 'test'>
                {item && 
                    (
                        item[item_year] && 
                        ((
                          <TrendlineBar xaxis = {item[item_year].Month} yaxis = {item[item_year].Items} ybar ={item[item_year].Percent_Change}  xname ='Month' yname = 'Items' name = 'Orders over Month' width = {350} height={300}></TrendlineBar>

                          ))
                    )
                }
                </div>
            </div>  

            <div className="area two">
                <h3 className="card-title">Top 5 vendors</h3>
                <p className="number">5,000</p>
                
                
                <table className="vendor_table">
                    <thead>
                        <tr>
                            <th>Vendor</th>
                            <th>Quantity</th>
                            <th>Spend</th>
                        </tr>
                    </thead>
                    <tbody>

                    {
                    Object.entries(vendors).map(([key,value]) => (
                        <tr key={key}>
                            <td>{key}</td>
                            <td>{value.quantity}</td>
                            <td>{value.value}</td>
                        </tr>
                ))}
                        
                        
                    </tbody>
                </table>
                
                
                
            </div>     
        </div>


        
    </section>
    
  )
}

export default This;
