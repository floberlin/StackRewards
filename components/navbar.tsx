import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { usePrepareContractWrite, useNetwork, useAccount } from "wagmi";
import StackRewards from '../utils/StackRewards.json'

const Navbar = () => {
  const { chain } = useNetwork();
  const { isConnected } = useAccount();
  const contractAddr =
    chain?.name === "Goerli"
      ? "0xb049977f9a53dc29aabbb67f9f9a72571a7835f2"
      : chain?.name === "Evmos Testnet"
      ? "0x7bE0571a42bF0e4429d1fbcECA791575CFb73b4E"
      : "0x548325D23dD7FdcD3aC34daCfb51Ad10CeFd13fd";

  const { isError: isErrorEmployer } = usePrepareContractWrite({
    address: contractAddr,
    abi: StackRewards.abi,
    functionName: "grantRoleEmployer",
  });

  const { isError: isErrorContractor } = usePrepareContractWrite({
    address: contractAddr,
    abi: StackRewards.abi,
    functionName: "grantRoleContractor",
  });

  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  if (typeof window === "undefined") {
    return <></>;
  } else {
    return (
      <header>
        <div className="navbar bg-base-100">
          <div className="navbar-start">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
             
              </ul>
            </div>
            <Link href={"/"}>
              <label className="btn btn-ghost normal-case text-xl">
                <Image
                  src="https://i.ibb.co/zZKtF1J/stackrewards.png"
                  width="55"
                  height="50"
                  alt="logo"
                  quality="100"
                  lazyBoundary="400px"
                />{" "}
                <div> StackRewards</div>
              </label>
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
           
          </div>
          <div className="navbar-end">
            {isConnected ? (
              <ConnectButton
                label="LOGIN"
                showBalance={{
                  smallScreen: false,
                  largeScreen: true,
                }}
                chainStatus="icon"
                accountStatus={{
                  smallScreen: "avatar",
                  largeScreen: "full",
                }}
              />
            ) : (
              <div className="flex align-middle mr-6">
                <div className="mt-1 mr-2">
                  <ConnectButton
                    label="Login"
                    showBalance={{
                      smallScreen: false,
                      largeScreen: true,
                    }}
                    chainStatus="icon"
                    accountStatus={{
                      smallScreen: "avatar",
                      largeScreen: "full",
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    );
  }
};

export default Navbar;
