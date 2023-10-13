import React from 'react'
import logo from '../../../assets/images/epi-vision-logo.png'
const HomeFooter = () => {
    return (
        <section id='footer' className='mt-5 bg-[#11025E]'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 text-white p-12'>
                <div className='flex flex-col gap-y-4'>
                    <div className='flex flex-row '>
                        <img src={logo} className='w-[112px] ' />
                        <div className="m-4 text-gray-50 text-3xl font-medium font-['Roboto'] leading-9">Epi Vision</div>
                    </div>
                    <div>
                        <div className="w-80 text-gray-50 text-lg font-normal font-['Roboto'] leading-snug">
                            After migraines and lethargy led her to rock bottom, dietician and nutritionist
                        </div>
                    </div>
                </div>
                <div >
                    <span className="text-gray-50 text-xl font-bold font-['Roboto'] leading-normal">
                        Useful Links
                    </span>
                    <ul className='m-y-4 flex flex-col gap-y-4 mt-4'>
                        <li>Home</li>
                        <li>Service</li>
                        <li>Blogs</li>
                        <li>Doctors</li>
                        <li>About</li>
                    </ul>

                </div>
                <div >
                    <span className="text-gray-50 text-xl font-bold font-['Roboto'] leading-normal">
                        Contact
                    </span>
                    <ul className='m-y-4 flex flex-col gap-y-4 mt-4'>
                        <li>House 74, Road - 7, H-Block Bannani, Bangladesh </li>
                        <li>info@medicore.com</li>
                        <li>Blogs</li>
                        <li>(+329) 010 0214</li>
                    </ul>

                </div>
                <div >
                    <span className="text-gray-50 text-xl font-bold font-['Roboto'] leading-normal">
                        News Letter
                    </span>
                    <ul className='m-y-4 flex flex-col gap-y-4 mt-4'>
                        <li><div className="w-64 text-gray-50 text-lg font-normal font-['Montserrat'] leading-snug">Subscribe to our newsletter to get the latest blogs</div></li>
                        <li><div className="w-80 h-10 bg-gray-100 rounded" >
                        </div></li>
                        <li><div className="w-80 h-12 px-6 py-3 bg-indigo-800 rounded justify-center items-center gap-9 inline-flex">
                            <div className="text-sky-50 text-xl font-medium font-['Roboto'] leading-normal">Subscribe</div>
                        </div></li>

                    </ul>

                </div>

            </div>

        </section>
    )
}

export default HomeFooter
