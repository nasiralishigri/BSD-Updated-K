import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import useWeb3 from './useWeb3';
import environment from '../utils/Environment';
import { bsg2Contract } from '../utils/contractHelpers';


const Withdraw =  () => {
    const { account } = useWeb3React();
    const web3 = useWeb3();
    const contractAddress = environment.bsg2Contract;
    const contract = bsg2Contract(contractAddress, web3);
    console.log("bsgContract",contract);
    const withdraw = useCallback(async () => {
        const W = await contract.methods.withdraw().send({ from: account }).on('transactionHash', (tx) => { return tx.transactionHash });
        return W;
    }, [account, contract])

    return { withdraw: withdraw }

}

export default Withdraw; 
