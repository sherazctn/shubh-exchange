import { useState } from "react";
import { useSelector } from "react-redux";

import card1 from "../../../assets/card-1.png";
import card2 from "../../../assets/card-2.png";

const DepositMoney = ({ colors }: any) => {
  const [tab, setTab] = useState("Card");
  const [selectedCard, setSelectedCard] = useState("card1");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const panelMainColor = useSelector((state: any) => state.panelMainColor);
  const panelSecColor = useSelector((state: any) => state.panelSecColor);

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

  return (
    <div
      className="w-full xl:w-[60%] min-h-[100px] rounded-[15px] p-[15px]"
      style={{ backgroundColor: colors.dark }}
    >
      <p className="text-[18px] font-[500]" style={{ color: panelSecColor }}>
        Deposit Money
      </p>
      {/* tabs */}
      <div className="flex gap-[10px] overflow-auto mt-[15px]">
        <Tabs
          colors={colors}
          title={"Card"}
          tab={tab}
          setTab={setTab}
          panelMainColor={panelMainColor}
          panelSecColor={panelSecColor}
        />
        <Tabs
          colors={colors}
          title={"Wallet"}
          tab={tab}
          setTab={setTab}
          panelMainColor={panelMainColor}
          panelSecColor={panelSecColor}
        />
      </div>
      {/* cards */}
      {tab === "Card" && (
        <div className="flex flex-col sm:flex-row gap-[15px] mt-[10px]">
          <div className="relative w-[max-content]">
            <img
              alt="card-1"
              src={card1}
              className="cursor-pointer h-[120px] w-[220px] rounded-[10px]"
              onClick={() => setSelectedCard("card1")}
            />
            <input
              type="radio"
              checked={selectedCard === "card1"}
              className="absolute bottom-[10px] right-[10px] scale-[1.5] cursor-pointer"
              onChange={() => setSelectedCard("card1")}
            />
          </div>
          <div className="relative w-[max-content]">
            <img
              alt="card-2"
              src={card2}
              className="cursor-pointer h-[120px] w-[220px] rounded-[10px]"
              onClick={() => setSelectedCard("card2")}
            />
            <input
              type="radio"
              checked={selectedCard === "card2"}
              className="absolute bottom-[10px] right-[10px] scale-[1.5] cursor-pointer"
              onChange={() => setSelectedCard("card2")}
            />
          </div>
        </div>
      )}
      {/* cards info */}
      {tab === "Card" && (
        <table className="w-full mt-[20px]">
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
              {selectedCard === "card1" ? "1566020000000497" : "2000111942104041"}
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
              {selectedCard === "card1" ? "GULZAR AHMED" : "ASHOK KUMAR SAHNI"}
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
              {selectedCard === "card1"
                ? "UTKARSH SMALL FINANCE BANK"
                : "Canara South Indian Bank"}
            </td>
          </tr>
        </table>
      )}
      {/* deposit form */}
      <div className="mt-[15px]">
        <label
          className="font-[500] text-[14px]"
          style={{ color: panelSecColor }}
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
        <Button colors={colors} text={"+ 100.00"} panelMainColor={panelMainColor} />
        <Button colors={colors} text={"+ 500.00"} panelMainColor={panelMainColor} />
        <Button colors={colors} text={"+ 1,000.00"} panelMainColor={panelMainColor} />
        <Button colors={colors} text={"+ 5,000.00"} panelMainColor={panelMainColor} />
        <Button colors={colors} text={"+ 10,000.00"} panelMainColor={panelMainColor} />
        <Button colors={colors} text={"+ 50,000.00"} panelMainColor={panelMainColor} />
      </div>

      {/* apply code */}
      {/* <div className="mt-[15px]">
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
      </div> */}

      {/* transaction ID */}
      <div className="mt-[15px]">
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
      <div className="mt-[15px] flex flex-col md:flex-row justify-between">
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
        className="text-[14px] h-[35px] rounded-[4px] w-full mt-[15px]"
        style={{ backgroundColor: panelSecColor, color: panelMainColor }}
      >
        Deposit
      </button>
    </div>
  );
};

export default DepositMoney;

const Button = ({ colors, text, panelMainColor }: any) => {
  return (
    <button
      className="h-[35px] w-[100px] sm:w-[115px] text-[13px] pt-[1px] font-[500] rounded-[4px]"
      style={{ backgroundColor: panelMainColor, color: colors.subText }}
    >
      {text}
    </button>
  );
};

const Tabs = ({ colors, title, tab, setTab , panelMainColor, panelSecColor }: any) => {
  return (
    <button
      className="h-[35px] px-[13px] min-w-[100px] rounded-[7px] shadow-sm font-[500] pt-[1px] text-[15px]"
      style={{
        backgroundColor: tab === title ? panelSecColor : panelMainColor,
        color: tab === title ? colors.light : panelSecColor,
      }}
      onClick={() => setTab(title)}
    >
      {title}
    </button>
  );
};
