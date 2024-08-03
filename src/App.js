import { useState } from 'react';
import './App.css';
import Authentication from './Components/auth';
import Movies from './Components/movies';



function App() {
  const [updatedtitle,setUpdatedTitle] = useState("");
const handleChange=(e)=>{
  setUpdatedTitle(e.target.value);
}
  return (
    <div className="App">
      <Authentication/>
      <Movies updatedtitle={updatedtitle} handleChange={handleChange}/>
    </div>
  );
}

export default App;
