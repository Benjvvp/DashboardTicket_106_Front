import React, { ButtonHTMLAttributes, useState } from "react";
import styles from "../../styles/components/inputText.module.css";

interface propsInputText {
  name?: string;
  id?: string;
  iconPath?: string;
  placeholder: string;
  type: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  className?: string;
  classNameInput?: string;
}
interface propsTextAreaInput {
  name?: string;
  id?: string;
  iconPath?: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  required?: boolean;
  className?: string;
  classNameInput?: string;
  height?: string;
  rows: number;
  cols: number;
}
interface propsDropDownInput {
  text: string;
  name?: string;
  id?: string;
  iconPath?: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  classNameInput?: string;
  height?: string;
  list: string[];
}
export function InputDefault(props: propsInputText) {
  const [inputPasswordType, setInputPasswordType] = useState("password");

  const handleChangeInputType = () => {
    setInputPasswordType(
      inputPasswordType === "password" ? "text" : "password"
    );
  };

  return (
    <div
      className={`${styles.containerInput} ${props.className} ${
        props.error ? "mb-10" : ""
      }`}
    >
      <input
        type={props.type === "password" ? `${inputPasswordType}` : props.type}
        name={props.name}
        id={props.id}
        className={`${styles.inputText} max-h-[50px] focus:outline focus:outline-1 focus:outline-[#B2A7FF] dark:bg-transparent dark:text-white dark:placeholder-[#2C2C35] dark:border-t-[1px] dark:border-[#313442] ${props.classNameInput}`}
        placeholder={props.placeholder}
        onChange={props.onChange}
        required={props.required}
      />
      {props.iconPath && (
        <img
          src={props.iconPath}
          alt=""
          className={`${styles.icon} ${
            props.type === "password" ? "cursor-pointer" : ""
          }`}
          {...(props.type === "password"
            ? { onClick: () => handleChangeInputType() }
            : "")}
        />
      )}
      <div
        className={`${styles.errorContainer} ${
          props.error?.length !== 0 ? styles.active : ""
        }`}
      >
        <img src="/svg/warning.svg" alt="Warning icon" srcSet="" />
        <p className={`${styles.error}`}>{props.error}</p>
      </div>
    </div>
  );
}

export function TextAreaInput(props: propsTextAreaInput) {
  return (
    <div
      className={`${styles.containerInput} ${props.className} ${
        props.error ? "mb-10" : ""
      }`}
    >
      <textarea
        name={props.name}
        id={props.id}
        className={`${styles.inputText} h-[${props.height}] resize-none focus:outline focus:outline-1 focus:outline-[#B2A7FF] dark:bg-transparent dark:text-white dark:placeholder-[#2C2C35] dark:border-t-[1px] dark:border-[#313442] ${props.classNameInput}`}
        placeholder={props.placeholder}
        onChange={props.onChange}
        required={props.required}
        cols={props.rows}
        rows={props.cols}
      />
      {props.iconPath && (
        <img src={props.iconPath} alt="" className={`${styles.icon}`} />
      )}
      <div
        className={`${styles.errorContainer} ${
          props.error?.length !== 0 ? styles.active : ""
        } bottom-0 max-h-[50px]`}
      >
        <img src="/svg/warning.svg" alt="Warning icon" srcSet="" />
        <p className={`${styles.error}`}>{props.error}</p>
      </div>
    </div>
  );
}

export function DropDownInput(props: propsDropDownInput) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`${styles.containerInput} ${props.className}`}>
      <button
        name={props.name}
        id={props.id}
        className={`${styles.inputText} max-h-[50px] focus:outline focus:outline-1 focus:outline-[#B2A7FF] dark:bg-transparent dark:text-white dark:placeholder-[#2C2C35] dark:border-t-[1px] dark:border-[#313442] ${props.classNameInput}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {props.text}
      </button>
      {props.iconPath && (
        <img
          src={props.iconPath}
          alt=""
          className={`${styles.icon} cursor-pointer`}
        />
      )}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } absolute top-0 bottom-[0] left-0 right-0 w-6/12 height-auto z-50`}
        onMouseLeave={() => setIsOpen(false)}
      >
        <div className="flex flex-col items-center justify-center py-5 px-0 bg-white dark:bg-[#313442] rounded-lg border-[1px] border-t-0 border-[#E8EDF2] dark:border-[#313442]">
          {props.list.map((item, index) => (
            <button
              key={index}
              onClick={(e) => {
                props.onClick(e);
                setIsOpen(false);
              }}
              className="hover:bg-[#C6CBD9] dark:hover:bg-[#1F2128] w-full py-3 transition-all text-[#7E7E8F] hover:text-white dark:text-gray-300 dark:hover:text-white font-medium"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
