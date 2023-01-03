import React, { useState } from "react";
import address from "../../Assets/address.png";
import wallet from "../../Assets/wallet.png";
import runningtime from "../../Assets/running-time.png";
import deposittime from "../../Assets/deposit-time.png";
import dailycoins from "../../Assets/daily-coins.png";
import dailyplayer from "../../Assets/daily-player.png";
import dailywalletwithcash from "../../Assets/daily-wallet-with-cash.png";
import lendenergy from "../../Assets/lend-energy.png";
import detaildeposit from "../../Assets/detail-deposit.png";
import detailgroup from "../../Assets/detail-group.png";
import detailwithraw from "../../Assets/detail-withraw.png";
import troncurrency from "../../Assets/tron-currency.png";
import "./Dashboard.css";
import Modal from "react-bootstrap/Modal";
import modalX from "../../Assets/modal-x.png";
import Footer from '../Footer/Footer';
import { useWeb3React } from "@web3-react/core";
import ApproveTokens from "../../hooks/Approve";
import Deposit from "../../hooks/Deposit";
import Withdraw from "../../hooks/Withdraw";
import DepositBySplit from "../../hooks/DepositBySplit";
import TransferBySplit from "../../hooks/TransferbySplit";
import d2 from "../../Assets/d2.png"
import Button from 'react-bootstrap/Button';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
import { MdArrowBackIos } from 'react-icons/md';
import {RiRefreshFill} from 'react-icons/ri'
import attachmentunscreen from "../../Assets/DefiniteForcefulHeifer-max-1mb.gif"
import RegisterAddress from "../../hooks/Register";
import CheckReferalAddress from "../../hooks/CheckReferel";



