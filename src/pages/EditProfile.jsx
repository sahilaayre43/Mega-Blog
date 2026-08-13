import React, { useEffect, useState } from "react"
import { Container } from "../components/index"
import { useSelector } from "react-redux"
import profileService from "../appWrite/profile"
import service from "../appWrite/config"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

function EditProfile() {
  const [profile, setProfile] = useState(null)
  const [avatarPreview, setAvatarPreview] = useState(null)
  const [saving, setSaving] = useState(false)

  const userData = useSelector((state) => state.auth.userData)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: {
      bio: "",
    },
  })

  // Get existing profile
  useEffect(() => {
    if (!userData?.$id) return

    profileService
      .getProfile(userData.$id)
      .then((profileData) => {
        setProfile(profileData)

        // Put existing bio into the form
        setValue("bio", profileData?.bio || "")
      })
      .catch((error) => {
        console.log("No profile found:", error)
        setProfile(null)
      })
  }, [userData?.$id, setValue])

  // Avatar preview
  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0]

    if (!file) return

    // Remove previous preview URL
    if (avatarPreview) {
      URL.revokeObjectURL(avatarPreview)
    }

    // Create temporary preview
    const previewUrl = URL.createObjectURL(file)

    setAvatarPreview(previewUrl)
  }

  // Clean preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview)
      }
    }
  }, [avatarPreview])

  const submit = async (data) => {
    try {
      setSaving(true)

      // Keep the existing avatar by default
      let avatarId = profile?.avtar

      /*
        Only upload a new avatar if the user
        actually selected a file.
      */
      if (data.avtar?.[0]) {
        const newAvatar = await service.uploadFile(data.avtar[0])

        if (!newAvatar) {
          throw new Error("Avatar upload failed")
        }

        /*
          New avatar uploaded successfully.
          Now we can safely delete the old avatar.
        */
        if (profile?.avtar) {
          await service.deleteFile(profile.avtar)
        }

        // Save the new avatar ID
        avatarId = newAvatar.$id
      }

      /*
        Only bio and avatar are sent.
        About is intentionally NOT included.
      */
      const profileData = {
        bio: data.bio,
        avtar: avatarId,
      }

      let updatedProfile

      if (profile) {
        // Existing profile → update
        updatedProfile = await profileService.updateProfile(
          userData.$id,
          profileData
        )
      } else {
        // No profile → create
        updatedProfile = await profileService.createProfile({
          userId: userData.$id,
          ...profileData,
        })
      }

      if (updatedProfile) {
        setProfile(updatedProfile)
        navigate("/profile")
      }
    } catch (error) {
      console.error("Failed to update profile:", error)
    } finally {
      setSaving(false)
    }
  }

  // Don't render until user data exists
  if (!userData) {
    return null
  }

  const currentAvatar = avatarPreview
    ? avatarPreview
    : profile?.avtar
      ? service.getFileView(profile.avtar)
      : "https://via.placeholder.com/150"

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Container>
        <div className="bg-[#0a0d0e] flex min-h-screen">
          <div className="flex-1 p-8 max-w-4xl ml-40">

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-white text-3xl font-bold">
                Edit Profile
              </h1>
            </div>

            {/* Avatar */}
            <div className="flex items-center gap-4 mb-8">
              <label
                htmlFor="avtarUpload"
                className="cursor-pointer"
              >
                <img
                  src={currentAvatar}
                  alt={userData.name || "Profile"}
                  className="w-36 h-36 rounded-full object-cover border-4 border-[#17d8d4]"
                />
              </label>

              <input
                type="file"
                id="avtarUpload"
                accept="image/*"
                {...register("avtar", {
                  onChange: handleAvatarChange,
                })}
                className="hidden"
              />

              <div>
                <p className="text-white font-semibold">
                  Profile photo
                </p>

                <p className="text-zinc-400 text-sm">
                  Click the image to upload a new profile photo
                </p>
              </div>
            </div>

            {/* Form fields */}
            <div className="space-y-5">

              {/* Name */}
              <div>
                <label className="block text-white text-sm font-semibold mb-1">
                  Name
                </label>

                <input
                  type="text"
                  value={userData?.name || ""}
                  disabled
                  className="w-full bg-[#101516] border border-zinc-700 rounded-lg px-3 py-2 text-white outline-none opacity-60 cursor-not-allowed"
                />
              </div>

              {/* Bio */}
              <div>
                <label className="block text-white text-sm font-semibold mb-1">
                  Bio
                </label>

                <textarea
                  rows="3"
                  {...register("bio")}
                  className="w-full bg-[#101516] border border-zinc-700 rounded-lg px-3 py-2 text-white outline-none focus:border-[#54E6D4] resize-none"
                  placeholder="Write a short bio..."
                />

                <p className="text-zinc-500 text-xs mt-1">
                  Write a short bio.
                </p>
              </div>

            </div>

            <hr className="border-zinc-800 my-8" />

            {/* Save button */}
            <button
              type="submit"
              disabled={saving}
              className="bg-[#54E6D4] text-[#101516] font-bold px-5 py-2 rounded-lg hover:bg-[#3fd0be] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>

          </div>
        </div>
      </Container>
    </form>
  )
}

export default EditProfile
