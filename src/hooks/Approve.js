import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import useWeb3 from './useWeb3';
import environment from '../utils/Environment';
import { tokenContractAddress } from '../utils/contractHelpers';

const Approve =  () => {
    const { account } = useWeb3React();
    const web3 = useWeb3();
    const tokenAddress=environment.tokenAddress
    const contract = tokenContractAddress(tokenAddress, web3);

    const approve = useCallback(async (price) => {
        // let v = web3.utils.toWei(amount);
        // console.log("Approve Value",v);
        const approve = await contract.methods.approve(environment.bsg2Contract, price).send({from: account});
        return approve
    }, [account, contract])

    return { approve: approve }

}

export default Approve; 