function DashBoard() {
  const { account } = useWeb3React();
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShowOne, setModalShowOne] = React.useState(false);
  const [modalShowTwo, setModalShowTwo] = React.useState(false);
  const [modalShow3, setModalShow3] = useState(false);

  const { approve } = ApproveTokens();
  const { deposite } = Deposit();
  const { withdraw } = Withdraw();
  const { depositBySplit } = DepositBySplit();
  const { transferBySplit } = TransferBySplit();
  const { register } = RegisterAddress();
  const { referal } = CheckReferalAddress();

  const [depositAmount, setDepositAmount] = useState("");
  const [depositBySplitAmount, setDepositBySplitAmount] = useState("");

  const [amount, setAmount] = useState("");
  const [recieverAdress, setRecieverAdress] = useState("");

  let [registerAdress, setRegisterAdress] = useState("");

  console.log("Deposit amount", depositAmount);

  const GetDeposit = async () => {
    if (account) {
      if (depositAmount == "" || 0) {
        alert("please enter value ");
        return;
      }
      if (depositAmount < 1) {
        alert("Value should be greater than 1");
        return;
      }

      try {
        await approve(depositAmount);
        // const maxDeposit = 5000;
        // const minDeposit = 100;
        // if(depositAmount <= maxDeposit && depositAmount >= minDeposit) {
        //   if (depositAmount % minDeposit == 0) 
         await deposite(depositAmount);
          // console.log("Deposit Amount",DA);
          
        // }
      } catch (e) {
        console.log("Error while new registeration", e.message);
      }
    } else {
      alert("please connect to wallet first");
    }
  };
  const GetWithdraw = async () => {
    if (account) {
      try {
        await withdraw();
        console.log("Hello");
      } catch (e) {
        console.log("e", e);
      }
    } else {
      alert("please connect to wallet first");
    }
  };
  const GetDepositBySplit = async () => {
    if (account) {
      if (depositBySplitAmount == "" || 0) {
        alert("please enter value ");
        return;
      }
      if (depositBySplitAmount < 1) {
        alert("Value should be greater than 1");
        return;
      }
      try {
        await depositBySplit(depositBySplitAmount);
      } catch (e) {
        console.log("e", e);
      }
    } else {
      alert("please connect to wallet first");
    }
  };

  const GetTransferBySplit = async () => {
    if (account) {
      if (amount == "" || 0) {
        alert("please enter value ");
        return;
      }
      if (amount < 1) {
        alert("Value should be greater than 1");
        return;
      }
      try {
        await transferBySplit(recieverAdress, amount);
      } catch (e) {
        console.log("e", e);
      }
    } else {
      alert("please connect to wallet first");
    }
  };
  const NewRegister = async () => {
    if(account){
      try {
      // const referel = await referal();
      // if(referel = registerAdress) {
        register(registerAdress);
      // } else {
      //   alert("Invalid Refer");
      // }
    } catch (e) {
      console.log("Error while new register", e.message);
    }
    } else {
      alert("please connect to wallet first");
    }
  };

  return (
    <div>
      <div className="container-fluid mt-5 mb-5">
        <div className="row">
          <div className="col-md-3 ">
            <img src={attachmentunscreen} className=" img-fluid" />
          </div>
          <div className="col-md-6 main-dashboard margin-mid">
            <div className="main-detail">
              <div className="row detail-group">
                <div className="col-6 col-md-3 col col-detail">
                  <div className="detail">
                    <img src={address} height="28" weight="28" />
                    <span>
                      <div className="detail-title">
                        <h3 data-lang="contract_address">Contract Address</h3>
                      </div>
                      <p className="contractAddress">...</p>
                    </span>
                  </div>
                </div>
                <div className="col-6 col-md-3 col col-detail">
                  <div className="detail">
                    <img src={wallet} height="28" weight="28" />
                    <span>
                      <div className="detail-title">
                        <h3 data-lang="income">Income</h3>
                      </div>
                      <p data-lang="deposit_rules6">
                        15 days per cycle. Monthly 45%
                      </p>
                    </span>
                  </div>
                </div>
                <div className="col-6 col-md-3 col col-detail">
                  <div className="detail">
                    <img src={runningtime} height="28" weight="28" />
                    <span>
                      <div className="detail-title">
                        <h3 data-lang="running_time">Platform Running Time</h3>
                      </div>
                      <p className="runningTime">00:00:00</p>
                    </span>
                  </div>
                </div>
                <div className="col-6 col-md-3 col col-detail">
                  <div className="detail">
                    <img src={deposittime} height="28" weight="28" />
                    <span>
                      <div className="detail-title">
                        <h3 data-lang="deposit_time">Deposit Time</h3>
                      </div>
                      <p className="depositCountDown">00:00:00</p>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="main-daily-detail">
              <div className="row detail-group">
                <div className="col-6 col-md-3 col-daily-detail ">
                  <div className="detailOne">
                    <img src={dailyplayer} />
                    <div className="daily-detail player">
                      <div className="daily-text">
                        <h3 data-lang="players"> Players </h3>
                        <h2 className="totalUsers text-white"> 0 </h2>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-md-3 col-daily-detail">
                  <div className="detailOne">
                    <img src={dailywalletwithcash} />
                    <div className="daily-detail lucky">
                      <div className="daily-text">
                        <h3 data-lang="lucky_pool">Lucky Pool </h3>
                        <h2 className="luckPool text-white"> 0 </h2>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-md-3 col-daily-detail">
                  <div className="detailOne">
                    <img src={dailycoins} />
                    <div className="daily-detail star">
                      <div className="daily-text">
                        <h3 data-lang="lottery_pool"> Lottery Pool </h3>
                        <h2 className="lotteryPool text-white"> 0 </h2>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-md-3 col-daily-detail">
                  <div className="card stack_sub_cards">
                    <img src={d2} alt="" className='stack_d_img' />
                    <Button className='start_btn s_d_W mobilebtn' onClick={() => setModalShow3(true)}>
                      Register
                    </Button>
                    {
                      modalShow3 ? (
                        <Modal
                        show={modalShow3}
                        onHide={() => setModalShow3(false)}
                          size="lg"
                          aria-labelledby="contained-modal-title-vcenter"
                          centered
                        >
                          <Modal.Header className='modal_bg'>

                            <div className="container-fluid">
                              <div className="row">
                                <div className="col-lg-12 p-o">
                                  <div className="d-flex">
                                    <div className="icons_m">
                                      <Button 
                                      onClick={() => setModalShow3(false)} 
                                      style={{ backgroundColor: "transparent", border: "1px solid #28DBD1", color: "#000" }}><MdArrowBackIos ></MdArrowBackIos></Button> </div>
                                    <h4 className='ms-5 modal_h4'>Register</h4>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Modal.Header>
                          <Modal.Body className='body_m_bg'>
                            <div className="container">
                              <div className="row">
                                <div className="col-lg-12">
                                  <input type="text" placeholder='Enter Address' 
                                  value={registerAdress} onChange={(e) => { setRegisterAdress(e.target.value) }} 
                                  className='input_modal' />
                                  <Button className='mt-2 ' 
                                  // onClick={getReferral} 
                                  style={{ backgroundColor: "transparent", border: "1px solid #28dbd1", color: "#000" }}><RiRefreshFill /></Button>
                                  {/* <input type="text" placeholder='Enter amount in BSG' value={amount} onChange={(e) => { setAmount(e.target.value) }} className='input_modal mt-3' /> */}

                                </div>

                              </div>
                            </div>

                          </Modal.Body>
                          <Modal.Footer className='footer_m_bg'>
                            <Button className='s_d_Ws  w-100' 
                            onClick={NewRegister}
                            >Confirm Registration</Button>
                          </Modal.Footer>
                        </Modal>
                      ) : (
                        <> </>
                      )
                    }
                    {/* <Register
                      show={modalShow3}
                      onHide={() => setModalShow3(false)}
                    /> */}
                  </div>
                  {/* <div className="detailOne">
                    <img src={lendenergy} />
                    <div className="daily-detail top3">
                      <div className="daily-text">
                        <h3
                          data-lang="energy_lend"
                          style={{ marginBottom: " 15%" }}
                        >
                          Energy Lend
                        </h3>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>

            <div className="main-account-detail">
              <div className="row">
                <div className="col-md-4">
                  <div
                    className="col-md-12 account-detail top3 detailOne mt-4"
                    style={{ cursor: "pointer" }}
                    onClick={() => setModalShow(true)}
                  >
                    <span className="account-detail-action">
                      <img
                        src={detaildeposit}
                        className="deposit"
                        width="50px"
                      />
                    </span>
                    <h3 data-lang="deposit">Deposit</h3>
                  </div>

                  <div
                    className="col-md-12 account-detail star detailOne"
                    style={{ cursor: "pointer" }}
                    onClick={() => setModalShowOne(true)}
                  >
                    <span className="account-detail-action">
                      <img src={detailwithraw} />
                    </span>
                    <h3 data-lang="withdraw">Withdraw</h3>
                  </div>

                  <div
                    className="col-md-12 account-detail lucky detailOne"
                    style={{ cursor: "pointer" }}
                    onClick={() => setModalShowTwo(true)}
                  >
                    <span className="account-detail-action">
                      <img src={detailgroup} width="50px" />
                    </span>
                    <h3 data-lang="split_acount">Split & Lottery Account</h3>
                  </div>
                </div>

                <div className="col-md-8 sm-mt">
                  <div className="row" style={{ paddingRight: " 20px" }}>
                    <div className="col-md-12 reward-detail mt-4">
                      <div className="row reward-text ">
                        <div className="col-md-12 lucky-detail text-start">
                          <h3 data-lang="lucky_reward">Distribute Reward</h3>
                          <h4 data-lang="time_remaining">Time Remaining: </h4>
                        </div>
                      </div>
                      <div className="timer">
                        <div>
                          <h1>
                            <span className="hourStart0">0</span>
                            <span className="hourEnd0">0</span>
                          </h1>
                        </div>
                        <div>
                          <h1>
                            <span className="minuteStart0">0</span>
                            <span className="minuteEnd0">0</span>
                          </h1>
                        </div>
                        <div>
                          <h1>
                            <span className="secondStart0">0</span>
                            <span className="secondEnd0">0</span>
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row" style={{ paddingRight: " 20px" }}>
                    <div className="col-md-12 reward-detail mt-4">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="side-detail-level-text">
                            <h3
                              className="night-mode-font-color-mobile-h3"
                              data-lang="my_level"
                            >
                              My Level
                            </h3>
                          </div>
                        </div>
                      </div>

                      <div className="row" style={{ marginTop: " 0px" }}>
                        <div className="col-md-12">
                          <div className="side-detail-balance">
                            <p
                              className="night-mode-font-color-mobile"
                              data-lang="income"
                            >
                              Income
                            </p>
                            <h3 className="night-mode-font-color-mobile-h3 totalRevenue">
                              0.00
                            </h3>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="side-detail-balance">
                            <p
                              className="night-mode-font-color-mobile"
                              data-lang="trx_balance"
                            >
                              GLX Balance
                            </p>
                            <h3 className="night-mode-font-color-mobile-h3 trxBal">
                              0.00
                            </h3>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="side-detail-balance">
                            <p
                              className="night-mode-font-color-mobile"
                              data-lang="usdt_balance"
                            >
                              BUSD Balance
                            </p>
                            <h3 className="night-mode-font-color-mobile-h3 usdtBal">
                              0.00
                            </h3>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="side-detail-balance">
                            <p
                              className="night-mode-font-color-mobile"
                              data-lang="my_referral"
                            >
                              My Referral
                            </p>
                            <h3 className="night-mode-font-color-mobile-h3 myReferral">
                              ...
                            </h3>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="side-detail-balance">
                            <p className="night-mode-font-color-mobile">
                              <span data-lang="referral_link">
                                Referral Link
                              </span>{" "}
                              <input className="referral-link" value="..." />
                            </p>
                            <button className="copyLink">Copy</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="main-latest-despositor">
              <div className="row">
                <div className="col-md-12">
                  <div className="main-latest-despositor-text">
                    <h3 data-lang="latest_depositors">Latest Depositors</h3>
                  </div>
                  <div className="main-latest-despositor-data">
                    <table
                      className="table depositorsTable"
                      style={{ textAlign: " center" }}
                    >
                      <thead>
                        <tr>
                          <th scope="col" data-lang="address">
                            Address
                          </th>
                          <th scope="col" data-lang="time">
                            Time
                          </th>
                          <th scope="col" data-lang="amount">
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Null</td>
                          <td>Null</td>
                          <td>
                            <div className="main-latest-despositor-data-amount">
                              <img src={troncurrency} height="24" />
                              <h3>0</h3>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>Null</td>
                          <td>Null</td>
                          <td>
                            <div className="main-latest-despositor-data-amount">
                              <img src={troncurrency} height="24" />
                              <h3>0</h3>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>Null</td>
                          <td>Null</td>
                          <td>
                            <div className="main-latest-despositor-data-amount">
                              <img src={troncurrency} height="24" />
                              <h3>0</h3>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className="main-latest-despositor">
              <div className="row">
                <div className="col-md-12">
                  <div className="main-latest-despositor-text">
                    <h3 data-lang="lucky_player">Lucky Players</h3>
                  </div>
                  <div className="main-latest-despositor-data">
                    <table
                      className="table depositorsTable"
                      style={{ textAlign: " center" }}
                    >
                      <thead>
                        <tr>
                          <th scope="col" data-lang="address">
                            Address
                          </th>
                          <th scope="col" data-lang="time">
                            Time
                          </th>
                          <th scope="col" data-lang="amount">
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Null</td>
                          <td>Null</td>
                          <td>
                            <div class="top-player-wrapper-price">
                              <img src={troncurrency} height="24" alt="" />
                              <h3>0.00</h3>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>Null</td>
                          <td>Null</td>
                          <td>
                            <div class="top-player-wrapper-price">
                              <img src={troncurrency} height="24" alt="" />
                              <h3>0.00</h3>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>Null</td>
                          <td>Null</td>
                          <td>
                            <div class="top-player-wrapper-price">
                              <img src={troncurrency} height="24" alt="" />
                              <h3>0.00</h3>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 ">
            <img src={attachmentunscreen} className=" img-fluid" />
          </div>
        </div>
      </div>
      {modalShow ? (
        <Modal
          show={modalShow}
          onHide={() => setModalShow(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          {/* <div class="modal-dialog modal-dialog-centered modal-lg modal-fullscreen-sm-down"> */}
          <div
            className="modal-content deposit-modal modal-violet"
            style={{ marginTop: "60px" }}
          >
            <div className="pc-modal-view-withdraw">
              <div className="modal-header modal-withdraw">
                <a
                  className="modal-title-close"
                  data-bs-dismiss="modal"
                  onClick={() => setModalShow(false)}
                  style={{ cursor: "pointer" }}
                >
                  <img src={modalX} height="15" />
                </a>
              </div>
            </div>

            <div className="modal-body deposit-body-data">
              <div className="deposit-body-data-input">
                <input
                  type="text"
                  data-lang="deposit_placeholder"
                  placeholder="Please input deposit amount"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  className="inputAmount"
                />
                <div className="deposit-body-data-price">
                  <img src={troncurrency} height="24" />
                  <h3>BUSD</h3>
                </div>
              </div>
              <div className="deposit-body-data-text">
                <p data-lang="deposit_rules1">
                  Minimum deposit 1 BUSD. A ratio of 10 max 5000 BUSD
                </p>
              </div>
              <div className="deposit-body-data-information">
                <div className="deposit-body-data-computation">
                  <div>
                    <h3>
                      <span className="depositAmount">100</span>BUSD
                    </h3>
                    <p data-lang="deposit">Deposit</p>
                  </div>
                  <div>
                    <h3>+</h3>
                  </div>
                  <div>
                    <h3>22.5%</h3>
                    <p data-lang="deposit_rules2">Each Cycle</p>
                  </div>
                  <div>
                    <h3>=</h3>
                  </div>
                  <div>
                    <h3>
                      <span className="total">122.5</span>BUSD
                    </h3>
                    <p data-lang="deposit_rules3">Deposit and Reward</p>
                  </div>
                </div>
                <div className="deposit-body-data-summary">
                  <p data-lang="deposit_rules4">
                    15 days per cycle. 22.5% per cycle
                  </p>
                  <p data-lang="deposit_rules_new">
                    First cycle: max deposit 1000 <br /> Second cycle: max
                    deposit 2000 <br /> Third cycle: max deposit 3000 <br />{" "}
                    Fourth cycle: max deposit 4000 <br /> Fifth cycle: max
                    deposit 5000
                  </p>
                  <p data-lang="deposit_rules5">
                    You will have to redeposit every time each after each cycle.
                    It will have to be either the same amount or bigger amount.
                    Every 1 cycle you deposit, 1 extra days will be added
                    without extra interest. Maximum 45 days.
                  </p>
                </div>
              </div>
              <div className="deposit-body-data-button">
                <button
                  className="deposit-cancel"
                  data-bs-dismiss="modal"
                  data-lang="cancel"
                  onClick={() => setModalShow(false)}
                >
                  Cancel
                </button>
                <button
                  className="deposit-confirm"
                  data-lang="confirm"
                  onClick={GetDeposit}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
          {/* </div> */}
        </Modal>
      ) : (
        <></>
      )}
      {modalShowOne ? (
        <Modal
          show={modalShowOne}
          onHide={() => setModalShowOne(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <div
            className="modal-content deposit-modal modal-blue"
            style={{ marginTop: "50px" }}
          >
            <div className="pc-modal-view-withdraw">
              <div className="modal-header modal-withdraw">
                <a
                  className="modal-title-close"
                  data-bs-dismiss="modal"
                  onClick={() => setModalShowOne(false)}
                  style={{ cursor: "pointer" }}
                >
                  <img src={modalX} height="15" />
                </a>
              </div>
            </div>

            <div className="modal-body withdraw-body-data">
              <div className="row  d-flex justify-content-center">
                <div className="col-md-12">
                  <div className="deposit-body-data-information">
                    <div className="withdraw-body-data-summary">
                      <div className="withdraw-values">
                        <h3 data-lang="principal">Unlock Principal</h3>
                        <h3>
                          <span className="unfreezed">0.00</span> BUSD
                        </h3>
                      </div>
                      <div className="withdraw-values">
                        <h3 data-lang="cycle_reward">Cycle Reward</h3>
                        <h3>
                          <span className="staticReward">0.00</span> BUSD
                        </h3>
                      </div>
                      <div className="withdraw-values">
                        <h3 data-lang="invite_reward">Level 1-4 Reward</h3>
                        <h3>
                          <span className="inviteReward">0.00</span> BUSD
                        </h3>
                      </div>
                      <div className="withdraw-values">
                        <div>
                          <h3 data-lang="level5_reward">Level 5 Reward</h3>
                          <p data-lang="level5_freezing">Freezing</p>
                        </div>
                        <div>
                          <h3>
                            <span className="level5Reward">0.00</span> BUSD
                          </h3>
                          <p className="freeze">
                            <span className="level5Freezed">0.00</span> BUSD
                          </p>
                        </div>
                      </div>
                      <div className="withdraw-values">
                        <h3 data-lang="lucky_win">Lucky Reward</h3>
                        <h3>
                          <span className="luckReward">0.00</span> BUSD
                        </h3>
                      </div>
                      <div className="withdraw-values">
                        <h3 data-lang="lottery_win">Lottery Reward</h3>
                        <h3>
                          <span className="lotteryReward">0.00</span> BUSD
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 withdraw-action text-white mt-3">
                  <h3 data-lang="available_withdraw">Available Withdraw</h3>
                  <h3>
                    <span className="totalReward">0.00</span> BUSD
                  </h3>

                  <div className="withdraw-body-data-button">
                    <button
                      className="withdraw-cancel"
                      data-bs-dismiss="modal"
                      data-lang="cancel"
                      onClick={() => setModalShowOne(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="withdraw-confirm"
                      data-lang="withdraw"
                      onClick={GetWithdraw}
                    >
                      {" "}
                      Withdraw{" "}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      ) : (
        <></>
      )}

      {modalShowTwo ? (
        <Modal
          show={modalShowTwo}
          onHide={() => setModalShowTwo(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <div
            className="modal-content deposit-modal modal-light-blue"
            style={{ marginTop: "50px" }}
          >
            <div className="pc-modal-view-withdraw">
              <div className="modal-header modal-withdraw">
                <a
                  href="#"
                  className="modal-title-close"
                  data-bs-dismiss="modal"
                  onClick={() => setModalShowTwo(false)}
                >
                  <img src={modalX} height="15" />
                </a>
              </div>
            </div>
            <div className="modal-body split-body-data">
              <div className="row">
                <div
                  className="col-12 order-2 col-md-5 order-md-1"
                  style={{ marginTop: "10px" }}
                >
                  <div className="available-ustd">
                    <p>
                      {" "}
                      <span data-lang="split_account">Split Available: </span>
                      <span>
                        {" "}
                        <span className="splitAvailable">0.00</span> BUSD{" "}
                      </span>
                    </p>
                  </div>
                  <div className="splitDeposit">
                    <h3 data-lang="deposit">Deposit</h3>
                    <div className="split-body-data-input">
                      <p data-lang="amount">Amount</p>
                      <div className="deposit-body-data-input">
                        <input
                          type="text"
                          placeholder="Amount"
                          className="splitDepositAmount"
                          value={depositBySplitAmount}
                          onChange={(e) =>
                            setDepositBySplitAmount(e.target.value)
                          }
                        />
                        <div className="deposit-body-data-price">
                          <img src={troncurrency} height="24" />
                          <h3>BUSD</h3>
                        </div>
                      </div>
                      <p data-lang="split_ratio">The ratio of 100</p>
                    </div>
                    <div className="deposit-body-data-button">
                      <button
                        className="split-deposit"
                        data-lang="deposit"
                        onClick={GetDepositBySplit}
                      >
                        Deposit
                      </button>
                    </div>
                  </div>

                  <div className="transfer">
                    <h3 data-lang="transfer">Transfer</h3>
                    <div className="split-body-data-input">
                      <p>BUSD</p>
                      <select className="transferSelect">
                        <option value="0" data-lang="split_balance">
                          Split Balance
                        </option>
                        <option value="1" data-lang="lottery_balance">
                          Lottery Balance
                        </option>
                      </select>
                      <div className="split-body-data-price">
                        <input
                          type="text"
                          data-lang="receiver_placeholder"
                          value={recieverAdress}
                          onChange={(e) => setRecieverAdress(e.target.value)}
                          placeholder="Receiver address"
                          className="receiver"
                        />
                      </div>
                      <p data-lang="split_account">Amount</p>
                      <div className="deposit-body-data-input">
                        <input
                          type="text"
                          data-lang="amount_placeholder"
                          placeholder="Transfer amount"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="transferAmount"
                        />
                        <div className="deposit-body-data-price">
                          <img src={troncurrency} height="24" />
                          <h3>BUSD</h3>
                        </div>
                      </div>
                      <p data-lang="fee_hint">
                        10% will be burn for each transfer
                      </p>
                    </div>
                    <div className="deposit-body-data-button">
                      <button
                        className="split-deposit"
                        data-lang="transfer"
                        onClick={GetTransferBySplit}
                      >
                        Transfer
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  className="col-12 order-1 col-md-7  order-md-2 bet-display"
                  style={{ marginTop: "10px" }}
                >
                  <div className="available-ustd">
                    <p>
                      {" "}
                      <span data-lang="lottery_available">
                        Lottery Available:{" "}
                      </span>{" "}
                      <span>
                        {" "}
                        <span className="lotteryAvailable">0.00</span> BUSD{" "}
                      </span>
                    </p>
                  </div>
                  <div className="bet">
                    <h3>
                      {" "}
                      <span data-lang="lottery_title">Draw</span>{" "}
                      <span className="lottery_times">1</span>
                    </h3>
                    <p data-lang="lottery_rules">
                      Players joining BSG in the next 24 hours
                    </p>
                    <div className="bet-inputs">
                      <input
                        type="text"
                        data-lang="guess_placeholder"
                        placeholder="Guess a number"
                        className="lotteryNumber"
                      />
                      <button className="lottery-bet" data-lang="confirm">
                        Confirm
                      </button>
                    </div>
                    <div className="bet-history">
                      <h3 data-lang="bet_history"> Bet History</h3>
                      <div className="history-infos"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      ) : (
        <></>
      )}
      <Footer />
    </div>
  );
}

export default DashBoard;
