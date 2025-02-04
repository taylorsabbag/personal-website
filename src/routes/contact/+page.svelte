<section>
	<h1>Contact Me</h1>
	<p>
		I'm always looking for new opportunities and challenges. If you have any questions or would like
		to collaborate, please don't hesitate to reach out. Send me an email (
		<a href="mailto:inquiries@taylorsabbag.com">inquiries@taylorsabbag.com</a>) or fill out the form
		below.
	</p>

	<form>
		<label for="name">Name</label>
		<input type="text" id="name" name="name" />

		<label for="email">Email</label>
		<input type="email" id="email" name="email" />

		<label for="message">Message</label>
		<textarea id="message" name="message"></textarea>

		<button type="submit">Send</button>
	</form>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	label {
		font-weight: 600;
	}

	input,
	textarea {
		padding: 0.5rem;
		border: 1px solid #ccc;
		border-radius: 0.25rem;
	}

	button {
		padding: 0.5rem 1rem;
		border: 1px solid #ccc;
		border-radius: 0.25rem;
		background-color: #000;
		color: #fff;
		cursor: pointer;
	}
</style>
