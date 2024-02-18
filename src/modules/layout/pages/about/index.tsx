import React from "react";
import LayoutHeading from "../../components/LayoutHeading";
const AboutPage: React.FC = () => {
  return (
    <>
      <LayoutHeading heading="About us" color="text-gray-500" />
      <div className="container mx-auto mt-4">
        <div className="grid grid-cols-12">
          <div className="col-span-7">
            <div className="border-2 bg-white rounded-md py-1">
              <div className="border-b-2 py-3 px-5">
                Application Name :{" "}
                <span className="font-semibold">Contact Manager App</span>
              </div>
              <div className="border-b-2 py-3 px-5">
                Version : <span className="font-semibold">1.0.1</span>
              </div>
              <div className="border-b-2 py-3 px-5">
                Developed By :{" "}
                <span className="font-semibold">React Developers</span>
              </div>
              <div className="py-3 px-5">
                Tech Stack :{" "}
                <span className="font-semibold">
                  React, Tailwind CSS, Routing, Axios
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
