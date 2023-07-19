import { Component, NgModule } from "@angular/core";

import { getDefaultProvider, ethers, BigNumber } from "ethers";
import {
  createClient,
  connect,
  disconnect,
  getAccount,
  signMessage,
  InjectedConnector,
} from "@wagmi/core";
import {
  solidityCompiler,
  getCompilerVersions,
} from "@agnostico/browser-solidity-compiler";

const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
});
const vulnerableAddress = "0x7b95E1604189EFE1566278d2bD984e27614273e5";
const contractAddress = "0x19251330389F2485f4a0E16657Cd364A1F537F7E";
const nftAddress = "0xC56069A6f6FE8D74447B4D063e96D29c24352a27";
const vulnerableABI = [
  {
    inputs: [],
    name: "receiveMoney",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    stateMutability: "payable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
const nftABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "hasMinted",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxMintPerWallet",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "mintNFT",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "mintPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "token",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
const contractAbi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mintTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];
const abi = [
  {
    inputs: [],
    name: "balance",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getBalance",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "token",
    outputs: [
      {
        internalType: "contract Token",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "amount",
        type: "uint8",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
const overflowAddress = "0x530252Cd4983207b481009A4aA75E158564C1125";

@Component({
  selector: "app-walletconnect",
  templateUrl: "./walletconnect.component.html",
  styleUrls: ["./walletconnect.component.scss"],
})
export class WalletconnectComponent {
  userData: object;
  session = "";
  deployedContractAddress = "";
  juiceBalance = 0;
  myJuiceBalance = 0;
  withdrawAmount: number = 0;
  vulnerableContract: string = `pragma solidity ^0.7.0;


interface Token {
    function transfer(address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract VulnerableWallet {
    Token public token = Token(0x19251330389F2485f4a0E16657Cd364A1F537F7E);
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function transferFunds(address payable recipient, uint256 amount) external {
        require(tx.origin == owner, "Unauthorized access");
        recipient.transfer(amount);
        token.transfer(recipient, uint256(amount));
    }

    function TransferToFunds(uint8 amount) public {
        require(msg.sender == owner, "Unauthorized access");
        token.transfer(msg.sender, uint256(amount));
    }

    function getBalance() public view returns (uint8) {
        return balance;
    }
}
`;

  code: string = `contract AttackerContract {
    address public vulnerableContractAddress = address(0x7e4fcc69FfaF3177B87Ce844fD764dEB6860A364);


    function attack() external payable {
        (bool success, ) = vulnerableContractAddress.call(
            abi.encodeWithSignature("transferFunds(address,uint256)", msg.sender, msg.value)
        );

        require(success, "Attack failed");
    }
}
`;
  editorOptions = {
    mode: "text/x-solidity",
    theme: "dracula",
    lineNumbers: true,
    lineWrapping: true,
    // ... other CodeMirror options
  };
  editorDisabledOptions = {
    mode: "text/x-solidity",
    theme: "material",
    lineNumbers: true,
    lineWrapping: true,
    readOnly: "nocursor",
    // ... other CodeMirror options
  };
  ngOnInit(): void {
    this.fetchJuiceBalance();
    this.fetchMyJuiceBalance();
  }
  async fetchMyJuiceBalance() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Replace the contract address and ABI with your Juice Token contract details

      const contract = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );
      const userAddress = await signer.getAddress();
      const balanceBigNumber: BigNumber = await contract.balanceOf(userAddress);
      console.log(balanceBigNumber);
      this.myJuiceBalance = balanceBigNumber
        .div(ethers.constants.WeiPerEther)
        .toNumber();
    } catch (error) {
      console.error("Error fetching Juice balance:", error);
    }
  }
  async fetchJuiceBalance() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(overflowAddress, abi, signer);
      const balance = await contract.balance();
      console.log(balance);
      this.juiceBalance = balance;
    } catch (error) {
      console.error("Error fetching Juice balance:", error);
    }
  }
  async compileAndDeployCode(code: string) {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      console.log(provider);
      console.log(signer);
      const output: any = await solidityCompiler({
        version: `https://binaries.soliditylang.org/bin/soljson-v0.6.0+commit.26b70077.js`,
        contractBody: code,
      });

      console.log("output", output);
      const contractBytecode =
        output?.contracts["Compiled_Contracts"]["AttackerContract"].evm.bytecode
          .object;
      const contractAbi =
        output?.contracts["Compiled_Contracts"]["AttackerContract"].abi;

      const factory = new ethers.ContractFactory(
        contractAbi,
        contractBytecode,
        signer
      );
      const contract = await factory.deploy();

      await contract.deployed();

      console.log("Contract deployed:", contract.address);
      this.deployedContractAddress = contract.address;
      console.log(this.deployedContractAddress);
    } catch (error) {
      console.error("Error compiling/deploying contract:", error);
    }
  }
  async handleAuth() {
    const { isConnected } = getAccount();

    if (isConnected) await disconnect(); //disconnects the web3 provider if it's already active

    const provider = await connect({ connector: new InjectedConnector() }); // enabling the web3 provider metamask

    this.userData = {
      address: provider.account,
      chain: provider.chain.id,
      network: "evm",
    };

    this.session = "enable";
    this.fetchJuiceBalance();
    this.fetchMyJuiceBalance();
  }
  async withdrawJuiceTokens(amount = this.withdrawAmount) {
    try {
      if (amount > 1000) {
        console.log("Withdrawal amount exceeds the limit");
        return;
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(overflowAddress, abi, signer);
      const tx = await contract.withdraw(amount);
      await tx.wait();

      console.log("Juice tokens withdrawn successfully");
      this.fetchJuiceBalance();
      this.fetchMyJuiceBalance();
    } catch (error) {
      console.error("Error withdrawing Juice tokens:", error);
    }
  }

async transferEthToContract() {
  // Connect to the Ethereum network using the default provider
  const provider = ethers.getDefaultProvider();


  try {
    // Create a new wallet using the private key
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
    // Create a new instance of the smart contract
    const contract = new ethers.Contract(vulnerableAddress, vulnerableABI, signer);

    // Set the amount to transfer (0.1 ETH)
    const amount = ethers.utils.parseEther('0.1');

    // Call the receiveMoney function on the smart contract
    const transaction = await contract.receiveMoney({ value: amount });

    // Wait for the transaction to be mined
    await transaction.wait();

    console.log('ETH transferred successfully to the smart contract wallet.');
  } catch (error) {
    console.error('Failed to transfer ETH to the smart contract wallet:', error);
  }
}

  async mintNFT() {
    try {
      // Create a provider and signer using the user's Ethereum account
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const amountToApprove = ethers.utils.parseUnits("1000", "18");
      const jstContract = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );
      const approvalTx = await jstContract.approve(nftAddress, amountToApprove);

      await approvalTx.wait();
      // Create a contract instance using the contract address and ABI
      const contract = new ethers.Contract(nftAddress, nftABI, signer);

      // Call the `mintNFT` function to mint the NFT
      const transaction = await contract.mintNFT();

      // Wait for the transaction to be mined
      await transaction.wait();

      // Display a success message or perform any other actions
      console.log("NFT minted successfully!");
    } catch (error) {
      console.error("Error minting NFT:", error);
    }
  }
  
  async signOut() {
    await disconnect();
    this.session = "";
  }
}
