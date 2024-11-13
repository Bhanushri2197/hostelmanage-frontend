import React from 'react'
import "../Styles/homePageStyle.css"
import HomePageFirst from './HomePageFirst'
import HomePageSecond from './HomePageSecond'
import HomePageBook from './HomePageBook'

function HomePage() {
 
  return (
    <div className='homePageBlock'>
        <HomePageFirst/>
        <HomePageSecond/>
        <HomePageBook/>
    </div>
  )
}

export default HomePage;