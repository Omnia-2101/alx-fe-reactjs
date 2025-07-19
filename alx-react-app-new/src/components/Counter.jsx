import React, { useState } from "react"

export default function Counter() {
    const [count, setCount] = useState(0)

    const increment = () => {setCount(count + 1 )}
    const decrement = () => {setCount(count - 1 )}
    const reset = () => {setCount(0)}

    return(
        <div className="visit-times" style={{border:"1px solid yellow"}}>
            <h3>Number of Visits</h3>
            <p>I've been visited {count} Times</p>
            <button onClick={increment}>Increment</button>
            <button onClick={reset}>Reset</button>
            <button onClick={decrement}>Decrement</button>
        </div>
    )
}