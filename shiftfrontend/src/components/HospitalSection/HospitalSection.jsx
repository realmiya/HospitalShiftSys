import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default function HospitalSection(props) {
    const [allHospitals,setAllHospitals]=useState([])
    const {hospitalId}=props;
    console.log(hospitalId)
    useEffect(() => {
        async function getAllHospital() {
            try {
                const allHospitals = await axios.get('http://localhost:5000/api/hospitals');
                const allHospitalsData = allHospitals.data;
                setAllHospitals(allHospitalsData);
                console.log(allHospitals)
            } catch (err) {
                console.log(err)
            }
        }
        getAllHospital();
    }, []);


    function getCertainHospital(){

    }


    return (
        <div>
            
        </div>
    )
}
