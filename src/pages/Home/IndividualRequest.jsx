import React, { useEffect, useState } from "react";

const IndividualRequest = ({ username, avatar }) => {
  const [accept, setAccept] = useState(false);
  const [reject, setReject] = useState(false);

  useEffect(() => {}, [accept, reject]);
  return (
    <>
      {reject || accept ? null : (
        <>
          <div className="flex-sb">
            <div className="flex ">
              <img src={avatar} alt="" className="post-profile" />
              <p className="my-1">{username}</p>
            </div>
            <div>
              <button
                className="accept-request"
                onClick={() => {
                  setAccept(!accept);
                }}
              >
                {accept ? "Accepted" : "Accept"}
              </button>
              <button
                className="reject-request"
                onClick={() => {
                  setReject(!reject);
                }}
              >
                {reject ? "Rejected" : "Reject"}
              </button>
            </div>
          </div>
          <hr />
        </>
      )}
    </>
  );
};

export default IndividualRequest;
