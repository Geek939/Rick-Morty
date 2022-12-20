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
  }, 5000);

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
          <div className='flex items-center justify-center h-screen w-screen bg-black gap-10 max-md:flex-col max-md:pt-3 max-md:pb-3'>
           
          <img className='animate-pulse h-4/6 w-auto' src="/img/fondo.png" alt=""></img>
          <h2 className='text-white text-4xl font-black animate-bounce'>L o a d i n g . . . </h2>
          </div>
        
        ) : ( 
        
        <div className='bg-black h-full w-full flex flex-col items-center justify-center min-h-screen'>
          
          <h1><img className='h-60 pt-10 pl-3 pr-3' src="/img/name.png" alt="Tittle" /></h1>
          
          <form className='mt-10 mb-10 flex gap-1' onSubmit={handleSubmit}>
            <input className=' bg-zinc-800 text-amber-400 font-extrabold' id='searchValue' type="text" placeholder='   Search your dimension 1 - 126' />
            <div className='h-12 w-14  bg-emerald-400 flex items-center justify-center rounded-r-2xl hover:bg-emerald-800'>
            <button className='font-bold' type="submit">Search</button>
            </div>
          </form>
          
          
          <LocationInfo location = {location}/>
          
          <section className='text text-emerald-500 font-normal text-center font-serif grid grid-cols-3 ml-3 mr-3 max-md:grid-cols-2 gap-10 mb-12'>
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
