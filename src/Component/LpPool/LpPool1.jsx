import React, { useState, useEffect } from "react";
import "./LpPool.css";
import Picture1 from "../../Assets/nft/nft3.jpg";
import { toast } from "react-toastify";
import { IoAlertCircle, IoClose } from "react-icons/io5";
import { OverlayTrigger, Tooltip, Popover } from "react-bootstrap";
import { HashLink } from "react-router-hash-link";
import { ThreeDots } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { connectionAction } from "../../redux/connection/actions";
import { glxTokenAddress, glxtokenAbi } from "../../utilities/glx";
import {
  tokenLpStaking,
  tokenLpStakingAbi,
} from "../../utilities/tokenLptokenStaking";

function Lp_Pool1({ iglxFunc, totalBalance }) {
  const dispatch = useDispatch();
  let acc = useSelector((state) => state.connect?.connection);
  let [animationState, setAnimationState] = useState(true);
  let [animationState1, setAnimationState1] = useState(false);
  let [approveValue, setApproveValue] = useState("");
  let [stake, setStaked] = useState("0");
  let [ibrValue, setIbr] = useState("0");
  let [balanc, setBalance] = useState("0");
  let [loader, setLoader] = useState(false);
  let [unstakeLoader, setUnstkeLoader] = useState(false);
  let [redeemLoader, setRedeemLoader] = useState(false);
  let [maxFlag, setMaxFlag] = useState(false);
  let [maxValue, setMaxValue] = useState();
  let [redemValue, setRedemValue] = useState("0");
  let [iglxValue, setIglxValue] = useState();

  const connectWallet = () => {
    dispatch(connectionAction());
  };

  const staked = async () => {
    const web3 = window.web3;
    let tokenStaking = new web3.eth.Contract(tokenLpStakingAbi, tokenLpStaking);
    let staked = await tokenStaking.methods.totalGLXStaked(acc).call();
    setStaked(parseFloat(web3.utils.fromWei(staked)));

  };

  const ibr = async () => {
    const web3 = window.web3;
    let tokenStaking = new web3.eth.Contract(tokenLpStakingAbi, tokenLpStaking);
    let value = await tokenStaking.methods.rewCalculator(acc).call();
    console.log("iglx", value);
    let newValue = parseFloat(web3.utils.fromWei(value));
    console.log("iglx", newValue);
    setIbr(newValue);
  };

  const balance = async () => {
    const web3 = window.web3;
    let tokenContract = new web3.eth.Contract(glxtokenAbi, glxTokenAddress);
    let balance = await tokenContract.methods.balanceOf(acc).call();
    console.log("balance ",balance )
    setMaxValue(balance)
    setBalance(parseFloat(web3.utils.fromWei(balance)));
  };

  const maxFun = async () => {
    try {
      if (acc == "No Wallet") {
        toast.info("Wallet not connected");
      } else if (acc == "Wrong Network") {
        toast.info("Wrong Network");
      } else if (acc == "Connect Wallet") {
        toast.info("Please connect wallet");
      } else {
        const web3 = window.web3;
        let tokenContract = new web3.eth.Contract(glxtokenAbi, glxTokenAddress);
        let balance = await tokenContract.methods.balanceOf(acc).call();
        let newVal = Number(web3.utils.fromWei(balance));
        console.log("newVal", newVal);
        setMaxFlag(true);
        setApproveValue(newVal)

      }
    } catch (e) {
      console.log("e", e);
    }
  };

  const unStake = async () => {
    try {
      if (acc == "No Wallet") {
        toast.info("Wallet not connected");
      } else if (acc == "Wrong Network") {
        toast.info("Wrong Network");
      } else if (acc == "Connect Wallet") {
        toast.info("Please connect wallet");
      } else {
        const web3 = window.web3;
        let tokenStaking = new web3.eth.Contract(
          tokenLpStakingAbi,
          tokenLpStaking
        );
        if (stake == 0 && ibrValue == 0) {
          toast.error("Stake First ");
        } else if (stake == 0) {
          toast.error("Stake First ");
        } else {
          setUnstkeLoader(true);
          await tokenStaking.methods.withdrawtoken().send({
            from: acc,
          }); 

          toast.success("Transaction Confirmed");
          setUnstkeLoader(false);
          iglxFunc();
          totalBalance();
          staked();
          ibr();
          balance();
        }
      }
    } catch (e) {
      console.log("e", e);
      setUnstkeLoader(false);
    }
  };

  const Approve = async () => {
    try {
      if (acc == "No Wallet") {
        toast.info("Wallet not connected");
      } else if (acc == "Wrong Network") {
        toast.info("Wrong Network");
      } else if (acc == "Connect Wallet") {
        toast.info("Please connect wallet");
      } else {
        if (approveValue >= 500) {
          setLoader(true);
          const web3 = window.web3;
          let tokenContract = new web3.eth.Contract(
            glxtokenAbi,
            glxTokenAddress
          );
          let tokenStaking = new web3.eth.Contract(
            tokenLpStakingAbi,
            tokenLpStaking
          );
          await tokenContract.methods
            .approve(tokenLpStaking, web3.utils.toWei(approveValue.toString()))
            .send({
              from: acc,
            });
            if (maxFlag==true) {
              console.log("maxValue",maxValue)
              let balance = await tokenContract.methods.balanceOf(acc).call();
              await tokenStaking.methods
                .Stake(balance)
                .send({
                  from: acc,
                });
              toast.success("succesfully staked");
              totalBalance();
              staked();
              ibr();
              balance();
              setLoader(false);
            } 
            else {
              console.log("maxValue1",web3.utils.toWei(approveValue.toString()))
              await tokenStaking.methods
                .Stake(web3.utils.toWei(approveValue.toString()))
                .send({
                  from: acc,
                });
              toast.success("succesfully staked");
              totalBalance();
              staked();
              ibr();
              balance();
              setLoader(false);
            }
        } else {
          toast.error("value less than 500");
        }
      }
    } catch (e) {
      console.log("e", e);
      toast.error("Transaction failed");
      setLoader(false);
    }
  };

  const redem = async () => {
    try {
      if (acc == "No Wallet") {
        toast.info("Wallet not connected");
      } else if (acc == "Wrong Network") {
        toast.info("Wrong Network");
      } else if (acc == "Connect Wallet") {
        toast.info("Please connect wallet");
      } else {
        if (Number(ibrValue) <= 0) {
          toast.error("Wait for IGLX Points and GLX are locked for 7 days");
        } else {
          setRedeemLoader(true);
          const web3 = window.web3;
          let tokenStaking = new web3.eth.Contract(
            tokenLpStakingAbi,
            tokenLpStaking
          );
          let value = await tokenStaking.methods.redeem().send({
            from: acc,
          });
          toast.success("succesfully redeem but GLX lock for 7 days");
          setRedeemLoader(false);
          iglxFunc();
          ibr();
          totalBalance();
        }
      }
    } catch (e) {
      console.log("e", e);
      setRedeemLoader(false);
    }
  };

  useEffect(() => {
    let interval = setInterval(() => {
      staked();
      ibr();
      balance();
    }, 30000);
    staked();
    ibr();
    balance();
    return () => clearInterval(interval);
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
  ];
  return (
    <div className="col-3 Cardborder background_card mb-5">
      <div className="row mt-2 mb-2">
        <div className="col-3"></div>
        <div className="text-center card_title col-6 text-bold">GLX</div>
        <div className="text-end col-3">
          <OverlayTrigger
            className="toolTip_inner"
            placement="bottom-end"
            overlay={
              <Tooltip
                //   id="tooltip-disabled"
                className="toolTip_inner"
              >
                {data[0].tooltip}
              </Tooltip>
            }
          >
            <span className="fs-5">
              <IoAlertCircle />
            </span>
          </OverlayTrigger>
        </div>
      </div>
      <div className=" d-flex flex-row justify-content-around">
        <div className="card_deposit">Deposit:</div>
        <div className="card_value">
          <b>{data[0].token1}</b>
        </div>
        <div className="card_deposit">Earn:</div>
        <div className="card_value">
          <b>{data[0].token2}</b>
        </div>
      </div>
      <div className="row mt-3 d-flex justify-content-center">
        <div className="col-10 card_body ">
          <div className="row">
            <div className="col-10  d-flex justify-content-between mt-3">
              <div className="">
                <img
                  src={data[0].button}
                  className="img-fluid"
                  width={"33px"}
                  alt=""
                />
              </div>
              <div>
                <img
                  src={data[0].picture}
                  className="img-fluid"
                  width={"147px"}
                  style={{ borderRadius: "4%", height: "170px" }}
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <div className="col-11 d-flex justify-content-between">
              <div className="wallet_text">Wallet</div>
              <div className="token_text">
                {balanc.toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 3,
                })}{" "}
                GLX
              </div>
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <div className="col-11 d-flex justify-content-between">
              <div className="wallet_text">iGLX Point</div>
              <div className="token_text">
                {ibrValue.toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 3,
                })}{" "}
                iGLX
              </div>
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <div className="col-11 d-flex justify-content-between">
              <div className="wallet_text">Staked</div>
              <div className="token_text">
                {stake.toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 3,
                })}{" "}
                GLX
              </div>
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <div className="col-11 d-flex justify-content-between">
              <div className="wallet_text">Enter {data[0].EnterGLX}</div>
              <div className="button_inside d-flex justify-content-center">
                <input
                  className="input_inside_button "
                  type="text"
                  placeholder="0"
                  value={approveValue}
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title={`${approveValue.toString()}`}
                  onChange={(e) => setApproveValue(e.target.value)}
                />

                <button className="insideButton" onClick={maxFun}>
                  Max
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row d-flex justify-content-center buttoun_background">
        <div className=" mt-3">
          <button className="button_bg" onClick={Approve}>
            {loader ? (
              <ThreeDots
                height="20"
                width="40"
                radius="9"
                color="black"
                ariaLabel="three-dots-loading"
                wrapperStyle={{ justifyContent: "center" }}
                wrapperClassName="three-dots"
                visible={true}
              />
            ) : (
              <> Approve & Stake</>
            )}
          </button>
        </div>
        <div className=" d-flex  flex-row justify-content-around ">
          <button className="button_Unstake" onClick={unStake}>
            {unstakeLoader ? (
              <ThreeDots
                height="20"
                width="40"
                radius="9"
                color="black"
                ariaLabel="three-dots-loading"
                wrapperStyle={{ justifyContent: "center" }}
                wrapperClassName="three-dots"
                visible={true}
              />
            ) : (
              <> Unstake</>
            )}
          </button>
          <button className=" button_redeem" onClick={redem}>
            {redeemLoader ? (
              <ThreeDots
                height="20"
                width="40"
                radius="9"
                color="black"
                ariaLabel="three-dots-loading"
                wrapperStyle={{ justifyContent: "center" }}
                wrapperClassName="three-dots"
                visible={true}
              />
            ) : (
              <> Redeem</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Lp_Pool1;
