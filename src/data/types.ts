export interface Car {
		image: string;
		brand: string;
		model: string;
		color: string;
		price: number | undefined;
		year: number | undefined;
		engineType?: string;
		transmission?: string;
		range?: number | null;
		id?: string;
}