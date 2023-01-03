import React from 'react'
import address from "../../Assets/address.png";
import wallet from "../../Assets/wallet.png"
import runningtime from "../../Assets/running-time.png"
import deposittime from "../../Assets/deposit-time.png"
import Footer from '../Footer/Footer'
function Details() {
  return (
    <div>
      <div className='container mt-5'style={{height: "100vh"}}>
        <div className="welcome-team text-start">
          <h3 data-lang="myteam">Deposit Details</h3>
          <p data-lang="common_title1">Start playing and earn rewards!</p>
        </div>
        <div className="row">
          <div className="col-md-8 main-dashboard">
            <div className="main-detail">
              <div className="row detail-group">
                <div className="col-6 col-md-3 col">
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
                <div className="col-6 col-md-3 col ">
                  <div className="detail">
                    <img src={wallet} height="28" weight="28" />
                    <span>
                      <div className="detail-title">
                        <h3 data-lang="income">Income</h3>
                      </div>
                      <p data-lang="deposit_rules6">15 days per cycle. Monthly 45%</p>
                    </span>
                  </div>
                </div>
                <div className="col-6 col-md-3 col ">
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
                <div className="col-6 col-md-3 col ">
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
          </div>
        </div>

        <div className="main-latest-despositor">
          <div className="row">
            <div className="col-md-12">
              <div className="main-latest-despositor-text">
                <h3 data-lang="deposit_details">Deposit Details</h3>

              </div>
              <div className="main-latest-despositor-data table-responsive">
                <table className="table ordersTable" style={{ overflowX: "auto", textAlign: "center" }}>
                  <thead>
                    <tr>
                      <th scope="col" data-lang="amount">Amount</th>
                      <th scope="col" data-lang="time">Time</th>
                      <th scope="col" data-lang="unfreeze_time">Unfreeze Time</th>
                      <th scope="col" data-lang="reward">Reward</th>
                      <th scope="col" style={{ textAlign: " center" }} data-lang="status">
                        Status</th>
                    </tr>
                  </thead>
                  <tbody></tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Details