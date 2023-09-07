import React from 'react'
import Knowmoreimg from '../../Image/personalized_insurance.png'
import videoicon from '../../Image/videoIcon.svg'
const Knowmore = () => {
  return (
    <div>
      <div className='container knowmore' data-aos="zoom-in-up" data-aos-duration="2000">
        <div className='row'>
          <div className='col-md-4'>
            <img src={Knowmoreimg} className='knowmoreimg' alt='knowmore' />
          </div>
          <div className='col-md-8'>
            <h3>Get <span>personalized</span> health <br />insurance advice at your <span>home</span></h3>
            <button className='knowmore_button'>Know more</button>
            <a style={{textDecoration:'none'}} href='https://www.youtube.com/watch?v=qjXgpJpSlCc&t=1s' target='_blank'>
              <div className="rbt-feature feature-style-1 align-items-center">
                <div className="icon bg-primary-opacity">
                  <img src={videoicon} />
                </div>
                <div className="feature-content">
                  <h6 className="feature-title">Watch Video</h6>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Knowmore