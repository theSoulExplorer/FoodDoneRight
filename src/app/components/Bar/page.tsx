"use client"
import { useEffect, useState } from "react"

export default function Bar(){
    // const data = await fetch("localhost:3000/api/getfood");
    const [stores,setStores] = useState([]);
    const [lat,setLat] = useState(0);
    const [lon,setLon] = useState(0);
    const fetchApiData = async(lat:Number,lon:Number) => {
      const res = await fetch("/api/getfood",{
        method:"POST",
        body:JSON.stringify({
          lat,
          lon
        })
      })
      const data = await res.json();
      setStores(data.stores);
      console.log(stores);
      
    }
    useEffect(() => {
      if('geolocation' in navigator){
        navigator.geolocation.getCurrentPosition(({coords}) => {
          const {latitude,longitude} = coords;
          setLat(latitude);
          setLon(longitude);
        })
      }
    },[]);
    useEffect(()=>{
      if(lat && lon){
        fetchApiData(lat,lon);
      }
    },[lat,lon])
    return (
      <div>
      <h1>Stores near you</h1>
      {stores?.length > 0 && stores.map(store => (
        <div
        className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
      >
        <div>
          <h2 className="font-bold text-2xl">{store.name}</h2>
          <div>{store.address}</div>
          <p className="text-blue-600">{store.dist.calculated.toFixed(2)} metres away</p>
        </div>
      </div>
      ))}
      </div>
    )
  }
  