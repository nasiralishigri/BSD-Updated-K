
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbars from './Component/Navbars/Navbars';
import Home from './Component/Home/Home';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import { useState } from 'react';
import PrivateComponent from './Component/PrivateComponent/PrivateComponent';
import Sidebar from "./Component/Sidebar/Sidebar"
import DashBoard from './Component/DashBoard/DashBoard';
import MyTeam from './Component/MyTeam/MyTeam';
import Details from './Component/Details/Details';
import LpPool from './Pages/LpPool'
import LuckyBox from './Pages/LuckyBox'
import useEagerConnect from './hooks/useEagerConnect'
import Inventory from './Pages/Inventory'
import Marketplace from './Pages/Marketplace'
import Launchpad from './Pages/Launchpad'
import DappList from './Pages/DappList'
import NftMinter from './Pages/NftMinter'
import Swap from './Pages/Swap'
function App() {
  const [state,setState] = useState(false)
// const nextPage =()=>{
//   setState(true)
//   console.log("state", state);
// }

useEagerConnect()
  return (
    <div className="App">
      <BrowserRouter>
      <Navbars state={state}/>
      <Routes >
      <Route extact path='/' element={<Home setState={setState} state={state}/>}/>
      <Route element={<PrivateComponent state={state}/>}>
        
          <Route path='/dashboard' element={<DashBoard/>}/>
          <Route path='/team' element={<MyTeam/>}/>
          <Route path='/details' element={<Details/>}/>
          <Route path='/lppool' element={<LpPool/>}/>
          <Route path='/luckybox' element={<LuckyBox/>}/>
          <Route path='/nftminter' element={<NftMinter/>}/>
          <Route path='/inventory' element={<Inventory/>}/>
          <Route path='/marketplace' element={<Marketplace/>}/>
          <Route path='/launchpad' element={<Launchpad/>}/>
          <Route path='/dapplist' element={<DappList/>}/>
          <Route path='/swap' element={<Swap/>}/>

      </Route>
      </Routes>
      </BrowserRouter>
      
      {/* <Home/> */}
    </div>
  );
}

export default App;
