import React, {useState, useEffect} from 'react'
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

                <div className="grid md:grid-cols-3 gap-6 mt-12">
                    <div className="p-6 rounded-xl border shadow-sm hover:shadow-lg transition">
                        <div className="text-4xl mb-3">📖</div>
                        <h2 className="text-xl font-semibold mb-2">
                            Read Blogs
                        </h2>
                        <p className="text-gray-600">
                            Discover articles on technology, programming,
                            lifestyle, travel, and much more.
                        </p>
                    </div>

                    <div className="p-6 rounded-xl border shadow-sm hover:shadow-lg transition">
                        <div className="text-4xl mb-3">✍️</div>
                        <h2 className="text-xl font-semibold mb-2">
                            Write Your Story
                        </h2>
                        <p className="text-gray-600">
                            Create beautiful blog posts and share your knowledge
                            and experiences with others.
                        </p>
                    </div>

                    <div className="p-6 rounded-xl border shadow-sm hover:shadow-lg transition">
                        <div className="text-4xl mb-3">🚀</div>
                        <h2 className="text-xl font-semibold mb-2">
                            Join the Community
                        </h2>
                        <p className="text-gray-600">
                            Connect with readers and writers in a secure,
                            members-only blogging community.
                        </p>
                    </div>
                </div>
                <div className="mt-4 rounded-2xl p-10 text-center">
                    <h3 className="text-3xl font-bold">
                         "The best ideas are meant to be shared."
                     </h3>

                    <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
                        Every article you read has the power to teach something new.
                        Every blog you write has the power to inspire someone else.
                        Join today and become a part of that journey.
                    </p>
                </div>
                <div className="mt-4">
                    <div className=" text-center">
                        <h2 className="text-3xl font-bold">
                             Your Next Favorite Blog Is Waiting.
                        </h2>

                        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
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
    <div className='w-full py-8 my-40'>
        <Container>
            <div className="flex flex-wrap">
                {posts && posts.map((post) => (
                    <div key={post.$id} className="p-2 w-1/4">
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
        </Container>
    </div>
  )
}
}

export default Home
