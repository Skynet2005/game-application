import * as z from 'zod';

export const formSchema = z.object({ prompt: z.string().min(1, { message: 'Prompt is required.', }), });

export const placeholderSentences = [
  'An animated short of a robot discovering a hidden garden in a post-apocalyptic world.',
  'A fast-paced action sequence involving a car chase through a crowded city.',
  "A touching montage of a couple's journey from childhood friends to getting old together.",
  'A documentary-style footage of exotic creatures in an alien rainforest.',
  'A horror sequence in a haunted house with suspenseful build-ups and jump scares.',
  'A fantasy adventure showcasing a group of heroes battling a dragon in a mystical landscape.',
  'An epic historical battle sequence with armies clashing on a medieval battlefield.',
  'A romantic scene set under the Eiffel Tower in a beautiful Parisian evening.',
  'A superhero saving the day in a bustling metropolis, complete with stunning visual effects.',
  'A thrilling space adventure with a spaceship navigating through an asteroid belt.',
  'A comedic sequence of a clumsy chef trying to prepare a meal in a fancy restaurant.',
  'A magical transformation scene in a fairy tale setting, complete with glitter and sparkles.',
  'A serene sequence of the changing seasons in a peaceful forest.',
  'A futuristic cityscape with flying cars and towering skyscrapers.',
  'A tense standoff in a Wild West setting, complete with dramatic close-ups.',
  'A musical number in a Broadway style, with a full cast of dancers and a catchy tune.',
  'A noir-style detective scene in a dimly lit office with rain against the windows.',
  'A hilarious sequence of a cat trying to catch a laser pointer light.',
  'A slow-motion sequence of a ballet dancer performing against a sunset backdrop.',
  'An exciting treasure hunt in an ancient temple filled with traps and puzzles.',
  "A dreamy sequence of a child's bedroom turning into a star-filled galaxy.",
  'An underwater exploration with beautiful marine life in a vibrant coral reef.',
  'A time-lapse of a bustling city from day to night.',
  "A high-energy sports montage of a team's journey to winning a championship.",
  'A dramatic courtroom scene with a lawyer delivering a powerful closing argument.',
  'A fast-paced sequence of a rock band performing on stage in front of a cheering crowd.',
  'A high-stakes poker game in a glamorous casino with a surprise twist.',
  'A heartwarming scene of a family reunion during the holiday season.',
  'A suspenseful spy scene with a stealthy infiltration into a high-security facility.',
  'A cyberpunk-inspired scene of a hacker navigating through a virtual reality interface.',
  'A fantasy scene of wizards dueling with spectacular magical effects.',
  'A sci-fi scene of time travel, with the environment changing rapidly around the main character.',
  'A hilarious scene of a mime trying to escape from an imaginary box.',
  'A poignant scene of an astronaut looking at Earth from the moon.',
  'A dramatic slow-motion scene of a protagonist running in the rain.',
  'A beautiful sequence of a hot air balloon festival at sunrise.',
  'A romantic scene of a marriage proposal on a beautiful beach at sunset.',
  'A thrilling scene of a daring rescue mission on a snow-covered mountain.',
  'A time-travel sequence transitioning between different historical periods.',
  'A festive scene of a grand carnival parade with dancers and musicians.',
  'A serene sequence of a sunrise over a peaceful village.',
  'An exciting car race in a desert with lots of daring maneuvers.',
  'A humorous scene of a parrot causing mischief in a pet store.',
  'A heartwarming scene of a puppy being adopted and finding its new home.',
  'A martial arts sequence showcasing a variety of combat styles.',
  'A beautiful scene of cherry blossom trees in full bloom in Japan.',
  'A festive sequence of a bustling Christmas market in a snowy town.',
  'A dramatic sequence of a ship navigating through a stormy sea.',
  "A suspenseful scene of explorers discovering a hidden treasure in a pharaoh's tomb.",
  'A festive scene of a lively Mardi Gras parade in New Orleans.',
];