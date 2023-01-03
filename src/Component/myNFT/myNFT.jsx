import React, { useEffect, useState } from "react";
import "./myNFT.css";
import circle from "../Assets/Images/VectorCircle-01.png";
import PaginatedItems from "./nft";
import { HashLink } from "react-router-hash-link";
import { useDispatch, useSelector } from "react-redux";
import { connectionAction } from "../../Redux/connection/actions"
import { nftAddress, nftAbi } from "../../utilities/nft";

function MyNFT() {
  let [animationState, setAnimationState] = useState(true);
  let [animationState1, setAnimationState1] = useState(false);

  useEffect(() => {
    let interval = setInterval(() => {
      setAnimationState((prevState) => !prevState);
      setAnimationState1((prevState) => !prevState);
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="luckdraw">
      <div className="container luckyDrawMain mt-5">
        <div className="row d-flex justify-content-center mb-4 ">
          <div className="col-11 mb-5 ">
            <div className="row ">
              <div className="col-12 d-flex justify-content-end p-3">
                {/* <IoClose /> */}
              </div>
            </div>
            <div className="row ">
              <div className="col-12">
                <div className="row lucky_draw_top d-flex justify-content-evenly ">
                  <div className="col-md-3 col-lg-0 col-xl-1 col-sm-12 "></div>
                  <div className="col-lg-12 col-xl-9 col-sm-12 text-center d-flex justify-content-center align-items-center flex-column">
                    <div className="btn_bg lucky_draw_heading pe-5 ps-5 mynft_responsive rounded-pill ">
                      <div className="d-flex pos-rel ">
                        <span className={animationState ? "header header--pushDownOne" : "header"} > MY
                        </span>
                        &nbsp;
                        <span
                          className={animationState1 ? "header header--pushDownTwo" : "header"} > NFT
                        </span>
                        <span className="">
                          <img src={circle} className="img-fluid circle_luckydraw_myNFT" width={"50px"} alt="" />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 col-xl-2 col-sm-12  button_responsive">
                    <div className="p-2 float-end">
                      <HashLink to="/myNft">
                        <button className="button">My NFT</button>
                      </HashLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-5 mb-5">
              <div className="col-12 col-lg-12 col-sm-12 d-none d-xl-block">
                <PaginatedItems itemsPerPage={3} />
              </div>
              <div className="col-12 col-lg-12 col-sm-12 d-none d-xl-none d-lg-block">
                <PaginatedItems itemsPerPage={2} />
              </div>
              <div className="col-12 col-lg-12 col-sm-12 d-block d-lg-none d-xl-none">
                <PaginatedItems itemsPerPage={1} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyNFT;
