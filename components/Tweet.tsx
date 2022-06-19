import React, { useEffect, useState } from 'react'
import { Tweet, Comment, CommentBody } from '../typings'
import TimeAgo from 'react-timeago'
import {
  ChatAlt2Icon,
  HeartIcon,
  SwitchHorizontalIcon,
  UploadIcon,
} from '@heroicons/react/outline'
import { fetchComments } from '../utils/fetchComments'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'

interface Props {
  tweet: Tweet
}

function Tweet({ tweet }: Props) {
  const [comments, setComments] = useState<Comment[]>([])
  const [commentBoxVisible, setCommentBoxVisible] = useState<boolean>(false)
  const [input, setInput] = useState<string>('')
  const { data: session } = useSession()

  const refreshComments = async () => {
    const res: Comment[] = await fetchComments(tweet._id)
    setComments(res)
  }

  useEffect(() => {
    refreshComments()
  }, [])

  const postComment = async () => {
    const commentBody: CommentBody = {
      comment: input,
      tweetId: tweet._id,
      userName: session?.user?.name || 'Unknown User',
      profileImg:
        session?.user?.image ||
        'https://cdn.dribbble.com/users/544620/screenshots/11007064/media/596e8d4a3117209c6b3618f88078efde.png?compress=1&resize=400x300',
    }
    const result = await fetch('api/addComment', {
      body: JSON.stringify(commentBody),
      method: 'POST',
    })
    const json = await result.json()
    refreshComments()

    toast.success('Comment Posted')
    return json
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    postComment()
    setInput('')
    setCommentBoxVisible(false)
  }
  return (
    <div className="flex flex-col space-x-3 border-y border-gray-100 p-5">
      <div className="flex space-x-3">
        <img
          className="h-10 w-10 rounded-full object-cover"
          src={tweet.profileImg}
          alt="tweetImg"
        />
        <div>
          <div className="flex items-center space-x-1">
            <p className="mr-1 font-bold ">{tweet.userName}</p>
            <p className="hideen text-sm text-gray-500 sm:inline">
              @{tweet.userName.replace(/\s+/g, '').toLocaleLowerCase()} .
            </p>
            <TimeAgo
              className="text-sm text-gray-500"
              date={tweet._createdAt}
            />
          </div>
          <p>{tweet.text}</p>

          {tweet.image && (
            <img
              src={tweet.image}
              alt="tweetImage"
              className="m-5 ml-0 mb-1 max-h-60 rounded-lg object-cover shadow-lg"
            />
          )}
        </div>
      </div>
      <div className="mt-5 flex justify-between">
        <div
          onClick={() => session && setCommentBoxVisible(!commentBoxVisible)}
          className="flex cursor-pointer items-center space-x-3 text-gray-400"
        >
          <ChatAlt2Icon className="h-5 w-5" />
          <p>{comments.length}</p>
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <SwitchHorizontalIcon className="h-5 w-5" />
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <HeartIcon className="h-5 w-5" />
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <UploadIcon className="h-5 w-5" />
        </div>
      </div>

      {commentBoxVisible && (
        <form onSubmit={handleSubmit} className="mt-3 flex space-x-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 rounded-lg bg-gray-100 p-2 outline-none"
            type="text "
            placeholder="Write a comment!!"
          />
          <button
            disabled={!input || !session}
            type="submit"
            className="text-twitter disabled:text-gray-200"
          >
            POST{' '}
          </button>
        </form>
      )}

      {comments.length > 0 && (
        <div className="my-2 mt-5 max-h-44 space-y-5  overflow-y-auto border-t border-gray-100 p-5">
          {comments.map((comment) => (
            <div key={comment._id} className="relative flex space-x-2">
              <img
                src={comment.profileImg}
                alt="commentImage"
                className="mt-2 h-7 w-7 rounded-full object-cover"
              />
              <div className="">
                <div className="flex items-center space-x-1">
                  <p className="mr-1 font-bold">{comment.userName}</p>
                  <p className="hidden text-sm text-gray-500 lg:inline">
                    @{comment.userName.replace(/\s+/g, '').toLocaleLowerCase()}{' '}
                    .
                  </p>
                  <TimeAgo
                    className="text-sm text-gray-500"
                    date={comment._createdAt}
                  />
                </div>
                <p>{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Tweet
