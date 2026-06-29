import React, { useEffect, useState} from 'react';

const Test = () => {
    const [apidata, setApidata] = useState([])

    async function callingapi() {
      const response = await fetch("https://dummyjson.com/recipes")
      const data = await response.json();
      console.log(data.recipes)
      const res = data.recipes;
      setApidata(res)
    }

    // function callingapi(){
    //     fetch("https://dummyjson.com/recipes")
    //     .then((res)=> res.json())
    //     .then((data)=> setApidata(data.recipes)) 
    // }
    
    useEffect(()=>{
        console.log("App Component Rendered")
        callingapi()
        console.log(apidata)
    },[])
    return (
        <>
            <h1>Hello Test</h1>
            <h2>Hello Test 2</h2>
            <h3>Hello Test 3</h3>
            {
              apidata.map((item)=>{
                return (
                  <div key={item.id}>{item.name}</div>
                )
              })
            }
        </>

    )
}

export default Test