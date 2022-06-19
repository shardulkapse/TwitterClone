import React, { SVGProps } from 'react'

interface Props {
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
  title: string
  onClick?: () => {}
}

function SidebarRow({ Icon, title, onClick }: Props) {
  return (
    <div
      onClick={() => onClick?.()}
      className="group flex max-w-fit cursor-pointer items-center space-x-2 rounded-full px-4 py-3 transition-all duration-200 ease-in-out hover:bg-gray-100"
    >
      <Icon
        className={`h-6 w-6 ${
          title === 'Sign Out' || title === 'Sign In'
            ? 'text-twitter'
            : 'text-black'
        }`}
      />
      <p className="hidden group-hover:text-twitter md:inline-flex">{title}</p>
    </div>
  )
}

export default SidebarRow
