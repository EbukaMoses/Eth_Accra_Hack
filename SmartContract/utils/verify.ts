import { run } from "hardhat";

interface VerifyArgs {
  address: string;
  constructorArguments: any[];
}

export const verify = async (contractAddress: string, args: any[]): Promise<void> => {
  console.log("verifying contract....");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    } as VerifyArgs);
  } catch (err: any) {
    if (err.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified!");
    } else if (err.message.toLowerCase().includes("invalid api key")) {
      console.log("⚠️  Verification skipped: Invalid API key");
      console.log("To verify manually, run:");
      console.log(`npx hardhat verify --network baseSepolia ${contractAddress}`);
    } else {
      console.log("Verification failed:", err.message);
    }
  }
};

// module.exports = { verify }