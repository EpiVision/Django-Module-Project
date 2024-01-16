import React from 'react'
import banner from '../../../assets/images/banner.png'
import { Button } from '@mui/material'
const Banner = () => {
    return (
        <section id="banner" className=''>
            <div className='flex flex-col sm:flex-row'>
                <div className=''>
                    <img src={banner} className=' ' />
                </div>
                <div className='bg-[#4E3AB0]'>
                    <div className=' self-center'>
                        <div className=' flex flex-col '>
                            <div>
                                <div className="text-gray-50 text-xl font-medium font-['Roboto'] leading-normal">Busy in stuff</div>
                            </div>
                            <div><div className="text-gray-50 text-6xl font-bold font-['Roboto'] leading-10">Virtual health care</div></div>
                            <div><div className="w-96 text-gray-50 text-2xl font-normal font-['Montserrat'] leading-7">All medicore services are available in web and mobile app versionswith fast services responses</div></div>
                            <div>
                                <Button className='bg-white text-indigo-800'>START CHAT</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Banner
