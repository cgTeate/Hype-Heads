import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import SideMenu from '../components/SideMenu';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Layout({ title, children }) {
  return (
    <>
      <Head>
        <title>{title ? title + ' - HypeHeads' : 'HypeHeads'}</title>
        <meta name="description" content="Ecommerce Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex min-h-screen flex-col justify-between ">
        <header className='flex justify-center sticky z-10 items-center top-0 bg-gray-500'>
          {/* <SideMenu/> */}
            <Header/>
          {/* <nav className="flex h-12 items-center px-4 justify-between shadow-md">
            <Link href="/">
              <a className="text-lg font-bold">HypeHeads</a>
            </Link>
            <div>
              <Link href="/cart">
                <a className="p-2">Cart</a>
              </Link>
              <Link href="/login">
                <a className="p-2">Login</a>
              </Link>
            </div>
          </nav> */}
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex h-10 justify-center items-center shadow-inner bg-gray-500">
          <Footer/>
        </footer>
      </div>
    </>
  );
}