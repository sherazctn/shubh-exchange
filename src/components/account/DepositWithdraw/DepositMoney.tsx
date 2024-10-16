import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import bankOfIndia from "../../../assets/bank-of-India.png";
import bankOfMaharashtra from "../../../assets/bank-of-maharashtra.png";
import axisBank from "../../../assets/axis-bank.png";
import ucoBank from "../../../assets/uco-bank.jpg";
import bandhanBank from "../../../assets/bandhan-bank.png";
import { getAllBanksApi } from "../../../api/api";

const DepositMoney = ({ colors }: any) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const panelMainColor = useSelector((state: any) => state.panelMainColor);
  const panelSecColor = useSelector((state: any) => state.panelSecColor);

  const [depositeAmount, setDepositeAmount] = useState<any>();

  const [banks, setBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState<any>({});

  useEffect(() => {
    fn_getBanks();
  }, []);

  const fn_selectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const fn_getBanks = async () => {
    const response = await getAllBanksApi();
    if (response?.status) {
      setBanks(response?.data)
    } else {
      setBanks([]);
    }
  }

  return (
    <div
      className="w-full xl:w-[60%] h-[max-content] rounded-[15px] p-[15px]"
      style={{ backgroundColor: colors.dark }}
    >
      <p className="text-[18px] font-[500]" style={{ color: panelSecColor }}>
        Deposit Money
      </p>
      {/* account images */}
      <p
        className="font-[500] text-[14px] mt-[15px]"
        style={{ color: panelSecColor }}
      >
        Select Bank&nbsp;<span className="text-[red]">*</span>
      </p>
      <div className="flex gap-[15px] flex-wrap mt-[5px]">
        {banks.map((item: any) => {
          const bankImg: any = item?.bank === "Bank of India" ? bankOfIndia : item?.bank === "Bank of Maharashtra" ? bankOfMaharashtra : item?.bank === "UCO Bank" ? ucoBank : item?.bank === "Axis Bank" ? axisBank : item?.bank === "Bandhan Bank" ? bandhanBank : null
          return (
            <div key={item?._id} onClick={() => setSelectedBank(item)} className={`border cursor-pointer rounded-[10px] p-[5px] w-[100px] h-[100px] flex justify-center items-center ${selectedBank?._id === item?._id ? "border-gray-700" : "border-gray-200"}`}>
              <img src={bankImg} alt="" className="w-full h-full object-contain" />
            </div>
          )
        })}
      </div>
      {/* bank details */}
      {Object.keys(selectedBank).length > 0 && (
        <table className="w-full mt-[20px]">
          <tr>
            <td
              className="border text-[14px] font-[600] ps-[7px] w-[180px]"
              style={{ borderColor: colors.line, color: colors.subText }}
            >
              Bank Name
            </td>
            <td
              className="border text-[15px] ps-[7px] py-[2px]"
              style={{ borderColor: colors.line, color: colors.subText }}
            >
              {selectedBank?.bank}
            </td>
          </tr>
          <tr>
            <td
              className="border text-[14px] font-[600] ps-[7px] w-[180px]"
              style={{ borderColor: colors.line, color: colors.subText }}
            >
              Account Number
            </td>
            <td
              className="border text-[15px] ps-[7px] py-[2px]"
              style={{ borderColor: colors.line, color: colors.subText }}
            >
              {selectedBank?.accountNo}
            </td>
          </tr>
          <tr>
            <td
              className="border text-[14px] font-[600] ps-[7px]"
              style={{ borderColor: colors.line, color: colors.subText }}
            >
              Account Holder Name
            </td>
            <td
              className="border text-[15px] ps-[7px] py-[2px]"
              style={{ borderColor: colors.line, color: colors.subText }}
            >
              {selectedBank?.name}
            </td>
          </tr>
          <tr>
            <td
              className="border text-[14px] font-[600] ps-[7px]"
              style={{ borderColor: colors.line, color: colors.subText }}
            >
              IBN No.
            </td>
            <td
              className="border text-[15px] ps-[7px] py-[2px]"
              style={{ borderColor: colors.line, color: colors.subText }}
            >
              {selectedBank?.ibn}
            </td>
          </tr>
        </table>
      )}
      {/* deposit form */}
      <div className="mt-[25px]">
        <div className="flex justify-between">
          <p
            className="font-[500] text-[14px]"
            style={{ color: panelSecColor }}
          >
            Amount to Deposit&nbsp;<span className="text-[red]">*</span>
          </p>
          <p
            className="mt-[4px] text-[12px] text-end"
            style={{ color: colors.subText }}
          >
            Min. 100 || Max. 500,000
          </p>
        </div>
        <input
          type="number"
          value={depositeAmount}
          onChange={(e: any) => setDepositeAmount(e.target.value)}
          className="h-[35px] rounded-[5px] w-full border mt-[5px] px-[10px] text-[14px] font-[500] focus:outline-none"
          placeholder="Amount"
          style={{
            borderColor: colors.line,
            backgroundColor: colors.dark,
            color: colors.text,
          }}
        />
      </div>
      {/* buttons */}
      <div className="flex gap-[10px] flex-wrap mt-[8px]">
        <Button colors={colors} text={"+ 100.00"} panelMainColor={panelMainColor} setDepositeAmount={setDepositeAmount} value={100} />
        <Button colors={colors} text={"+ 500.00"} panelMainColor={panelMainColor} setDepositeAmount={setDepositeAmount} value={500} />
        <Button colors={colors} text={"+ 1,000.00"} panelMainColor={panelMainColor} setDepositeAmount={setDepositeAmount} value={1000} />
        <Button colors={colors} text={"+ 5,000.00"} panelMainColor={panelMainColor} setDepositeAmount={setDepositeAmount} value={5000} />
        <Button colors={colors} text={"+ 10,000.00"} panelMainColor={panelMainColor} setDepositeAmount={setDepositeAmount} value={10000} />
        <Button colors={colors} text={"+ 50,000.00"} panelMainColor={panelMainColor} setDepositeAmount={setDepositeAmount} value={50000} />
      </div>
      {/* transaction ID */}
      <div className="mt-[25px]">
        <label
          className="font-[500] text-[14px]"
          style={{ color: panelSecColor }}
        >
          Unique Transaction Reference&nbsp;<span className="text-[red]">*</span>
        </label>
        <input
          className="h-[35px] rounded-[5px] w-full border mt-[5px] px-[10px] text-[14px] font-[500] focus:outline-none"
          placeholder="Unique Transaction Reference"
          style={{
            borderColor: colors.line,
            backgroundColor: colors.dark,
            color: colors.text,
          }}
        />
      </div>
      {/* upload UTR */}
      <div className="mt-[25px] flex flex-col md:flex-row justify-between">
        <div className="flex flex-col gap-[5px]">
          <label
            className="font-[500] text-[14px]"
            style={{ color: panelSecColor }}
          >
            Upload and Scan UTR from Receipt&nbsp;
            <span className="text-[red]">*</span>
          </label>
          <input type="file" style={{ color: panelSecColor }} onChange={fn_selectImage} />
        </div>
        {selectedImage && (
          <img
            src={selectedImage}
            alt="Selected"
            className="mt-[10px] rounded-[10px] w-[200px] object-cover"
          />
        )}
      </div>
      <button
        className="text-[14px] h-[35px] rounded-[4px] w-full mt-[25px]"
        style={{ backgroundColor: panelSecColor, color: panelMainColor }}
      >
        Deposit
      </button>
    </div>
  );
};

export default DepositMoney;

const Button = ({ colors, text, panelMainColor, setDepositeAmount, value }: any) => {
  return (
    <button
      className="h-[35px] w-[100px] sm:w-[115px] text-[13px] pt-[1px] font-[500] rounded-[4px]"
      style={{ backgroundColor: panelMainColor, color: colors.subText }}
      onClick={() => setDepositeAmount((prev: any) => prev === "" || prev === null || prev === undefined ? 0 + value : parseInt(prev) + value)}
    >
      {text}
    </button>
  );
};
