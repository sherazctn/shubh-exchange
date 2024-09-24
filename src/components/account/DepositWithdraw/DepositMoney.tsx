const DepositMoney = ({ colors }: any) => {
  return (
    <div
      className="w-[60%] min-h-[100px] rounded-[15px] p-[15px]"
      style={{ backgroundColor: colors.dark }}
    >
      <p className="text-[18px] font-[500]" style={{ color: colors.text }}>
        Deposit Money
      </p>
      {/* cards */}
      <div className="flex gap-[15px] mt-[15px]">
        <div className="h-[120px] w-[220px] rounded-[10px] border relative" style={{borderColor: colors.line}}>
          <p className="font-[500] mt-[10px] ms-[10px] cursor-pointer">
            Card 1
          </p>
          <input
            name="card"
            type="radio"
            checked
            className="absolute bottom-[10px] right-[10px]"
          />
        </div>
        <div className="h-[120px] w-[220px] rounded-[10px] border relative" style={{borderColor: colors.line}}>
          <p className="font-[500] mt-[10px] ms-[10px] cursor-pointer">
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
            <td className="border text-[14px] font-[600] ps-[7px]" style={{borderColor: colors.line, color: colors.subText}}>Account Number</td>
            <td className="border text-[15px] ps-[7px] py-[2px]" style={{borderColor: colors.line, color: colors.subText}}>1566020000000497</td>
        </tr>
        <tr>
            <td className="border text-[14px] font-[600] ps-[7px]" style={{borderColor: colors.line, color: colors.subText}}>Account Holder</td>
            <td className="border text-[15px] ps-[7px] py-[2px]" style={{borderColor: colors.line, color: colors.subText}}>ASHOK KUMAR SAHNI</td>
        </tr>
        <tr>
            <td className="border text-[14px] font-[600] ps-[7px]" style={{borderColor: colors.line, color: colors.subText}}>IFSC</td>
            <td className="border text-[15px] ps-[7px] py-[2px]" style={{borderColor: colors.line, color: colors.subText}}>UTKS0001566</td>
        </tr>
        <tr>
            <td className="border text-[14px] font-[600] ps-[7px]" style={{borderColor: colors.line, color: colors.subText}}>Bank Name</td>
            <td className="border text-[15px] ps-[7px] py-[2px]" style={{borderColor: colors.line, color: colors.subText}}>UTKARSH SMALL FINANCE BANK</td>
        </tr>
      </table>
    </div>
  );
};

export default DepositMoney;
