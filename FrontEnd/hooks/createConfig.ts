import { http, createConfig } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { injected, metaMask, coinbaseWallet } from 'wagmi/connectors'

export const config = createConfig({
    chains: [mainnet, sepolia],
    connectors: [
        injected(),
        metaMask(),
        coinbaseWallet({ appName: 'GiftChain' }),
    ],
    transports: {
        [mainnet.id]: http('https://ethereum.publicnode.com'),
        [sepolia.id]: http('https://sepolia.publicnode.com')
    },
})