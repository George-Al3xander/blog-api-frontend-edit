import React ,{useState, useEffect}from 'react'
import { Link } from 'react-router-dom';
import BlogPreview from "../components/BlogPreview.jsx"
import Blogs from './Blogs.jsx';
import BlogEdit from './BlogEdit.jsx';
import Blog from "../components/Blog.jsx"
import NewPost from './NewPost.jsx';
import { Routes, Route } from 'react-router-dom';
import  Search  from "../components/Search.jsx"
const Dashboard = ({token, apiLink}) => {
const [blogs, setBlogs] = useState([]);
  useEffect(() => {
      const getBlogs = async () => {
          await fetch(apiLink + "/posts/all", {
            method: "GET",      
            headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            },
          })
          .then((res) => res.json())
          .then((data) => setBlogs(data.reverse()))
          .catch((err) => console.log(err))
      }
      
          getBlogs();
            
  }, [blogs])
   return  (<div>
        
        <Routes>
        <Route path='/' element={<Blogs token={token} apiLink={apiLink} blogs={blogs}/>}/>        
        <Route path='/:id' element={<Blog token={token} apiLink={apiLink}  blogs={blogs}/>}/>
        <Route path='/:id/edit' element={<BlogEdit token={token} apiLink={apiLink}  />}/>
        <Route path='/search' element={<Search blogs={blogs}/>}/>
        <Route path='/new' element={<NewPost token={token} apiLink={apiLink} />} />

        </Routes>
   </div>)
}


export default Dashboard