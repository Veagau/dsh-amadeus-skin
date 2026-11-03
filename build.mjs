import { readFile, writeFile } from 'node:fs/promises';
const source = await readFile(new URL('./client.source.js', import.meta.url), 'utf8');
const image = await readFile(new URL('./amadeus-logo.png', import.meta.url));
const marker = '__AMADEUS_LOGO_DATA__';
if (source.split(marker).length !== 2 || !image.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10]))) throw new Error('Invalid logo or source marker');
await writeFile(new URL('./client.js', import.meta.url), source.replace(marker, `data:image/png;base64,${image.toString('base64')}`));
