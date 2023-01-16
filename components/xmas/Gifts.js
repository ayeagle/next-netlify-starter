import React, { Component, useState, useEffect, forceUpdate } from 'react'
import styles from '@components/xmas/Gifts.module.css'

// import { useNavigate } from 'react-router-dom';
import { Redirect } from 'react-router';
import About from 'pages/about';
import XMAS_CheckUser from './DB/XMAS_CheckUser';
import XMAS_ValidateLogin from './DB/XMAS_ValidateLogin';
import XMAS_AddNewUser from './DB/XMAS_AddNewUser';

import UserPreferences from '@components/bio/UserPreferences';
// import LogActivity from '@components/DBcomponents/LogActivity';
import { getGroupObject } from './DB/curr_group_data';
import XMAS_GetGroupObject from './DB/XMAS_GetGroupObject';
import Spacer from '@components/bio/Spacer';
import XMAS_SetTaken from './DB/XMAS_SetTaken';
import { useRef } from 'react';


let curr_group = ''
let name = ''

let colors = [
    'rgba(238, 99, 82,',
    'rgba(89, 205, 144,',
    'rgba(63, 167, 214,',
    'rgba(250, 192, 94,',
    'rgba(247, 157, 132,',
    'rgba(100, 233, 238,',
    'rgba(100, 233, 238,',
    'rgba(35, 61, 77,',
    'rgba(137, 170, 230,',
    'rgba(252, 171, 100,',
    'rgba(217, 249, 165,',
    'rgba(98, 108, 102,'
]

function GETCOLOR() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return `rgba(${parseInt(color.substring(1, 3), 16)}, ${parseInt(color.substring(3, 5), 16)}, ${parseInt(color.substring(5, 7), 16)}`;
}

function getRandomColor(input) {
    return colors[input % colors.length]
}

