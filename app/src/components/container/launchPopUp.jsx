import React from "react";
import { useState, useEffect } from "react";

export const launchPopUp = (props) => {
  const [launchs, setLaunchs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3000/getLaunchSites");
        const data = await response.json();
        setLaunchSiteData(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  console.log(launchSiteData);

  return (
  <div className="launchPop">
  { loading ? (
    <h4 className="loading">Loading...</h4>
  ) : (
    <>
    </>
  )}
  </div>
  );
};
