import { useEffect, useState } from "react";

interface allIconsProps {
  isDark: boolean;
  isHover?: boolean;
}
export function CubeIcon(props: allIconsProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  let strokeColor = props.isDark ? "#F1F1F1" : "#7E7E8F";
  strokeColor = props.isHover ? "#F1F1F1" : strokeColor;
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.92 2.26003L19.43 5.77003C20.19 6.18003 20.19 7.35003 19.43 7.76003L12.92 11.27C12.34 11.58 11.66 11.58 11.08 11.27L4.57 7.76003C3.81 7.35003 3.81 6.18003 4.57 5.77003L11.08 2.26003C11.66 1.95003 12.34 1.95003 12.92 2.26003Z"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.61 10.13L9.66 13.16C10.41 13.54 10.89 14.31 10.89 15.15V20.87C10.89 21.7 10.02 22.23 9.28 21.86L3.23 18.83C2.48 18.45 2 17.68 2 16.84V11.12C2 10.29 2.87 9.75999 3.61 10.13Z"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.3901 10.13L14.3401 13.16C13.5901 13.54 13.1101 14.31 13.1101 15.15V20.87C13.1101 21.7 13.9801 22.23 14.7201 21.86L20.7701 18.83C21.5201 18.45 22.0001 17.68 22.0001 16.84V11.12C22.0001 10.29 21.1301 9.75999 20.3901 10.13Z"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function ArchiveBookIcon(props: allIconsProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  let strokeColor = props.isDark ? "#F1F1F1" : "#7E7E8F";
  strokeColor = props.isHover ? "#F1F1F1" : strokeColor;
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 7V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V7C3 4 4.5 2 8 2H16C19.5 2 21 4 21 7Z"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.5 2V9.85999C15.5 10.3 14.98 10.52 14.66 10.23L12.34 8.09003C12.15 7.91003 11.85 7.91003 11.66 8.09003L9.34003 10.23C9.02003 10.52 8.5 10.3 8.5 9.85999V2H15.5Z"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.25 14H17.5"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 18H17.5"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function DocumentTextIcon(props: allIconsProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  let strokeColor = props.isDark ? "#F1F1F1" : "#7E7E8F";
  strokeColor = props.isHover ? "#F1F1F1" : strokeColor;
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 7V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V7C3 4 4.5 2 8 2H16C19.5 2 21 4 21 7Z"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.5 4.5V6.5C14.5 7.6 15.4 8.5 16.5 8.5H18.5"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 13H12"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 17H16"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function MessagesIcon(props: allIconsProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  let strokeColor = props.isDark ? "#F1F1F1" : "#7E7E8F";
  strokeColor = props.isHover ? "#F1F1F1" : strokeColor;
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.98 10.79V14.79C17.98 15.05 17.97 15.3 17.94 15.54C17.71 18.24 16.12 19.58 13.19 19.58H12.79C12.54 19.58 12.3 19.7 12.15 19.9L10.95 21.5C10.42 22.21 9.56 22.21 9.03 21.5L7.82999 19.9C7.69999 19.73 7.41 19.58 7.19 19.58H6.79001C3.60001 19.58 2 18.79 2 14.79V10.79C2 7.86001 3.35001 6.27001 6.04001 6.04001C6.28001 6.01001 6.53001 6 6.79001 6H13.19C16.38 6 17.98 7.60001 17.98 10.79Z"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.98 6.79001V10.79C21.98 13.73 20.63 15.31 17.94 15.54C17.97 15.3 17.98 15.05 17.98 14.79V10.79C17.98 7.60001 16.38 6 13.19 6H6.79004C6.53004 6 6.28004 6.01001 6.04004 6.04001C6.27004 3.35001 7.86004 2 10.79 2H17.19C20.38 2 21.98 3.60001 21.98 6.79001Z"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.4955 13.25H13.5045"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.9955 13.25H10.0045"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.4955 13.25H6.5045"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function TaskIcon(props: allIconsProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  let strokeColor = props.isDark ? "#F1F1F1" : "#7E7E8F";
  strokeColor = props.isHover ? "#F1F1F1" : strokeColor;
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 19.5H21"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 12.5H21"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 5.5H21"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 5.5L4 6.5L7 3.5"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 12.5L4 13.5L7 10.5"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 19.5L4 20.5L7 17.5"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function WifiIcon(props: allIconsProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  let strokeColor = props.isDark ? "#F1F1F1" : "#7E7E8F";
  strokeColor = props.isHover ? "#F1F1F1" : strokeColor;
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.90991 11.84C9.20991 8.51998 14.7999 8.51998 19.0999 11.84"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 8.35998C8.06 3.67998 15.94 3.67998 22 8.35998"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.79004 15.49C9.94004 13.05 14.05 13.05 17.2 15.49"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.3999 19.15C10.9799 17.93 13.0299 17.93 14.6099 19.15"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function FileTypeFolderIcon(props: { color: string }) {
  const { color } = props;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const fillColor = color ? color : "#fff";
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.37 4.89L13.51 2.28C12.65 1.9 11.35 1.9 10.49 2.28L4.63 4.89C3.15 5.55 2.93 6.45 2.93 6.93C2.93 7.41 3.15 8.31 4.63 8.97L10.49 11.58C10.92 11.77 11.46 11.87 12 11.87C12.54 11.87 13.08 11.77 13.51 11.58L19.37 8.97C20.85 8.31 21.07 7.41 21.07 6.93C21.07 6.45 20.86 5.55 19.37 4.89Z"
        fill={fillColor}
      />
      <path
        d="M12 17.04C11.62 17.04 11.24 16.96 10.89 16.81L4.15 13.81C3.12 13.35 2.32 12.12 2.32 10.99C2.32 10.58 2.65 10.25 3.06 10.25C3.47 10.25 3.8 10.58 3.8 10.99C3.8 11.53 4.25 12.23 4.75 12.45L11.49 15.45C11.81 15.59 12.18 15.59 12.5 15.45L19.24 12.45C19.74 12.23 20.19 11.54 20.19 10.99C20.19 10.58 20.52 10.25 20.93 10.25C21.34 10.25 21.67 10.58 21.67 10.99C21.67 12.11 20.87 13.35 19.84 13.81L13.1 16.81C12.76 16.96 12.38 17.04 12 17.04Z"
        fill={fillColor}
      />
      <path
        d="M12 22C11.62 22 11.24 21.92 10.89 21.77L4.15 18.77C3.04 18.28 2.32 17.17 2.32 15.95C2.32 15.54 2.65 15.21 3.06 15.21C3.47 15.21 3.8 15.54 3.8 15.95C3.8 16.58 4.17 17.15 4.75 17.41L11.49 20.41C11.81 20.55 12.18 20.55 12.5 20.41L19.24 17.41C19.81 17.16 20.19 16.58 20.19 15.95C20.19 15.54 20.52 15.21 20.93 15.21C21.34 15.21 21.67 15.54 21.67 15.95C21.67 17.17 20.95 18.27 19.84 18.77L13.1 21.77C12.76 21.92 12.38 22 12 22Z"
        fill={fillColor}
      />
    </svg>
  );
}
