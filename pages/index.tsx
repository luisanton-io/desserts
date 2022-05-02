import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import dessertsState from '../atoms/cart'
import DessertHeader from '../components/DessertHeader'
import DessertIcons from '../components/DessertIcons'
import DessertCtx from '../context/dessertCtx'
import { Dessert } from '../interfaces'
import getDesserts from '../utils/getDesserts'

interface HomeProps {
  desserts: Dessert[]
}
const Home: NextPage<HomeProps> = ({ desserts }) => {
  return (<>
    <Head>
      <title>ReasonLabs Desserts</title>
    </Head>
    <DessertCtx.Provider value={desserts}>
      <DessertHeader />
      <DessertIcons />
    </DessertCtx.Provider>
  </>
  )
}


export async function getServerSideProps(): Promise<{ props: HomeProps }> {
  return { props: { desserts: await getDesserts() } }
}


export default Home