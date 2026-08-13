import React from 'react'
import appwriteService from '../appWrite/config'
import {Link} from 'react-router-dom'

function PostCard({ $id, title, featuredImage, content }) {

const getText = (html, length = 100) => {
    const plainText = html
        .replace(/<[^>]+>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
    return plainText.length > length ? plainText.substring(0, length) + '......' : plainText;
}

  return (
    <Link to={`/post/${$id}`}>
        <div className="w-[280px] h-[340px] bg-[#171A1A] rounded-xl flex flex-col justify-between hover:bg-[#1D2121] hover:scale-[1.03] transition-transform translateY(-2px) duration-200 shadow-lg text-[#2A2D2D] border border-[#17d8d4]/20 shadow-xl">
            <div className="w-full h-[180px] overflow-hidden rounded-lg mb-1">
                <img src={appwriteService.getFileView(featuredImage)} alt={title} className='w-full h-full object-cover' />
            </div>
            <div className="w-full p-2 mb-9">
                <h2 className='text-lg font-bold text-[#54E6D4] line-clamp-2 mb-2 '>{title}</h2>

                <p className='text-sm mt-1 text-gray-300 line-clamp-5 flex-1'>{getText(content)}</p>
            </div>
        </div>
    </Link>
  )
}

export default PostCard
