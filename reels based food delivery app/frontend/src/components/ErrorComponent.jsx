import React from "react";

const ErrorComponent = ({ Error }) => {
  return (
    <div>
      {Error && (
        <ul className="text-red-500">
          {Error.map((item) => {
            return <li key={item}>{item}</li>;
          })}
        </ul>
      )}
    </div>
  );
};

export default ErrorComponent;
