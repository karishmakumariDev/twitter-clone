
import { Link } from "react-router-dom";
import { useState } from "react";

import XSvg from "../../components/svgs/X";

import { MdOutlineMail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";

const SignUpPage = () => {
	const [formData, setFormData] = useState({
		email: "",
		username: "",
		fullName: "",
		password: "",
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);
	};

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const isError = false;

	return (
		<div className='flex mx-auto px-10 max-w-screen-xl h-screen'>
			<div className='lg:flex flex-1 justify-center items-center hidden'>
				<XSvg className='lg:w-2/3 fill-white' />
			</div>
			<div className='flex flex-col flex-1 justify-center items-center'>
				<form className='flex flex-col gap-4 mx-auto md:mx-20 lg:w-2/3' onSubmit={handleSubmit}>
					<XSvg className='lg:hidden w-24 fill-white' />
					<h1 className='font-extrabold text-4xl text-white'>Join today.</h1>
					<label className='flex items-center gap-2 input-bordered rounded input'>
						<MdOutlineMail />
						<input
							type='email'
							className='grow'
							placeholder='Email'
							name='email'
							onChange={handleInputChange}
							value={formData.email}
						/>
					</label>
					<div className='flex flex-wrap gap-4'>
						<label className='flex flex-1 items-center gap-2 input-bordered rounded input'>
							<FaUser />
							<input
								type='text'
								className='grow'
								placeholder='Username'
								name='username'
								onChange={handleInputChange}
								value={formData.username}
							/>
						</label>
						<label className='flex flex-1 items-center gap-2 input-bordered rounded input'>
							<MdDriveFileRenameOutline />
							<input
								type='text'
								className='grow'
								placeholder='Full Name'
								name='fullName'
								onChange={handleInputChange}
								value={formData.fullName}
							/>
						</label>
					</div>
					<label className='flex items-center gap-2 input-bordered rounded input'>
						<MdPassword />
						<input
							type='password'
							className='grow'
							placeholder='Password'
							name='password'
							onChange={handleInputChange}
							value={formData.password}
						/>
					</label>
					<button className='rounded-full text-white btn btn-primary'>Sign up</button>
					{isError && <p className='text-red-500'>Something went wrong</p>}
				</form>
				<div className='flex flex-col gap-2 mt-4 lg:w-2/3'>
					<p className='text-lg text-white'>Already have an account?</p>
					<Link to='/login'>
						<button className='rounded-full w-full text-white btn btn-outline btn-primary'>Sign in</button>
					</Link>
				</div>
			</div>
		</div>
	);
};
export default SignUpPage;