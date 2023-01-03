/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { getBep20Contract } from '../utils/contractHelpers'
import useWeb3 from './useWeb3'
import { useWeb3React } from '@web3-react/core'
import useRefresh from './useRefresh'
import environment from '../utils/Environment';

const UserInfo = () => {
    const web3 = useWeb3()
    const { acc } = useWeb3React();
    const [UserInfo, setUserInfo] = useState({
       maxDeposit
    })
    console.log("maxLotteryParticipants",UserInfo.maxDeposit);

    const { fastRefresh } = useRefresh()
    const tokenAddress = environment.bsg2Contract;
    const contract = getBep20Contract(tokenAddress, web3)

        useEffect(() => {
            const fetchBalance = async () => {
                const {
                    maxDeposit
                } = await contract.methods.userInfo(acc).call()
                // let time= new Date(lotteryStartTime)
                setUserInfo({
                   maxDeposit
                })
            }
            fetchBalance()
        }, [web3, fastRefresh])
        return {
            maxDeposit: UserInfo?.maxDeposit

            // lotteryCurrentPot: u?.lotteryCurrentPot,
            // lotteryParticipants: lotteryInfo?.lotteryParticipants,
            // lotteryPercent: lotteryInfo?.lotteryPercent,
            // lotteryStartTime: lotteryInfo?.lotteryStartTime,
            // lotteryStep: lotteryInfo?.lotteryStep,
            // lotteryTicketPrice: lotteryInfo?.lotteryTicketPrice,
            // maxLotteryParticipants: lotteryInfo?.maxLotteryParticipants,
            // maxLotteryTicket: lotteryInfo?.maxLotteryTicket,
            // round: lotteryInfo?.round,
            // totalLotteryTickets: lotteryInfo?.totalLotteryTickets
        }
    // const chooseWinner = await contract.method.chooseWinner() 
}



export default UserInfo
