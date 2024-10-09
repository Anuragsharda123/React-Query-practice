import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Get Posts
const fetchPosts = ()=> {
    return axios.get("http://localhost:4000/posts");
}

// Add Post
const addPost = (post:any) => {
    return axios.post("http://localhost:4000/posts", post)
}

const PostsRQ:React.FC = () => {

    const queryClient = useQueryClient();
    
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const {data, isLoading, isError, error} = useQuery({
    queryKey: ["posts"],
        queryFn: fetchPosts,
    })

    const {mutate} = useMutation({
        mutationFn: addPost,
        onSuccess: ()=>{
            queryClient.invalidateQueries("posts")
        }
    });

    const handleSubmit = (e:any) => {
        e.preventDefault();
        const post = {title, body};

        mutate(post);
        
        setTitle("");
        setBody("");
    }

    if(isLoading){
        return (
            <>
            <h1>
                Loading.........
            </h1>
            </>
        )
    }

    if(isError){
        return(
            <>
            <h2>
                {error.message}
            </h2>
            </>
        )
    }

  return (
    <div>

        <form onSubmit={handleSubmit} >
            <input type="text" onChange={(e)=>setTitle(e.target.value)} value={title} placeholder='Enter post Title' />
            <br />
            <input type="text" onChange={(e)=>setBody(e.target.value)} value={body} placeholder='Enter post Body' />
            <br />
            <button type='submit'>Post</button>
        </form>


      {data?.data.map( (post:any) => (
            <>
            <div>
            <Link to={`/${post.id}`}>
            <div>{post.id}</div>
            <div>{post.title}</div>
            <div>{post.body}</div>
            </Link>
            <br/>
            </div>
            </>
        ))}

        {/* <button onClick={refetch} >Load data</button> */}
    </div>
  )
}

export default PostsRQ
