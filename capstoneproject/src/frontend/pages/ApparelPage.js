import React from 'react'
import { Pagination } from 'antd'
import Head from 'next/head'
import Header from '../components/Header'
import ProductItem2 from '../components/productItem2'
import ApparelHome from '../components/apparelHome'
import data2 from '../utils/data2'


export default function homePage()
{

    return (
        <div>
            <Head>
              <title>Hype Heads Full Stack App</title>
              <meta name="description" content="Generated by create next app" />
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header/>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {data2.products2.map((product2) => (
                    <ProductItem2 product2={product2} key={product2.Name}></ProductItem2>
                ))}
            </div>
            {/* <p>BAPE</p>
            <ApparelHome/>
            <p>Fear Of God</p>
            <ApparelHome/>
            <p>Gucci</p>
            <ApparelHome/>
            <p>Off-White</p>
            <ApparelHome/>
            <p>Supreme</p>
            <ApparelHome/>
            <p>Vlone</p>
            <ApparelHome/>
            <Pagination defaultCurrent={1} total={5} /> */}
        </div>
    )
}
