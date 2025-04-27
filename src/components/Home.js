import React from 'react'
import webimg from '../images/webpage.jpg'

const Home = () => {

  return (

    <div className='grid-container'>
      <div className={'grid-child-1'}>
        <h1 className={'typewriter'}> Welcome to EduBridge</h1>
        <h4 className={'typewriter'}>Your one stop solution!</h4>
      </div>
      <div className='grid-child 2'
          style={{
            backgroundImage: `url(${webimg})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            height:'90vh',
            marginTop:'-30px',
          }}
      >
      </div>
    </div>
  )
}

export default Home