export default function Gifts({ claimed, oneOpen, setOneOpen }) {

    const [data, setData] = useState('')
    const [runOnce, setRunOnce] = useState(0)
    const [singleGiftStyle, setSingleGiftStyle] = useState(styles.gift_box)
    const [singleGiftOpen, setSingleGiftOpen] = useState(false)
    const [singleGiftObject, setSingleGiftObject] = useState("")
    const [isClaiming, setIsClaiming] = useState(false)
    const [curr_group, setCurrGroup] = useState(getGroupObject())
    const [stale, setStale] = useState(false)
    const giftRef = useRef(null);

    // let curr_group = await getGroupObject();
    console.log("this is the single gift object")
    console.log(singleGiftObject)

    if (runOnce === 0) {
        // validate()
        setRunOnce(2)
        console.log('fetching object')
        // curr_group = getGroupObject();
        console.log('retrieved object')
        console.log(curr_group)
    }

    const giftClick = (gift_id) => {
        if (!oneOpen) {
            console.log(gift_id + "this is the gift ID passed")
            console.log("gift clicked")
            setSingleGiftStyle(styles.single_gift_box)
            setSingleGiftOpen(true)
            setOneOpen(true)
            setSingleGiftObject(curr_group.gifts.find(gift => gift.gift_id === gift_id))
        }
    }

    const exitGiftClick = (gift_id) => {
        console.log("gift UNclicked")
        setSingleGiftStyle(styles.gift_box)
        setSingleGiftOpen(false)
        setIsClaiming(false)
        setOneOpen(false)

        // setSingleGiftObject(curr_group.gifts.find(gift => gift.unique_id === gift_id))
    }

    const doNothing = (event) => {
        console.log("inner element clicked")
        event.stopPropagation();
    }

    const claimGiftCheck = (event) => {
        setIsClaiming(true)
        console.log("inner element clicked")
        event.stopPropagation();
    }

    const claimYes = () => {
        updateTaken(true, singleGiftObject.gift_id)
        goAway()
        wait(setSingleGiftOpen(false), 3000)
        setIsClaiming(false)
        setOneOpen(false)
    }

    const claimNo = () => {
        setIsClaiming(false)
    }

    function wait(fn, delay) {
        setTimeout(fn, delay);
    }

    // Create a reference to the element with the specific ID

    // Function to change styles of the element
    function goAway() {
        if (giftRef && giftRef.current) {
            //   giftRef.current.style.display = "none";
            giftRef.current.style.top = "2000vw";
            giftRef.current.style.transition = "5s";
            giftRef.current.style.display = "none"

        }
    }

    const updateTaken = (taken, gift_id) => {

        console.log("this is the taken value: " + taken)
        console.log("this is the unique_id value " + gift_id)
        // XMAS_SetTaken(taken_value, gift_unique_id)

        // let promise = XMAS_ValidateLogin(userCheckVal)
        let promise = XMAS_SetTaken(taken, gift_id)

        promise.then((data) => {
            console.log(data)
            console.log("//////////// that is the taken return value ////////////")
            setStale(true)
            location.href = '/xmas/home'

            if (!data) {
                // setAddPrompt("That group name's available!")
                // setGreenSwitch(true)
                // // setCreateNew(false)
                // move(true)
                // // getGroup()
                // curr_group.group_name = userCheckVal
                // curr_group.num_users = numUsers
                // console.log("this is the curr group after name add: ")
                // // console.log(curr_group)

                // // updateGroupObject(curr_group)
                // localStorage.setItem('group_name', userCheckVal);

                // redirect(<Create />)
            } else {
                // setAddPrompt("Hmm looks like that group name is taken...")
                // setGreenSwitch(false)
                // setCreateNew(true)
            }
            console.log('home redirect was triggered')
        }
        )
    }

    // let curr_group = getGroupObject()

    // const forceUpdate = React.useCallback(() => updateState({}), []);

    // name = user
    console.log("this is from within the gifts component")


    //DATA NOT LOADING BEFORE THE RENDER
    // console.log(curr_group)

    useEffect(() => {
        name = localStorage.getItem('current_user')
        setCurrGroup(getGroupObject())
        setStale(false)

    }, [curr_group, setCurrGroup, giftRef])
    console.log(curr_group)
    console.log("object just before render")

    //add a span to the claim button to make it more dynamic, something like a checkmark or soemthing



    return (
        <>
            {curr_group != '' ?
                (
                    <div className={styles.gift_container}>
                        {curr_group.gifts.map(function (item) {
                            if (item.requester !== name && item.taken === claimed && item.gift_id) {
                                item.color = getRandomColor(item.gift_id)
                                return (
                                    <div className={styles.gift_box} id={`gift-${item.unique_id}`} ref={giftRef} key={item.unique_id} onClick={() => giftClick(item.gift_id)} style={{ border: "10px solid " + item.color + "1)", backgroundColor: item.color + ".4)" }}>
                                        {/* <div className={styles.gift_detail}>{item.giver}</div> */}

                                        <div className={styles.gift_detail} >{item.requester}</div>
                                        <div style={{ borderRight: "2.5px solid black", width: "0", minWidth: "0%" }} />
                                        {item.details.length <= 30 ?
                                            (
                                                <div className={styles.gift_detail} >{item.details}</div>
                                            ) : (
                                                <div className={styles.gift_detail} >{item.details.substring(0, 30) + `\n...`}</div>
                                            )
                                        }
                                        {/* {item.url != '' ? <> <div style={{borderRight: "2.5px solid black"}} /> <div className={styles.gift_detail} ><a href={item.url}>Link to product</a></div> </>: <div/>}
                                    <div className={styles.claim_button}>Claim!</div> */}

                                    </div>

                                )
                            } else return
                        })
                        }
                    </div>
                ) : (
                    <div>Loading...</div>
                )
            }
            {singleGiftOpen ?
                (
                    <div className={styles.single_gift_page_container} onClick={exitGiftClick}>
                        <div className={styles.single_gift_container} onClick={doNothing} style={{ border: "10px solid " + singleGiftObject.color + "1)" }}>
                            {/* <img src="/IMGassets/bow.png" className={styles.image} /> */}

                            <div className={styles.single_gift_header}>
                                <div>For: {singleGiftObject.requester}</div> {singleGiftObject.url != '' ? <a href={singleGiftObject.url} target="_blank"><button className={styles.product_button}>Link to product</button></a> : <div>No Link {":("}</div>}
                            </div>
                            <br></br>
                            <div className={styles.single_gift_details}>
                                <div >
                                    "{singleGiftObject.details}"
                                </div>
                            </div>



                            <Spacer height={"9vw"} />
                            {/* <div className={styles.claim_button} onClick={claimGiftCheck}>Claim this gift!</div> */}
                            {isClaiming ? (
                                <div className={styles.claim_button_after}>

                                    Claiming this gift will remove it from the pool for others. Do you want to proceed?
                                    <br></br>                        <br></br>

                                    <div className={styles.single_gift_header}>
                                        <div />
                                        <div />

                                        <button className={styles.product_button} onClick={claimYes} >Yes</button>
                                        <button className={styles.product_button} onClick={claimNo} >No</button>
                                        <div />
                                        <div />

                                    </div>
                                </div>
                            ) : (
                                <div className={styles.claim_button} onClick={claimGiftCheck}>Claim this gift!</div>
                            )}

                        </div>
                    </div>
                ) : (
                    <div></div>
                )}

        </>
    )
}


