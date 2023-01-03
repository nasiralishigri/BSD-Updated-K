import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import useWeb3 from './useWeb3';
import environment from '../utils/Environment';
import { bsg2Contract } from '../utils/contractHelpers';

const CheckReferalAddress =  () => {

    const { account } = useWeb3React();
    const web3 = useWeb3();
    const contractAddress = environment.bsg2Contract;
    const contract = bsg2Contract(contractAddress, web3);
    console.log("contract",contract);
    const referal = useCallback(async () => {
        const d = await contract.methods.defaultRefer().call({
                from: account,
              }).on('transactionHash', (tx) => { return tx.transactionHash });
        return d
    }, [account,contract])

    return { referal:referal }

} 
export default CheckReferalAddress


