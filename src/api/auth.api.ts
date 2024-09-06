import { ethers } from "ethers";
import { Web3AllowlistProvider } from "@aut-labs/abi-types";

export const isAllowListed = async (
  signer: ethers.JsonRpcSigner,
  contractAddress: string
) => {
  try {
    const account = signer.address;
    const contract = Web3AllowlistProvider(contractAddress, {
      signer: () => signer
    });
    const isAllowed = await contract.isAllowed(account);
    if (!isAllowed) {
      throw new Error(
        "Aw shucks, it looks like you’re not on the Allowlist for this round."
      );
    }
    return isAllowed;
  } catch (error) {
    throw new Error(
      "Aw shucks, it looks like you’re not on the Allowlist for this round."
    );
  }
};
