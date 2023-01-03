import React, { useState, useEffect } from "react";
import "./LpPool.css";
import Picture1 from "../../Assets/LpPool/Rectangle110.png";
import Picture2 from "../../Assets/LpPool/Rectangle11012.png";
import Picture3 from "../../Assets/LpPool/Rectangle1102.png";
import Picture4 from "../../Assets/LpPool/Rectangle1103.png";
import Picture5 from "../../Assets/LpPool/Rectangle1104.png";
import Picture6 from "../../Assets/LpPool/Rectangle1105.png";
import Picture7 from "../../Assets/LpPool/Rectangle1101.png";
import ComingSoonButton from "../../Assets/nft/coming-soon1.png";
import { HashLink } from "react-router-hash-link";
import { useDispatch, useSelector } from "react-redux";
import { connectionAction } from "../../redux/connection/actions";
import { glxTokenAddress, glxtokenAbi } from "../../utilities/glx";
import {
  tokenLpStaking,
  tokenLpStakingAbi,
} from "../../utilities/tokenLptokenStaking";
import LpPool1 from "./LpPool1";
import LpPool2 from "./LpPool2";
import LpPool3 from "./LpPool3";
import Footer from '../Footer/Footer'
  
function LpPool() {
  const dispatch = useDispatch();
  let acc = useSelector((state) => state.connect?.connection);
  let [animationState, setAnimationState] = useState(true);
  let [animationState1, setAnimationState1] = useState(false);
  let [approveValue, setApproveValue] = useState("");
  let [balanc, setBalance] = useState("0");
  let [iglxValue, setIglxValue] = useState("0");

  const connectWallet = () => {
    dispatch(connectionAction());
  };

  const balances = async () => {
    const web3 = window.web3;
    let tokenStaking = new web3.eth.Contract(tokenLpStakingAbi, tokenLpStaking);
    let value = await tokenStaking.methods._balances(acc).call();
    let newValue = parseFloat(web3.utils.fromWei(value));
    console.log("iglx total value", newValue);
    setIglxValue(newValue);
  };

  const balance = async () => {
    const web3 = window.web3;
    let tokenContract = new web3.eth.Contract(glxtokenAbi, glxTokenAddress);
    let balance = await tokenContract.methods.balanceOf(acc).call();
    console.log(balance);
    setBalance(parseFloat(web3.utils.fromWei(balance)));
  };

  useEffect(() => {
    balance();
    balances();
  }, [acc]);
  useEffect(() => {
    let interval = setInterval(() => {
      setAnimationState((prevState) => !prevState);
      setAnimationState1((prevState) => !prevState);
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  const data = [
    {
      picture: Picture1,
      token1: "GLX",
      EnterGLX: "GLX",
      token2: "iGLX",
      wallet: "0 GLX",
      iGLX_Point: "0 IGLX ",
      staked: "o IGLX",
      tooltip: `Stake GLX token to earn iGLX point.
      Token Lock 7days condition.`,
    },
    {
      picture: Picture7,
      token1: "GLX",
      EnterGLX: "GLX LP",
      token2: "iGLX",
      wallet: "0 GLX",
      iGLX_Point: "0 IGLX ",
      staked: "o IGLX",
      tooltip: `Stake GLX LP token to earn iGLX point.
      LP Token Lock 10days , X 2 Reward point
      * Token can not unstake in locked period.`,
    },
    {
      picture: Picture2,
      token1: "GLX",
      token2: "iGLX",
      wallet: "0 GLX",
      iGLX_Point: "0 IGLX ",
      staked: "o IGLX",
      tooltip:
        "Stake NFT Tier Card to earn iGLX point. NFT Tier Card can unstake anytime",
      button: ComingSoonButton,
    },
    {
      picture: Picture3,
      token1: "GLX",
      token2: "iGLX",
      wallet: "0 GLX",
      iGLX_Point: "0 IGLX ",
      staked: "o IGLX",
      tooltip:
        "Stake NFT Tier Card to earn iGLX point. NFT Tier Card can unstake anytime",
      button: ComingSoonButton,
    },
    {
      picture: Picture4,
      token1: "GLX",
      token2: "iGLX",
      wallet: "0 GLX",
      iGLX_Point: "0 IGLX ",
      staked: "o IGLX",
      tooltip:
        "Stake NFT Tier Card to earn iGLX point. NFT Tier Card can unstake anytime",
      button: ComingSoonButton,
    },
    {
      picture: Picture5,
      token1: "GLX",
      token2: "iGLX",
      wallet: "0 GLX",
      iGLX_Point: "0 IGLX ",
      staked: "o IGLX",
      tooltip:
        "Stake NFT Tier Card to earn iGLX point. NFT Tier Card can unstake anytime",
      button: ComingSoonButton,
    },
    {
      picture: Picture6,
      token1: "GLX",
      token2: "iGLX",
      wallet: "0 GLX",
      iGLX_Point: "0 IGLX ",
      staked: "o IGLX",
      tooltip:
        "Stake NFT Tier Card to earn iGLX point. NFT Tier Card can unstake anytime",
      button: ComingSoonButton,
    },
  ];
  return (
    <div className="lpPoolMain" >
      <div className="container">
        <div className="row d-flex justify-content-center" style={{ paddingLeft: "10px"}}>
          <div className="col-11">
            <div className="row ">
              <div className="col-12 d-flex justify-content-end p-3">
                {/* <IoClose /> */}
              </div>
            </div>
            {/* ************************************************************************ */}
            <div className="row ">
              <div className="col-12">
                <div className="row lucky_draw_top d-flex justify-content-center">
                  <div className=" col-md-3 col-lg-3 col-xl-1 col-sm-12 "></div>
                  <div className="col-lg-12 col-xl-8 col-sm-12 text-center">
                    <div className="btn_bg lucky_draw_heading  lucky_draw_heading_pool pe-5 ps-5 mt-4 rounded-pill white">
                      <span style={{color: "#000"}}> GALAXY POOLS </span>
                    </div>
                    <div className="row">
                      <div className="col d-flex justify-content-center mt-2">
                        <div className="mt-4 lucky_draw_text  lucky_draw_text2 text-center">
                          <p className="text-center m-0 white text-bold">
                            {" "}
                            Stake $GLX to Earn iGLX Points.
                          </p>
                          <p className="text-center m-0 white text-bold">
                            {" "}
                            iGLX point gives its users access to the Lucky Boxes
                          </p>
                          <p className="text-center m-0 white text-bold">
                            {" "}
                            with the chance to receive a Golden Treasure NFT from a
                            lucky draw!
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className=" col-md-12 col-xl-3 col-sm-12  button_responsive width23">
                    <div className="p-2 me-4 float-end">
                      <button className="button btn_bg" hidden="true">
               
                      </button>
                    </div>
                    <div className="p-2 me-3 float-end">
                      <HashLink to="/myNft">
                        <button className="button mynftbtn">My NFT</button>
                      </HashLink>
                    </div>
                    <div className="p-1 me-4 float-end lpPool_box">
                      <div className="balance_text" style={{ color: "white" }}>Balance:</div>
                      <div>
                       <div className="d-flex flex-row justify-content-between ">
                        <div className="text-bold">GLX</div>
                        <div className="text-bold">
                          {balanc.toLocaleString(undefined, {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 3,
                          })}
                        </div>
                      </div>
                      <div className="d-flex flex-row justify-content-between ">
                        <div className="text-bold ">iGLX</div>
                        <div className="pb-2 text-bold ">
                          {iglxValue.toLocaleString(undefined, {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 3,
                          })}
                        </div>
                      </div>
                      </div>
 
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* ************************************************************************ */}
            <div className="row mt-4 d-flex justify-content-center">
              <div className="col-11 wrap">
                <div className="row d-flex mbl_responsive" style={{ justifyContent: "space-between"}}>
                  <LpPool1 iglxFunc={balances} totalBalance={balance} />
                  <LpPool2 iglxFunc={balances} />
                  <LpPool3 />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
    </div>
  );
}

export default LpPool;
