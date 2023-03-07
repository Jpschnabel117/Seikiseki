import * as d3 from "d3";
import React, {  useState } from "react";

function Launchsitemarks({ cx, cy, r, site, launches }) {
  
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
    console.log("hello")
    //pass 
  };


  const handleClose = () => {
    setIsOpen(false);
  };

  let number = 0
  let color = "#0000006b";
  if(launches){
    number = launches.length;
    color = "#a34a4a6b";
  }


  return (
    <>
      <circle className="site"  fill={color} cx={cx} cy={cy} r={r} onClick={handleClick}>
        <title>
          {site.location_name}: long:{site.longitude} lat:{site.latitude} Launches: {number}
        </title>
      </circle>
{/*     
      {isOpen && (        
        <div className="popup">
          <h2>{site.location_name}</h2>
          {launches ? (
            <ul>
              {launches.map((launch) => (
                <li key={launch.id}>{launch.name}</li>
              ))}
            </ul>
          ) : (
            <p>No launches scheduled at this site.</p>
          )}
          <button onClick={handleClose}>Close</button>
        </div>
      )} */}
    </>
  );
}

export default Launchsitemarks;
