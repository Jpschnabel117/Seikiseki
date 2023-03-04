import { useState } from "react";
import "../css/App.css";
import Header from "./header/Header";
import Container from "./container/Container";
import Profilepage  from "../pages/profilepage";
import { Route, Routes } from "react-router-dom";


function App(props) {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Container />} />
        <Route path="/profile" element={<Profilepage />} />
      </Routes>

      {/* <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button> */}
    </div>
  );
}

export default App;
