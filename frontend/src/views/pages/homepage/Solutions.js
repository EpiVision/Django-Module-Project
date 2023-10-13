import React from 'react'
import arrows from '../../../assets/images/arrows.svg'
import sol1 from '../../../assets/images/sol-1.png'
import sol2 from '../../../assets/images/sol-2.png'
import sol3 from '../../../assets/images/sol-3.png'
import sol4 from '../../../assets/images/sol-4.svg'
const Solutions = () => {
    return (
        <section className='flex flex-col'>
            <div className='flex justify-center'>
                <img src={arrows}></img>
            </div>
            <div className=" flex justify-center text-indigo-800 text-xl font-medium font-['Roboto'] leading-normal">Hassel free solution</div>
            <div className="mt-8 flex justify-center text-slate-800 text-6xl font-bold font-['Roboto'] leading-10">Easy steps for your solution</div>
            <div className='mt-10 flex flex-col sm:flex-row justify-center gap-x-4'>
                <div className="w-80 h-64 px-6 py-12 bg-white rounded shadow flex-col justify-center items-center gap-3 inline-flex">
                    <img className="w-20 h-20" src={sol1} />
                    <div className="text-slate-800 text-xl font-medium font-['Roboto'] leading-normal">Choose a Pricing Plan</div>
                    <div className="w-64 text-center text-slate-500 text-base font-normal font-['Montserrat'] leading-tight">Cost-effective plans to make it ease for you</div>
                </div>
                <div className="w-80 h-64 px-6 py-12 bg-white rounded shadow flex-col justify-center items-center gap-3 inline-flex">
                    <img className="w-20 h-20" src={sol2} />
                    <div className="text-slate-800 text-xl font-medium font-['Roboto'] leading-normal">Setup Your Profile</div>
                    <div className="w-64 text-center text-slate-500 text-base font-normal font-['Montserrat'] leading-tight">Complete your profile to make it go and working</div>
                </div>
                <div className="w-80 h-64 px-6 py-12 bg-white rounded shadow flex-col justify-center items-center gap-3 inline-flex">
                    <img className="w-20 h-20" src={sol3} />
                    <div className="text-slate-800 text-xl font-medium font-['Roboto'] leading-normal">Camera Configuration </div>
                    <div className="w-64 text-center text-slate-500 text-base font-normal font-['Montserrat'] leading-tight">Setup cameras and configure them into system</div>
                </div>
                <div className="w-80 h-64 px-6 py-12 bg-white rounded shadow flex-col justify-center items-center gap-3 inline-flex">
                    <img className="w-20 h-20" src={sol4} />
                    <div className="text-slate-800 text-xl font-medium font-['Roboto'] leading-normal">Face Registration </div>
                    <div className="w-64 text-center text-slate-500 text-base font-normal font-['Montserrat'] leading-tight">Registration of patient’s face  needed for prediction</div>
                </div>

            </div>

        </section>
    )
}

export default Solutions
