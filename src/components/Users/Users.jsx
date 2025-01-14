import { useEffect, useState } from "react";

export default function Users () {
    const [data , setData] = useState([]);

    useEffect (() => {
        fetch('http://localhost:3030/data/recipes')
        .then(response => response.json())
        .then(data => {
            setData(data);
            console.log(data); // Логваме данните след като са налични
        })
    }, [])

    return(
        <div className='uesr-list'>
            <ul>
                {data.map(item => (
                    <li key={item._id}>{item.name} - <img src ={`/${item.img}`} ></img></li>
                ))}
            </ul>
        </div>
    )
}