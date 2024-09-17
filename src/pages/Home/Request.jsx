import React, { useState } from 'react'
import IndividualRequest from './IndividualRequest'
import demo from "../../assets/demo.jpg";
import Notifications from './Features/Notifications';

const Request = () => {
  const [request,setRequest] = useState(0)
  return (
    <div className='request col-sm-3'>
      
      <div className="request-fixed"><Notifications />
        {request>0&&<div className="request-notfication mt-3">
          <p>Friend Requests</p>
          <IndividualRequest username={"idkbro"} avatar={demo}/>
          </div>}
        
      </div>
    </div>
  )
}

export default Request
