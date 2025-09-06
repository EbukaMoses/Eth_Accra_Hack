import hre from "hardhat";
import { verify } from "../utils/verify";

async function main() {
    // Get the deployer address
    const [deployer] = await hre.ethers.getSigners();
    const deployerAddress = await deployer.getAddress();

    // 🔧 CUSTOMIZE THESE VALUES
    const tokenName = "Mock USDT";
    const tokenSymbol = "mUSDT";
    // const tokenName = "Mock DAI";
    // const tokenSymbol = "mDAI";
    // const tokenName = "Mock DAI";
    // const tokenSymbol = "mDAI";
    const initialSupply = hre.ethers.parseEther("1000000"); // 1 million tokens

    // 🎯 SET YOUR ADDRESS HERE - Replace with your actual address
    const yourAddress = deployerAddress; // Change this to your specific address
    const mintAmount = hre.ethers.parseEther("100000"); // 100k tokens to mint to your address

    console.log("🚀 Deploying MockERC20 contract...");
    console.log("📋 Deployer Address:", deployerAddress);
    console.log("📋 Your Address:", yourAddress);
    console.log("📋 Token Name:", tokenName);
    console.log("📋 Token Symbol:", tokenSymbol);
    console.log("📋 Initial Supply:", hre.ethers.formatEther(initialSupply), "tokens");
    console.log("📋 Mint Amount to Your Address:", hre.ethers.formatEther(mintAmount), "tokens");

    // Deploy the contract
    console.log("⏳ Deploying contract...");
    const MockERC20Factory = await hre.ethers.getContractFactory("MockERC20");
    const mockToken = await MockERC20Factory.deploy(tokenName, tokenSymbol, initialSupply);

    console.log("⏳ Waiting for deployment confirmation...");
    await mockToken.waitForDeployment();

    const deployedAddress = await mockToken.getAddress();
    const chainId = await hre.ethers.provider.getNetwork();

    console.log("chainId: ", chainId);
    console.log("✅ MockERC20 deployed successfully!");
    console.log("📋 Contract Address:", deployedAddress);

    // Wait a bit more to ensure contract is fully deployed
    console.log("⏳ Waiting for contract to be fully ready...");
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mint additional tokens to your address
    if (yourAddress !== deployerAddress) {
        console.log("🪙 Minting tokens to your address...");
        const mintTx = await mockToken.mint(yourAddress, mintAmount);
        await mintTx.wait();
        console.log("✅ Tokens minted to your address successfully!");
    } else {
        console.log("ℹ️ Your address is the same as deployer, so you already have the initial supply");
    }

    console.log("🔗 View on Base Sepolia:", `https://sepolia.basescan.org/address/${deployedAddress}`);

    // Verify the contract
    console.log("🔍 Verifying contract...");
    try {
        await verify(deployedAddress, [tokenName, tokenSymbol, initialSupply]);
        console.log("✅ Contract verified successfully!");
    } catch (error) {
        console.log("⚠️ Verification failed:", error);
        console.log("🔑 To verify manually later, run:");
        console.log(`npx hardhat verify --network baseSepolia ${deployedAddress} "${tokenName}" "${tokenSymbol}" ${initialSupply}`);
    }

    // Display final token information with retry logic
    console.log("\n📊 Final Token Information:");

    // Helper function to retry contract calls
    const retryContractCall = async (fn: () => Promise<any>, retries = 3): Promise<any> => {
        for (let i = 0; i < retries; i++) {
            try {
                return await fn();
            } catch (error) {
                console.log(`⚠️ Attempt ${i + 1} failed, retrying...`);
                if (i === retries - 1) throw error;
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
    };

    try {
        const name = await retryContractCall(() => mockToken.name());
        console.log("Name:", name);

        const symbol = await retryContractCall(() => mockToken.symbol());
        console.log("Symbol:", symbol);

        const decimals = await retryContractCall(() => mockToken.decimals());
        console.log("Decimals:", decimals);

        const totalSupply = await retryContractCall(() => mockToken.totalSupply());
        console.log("Total Supply:", hre.ethers.formatEther(totalSupply), "tokens");

        const deployerBalance = await retryContractCall(() => mockToken.balanceOf(deployerAddress));
        console.log("Deployer Balance:", hre.ethers.formatEther(deployerBalance), "tokens");

        const yourBalance = await retryContractCall(() => mockToken.balanceOf(yourAddress));
        console.log("Your Address Balance:", hre.ethers.formatEther(yourBalance), "tokens");

    } catch (error) {
        console.log("⚠️ Error reading contract information:", error);
        console.log("📋 Contract Address:", deployedAddress);
        console.log("🔍 You can manually check the contract on Base Sepolia");
    }

    console.log("\n🎉 Deployment Complete!");
    console.log("📋 Contract Address:", deployedAddress);
    console.log("🔗 Add this token to your wallet using the contract address above");
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
