import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import Feed from '../components/Feed'
import Sidebar from '../components/Sidebar'
import Widgets from '../components/Widgets'
import { Tweet } from '../typings'
import { fetchTweets } from '../utils/fetchTweets'

interface Props {
  tweets: Tweet[]
}

const Home = ({ tweets }: Props) => {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }, [])

  return (
    <>
      {!loading && (
        <div className="mx-auto max-h-screen overflow-hidden lg:max-w-6xl">
          <Head>
            <title>Twitter Clone</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Toaster />
          <main className="grid grid-cols-9">
            {/* Sidebar */}
            <Sidebar />
            {/* Feed */}
            <Feed tweets={tweets} />
            {/* Widgets */}
            <Widgets />
          </main>
        </div>
      )}
      {loading && (
        <div className="flex h-screen w-full items-center justify-center">
          <div className="centered">
            <div className="blob-1"></div>
            <div className="blob-2"></div>
          </div>
        </div>
      )}
    </>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (context) => {
  const tweets = await fetchTweets()
  return {
    props: {
      tweets,
    },
  }
}
