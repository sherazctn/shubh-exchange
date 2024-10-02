import { useState } from "react";

import card1 from "../../../assets/card-1.png";
import card2 from "../../../assets/card-2.png";

const WithdrawMoney = ({ colors }: any) => {
  const [accountSelection, setAccountSelection] = useState("");
  return (
    <div
      className="w-full xl:w-[40%] h-[max-content] rounded-[15px] p-[15px]"
      style={{ backgroundColor: colors.dark }}
    >
      <p className="text-[18px] font-[500]" style={{ color: colors.text }}>
        Withdraw Money
      </p>
      <div className="mt-[15px] flex flex-col gap-[10px]">
        {/* Amount to withdraw */}
        <div>
          <label
            className="font-[500] text-[14px]"
            style={{ color: colors.text }}
          >
            Amount to withdraw&nbsp;<span className="text-[red]">*</span>
          </label>
          <input
            className="h-[35px] rounded-[5px] w-full border mt-[2px] px-[10px] text-[14px] font-[500] focus:outline-none"
            placeholder="Amount"
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
            style={{ color: colors.text }}
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
            style={{ color: colors.text }}
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
        {accountSelection === "newOne" && <NewAccount colors={colors} />}
        {accountSelection === "savedAccounts" && (
          <SavedAccount />
        )}
        <button
          className="text-[14px] h-[35px] rounded-[4px] w-full mt-[5px]"
          style={{ backgroundColor: colors.text, color: colors.light }}
        >
          Withdraw
        </button>
      </div>
    </div>
  );
};

export default WithdrawMoney;

const NewAccount = ({ colors }: any) => {
  return (
    <>
      {/* Account Number */}
      <div>
        <div className="flex justify-between items-end">
          <label
            className="font-[500] text-[14px]"
            style={{ color: colors.text }}
          >
            Account Number&nbsp;<span className="text-[red]">*</span>
          </label>
          <label className="text-[11px]" style={{ color: colors.subText }}>
            (9-18 characters allowed)
          </label>
        </div>
        <input
          className="h-[35px] rounded-[5px] w-full border mt-[2px] px-[10px] text-[14px] font-[500] focus:outline-none"
          placeholder="Account Number"
          style={{
            borderColor: colors.line,
            backgroundColor: colors.dark,
            color: colors.text,
          }}
        />
      </div>
      {/* IFSC */}
      <div>
        <div className="flex justify-between items-end">
          <label
            className="font-[500] text-[14px]"
            style={{ color: colors.text }}
          >
            IFSC&nbsp;<span className="text-[red]">*</span>
          </label>
          <label className="text-[11px]" style={{ color: colors.subText }}>
            (11 characters allowed)
          </label>
        </div>
        <input
          className="h-[35px] rounded-[5px] w-full border mt-[2px] px-[10px] text-[14px] font-[500] focus:outline-none"
          placeholder="IFSC Code"
          style={{
            borderColor: colors.line,
            backgroundColor: colors.dark,
            color: colors.text,
          }}
        />
      </div>
      {/* Bank Name */}
      <div>
        <div className="flex justify-between items-end">
          <label
            className="font-[500] text-[14px]"
            style={{ color: colors.text }}
          >
            Bank Name&nbsp;<span className="text-[red]">*</span>
          </label>
          <label className="text-[11px]" style={{ color: colors.subText }}>
            (4-50 characters allowed)
          </label>
        </div>
        <input
          className="h-[35px] rounded-[5px] w-full border mt-[2px] px-[10px] text-[14px] font-[500] focus:outline-none"
          placeholder="Bank Name"
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
            style={{ color: colors.text }}
          >
            Account Holder Name&nbsp;<span className="text-[red]">*</span>
          </label>
          <label className="text-[11px]" style={{ color: colors.subText }}>
            (4-100 characters allowed)
          </label>
        </div>
        <input
          className="h-[35px] rounded-[5px] w-full border mt-[2px] px-[10px] text-[14px] font-[500] focus:outline-none"
          placeholder="Account Name"
          style={{
            borderColor: colors.line,
            backgroundColor: colors.dark,
            color: colors.text,
          }}
        />
      </div>
    </>
  );
};

const SavedAccount = () => {
  const [selectedCard, setSelectedCard] = useState("card1");
  return (
    <div className="flex flex-col gap-[5px]">
      <div className="relative w-[max-content]">
        <img
          alt="card-1"
          src={card1}
          className="w-[230px] sm:w-[300px] cursor-pointer"
          onClick={() => setSelectedCard("card1")}
        />
        <input
          type="radio"
          checked={selectedCard === "card1"}
          className="absolute bottom-[15px] right-[15px] scale-[1.5] cursor-pointer"
          onChange={() => setSelectedCard("card1")}
        />
      </div>
      <div className="relative w-[max-content]">
        <img
          alt="card-2"
          src={card2}
          className="w-[230px] sm:w-[300px] cursor-pointer"
          onClick={() => setSelectedCard("card2")}
        />
        <input
          type="radio"
          checked={selectedCard === "card2"}
          className="absolute bottom-[15px] right-[15px] scale-[1.5] cursor-pointer"
          onChange={() => setSelectedCard("card2")}
        />
      </div>
    </div>
  );
};
