import React from "react";
import { useState, useEffect } from "react";

const LaunchPopUp = (props) => {
  const [launches, setLaunchs] = useState(props.launches);
  const [loading, setLoading] = useState(true);

  return (
    <div>
      {loading ? (
        <h4 className="loading">Loading...</h4>
      ) : (
        <>
          <h1>This is a Popup!</h1>
          {launches ? (
            <h1> list of launches here</h1>
          ) : (
            <h1>no launches in time frame</h1>
          )}
          <p>Click the button to close.</p>
        </>
      )}
    </div>
  );
};


export default LaunchPopUp;
