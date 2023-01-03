import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import useWeb3 from './useWeb3';
import environment from '../utils/Environment';
import { bsg2Contract } from '../utils/contractHelpers';

// let [regisdterAdress, setRegisdterAdress] = useState("");
    

const RegisterAddress =  () => {

    const { account } = useWeb3React();
    const web3 = useWeb3();
    const contractAddress = environment.bsg2Contract;
    const contract = bsg2Contract(contractAddress, web3);
    console.log("contract",contract);
    const register = useCallback(async (registerAdress) => {
        const d = await contract.methods.register(registerAdress).send({
                from: account,
              }).on('transactionHash', (tx) => { return tx.transactionHash });
        return d
    }, [account,contract])

    return { register:register }

} 
export default RegisterAddress