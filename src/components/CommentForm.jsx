import React from "react";
import { useRef } from "react";
const CommentForm = ({id}) => {
    const apiLink = "https://blog-api-backend-n9ql.onrender.com"

    
    const createComment = async () => {    
        try {            
        const respone = await fetch(`${apiLink}/posts/${id}/comments`, {
            method: "POST",            
            headers: {
            "Content-Type": "application/json",           
            },
            body: JSON.stringify({
                username: username.current.value.trim(),
                text: text.current.value.trim(),
                
            })
        }).then((res) => console.log(res))
        } catch (error) {
            console.log(error)
        }
    }
    const username = useRef();
    const text = useRef();

    const test = () => {
        console.log()
        console.log()
    }
    return(<form>
        <input required ref={username} type="text" name="username" placeholder="Name"/>
        <textarea required ref={text} placeholder="Leave a message" name="text" id="" cols="30" rows="5"></textarea>
        <button onClick={createComment}>Leave a comment</button>
    </form>)
}

export default CommentForm