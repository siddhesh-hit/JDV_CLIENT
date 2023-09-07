import React, { useEffect } from 'react'
import Header from './Common/Header'
import Banner from './Banner/Banner'
import Offers from './Offers/Offers'
import Quoteslist from './Quotes/Quoteslist'
import Partners from './Ourpartners/Partners'
import Footer from './Common/Footer'
import Reachus from './Reachus/Reachus'
import Testimonials from './Testimonials/Testimonials'
import Knowmore from './Knowmore/Knowmore'

const Home = () => {
 
  return (
    <div>
        <Header/>
        <Banner/>
        <Quoteslist/>
        <Offers/>
        <Partners/>
        <Knowmore/>
        <Testimonials/>
        <Reachus/>
        <Footer/>
    </div>
  )
}

export default Home