import { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineMail } from "react-icons/md";
import { MdPassword } from "react-icons/md";
import XSvg from "../../components/svg/X";

const LoginPage = () => {
	const [formData, setFormData] = useState({
		username: "",
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
		<div className='flex mx-auto max-w-screen-xl h-screen'>
			<div className='lg:flex flex-1 justify-center items-center hidden'>
				<XSvg className='lg:w-2/3 fill-white' />
			</div>
			<div className='flex flex-col flex-1 justify-center items-center'>
				<form className='flex flex-col gap-4' onSubmit={handleSubmit}>
					<XSvg className='lg:hidden w-24 fill-white' />
					<h1 className='font-extrabold text-4xl text-white'>{"Let's"} go.</h1>
					<label className='flex items-center gap-2 input-bordered rounded input'>
						<MdOutlineMail />
						<input
							type='text'
							className='grow'
							placeholder='username'
							name='username'
							onChange={handleInputChange}
							value={formData.username}
						/>
					</label>

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
					<button className='rounded-full text-white btn btn-primary'>Login</button>
					{isError && <p className='text-red-500'>Something went wrong</p>}
				</form>
				<div className='flex flex-col gap-2 mt-4'>
					<p className='text-lg text-white'>{"Don't"} have an account?</p>
					<Link to='/signup'>
						<button className='rounded-full w-full text-white btn btn-outline btn-primary'>Sign up</button>
					</Link>
				</div>
			</div>
		</div>
	);
};
export default LoginPage;