import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import LocationInfo from './components/LocationInfo'
import ResidentCard from './components/ResidentCard'
import getRandomNumber from './utils/getRandomNumber'


function App() {

const [loading, setLoading] = useState(false)

useEffect (() => {       
  setLoading(true)

  setTimeout(() => {
    setLoading(false)
  }, 7000);

},[])
 
const [location, setLocation] = useState()
  
const getDataDimension = (idDimension)=>{

  const URL = `https://rickandmortyapi.com/api/location/${idDimension}` 
  axios.get(URL)
    .then (res => setLocation (res.data))
    .catch (err=> {alert("This dimension doesn't exist")
      console.log(err)})
}  

  useEffect( () => {
  const randomDimension = getRandomNumber()
  getDataDimension(randomDimension)
  },[])


const handleSubmit = event =>{

  event.preventDefault()
  const dimensionSearch = event.target.searchValue.value
  getDataDimension(dimensionSearch)
} 
 
  return (
    <div className="App">
    
    <section className='flex items-center justify-center'>
    {
        loading? ( 
          <div className='flex items-center justify-center h-screen w-screen bg-black gap-10 max-md:flex-col max-md:pt-10 max-md:pb-10'>
           
          <img className='animate-pulse h-screen' src="src/img/fondo.png" alt=""></img>
          <h2 className='text-white text-4xl font-black animate-bounce'>L o a d i n g . . . </h2>
          </div>
        
        ) : ( 
        
        <div className='flex items-center justify-center'>
          <form onSubmit={handleSubmit}>
            <input id='searchValue' type="text" placeholder='Search your dimension' />
            <button type="submit">Search</button>
          </form>
          
          <LocationInfo location = {location}/>
       
          <section>
            {
              location?.residents.map(urlResident => (
              
              <ResidentCard key={urlResident} urlResident={urlResident}/>
              
              
              ))
            }
          </section>
        </div>
          
      
      
        )
    }

    </section>
   
  </div>)

}

export default App
