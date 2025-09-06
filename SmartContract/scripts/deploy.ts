import hre from "hardhat";
import { verify } from "../utils/verify";

async function main() {
  const GiftChainFactory = await hre.ethers.getContractFactory("GiftChain")
  // const relayer = "0xA07139110776DF9621546441fc0a5417B8E945DF"
  const gift = await GiftChainFactory.deploy();

  const deployedAddress = await gift.getAddress();
  const chainId = await hre.ethers.provider.getNetwork();
  console.log("chainId: ", chainId);

  console.log("Deployed contract to: ", deployedAddress);

  // Skip verification for now - uncomment below to enable
  console.log("✅ Contract deployed successfully!");
  console.log("📋 Contract Address:", deployedAddress);
  console.log("🔗 View on Base Sepolia:", `https://sepolia.basescan.org/address/${deployedAddress}`);
  console.log("🔑 To verify later, run:");
  console.log(`npx hardhat verify --network baseSepolia ${deployedAddress}`);

  // Uncomment the line below to enable verification
  verify(deployedAddress, []);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});