import { useEffect, useState,  } from 'react'
import React from 'react'
import { useParams, Link } from 'react-router-dom';
import Comment from './Comment';
import CommentForm from './CommentForm';


const Blog = ({apiLink, token}) => {
    
    const {id} = useParams();    
    const [blog, setBlog] = useState({})
    useEffect(() => {
        const getBlog = async () => {
            await fetch(apiLink + "/posts/" + id)
            .then((res) => res.json())
            .then((data) => setBlog(data))
            .catch((err) => console.log(err))
        }
        getBlog();
        if(blog.comments != undefined) {
            setComments(blog.comments.reverse())
        }
    }, [blog])   
    
    const [comments, setComments] = useState([]);
    return(<>
    
    <div className='blog'>
        <div style={{display: "flex", justifyContent: "space-between"}}><h1>{blog.title}</h1> <Link to={"/" + blog._id + "/edit"}><button className='btn-status'>Edit</button></Link></div>
        <p>{blog.text}</p>
    </div>
        <div className='comments'>
            <h1>Comments</h1>
            <CommentForm id={id} />
            {blog.comments != undefined ? <ul>
              {comments.map((comment) => {
                return <Comment apiLink={`${apiLink}/posts/${blog._id}/comments/${comment.id}`} token={token} comment={comment} />
              })}  
            </ul> : null}
        </div>
    </>
    )
}


export default Blog