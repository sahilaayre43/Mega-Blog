import React, { useState } from 'react'
import { Container } from '../components/index'
import { useSelector } from 'react-redux';
import profileService from '../appWrite/profile'; 
import service from '../appWrite/config';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';

function EditProfile() {

const [ profile, setProfile] = useState(null)
const [editing, setediting] = useState(false)
const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
         bio: "",
    }         
})

  const userData = useSelector((state) => state.auth.userData)
  const navigate = useNavigate()
        
  const submit = async (data) => {
    let avtarId = profile?.avtar0

    if(data.avtar && data.avtar[0]) {
      const uploadedFile = await service.uploadFile(data.avtar[0])
      if(uploadedFile) {
        if( profile?.avtar) await service.deleteFile(profile.avtar)
          avtarId = uploadedFile.$id
      }
    }
    const updated = profile
      ? await profileService.updateProfile(userData.$id, { bio: data.bio, avtar: avtarId })
      : await profileService.createProfile({ userId: userData.$id, bio: data.bio, avtar: avtarId})

    if (updated) setProfile(updated)
    setEditing(false)

    useEffect(() => {
    profileService.getProfile(userData.$id)
      .then((profileData) => {
        setProfile(profileData)
        setValue("bio", profileData?.bio || "")
    })
      .catch((error) => {
        console.log("No Profile found:", error)
    })
  
  }, [userData.$id])
}

return (

<form onSubmit={handleSubmit(submit)} >
<Container>
    <div className=" bg-[#0a0d0e] flex">

    <div className="flex-1 p-8 max-w-4xl ml-40">
        <h1 className="text-white text-3xl font-bold mb-6">Edit Profile</h1>

        <div className="flex items-center gap-4 mb-8">
            { profile?.avtar ? (
                <img src={service.getFileView(profile.avtar)} alt={userData.name} className="w-36 h-36 rounded-full object-cover border-4 border-[#17d8d4]"/>
              ) : (
                <img src="https://imgs.search.brave.com/tTDTKEIrl-pmV-ktc5MsVaxhxaj5rhLUhY51EvD0y3k/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLmdl/dHR5d2FsbHBhcGVy/cy5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMjMvMTAvQ2Fy/dG9vbi1CYXRtYW4t/UGZwLVByb2ZpbGUu/anBn" alt=""  className="w-36 h-36 rounded-full object-cover border-4 border-[#17d8d4]"/>
            )}
            
            {editing && (
                  <input type="file" {...register("avtar")} className="mt-2 text-sm text-zinc-300" />
                )}
            <div>
                <p className="text-white font-semibold">Profile photo</p>
                <p className="text-zinc-400 text-sm">Upload a new profile photo</p>
            </div>
        </div>

        <div className="space-y-5">

            <div>
                <label className="block text-white text-sm font-semibold mb-1">Name</label>
                <input
                    type="text"
                    className="w-full bg-[#101516] border border-zinc-700 rounded-lg px-3 py-2 text-white outline-none focus:border-[#54E6D4]"
                />
            </div>

            <div>
                <label className="block text-white text-sm font-semibold mb-1">Bio</label>
                <textarea
                    rows="3"
                    className="w-full bg-[#101516] border border-zinc-700 rounded-lg px-3 py-2 text-white outline-none focus:border-[#54E6D4] resize-none"
                />
                <p className="text-zinc-500 text-xs mt-1">Write a short bio.</p>
            </div>

            <div>
                <label className="block text-white text-sm font-semibold mb-1">About</label>
                <textarea
                    rows="3"
                    className="w-full bg-[#101516] border border-zinc-700 rounded-lg px-3 py-2 text-white outline-none focus:border-[#54E6D4] resize-none"
                />
                <p className="text-zinc-500 text-xs mt-1">Write something about yourself.</p>
            </div>

        </div>

        <hr className="border-zinc-800 my-8" />

        <button className="bg-[#54E6D4] text-[#101516] font-bold px-5 py-2 rounded-lg hover:bg-[#3fd0be] transition-colors">
            Save Changes
        </button>

    </div>
</div>
</Container>
</form>
  )
}

export default EditProfile
