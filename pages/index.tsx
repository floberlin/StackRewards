import type { NextPage } from "next";
import Link from "next/link";
import {
  useContractRead,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
} from "wagmi";
import StackRewards from "../utils/StackRewards.json";

const Home: NextPage = () => {
  const contractAddr = "0x74Aad706E6A8D7E2a2273a848258F50d74EB50C0";
  const tokenAddr = "0x48D64975cDe76b955967AAfF0EFdAbf8ca22a1a4";

  const { config: cEyer } = usePrepareContractWrite({
    address: contractAddr,
    abi: StackRewards.abi,
    functionName: "grantRoleEmployer",
  });

  const { config: cEyee } = usePrepareContractWrite({
    address: contractAddr,
    abi: StackRewards.abi,
    functionName: "grantRoleEmployer",
  });

  const {
    data,
    error,
    isError,
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
  });
  const { write: createT1 } = useContractWrite(c1);

  const { config: c10 } = usePrepareContractWrite({
    address: contractAddr,
    abi: StackRewards.abi,
    functionName: "createTask",
    args: [10],
  });
  const { write: createT10 } = useContractWrite(c10);

  const { config: c100 } = usePrepareContractWrite({
    address: contractAddr,
    abi: StackRewards.abi,
    functionName: "createTask",
    args: [100],
  });
  const { write: createT100 } = useContractWrite(c100);

  function createTask1() {
    createT1?.();
  }

  function createTask10() {
    createT10?.();
  }

  function createTask100() {
    createT100?.();
  }

  return (
    <main className="min-h-screen">
      <div className="grid grid-cols-4 gap-8 mt-2 mx-6">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">To Do</h2>
            
       
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
            <h2 className="card-title">In Progress</h2>
           
            <Link href={"/tasks"}>
              <div>
                <button className="btn btn-primary mt-2">Move to Review</button>
              </div>
            </Link>
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Review</h2>
            
            <Link href={"/tasks"}>
              <div>
                <button className="btn btn-primary mt-2">Review Task</button>
              </div>
            </Link>
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
