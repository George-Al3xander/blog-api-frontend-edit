import React, { useState, useRef } from 'react'
import moment from 'moment/moment'

const Comment = ({comment, apiLink, token}) => {
    const date = moment(comment.date).format("D MMM, YYYY")

    const [editStatus, setEditStats] = useState(false);
    const form = useRef();
    
    const editComment = async (e) => {
        e.preventDefault();
        const  formData = new FormData(form.current);

        const data = await fetch(apiLink, {
            method: "PUT",            
            headers: {
                "Authorization": `Bearer ${token}`, 
                "Content-Type": "application/json",           
            },
            body: JSON.stringify({
                username: formData.get("username").trim(),
               text: formData.get("text").trim()
            })
        })

        setEditStats(false);
    }

    const deleteComment = async () => {        
        const  formData = new FormData(form.current);

        const data = await fetch(apiLink, {
            method: "DELETE",            
            headers: {
                "Authorization": `Bearer ${token}`,                            
            }            
        })       
    }
        
    return(<>
    {!editStatus ?  <div className='comment'>
        <div><p>{comment.text}</p> 
        
        <div className='btns-comment'>
            <button onClick={() => {
                setEditStats(true)
            }}>Edit</button>
            <button onClick={deleteComment}>Delete</button>
        </div>

        </div>
        <div><h2>{comment.username}</h2> <h2>{date}</h2></div>
        
    </div> : <form onSubmit={editComment} ref={form}>    
        <label htmlFor="text">Text</label>
      <input defaultValue={comment.text} placeholder='Text' name="text" type="text" />    
      <label htmlFor="username">Username</label>  
      <input defaultValue={comment.username} name="username" placeholder="username" type="text" />      
      <button>Submit</button><button onClick={() => {
            setEditStats(false)
        }}>Cancel</button>
        </form>}
    
    </>)
}

export default Comment