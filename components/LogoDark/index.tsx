export default function LogoDark(props: { withText?: boolean }) {
  const { withText } = props;
  return (
    <img
      src={withText ? "/svg/LogoDark.svg" : "/svg/LogoDarkWithoutText.svg"}
      width={withText ? "150" : "50"}
      height={withText ? "50" : "25"}
      className="mr-[5%]"
      alt=""
    />
  );
}
