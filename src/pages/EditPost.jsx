import React, { useEffect, useState } from 'react'
import { PostForm, Container } from '../components'
import appwriteService from "../appWrite/conf"
import { useNavigate,useParams } from 'react-router-dom'

function EditPost() {

    const [post, setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        appwriteService.getPost(slug).then((post) => {
            if(post) {
                setPost(post)
            } else {
                navigate('/posts')
            }
        })
    }, [slug, navigate])

  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null
}

export default EditPost
