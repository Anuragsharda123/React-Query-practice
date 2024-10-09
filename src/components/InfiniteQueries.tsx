// import { useInfiniteQuery, } from '@tanstack/react-query'
// import axios from 'axios'
// import React from 'react'

// const fetchFruits = ({ pageParam }) => {
//     return axios.get(`http://localhost:4000/fruits?_limit=4&_page=${pageParam}`)
// }

// const InfiniteQueries:React.FC = () => {

//     const {data, isLoading, isError, error, fetchNextPage, hasNextPage} = useInfiniteQuery({
//         queryKey:['fruits'],
//         queryFn: fetchFruits,
//         initialPageParam: 1,
//         getNextPageParam: (_lastPage, allPages)=>{
//             if(allPages.length <5){
//                 return allPages.length+1;
//             } else {
//                 return undefined;
//             }
//         }
//     });

//     // console.log("data---------", data?.pages[0].data);

//     if(isLoading){
//         return(
//             <>
//             <h1>Loading.........</h1>
//             </>
//         )
//     }
//     if(isError){
//         return(
//             <>
//             <div>{error.message} </div>
//             </>
//         )
//     }

//   return (
//     <div>
//         {data?.pages.map((page)=>{
//             return(
//                 page.data.map((fruit:any) => {
//                     return (
//                         <>
//                         <div key={fruit.id}>
//                             {fruit.name}
//                         </div>
//                         <br /><br /><br />
//                         </>
//                     )
//                 })
//             )
//         }
//         )}
//         <button onClick={fetchNextPage} disabled={!hasNextPage} >Load more data</button>
//     </div>
//   )
// }

// export default InfiniteQueries


import { useInfiniteQuery, } from '@tanstack/react-query'
import axios from 'axios'
import {useInView} from 'react-intersection-observer'
import React, { useEffect } from 'react'


const fetchFruits = ({ pageParam }) => {
    return axios.get(`http://localhost:4000/fruits?_limit=4&_page=${pageParam}`)
}

const InfiniteQueries:React.FC = () => {

    
    const {data, isLoading, isError, error, fetchNextPage, isFetchingNextPage} = useInfiniteQuery({
        queryKey:['fruits'],
        queryFn: fetchFruits,
        initialPageParam: 1,
        getNextPageParam: (_lastPage, allPages)=>{
            if(allPages.length <10){
                return allPages.length+1;
            } else {
                return undefined;
            }
        }
    });
    
    const {ref, inView} = useInView();
    // console.log("data---------", data?.pages[0].data);

    useEffect(()=>{
        if(inView){
            fetchNextPage();
        }
    }, [fetchNextPage, inView])

    if(isLoading){
        return(
            <>
            <h1>Loading.........</h1>
            </>
        )
    }

    if(isError){
        return(
            <>
            <div>{error.message} </div>
            </>
        )
    }

  return (
    <>
    <div>
        {data?.pages.map((page)=>{
            return(
                page.data.map((fruit:any) => {
                    return (
                        <>
                        <div key={fruit.id}>
                            {fruit.name}
                        </div>
                        <br /><br /><br />
                        </>
                    )
                })
            )
        }
    )}
    </div>
    <div ref={ref} > {isFetchingNextPage && "Loading....."} </div>
    </>
  )
}

export default InfiniteQueries