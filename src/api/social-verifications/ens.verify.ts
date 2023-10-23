import axios from "axios";
import { ethers } from "ethers";
import {
  JsonRpcProvider,
  JsonRpcSigner,
  StaticJsonRpcProvider
} from "@ethersproject/providers";

export const verifyENS = async (userAddress: string) => {
  // name and address in question (unverified by resolver)

  const provider: StaticJsonRpcProvider = new StaticJsonRpcProvider(
    "https://polygon-mumbai.g.alchemy.com/v2/G742dEaaWF0gE-SL0IlEFAJdlA_l7ezJ"
  );

  debugger;
  const reportedName = await provider.lookupAddress(userAddress);
  const valid = Boolean(reportedName);

  const name = "registrar.firefly.eth";
  const address = "0x6fC21092DA55B392b045eD78F4732bff3C580e2c";

  // provider address
  //   const provider = "0xa75D20DdA7883CBF720b131938B6DcE4d733F877";
  // provider address
  //   try {
  //     const result = await axios.post(
  //       "https://verify.ensverify.com/",
  //       JSON.stringify({ name })
  //     );
  //     const payload = {
  //       name, // name to verify
  //       address, // address to verify
  //       timestamp: result.data.t // call timestamp
  //     };

  //     // signed digest
  //     const hashDigest = ethers.utils.keccak256(
  //       ethers.utils.toUtf8Bytes(JSON.stringify(payload))
  //     );

  //     if (provider == ethers.utils.recoverAddress(hashDigest, result.data.s)) {
  //       debugger;
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   } catch (error) {
  //     return false;
  //   }
};
