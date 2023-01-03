import React, { useState, useEffect } from "react";
import Footer from '../../Component/Footer/Footer'
import "./LuckyBox.css";
import Picture1 from "../../Assets/nft/nftbox.svg";
import greencolor from "../../Assets/LuckyDraw/Ellipse5.png";
import colorcircle from "../../Assets/LuckyDraw/Ellipse6.png";
import colorcircle1 from "../../Assets/LuckyDraw/Ellipse7.png";
import colorcircle2 from "../../Assets/LuckyDraw/Ellipse8.png";
import colorcircle3 from "../../Assets/LuckyDraw/Ellipse9.png";
import colorcircle4 from "../../Assets/LuckyDraw/Ellipse10.png";
import common from "../../Assets/nft/common.png";
import rare from "../../Assets/nft/rare.png";
import epic from "../../Assets/nft/epic.png";
import uncommon from "../../Assets/nft/Uncommon.png";
import legendery from "../../Assets/nft/legendary.png";
import mythic from "../../Assets/nft/mythic.png";
import { toast } from "react-toastify";
import { HashLink } from "react-router-hash-link";
import NftTicket from "../nftTicket/nftTicket";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { connectionAction } from "../../redux/connection/actions";
import { glxTokenAddress, glxtokenAbi } from "../../utilities/glx";
import {
  tokenLpStaking,
  tokenLpStakingAbi,
} from "../../utilities/tokenLptokenStaking";
import { nftAddress, nftAbi } from "../../utilities/nft";
import { ThreeDots } from "react-loader-spinner";
import Web3 from "web3"; 

