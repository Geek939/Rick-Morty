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
  }, 1000);

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
           
          <img className='animate-pulse h-screen' src="/img/fondo.png" alt=""></img>
          <h2 className='text-white text-4xl font-black animate-bounce'>L o a d i n g . . . </h2>
          </div>
        
        ) : ( 
        
        <div className='bg-black h-full w-full flex flex-col items-center justify-center'>
          <img className='h-60 pt-10' src="/img/name.png" alt="Tittle" />
          <form className='mt-10 mb-10 flex' onSubmit={handleSubmit}>
            <input className=' bg-zinc-800' id='searchValue' type="text" placeholder='         Search your dimension' />
            <div className='h-12 w-14 bg-emerald-400 flex items-center justify-center rounded-r-2xl'>
            <button className='font-bold' type="submit">Search</button>
            </div>
          </form>
          
          
          <LocationInfo location = {location}/>
          
          <section className='text-white bg-zinc-900 font-medium grid grid-cols-3 gap-7 grid-flow-col'>
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
