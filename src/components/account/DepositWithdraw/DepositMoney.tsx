const DepositMoney = ({ colors }: any) => {
  return (
    <div
      className="w-full xl:w-[60%] min-h-[100px] rounded-[15px] p-[15px]"
      style={{ backgroundColor: colors.dark }}
    >
      <p className="text-[18px] font-[500]" style={{ color: colors.text }}>
        Deposit Money
      </p>
      {/* cards */}
      <div className="flex flex-col sm:flex-row gap-[15px] mt-[15px]">
        <div
          className="h-[120px] w-[220px] rounded-[10px] border relative"
          style={{ borderColor: colors.line }}
        >
          <p className="font-[500] mt-[10px] ms-[10px] cursor-pointer" style={{color: colors.subText}}>
            Card 1
          </p>
          <input
            name="card"
            type="radio"
            checked
            className="absolute bottom-[10px] right-[10px]"
          />
        </div>
        <div
          className="h-[120px] w-[220px] rounded-[10px] border relative"
          style={{ borderColor: colors.line }}
        >
          <p className="font-[500] mt-[10px] ms-[10px] cursor-pointer" style={{color: colors.subText}}>
            Card 2
          </p>
          <input
            name="card"
            type="radio"
            className="absolute bottom-[10px] right-[10px]"
          />
        </div>
      </div>
      {/* cards info */}
      <table className="w-full mt-[20px]">
        <tr>
          <td
            className="border text-[14px] font-[600] ps-[7px]"
            style={{ borderColor: colors.line, color: colors.subText }}
          >
            Account Number
          </td>
          <td
            className="border text-[15px] ps-[7px] py-[2px]"
            style={{ borderColor: colors.line, color: colors.subText }}
          >
            1566020000000497
          </td>
        </tr>
        <tr>
          <td
            className="border text-[14px] font-[600] ps-[7px]"
            style={{ borderColor: colors.line, color: colors.subText }}
          >
            Account Holder
          </td>
          <td
            className="border text-[15px] ps-[7px] py-[2px]"
            style={{ borderColor: colors.line, color: colors.subText }}
          >
            ASHOK KUMAR SAHNI
          </td>
        </tr>
        <tr>
          <td
            className="border text-[14px] font-[600] ps-[7px]"
            style={{ borderColor: colors.line, color: colors.subText }}
          >
            IFSC
          </td>
          <td
            className="border text-[15px] ps-[7px] py-[2px]"
            style={{ borderColor: colors.line, color: colors.subText }}
          >
            UTKS0001566
          </td>
        </tr>
        <tr>
          <td
            className="border text-[14px] font-[600] ps-[7px]"
            style={{ borderColor: colors.line, color: colors.subText }}
          >
            Bank Name
          </td>
          <td
            className="border text-[15px] ps-[7px] py-[2px]"
            style={{ borderColor: colors.line, color: colors.subText }}
          >
            UTKARSH SMALL FINANCE BANK
          </td>
        </tr>
      </table>
      {/* deposit form */}
      <div className="mt-[15px]">
        <label
          className="font-[500] text-[14px]"
          style={{ color: colors.text }}
        >
          Amount to Deposit&nbsp;<span className="text-[red]">*</span>
        </label>
        <input
          className="h-[35px] rounded-[5px] w-full border mt-[5px] px-[10px] text-[14px] font-[500] focus:outline-none"
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
          Min. 100 || Max. 500,000
        </p>
      </div>
      {/* buttons */}
      <div className="flex gap-[10px] flex-wrap mt-[15px]">
        <Button colors={colors} text={"+ 100.00"} />
        <Button colors={colors} text={"+ 500.00"} />
        <Button colors={colors} text={"+ 1,000.00"} />
        <Button colors={colors} text={"+ 5,000.00"} />
        <Button colors={colors} text={"+ 10,000.00"} />
        <Button colors={colors} text={"+ 50,000.00"} />
      </div>
      {/* apply code */}
      <div className="mt-[15px]">
        <label
          className="font-[500] text-[14px]"
          style={{ color: colors.text }}
        >
          Select & Apply Offer&nbsp;<span className="text-[red]">*</span>
        </label>
        <input
          className="h-[35px] rounded-[5px] w-full border mt-[5px] px-[10px] text-[14px] font-[500] focus:outline-none"
          placeholder="Apply code"
          style={{
            borderColor: colors.line,
            backgroundColor: colors.dark,
            color: colors.text,
          }}
        />
      </div>
      <button className="text-[14px] h-[35px] rounded-[4px] w-full mt-[15px]" style={{ backgroundColor: colors.text, color: colors.light }}>Deposit</button>
    </div>
  );
};

export default DepositMoney;

const Button = ({ colors, text }: any) => {
  return (
    <button
      className="h-[35px] w-[115px] text-[13px] pt-[1px] font-[500] rounded-[4px]"
      style={{ backgroundColor: colors.light, color: colors.subText }}
    >
      {text}
    </button>
  );
};
