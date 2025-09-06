import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const MockERC20Module = buildModule("MockERC20Module", (m) => {
    // Token parameters - you can override these when deploying
    const tokenName = m.getParameter("tokenName", "Mock USDC");
    const tokenSymbol = m.getParameter("tokenSymbol", "mUSDC");
    const initialSupply = m.getParameter("initialSupply", m.parseEther("1000000")); // 1 million tokens

    // Deploy the MockERC20 contract
    const mockERC20 = m.contract("MockERC20", [tokenName, tokenSymbol, initialSupply]);

    return { mockERC20 };
});

export default MockERC20Module;
