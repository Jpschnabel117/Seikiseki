import { useState } from "react";
import "../css/App.css";
import Header from "./header/Header";
import Container from "./container/Container";


function App(props) {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Header />
      <Container />
      
      {/* <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button> */}
    </div>
  );
}

export default App;
