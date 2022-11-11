
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
import { useState, useEffect} from 'react'
import { getKicks, getApparel } from '../pages/api/client'

export default function Home({product}) {

    const [kicks, setKicks] = useState([]);
    const [apparels, setApparels] = useState([]);
    //show the icon while it's fetching our data
    const[fetching, setFetching] = useState(true);

        const fetchKicks = () => {
            // {
             getKicks()
             .then(res => setKicks(res.data))
        }
        const fetchApparel = () => {
            // {
             getApparel()
             .then(res => setApparels(res.data))
        }
        

  useEffect(()=>{
   console.log("component is mounted");
   fetchKicks();
   fetchApparel();
  }, []);

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
                {kicks.map((kick) => (
                    <ProductItem product={kick} key={kick.slug}></ProductItem>
                ))}
            </div>
            <div>Apparel</div>
            {/* <ApparelHome/> */}
            {/* <ApparelPage/> */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {apparels.map((apparel) => (
                    <ProductItem product={apparel} key={apparel.slug}></ProductItem>
                ))}
            </div>
      </Layout>
   
  )
}
