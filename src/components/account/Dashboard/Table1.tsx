import { IoIosFootball } from "react-icons/io";
import { MdOutlineCasino, MdOutlineHowToVote, MdOutlineSportsTennis, MdSportsCricket } from "react-icons/md";
import { SiSession } from "react-icons/si";
import { LiaHorseHeadSolid } from "react-icons/lia";
import { GiJumpingDog } from "react-icons/gi";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";

const Table1 = ({ colors }: any) => {
  return (
    <div className="overflow-auto min-w-full">
      <table className="w-[950px] xl:w-full">
        <thead>
          <tr
            className="leading-[44px] font-[600] text-[15px]"
            style={{ color: colors.text, backgroundColor: colors.light }}
          >
            <td className="ps-[5px] w-[150px]">Game</td>
            <td className="text-center">
              Min Bet<SortingArrows /></td>
            <td className="text-center">Max Bet<SortingArrows /></td>
            <td className="text-center">Bet Delay<SortingArrows /></td>
            <td className="text-center">Exposure<SortingArrows /></td>
            <td className="text-center">Profit<SortingArrows /></td>
          </tr>
        </thead>
        <tbody>
          <TableRows colors={colors} no={"Session"} icon={<SiSession className="w-[24px] h-[21px]" />} maxBet={"10,000,000"} betDelay={"1"} />
          <TableRows colors={colors} no={"Casino"} icon={<MdOutlineCasino className="w-[24px] h-[24px]" />} maxBet={"10,000,000"} betDelay={"1"} />
          <TableRows colors={colors} no={"Cricket"} icon={<MdSportsCricket className="w-[24px] h-[24px]" />} maxBet={"500,000"} betDelay={"5"} />
          <TableRows colors={colors} no={"Football"} icon={<IoIosFootball className="w-[24px] h-[24px]" />} maxBet={"500,000"} betDelay={"5"} />
          <TableRows colors={colors} no={"Tennis"} icon={<MdOutlineSportsTennis className="w-[24px] h-[24px]" />} maxBet={"500,000"} betDelay={"5"} />
          <TableRows colors={colors} no={"Horse Racing"} icon={<LiaHorseHeadSolid className="w-[24px] h-[24px]" />} maxBet={"500,000"} betDelay={"5"} />
          <TableRows colors={colors} no={"Greyhound Racing"} icon={<GiJumpingDog className="w-[24px] h-[24px]" />} maxBet={"500,000"} betDelay={"5"} />
          <TableRows colors={colors} no={"Politics"} icon={<MdOutlineHowToVote className="w-[24px] h-[24px]" />} maxBet={"500,000"} betDelay={"1"} />
        </tbody>
      </table>
    </div>
  );
};

export default Table1;

const TableRows = ({ colors, no, maxBet, betDelay, icon }: any) => {
  return (
    <tr
      className="text-[13px] font-[500] leading-[37px] border-b"
      style={{ borderColor: colors.line, color: colors.subText }}
    >
      <td className="ps-[5px] flex items-center gap-[13px]">{icon}{no}</td>
      <td className="text-center">10</td>
      <td className="text-center">{maxBet}</td>
      <td className="text-center">{betDelay}</td>
      <td className="text-center">5,000,000</td>
      <td className="text-center">1,500,000</td>
    </tr>
  );
};

const SortingArrows = () => {
  return(
    <div className="inline-block ms-[10px] mb-[-4px]">
      <BiSolidUpArrow className="h-[9px] cursor-pointer" />
      <BiSolidDownArrow className="h-[9px] cursor-pointer" />
    </div>
  )
}
