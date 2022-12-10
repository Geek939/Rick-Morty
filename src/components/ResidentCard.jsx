import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'



const ResidentCard = ({urlResident}) => {
    const [resident, setResident] = useState()

useEffect(() => {

axios.get(urlResident)
    .then(res => setResident(res.data))
    .catch(err => console.log(err))

},[])

  return (

    <div>
        <article>
            <header>
                <img src={resident?.image} alt="" />
                <div>
                    <div>CIRCLE</div>
                    <span>{resident?.status}</span>
                </div>
            </header>

        <section>
        <h2>{resident?.name}</h2>
        <ul>
            <li><span>Specie: </span>{resident?.species}</li>
            <li><span>Origin: </span>{resident?.origin.name}</li>
            <li><span>Episodes where apper: </span>{resident?.episode.length}</li>
        </ul>

        </section>


        </article>
    </div>
  )
}

export default ResidentCard