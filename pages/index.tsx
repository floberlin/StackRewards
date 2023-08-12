import type { NextPage } from "next";
import Link from "next/link";
import { useContractRead, useNetwork, usePrepareContractWrite } from 'wagmi'
import StackRewards from '../utils/StackRewards.json'
  
const Home: NextPage = () => {
 
  const { chain } = useNetwork()
  const contractAddr = chain?.name === "Goerli"
       ? "0xb049977f9a53dc29aabbb67f9f9a72571a7835f2"
       : chain?.name === "Evmos Testnet" 
       ? "0x7bE0571a42bF0e4429d1fbcECA791575CFb73b4E"
       : "0x548325D23dD7FdcD3aC34daCfb51Ad10CeFd13fd";
 
   const { data:tasks, isSuccess, isLoading } = useContractRead({
     address: contractAddr,
     abi: StackRewards.abi,
     functionName: 'getBounties',
   })
 
   const { isError: isErrorContractor, } = usePrepareContractWrite({
     address: contractAddr,
     abi: StackRewards.abi,
     functionName: 'grantRoleContractor',
   })

   const { isError: isErrorEmployer } = usePrepareContractWrite({
    address: contractAddr,
    abi: StackRewards.abi,
    functionName: "grantRoleEmployer",
   });
 
   
 
   return (
     <main className="min-h-screen">
      <div className="grid grid-cols-4 gap-8 mt-2 mx-6">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">To Do</h2>
            <p>Claim tasks and reward</p>
            <Link href={"/tasks"}>
              <div>
                <button className="btn btn-primary mt-2">
                  Create Task
                </button>
              </div>
            </Link>
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">In Progress</h2>
            <p>Claim tasks and reward</p>
            <Link href={"/tasks"}>
              <div>
                <button className="btn btn-primary mt-2">
                  Move to Review
                </button>
              </div>
            </Link>
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Review</h2>
            <p>Claim tasks and reward</p>
            <Link href={"/tasks"}>
              <div>
                <button className="btn btn-primary mt-2">
                Review Task
                </button>
              </div>
            </Link>
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Done</h2>
            <p>Claim tasks and reward</p>
            
          </div>
        </div>
      </div>      
    </main>
   )
}

export default Home;
