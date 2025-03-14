import React from "react";

/**
 * FIXME: TOO Boring, something outside the box. wym call me or email me? there has to be a better way that we can think of to contact me
 */
function Contact() {
	return (
		<div className="contact-card">
			<h2>Contact Us</h2>
			<p>If you have any questions, feel free to reach out!</p>
			<form>
				<label htmlFor="name">Name:</label>
				<input type="text" id="name" name="name" required />

				<label htmlFor="email">Email:</label>
				<input type="email" id="email" name="email" required />

				<label htmlFor="message">Message:</label>

				<button type="submit">Send</button>
			</form>
		</div>
	);
}

export default Contact;
