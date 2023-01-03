import React from 'react'
import "./Home.css"
import welcomlandingpage from "../../Assets/welcom-landing-page.png";
import sidegeorge from "../../Assets/side-george.png"
import sidedapp from "../../Assets/side-dapp.png"
import { useNavigate } from "react-router-dom"
function Home({ setState, state }) {
    const Navigate = useNavigate()
    const changePage = () => {
        setState(!state)
        Navigate("/dashboard")
    }
    return (
        <div className=''>
            <button href="#" data-lang="contribute" onClick={changePage}>CONTRIBUTE NOW!</button>
            <div className="footer">
                <h1 data-lang="footer">© 2023 Galaxy Finance. All rights reserved</h1>
            </div>

        </div>
    )
}

export default Home