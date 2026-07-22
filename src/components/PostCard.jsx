import React from 'react'
import appwriteService from '../appWrite/conf'
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
        <div className="w-[280px] h-[340px] bg-[#101516] rounded-xl p-4 flex flex-col justify-between hover:scale-[1.05] transition-transform duration-200 shadow-lg text-[#54E6D4]">
            <div className="w-full h-[160px] overflow-hidden rounded-lg mb-3">
                <img src={appwriteService.getFileView(featuredImage)} alt={title} className='w-full h-full object-cover' />
            </div>
            <h2 className='text-lg font-bold text-[#54E6D4] line-clamp-2 mb-2'>{title}</h2>

            <p className='text-sm mt-2 text-gray-300 line-clamp-3 flex-1'>{getText(content)}</p>
        </div>
    </Link>
  )
}

export default PostCard
