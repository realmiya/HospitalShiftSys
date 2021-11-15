import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './cardSection.scss';
import { Rate } from 'antd';
import 'antd/dist/antd.css';

export default function CardSection() {
    const [shiftData, setShiftData] = useState([]);
    const [allHospitals, setAllHospitals] = useState([]);
    const [thisWeekShift, setThisWeekShift] = useState([]);
    const [nextWeekShift, setNextWeekShift] = useState([]);
    const [showThisWeek, setShowThisWeek] = useState(false);
    const [showNextWeek, setShowNextWeek] = useState(false);


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


    async function getShift() {
        try {
            const allShift = await axios.get('http://localhost:5000/api/shifts');

            setShiftData(allShift.data);

        } catch (err) {
            console.log(err + "allShiftError")
        }
    }

    async function getAllHospital() {
        try {
            const allHospitalsRes = await axios.get('http://localhost:5000/api/hospitals');

            setAllHospitals(allHospitalsRes.data);

        } catch (err) {

            console.log(err + "Hospital Server Err ")
        }
    }



    function getCertainHospitalDetail(hospitalID) {
        const numberHospitalId = parseInt(hospitalID);
        // console.log(allHospitals)
        // console.log(numberHospitalId);
        const name = allHospitals[numberHospitalId].hospitalName;
        // console.log(name)
        const add = allHospitals[numberHospitalId].address;
        const rate = allHospitals[numberHospitalId].reviewStar;
        const addLine1 = add.split(",")[0];
        const addLine2 = add.split(",")[1];
        return (

            <div className="hospitalText">
                <div className="hospitalName">{name}</div>
                <div className="hospitalRate"><Rate defaultValue={rate} /></div>
                <div className="address">{addLine1}</div>
                <div className="address">{addLine2}</div>
            </div>
        )
    }

    function getCurrentWeekShift() {
        setShowThisWeek(true);
        // setShowNextWeek((prev)=>(!prev));
        setShowNextWeek(false);
        const weekShiftArray = [];
        console.log("final" + shiftData.length)
        for (let eachShift = 0; eachShift < shiftData.length; eachShift++) {
            const newDateofShift = new Date(shiftData[eachShift].date)
            const newToday = new Date();
            console.log(newToday);
            const todaystr = JSON.stringify(newToday);
            const today = new Date(todaystr.split("T")[0]);
            console.log(today);
            const DateDiff = newDateofShift - today;
            if (DateDiff < 691200000) {
                weekShiftArray.push(shiftData[eachShift]);
            };


        }


        setThisWeekShift(weekShiftArray);

    }

    function getNextWeekShift() {
        setShowThisWeek(false);
        setShowNextWeek(true);
        // setShowThisWeek((prev)=>(!prev));

        const nextWeekShiftArray = [];
        console.log("final" + shiftData.length)
        for (let eachShift = 0; eachShift < shiftData.length; eachShift++) {
            const newDateofShift = new Date(shiftData[eachShift].date)
            const newToday = new Date();
            console.log(newToday);
            const todaystr = JSON.stringify(newToday);
            const today = new Date(todaystr.split("T")[0]);
            console.log(today);
            const DateDiff = newDateofShift - today;
            if (691200000 < DateDiff && DateDiff < 1296000000) {
                nextWeekShiftArray.push(shiftData[eachShift]);
            };


        }


        setNextWeekShift(nextWeekShiftArray);

    }



    useEffect(
        () => {
            getAllHospital()
        }, [])

    useEffect(
        () => {
            getShift()
        }, [])



    return (
        <>
            <div className="weekNav">
                <button onClick={() => {
                    getCurrentWeekShift()

                }}>This Week's Shifts</button>
                <button onClick={() => {
                    getNextWeekShift()

                }}>Next Week's Shifts</button>
            </div>

            {showThisWeek ? thisWeekShift.map((each, index) => {
                return (
                    <>
                        <div key={`${each} ${index}`} className="CardWrapper">
                            <div key={each.shiftId} className="timeCard">
                                <div className="date">
                                    <div className="weekday">{getWeekday(each)}</div>
                                    <div>{eachDateStr(each)}</div>
                                </div>
                                <div className="time">{getTime(each)}</div>
                                <div className="type">{getType(each)}</div>
                                <div className="pay">{getPay(each)}</div>

                            </div>

                            <div className="hospitalCard">
                                {getCertainHospitalDetail(each.hospital_id)}
                                <div className="applyButton">APPLY</div>
                            </div>

                        </div>
                    </>
                )
            })
                : nextWeekShift.map((each, index) => {
                    return (
                        <>



                            <div key={`${each} ${index}`} className="CardWrapper">
                                <div key={each.shiftId} className="timeCard">
                                    <div className="date">
                                        <div className="weekday">{getWeekday(each)}</div>
                                        <div>{eachDateStr(each)}</div>
                                    </div>
                                    <div className="time">{getTime(each)}</div>
                                    <div className="type">{getType(each)}</div>
                                    <div className="pay">{getPay(each)}</div>

                                </div>

                                <div className="hospitalCard">
                                    {getCertainHospitalDetail(each.hospital_id)}
                                    <div className="applyButton">APPLY</div>
                                </div>

                            </div>
                        </>
                    )
                })




            }

            {/* {showNextWeek&&nextWeekShift.map((each, index) => {
                return (
                    <>



                        <div key={`${each} ${index}`} className="CardWrapper">
                            <div key={each.shiftId} className="timeCard">
                                <div className="date">
                                    <div className="weekday">{getWeekday(each)}</div>
                                    <div>{eachDateStr(each)}</div>
                                </div>
                                <div className="time">{getTime(each)}</div>
                                <div className="type">{getType(each)}</div>
                                <div className="pay">{getPay(each)}</div>

                            </div>

                            <div className="hospitalCard">
                                {getCertainHospitalDetail(each.hospital_id)}
                                <div className="applyButton">APPLY</div>
                            </div>

                        </div>
                    </>
                )
            })} */}






        </>


    )
}
