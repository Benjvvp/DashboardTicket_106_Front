import { useEffect, useState } from "react";

interface PaginationProps {
  count: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  buttonNext?: boolean;
}

export default function Pagination(props: PaginationProps) {
  const totalNumbers = [];
  for (let i = 1; i <= props.count; i++) {
    totalNumbers.push(i);
  }

  const [currentPage, setCurrentPage] = useState(props.currentPage);

  return (
    <div className="flex flex-row gap-10 items-center mt-5 pb-2">
      <div className="flex flex-row justify-between items-center">
        {totalNumbers.map((count: number, index: number) => {
          if (index === currentPage - 1) {
            return (
              <div
                key={index}
                className="flex flex-row justify-center items-center mr-2"
              >
                <div className="bg-[#7364DB] rounded-[8px] h-9 w-9 flex justify-center items-center">
                  <p className="text-white dark:text-white text-center font-semibold">
                    {`${count}`}
                  </p>
                </div>
              </div>
            );
          } else {
            return (
              <div
                key={index}
                className="flex flex-row justify-center items-center mr-2"
              >
                <div
                  className="bg-transparent rounded-[8px] h-9 w-9 flex justify-center items-center cursor-pointer"
                  onClick={() => {
                    setCurrentPage(index + 1);
                    props.setCurrentPage(index + 1);
                  }}
                >
                  <p className="text-[#07070C] dark:text-white text-center font-semibold">
                    {`${count}`}
                  </p>
                </div>
              </div>
            );
          }
        })}
      </div>
      {props.buttonNext && (
        <div className="flex flex-row justify-center items-center">
          <button className="bg-transparent border-[1px] border-[#E8EDF2] dark:border-[#313442] rounded-md flex justify-center items-center px-5 py-2 hover:bg-[#7364DB] text-[#9A9AAF] dark:text-[#64646F] hover:text-white dark:hover:text-white transition transition-all duration-250"
            onClick={() => {
                  if(currentPage === totalNumbers.length) return;
                  setCurrentPage(currentPage + 1);
                  props.setCurrentPage(currentPage + 1);
            }}
          >
            <p className="text-center font-semibold">Next</p>
          </button>
        </div>
      )}
    </div>
  );
}
