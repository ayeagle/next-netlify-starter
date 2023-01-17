
import Resizer from "@components/functional/Resizer";
import { useEffect, useState } from "react";
import styles from './xmas.module.css'
import Spacer from "@components/bio/Spacer";
import LogActivity from "@components/DBcomponents/LogActivity";
import Typing from "@components/bio/Typing";
import Login from "@components/xmas/Login";
import UserSelect from "@components/xmas/UserSelect";
import { getGroupObject, updateGroupObject } from "@components/xmas/DB/curr_group_data";
import Gifts from "@components/xmas/Gifts";
import XMAS_GetGroupObject from "@components/xmas/DB/XMAS_GetGroupObject";
import NavBar from "@components/xmas/NavBar";
import Explore from "@components/xmas/Explore";
import AddGift from "@components/xmas/AddGift";

let curr_group = getGroupObject()
// let name = ''

// let userCheckVal = localStorage.getItem('current_user')
// let group_id = localStorage.getItem('group_id')

export default function Home() {

    const [groupData, setGroupData] = useState('')
    const [groupName, setGroupName] = useState('')
    const [oneOpen, setOneOpen] = useState(false)
    const [currPageName, setCurrPageName] = useState('explore')
    const [runOnce, setRunOnce] = useState(0)
    const [dataChange, setDataChange] = useState(false)


    const [currPageCode, setCurrPageCode] = useState(<Explore oneOpen={oneOpen} setOneOpen={setOneOpen} groupData={groupData} setGroupData={setGroupData} dataChange={dataChange} setDataChange={setDataChange}/>)

    // const [pageRouter, setPageRouter] = useState()

    // if (runOnce === 0) {
    //     validate()
    //     setRunOnce(2)
    //     // console.log('fetching object')
    //     // // curr_group = getGroupObject();
    //     // console.log('retrieved object')
    //     // console.log(curr_group)
    // }
    if (dataChange){
        setDataChange(false)
    }

    const validate = () => {
        // let promise = XMAS_ValidateLogin(userCheckVal)
        let promise = XMAS_GetGroupObject(localStorage.getItem('current_user'), localStorage.getItem('group_id'))


        promise.then((data) => {
            // setValidName(!data)
            // console.log(!data + " this is in the inverse data")
            // console.log("data: " + data)
            // // console.log("isNew: " + isNew)
            // // setAddPrompt("Successful Login")
            // console.log("curr_group data available just before redirect")
            // console.log(curr_group)
            // redirect(<UserSelect groupData={curr_group}/>)
            updateGroupObject(curr_group)
            curr_group = data
            setGroupData(data)
            if (runOnce === 0) {
                    // setRunOnce(2)
                    // location.href = '/giftly/home'
                    // console.log('fetching object')
                    // // curr_group = getGroupObject();
                    // console.log('retrieved object')
                    // console.log(curr_group)
                }
            // location.href = '/giftly/home'

            // getGroup()
            // redirect('/xmas/create')
        }
        )
    }

    const sendPage = () => {
        switch (currPageName) {
            case 'explore':
                setCurrPageCode(<Explore oneOpen={oneOpen} setOneOpen={setOneOpen} groupData={groupData} setGroupData={setGroupData} dataChange={dataChange} setDataChange={setDataChange}/>)
                return
            case 'add':
                setCurrPageCode(<AddGift />)
                return
            case 'profile':
                setCurrPageCode()
                return
            default:
                setCurrPageCode(<Explore oneOpen={oneOpen} setOneOpen={setOneOpen} groupData={groupData} setGroupData={setGroupData} dataChange={dataChange} setDataChange={setDataChange}/>)
                return
        }
    }

    //       case "main":
    //         return <Main />

    useEffect(() => {
        sendPage()
        // updateGroupObject(groupData)

    }, [currPageName, setCurrPageName, groupData, setGroupData, dataChange, setDataChange])

    useEffect(() => {
        setGroupName(localStorage.getItem('group_name'))
        validate()
        // setGroupData(curr_group)
        console.log("this is the group_name : " + groupName)
    }, [dataChange, setDataChange])


    console.log("groupdata")
    console.log(groupData)
    console.log("groupdata")


    return (
        <>
            <div style={{ backgroundColor: oneOpen ? "rgba(0, 0, 0, 0.657)" : '' }}>
                <div className={styles.gift_header_container}>
                    <div className={styles.gift_header}>
                        <div >{groupName}</div>
                        {/* <img src="/IMGassets/bow.png" className={styles.image} /> */}
                        <div className={styles.giftly_style}>Giftly</div>

                        <div>{groupData != '' ? groupData.gifts[1].year : ''}</div>
                    </div>
                </div>
                <NavBar currPageName={currPageName} setCurrPageName={setCurrPageName} />
                {currPageCode}
                {/* <Explore  oneOpen={oneOpen} setOneOpen={setOneOpen} groupData={groupData} setGroupData={setGroupData}/>
                <AddGift /> */}
            </div>
        </>
    )
}


// currPage={currPage} setCurrPage={setCurrPage}

//groupData.gifts[1].year