import { PhotographIcon } from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import React, { Dispatch, SetStateAction, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { Tweet, TweetBody } from '../typings'
import { fetchTweets } from '../utils/fetchTweets'

interface Props {
  setTweets: Dispatch<SetStateAction<Tweet[]>>
}

function TweetBox({ setTweets }: Props) {
  const [input, setInput] = useState<string>('')
  const imageInputRef = useRef<HTMLInputElement>(null)
  const { data: session } = useSession()
  const [image, setImage] = useState('')
  const [imageURLBoxIsOpen, setImageURLBoxIsOpen] = useState<boolean>(false)

  const addImageToTweet = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    if (!imageInputRef.current?.value) return
    setImage(imageInputRef.current?.value)
    imageInputRef.current.value = ''
    setImageURLBoxIsOpen(false)
  }

  const postTweet = async () => {
    const tweetBody: TweetBody = {
      text: input,
      userName: session?.user?.name || 'Unknown User',
      profileImg:
        session?.user?.image ||
        'https://cdn.dribbble.com/users/544620/screenshots/11007064/media/596e8d4a3117209c6b3618f88078efde.png?compress=1&resize=400x300',
      image: image,
    }
    const result = await fetch(`/api/addTweet`, {
      body: JSON.stringify(tweetBody),
      method: 'POST',
    })

    const json = await result.json()
    const newTweets = await fetchTweets()
    setTweets(newTweets)

    toast.success('Tweet Posted')
    return json
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    postTweet()
    setInput('')
    setImage('')
    setImageURLBoxIsOpen(false)
  }

  return (
    <div className="flex space-x-2 p-5">
      <img
        src={
          session?.user?.image ||
          'https://cdn.dribbble.com/users/544620/screenshots/11007064/media/596e8d4a3117209c6b3618f88078efde.png?compress=1&resize=400x300'
        }
        alt=""
        className="mt-4 h-14 w-14 rounded-full object-cover"
      />
      <div className="flex flex-1 items-center pl-2">
        <form className="flex flex-1 flex-col">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="What's Happening?"
            className="h-24 w-full text-xl outline-none placeholder:text-xl"
          />
          <div className="flex items-center">
            <div className="flex flex-1 space-x-2 text-twitter">
              <PhotographIcon
                onClick={() => {
                  setImageURLBoxIsOpen(!imageURLBoxIsOpen)
                }}
                className={`h-5 w-5 cursor-pointer transition-transform duration-150 ease-in-out hover:scale-150 ${
                  imageURLBoxIsOpen ? 'scale-150' : 'scale-100'
                }`}
              />
            </div>
            <button
              onClick={handleSubmit}
              disabled={!input || !session}
              className="rounded-full bg-twitter px-5 py-2 font-bold text-white disabled:opacity-40"
            >
              Tweet
            </button>
          </div>
          {imageURLBoxIsOpen && (
            <form className="mt-5 flex rounded-lg bg-twitter/80 py-2 px-4">
              <input
                ref={imageInputRef}
                className="flex-1 bg-transparent p-2 text-white outline-none placeholder:text-white"
                type="text"
                placeholder="Enter Image URL"
              />
              <button
                type="submit"
                onClick={addImageToTweet}
                className="font-bold text-white transition-all duration-200 ease-in-out hover:opacity-70"
              >
                Add Image
              </button>
            </form>
          )}
          {image && (
            <img
              src={image}
              alt=""
              className="mt-10 h-40 w-full rounded-xl object-contain shadow-lg"
            />
          )}
        </form>
      </div>
    </div>
  )
}

export default TweetBox
