const Spinner = ({ size = 48, color = "#3b82f6" }) => {
    return (
      <div className="flex justify-center items-center">
        <div
          style={{
            width: `${size}px`,
            height: `${size}px`,
            borderTopColor: color,
            borderRightColor: "transparent",
            borderBottomColor: color,
            borderLeftColor: "transparent",
          }}
          className="border-4 border-solid rounded-full animate-spin"
        />
      </div>
    );
  };
  export default Spinner;