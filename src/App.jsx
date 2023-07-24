import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Login from './components/Login'
import Dashboard from './components/Dashboard'

function App() {
  const apiLink = "https://blog-api-backend-n9ql.onrender.com"

  const [count, setCount] = useState(0)
  const [token, setToken] = useState("");

  const createPost = async ({title, text}) => {
    await fetch(`${apiLink}/posts`, {
      method: "POST",      
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        text
      })
    })
  }

  return (
    <>
    <header>
            <h1>AnotherAdminBlog</h1>
            <nav>
                <ul>
            <li>
               <Link to={"/"}>Home</Link>
            </li>
            <li>
                <Link to={"/search"}>Search</Link>
            </li>
            <li>
                <Link to={"/new"}>New post</Link>
            </li>
            
        </ul>
            </nav>
        </header>
    <div className='content'>
        {token.length > 0 ? <Dashboard token={token} apiLink={apiLink} /> : <Login apiLink={apiLink} setToken={setToken} />}     
    </div>
    </>
    
  )
}

export default App
