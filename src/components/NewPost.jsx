import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';

const NewPost = ({apiLink, token}) => {

    const form = useRef();
    const navigate = useNavigate();

    const createNewPost = async (e) => {
        e.preventDefault();
    const  formData = new FormData(form.current);

        const data = await fetch(`${apiLink}/posts`, {
            method: "POST",            
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
        navigate("/"); 
    }
    return(<div>
        <form ref={form} onSubmit={createNewPost} id="form" >
      <label for="title">Title</label>
      <input name="title" placeholder="Title" type="text" />
      <label for="text">Text</label>
      <textarea name="text" id="text" cols="30" placeholder='Text' rows="10"></textarea>     
      <button>Create new post</button>
    </form>
    </div>)
}


export default NewPost