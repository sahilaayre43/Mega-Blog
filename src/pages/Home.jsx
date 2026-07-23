import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { PostCard, Container } from '../components'
import appwriteService from "../appWrite/conf"
import { useSelector } from 'react-redux'

function Home() {

    const [posts, setPosts] = useState([])
    const authStatus = useSelector((state) => state.auth.status)

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    },[])

   if (!authStatus) {
    return (
        <div className="w-full py-8 mt-4">
            <Container>
                <div className="text-center">
                    <h1 className="text-3xl font-bold hover:text-gray-500">
                        Login to read posts
                    </h1>

                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                        Welcome to our blogging platform where ideas, stories, and
                        knowledge come together. Sign in to explore blogs written by
                        our community and share your own thoughts with the world.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mt-12 ">
                    <div className="p-6 rounded-xl border-3 border-gray-400 shadow-sm hover:shadow-lg transition bg-[#101516] text-[#54E6D4]">
                        <div className="text-4xl mb-3">📖</div>
                        <h2 className="text-xl font-semibold mb-2">
                            Read Blogs
                        </h2>
                        <p className="text-gray-400">
                            Discover articles on technology, programming,
                            lifestyle, travel, and much more.
                        </p>
                    </div>

                    <div className="p-6 rounded-xl border-3 border-gray-400 shadow-sm hover:shadow-lg transition bg-[#101516] text-[#54E6D4]">
                        <div className="text-4xl mb-3">✍️</div>
                        <h2 className="text-xl font-semibold mb-2">
                            Write Your Story
                        </h2>
                        <p className="text-gray-400">
                            Create beautiful blog posts and share your knowledge
                            and experiences with others.
                        </p>
                    </div>

                    <div className="p-6 rounded-xl border-3 border-gray-400 shadow-sm hover:shadow-lg transition bg-[#101516] text-[#54E6D4]">
                        <div className="text-4xl mb-3">🚀</div>
                        <h2 className="text-xl font-semibold mb-2">
                            Join the Community
                        </h2>
                        <p className="text-gray-400">
                            Connect with readers and writers in a secure,
                            members-only blogging community.
                        </p>
                    </div>
                </div>
                <div className="mt-4 rounded-2xl p-5 text-center">
                    <h3 className="text-3xl font-bold">
                         "The best ideas are meant to be shared."
                     </h3>

                    <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
                        Every article you read has the power to teach something new.
                        Every blog you write has the power to inspire someone else.
                        Join today and become a part of that journey.
                    </p>
                </div>
                <div className="mt-2">
                    <div className=" text-center">
                        <h2 className="text-3xl font-bold">
                             Your Next Favorite Blog Is Waiting.
                        </h2>

                        <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
                            Sign in using the Login button in the navigation bar to unlock
                            exclusive blogs, publish your own stories, and connect with a
                            community that loves sharing knowledge.
                        </p>
                 </div>
            </div>
            </Container>
        </div>
    );
} else {
    return (
    <div className='w-full py-4 mt-4'>
        <Container>
            <div className="flex flex-col md:flex-row items-stretch gap-4">
                
                    <div className='grid grid-cols-3 gap-4 justify-items-center flex-1'>
                        {posts && posts.slice(0, 6).map((post) => (
                            <div key={post.$id} >
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>

                    <div className="w-full md:w-[380px] p-4 flex flex-col items-center justify-between h-[690px] bg-[#101516] rounded-xl">
                        <div className="flex-1 flex flex-col items-center justify-center text-center gap-8">
                            <h1 className="text-5xl font-extrabold text-[#54E6D4] mb-20">
                                MEGA BLOG
                            </h1>
                            <p className="text-gray-300 text-lg max-w-xs">
                                Welcome to Mega Blog, your go-to platform for sharing
                                ideas, stories, and knowledge. Join our community of
                                passionate writers and readers today!
                            </p>
                        </div>
                        <Link to="/all-posts" className="w-full text-center bg-[#54E6D4] text-[#101516] font-bold py-3 rounded-xl hover:bg-[#3fd0be] transition-colors duration-200">
                            View All Posts
                        </Link>
                    </div>
            </div>
        </Container>
    </div>
  )
}
}

export default Home
