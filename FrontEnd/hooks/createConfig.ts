import { http, createConfig } from 'wagmi'
import { mainnet, sepolia, base, baseSepolia } from 'wagmi/chains'
import { injected, metaMask, coinbaseWallet } from 'wagmi/connectors'

export const config = createConfig({
    chains: [mainnet, sepolia, base, baseSepolia],
    connectors: [
        injected(),
        metaMask(),
        coinbaseWallet({ appName: 'GiftChain' }),
    ],
    transports: {
        // [mainnet.id]: http('https://ethereum.publicnode.com'),
        // [sepolia.id]: http('https://sepolia.publicnode.com'),
        [base.id]: http('https://base-mainnet.g.alchemy.com/v2/Ff7gV6jphjaR0qlbw-rLt'),
        [baseSepolia.id]: http('https://base-sepolia.g.alchemy.com/v2/Ff7gV6jphjaR0qlbw-rLt')
    },
})