import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import useWeb3 from './useWeb3';
import environment from '../utils/Environment';
import { getBep20Contract } from '../utils/contractHelpers';

 const ChooseWinner = () => {
    const { account } = useWeb3React();
    const web3 = useWeb3();
    const contractAddress = environment.spaceLotteryContract;
    const contract = getBep20Contract(contractAddress, web3)
    const chooseWinner = useCallback(async () => {
            const approved = await contract.methods.chooseWinner().send({ from: account  })
                .on('transactionHash', (tx) => { return tx.transactionHash });
            return approved    
    }, [account, contract])

    return { chooseWinner:chooseWinner }
}



export default ChooseWinner; 