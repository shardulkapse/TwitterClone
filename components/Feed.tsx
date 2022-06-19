import { RefreshIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'
import { Tweet } from '../typings'
import TweetBox from './TweetBox'
import TweetComponent from './Tweet'
import { fetchTweets } from '../utils/fetchTweets'
import toast from 'react-hot-toast'

interface Props {
  tweets: Tweet[]
}

function Feed({ tweets: tweetProps }: Props) {
  const [tweets, setTweets] = useState<Tweet[]>(tweetProps)
  const handleRefresh = async () => {
    const refToast = toast.loading('Refreshing....')
    const tweets = await fetchTweets()
    setTweets(tweets)
    toast.success('Feed Updated!', {
      id: refToast,
    })
  }
  return (
    <div className="col-span-7 max-h-screen overflow-scroll border-x scrollbar-hide lg:col-span-5">
      <div className="flex items-center justify-between">
        <h1 className="p-5 pb-0 text-xl font-bold">Home</h1>
        <RefreshIcon
          onClick={handleRefresh}
          className="mr-5 mt-5 h-8 w-8 cursor-pointer text-twitter transition-all duration-500 ease-out hover:rotate-180 active:scale-125"
        />
      </div>

      {/* Tweet box */}
      <TweetBox setTweets={setTweets} />

      {/* Feed */}
      <div>
        {tweets.map((tweet: Tweet) => (
          <TweetComponent key={tweet._id} tweet={tweet} />
        ))}
      </div>
    </div>
  )
}

export default Feed
