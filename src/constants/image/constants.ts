// src/constants/image/constants.ts
import * as z from 'zod';

export const formSchema = z.object({
  prompt: z.string().min(1, { message: 'Photo prompt is required', }),
  amount: z.string().min(1),
  resolution: z.string().min(1),
});

export const ModelOptions = [
  { value: 'pose', label: 'Pose' },
  { value: 'sketch', label: 'sketch' },
  { value: 'canny', label: 'Canny' },
  { value: 'depth', label: 'Depth' },
  { value: 'hed', label: 'Hed' },
  { value: 'hough', label: 'Hough' },
  { value: 'normal', label: 'Normal' },
  { value: 'seg', label: 'Seg' },
];

export const amountOptions = [
  { value: 1, label: '1 Photo' },
  { value: 2, label: '2 Photos' },
  { value: 3, label: '3 Photos' },
  { value: 4, label: '4 Photos' },
];

export const bgColorOptions = [
  { value: 'white', label: 'White' },
  { value: 'black', label: 'Black' },
  { value: 'red', label: 'Red' },
  { value: 'green', label: 'Green' },
  { value: 'blue', label: 'Blue' },
  { value: 'cyan', label: 'Cyan' },
  { value: 'yellow', label: 'Yellow' },
  { value: 'orange', label: 'Orange' },
];

export const colorOptions = [
  { value: 'black', label: 'Black' },
  { value: 'red', label: 'Red' },
  { value: 'green', label: 'Green' },
  { value: 'blue', label: 'Blue' },
  { value: 'cyan', label: 'Cyan' },
  { value: 'yellow', label: 'Yellow' },
  { value: 'orange', label: 'Orange' },
  { value: 'white', label: 'Eraser' },
];

export const strokeWidthOptions = [
  { value: 4, label: 'Stroke Width 4px' },
  { value: 1, label: 'Stroke Width 1px' },
  { value: 2, label: 'Stroke Width 2px' },
  { value: 3, label: 'Stroke Width 3px' },
  { value: 5, label: 'Stroke Width 5px' },
  { value: 6, label: 'Stroke Width 6px' },
  { value: 7, label: 'Stroke Width 7px' },
];

// TODO: implement DrawingModeOptions
export const drawingModeOptions = [
  { value: 'FreeHand', label: 'FreeHand' },
  { value: 'Line', label: 'Line' },
  { value: 'Rectangle', label: 'Rectangle' },
  { value: 'Circle', label: 'Circle' },
];

export const placeholderSuggestions = [
  'A futuristic cityscape at dusk with neon lights reflecting on a calm river.',
  'A dense forest with ancient ruins overtaken by vines and foliage.',
  'An astronaut floating in space, with a vibrant galaxy in the background.',
  'A massive waterfall cascading over a cliff, with a rainbow in the mist.',
  'A steampunk-inspired train station bustling with humanoid robots.',
  'A medieval castle perched on a snowy mountain peak, with dragons circling above.',
  'A bustling underwater city populated by merpeople and exotic sea creatures.',
  'A Victorian mansion in the midst of an autumn forest.',
  'An arid desert landscape with a high-tech oasis city in the distance.',
  'A colossal library with shelves stretching into the clouds, and flying books.',
  'An ancient Greek city with philosophers and mythical creatures.',
  'A dystopian, post-apocalyptic cityscape reclaimed by nature.',
  'A serene Japanese garden with cherry blossom trees and a koi pond.',
  'A bustling market scene in an alien city on a distant planet.',
  'A hidden pirate cove with treasure chests and a pirate ship.',
  'A magical forest with giant mushrooms and fairies flying around.',
  'A cyborg playing an ancient musical instrument in a futuristic jazz club.',
  'An underwater volcanic eruption with a diverse array of marine life observing.',
  'A secret garden door at the end of a cobblestone path in a lush English garden.',
  'A surreal landscape with floating islands and waterfalls in the sky.',
  'A sunken ship at the ocean floor, explored by a team of adventurous dolphins.',
  'A robot chef preparing a gourmet meal in a high-tech kitchen.',
  'A grand ballroom in a palace, filled with masked figures dancing.',
  'A mountain range with faces carved into the cliffs, like a natural Mount Rushmore.',
  'A vast savannah with herds of exotic, mythical creatures grazing peacefully.',
  "A child's bedroom that turns into a jungle at night with stuffed animals coming to life.",
  'A floating city in the clouds, held aloft by giant airships.',
  'A Martian colony with greenhouses, rovers, and astronauts.',
  "A magical blacksmith's workshop with enchanted weapons and armors.",
  'A rainforest with tree houses connected by rope bridges.',
  'A lighthouse on a cliff, casting light across a stormy sea.',
  'A luxury spaceship cruising through an asteroid belt.',
  "A sorcerer's study filled with spell books, a crystal ball, and potions.",
  'A giant termite mound in an alien desert, glowing under a setting sun.',
  'An intricate maze made of hedges in a royal garden.',
  'A grand cathedral in a gothic style, lit up under a full moon.',
  'A towering beanstalk reaching up into the clouds from a small farm.',
  'An alien jungle with bioluminescent plants and giant insects.',
  'A mystical shrine at the peak of a mountain, guarded by stone statues.',
  'A bustling scene of a Renaissance fair, complete with jesters, knights, and royals.',
  'An ancient Egyptian tomb filled with hieroglyphics and golden artifacts.',
  'A digital landscape inside a computer, with data streams and firewalls.',
  'A wild west town with cowboys and aliens cohabiting.',
  'A hidden bay in the Caribbean, with pirate ships and a bustling port town.',
  'A microcosmic city inside a snow globe.',
  'An Art Deco style city with vintage cars and flapper fashion.',
  "A haunted forest with a witch's cottage nestled between gnarled trees.",
  'A modern city skyline but with buildings designed in the shape of musical instruments.',
  'A royal procession in a kingdom of sentient animals.',
  'A secret garden in the middle of a bustling city, accessible only through a magical portal.',
];
