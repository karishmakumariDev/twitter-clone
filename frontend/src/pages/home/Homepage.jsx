
import { useState } from "react";
import CreatePost from "./CreatePost";
import Posts from "../../components/common/Posts";

const HomePage = () => {
	const [feedType, setFeedType] = useState("forYou");

	return (
		<>
			<div className='flex-[4_4_0] mr-auto border-gray-700 border-r min-h-screen'>
				{/* Header */}
				<div className='flex border-gray-700 border-b w-full'>
					<div
						className={
							"flex justify-center flex-1 p-3 hover:bg-secondary transition duration-300 cursor-pointer relative"
						}
						onClick={() => setFeedType("forYou")}
					>
						For you
						{feedType === "forYou" && (
							<div className='bottom-0 absolute bg-primary rounded-full w-10 h-1'></div>
						)}
					</div>
					<div
						className='relative flex flex-1 justify-center hover:bg-secondary p-3 transition duration-300 cursor-pointer'
						onClick={() => setFeedType("following")}
					>
						Following
						{feedType === "following" && (
							<div className='bottom-0 absolute bg-primary rounded-full w-10 h-1'></div>
						)}
					</div>
				</div>
				<CreatePost />

				{/* POSTS */}
				{ <Posts  feedType = {feedType}/> }
			</div>
		</>
	);
};
export default HomePage;