
import Head from 'next/head'
import Layout from '../components/Layout'
import Slider from '../components/Slider'
import KicksHome from '../components/kicksHome'
import ApparelHome from '../components/apparelHome'
import KicksPage from './KicksPage'
import ApparelPage from './ApparelPage'
import ProductItem from '../components/productItem'
import ProductItem2 from '../components/productItem2'
import data from '../utils/data'
import data2 from '../utils/data2'

export default function Home({product}) {

  return (
    
      // <div >
      //       <Head>
      //         <title>Hype Heads Full Stack App</title>
      //         <meta name="description" content="Generated by create next app" />
      //         <link rel="icon" href="/favicon.ico" />
      //       </Head>

      //       <div>
      //       <HomePage/>
      //       </div> 
           
      // </div> 
      <Layout title="Home Page">
            <Slider/>
            <p>Kicks</p>
            {/* <KicksHome/> */}
            {/* <KicksPage/> */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {data.products.map((product) => (
                    <ProductItem product={product} key={product.slug}></ProductItem>
                ))}
            </div>
            <div>Apparel</div>
            {/* <ApparelHome/> */}
            {/* <ApparelPage/> */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {data2.products2.map((product2) => (
                    <ProductItem2 product2={product2} key={product2.Name}></ProductItem2>
                ))}
            </div>
      </Layout>
   
  )
}
