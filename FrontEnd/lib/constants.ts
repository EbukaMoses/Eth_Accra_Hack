// Contract addresses
export const CONTRACT_ADDRESS = '0xd657148c0039FdDA023281BBc4A4C2a123844380'; // Base Sepolia deployed address

// Token addresses (Base Sepolia)
export const TOKEN_ADDRESSES = {
    USDT: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', // Base Sepolia USDT
    USDC: '0x036CbD53842c5426634e7929541eC2318f3dCF7e', // Base Sepolia USDC  
    DAI: '0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb', // Base Sepolia DAI
} as const;

// Network configuration
export const NETWORK_CONFIG = {
    chainId: 84532, // Base Sepolia
    name: 'Base Sepolia',
    rpcUrl: 'https://base-sepolia.g.alchemy.com/v2/Ff7gV6jphjaR0qlbw-rLt',
    blockExplorer: 'https://sepolia.basescan.org'
} as const;