const web3EndPoint = new Web3(
  "https://data-seed-prebsc-1-s3.binance.org:8545/"
);
const LuckyBox = () => {
  const dispatch = useDispatch();
  let acc = useSelector((state) => state.connect?.connection);
  const [show, setShow] = useState(false);
  const [value, setValue] = useState(1);
  let [iglxValue, setIglxValue] = useState("0");
  let [totalCost, setTotalCost] = useState("");
  let [mintArray, setMintArray] = useState([]);
  let [loader, setLoader] = useState(false);

  const connectWallet = () => {
    dispatch(connectionAction());
  };

  const mintingPrice = async () => {
    let tokenContract = new web3EndPoint.eth.Contract(nftAbi, nftAddress);
    let value = await tokenContract.methods.MinitngPrice().call();
    let newValue = parseFloat(web3EndPoint.utils.fromWei(value));
    console.log("newValue", newValue);
    setTotalCost(newValue);
  };

  const getCurrentNfts = async () => {
    try {
      if (acc == "No Wallet") {
        toast.info("Not Connected");
      } else if (acc == "Wrong Network") {
        toast.info("Not Connected");
      } else if (acc == "Connect Wallet") {
        toast.info("Not Connected");
      } else {
        const web3 = window.web3;
        const nftContract = new web3.eth.Contract(nftAbi, nftAddress);
        let totalIds = await nftContract.methods.walletOfOwner(acc).call();
        totalIds = totalIds.slice(-value);
        console.log("current items", totalIds);
        let simplleArray = [];
        totalIds.forEach(async (ids) => {
          if (ids <= 35000) {
            let imageUrl = common;
            let imageName = `Common #${ids}`;
            let tokenId = ids;
            simplleArray = [...simplleArray, { imageUrl, imageName, tokenId }];
            setMintArray(simplleArray);
          } else if (ids > 35001 && ids <= 57000) {
            let imageUrl = uncommon;
            let imageName = `Uncommon #${ids}`;
            let tokenId = ids;
            simplleArray = [...simplleArray, { imageUrl, imageName, tokenId }];
            setMintArray(simplleArray);
          } else if (ids > 57001 && ids <= 76000) {
            let imageUrl = rare;
            let imageName = `Rare #${ids}`;
            let tokenId = ids;
            simplleArray = [...simplleArray, { imageUrl, imageName, tokenId }];
            setMintArray(simplleArray);
          } else if (ids > 76001 && ids <= 90000) {
            let imageUrl = epic;
            let imageName = `Epic #${ids}`;
            let tokenId = ids;
            simplleArray = [...simplleArray, { imageUrl, imageName, tokenId }];
            setMintArray(simplleArray);
          } else if (ids > 90001 && ids <= 98500) {
            let imageUrl = legendery;
            let imageName = `Legendary #${ids}`;
            let tokenId = ids;
            simplleArray = [...simplleArray, { imageUrl, imageName, tokenId }];
            setMintArray(simplleArray);
          } else if (ids > 98501 && ids <= 100000) {
            let imageUrl = mythic;
            let imageName = `Mythic #${ids}`;
            let tokenId = ids;
            simplleArray = [...simplleArray, { imageUrl, imageName, tokenId }];
            setMintArray(simplleArray);
          }
        });
        setShow(true);
      }
    } catch (e) {
      console.error("error while get current nfts", e);
    }
  };

  const handleMint = async () => {
    try {
      if (acc == "No Wallet") {
        toast.info("Wallet not connected");
      } else if (acc == "Wrong Network") {
        toast.info("Wrong Network");
      } else if (acc == "Connect Wallet") {
        toast.info("Please connect wallet");
      } else {
        if (totalCost > iglxValue) {
          toast.info("Your balance is not enough");
        } else {
          setLoader(true);
          const web3 = window.web3;
          let nftContract = new web3.eth.Contract(nftAbi, nftAddress);
          await nftContract.methods.mint(value).send({
            from: acc,
          });
          toast.success("successfully mint");
          setLoader(false);
          getCurrentNfts();
          balances();

          // setShow(true);
        }
      }
    } catch (e) {
      console.log("e", e);
      toast.error("Failed");
      setLoader(false);
    }
  };
  let [animationState, setAnimationState] = useState(true);
  let [animationState1, setAnimationState1] = useState(false);

  const Plus = async () => {
    let tokenContract = new web3EndPoint.eth.Contract(nftAbi, nftAddress);
    let tokenValue = await tokenContract.methods.MinitngPrice().call();
    let limitValue = await tokenContract.methods
      .MaxLimitPerTransaction()
      .call();
    let newValue = web3EndPoint.utils.fromWei(tokenValue);
    if (value < limitValue) {
      setValue((value) => value + 1);
      setTotalCost(newValue * (value + 1));
    } else {
      toast.error("limit increase");
    }
  };

  const Miuns = () => {
    if (value > 1) {
      setTotalCost((totalCost) => totalCost - 50000);
      setValue((value) => value - 1);
    }
  };

  const balances = async () => {
    const web3 = window.web3;
    let tokenStaking = new web3.eth.Contract(tokenLpStakingAbi, tokenLpStaking);
    let value = await tokenStaking.methods._balances(acc).call();
    let newValue = parseFloat(web3.utils.fromWei(value));
    setIglxValue(newValue);
  };

  useEffect(() => {
    balances();
    mintingPrice();
  }, [acc]);
  useEffect(() => {
    let interval = setInterval(() => {
      setAnimationState((prevState) => !prevState);
      setAnimationState1((prevState) => !prevState);
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="luckdraw">
      <div className="container luckyDrawMain mt-4">
        <div className="row d-flex justify-content-center mb-4 ">
          <div className="col-11 lucky_draw_border mb-5 ">
            <div className="row ">
              <div className="col-12 d-flex justify-content-end p-3">
                {/* <IoClose /> */}
              </div>
            </div>
            <div className="row ">
              <div className="col-12">
                <div className="row lucky_draw_top d-flex justify-content-evenly ">
                  <div className=" col-md-12 col-lg-3 col-xl-1 col-sm-12  "></div>
                  <div className="col-md-12 col-xl-8 col-sm-12  text-center d-flex justify-content-center align-items-center flex-column">
                    <div className="btn_bg lucky_draw_heading lucky_draw_heading2 pe-5 ps-5 rounded-pill mt-4">
                      <div className="d-flex pos-rel lucky_heading">
                          NFT LUCKY DRAW
                      </div>
                    </div>
                    <div className="mt-4 lucky_draw_text text-center" style={{color: "white"}}>
                      Mint NFT Ticket and get awesome Treasure X NFT card !
                    </div>
                  </div>
                  <div className="col-md-12 col-xl-3 col-sm-12 button_responsive">
                    <div className="p-2 float-end">
                      <HashLink to="/myNft">
                        <button className="button">My NFT</button>
                      </HashLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mb-5">
              <div className="col-12 col-lg-12 col-sm-12 mt-lg-5">
                <div className="row d-flex justify-content-center ">
                  <div className="col-lg-6 col-sm-12 col-md-12 d-flex justify-content-center">
                    <div className="row d-flex justify-content-center">
                      <div className="col-10 col-md-10 col-lg-10 pic-bg justify-content-center">
                        <img src={Picture1} className="img-fluid mt-3" style={{borderRadius: "4%", width: "270px"}} alt=""/>
                      </div>
                      <div className="col-12 col-md-12 col-sm-12 col-lg-12 detail_bg_lucky">
                        <div className="row d-flex justify-content-center mbl_padding">
                          <div className="col-2 col-md-2 color1">
                            <div class="d-flex flex-column pt-2 pb-2">
                              <div class="text-center">
                                <img
                                  src={greencolor}
                                  className="img-fluid"
                                  width={"15px"}
                                  alt=""
                                />
                              </div>
                              <div class="green_text text-center">35.0%</div>
                              <div class="green_text text-center">
                                <b>Common</b>
                              </div>
                            </div>
                          </div>
                          <div className="col-2 col-md-2 color2">
                            <div class="d-flex flex-column pt-2 pb-3">
                              <div class="text-center">
                                <img
                                  src={colorcircle}
                                  className="img-fluid"
                                  width={"15px"}
                                  alt=""
                                />
                              </div>
                              <div class="green_text text-center">22.0%</div>
                              <div class="green_text text-center">
                                <b>Uncommon</b>
                              </div>
                            </div>
                          </div>
                          <div className="col-2 col-md-2 color3 ">
                            <div class="d-flex flex-column pt-2 pb-3">
                              <div class="text-center">
                                <img
                                  src={colorcircle1}
                                  className="img-fluid"
                                  width={"15px"}
                                  alt=""
                                />
                              </div>
                              <div class="green_text text-center">19.0%</div>
                              <div class="green_text text-center">
                                <b>Rare</b>
                              </div>
                            </div>
                          </div>
                          <div className="col-2 col-md-2 color4">
                            <div class="d-flex flex-column pt-2 pb-3">
                              <div class="text-center">
                                <img
                                  src={colorcircle2}
                                  className="img-fluid"
                                  width={"15px"}
                                  alt=""
                                />
                              </div>
                              <div class="green_text text-center">14.0%</div>
                              <div class="green_text text-center">
                                <b>Epic</b>
                              </div>
                            </div>
                          </div>
                          <div className="col-2 col-md-2  color5">
                            <div class="d-flex flex-column pt-2 pb-3">
                              <div class="text-center">
                                <img
                                  src={colorcircle3}
                                  className="img-fluid"
                                  width={"15px"}
                                  alt=""
                                />
                              </div>
                              <div class="green_text text-center">8.5%</div>
                              <div class="green_text text-center">
                                <b>Legendry</b>
                              </div>
                            </div>
                          </div>
                          <div className="col-2 col-md-2 color6">
                            <div class="d-flex flex-column pt-2 pb-3">
                              <div class="text-center">
                                <img
                                  src={colorcircle4}
                                  className="img-fluid"
                                  width={"15px"}
                                  alt=""
                                />
                              </div>
                              <div class="green_text text-center">1.5%</div>
                              <div class="green_text text-center">
                                <b>Mythic</b>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-6  col-md- col-lg-6 detail_bg_lucky detail_bg_2"
                    style={{ height: "auto" }}
                  >
                    <div className="row mt-3 Point_bg2">
                      <div className="col-12 ">
                        <div className="d-flex justify-content-between mt-3">
                          <div className="align-self-center balance_text">
                            Balance:
                          </div>
                          <div className="align-self-center">
                            <span>
                              <b>
                                {iglxValue.toLocaleString(undefined, {
                                  minimumFractionDigits: 0,
                                  maximumFractionDigits: 3,
                                })}
                              </b>
                               iGLX Point
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-12 borderLine "></div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-12">
                        <div className="text-center luckyDrawAmount_text">
                          Lucky Draw Amount
                        </div>
                      </div>
                    </div>
                    {/* ************************************************************************************** */}
                    <div className="row mt-3 d-flex justify-content-center">
                      <div className=" col-sm-6 ">
                        <div className="row d-flex justify-content-around align-items-center">
                          <button
                            className=" col-sm-6 d-flex align-items-center  Minusbox-1 gap-2"
                            onClick={Miuns}
                          > -
                            <div className="text-center">
                              <i class="fa-solid fa-minus"></i>
                            </div>
                          </button>
                          <div className="col-4  d-flex align-items-center justify-content-center Textbox">
                            <div className="text-center inputText">{value}</div>
                          </div>
                          <button
                            className="col-3  d-flex align-items-center Plusbox-1"
                            onClick={Plus}
                          > +
                            <div className="text-center">
                              <i class="fa-solid fa-plus"></i>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* ************************************************************************************** */}
                    <div className="row mt-4">
                      <div className="col-12 d-flex justify-content-center ">
                        <div className="textBox-2">
                          <div className="d-flex justify-content-around align-items-center mt-3">
                            <div className="align-self-center total_text">
                              Total Cost
                            </div>
                            <div className="align-self-center total_text_1">
                            <span>
                                <b>
                                {totalCost.toLocaleString(undefined, {
                                  minimumFractionDigits: 0,
                                  maximumFractionDigits: 0,
                                })}
                                <span style={{paddingLeft:"2px"}}>iGLX</span>
                                </b>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* ************************************************************************************** */}
                    <div className="row mt-4">
                      <div className=" text-center text_2">
                        Maximum 3 NFTs PER tx
                      </div>
                    </div>
                    {/* ************************************************************************************** */}
                    <div className="row mt-4 d-flex justify-content-center mb-4">
                      <div className="col-sm-8 d-flex justify-content-around">
                        <div>
                          <button
                            className="btn_mint rounded-pill"
                            onClick={() => {
                              handleMint();
                            }}
                          >
                            {loader ? (
                              <ThreeDots
                                height="20"
                                width="40"
                                radius="9"
                                color="black"
                                ariaLabel="three-dots-loading"
                                wrapperStyle={{ justifyContent: "center" }}
                                wrapperClassName=""
                                visible={true}
                              />
                            ) : (
                              <>Mint</>
                            )}
                          </button>
                        </div>
                        <div>
                          <HashLink to="/myNft">
                            <button className="btn_myNft rounded-pill">
                              My NFT
                            </button>
                          </HashLink>
                        </div>
                      </div>
                    </div>
                    {/* ************************************************************************************** */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* **************************Modal******************************* */}
      {show && (
        <Modal
          className="model"
          show={show}
          size="xl"
          backdrop="static"
          keyboard={false}
          dialogClassName="modal-100w"
          onHide={() => setShow(false)}
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <NftTicket mintingArray={mintArray} />
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
}

export default LuckyBox;
