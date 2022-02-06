import {Fragment} from 'react'
import {Menu, Transition} from '@headlessui/react'
import {CodeIcon, DotsVerticalIcon, FlagIcon, StarIcon} from '@heroicons/react/solid'
import {classNames} from "../../global/helpers/className";
import { formatDistance, subDays } from 'date-fns'
import {PostsQuery, useVoteMutation} from "../../generated/graphql";
import cookie from "cookie";
import {USER_COOKIES} from "../../auth/constant/security.constant";

interface PostCardProps {
    post: PostsQuery["posts"]["posts"][0]
}

export default function PostCard({post}: PostCardProps) {
    const [,vote] = useVoteMutation()
    const user = cookie.parse(document.cookie)?.[USER_COOKIES]
    const upVote = async () => {
        await vote({
            postId: post._id,
            value: 1
        })
    }

    const downVote = async () => {
        await vote({
            postId: post._id,
            value: -1
        })
    }
    return (
        <div className="bg-white flex shadow rounded-lg border border-gray-200 px-4 py-5 sm:px-6 max-w-4xl w-full">
            {user && <div className="pl-3 pr-6 flex justify-center flex-col items-center">
                <button className="items-center mb-2 px-2.5 py-1.5 border border-gray-300 shadow-sm
                text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <svg onClick={upVote} xmlns="http://www.w3.org/2000/svg" className="
                h-4 w-4
                " fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"/>
                    </svg>
                </button>
                <p className="text-2xl">{post.points}</p>
                <button className="items-center px-2.5 mt-2 py-1.5 border border-gray-300 shadow-sm
                text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <svg onClick={downVote} xmlns="http://www.w3.org/2000/svg" className="
                h-4 w-4"
                         fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>}
            <div className="w-full">
                <div className="flex space-x-3">
                    <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900">
                            <a href="#" className="hover:underline">
                                {post.user.username}
                            </a>
                        </p>
                        <p className="text-sm text-gray-500">
                            <a href="#" className="hover:underline">
                                {formatDistance(new Date(), new Date(post.createdAt), { addSuffix: true })}
                            </a>
                        </p>
                    </div>
                    <div className="flex-shrink-0 self-center flex">
                        <Menu as="div" className="relative z-30 inline-block text-left">
                            <div>
                                <Menu.Button
                                    className="-m-2 p-2 rounded-full flex items-center text-gray-400 hover:text-gray-600">
                                    <span className="sr-only">Open options</span>
                                    <DotsVerticalIcon className="h-5 w-5" aria-hidden="true"/>
                                </Menu.Button>
                            </div>

                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items
                                    className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="py-1">
                                        <Menu.Item>
                                            {({active}) => (
                                                <a
                                                    href="#"
                                                    className={classNames(
                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                        'flex px-4 py-2 text-sm'
                                                    )}
                                                >
                                                    <StarIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true"/>
                                                    <span>Add to favorites</span>
                                                </a>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({active}) => (
                                                <a
                                                    href="#"
                                                    className={classNames(
                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                        'flex px-4 py-2 text-sm'
                                                    )}
                                                >
                                                    <CodeIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true"/>
                                                    <span>Embed</span>
                                                </a>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({active}) => (
                                                <a
                                                    href="#"
                                                    className={classNames(
                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                        'flex px-4 py-2 text-sm'
                                                    )}
                                                >
                                                    <FlagIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true"/>
                                                    <span>Report content</span>
                                                </a>
                                            )}
                                        </Menu.Item>
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>
                </div>
                <div className="">
                    <h2 className="font-bold text-2xl my-2 text-gray-900">{post.title}</h2>
                    <div className="text-gray-600 text-lg mt-2 mb-1">
                        {post.textSnippet}
                    </div>
                </div>
            </div>
        </div>
    )
}