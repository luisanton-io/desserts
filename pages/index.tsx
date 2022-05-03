import type { NextPage } from 'next'
import Head from 'next/head'
import Main from '../components/Main'
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
      <Main />
    </DessertCtx.Provider>
  </>
  )
}


export async function getServerSideProps(): Promise<{ props: HomeProps }> {
  return { props: { desserts: await getDesserts() } }
}


export default Home