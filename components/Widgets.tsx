import { useState, useEffect } from 'react'
import { SearchIcon } from '@heroicons/react/outline'
import React from 'react'
import { TwitterTimelineEmbed } from 'react-twitter-embed'

function Widgets() {
  const [search, setSearch] = useState('NASA')
  const [render, setRender] = useState(true)

  useEffect(() => {
    setRender(false)
    setTimeout(() => {
      setRender(true)
    }, 2000)
    if (search === '') {
      setSearch('NASA')
    }
  }, [search])

  return (
    <div className="col-span-2 mt-2 hidden px-2 lg:inline">
      <div className="p  flex items-center space-x-2 rounded-full bg-gray-100 p-3">
        <SearchIcon className="h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search Twitter"
          className="flex-1 bg-transparent outline-none"
          onChange={(e) => {
            setSearch(e.target.value)
          }}
        />
      </div>
      {render && (
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName={search}
          options={{ height: 1000 }}
        />
      )}
      {!render && (
        <div className="flex h-full w-full items-start justify-center pt-20">
          <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Widgets
