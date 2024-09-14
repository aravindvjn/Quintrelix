import React from 'react'
import Posts from './Posts'

const HomePage = () => {
    const user={
        username:"aravind",
        caption:"Good Morning",
        like:"1200",
        comments:'13'
    }
  return (
    <div className='home-page col-sm-6 col-10'>
      <div className="container-sm">
        <Posts {...user} />
        <Posts {...user} />
      </div>
    </div>
  )
}

export default HomePage
