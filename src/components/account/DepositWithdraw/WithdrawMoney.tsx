const WithdrawMoney = ({ colors }: any) => {
  return (
    <div
      className="w-full xl:w-[40%] min-h-[100px] rounded-[15px] p-[15px]"
      style={{ backgroundColor: colors.dark }}
    >
      <p className="text-[18px] font-[500]" style={{ color: colors.text }}>
        Withdraw Money
      </p>
      <div className="mt-[15px] flex flex-col gap-[10px]">
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
