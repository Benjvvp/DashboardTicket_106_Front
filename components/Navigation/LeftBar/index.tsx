import { useState } from "react";
import styles from '../../../styles/components/leftBar.module.css';
import ActionsButtons from "../../ActionsButtons";

export default function LeftBar(){
      const [isOpen, setIsOpen] = useState(false);
      
      return (
            <div className={`flex flex-col w-[12%] pt-[100px] h-full bg-white dark:bg-[#1F2128] fixed top-0 left-0 z-[30] ${styles.leftBar}`}>
                  <ActionsButtons />
            </div>
      )
}