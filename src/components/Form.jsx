import { useState } from 'react';
import axios from 'axios';
import send from '/assets/send.svg';
import './Form.css';

//https://www.emailjs.com/docs/rest-api/send/

export default function Form() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');

	const sendEmail = async (e) => {
		e.preventDefault();

		const serviceId = 'service_o27g2dn';
		const templateId = 'template_axt4549';
		const publicKey = 'lj6JBpeIF1ngNLEpo';

		const data = {
			service_id: serviceId,
			template_id: templateId,
			user_id: publicKey,
			template_params: {
				from_name: name,
				from_email: email,
				to_name: 'Mo',
				message: message,
			}
		}

		try{
			const res = await axios.post('https://api.emailjs.com/api/v1.0/email/send', data);
			console.log(res.data);
			setName('');
			setEmail('');
			setMessage('');
		} catch(err){
			console.log(err);
		};
	}

	return (
		<form onSubmit={sendEmail}>
			<div className='form-header'>
				<p>Dear Mo,</p>
				<input 
					className='form-text'
					placeHolder='Email'
					type="email"      
					name="user_email" 
					value={email}
					onChange={e => setEmail(e.target.value)}
					/>
			</div>
			<textarea 
				className='form-box'
				placeHolder='Write your message here...'
				name="message" 
				value={message}
				onChange={e => setMessage(e.target.value)}
				/>
			<div className='form-footer'>
			<input 
				className='form-text'
				placeHolder='Full Name'
				type="text" 
				name="user_name" 
				value={name}
				onChange={e => setName(e.target.value)}
				/>
			<button type="submit">
			  <img src={send} alt="send"/>
			</button>
			</div>
		</form>
	)
}