import { useEffect, useState } from "react";
import "./app.css"

function App() {
  
  const [value, setValue] = useState("")
  const [select, setSelect] = useState([])
  const [todos, setTodos] = useState([])
  
  useEffect(() => {
    if (value.length) {
      fetch(`https://restcountries.com/v3.1/name/${value}`)
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.log(err));
    } 
    if (select.length) {
      fetch(`https://restcountries.com/v3.1/name/${select}`)
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.log(err));
    } 
    else {
      fetch('https://restcountries.com/v3.1/all')
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.log(err));
    }
  }, [value,select]);
  
  // useEffect(() => {
  //   fetch('https://restcountries.com/v3.1/all')
  //   .then((res) => res.json())
  //   .then((data) => setTodos(data))
  //   .catch ((err) => console.log(err))
  // },[change])
  return (
    <div className="App">
    
    <div className="heading mb-3">
    <h1>Where in the world?</h1>
    <p>Dark Mode</p>
    </div>
    <div className="container">
    <div className="d-flex mb-5" autoComplete="off">
    <input
    onKeyUp={(evt) => {
      if (evt.code === 'Enter') {
        setValue(evt.target.value);
        evt.target.value = null;
      }
    }} 
    className='info__input form-control w-50 input' type='text' placeholder='Search for  a country…'
    name='country'
    aria-label='search box'
    required></input>
    
    <select  onChange={(evt) => {if(evt.value === todos.region){
      setSelect(evt.target.value)
      // evt.target.value = null;
      
    }
  }}  
  className='form-control w-25 select' name='Filter by Region'>
  <option defaultValue="default">Filter by Region</option>
  <option defaultValue="Africa">Africa</option>
  <option defaultValue='America'>America</option>
  <option defaultValue='Asia'>Asia</option>
  <option defaultValue='Europe'>Europe</option>
  <option defaultValue='Oceania'>Oceania</option>
  <option defaultValue='Uzbekistan'>Uzbekistan</option>
  
  </select>
  </div>
  <ul className="list">
  {todos.map ((e) => (
    <li className="item" key={e.name.official}>{e.title}
    <img className="img" src={e.flags.png}/>
    <div className="item__body">
    <h3>{e.name.common}</h3>
    <p><strong>Population</strong> {e.population}</p>
    <p><strong>Region</strong> {e.region}</p>
    <p><strong>Capital</strong> {e.capital}</p>
    </div>
    </li>
    ))}
    </ul>
    </div>
    </div>
    );
  }
  export default App;