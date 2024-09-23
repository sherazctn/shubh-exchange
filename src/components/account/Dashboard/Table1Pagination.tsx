const Table1Pagination = ({colors}:any) => {
  return (
    <div className="mt-[10px] flex justify-center">
      <p
        className="leading-[32px] text-[13px] font-[500] w-[70px] text-center rounded-s-full border cursor-pointer"
        style={{
          borderColor: colors.line,
          backgroundColor: colors.light,
          color: colors.subText,
        }}
      >
        Prev
      </p>
      <p
        className="leading-[32px] text-[13px] font-[500] w-[35px] text-center border cursor-pointer"
        style={{
          borderColor: colors.line,
          backgroundColor: colors.light,
          color: colors.subText,
        }}
      >
        01
      </p>
      <p
        className="leading-[32px] text-[13px] font-[500] w-[35px] text-center border cursor-pointer"
        style={{
          borderColor: colors.line,
          backgroundColor: colors.light,
          color: colors.subText,
        }}
      >
        02
      </p>
      <p
        className="leading-[32px] text-[13px] font-[500] w-[35px] text-center border cursor-pointer"
        style={{
          borderColor: colors.line,
          backgroundColor: colors.light,
          color: colors.subText,
        }}
      >
        03
      </p>
      <p
        className="leading-[32px] text-[13px] font-[500] w-[70px] text-center rounded-e-full border cursor-pointer"
        style={{
          borderColor: colors.line,
          backgroundColor: colors.light,
          color: colors.subText,
        }}
      >
        Next
      </p>
    </div>
  );
};

export default Table1Pagination;
