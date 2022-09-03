import {projects} from './showcase.json';

export const cards = projects.map(x => x.card);
export const descriptions = projects.map(x => x.description);
