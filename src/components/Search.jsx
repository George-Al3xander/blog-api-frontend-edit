import React, {useEffect, useState} from "react";
import Blogs from "./Blogs";

const Search = ({blogs}) => {
    const [searchKey, setSearchKey] = useState("");
    const [results, setResults] = useState([]);
    useEffect(() => {
        if(searchKey == "") {
            setResults([])
        } else {
            let valid = new RegExp(`${searchKey.toLowerCase()}`);
                setResults(blogs.filter((item) => {   
                             
                return valid.test(item.title.toLowerCase()) == true || valid.test(item.text.toLowerCase()) == true
            
        }))
        }

    }, [searchKey])
    
    return(<div className="search">
        <input onChange={(e) => {
            setSearchKey(e.target.value)
        }} type="text" placeholder="What are you looking for?..." />

        {results.length > 0 ? <Blogs blogs={results} /> : null}
    </div>)
}

export default Search