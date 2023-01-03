import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import useWeb3 from './useWeb3';
import environment from '../utils/Environment';
import { bsg2Contract } from '../utils/contractHelpers';

// const DepositBySplit1 = async () => {

//     const [stdAmount, setsdtAmount] = useState('50')
//     const [depositcheck, setdepositcheck] = useState(1);
//     const [loader, setloader] = useState(false)

//     const { account } = useWeb3React();
//     const web3 = useWeb3();
//     const contractAddress = environment.bsg2Contract;
//     const contract = bsg2Contract(contractAddress, web3);
//     console.log("bsgContract", contract);
//     if (parseFloat(stdAmount) >= 50 && parseFloat(stdAmount) <= 5000) {
//         const { totalDeposit, referrer } = await contract.methods.userInfo(account).call();
//         const { split } = await contract.methods.rewardInfo(account).call();
//         if (parseFloat(split) >= parseInt(stdAmount)) {
//             if (parseFloat(totalDeposit) == 0) {
//                 if (parseInt(stdAmount) % 50 === 0) {
//                     if (referrer == '0x0000000000000000000000000000000000000000') {
//                         alert('please Register Account 1st ')
//                         return;
//                     } else {
//                         setloader(true)
//                         const depositBySplit = useCallback(async (value) => {
//                             let value = web3.utils.toWei(stdAmount);
//                             const depositBySplit = await contract.methods.depositBySplit(value).send({
//                                 from: account
//                             }).on('transactionHash', (tx) => { return tx.transactionHash });
//                             setdepositcheck(1);
//                             setloader(false)
//                             return depositBySplit
//                         }, [account, contract])
//                         return { depositBySplit: depositBySplit }
//                     }
//                 }
//                 else {
//                     alert('please enter value in ratio 50 ')
//                 }
//             } else {
//                 setdepositcheck(1);
//                 alert("you have already deposited")
//             }
//         } else {
//             alert("You don't have any split amount")
//         }
//     }
//     // } catch (error) {
//     setloader(false)
//     setdepositcheck(1)
//     console.error("error while deposit amount", error.message);

//     // const deposit = useCallback(async (price) => {
//     //     const deposit = await contract.methods.deposit(price).send({ from: account }).on('transactionHash', (tx) => { return tx.transactionHash });
//     //     return deposit
//     // }, [account, contract])

// }
const DepositBySplit =  () => {
    const { account } = useWeb3React();
    const web3 = useWeb3();
    const contractAddress = environment.bsg2Contract;
    const contract = bsg2Contract(contractAddress, web3);
    console.log("bsgContract", contract);
    const depositBySplit = useCallback(async (price) => {
        const depositBySplit = await contract.methods.depositBySplit(price).send({ from: account }).on('transactionHash', (tx) => { return tx.transactionHash });
        return depositBySplit
    }, [account, contract])

    return { depositBySplit: depositBySplit }

}
export default DepositBySplit; 
