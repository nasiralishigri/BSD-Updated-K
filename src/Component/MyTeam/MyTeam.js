import React from 'react'
import "./MyTeam.css"
import address from "../../Assets/address.png";
import wallet from "../../Assets/wallet.png"
import runningtime from "../../Assets/running-time.png"
import deposittime from "../../Assets/deposit-time.png"
import Footer from '../Footer/Footer'
function MyTeam() {
  return (
    <div >
      <div className='container mt-5'>
        <div className="welcome-team text-start">
          <h3 data-lang="myteam">My Team</h3>
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

        <div className="main-team-detail">
							<div className="row ">
								<div className="col-12 col-md-5" style={{marginBottom: "20px"}}>
									<div className="team-detail top3 text-start">
										<p data-lang="sales">Sales</p>
										<h3 className="totalTeamDeposit">0</h3>
									</div>
								</div>
								<div className="col-12 col-md-5">
									<div className="team-detail star text-start">
										<p data-lang="team_members">Team members</p>
										<h3 className="teamNum">0</h3>
									</div>
								</div>
							</div>
							<div className="row" style={{marginTop: " 20px"}}>
								<div className="col-12 col-md-5" style={{marginBottom: "20px"}}>
									<div className="team-detail lucky text-start">
										<p data-lang="performance_a">Performance A Area</p>
										<h3 className="maxDeposit">0</h3>
									</div>
								</div>
								<div className="col-12 col-md-5">
									<div className="team-detail pink text-start">
										<p data-lang="performance_b">Performance B Area</p>
										<h3 className="otherDeposit">0</h3>
									</div>
								</div>
							</div>
						</div>
      </div>
      <Footer />
    </div>
  )
}

export default MyTeam