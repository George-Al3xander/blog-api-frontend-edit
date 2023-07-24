import React, { useState, useEffect, useRef}  from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';

const BlogEdit = ({apiLink, token}) => {
    const navigate = useNavigate();
    const {id} = useParams(); 
    const form = useRef()   
    const [blog, setBlog] = useState({})
    useEffect(() => {
        const getBlog = async () => {
            await fetch(apiLink + "/posts/" + id)
            .then((res) => res.json())
            .then((data) => setBlog(data))
            .catch((err) => console.log(err))
        }
        getBlog();        
    }, [blog]) 
    const madeChanges = async (e) => {
        e.preventDefault();
    const  formData = new FormData(form.current);
    try {            
        const data = await fetch(`${apiLink}/posts/${blog._id}`, {
            method: "PUT",            
            headers: {
                "Authorization": `Bearer ${token}`, 
                "Content-Type": "application/json",           
            },
            body: JSON.stringify({
                title: formData.get("title").trim(),
               text: formData.get("text").trim()
            })
        })
           

        console.log(data)   
        navigate("/" + blog._id);  
        } catch (error) {            
            console.log(error)
        }
    }
    return(<div className='blog'>
          
                     
            <form ref={form} onSubmit={madeChanges} id="form" action={`${apiLink}/posts/${blog._id}`} method="PUT">
      <label for="username">Title</label>
      <input type="text" name='title' defaultValue={blog.title}/>
      <label for="password">Text</label>
      <textarea defaultValue={blog.text} name="text"  cols="30" rows="10">{blog.text}</textarea>  
     <div className='btns'>
        
      <button>Submit changes</button>
      <Link to={"/" + blog._id}><button>Cancel</button></Link>
     </div>
    </form>
       
        </div>
        )
}

export default BlogEdit
