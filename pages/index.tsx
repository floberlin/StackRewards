import type { NextPage } from "next";
import Link from "next/link";
import {
  useContractRead,
  useContractReads,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
} from "wagmi";
import StackRewards from "../utils/StackRewards.json";
import { useState } from "react";
import { set } from "nprogress";

const Home: NextPage = () => {
  const contractAddr = "0x74Aad706E6A8D7E2a2273a848258F50d74EB50C0";
  const tokenAddr = "0x48D64975cDe76b955967AAfF0EFdAbf8ca22a1a4";

  const { config: cEyer } = usePrepareContractWrite({
    address: contractAddr,
    abi: StackRewards.abi,
    functionName: "grantRoleEmployer",
    enabled: true,
  });

  const { config: cEyee } = usePrepareContractWrite({
    address: contractAddr,
    abi: StackRewards.abi,
    functionName: "grantRoleEmployer",
    enabled: true,
  });

  const {
    data,
    error,
    isError,
    isLoading,
    isSuccess,
    write: grantEmployer,
  } = useContractWrite(cEyer);
  const {
    data: data2,
    error: error2,
    isError: isError2,
    write: grantEmployee,
  } = useContractWrite(cEyee);

  const { config: c1 } = usePrepareContractWrite({
    address: contractAddr,
    abi: StackRewards.abi,
    functionName: "createTask",
    args: [1],
    enabled: true,
  });
  const {
    data: d1,
    error: e1,
    isError: isE1,
    isLoading: isL1,
    isSuccess: isS1,
    write: createT1,
  } = useContractWrite(c1);

  const { config: c10 } = usePrepareContractWrite({
    address: contractAddr,
    abi: StackRewards.abi,
    functionName: "createTask",
    args: [10],
    enabled: true,
  });
  const { write: createT10 } = useContractWrite(c10);

  const { config: c100 } = usePrepareContractWrite({
    address: contractAddr,
    abi: StackRewards.abi,
    functionName: "createTask",
    args: [100],
    enabled: true,
  });
  const { write: createT100 } = useContractWrite(c100);

  const [nr, setNR] = useState(0);

  const { config: aT } = usePrepareContractWrite({
    address: contractAddr,
    abi: StackRewards.abi,
    functionName: "assignTask",
    args: [nr],
  });
  const { write: assign, isError:ttt, isSuccess:ssss,  } = useContractWrite(aT);

  console.log("hello", ttt, ssss);

  const readContract = {
    address: contractAddr,
    abi: StackRewards.abi,
  };

  const { data: readReward } = useContractReads({
    contracts: [
      {
        ...readContract,
        functionName: "taskIDtoReward",
        args: [0],
      },
      {
        ...readContract,
        functionName: "taskIDtoReward",
        args: [1],
      },
      {
        ...readContract,
        functionName: "taskIDtoReward",
        args: [2],
      },
      {
        ...readContract,
        functionName: "taskIDtoReward",
        args: [3],
      },
      {
        ...readContract,
        functionName: "taskIDtoReward",
        args: [4],
      },
      {
        ...readContract,
        functionName: "taskIDtoReward",
        args: [5],
      },
      {
        ...readContract,
        functionName: "taskIDtoReward",
        args: [6],
      },
      {
        ...readContract,
        functionName: "taskIDtoReward",
        args: [7],
      },
      {
        ...readContract,
        functionName: "taskIDtoReward",
        args: [8],
      },
      {
        ...readContract,
        functionName: "taskIDtoReward",
        args: [9],
      },
      {
        ...readContract,
        functionName: "taskIDtoReward",
        args: [10],
      },
      {
        ...readContract,
        functionName: "taskIDtoReward",
        args: [11],
      },
      {
        ...readContract,
        functionName: "taskIDtoReward",
        args: [12],
      },
      {
        ...readContract,
        functionName: "taskIDtoReward",
        args: [13],
      },
      {
        ...readContract,
        functionName: "taskIDtoReward",
        args: [14],
      },
      {
        ...readContract,
        functionName: "taskIDtoReward",
        args: [15],
      },
      {
        ...readContract,
        functionName: "taskIDtoReward",
        args: [16],
      },
      {
        ...readContract,
        functionName: "taskIDtoReward",
        args: [17],
      },
      {
        ...readContract,
        functionName: "taskIDtoReward",
        args: [18],
      },
    ],
  });


  const { data: readAssigned } = useContractReads({
    contracts: [
      {
        ...readContract,
        functionName: "taskIDtoEmployee",
        args: [0],
      },
      {
        ...readContract,
        functionName: "taskIDtoEmployee",
        args: [1],
      },
      {
        ...readContract,
        functionName: "taskIDtoEmployee",
        args: [2],
      },
      {
        ...readContract,
        functionName: "taskIDtoEmployee",
        args: [3],
      },
      {
        ...readContract,
        functionName: "taskIDtoEmployee",
        args: [4],
      },
      {
        ...readContract,
        functionName: "taskIDtoEmployee",
        args: [5],
      },
      {
        ...readContract,
        functionName: "taskIDtoEmployee",
        args: [6],
      },
      {
        ...readContract,
        functionName: "taskIDtoReward",
        args: [7],
      },
      {
        ...readContract,
        functionName: "taskIDtoEmployee",
        args: [8],
      },
      {
        ...readContract,
        functionName: "taskIDtoEmployee",
        args: [9],
      },
      {
        ...readContract,
        functionName: "taskIDtoEmployee",
        args: [10],
      },
      {
        ...readContract,
        functionName: "taskIDtoEmployee",
        args: [11],
      },
      {
        ...readContract,
        functionName: "taskIDtoEmployee",
        args: [12],
      },
      {
        ...readContract,
        functionName: "taskIDtoEmployee",
        args: [13],
      },
      {
        ...readContract,
        functionName: "taskIDtoEmployee",
        args: [14],
      },
      {
        ...readContract,
        functionName: "taskIDtoEmployee",
        args: [15],
      },
      {
        ...readContract,
        functionName: "taskIDtoEmployee",
        args: [16],
      },
      {
        ...readContract,
        functionName: "taskIDtoEmployee",
        args: [17],
      },
      {
        ...readContract,
        functionName: "taskIDtoEmployee",
        args: [18],
      },
    ],
  });


  const { config: capprove } = usePrepareContractWrite({
    address: contractAddr,
    abi: StackRewards.abi,
    functionName: "approveCompletedTask",
    args: [nr],
    enabled: true,
  });
  const { write: approveTask } = useContractWrite(capprove);

  const { config: cclaimReward } = usePrepareContractWrite({
    address: contractAddr,
    abi: StackRewards.abi,
    functionName: "claimReward",
    args: [nr, tokenAddr],
    enabled: true,
  });
  const { write: claimReward } = useContractWrite(cclaimReward);



  function createTask1() {
    createT1?.();
  }

  function createTask10() {
    createT10?.();
  }

  function createTask100() {
    createT100?.();
  }

  function assignTask(index:any) {
    setNR(index);
    assign?.();
  }

  function approveTaskcall(index:any) {
    setNR(index);
    approveTask?.();
  }

  function claimRewardcall(index:any) {
    setNR(index);
    claimReward?.();
  }

  

  return (
    <main className="min-h-screen">
      <div className="grid grid-cols-4 gap-8 mt-2 mx-6">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Create a Task with Reward</h2>

            <div>
              <button
                className="btn btn-primary mt-2"
                onClick={() => createTask1()}
              >
                Create Task with 1 RewardsPoint
              </button>
              <button
                className="btn btn-primary mt-2"
                onClick={() => createTask10()}
              >
                Create Task with 10 RewardsPoint
              </button>
              <button
                className="btn btn-primary mt-2"
                onClick={() => createTask100()}
              >
                Create Task with 100 RewardsPoint
              </button>
            </div>
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Assign to a Task</h2>
            <div>
              {readReward?.map(
                (reward: any, index: any) =>
                  reward?.toString() != "0" && (
                    <div key={index}>
                      <button
                        className="btn btn-primary mt-2"
                        onClick={() => assignTask}
                        disabled={!assign}
                      >
                        Task ID {index} with Reward:
                        {reward?.toString()}
                      </button>
                    </div>
                  )
              )}
              <div className="card bg-base-100 shadow-xl"></div>
            </div>

           
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Review</h2>
            <div>
              {readAssigned?.map(
                (task: any, index: any) =>
                  task?.toString() != "0x0000000000000000000000000000000000000000" && (
                    <div key={index}>
                      <div
                        className="btn btn-primary mt-2"
                        onClick={() => {}}
                        
                      >
                        Task Owner {task?.toString().slice(0, 5) + "..." + task?.toString().slice(39, 99) } 
                      </div>
                    </div>
                  )
              )}
              <div className="card bg-base-100 shadow-xl"></div>
            </div>

           
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Done</h2>
          </div>
        </div>
      </div>
      <div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <button
          className="btn btn-primary mt-2"
          onClick={() => grantEmployer?.()}
          disabled={!grantEmployer}
        >
          Register as Employer
        </button>
      </div>
      <div>
        <button
          className="btn btn-primary mt-2"
          onClick={() => grantEmployee?.()}
          disabled={!grantEmployee}
        >
          Register as Employee
        </button>
      </div>
    </main>
  );
};

export default Home;
