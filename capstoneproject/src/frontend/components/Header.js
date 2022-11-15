import { MagnifyingGlassIcon,PlusCircleIcon} from "@heroicons/react/24/outline";
//import { signOut, useSession } from 'next-auth/react';
import Link from "next/link";
import Cookies from 'js-cookie';
import { useContext, useEffect, useState } from "react";
import { Store } from "../utils/Store";
import { signOut, useSession } from 'next-auth/react';
// import { Menu } from "antd";
import DropdownLink from "./DropdownLink";
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { Spinner, Alert, Menu, MenuButton, MenuList, MenuItem, Button
} from "@chakra-ui/react";
// import dynamic from 'next/dynamic'
import {cartReset } from "../redux/cartSlice";
import {getUserReset } from "../redux/userSlice";

export default function Header() {
  const router = useRouter();
  const user = useSelector((state) => state.user.user);
  const {isLoading, isAuth, error} = useSelector((state) => state.login);
  const logMeOut = () => {
    // Cookies.remove('cart');
    dispatch(cartReset())
    dispatch(getUserReset())
    sessionStorage.removeItem('access_Token');
    router.push("/LoginPage");
  }
  const mystyle = {
    color: "black",
    //backgroundColor: "Gray",
    padding: "30px",
    fontFamily: "Garamond",
    fontSize: "50px",
    // fontWeight: "bold",
  };
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  // const { status, data: session } = useSession();
  // const { state, dispatch } = useContext(Store);
  // const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    // setCartItemsCount(cart.products.reduce((a,c)=>a + c.quantity,0))
    setCartItemsCount(cart.products.reduce((a,c)=>a + c.quantity,0))
  }, [cart.products]);

  // const logoutClickHandler = () => {
  //   Cookies.remove('cart');
  //   dispatch({ type: 'CART_RESET' })
  //   signOut({ callbackUrl: '/login' });
  // }
  return (
    <header className="sticky top-0 bg-white">
      <div className="flex justify-between p-5 text-sm text-gray-700flex space-x-4">
        <div id="logo" className="fl_left">
          <Link href="/">
            <a>
              <h1 style={mystyle}>HYPE HEADS</h1>
            </a>
          </Link>
        </div>
        <div className="relative mt-2">
          <div className="absolute top-2 middle-2">
            <MagnifyingGlassIcon className="h-5 text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="bg-gray-50 pl-10 border-gray-500 text-sm focus:ring-black focus:border-black rounded-md"
          />
        </div>

        <div className="flex space-x-4 items-center">
          <Link href="/">Home</Link>
          <Link href="/KicksPage">Kicks</Link>
          <Link href="/ApparelPage">
            <a className="drop">Apparel</a>
          </Link>

          <Link href="/Cart">
            <a className="p-2">
              Cart
              {cartItemsCount > 0 && (
                <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                  {cartItemsCount}
                </span>
              )}
            </a>
          </Link>



          <Link href="/FAQSPage">
            <a className="drop" href="#">
              FAQS
            </a>
          </Link>
          {/* <Link href="/LoginPage">
            <a className="drop" href="#">
              Login
            </a>
          </Link> */}

          {/* {
            isLoading ? (<Spinner />) : 
            user ? ("Hi " + user) : 
            (
              <Link href="/LoginPage">
            <a className="drop" href="#">
              Login
            </a>
          </Link>
            )
          } */}
          
          

               <a className="drop" href="#">
                {
                isLoading ? (<Spinner />) :
                  user ? (
                    <Menu as="div" className="relative inline-block">
                      <MenuButton as={Button} className="text-blue-600">
                        {"Hi " + user.slice(0,1).toUpperCase() + user.slice(1,6)}
                    </MenuButton>
              <MenuList className="right-150 w-56 origin-top-right shadow-lg ">

                 <MenuItem>
                  <DropdownLink className="dropdown-link" href="/profile">
                      Profile
                  </DropdownLink>
                </MenuItem>
                <MenuItem>
                  <DropdownLink
                    className="dropdown-link"
                    href="/order-history"
                  >
                    Order History
                  </DropdownLink>
                </MenuItem> 

                <MenuItem>
                  <a
                    className="dropdown-link"
                    href="#"
                    onClick={logMeOut}
                    >
                    Logout
                    </a>
                </MenuItem>
             </MenuList> 
            </Menu>
                  ) :
                (<Link href="/LoginPage">
                  <a className="drop" href="#">
                      Log In
                    </a>
                  </Link>
                )}
                </a>  

                {/* <a className="drop" href="#">
                {isLoading ? (<Spinner />) :
                  user ? (
                    <Menu as="div" className="relative inline-block">
                      <MenuButton as={Button} className="text-blue-600">
                        {"Hi " + user}
                    </MenuButton>
                    ) :
                (<Link href="/LoginPage">
                  <a className="drop" href="#">
                      Log In
                    </a>
                  </Link>
                )}
                </a>
                  

                 <a className="drop" href="#">
                  {
                    user ? (<a
                      className="dropdown-link"
                      href="#"
                      onClick={logMeOut}
                      >
                      Logout
                      </a>) : ""}
                </a> 

             

           {/* {status === 'loading' ? (
            'Loading'
          ) : session?.user ? (
            <Menu as="div" className="relative inline-block">
              <Menu.Button className="text-blue-600">
                {session.user.name}
              </Menu.Button>
              <Menu.Items className="absolute right-0 w-56 origin-top-right shadow-lg ">
                <Menu.Item>
                  <DropdownLink className="dropdown-link" href="/profile">
                      Profile
                  </DropdownLink>
                </Menu.Item>
                <Menu.Item>
                  <DropdownLink
                    className="dropdown-link"
                    href="/order-history"
                  >
                    Order History
                  </DropdownLink>
                </Menu.Item>
                <Menu.Item>
                  <a
                    className="dropdown-link"
                    href="#"
                    onClick={logoutClickHandler}
                    >
                    Logout
                    </a>
                </Menu.Item>
              </Menu.Items>
            </Menu>
          ) : (
            <Link href="/LoginPage">
              <a className="p-2">
              Log In </a>
            </Link>
          )}  */}


          <Link href="/RegistrationPage">

            <a className="drop">
              Sell
            </a>
          </Link>
        </div>
      </div>
    </header>
  );
}

// export default dynamic(() => Promise.resolve(Header), {ssr: false});
