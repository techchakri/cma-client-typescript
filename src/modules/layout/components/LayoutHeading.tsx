import React from "react";

interface IProps {
    heading: string;
    color: string;
}

const LayoutHeading: React.FC<IProps> = ({heading, color}) => {

  return (
    <>
      <div className="container mx-auto mt-4 shadow-xl py-2 px-4">
        <div className="column-1">
          <p className={`text-2xl font-medium ${color}`}>{heading}</p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur
            aliquid velit, suscipit reprehenderit fuga, laboriosam accusamus a
            aliquam quasi minus asperiores rerum eligendi labore ipsa error
            nulla voluptas itaque dolorum atque iste. Id, doloremque aut? Esse
            dolore aspernatur nam eos quam facere dignissimos corrupti voluptas.
          </p>
        </div>
      </div>
    </>
  );
};

export default LayoutHeading;
