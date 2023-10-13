import React from 'react'
import arrows from '../../../assets/images/arrows.svg'
import sol1 from '../../../assets/images/sol-1.png'
import sol2 from '../../../assets/images/sol-2.png'
import sol3 from '../../../assets/images/sol-3.png'
import sol4 from '../../../assets/images/sol-4.svg'
import ser1 from '../../../assets/images/ser-1.png'
import ser2 from '../../../assets/images/ser-2.png'
import ser3 from '../../../assets/images/ser-3.png'
import ser4 from '../../../assets/images/ser-4.png'

const Services = () => {
    return (
        <section className='flex flex-col mt-10'>
            {/* <div className='flex justify-center'>
                <img src={arrows}></img>
            </div> */}
            <div className=" flex justify-center text-indigo-800 text-xl font-medium font-['Roboto'] leading-normal">Hassel free solution</div>
            <div className="mt-8 flex justify-center text-slate-800 text-6xl font-bold font-['Roboto'] leading-10">Our Services</div>
            <div className='mt-10 flex flex-col sm:flex-row justify-center gap-x-4'>
                <div className="w-80 h-64 px-6 py-12 bg-white rounded shadow flex-col justify-center items-center gap-12 inline-flex">
                    <div className="w-20 h-20 relative">
                        <div className="w-20 h-20 left-0 top-0 absolute " >
                            <img src={ser1}></img>
                        </div>
                        <div className="w-14 h-20 left-[11px] top-0 absolute">
                        </div>
                    </div>
                    <div className="text-slate-800 text-xl font-medium font-['Roboto'] leading-normal">Seizure Prediction </div>
                </div>

                <div className="w-80 h-64 px-6 py-12 bg-indigo-700 rounded shadow flex-col justify-center items-center gap-12 inline-flex">
                    <div className="w-20 h-20 relative">
                        <div className="w-20 h-20 left-0 top-0 absolute " >
                            <img src={ser2}></img>
                        </div>
                        <div className="w-14 h-20 left-[11px] top-0 absolute">
                        </div>
                    </div>
                    <div className="text-slate-800 text-xl font-medium font-['Roboto'] leading-normal">Seizure Forecasting</div>
                </div>
                <div className="w-80 h-64 px-6 py-12 bg-white rounded shadow flex-col justify-center items-center gap-12 inline-flex">
                    <div className="w-20 h-20 relative">
                        <div className="w-20 h-20 left-0 top-0 absolute " >
                            <img src={ser3}></img>
                        </div>
                        <div className="w-14 h-20 left-[11px] top-0 absolute">
                        </div>
                    </div>
                    <div className="text-slate-800 text-xl font-medium font-['Roboto'] leading-normal">Alarm generation </div>
                </div>
                <div className="w-80 h-64 px-6 py-12 bg-white rounded shadow flex-col justify-center items-center gap-12 inline-flex">
                    <div className="w-20 h-20 relative">
                        <div className="w-20 h-20 left-0 top-0 absolute " >
                            <img src={ser4}></img>
                        </div>
                        <div className="w-14 h-20 left-[11px] top-0 absolute">
                        </div>
                    </div>
                    <div className="text-slate-800 text-xl font-medium font-['Roboto'] leading-normal">Activity Logging </div>
                </div>
            </div>

        </section>
    )
}

export default Services
