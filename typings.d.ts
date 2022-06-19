export interface Tweet extends TweetBody {
  _id: string
  _createdAt: strin
  _updatedAt: string
  _rev: string
  _type: 'tweet'
  blockTweet: boolean
}

export type TweetBody = {
  text: string
  userName: string
  profileImg: string
  image?: string
}

export type CommentBody = {
  comment: string
  tweetId: string
  userName: string
  profileImg?: string
}

export interface Comment extends CommentBody {
  _id: string
  _createdAt: strin
  _updatedAt: string
  _rev: string
  _type: 'comment'
  blockTweet: boolean
  tweet: {
    _ref: string
    _type: 'reference'
  }
}
