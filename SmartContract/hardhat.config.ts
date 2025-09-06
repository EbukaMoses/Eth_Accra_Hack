import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const {
  // ALCHEMY_SEPOLIA_RPC_URL,
  // ALCHEMY_BASE_RPC_URL,
  ALCHEMY_BASE_SEPOLIA_RPC_URL,
  PRIVATE_KEY,
  // ETHERSCAN_API_KEY,
  BASE_SEPOLIA_API_KEY
} = process.env;


const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  defaultNetwork: "hardhat", // Use hardhat network for local testing
  networks: {
    baseSepolia: {
      url: ALCHEMY_BASE_SEPOLIA_RPC_URL || "https://sepolia.base.org",
      accounts: PRIVATE_KEY ? [`0x${PRIVATE_KEY.replace(/^0x/, "")}`] : [],
      chainId: 84532,
    }
  },
  etherscan: {
    apiKey: {
      // sepolia: ETHERSCAN_API_KEY || "",
      baseSepolia: BASE_SEPOLIA_API_KEY || "" // Use dummy key to avoid errors
    },
    customChains: [
      {
        network: "baseSepolia",
        chainId: 84532,
        urls: {
          apiURL: "https://api-sepolia.basescan.org/api",
          browserURL: "https://sepolia.basescan.org"
        }
      }
    ]
  },
  sourcify: {
    enabled: false // Disable Sourcify verification to avoid warnings
  },
};

export default config;