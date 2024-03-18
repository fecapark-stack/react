interface IIconWrapperProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const IconWrapper = ({
  children,
  style,
  className = "",
}: IIconWrapperProps) => {
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </div>
  );
};

export default IconWrapper;
