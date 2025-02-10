import XSvg from "../svg/X";

import { MdHomeFilled } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { useMutation,useQuery,useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const Sidebar = () => {
	const queryClient = useQueryClient();
	const { mutate: logout } = useMutation({
		mutationFn: async () => {
			try {
				const res = await fetch("/api/auth/logout", {
					method: "POST",
				});
				const data = await res.json();

				if (!res.ok) {
					throw new Error(data.error || "Something went wrong");
				}
			} catch (error) {
				throw new Error(error);
			}
		},
		onSuccess: () => {
            toast.success("LogOut Successfully")
			queryClient.invalidateQueries({ queryKey: ["authUser"] });
		},
		onError: () => {
			toast.error("Logout failed");
		},
	});
	const { data: authUser } = useQuery({ queryKey: ["authUser"] });

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
							to={`/profile/${authUser?.username}`}
							className='flex items-center gap-3 hover:bg-stone-900 py-2 pr-4 pl-2 rounded-full max-w-fit transition-all duration-300 cursor-pointer'
						>
							<FaUser className='w-6 h-6' />
							<span className='md:block hidden text-lg'>Profile</span>
						</Link>
					</li>
				</ul>
				{authUser && (
					<Link
						to={`/profile/${authUser.username}`}
						className='flex items-start gap-2 hover:bg-[#181818] mt-auto mb-10 px-4 py-2 rounded-full transition-all duration-300'
					>
						<div className='md:inline-flex hidden avatar'>
							<div className='rounded-full w-8'>
								<img src={authUser?.profileImg || "/avatar-placeholder.png"} />
							</div>
						</div>
						<div className='flex flex-1 justify-between'>
							<div className='md:block hidden'>
								<p className='w-20 font-bold text-sm text-white truncate'>{authUser?.fullName}</p>
								<p className='text-slate-500 text-sm'>@{authUser?.username}</p>
							</div>
							<BiLogOut
								className='w-5 h-5 cursor-pointer'
								onClick={(e) => {
									e.preventDefault();
									logout();
								}}
							/>
						</div>
					</Link>
				)}
			</div>
		</div>
	);
};
export default Sidebar;                                                                               