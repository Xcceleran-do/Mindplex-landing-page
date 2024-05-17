<script>
	import GlowingBtn from '$lib/ui/GlowingBtn.svelte';
	import { Dialog, Separator, Label } from 'bits-ui';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { PUBLIC_API_MESSAGE_URL } from '$env/static/public';

	const API_URL = PUBLIC_API_MESSAGE_URL;

	const sendUserMessage = async (data) => {
		return fetch(API_URL, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			}
		});
	};

	let spinnerVisible = false;
	let successVisible = false;
	let failureVisible = false;

	async function handleSubmit(event) {
		event.preventDefault();

		const formData = new FormData(event.target);

		const data = {};
		console.log(data);
		formData.forEach((value, key) => {
			data[key] = value;
		});

		spinnerVisible = true;
		try {
			const res = await sendUserMessage(data);
			console.log(res);
			if (!res.ok) {
				throw new Error('Error sending message');
			}
			successVisible = true;
		} catch (error) {
			console.error(error);
			failureVisible = true;
			setTimeout(() => {
				failureVisible = false;
				event.target.reset();
			}, 3000);
		} finally {
			spinnerVisible = false;
		}
	}
</script>

<Dialog.Portal>
	<Dialog.Overlay
		transition={fade}
		transitionConfig={{ duration: 150 }}
		class="fixed inset-0 z-50 bg-[#18304a] opacity-70 "
	/>
	<Dialog.Content
		class="fixed flex flex-col left-[50%] top-[50%] border-none z-50 w-full max-w-[94%] translate-x-[-50%] translate-y-[-50%] rounded-lg
		 bg-gradient-to-br from-[#1b3049] to-[#205d5c] p-5 shadow-popover outline-none sm:max-w-[490px] md:w-full"
	>
		<Dialog.Title class="text-3xl mb-5 font-montserrat mt-6 text-center ">Contact Us</Dialog.Title>
		<Separator.Root class="" />

		<Dialog.Description class=""></Dialog.Description>
		<form class="formContainer" onsubmit={handleSubmit}>
			<div class="my-2">
				<Label.Root for="fullname" class="font-montserrat ">Full name</Label.Root>
				<div class="my-2">
					<input
						type="text"
						id="fullname"
						name="fullname"
						required
						class="mt-1 p-2 w-full border rounded-md text-black"
					/>
				</div>
				<div class="my-2">
					<Label.Root for="email" class="font-montserrat ">Email</Label.Root>
					<div class="my-2">
						<input
							type="email"
							id="email"
							name="email"
							required
							class="mt-1 p-2 w-full border rounded-md text-black"
						/>
					</div>
					<div class="my-2">
						<Label.Root for="message" class="font-montserrat ">Message</Label.Root>
						<div class="my-2">
							<textarea
								id="message"
								name="message"
								required
								class="mt-1 p-2 w-full border rounded-md text-black"
								rows="4"
							></textarea>
						</div>
					</div>
					<div class="">
						<div class=" px-4 py-2 text-white bg-[#34947A] mt-5 rounded-md max-w-32 text-center">
							<input
								type="submit"
								id="submit"
								name="submit"
								value="Submit"
								class="text-center"
								required
							/>
						</div>
					</div>
				</div>

				<div
					class="absolute inset-0 flex items-center justify-center"
					id="spinner"
					style="display: {spinnerVisible ? 'flex' : 'none'};"
				>
					<div
						class="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
					></div>
				</div>
				<div
					class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1b3049] to-[#205d5c]"
					id="successMessage"
					style="display: {successVisible ? 'flex' : 'none'}"
				>
					<p class="text-green-500 font-black text-2xl px-9">Form submitted successfully!</p>
				</div>
				<div
					class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1b3049] to-[#205d5c]"
					id="failureMessage"
					style="display: {failureVisible ? 'flex' : 'none'}"
				>
					<p class="text-red-500 font-black text-xl px-9">
						Form submission failed. Please try again later.
					</p>
				</div>
				<Dialog.Close
					class="absolute right-5 top-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-98"
				>
					<div class="bg-[#1b3049] p-5 rounded-full w-8 h-8 flex justify-center items-center">
						<span class=" text-xl">X</span>
					</div>
				</Dialog.Close>
			</div>
		</form></Dialog.Content
	>
</Dialog.Portal>
