import React, { useRef, useState } from "react";

const Login = ({setToken, apiLink}) => {
  const [status, setStatus] = useState(200);

    const form = useRef();
    const login = async (e) => {
        e.preventDefault();
    const  formData = new FormData(form.current);
    try {            
        const data = await fetch(`${apiLink}/posts/log-in`, {
            method: "POST",            
            headers: {
                "Content-Type": "application/json",           
            },
            body: JSON.stringify({
                username: formData.get("username"),
                password: formData.get("password")
            })
        })
              
        const token = data.url.split("?")[1].split("=")[1];
        setToken(token)
        setStatus(200)

        console.log(data)     
        } catch (error) {
            setStatus(400)
            console.log(error)
        }
    }

    return(<div>             
    <form ref={form} onSubmit={login} id="form" action={`${apiLink}/posts/log-in`} method="POST">
      <label for="username">Username</label>
      <input name="username" placeholder="username" type="text" />
      <label for="password">Password</label>
      <input name="password" type="password" />
      {status !== 200 ? <h3>Incorrect username or password</h3> : null}
      <button>Log In</button>
    </form>
    </div>)
}


export default Login