import React, { useEffect } from "react";
import Navbar from "./modules/layout/pages/navbar";
import { Outlet } from "react-router-dom";
import ToastConfiguration from "./modules/ui/components/ToastConfiguration";
import { AppDispatch, useAppDispatch } from "./utils/cma-redux/store";
import * as userActions from "./utils/cma-redux/users/users.actions";
import { TokenUtil } from "./utils/token-utils/TokenUtil";

const App: React.FC = () => {

  const dispatch:AppDispatch = useAppDispatch();

  useEffect(() => {
    if (TokenUtil.isLoggedIn()) {
      dispatch(userActions.getUserInfoAction())
    }
  }, [])

  return (
    <>
      <div>
        <ToastConfiguration />
        <Navbar />
        <Outlet />
      </div>
    </>
  );
};

// Json Dummy Data (Free Api's) : https://jsonplaceholder.typicode.com/
// Link (Json Data to Types) : https://jvilk.com/MakeTypes/ 

export default App;