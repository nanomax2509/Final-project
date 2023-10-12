import React, { useState } from 'react';
import './Register.scss';

function Register() {
	const [values, setValues] = useState({
		email: '',
		name: '',
		password: '',
		confirmPassword: '',
		phone: '',
		gender: true,
	});

	const [errors, setErrors] = useState({
		email: '',
		name: '',
		password: '',
		confirmPassword: '',
		phone: '',
		gender: true,
	});

	// const [touched, setTouched] = useState({
	// 	name: '',
	// 	password: '',
	// 	confirmPassword: '',
	// });

	const handleSubmit = (event) => {
		// chặn reload lại trang của thẻ form.
		event.preventDefault();

		console.log(values);
	};

	const handleChangeValue = (event) => {
		const { name, value } = event.target;

		setValues({
			...values, // giữ những giá trị cũ. đối với class thì không cần bước này
			[name]: value,
		});
	};

	const handleBlur = (event) => {
		const { value, name } = event.target;
		const newErrors = {};

		if (name === 'name') {
			if (value === '') {
				newErrors.name = 'name is required';
			} else {
				newErrors.name = '';
			}
		}

		if (name === 'password') {
			if (value === '') {
				newErrors.password = 'Password is required';
			} else {
				newErrors.password = '';
			}
		}

		if (name === 'confirmPassword') {
			if (value === '') {
				newErrors.confirmPassword = 'Confirm Password is required';
			} else {
				newErrors.confirmPassword = '';
			}
		}

		setErrors({
			...errors,
			...newErrors,
		});
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label>Email</label>
				<input
					onBlur={handleBlur}
					onChange={handleChangeValue}
					type='text'
					name='email'
					value={values.email}
				/>
				{errors.name && <p>{errors.name}</p>}
			</div>
			<div>
				<label>Name</label>
				<input
					onBlur={handleBlur}
					onChange={handleChangeValue}
					type='text'
					name='name'
					value={values.name}
				/>
				{errors.name && <p>{errors.name}</p>}
			</div>

			<div>
				<label>Password: </label>
				<input
					onBlur={handleBlur}
					onChange={handleChangeValue}
					type='text'
					name='password'
					value={values.password}
				/>
				{errors.password && <p>{errors.password}</p>}
			</div>

			<div>
				<label>Confirm Password: </label>
				<input
					onBlur={handleBlur}
					onChange={handleChangeValue}
					type='text'
					name='confirmPassword'
					value={values.confirmPassword}
				/>
				{errors.confirmPassword && <p>{errors.confirmPassword}</p>}
			</div>
			<div>
				<label>Phone</label>
				<input
					onBlur={handleBlur}
					onChange={handleChangeValue}
					type='text'
					name='phone'
					value={values.phone}
				/>
				{errors.name && <p>{errors.name}</p>}
			</div>
			<div>
				<label>Gender</label>
				<select
					onBlur={handleBlur}
					onChange={handleChangeValue}
					name="gender"
					value={values.gender}
				>
					<option value="">Select gender</option>
					<option value="true">Male</option>
					<option value="false">Female</option>
				</select>
				{errors.gender && <p>{errors.gender}</p>}
			</div>
			<button type='submit'>Submit</button>
		</form>
	);
}

export default Register;
