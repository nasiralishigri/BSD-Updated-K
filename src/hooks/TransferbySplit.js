import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import useWeb3 from './useWeb3';
import environment from '../utils/Environment';
import { bsg2Contract } from '../utils/contractHelpers';

const TransferBySplit =  () => {

    const { account } = useWeb3React();
    const web3 = useWeb3();
    const contractAddress = environment.bsg2Contract;
    const contract = bsg2Contract(contractAddress, web3);
    const transferBySplit = useCallback(async (recieverAdress,amount) => {
        let value = web3.utils.toWei(amount);
        const transferBySplit = await contract.methods.transferBySplit(recieverAdress,value).send({ from: account }).on('transactionHash', (tx) => { return tx.transactionHash });
        return transferBySplit
    }, [account, contract])

    return { transferBySplit: transferBySplit }

}
export default TransferBySplit; 
