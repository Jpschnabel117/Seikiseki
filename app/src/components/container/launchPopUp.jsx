import React from "react";
import { useState, useEffect } from "react";

export const launchPopUp = (props) => {
  const [launchs, setLaunchs] = useState([]);
  const [loading, setLoading] = useState(true);

  return (
    <div>
      {loading ? (
        <h4 className="loading">Loading...</h4>
      ) : (
        <>
          <h1>This is a Popup!</h1>
          <p>Click the button to close.</p>
        </>
      )}
    </div>
  );
};
