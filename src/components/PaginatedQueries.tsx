import { keepPreviousData, useQuery } from '@tanstack/react-query';
import axios from 'axios'
import React, { useState } from 'react'


const fetchFruits = (page:any) => {
    return axios.get(`http://localhost:4000/fruits?_limit=4&_page=${page}`);
}


const PaginatedQueries:React.FC = () => {

    const [page, setPage] = useState(1);


    const {data, isLoading, isError, error } = useQuery({
            queryKey:['fruits', page],
            queryFn: ()=>fetchFruits(page)
            // placeholderData: keepPreviousData                 // Rather than showing loading on pagination it retains the previous data until the new data is fetched
    })

    if(isLoading){
        return(
            <>
            <h1>
                Loading..........
            </h1>
            </>
        );
    }
    
    if(isError){
        return (
            <>
            <h1>
                {error.message}
            </h1>
            </>
        )
    }

  return (
    <div>
        {data?.data.map((item:any)=>
            <>
            <div key={item.id}>
                {item.name}
            </div>
                <br/>

            </>
        )}
        <button onClick={()=> setPage(page => page-1)} disabled={page==1?true:false}>Prev Page</button>
        <button onClick={()=> setPage(page => page+1)} disabled={page==5?true:false}>Next Page</button>
    </div>
  )
}

export default PaginatedQueries