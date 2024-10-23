import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

import Loader from "../../Loader";
import { createBankApi, createWithdrawApi, deleteBankByIdApi, getUserBankApi } from "../../../api/api";

import { MdDelete } from "react-icons/md";
import { Banks } from "../../../json-data/bank";

const WithdrawMoney = ({ colors }: any) => {
  const [accountSelection, setAccountSelection] = useState("");
  const panelMainColor = useSelector((state: any) => state.panelMainColor);
  const panelSecColor = useSelector((state: any) => state.panelSecColor);
  const wallet = useSelector((state: any) => state.wallet);

  const [withdraw, setWithdraw] = useState(500);
  const [withDrawLoader, setWithdrawLoader] = useState(false);
  const [userBanks, setUserBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState<any>({});

  useEffect(() => {
    fn_getUserBanks();
  }, []);

  const [state, setState] = useState({
    accountNo: "",
    bank: "",
    name: "",
    ibn: "",
    upi: "",
  });

  const fn_getUserBanks = async () => {
    const response = await getUserBankApi();
    if (response?.status) {
      setUserBanks(response?.data?.reverse())
    } else {
      setUserBanks([]);
    }
  }

  const fn_submit = async () => {
    if (withdraw < 500 || withdraw === null || withdraw === undefined) {
      return toast.error("Enter Correct Amount")
    }
    if (accountSelection === "") {
      return toast.error("Select Saved or New Account")
    }
    if (wallet < withdraw) {
      return toast.error("No Enough Balance");
    }
    if (accountSelection === "savedAccounts") {
      if (Object.keys(selectedBank)?.length === 0) return toast.error("Select Bank");
      setWithdrawLoader(true);
      const res: any = await createWithdrawApi({
        bankId: selectedBank?._id,
        amount: withdraw
      })
      if (res?.status) {
        setWithdrawLoader(false);
        setSelectedBank({});
        return toast.success(res.message)
      } else {
        setWithdrawLoader(false);
        return toast.error(res.message)
      }
    }
    if (state.bank !== "UPI Payment") {
      if (state.accountNo === "" || state.bank === "" || state.ibn === "" || state.name === "") {
        return toast.error("Fill all Fields");
      }
    } else {
      if (state.accountNo === "" || state.name === "") {
        return toast.error("Fill all Fields");
      }
    }
    setWithdrawLoader(true);
    const response = await createBankApi({
      accountNo: state.accountNo,
      bank: state.bank,
      ibn: state.bank === "UPI Payment" ? "" : state.ibn,
      name: state.name,
    });
    if (response?.status) {
      const res: any = await createWithdrawApi({
        bankId: response?.data?._id,
        amount: withdraw
      });
      if (res?.status) {
        setState((prev) => ({ ...prev, accountNo: "", bank: "", name: "", ibn: "" }));
        setWithdrawLoader(false);
        fn_getUserBanks();
        return toast.success(res.message)
      } else {
        setWithdrawLoader(false);
        return toast.error(res.message)
      }
    } else {
      setWithdrawLoader(false);
      return toast.error(response?.message)
    }
  }

  return (
    <div
      className="w-full xl:w-[40%] h-[max-content] rounded-[15px] p-[15px]"
      style={{ backgroundColor: colors.dark }}
    >
      <p className="text-[18px] font-[500]" style={{ color: panelSecColor }}>
        Withdraw Money
      </p>
      <div className="mt-[15px] flex flex-col gap-[10px]">
        {/* Amount to withdraw */}
        <div>
          <label
            className="font-[500] text-[14px]"
            style={{ color: panelSecColor }}
          >
            Amount to withdraw&nbsp;<span className="text-[red]">*</span>
          </label>
          <input
            type="number"
            className="h-[35px] rounded-[5px] w-full border mt-[2px] px-[10px] text-[14px] font-[500] focus:outline-none"
            placeholder="Amount"
            min={500}
            value={withdraw}
            onChange={(e) => setWithdraw(parseInt(e.target.value))}
            style={{
              borderColor: colors.line,
              backgroundColor: colors.dark,
              color: colors.text,
            }}
          />
          <p
            className="mt-[2px] text-[13px] text-end"
            style={{ color: colors.subText }}
          >
            Min. 500 || Max. 200,000
          </p>
        </div>
        {/* Choose Account */}
        <div>
          <div
            className="flex gap-[10px] font-[500] text-[15px] cursor-pointer"
            style={{ color: panelSecColor }}
            onClick={() => setAccountSelection("savedAccounts")}
          >
            <input
              type="radio"
              checked={accountSelection === "savedAccounts"}
              className="scale-[1.1] cursor-pointer"
              id="savedAccounts"
            />
            <label htmlFor="savedAccounts" className="cursor-pointer">
              Continue with Saved Accounts
            </label>
          </div>
          <div
            className="flex gap-[10px] font-[500] text-[15px] cursor-pointer"
            style={{ color: panelSecColor }}
            onClick={() => setAccountSelection("newOne")}
          >
            <input
              type="radio"
              checked={accountSelection === "newOne"}
              className="scale-[1.1] cursor-pointer"
              id="newOne"
            />
            <label htmlFor="newOne" className="cursor-pointer">
              Add New Account
            </label>
          </div>
        </div>
        {accountSelection === "newOne" && <NewAccount colors={colors} panelSecColor={panelSecColor} state={state} setState={setState} />}
        {accountSelection === "savedAccounts" && (
          <SavedAccount data={userBanks} setSelectedBank={setSelectedBank} selectedBank={selectedBank} fn_getUserBanks={fn_getUserBanks} />
        )}
        <button
          className="text-[14px] h-[35px] rounded-[4px] w-full mt-[5px] flex justify-center items-center"
          style={{ backgroundColor: panelSecColor, color: panelMainColor }}
          onClick={fn_submit}
        >
          {!withDrawLoader ? "Withdraw" : <Loader size={22} color="white" />}
        </button>
      </div>
    </div>
  );
};

export default WithdrawMoney;

const NewAccount = ({ colors, panelSecColor, state, setState }: any) => {
  return (
    <>
      {/* Bank Account */}
      <div>
        <div className="flex justify-between items-end">
          <label
            className="font-[500] text-[14px]"
            style={{ color: panelSecColor }}
          >
            Bank Account&nbsp;<span className="text-[red]">*</span>
          </label>
        </div>
        <select
          className="h-[35px] rounded-[5px] w-full border mt-[2px] px-[10px] text-[14px] font-[500] focus:outline-none"
          onChange={(e) => setState((prev: any) => ({ ...prev, bank: e.target.value }))}
          style={{
            borderColor: colors.line,
            backgroundColor: colors.dark,
            color: colors.text,
          }}
        >
          <option value={""} selected disabled>---Select Bank---</option>
          {Banks.map((item, index) => (
            <option key={index} value={item?.title}>{item?.title}</option>
          ))}
        </select>
      </div>
      {/* Account Number */}
      <div>
        <div className="flex justify-between items-end">
          <label
            className="font-[500] text-[14px]"
            style={{ color: panelSecColor }}
          >
            Account Number&nbsp;<span className="text-[red]">*</span>
          </label>
          <label className="text-[11px]" style={{ color: colors.subText }}>
            (9-18 characters allowed)
          </label>
        </div>
        <input
          type="number"
          className="h-[35px] rounded-[5px] w-full border mt-[2px] px-[10px] text-[14px] font-[500] focus:outline-none"
          placeholder="Account Number"
          value={state.accountNo}
          onChange={(e) => setState((prev: any) => ({ ...prev, accountNo: e.target.value }))}
          style={{
            borderColor: colors.line,
            backgroundColor: colors.dark,
            color: colors.text,
          }}
        />
      </div>
      {/* Account Holder Name */}
      <div>
        <div className="flex justify-between items-end">
          <label
            className="font-[500] text-[14px]"
            style={{ color: panelSecColor }}
          >
            Account Holder Name&nbsp;<span className="text-[red]">*</span>
          </label>
          <label className="text-[11px]" style={{ color: colors.subText }}>
            (4-100 characters allowed)
          </label>
        </div>
        <input
          className="h-[35px] rounded-[5px] w-full border mt-[2px] px-[10px] text-[14px] font-[500] focus:outline-none"
          placeholder="Account Holder Name"
          value={state.name}
          onChange={(e) => setState((prev: any) => ({ ...prev, name: e.target.value }))}
          style={{
            borderColor: colors.line,
            backgroundColor: colors.dark,
            color: colors.text,
          }}
        />
      </div>
      {/* IBN Number */}
      {state.bank !== "UPI Payment" && (
        < div >
          <div className="flex justify-between items-end">
            <label
              className="font-[500] text-[14px]"
              style={{ color: panelSecColor }}
            >
              IBN Number&nbsp;<span className="text-[red]">*</span>
            </label>
            <label className="text-[11px]" style={{ color: colors.subText }}>
              (11-18 characters allowed)
            </label>
          </div>
          <input
            type="number"
            className="h-[35px] rounded-[5px] w-full border mt-[2px] px-[10px] text-[14px] font-[500] focus:outline-none"
            placeholder="IBN Number"
            value={state.ibn}
            onChange={(e) => setState((prev: any) => ({ ...prev, ibn: e.target.value }))}
            style={{
              borderColor: colors.line,
              backgroundColor: colors.dark,
              color: colors.text,
            }}
          />
        </div>
      )}
    </>
  );
};

const SavedAccount = ({ data, setSelectedBank, selectedBank, fn_getUserBanks }: any) => {
  const fn_deleteBank = async (id: string) => {
    const response = await deleteBankByIdApi(id);
    if (response?.status) {
      setSelectedBank({});
      fn_getUserBanks();
      return toast.success(response?.message)
    } else {
      return toast.error(response?.message);
    }
  }
  return (
    <div className="flex flex-col gap-[5px]">
      <div className="flex flex-nowrap gap-[10px] overflow-auto">
        {data.map((item: any) => {
          const bankImg: any = Banks.find(i => i.title === item?.bank)?.img;
          return (
            <div key={item?._id} onClick={() => setSelectedBank(item)} className={`relative border cursor-pointer rounded-[10px] min-w-[100px] min-h-[100px] sm:min-w-[130px] sm:min-h-[130px] flex justify-center items-center ${selectedBank?._id === item?._id ? "border-gray-700" : "border-gray-200"}`}>
              <img src={bankImg} alt="" className="w-full h-full max-w-[100px] object-contain" />
              <div className="absolute shadow-md top-[5px] right-[5px] bg-white rounded-full w-[20px] h-[20px] border flex justify-center items-center">
                <MdDelete className="text-red-500 text-[14px]" onClick={() => fn_deleteBank(item._id)} />
              </div>
            </div>
          )
        })}
      </div>
      {Object.keys(selectedBank).length > 0 && (
        <table className="w-full mt-[20px]">
          <tr>
            <td
              className="border text-[14px] font-[600] ps-[7px] w-[180px]"
            >
              Bank Name
            </td>
            <td
              className="border text-[15px] ps-[7px] py-[2px]"
            >
              {selectedBank?.bank}
            </td>
          </tr>
          <tr>
            <td
              className="border text-[14px] font-[600] ps-[7px] w-[180px]"
            >
              Account Number
            </td>
            <td
              className="border text-[15px] ps-[7px] py-[2px]"
            >
              {selectedBank?.accountNo}
            </td>
          </tr>
          <tr>
            <td
              className="border text-[14px] font-[600] ps-[7px]"
            >
              Account Holder Name
            </td>
            <td
              className="border text-[15px] ps-[7px] py-[2px]"
            >
              {selectedBank?.name}
            </td>
          </tr>
          {selectedBank?.bank !== "UPI Payment" && (
            <tr>
              <td
                className="border text-[14px] font-[600] ps-[7px]"
              >
                IBN No.
              </td>
              <td
                className="border text-[15px] ps-[7px] py-[2px]"
              >
                {selectedBank?.ibn}
              </td>
            </tr>
          )}
        </table>
      )}
    </div>
  );
};
