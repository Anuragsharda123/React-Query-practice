import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useParams } from 'react-router'
import axios from 'axios'

const fetchPostDetail = (id:any) => {
  return axios.get(`http://localhost:4000/posts/${id}`);
}

const PostDetailRQ:React.FC = () => {

  const {id} = useParams();

  const {data, isLoading, isError, error} = useQuery({
    queryKey:['post', id],
    queryFn: () => fetchPostDetail(id)
  })

  if(isLoading){
    return(
      <>
      <div>Loading...........</div>
      </>
    )
  }

  if(isError){
    <div>
      {error.message}
    </div>
  }

  const {title, tags} = data?.data || {}

  return (
    <div>
      <div> {title} </div>
      <div> {tags.map((tag:any) => (
        <>
      <div>{tag}</div>
      </>
    ))} </div>
    </div>
  )
}

export default PostDetailRQ