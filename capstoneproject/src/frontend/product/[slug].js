import { useRouter } from 'next/router'
import React from 'react'
import data from '../utils/data';


export default function ProductScreen() {
  const {query} = useRouter();
  const { slug } = query;
  const product = data.products.find(x => x.slug === slug);
  if(!product)
  {
    return <div> Product Not Found </div>
  }
  return (
    <><Head>
      <title>Hype Heads Full Stack App</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Header />
    <div className="py-2">
      
      </div></>
  )
}