import { Insights } from "@mui/icons-material"
import styles from "../../../../src/style.js"
// import { discount, robot } from "../assets"
// import GetStarted from "./GetStarted"
import bedroom from '../../../assets/images/bedroom.png'
import { Button } from "@mui/material"

const HeroSection = () => {
    return (
        <section id="home"  >
            <div class="m-10 grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-y-12">
                    <div className="mt-12 ">
                        <span className="text-7xl font-medium font-['Roboto']">Make a
                            <span className="text-blue-700"> difference </span>

                            in </span>
                        <br />
                        <span className="text-7xl font-medium font-['Roboto']">the lives of others</span>
                    </div>
                    <div>
                        <div className="w-96 h-20 text-slate-600 text-2xl font-medium font-['Montserrat'] ">
                            Bringing a stronger sense of ease, confidence, and self-mastery to those who are living with epilepsy.
                        </div>
                    </div>
                    <div className="flex flex-row mt-12">
                        <div>
                            <Button className="hover:none bg-indigo-800 text-white p-3"> Get Started</Button>
                        </div>
                        <div>  <Button className="bg-white text-indigo p-3"> Watch Video</Button></div>
                    </div>
                </div>

                <div >
                    <img src={bedroom} className="w-[20]">
                    </img>
                </div>
            </div>
        </section >
    )

}

export default HeroSection
