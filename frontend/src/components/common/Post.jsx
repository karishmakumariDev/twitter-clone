// import { FaRegComment } from "react-icons/fa";
// import { BiRepost } from "react-icons/bi";
// import { FaRegHeart } from "react-icons/fa";
// import { FaRegBookmark } from "react-icons/fa6";
// import { FaTrash } from "react-icons/fa";
// import { useState } from "react";
// import { Link } from "react-router-dom";

// const Post = ({ post }) => {
// 	const [comment, setComment] = useState("");
// 	const postOwner = post.user;
// 	const isLiked = false;

// 	const isMyPost = true;

// 	const formattedDate = "1h";

// 	const isCommenting = false;

// 	const handleDeletePost = () => {};

// 	const handlePostComment = (e) => {
// 		e.preventDefault();
// 	};

// 	const handleLikePost = () => {};

// 	return (
// 		<>
// 			<div className='flex items-start gap-2 border-gray-700 p-4 border-b'>
// 				<div className='avatar'>
// 					<Link to={`/profile/${postOwner.username}`} className='rounded-full w-8 overflow-hidden'>
// 						<img src={postOwner.profileImg || "/avatar-placeholder.png"} />
// 					</Link>
// 				</div>
// 				<div className='flex flex-col flex-1'>
// 					<div className='flex items-center gap-2'>
// 						<Link to={`/profile/${postOwner.username}`} className='font-bold'>
// 							{postOwner.fullName}
// 						</Link>
// 						<span className='flex gap-1 text-gray-700 text-sm'>
// 							<Link to={`/profile/${postOwner.username}`}>@{postOwner.username}</Link>
// 							<span>·</span>
// 							<span>{formattedDate}</span>
// 						</span>
// 						{isMyPost && (
// 							<span className='flex flex-1 justify-end'>
// 								<FaTrash className='hover:text-red-500 cursor-pointer' onClick={handleDeletePost} />
// 							</span>
// 						)}
// 					</div>
// 					<div className='flex flex-col gap-3 overflow-hidden'>
// 						<span>{post.text}</span>
// 						{post.img && (
// 							<img
// 								src={post.img}
// 								className='border-gray-700 border rounded-lg h-80 object-contain'
// 								alt=''
// 							/>
// 						)}
// 					</div>
// 					<div className='flex justify-between mt-3'>
// 						<div className='flex justify-between items-center gap-4 w-2/3'>
// 							<div
// 								className='group flex items-center gap-1 cursor-pointer'
// 								onClick={() => document.getElementById("comments_modal" + post._id).showModal()}
// 							>
// 								<FaRegComment className='group-hover:text-sky-400 w-4 h-4 text-slate-500' />
// 								<span className='group-hover:text-sky-400 text-slate-500 text-sm'>
// 									{post.comments.length}
// 								</span>
// 							</div>
// 							{/* We're using Modal Component from DaisyUI */}
// 							<dialog id={`comments_modal${post._id}`} className='border-none modal outline-none'>
// 								<div className='border-gray-600 border rounded modal-box'>
// 									<h3 className='mb-4 font-bold text-lg'>COMMENTS</h3>
// 									<div className='flex flex-col gap-3 max-h-60 overflow-auto'>
// 										{post.comments.length === 0 && (
// 											<p className='text-slate-500 text-sm'>
// 												No comments yet 🤔 Be the first one 😉
// 											</p>
// 										)}
// 										{post.comments.map((comment) => (
// 											<div key={comment._id} className='flex items-start gap-2'>
// 												<div className='avatar'>
// 													<div className='rounded-full w-8'>
// 														<img
// 															src={comment.user.profileImg || "/avatar-placeholder.png"}
// 														/>
// 													</div>
// 												</div>
// 												<div className='flex flex-col'>
// 													<div className='flex items-center gap-1'>
// 														<span className='font-bold'>{comment.user.fullName}</span>
// 														<span className='text-gray-700 text-sm'>
// 															@{comment.user.username}
// 														</span>
// 													</div>
// 													<div className='text-sm'>{comment.text}</div>
// 												</div>
// 											</div>
// 										))}
// 									</div>
// 									<form
// 										className='flex items-center gap-2 border-gray-600 mt-4 pt-2 border-t'
// 										onSubmit={handlePostComment}
// 									>
// 										<textarea
// 											className='border-gray-800 p-1 border rounded w-full text-md resize-none textarea focus:outline-none'
// 											placeholder='Add a comment...'
// 											value={comment}
// 											onChange={(e) => setComment(e.target.value)}
// 										/>
// 										<button className='px-4 rounded-full text-white btn btn-primary btn-sm'>
// 											{isCommenting ? (
// 												<span className='loading loading-md loading-spinner'></span>
// 											) : (
// 												"Post"
// 											)}
// 										</button>
// 									</form>
// 								</div>
// 								<form method='dialog' className='modal-backdrop'>
// 									<button className='outline-none'>close</button>
// 								</form>
// 							</dialog>
// 							<div className='group flex items-center gap-1 cursor-pointer'>
// 								<BiRepost className='group-hover:text-green-500 w-6 h-6 text-slate-500' />
// 								<span className='group-hover:text-green-500 text-slate-500 text-sm'>0</span>
// 							</div>
// 							<div className='group flex items-center gap-1 cursor-pointer' onClick={handleLikePost}>
// 								{!isLiked && (
// 									<FaRegHeart className='group-hover:text-pink-500 w-4 h-4 text-slate-500 cursor-pointer' />
// 								)}
// 								{isLiked && <FaRegHeart className='w-4 h-4 text-pink-500 cursor-pointer' />}

// 								<span
// 									className={`text-sm text-slate-500 group-hover:text-pink-500 ${
// 										isLiked ? "text-pink-500" : ""
// 									}`}
// 								>
// 									{post.likes.length}
// 								</span>
// 							</div>
// 						</div>
// 						<div className='flex justify-end items-center gap-2 w-1/3'>
// 							<FaRegBookmark className='w-4 h-4 text-slate-500 cursor-pointer' />
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</>
// 	);
// };
// export default Post;