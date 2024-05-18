<script lang="ts">
	const footerDate = String(new Date().getFullYear());
</script>

<footer id="footer" class="bg-[#050e24] text-white py-8">
	<div class="footer-wrapper px-8 flex flex-col space-y-8 pb-0">
		<div class="top-footer-content flex justify-evenly flex-wrap pb-8">
			<div class="left-footer-content flex flex-col flex-2 ml-5">
				<div class="h-8 mb-5">
					<img
						src="https://magazine.mindplex.ai/wp-content/themes/Mindplex-Theme/assets/header/mindplexTxt.png"
						alt="Logo"
						class="footer-logo w-24 mb-5"
					/>
				</div>
				<p class="footer-desc text-base text-gray-500 max-w-lg">
					Mindplex is an AI startup, a futuristic media platform, and a network providing a dynamic
					space for science enthusiasts, creators, influencers, and media aficionados to connect and
					collaborate
				</p>
			</div>
			<div class="center-footer-content flex flex-col flex-1 min-w-48 mx-5">
				<h1 class="mb-2 font-bold text-gray-500">Quick links</h1>
				<div>
					<ul class="list-none p-0">
						<li class="text-base">
							<a href="https://magazine.mindplex.ai/terms/" class="text-gray-500 hover:underline"
								>Terms and Privacy</a
							>
						</li>
						<li class="text-base">
							<a href="https://magazine.mindplex.ai/news/" class="text-gray-500 hover:underline"
								>News</a
							>
						</li>
						<li class="text-base">
							<a
								href="https://magazine.mindplex.ai/coming-soon/"
								class="text-gray-500 hover:underline">Content Factory</a
							>
						</li>
					</ul>
				</div>
			</div>
			<div class="center-footer-content flex flex-col flex-1 min-w-48 mx-5">
				<h1 class="mb-2 font-bold text-gray-500">About us</h1>
				<div>
					<ul class="list-none p-0">
						<li>
							<a
								class="text-base text-gray-500 hover:underline"
								href="https://magazine.mindplex.ai/coming-soon/?type=newsletter">Newsletter</a
							>
						</li>
					</ul>
				</div>
			</div>
			<div class="right-footer-content flex flex-col mr-64 mx-5">
				<h1 class="mb-2 font-bold text-gray-500">Contact</h1>
				<div>
					<ul class="list-none p-0">
						<li class="text-base cursor-pointer text-gray-500 hover:underline">
							<span id="openModalFooter">Team</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div
			class="bottom-footer-content flex flex-row-reverse items-center justify-between space-y-4 flex-wrap"
		>
			<div class="social-icons flex space-x-3">
				<a href="https://twitter.com/Mindplex_AI" target="_blank" class="w-6">
					<img
						src="https://magazine.mindplex.ai/wp-content/themes/Mindplex-Theme/assets/footer/twitter.svg"
						alt="twitter"
					/>
				</a>
				<a href=" https://www.facebook.com/MindplexAI" target="_blank" class="w-6">
					<img
						src="https://magazine.mindplex.ai/wp-content/themes/Mindplex-Theme/assets/footer/facebook.svg"
						alt="facebook"
					/>
				</a>
				<a
					href="https://www.youtube.com/channel/UCUwdBITXX-aDXgt2ZmBD-IA"
					target="_blank"
					class="w-6"
				>
					<img
						src="https://magazine.mindplex.ai/wp-content/themes/Mindplex-Theme/assets/footer/youtube.svg"
						alt="youtube"
					/>
				</a>

				<a href="https://www.linkedin.com/company/79915299/" target="_blank" class="w-5 pb-1">
					<img
						src="https://magazine.mindplex.ai/wp-content/themes/Mindplex-Theme/assets/footer/linkedin.svg"
						alt="linkedin"
					/>
				</a>
				<a href="https://t.me/mindplex_ai" target="_blank" class="w-6">
					<img
						src="https://magazine.mindplex.ai/wp-content/themes/Mindplex-Theme/assets/footer/telegram.svg"
						alt="telegram"
					/>
				</a>
			</div>
			<p class="footer-copy text-gray-500">
				© <span>{footerDate}</span> Mindplex all rights reserved
			</p>
		</div>
	</div>
</footer>
