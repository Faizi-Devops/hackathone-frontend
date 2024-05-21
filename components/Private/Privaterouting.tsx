"use client"
import { useEffect } from "react";
import { useRouter } from 'next/navigation'

const Privaterouting = () =>{
    const router = useRouter()
    useEffect(()=>{
        a();

    },[])
    let a = () =>{
        let a = localStorage.getItem("usertoken");
       if(!a){
        router.push('/');
       }
    }
    return(
        <div>


        </div>
    )
}
export default Privaterouting;