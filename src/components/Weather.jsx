import React, { useEffect, useRef, useState } from 'react'
import search from '../assets/search.png'
import clear from '../assets/clear.png'
import cloud from '../assets/cloud.png'
import drizzle from '../assets/drizzle.png'
import rain from '../assets/rain.png'
import snow from '../assets/snow.png'
import humidity from '../assets/humidity.png'
import wind from '../assets/wind.png'

const Weather = () => {
    
    const inputRef = useRef()
    const [weatherData , setWeatherData] = useState(false)
    const allIcons = {
        "01d" : clear,
        "01n" : clear,
        "02d" : cloud,
        "02n" : cloud,
        "03d" : cloud,
        "03n" : cloud,
        "04d" : drizzle,
        "04n" : drizzle,
        "09d" : rain,
        "09n" : rain,
        "10d" : rain,
        "10n" : rain,
        "13d" : snow,
        "13n" : snow,
    }

    const searchFunc = async(city) => {
        if(city===""){
            alert("please enter city name")
        }
        try {
             const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=73729b512f9bf5b7db9503d6956997a9`
             const response = await fetch(url)
             const data = await response.json();
             const icon = allIcons[data.weather[0].icon] || clear;
             console.log(data)
             setWeatherData({
                humidity : data.main.humidity,
                windSpeed : data.wind.speed,
                temperature : Math.floor(data.main.temp),
                location : data.name,
                icon : icon,
             })
        } catch (error) {
            console.log(error)
            setWeatherData(false)
        }
       }
       
       useEffect(()=>{
        searchFunc("New York");
       },[])

  return (
    <div className='flex items-center justify-center'>
        <div className='rounded-lg min-w-80 min-h-96 mt-10 bg-[#442dbf]'>
        <div className='mt-7 px-4 flex '>
        <input ref={inputRef} type="text" placeholder='Search for any city' className='ml-5 py-1 border-none outline-none pl-3 rounded-3xl w-56'/>
        <div className='bg-white text-black rounded-full p-4 ml-3'>
        <img src={search} alt="" className='w-5 h-5' onClick={()=>searchFunc(inputRef.current.value)}/>
        </div>
         </div>
         {weatherData?<>
            <div className='flex justify-center'>
         <div >
            <img src={weatherData.icon} alt="" className='w-36' />
            <p className='text-5xl text-white flex justify-center'>{weatherData.temperature}°C</p>
            <p className='text-4xl  text-white flex justify-center'>{weatherData.location}</p>
        </div>
         </div>
         
        <div className='mt-7 h-20 flex space-x-20'>
            <div className='hum mt-3 ml-3 flex h-10'>
                <img src={humidity} alt="" />
                <div className='ml-3'>
                    <p className='text-sm text-white '>{weatherData.humidity}%</p>
                    <p className='text-sm text-white'>Humidity</p>
                </div>
            </div>

            <div className='hum mt-3 ml-3 flex h-10'>
                <img src={wind} alt="" />
                <div className='ml-3'>
                    <p className='text-sm text-white '>{weatherData.windSpeed}km/h</p>
                    <p className='text-sm text-white mr-2'>WindSpeed</p>
                </div>
            </div>
        </div>
         </>:<></>}
        
        </div>
       
    </div>
  )
}

export default Weather
