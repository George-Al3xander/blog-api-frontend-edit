import { useEffect, useState } from 'react'
import React from 'react'
import BlogPreview from './BlogPreview';
import { Link } from 'react-router-dom';
const Blogs = ({blogs, token, apiLink}) => {    
    return(
        <ul>
            {blogs.map((blog) => {
            return <BlogPreview token={token} apiLink={apiLink} blog={blog}/>
            })}
        </ul>
    )
}

export default Blogs