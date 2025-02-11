import { useRef, useState } from "react";
import { Link } from "react-router-dom";

import Posts from "../../components/common/Posts";
import ProfileHeaderSkeleton from "../../components/skeletons/ProfileHeaderSkeleton";
import EditProfileModal from "./EditProfileModal";

import { POSTS } from "../../utils/db/dummy";

import { FaArrowLeft } from "react-icons/fa6";
import { IoCalendarOutline } from "react-icons/io5";
import { FaLink } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";

const ProfilePage = () => {
	const [coverImg, setCoverImg] = useState(null);
	const [profileImg, setProfileImg] = useState(null);
	const [feedType, setFeedType] = useState("posts");

	const coverImgRef = useRef(null);
	const profileImgRef = useRef(null);

	const { data: authUser } = useQuery({ queryKey: ["authUser"] });

	const isLoading = false;
	const isMyProfile = true;

	// const user = {
	// 	_id: "1",
	// 	fullName: "John Doe",
	// 	username: "johndoe",
	// 	profileImg: "/avatars/boy2.png",
	// 	coverImg: "/cover.png",
	// 	bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
	// 	link: "https://youtube.com/@asaprogrammer_",
	// 	following: ["1", "2", "3"],
	// 	followers: ["1", "2", "3"],
	// };

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

	return (
		<>
			<div className='flex-[4_4_0] border-gray-700 border-r min-h-screen'>
				{/* HEADER */}
				{isLoading && <ProfileHeaderSkeleton />}
				{!isLoading && !authUser && <p className='mt-4 text-lg text-center'>User not found</p>}
				<div className='flex flex-col'>
					{!isLoading && authUser && (
						<>
							<div className='flex items-center gap-10 px-4 py-2'>
								<Link to='/'>
									<FaArrowLeft className='w-4 h-4' />
								</Link>
								<div className='flex flex-col'>
									<p className='font-bold text-lg'>{authUser?.fullName}</p>
									<span className='text-slate-500 text-sm'>{POSTS?.length} posts</span>
								</div>
							</div>
							{/* COVER IMG */}
							<div className='group/cover relative'>
								<img
									src={coverImg || authUser?.coverImg || "/cover.png"}
									className='w-full h-52 object-cover'
									alt='cover image'
								/>
								{isMyProfile && (
									<div
										className='top-2 right-2 absolute bg-gray-800 bg-opacity-75 opacity-0 group-hover/cover:opacity-100 p-2 rounded-full transition duration-200 cursor-pointer'
										onClick={() => coverImgRef.current.click()}
									>
										<MdEdit className='w-5 h-5 text-white' />
									</div>
								)}

								<input
									type='file'
									hidden
									ref={coverImgRef}
									onChange={(e) => handleImgChange(e, "coverImg")}
								/>
								<input
									type='file'
									hidden
									ref={profileImgRef}
									onChange={(e) => handleImgChange(e, "profileImg")}
								/>
								{/* USER AVATAR */}
								<div className='-bottom-16 left-4 absolute avatar'>
									<div className='group/avatar relative rounded-full w-32'>
										<img src={profileImg || authUser?.profileImg || "/avatar-placeholder.png"} />
										<div className='top-5 right-3 absolute bg-primary opacity-0 group-hover/avatar:opacity-100 p-1 rounded-full cursor-pointer'>
											{isMyProfile && (
												<MdEdit
													className='w-4 h-4 text-white'
													onClick={() => profileImgRef.current.click()}
												/>
											)}
										</div>
									</div>
								</div>
							</div>
							<div className='flex justify-end mt-5 px-4'>
								{isMyProfile && <EditProfileModal />}
								{!isMyProfile && (
									<button
										className='rounded-full btn-outline btn btn-sm'
										onClick={() => alert("Followed successfully")}
									>
										Follow
									</button>
								)}
								{(coverImg || profileImg) && (
									<button
										className='ml-2 px-4 rounded-full text-white btn btn-primary btn-sm'
										onClick={() => alert("Profile updated successfully")}
									>
										Update
									</button>
								)}
							</div>

							<div className='flex flex-col gap-4 mt-14 px-4'>
								<div className='flex flex-col'>
									<span className='font-bold text-lg'>{authUser?.fullName}</span>
									<span className='text-slate-500 text-sm'>@{authUser?.username}</span>
									<span className='my-1 text-sm'>{authUser?.bio}</span>
								</div>

								<div className='flex flex-wrap gap-2'>
									{authUser?.link && (
										<div className='flex items-center gap-1'>
											<>
												<FaLink className='w-3 h-3 text-slate-500' />
												<a
													href='https://youtube.com/@asaprogrammer_'
													target='_blank'
													rel='noreferrer'
													className='text-blue-500 text-sm hover:underline'
												>
													youtube.com/@asaprogrammer_
												</a>
											</>
										</div>
									)}
									<div className='flex items-center gap-2'>
										<IoCalendarOutline className='w-4 h-4 text-slate-500' />
										<span className='text-slate-500 text-sm'>Joined July 2021</span>
									</div>
								</div>
								<div className='flex gap-2'>
									<div className='flex items-center gap-1'>
										<span className='font-bold text-xs'>{authUser?.following.length}</span>
										<span className='text-slate-500 text-xs'>Following</span>
									</div>
									<div className='flex items-center gap-1'>
										<span className='font-bold text-xs'>{authUser?.followers.length}</span>
										<span className='text-slate-500 text-xs'>Followers</span>
									</div>
								</div>
							</div>
							<div className='flex mt-4 border-gray-700 border-b w-full'>
								<div
									className='relative flex flex-1 justify-center hover:bg-secondary p-3 transition duration-300 cursor-pointer'
									onClick={() => setFeedType("posts")}
								>
									Posts
									{feedType === "posts" && (
										<div className='bottom-0 absolute bg-primary rounded-full w-10 h-1' />
									)}
								</div>
								<div
									className='relative flex flex-1 justify-center hover:bg-secondary p-3 text-slate-500 transition duration-300 cursor-pointer'
									onClick={() => setFeedType("likes")}
								>
									Likes
									{feedType === "likes" && (
										<div className='bottom-0 absolute bg-primary rounded-full w-10 h-1' />
									)}
								</div>
							</div>
						</>
					)}

					<Posts />
				</div>
			</div>
		</>
	);
};
export default ProfilePage;