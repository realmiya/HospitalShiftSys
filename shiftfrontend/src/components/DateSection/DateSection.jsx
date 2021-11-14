import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './dateSection.scss';
import HospitalSection from "../HospitalSection"

export default function DateSection() {
    const [shiftData, setShiftData] = useState([]);
    const [allHospitals,setAllHospitals]=useState([]);
    function getWeekday(each) {
        const eachDate = new Date(each.date);
        const weekNumber = eachDate.getDay();
        const weekdayArray = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
        const currentWeekday = `${weekdayArray[weekNumber]}`;
        return currentWeekday;
    }

    function eachDateStr(each) {
        const splitEach = each.date.split(" ", 2);
        const NeedDate = splitEach[0] + " " + splitEach[1];
        return NeedDate
    }

    function getTime(each) {
        const time = each.time;
        return time

    }

    function getType(each) {
        const type = each.type;
        return type

    }
    function getPay(each) {
        const pay = each.pay;
        return pay

    }


    function getHospital(each) {
        const hospitalId = each.hospital_id;
        return hospitalId
    }

    // function hospitalDetail(hospitalId){
    //     try {


    //     } catch () {

    //     }

    // }


    useEffect(() => {
        async function getShift() {
            try {
                const allShift = await axios.get('http://localhost:5000/api/shifts');
                const allShiftData = allShift.data;
                setShiftData(allShiftData);
            } catch (err) {
                console.log(err)
            }
        }
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

        getShift();
        getAllHospital();

    }, []);

    return (
        <>

            {shiftData.map((each, index) => {
                return (
                    <>
                        <div key={`${each} ${index}`} className="timeCard">
                            {each.shiftId}
                            <div className="date">
                                <div className="weekday">{getWeekday(each)}</div>
                                <div>{eachDateStr(each)}</div>
                            </div>
                            <div className="time">{getTime(each)}</div>
                            <div className="type">{getType(each)}</div>
                            <div className="pay">{getPay(each)}</div>




                        </div>


                        <div>
                         <HospitalSection
                            hospitalId={getHospital(each)}
                            allHospitals={allHospitals}

                        /></div>
                    </>
                )
            })}






        </>


    )
}
