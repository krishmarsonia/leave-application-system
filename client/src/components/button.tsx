import React from "react";

const CustomButton = ({
  extraClassName,
  onClickHandler,
  children,
  custom = false,
}: {
  extraClassName?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClickHandler: () => any;
  children: React.ReactNode;
  custom?: boolean;
}) => {
  const commonClasses =
    "border-mavrick border hover:bg-mavrick hover:text-white font-semibold rounded-md";
  return custom ? (
    <button
      className={`${commonClasses} ${extraClassName}`}
      onClick={onClickHandler}
    >
      {children}
    </button>
  ) : (
    <button
      className={`${commonClasses} px-3 py-1.5 text-mavrick ${extraClassName}`}
      onClick={onClickHandler}
    >
      {children}
    </button>
  );
};

export default CustomButton;
