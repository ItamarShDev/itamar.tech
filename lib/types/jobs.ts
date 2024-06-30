export type Company = {
	name: string;
	logo: string;
	website: string;
};
export type Duration = {
	from: number;
	to: number;
};

export type Job = {
	title: string;
	duration: Duration;
	company: Company;
	tags: string[];
	description: string;
	elaborated_description?: string;
};
