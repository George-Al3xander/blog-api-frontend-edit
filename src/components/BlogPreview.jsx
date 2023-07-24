
import React, { useState }  from 'react'
import moment from 'moment/moment'
import { Link } from 'react-router-dom';
const BlogPreview = ({blog, apiLink, token}) => {   
    const date = moment(blog.date).format("L");
    const [pubStatus, setPubStatus] = useState(blog.publication_status)

    const changePublicationStatus = async (id) => {
        await fetch(`${apiLink}/posts/${id}/status`, {
            method: "PUT",      
            headers: {
            "Authorization": `Bearer ${token}`,           
            },
        }).then(() => {
            setPubStatus((prev) => !prev)
        })
    }
   

    return(
        <li key={blog._id} className='blog-preview'>
            <div className='blog-preview-header'>
                <div>
                    <Link to={"/" + blog._id}><h1>{blog.title}</h1></Link>
                    <h2>{date}</h2>
                </div>

                <div className='blog-preview-comment'>                        
                    <button className='btn-status' onClick={async () => {
                        await changePublicationStatus(blog._id);
                    }}>
                        {pubStatus ? "Unpublish" : "Publish"}
                    </button>
                    <Link to={"/" + blog._id + "/edit"}><button className='btn-status'>Edit</button></Link>
                </div>
            </div>
            <p>{blog.text}</p>            
        </li>
    )
}


export default BlogPreview