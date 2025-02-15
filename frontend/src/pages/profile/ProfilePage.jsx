import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Posts from "../../components/common/Posts";
import ProfileHeaderSkeleton from "../../components/skeletons/ProfileHeaderSkeleton";
import EditProfileModal from "./EditProfileModal";

import { POSTS } from "../../utils/db/dummy";

import { FaArrowLeft } from "react-icons/fa6";
import { IoCalendarOutline } from "react-icons/io5";
import { FaLink } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { formatMemberSinceDate } from "../../utils/data";
import useFollow from "../../hooks/useFollow";

import useUpdateUserProfile from "../../hooks/useUpdateUserProfile";

const ProfilePage = () => {
  const [coverImg, setCoverImg] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  const [feedType, setFeedType] = useState("posts");

  const coverImgRef = useRef(null);
  const profileImgRef = useRef(null);

  const { username } = useParams();
  const navigate = useNavigate();

  const { follow, isPending } = useFollow();
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  const {
    data: user,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/users/profile/${username}`);
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
  });

  const { updateProfile, isUpdatingProfile } = useUpdateUserProfile();

  const isMyProfile = authUser._id === user?._id;
  const memberSinceDate = formatMemberSinceDate(user?.createdAt);
  const amIFollowing = authUser?.following.includes(user?._id);

  const handleImgChange = (e, state) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        state === "coverImg" && setCoverImg(reader.result);
        state === "profileImg" && setProfileImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNavigation = (state) => {
    navigate(`/profile/${username}/${state}`);
  };

  useEffect(() => {
    refetch();
  }, [username, refetch]);

  

  return (
    <>
      <div className="flex-[4_4_0] border-gray-700 border-r min-h-screen">
        {/* HEADER */}
        {(isLoading || isRefetching) && <ProfileHeaderSkeleton />}
        {!isLoading && !isRefetching && !user && (
          <p className="mt-4 text-lg text-center">User not found</p>
        )}
        <div className="flex flex-col">
          {!isLoading && !isRefetching && user && (
            <>
              <div className="flex items-center gap-10 px-4 py-2">
                <Link to="/">
                  <FaArrowLeft className="w-4 h-4" />
                </Link>
                <div className="flex flex-col">
                  <p className="font-bold text-lg">{user?.fullName}</p>
                  <span className="text-slate-500 text-sm">
                    {POSTS?.length} posts
                  </span>
                </div>
              </div>
              {/* COVER IMG */}
              <div className="group/cover relative">
                <img
                  src={coverImg || user?.coverImg || "/cover.png"}
                  className="w-full h-52 object-cover"
                  alt="cover image"
                />
                {isMyProfile && (
                  <div
                    className="top-2 right-2 absolute bg-gray-800 bg-opacity-75 opacity-0 group-hover/cover:opacity-100 p-2 rounded-full transition duration-200 cursor-pointer"
                    onClick={() => coverImgRef.current.click()}
                  >
                    <MdEdit className="w-5 h-5 text-white" />
                  </div>
                )}

                <input
                  type="file"
                  hidden
                  accept="image/*"
                  ref={coverImgRef}
                  onChange={(e) => handleImgChange(e, "coverImg")}
                />
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  ref={profileImgRef}
                  onChange={(e) => handleImgChange(e, "profileImg")}
                />
                {/* USER AVATAR */}
                <div className="-bottom-16 left-4 absolute avatar">
                  <div className="group/avatar relative rounded-full w-32">
                    <img
                      src={
                        profileImg ||
                        user?.profileImg ||
                        "/avatar-placeholder.png"
                      }
                    />
                    <div className="top-5 right-3 absolute bg-primary opacity-0 group-hover/avatar:opacity-100 p-1 rounded-full cursor-pointer">
                      {isMyProfile && (
                        <MdEdit
                          className="w-4 h-4 text-white"
                          onClick={() => profileImgRef.current.click()}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-5 px-4">
                {isMyProfile && <EditProfileModal authUser={authUser} />}
                {!isMyProfile && (
                  <button
                    className="rounded-full btn-outline btn btn-sm"
                    onClick={() => follow(user?._id)}
                  >
                    {isPending && "Loading..."}
                    {!isPending && amIFollowing && "Unfollow"}
                    {!isPending && !amIFollowing && "Follow"}
                  </button>
                )}
                {(coverImg || profileImg) && (
                  <button
                    className="ml-2 px-4 rounded-full text-white btn btn-primary btn-sm"
                    onClick={async () => {
                      await updateProfile({ coverImg, profileImg });
                      setProfileImg(null);
                      setCoverImg(null);
                    }}
                  >
                    {isUpdatingProfile ? "Updating..." : "Update"}
                  </button>
                )}
              </div>

              <div className="flex flex-col gap-4 mt-14 px-4">
                <div className="flex flex-col">
                  <span className="font-bold text-lg">{user?.fullName}</span>
                  <span className="text-slate-500 text-sm">
                    @{user?.username}
                  </span>
                  <span className="my-1 text-sm">{user?.bio}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {user?.link && (
                    <div className="flex items-center gap-1">
                      <>
                        <FaLink className="w-3 h-3 text-slate-500" />
                        <a
                          href="https://youtube.com/@asaprogrammer_"
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-500 text-sm hover:underline"
                        >
                          {/* Updated this after recording the video. I forgot to update this while recording, sorry, thx. */}
                          {user?.link}
                        </a>
                      </>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <IoCalendarOutline className="w-4 h-4 text-slate-500" />
                    <span className="text-slate-500 text-sm">
                      {memberSinceDate}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-xs">
                      {user?.following?.length}
                    </span>
                    <span
                      className="text-slate-500 text-xs cursor-pointer"
                      onClick={() => handleNavigation("following")}
                    >
                      Following
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <span className="font-bold text-xs">
                      {user?.followers?.length}
                    </span>
                    <span
                      className="text-slate-500 text-xs cursor-pointer"
                      onClick={() => handleNavigation("followers")}
                    >
                      Followers
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex mt-4 border-gray-700 border-b w-full">
                <div
                  className="relative flex flex-1 justify-center hover:bg-secondary p-3 transition duration-300 cursor-pointer"
                  onClick={() => setFeedType("posts")}
                >
                  Posts
                  {feedType === "posts" && (
                    <div className="bottom-0 absolute bg-primary rounded-full w-10 h-1" />
                  )}
                </div>
                <div
                  className="relative flex flex-1 justify-center hover:bg-secondary p-3 text-slate-500 transition duration-300 cursor-pointer"
                  onClick={() => setFeedType("likes")}
                >
                  Likes
                  {feedType === "likes" && (
                    <div className="bottom-0 absolute bg-primary rounded-full w-10 h-1" />
                  )}
                </div>
              </div>
            </>
          )}

          <Posts feedType={feedType} username={username} userId={user?._id} />
        </div>
      </div>
    </>
  );
};
export default ProfilePage;
