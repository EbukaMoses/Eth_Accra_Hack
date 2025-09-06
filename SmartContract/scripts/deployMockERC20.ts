import hre from "hardhat";
import { verify } from "../utils/verify";

async function main() {
    // Get the deployer address
    const [deployer] = await hre.ethers.getSigners();
    const deployerAddress = await deployer.getAddress();

    // MockERC20 constructor parameters
    const tokenName = "Mock USDC";
    const tokenSymbol = "mUSDC";
    const initialSupply = hre.ethers.parseEther("1000000"); // 1 million tokens with 18 decimals

    // Additional minting parameters
    const mintToAddress = deployerAddress; // Mint to deployer address
    const additionalMintAmount = hre.ethers.parseEther("500000"); // Additional 500k tokens to mint

    console.log("🚀 Deploying MockERC20 contract...");
    console.log("📋 Deployer Address:", deployerAddress);
    console.log("📋 Token Name:", tokenName);
    console.log("📋 Token Symbol:", tokenSymbol);
    console.log("📋 Initial Supply:", hre.ethers.formatEther(initialSupply), "tokens");
    console.log("📋 Additional Mint Amount:", hre.ethers.formatEther(additionalMintAmount), "tokens");
    console.log("📋 Mint To Address:", mintToAddress);

    const MockERC20Factory = await hre.ethers.getContractFactory("MockERC20");
    const mockToken = await MockERC20Factory.deploy(tokenName, tokenSymbol, initialSupply);

    const deployedAddress = await mockToken.getAddress();
    const chainId = await hre.ethers.provider.getNetwork();

    console.log("chainId: ", chainId);
    console.log("✅ MockERC20 deployed successfully!");
    console.log("📋 Contract Address:", deployedAddress);

    // Additional minting to specific address
    console.log("🪙 Minting additional tokens...");
    const mintTx = await mockToken.mint(mintToAddress, additionalMintAmount);
    await mintTx.wait();
    console.log("✅ Additional tokens minted successfully!");

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

    // Display token information
    console.log("\n📊 Token Information:");
    console.log("Name:", await mockToken.name());
    console.log("Symbol:", await mockToken.symbol());
    console.log("Decimals:", await mockToken.decimals());
    console.log("Total Supply:", hre.ethers.formatEther(await mockToken.totalSupply()), "tokens");
    console.log("Deployer Balance:", hre.ethers.formatEther(await mockToken.balanceOf(deployerAddress)), "tokens");
    console.log("Mint Address Balance:", hre.ethers.formatEther(await mockToken.balanceOf(mintToAddress)), "tokens");
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
