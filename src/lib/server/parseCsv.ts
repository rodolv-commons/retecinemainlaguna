// src/lib/server/parseCsv.ts
import { parse } from 'csv-parse/sync';
import type { ZodType } from 'zod';

export function parseCsvFile<T>(content: string, schema: ZodType<T>): T[] {
	const records = parse(content, {
		columns: true,
		skip_empty_lines: true,
		trim: true
	}) as unknown[];

	return records.map((record, i) => {
		const result = schema.safeParse(record);
		if (!result.success) {
			console.error(`Error parsing CSV at row ${i + 1}:`, record);
			console.error(result.error.format());
			throw new Error(`CSV parsing error on row ${i + 1}`);
		}
		return result.data;
	});
}
