import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
//-----
import localLaunchData from "../assets/launchtestdata.json";
let data = localLaunchData;
//-----
console.log("launch data: ", data);

function LaunchDetailsPage() {
  const { launchId } = useParams();

  const [launch, setLaunch] = useState(null);

  async function fetchLaunchDetails() {
    //the following below, is temporary to avoid calling the api
    // console.log("here")
    // try {
    //   const response = await fetch("../assets/launchtestdata.json");
    //   const data = await response.json();
    //   console.log(data);
    // } catch (error) {
    //   console.error("Error fetching launch data:", error);
    // }
    // let tempLaunch = data.find((obj) => obj.id === launchId);
    // console.log(tempLaunch);
    // setLaunch(tempLaunch);
    //---end temporary
  }
  const launchDet = () => {
    let tempLaunch;
    for (const launchobj of data) {
      if (launchobj.id === Number(launchId)) {
        tempLaunch = launchobj;
        break;
      }
    }

    setLaunch(tempLaunch);
  };

  useEffect(() => {
    launchDet();
    //fetchLaunchDetails();
  }, []);

  return (
    <div className="launchPage">
      <h1>Launch details page</h1>
      {launch ? <div>{launch.name}</div> : <h1>...Loading</h1>}
    </div>
  );
}

export default LaunchDetailsPage;
