import {
  faMobile,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import * as userReducer from "../../../../utils/cma-redux/users/users.reducer";
import { useSelector } from "react-redux";
import {
  AppDispatch,
  RootState,
  useAppDispatch,
} from "../../../../utils/cma-redux/store";
import { TokenUtil } from "../../../../utils/token-utils/TokenUtil";

interface IProps {
  color?: string;
}

const Navbar: React.FC<IProps> = ({ color }) => {
  const dispatch: AppDispatch = useAppDispatch();

  // get user data from redux
  const userReduxState: userReducer.InitialState = useSelector(
    (store: RootState) => {
      return store[userReducer.userFeatureKey];
    }
  );

  const { isAuthenticated, user } = userReduxState;

  const clickLogOff = () => {
    dispatch({
      type: `${userReducer.logOffAction}`,
    });
  };

  return (
    <nav className=" bg-gray-600 p-3 text-sm sm:text-base">
      <div className="flex justify-evenly md:justify-between">
        <div className="flex gap-10">
          <Link
            to=""
            className="md:pl-[90px] text-white sm:font-semibold font-serif"
          >
            <FontAwesomeIcon icon={faMobile} /> Contact{" "}
            <span className="text-yellow-500">Manager</span>
          </Link>
          <div className="text-white hidden sm:block">
            <ul className="flex gap-4">
              <li>
                <Link to="/about">About</Link>
              </li>
              {TokenUtil.isLoggedIn() && (
                <li>
                  <Link to="/contacts/admin">Contacts</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="text-white md:pr-[90px]">
          <ul className="flex gap-4">
            {TokenUtil.isLoggedIn() && isAuthenticated ? (
              <>
                {user && Object.keys(user).length > 0 && (
                  <li className="flex gap-2">
                    <img
                      src={user.imageUrl}
                      alt="Image Loading..."
                      width={25}
                      height={25}
                      className="rounded"
                    />{" "}
                    <Link to={"/"}> {user.username}</Link>
                  </li>
                )}
                <li>
                  <Link to="/" onClick={clickLogOff}>
                    <FontAwesomeIcon icon={faRightFromBracket} />
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link to="/users/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
