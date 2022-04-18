import Image from "next/image";

interface PageTitleProps {
      title: string;
      description?: string;
}

export default function PageTitle(props : PageTitleProps) {
      const { title, description } = props;

      const nowDate = new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
      });
      
      return (
            <div>
                  <h4 className="font-semibold text-[28px] text-[#07070C] dark:text-white">{title}</h4>
                  <div className="flex mt-2 flex-row justify-between items-center">
                        <p className="text-[14px] text-[#7E7E8F] dark:text-[#8B8B93]">
                              {description}
                        </p>
                        <div className="flex items-center justify-center gap-2">
                              <Image
                                    src="/svg/calendar.svg"
                                    width={20}
                                    height={20}
                                    className="mr-2"
                              />
                              <p className="text-[12px] text-[#7E7E8F] dark:text-[#8B8B93]">{nowDate}</p>
                        </div>
                  </div>
            </div>
      )
}