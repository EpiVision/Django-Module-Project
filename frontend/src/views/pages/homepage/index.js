import React from 'react'
import NavBar from './NavBar'
import HeroSection from './HeroSection'
import Solutions from './Solutions'
import Services from './services'
import HomeFooter from './HomeFooter'
import Banner from './Banner'
const homepage = () => {
    return (
        <div className='w-full m-10 overflow-hidden'>
            <div className='mt-0'>
                <NavBar />
            </div>

            <div className='mt-5'>
                <HeroSection />
            </div>
            <div className='mt-5'>
                <Solutions />
            </div>
            <div className='mt-5'>
                <Services />
            </div>
            <div className='mt-5'>
                <Banner />
            </div>
            <div className='mt-5'>
                <HomeFooter />
            </div>
        </div>
    )
}

export default homepage
