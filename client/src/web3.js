
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';

const getWeb3 = async () => {
  // Detect MetaMask provider
  const provider = await detectEthereumProvider();

  if (provider) {
    // Use MetaMask provider
    window.web3 = new Web3(provider);
    return window.web3;
  } else {
    // Use default provider
    return new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
  }
};

export default getWeb3;
