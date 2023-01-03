import web3NoAccount from './web3'
import glxAbi from './glxAbi.json';
import tokenAbi from './tokenAbi.json'

const getContract = (abi, address, web3) => {
    const _web3 = web3 ?? web3NoAccount;
    // console.log('_web3',_web3);
    return new _web3.eth.Contract(abi, address)
}

export const bsg2Contract = (address, web3) => {
    return getContract(glxAbi, address, web3)
}

export const tokenContractAddress = (address, web3) => {
    return getContract(tokenAbi,address, web3)
}
