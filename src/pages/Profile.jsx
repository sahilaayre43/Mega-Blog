import React, { useEffect, useState } from 'react'
import { Container, LogoutBtn } from '../components'
import { Edit, FileText } from "lucide-react";
import { useSelector } from 'react-redux';
import profileService from '../appWrite/profile'; 
import service from '../appWrite/config';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const userData = useSelector((state) => state.auth.userData)
  const navigate = useNavigate()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    console.log("USER DATA: ", userData)

    if (!userData) {
      navigate("/login");
      return ;
    }
    setLoading(true);

    profileService
      .getProfile(userData.$id)
      .then((data) => setProfile(data))
      .catch((error) => console.log("No profile found:", error))
      .finally(() => setLoading(false))
  }, [userData, navigate]);

  if (!userData) { 
      return null; 
  }

  if (loading) return <div className="text-white p-10">Loading...</div>
  

  return (
    <div className="min-h-screen bg-[#0F1111] py-10 px-5">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#171A1A] rounded-3xl px-15 p-8 border border-[#17d8d4]/20 shadow-xl">
          <div className="flex flex-col lg:flex-row justify-between">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
              <img
                src={profile?.avtar ? service.getFileView(profile.avtar) : "https://imgs.search.brave.com/tTDTKEIrl-pmV-ktc5MsVaxhxaj5rhLUhY51EvD0y3k/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLmdl/dHR5d2FsbHBhcGVy/cy5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMjMvMTAvQ2Fy/dG9vbi1CYXRtYW4t/UGZwLVByb2ZpbGUu/anBn"}
                alt=""
                className="w-36 h-36 rounded-full object-cover border-4 border-[#17d8d4]"
              />
              <div className="text-center md:text-left">
                <h1 className="text-4xl font-bold text-[#17d8d4]">{userData.name}</h1>
                <p className="text-zinc-400 mt-2 text-lg">{userData.email}</p>
                <div className="mt-5 text-zinc-300 max-w-xl leading-7">
                  {profile?.bio || "No bio yet."}
                </div>
              </div>
            </div>

            <div className="flex flex-col mt-6 md:mb-6">
              <div className="flex flex-col md:flex-row items-center gap-4 mb-10 md:justify-end">
                <button
                  onClick={() => navigate("/edit-profile")}
                  className="flex items-center gap-2 bg-[#17d8d4] text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition duration-300"
                >
                  <Edit size={18} /> Edit Profile
                </button>
                <LogoutBtn />
              </div>
              <div className="bg-gray-800 rounded-2xl border border-[#17d8d4] p-6 hover:-translate-y-2 transition-all duration-300">
                <div className="text-[#17d8d4] text-xl gap-1 flex">
                  <FileText size={24} />
                  <div className="ml-2">Published</div>
                </div>
                <h2 className="text-3xl font-bold text-[#17d8d4] mt-4">12</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-[#171A1A] rounded-3xl border border-[#17d8d4]/20 p-8">
          <h2 className="text-3xl font-bold text-[#17d8d4]">About</h2>
          <p className="text-zinc-300 leading-8 mt-5">
            {profile?.about || "No about info yet."}
          </p>
        </div>
      </div>


      <Container>
        <div className="mt-8">

          <h2 className="text-3xl font-bold text-white mb-6">
            Recent Articles
          </h2>

          <div className="space-y-6">

            {[1].map((post) => (

              <div
                key={post}
                className="bg-[#171A1A] rounded-3xl border border-cyan-500/20 p-6 hover:border-cyan-400 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >

                <div className="flex flex-col md:flex-row gap-6">
                  <img src="https://picsum.photos/400/250" alt="" className="w-full md:w-72 h-48 object-cover rounded-2xl" />
                  <div className="flex-1 flex flex-col justify-between">

                    <div>
                      <span className="inline-block bg-cyan-400/10 text-cyan-400 px-3 py-1 rounded-full text-sm font-medium">
                        Technology
                      </span>
                      <h3 className="text-3xl text-white font-bold mt-4 hover:text-cyan-400 transition">
                        Building Authentication with React & Appwrite
                      </h3>
                      <p className="text-zinc-400 mt-4 leading-7">
                        Learn how to build a complete authentication system
                        using React, Appwrite and modern best practices. This
                        guide covers login, signup, protected routes and user
                        sessions.
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-6 mt-6 text-sm text-zinc-500">
                      <span>📅 July 26, 2026</span>
                      <span>👁 2.8K Views</span>
                      <span>❤️ 386 Likes</span>
                      <span>⏱ 6 min read</span>
                    </div>

                  </div>
                </div>
              </div>

            ))}

          </div>
        </div>
      </Container>
      </div>

  );
}
