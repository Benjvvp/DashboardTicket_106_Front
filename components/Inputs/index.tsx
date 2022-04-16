import React, { useState } from "react";
import styles from "../../styles/components/inputText.module.css";

interface propsInputText {
  name?: string;
  id?: string;
  iconPath: string;
  placeholder: string;
  type: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
}

export function InputDefault(
  props: propsInputText,
  {
    className,
  }: {
    className?: string;
  }
) {
  const [inputPasswordType, setInputPasswordType] = useState("password");

  const handleChangeInputType = () => {
    setInputPasswordType(
      inputPasswordType === "password" ? "text" : "password"
    );
  };

  return (
    <div
      className={`${styles.containerInput} ${className} ${
        props.error ? "mb-10" : ""
      }`}
    >
      <input
        type={props.type === "password" ? `${inputPasswordType}` : props.type}
        name={props.name}
        id={props.id}
        className={`${styles.inputText} focus:outline focus:outline-1 focus:outline-[#B2A7FF]`}
        placeholder={props.placeholder}
        onChange={props.onChange}
        required={props.required}
      />
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
