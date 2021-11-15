import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './inviteSection.scss';
import { Rate } from 'antd';
import 'antd/dist/antd.css';


export default function InviteSection() {

    const [shiftIdArray, setShiftIdArray] = useState([]);
    const [shiftData, setShiftData] = useState([]);
    const [allHospitals, setAllHospitals] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [userID, setUserID] = useState("");
    const [myDetail, setMyDetail] = useState({});
    const [inviteDetails, setInviteDetails] = useState([])


    function inputHandler(e) {
        e.preventDefault();
        setUserID(e.target.value);

    }
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

    async function getAllUsers() {
        try {
            const allUsersRes = await axios.get('http://localhost:5000/api/users');

            setAllUsers(allUsersRes.data);

        } catch (err) {

            console.log(err + "users Server Err ")
        }
    }


    function getUserDetail(userid) {
        for (let u = 0; u < allUsers.length; u++) {
            if (allUsers[u].id == userid) {
                setMyDetail(allUsers[u])

            }
        }
        console.log(myDetail)
        // const thatUser=allUsers

    }

    function getInvitedCard() {
        const UserShiftIdArray = []
        // let shiftIdArray=[]
        for (let each = 0; each < myDetail.invited.length; each++) {
            const invited = myDetail.invited[each].shiftId;
            UserShiftIdArray.push(invited)

        }
        setShiftIdArray(UserShiftIdArray)
        console.log(shiftIdArray)

    }
    function showInvitedCard() {
        const invites = []
        console.log(shiftIdArray)

        for (let u = 0; u < shiftIdArray.length; u++) {
            shiftData.map((each) => {
                if (each.shiftId == shiftIdArray[u]) {
                    invites.push(each)
                    // console.log(each)
                }

            })
        }
        setInviteDetails(invites)


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

    useEffect(
        () => {
            getAllHospital()
        }, [])

    useEffect(
        () => {
            getShift()
        }, [])
    useEffect(
        () => {
            getAllUsers()
        }, [])


    return (
        <>
            <div className="userID">
                userid:
            <input
                    type="text"
                    onChange={inputHandler}
                />
                <button onClick={() => { getUserDetail(userID) }}>This is my userID</button>
            </div>
            <button onClick={() => { getInvitedCard() }}>Show My invited ShiftID</button>
            <button onClick={() => { showInvitedCard() }}>Show My Shift invited card</button>

            {/* <div className="inviteShiftSection">
            {inviteDetails}
            </div> */}


            {inviteDetails.map((each, index) => {
                return (
                    <>



                        <div key={`${each} ${index}`} className="CardWrapper">
                            <div key={each.shiftId} className="InviteTimeCard">
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
                                <div className="btn--decline">DECLINE</div>
                                <div className="btn">APPLY</div>
                            </div>

                        </div>
                    </>
                )
            })}









        </>


    )
}
