import React, { useState } from 'react'
import IndividualRequest from './IndividualRequest'
import demo from "../../assets/demo.jpg";

const Request = () => {
  const [request,setRequest] = useState(3)

  return (
    <div className='request col-sm-3'>
      <div className="request-fixed">
        {request>0&&<div className="request-notfication mt-3">
          <p>Friend Requests</p>
          <IndividualRequest username={"idkbro"} avatar={demo}/>
          <IndividualRequest username={"idkbro"} avatar={demo}/>
          <IndividualRequest username={"idkbro"} avatar={demo}/>
          </div>}
        
      </div>
    </div>
  )
}

export default Request
