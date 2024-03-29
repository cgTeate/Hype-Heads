import { MagnifyingGlassIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import Cookies from 'js-cookie';
import { signOut, useSession } from 'next-auth/react';
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { Alert, Button, Spinner } from "@chakra-ui/react";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HypeHeadsLogo from "../images/NewHypeHeadsLogo3.png";
import KicksPage from "../pages/kicks/KicksPage";
import { cartReset } from "../redux/cartSlice";
import { getUserReset } from "../redux/userSlice";
import DropdownLink from "./DropdownLink";
import SideMenu from "./SideMenu";
// import SearchHeaderOptions from "./SearchHeaderOptions";

function Header() {
  const router = useRouter();
  // const searchInputRef = useRef(null);
  // function search(event){
  //   event.preventDefault();
  //   const term = searchInputRef.current.value;
  //   if(!term.trim()) return;
  //   router.push(`/search?term=${term.trim()}&searchType=image`);
  // }
  const user = useSelector((state) => state.user.user);
  const { isLoading, isAuth, error } = useSelector((state) => state.login);
  const logMeOut = () => {
    // Cookies.remove('cart');
    dispatch(cartReset())
    dispatch(getUserReset())
    sessionStorage.removeItem('access_Token');
    localStorage.removeItem('user');
    router.push("/login/LoginPage");
  }
  const mystyle = {
    color: "black",
    padding: "30px",
    fontFamily: "Garamond",
    fontSize: "50px",
    fontWeight: "bold",
  };
  const mystyle2 = {
    color: "black",
    padding: "1px",
    fontFamily: "Garamond",
    fontSize: "24px",
  };
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    // setCartItemsCount(cart.products.reduce((a,c)=>a + c.quantity,0))
    const number = Array.isArray(cart.products) ? cart.products.reduce((a, c) => a + c.quantity, 0) : 0;
    setCartItemsCount(number)
  }, [cart.products]);

  // const logoutClickHandler = () => {
  //   Cookies.remove('cart');
  //   dispatch({ type: 'CART_RESET' })
  //   signOut({ callbackUrl: '/login' });
  // }

  // const query = new URLSearchParams({
  //   query: 'string',
  //   pageNumber: '1',
  //   pageSize: '1'
  // }).toString();
  // const resp = await fetch(
  //   `https://developer.stockx.com/v2/catalog/search?${query}`,
  //   {
  //     method: 'GET',
  //     headers: {
  //       'x-api-key': 'YOUR_API_KEY_HERE',
  //       Authorization: 'Bearer <YOUR_JWT_HERE>'
  //     }
  //   }
  // );
  
  // const data = await resp.text();
  // console.log(data);  

  const logo = [HypeHeadsLogo];
  return (

    
    <header className="items-center top-0 bg-gray-500">
      <div className="flex justify-between items-center p-5 text-sm text-gray-700 space-x-27">
        <SideMenu/>
        <div id="logo" className="float-left cursor-pointer">
              {logo.map((image) => (
          <div key={image.src} className="">
            <Link href="/">
            <img
            layout="fill"
            style={{ width: 250, height: 150 }}
            src={image.src}
            alt={image.alt}
          />
            </Link>
          </div>
        ))}   
        </div>
        
           {/* SEARCH BAR */}
        <div className="flex mt-10 shadow-lg px-6 ml-10 mr-5 items-center">
          <div className="flex top-2 middle-2">
            <MagnifyingGlassIcon className="h-7 text-black" />
          </div> 
          <input
            type="text"
            // ref={searchInputRef}
            placeholder="Search"
            className="bg-gray-50 pl-20 border-black text-lg focus:ring-black focus:border-black rounded-md"
          />
          {/* <button onClick={search} type="submit" hidden></button> */}
        </div>

        <div className="flex space-x-4 items-center ">
          <Link href="/">
            <a>
              <h1 style={mystyle2}>Home</h1>
            </a>
          </Link>
          <Link href="/kicks/KicksPage">
            <a>
              <h1 style={mystyle2}>Kicks</h1>
            </a>
          </Link>
          <Link href="/apparel/ApparelPage">
            <a>
              <h1 style={mystyle2}>Apparel</h1>
            </a>
          </Link>
                {/* fix spacing for cart number bubble */}
          <Link href="/cart/Cart">
            <a className="p-2 flex">
              <h1 style={mystyle2}>Cart</h1>
              {cartItemsCount > 0 && (
                <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                  {cartItemsCount}
                </span>
              )}
            </a>
          </Link>

          <Link href="/faqs/FAQSPage">
            <a>
              <h1 style={mystyle2}>FAQS</h1>
            </a>
          </Link>

          {
            isLoading ? (<Spinner />) :
              user ? (
                <Menu as="div" className="relative inline-block z-40">
                  <MenuButton as={Button} className="text-blue-600 mystyle">
                    {"Hi " + user.slice(0, 1).toUpperCase() + user.slice(1, 6)}
                  </MenuButton>
                  <MenuList className="right-150 w-56 origin-top-right shadow-lg">

                    <MenuItem>
                      <Link href="/profile">
                        <a className="dropdown-link mystyle" href="#">
                          Profile
                        </a>
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link href="/orderhistory/order-history">
                        <a className="dropdown-link mystyle" href="#">
                          Order History
                        </a>
                      </Link>
                    </MenuItem>

                    <MenuItem>
                      <Button
                        href="#"
                        onClick={logMeOut}>
                        <a className="dropdown-link mystyle" href="#">
                          Logout
                        </a>
                      </Button>
                    </MenuItem>
                  </MenuList>
                </Menu>
              ) :
                (<><Link href="/login/LoginPage">
                  <a className="" href="#">
                    <h1 style={mystyle2}>Log In</h1>
                  </a>
                </Link><Link href="/registration/RegistrationPage">
                    <a>
                      <h1 style={mystyle2}>Register</h1>
                    </a>
                  </Link></>
                )}

        </div>
      </div>
      {/* <SearchHeaderOptions/> */}
    </header>
  );
}

export default dynamic(() => Promise.resolve(Header), { ssr: false });
