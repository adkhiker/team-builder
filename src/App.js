import React, { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");

  const handleChange = event => {
    setName(event.target.value);
  };

  const handleSubmit = () => {
    console.log(name);
  };

  return (
    <div className="App">
      {console.log(name)}
      <form>
        <label>
          Username:
          <input type="text" onChange={event => handleChange(event)} />
        </label>
        <button onSubmit={() => handleSubmit()}>Submit!</button>
      </form>
    </div>
  );
}

export default App;
