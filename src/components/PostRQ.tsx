import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PostRQ:React.FC = () => {

    // const {data, isLoading, isError, error, refetch} = useQuery({
    const {data, isLoading, isError, error} = useQuery({
        queryKey:['posts'],
        queryFn: () => {
                return axios.get('http://localhost:4000/posts');
        },
        // staleTime:5000                                 // for setting the after which data will be in stale state.
        // refetchInterval: 100                           // refetch data after a particular time.(it stop when tab is changed)
        // refetchIntervalInBackground:true               // refetch(boolean) data after a particular time.(it doesn't stop even when tab is changed)
        // enabled:false                                  // stops refetching requests every time on the mounting or after coming from other tabs
    })


    if(isLoading){
        <div>
            Data is Loading.........
        </div>
    }
    if(isError){
        <h1>{error?.message}</h1>
    }
    return (
        <>
    <div>
        {/* <button onClick={refetch} >Fetch Posts </button> */}
        
        {data?.data.map( (post:any) => (
            <>
            <div>
            <Link to={`/${post.id}`}>
            <div>{post.id}</div>
            <div>{post.title}</div>
            <div>{post.tags.map((tag:any)=>(
                <>
                <div>{tag}</div>
                </>
            ))}</div>
            </Link>
            <br/>
            </div>
            </>
        ))}
    </div>
        </>
  )
}

export default PostRQ;
