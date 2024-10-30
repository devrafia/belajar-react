/* eslint-disable react/prop-types */
import { useState } from "react";
import Header from "./components/Header";

function App() {
  const students = ["Sandhika", "Doddy", "Erik"];
  const [likes, setLikes] = useState(0);

  function handleClick() {
    setLikes(likes + 1);
  }
  return (
    <>
      <Header name="Pa Dhika" />
      <ul>
        {students.map((student) => {
          return <li key={student}>{student}</li>;
        })}
      </ul>
      <button onClick={handleClick}>Likes👍({likes})</button>
    </>
  );
}

export default App;
