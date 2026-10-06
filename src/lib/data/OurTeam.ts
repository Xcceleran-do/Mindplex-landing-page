export type TeamMember = {
	name: string;
	imageUrl: string;
	position: string;
	/** Empty when the member has no public profile; the link is then omitted. */
	socialLink: string;
	customImageStyle?: string;
};

export const ourTeam: TeamMember[] = [
	{
		name: 'Dr. Ben Goertzel',
		imageUrl:
			'/team/ben.png',
		position: 'Chief Scientific Advisor',
		socialLink: 'https://www.linkedin.com/in/bengoertzel'
	},
	{
		name: 'Amara Angelica',
		imageUrl:
			'/team/amara.png',
		position: 'Senior Editor',
		socialLink: 'https://www.linkedin.com/in/amaraa'
	},
	{
		name: "Conor O'Higgins",
		imageUrl:
			'/team/conor.png',
		position: 'Managing Editor',
		socialLink: ''
	},
	{
		name: 'Haley Lowy',
		imageUrl: '/team/aloha_haley.png',
		position: 'Chief Marketing Officer',
		socialLink: 'https://www.linkedin.com/in/haley-lowy-a32351271/'
	},
	{
		name: 'Hruy Tsegaye',
		imageUrl: '/team/Hury-2624x4094-1-scaled.jpg',
		position: 'Chief Executive Officer',
		socialLink: 'https://www.linkedin.com/in/hruy-tsegaye',
		customImageStyle: 'object-position:top'
	},
	{
		name: 'Lewis Farrell',
		imageUrl: '/team/Luis-800x800-1.jpeg',
		position: 'Advisor',
		socialLink: 'https://www.linkedin.com/in/lewis-e-farrell-b271784/'
	},
	{
		name: 'Lisa Rein',
		imageUrl:
			'/team/lisa.png',
		position: 'Producer/Editor/Co-host',
		socialLink: 'https://www.linkedin.com/in/lisarein'
	},
	{
		name: 'Mario Casiraghi',
		imageUrl: '/team/Mario-500x500-1.jpeg',
		position: 'Head of Crypto Operations',
		socialLink: 'https://www.linkedin.com/in/macasiraghi/'
	},
	{
		name: 'Romi K.',
		imageUrl: '/team/Romi-400x400-1.jpg',
		position: 'Community Manager',
		socialLink: 'https://www.linkedin.com/in/kromy/'
	},
	{
		name: 'Giulio Prisco',
		imageUrl: '/team/gulio-scaled.jpeg',
		position: 'Senior Editor',
		socialLink: 'https://www.linkedin.com/in/giulioprisco'
	}
];
