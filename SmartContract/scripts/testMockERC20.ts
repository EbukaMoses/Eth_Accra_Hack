import hre from "hardhat";

async function main() {
    // Replace with your deployed contract address
    const contractAddress = "0xYourContractAddressHere"; // Update this with your deployed address

    console.log("🧪 Testing MockERC20 contract...");
    console.log("📋 Contract Address:", contractAddress);

    try {
        // Get the contract instance
        const MockERC20Factory = await hre.ethers.getContractFactory("MockERC20");
        const mockToken = MockERC20Factory.attach(contractAddress);

        // Test basic functions
        console.log("\n📊 Testing contract functions:");

        const name = await mockToken.name();
        console.log("✅ Name:", name);

        const symbol = await mockToken.symbol();
        console.log("✅ Symbol:", symbol);

        const decimals = await mockToken.decimals();
        console.log("✅ Decimals:", decimals);

        const totalSupply = await mockToken.totalSupply();
        console.log("✅ Total Supply:", hre.ethers.formatEther(totalSupply), "tokens");

        // Get deployer address
        const [deployer] = await hre.ethers.getSigners();
        const deployerAddress = await deployer.getAddress();

        const balance = await mockToken.balanceOf(deployerAddress);
        console.log("✅ Deployer Balance:", hre.ethers.formatEther(balance), "tokens");

        console.log("\n🎉 All tests passed! Contract is working correctly.");

    } catch (error) {
        console.error("❌ Error testing contract:", error);
        console.log("\n🔍 Troubleshooting tips:");
        console.log("1. Make sure the contract address is correct");
        console.log("2. Ensure the contract is deployed on the correct network");
        console.log("3. Check if the contract deployment was successful");
        console.log("4. Verify your network connection");
    }
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
