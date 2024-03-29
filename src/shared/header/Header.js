import {
  MobileNav,
  Typography,
  IconButton,
  Navbar,
} from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

export default function Header() {
  const [openNav, setOpenNav] = useState(false);

  const { user, logOut } = useContext(AuthContext);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {user?.uid && (
        <p className="font-semibold text-white">
          Hello, {user.displayName}
        </p>
      )}
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-semibold"
      >
        <Link to="/addPost" className="flex items-center text-white">
          Add a Pet
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-semibold"
      >
        <Link to="/myPost" className="flex items-center text-white">
          My Pets
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-semibold"
      >
        <Link to="/myReviews" className="flex items-center text-white">
          Reviews
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-semibold"
      >
        <Link to="/myBookings" className="flex items-center text-white">
          Bookings
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-semibold"
      >
        {user?.uid ? (
          <button onClick={logOut} className="bg-red-500 px-4 py-2 text-white rounded-full">
            Log Out
          </button>
        ) : (
          <Link to="/login" className="bg-green-500 px-4 py-2 text-white rounded-full">
            Log In
          </Link>
        )}
      </Typography>
    </ul>
  );

  return (
    <section className="bg-[#2F1977]">
      <div className="container mx-auto">
      <Navbar className="py-2 px-4 lg:px-8 lg:py-4 bg-transparent border-0" color="">
        <div className="flex items-center justify-between text-white">
          <Link
            as="a"
            to="/"
            className="uppercase mr-4 cursor-pointer py-1.5 text-white text-xl font-extrabold"
          >
            pet adoption platform
          </Link>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <MobileNav open={openNav}>{navList}</MobileNav>
      </Navbar>
    </div>
    </section>
  );
}
