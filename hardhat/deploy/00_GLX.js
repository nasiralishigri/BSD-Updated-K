module.exports = async ({ getNamedAccounts, deployments, getChainId }) => {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId  = await getChainId();

    let busd;
    let multiSig;

    // block epoch time of when to start
    let startTime = Math.floor(new Date() / 1000);
    
    if (chainId == 97) {
        busd = "0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7";
        // EOA for testing is fine
        multiSig = "0xf5a2Ae62FC68207b68499BAC0E9488C1E69d3ec9";
    } else if (chainId == 56) {
        busd = "0xe9e7cea3dedca5984780bafc599bd69add087d56";
        // use gnosis safe for mainnet deployment
        multiSig = "";
    } else {
        console.log(`Unknown ChainId ${chainId}`);
        process.exit();
      }

    await deploy("GLX", {
      from: deployer,
      log: true,
      args: [busd, multiSig, startTime]
    });
  };
  module.exports.tags = ["GLX"];
