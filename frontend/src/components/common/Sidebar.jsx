//import React from 'react'

import XSvg from "../svg/X";

import { MdHomeFilled } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";

const Sidebar = () => {
	const data = {
		fullName: "John Doe",
		username: "johndoe",
		profileImg: "/avatars/boy1.png",
	};

	return (
		<div className='md:flex-[2_2_0] w-18 max-w-52'>
			<div className='top-0 left-0 sticky flex flex-col border-gray-700 border-r w-20 md:w-full h-screen'>
				<Link to='/' className='flex justify-center md:justify-start'>
					<XSvg className='hover:bg-stone-900 px-2 rounded-full w-12 h-12 fill-white' />
				</Link>
				<ul className='flex flex-col gap-3 mt-4'>
					<li className='flex justify-center md:justify-start'>
						<Link
							to='/'
							className='flex items-center gap-3 hover:bg-stone-900 py-2 pr-4 pl-2 rounded-full max-w-fit transition-all duration-300 cursor-pointer'
						>
							<MdHomeFilled className='w-8 h-8' />
							<span className='md:block hidden text-lg'>Home</span>
						</Link>
					</li>
					<li className='flex justify-center md:justify-start'>
						<Link
							to='/notifications'
							className='flex items-center gap-3 hover:bg-stone-900 py-2 pr-4 pl-2 rounded-full max-w-fit transition-all duration-300 cursor-pointer'
						>
							<IoNotifications className='w-6 h-6' />
							<span className='md:block hidden text-lg'>Notifications</span>
						</Link>
					</li>

					<li className='flex justify-center md:justify-start'>
						<Link
							to={`/profile/${data?.username}`}
							className='flex items-center gap-3 hover:bg-stone-900 py-2 pr-4 pl-2 rounded-full max-w-fit transition-all duration-300 cursor-pointer'
						>
							<FaUser className='w-6 h-6' />
							<span className='md:block hidden text-lg'>Profile</span>
						</Link>
					</li>
				</ul>
				{data && (
					<Link
						to={`/profile/${data.username}`}
						className='flex items-start gap-2 hover:bg-[#181818] mt-auto mb-10 px-4 py-2 rounded-full transition-all duration-300'
					>
						<div className='md:inline-flex hidden avatar'>
							<div className='rounded-full w-8'>
								<img src={data?.profileImg || "/avatar-placeholder.png"} />
							</div>
						</div>
						<div className='flex flex-1 justify-between'>
							<div className='md:block hidden'>
								<p className='w-20 font-bold text-sm text-white truncate'>{data?.fullName}</p>
								<p className='text-slate-500 text-sm'>@{data?.username}</p>
							</div>
							<BiLogOut className='w-5 h-5 cursor-pointer' />
						</div>
					</Link>
				)}
			</div>
		</div>
	);
};
export default Sidebar;