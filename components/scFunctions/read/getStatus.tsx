import { useContractRead, useNetwork } from "wagmi";
import StackRewards from "../../../utils/StackRewards.json";

export function GetStatus(ipfsId: string | string[] | undefined) {
  const { chain } = useNetwork();
  const contractAddr =
    chain?.name === "Goerli"
      ? "0xb049977f9a53dc29aabbb67f9f9a72571a7835f2"
      : chain?.name === "Evmos Testnet"
      ? "0x7bE0571a42bF0e4429d1fbcECA791575CFb73b4E"
      : "0x548325D23dD7FdcD3aC34daCfb51Ad10CeFd13fd";

  const { data, isLoading, isSuccess } = useContractRead({
    addressOrName: contractAddr,
    contractInterface: StackRewards.abi,
    functionName: "getStatus",
    args: [ipfsId],
  });

  return data;
}
