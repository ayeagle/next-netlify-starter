import Waves from "@components/pomodomo/Waves";
import Break from '@components/pomodomo/Break';
import Button from "@components/pomodomo/Button";
import NavBar from "@components/bio/navbar";
import BasicPageTop from "@components/bio/BasicPageTop";
import BasicPageBottom from "@components/bio/BasicPageBottom";
import SVGSpacers from "@components/bio/SVGSpacers";
import Resizer from "@components/functional/Resizer";
import { useEffect, useState } from "react";
import PNGSpacers from "@components/bio/PNGSpacers";
import styles from './master.module.css';
import Iceland from "@components/bio/Iceland";




export default function Coding() {

    const [height, updateHeight] = useState(0)
    const [width, updateWidth] = useState(0)

    // console.log("this is the height (start) ==> " + height)
    //     console.log("this is the width (start) ==> " + width)


    useEffect(() => {
        // Update the height and width state when the component is mounted
        updateHeight(window.innerHeight)
        updateWidth(window.innerWidth)
        console.log("this is the height (useeffect) ==> " + height)
        console.log("this is the width (useeffect) ==> " + width)

        function handleWindowResize() {
            // Update the height and width state when the window is resized
            updateHeight(window.innerHeight)
            updateWidth(window.innerWidth)
        }

        // Add the event listener
        window.addEventListener('resize', handleWindowResize)

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleWindowResize)
        }
    }, [])


    return (
        <div className={styles.master}>
            <BasicPageTop />
            <NavBar />
            <span>
                <img src="/IMGassets/me.png" className={styles.image} />
                <div className={styles.image_text} style={{ top: (`200px`) }} >Self-taught frontend programmer and product enthusiast with a passion for building and scaling customer-obsessed solutions.</div>
            </span>
            <SVGSpacers type="bot" num="1" width={width} />
            <h2>Self-Learned Curriculum</h2>
            <div className={styles.list}>
                <div>
                    <li> Web Dev Bootcamp </li>
                    <li> FB/Meta new engineer Bootcamp curriculum</li>
                    <li> Road to React </li>
                    <li> Full Stack Serverless </li>
                    <li> Designing Data-Intensive Applications</li>
                    <li> System Design Book</li>

                </div>
            </div>
            <SVGSpacers type="top" num="5" width={width} />
            <SVGSpacers type="bot" num="3" width={width} />
            <h2>Projects</h2>
            <div className={styles.list}>
                <div className={styles.ind_list}> Work
                    <li> Created and maintain multibillion row structured datasets on user reports </li>
                    <li> Created multiple PHP methods to extract information from production code to be used in Hive tables</li>
                </div>
                <div></div>
                <div className={styles.ind_list}>Personal
                    <li> Personal Website </li>
                    <li> Pomodomo</li>
                </div>
            </div>
            <SVGSpacers type="top" num="1" width={width} />
            <SVGSpacers type="bot" num="2" width={width} />
            <h2>Languages + Stack</h2>
            <div className={styles.list}>
                <div>Favorite Stack
                    <li> ReactJS </li>
                    <li> Node.js </li>
                    <li> ExpressJS </li>
                    <li> Java </li>
                    <li> AWS RDS </li>
                    <li> PostgreSQL </li>

                </div>
            </div>
            <div className={styles.list}></div>
            <div className={styles.list}>
                <div>Other Languages/Frameworks
                    <li> Python </li>
                    <li> PHP </li>
                    <li> Vanilla JS </li>
                    <li> Axios </li>
                    <li> Bootstrap </li>
                    <li> Presto </li>
                    <li> Scuba </li>

                </div>
            </div>

            <SVGSpacers type="top" num="4" width={width} />
            <div className={styles.box}>
                <BasicPageBottom />
            </div>


        </div>
    )
}
