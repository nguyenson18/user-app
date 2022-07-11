import type { NextPage } from 'next'
import Head from 'next/head'
import Login from './login'



const Home: NextPage = () => {
 
  return (
    <div className='app'>
      <Head>
        <title>User App</title>
      </Head>
        <Login/>
    </div>
     
  )
}

export default Home
