import * as z from 'zod';

export const formSchema = z.object({ prompt: z.string().min(1, { message: 'Music prompt is required', }), });

export const placeholderSentences = [
  "A symphony inspired by a summer's day, with movements reflecting dawn, midday, sunset, and night.",
  'An energetic pop song with a catchy chorus, perfect for a road trip.',
  'A calming piano solo inspired by raindrops falling on a windowpane.',
  'A fast-paced electronic dance track designed to energize a crowd at a music festival.',
  'A jazz piece with complex improvisation, reminiscent of a busy New York City street.',
  'A country song telling a heartwarming story of a small-town life.',
  'A classical guitar piece inspired by Spanish Flamenco music.',
  'A hauntingly beautiful choral piece that makes use of harmonies and dissonance.',
  'A reggae track that incorporates traditional Caribbean rhythms and a feel-good melody.',
  'A blues song that tells a story of heartbreak and redemption, featuring a soulful guitar solo.',
  'A lo-fi hip hop track suitable for relaxing or studying, with a smooth beat and chill vibes.',
  'A rock anthem inspired by the 80s hair bands, complete with powerful guitar riffs and a memorable hook.',
  'A romantic ballad with heartfelt lyrics and a soaring melody.',
  'An orchestral score for an epic fantasy film, with themes for different characters and moments of tension and release.',
  'An upbeat samba track that captures the spirit of a Brazilian carnival.',
  'A piece of meditation music with gentle waves, bird sounds, and soft, ambient instrumentation.',
  'A punk rock song with aggressive guitar riffs, a fast tempo, and rebellious lyrics.',
  "A children's song with a catchy, repetitive melody and lyrics about friendship.",
  'A cinematic piece for a thriller movie, using dissonant chords and abrupt changes in dynamics to create suspense.',
  'A techno track that captures the energy of a bustling city at night.',
  'A R&B love song with smooth vocals, a groovy bass line, and sensual lyrics.',
  'A folk song that tells a story about a legendary hero, featuring acoustic instruments.',
  'A disco track with funky basslines, a driving beat, and vibrant string sections.',
  'An atmospheric ambient track that conjures images of outer space.',
  'A heavy metal track with thunderous drums, powerful guitar riffs, and a screaming vocal line.',
  'A nostalgic 90s pop track with a danceable beat and a memorable melody line.',
  'A bossa nova song that captures the relaxed vibe of a beach in Rio de Janeiro.',
  'A gospel track with a large choir, powerful vocals, and uplifting lyrics.',
  'A futuristic synthwave track that evokes an 80s aesthetic and a sense of adventure.',
  'A grunge rock song with angsty lyrics and a raw, distorted guitar sound.',
  'A Celtic piece that uses traditional instruments like the tin whistle and bodhrán drum.',
  'A minimalist composition featuring a repetitive piano motif and subtle string accompaniment.',
  'An opera aria that conveys a deep sense of longing and passion.',
  'A bhangra track that fuses traditional Punjabi music with modern pop elements.',
  'A Latin pop song that makes use of lively percussion and brass sections.',
  'A smooth jazz piece that evokes a late-night lounge, featuring a sultry saxophone solo.',
  'A baroque piece for harpsichord, capturing the ornate and intricate style of the era.',
  'A trap song with heavy bass, hi-hat rolls, and catchy, auto-tuned vocals.',
  'A holiday song that captures the joy and spirit of the Christmas season.',
  'A psychedelic rock track with a hypnotic melody and experimental sound effects.',
  'A ska song that combines elements of Caribbean music with punk rock, featuring upbeat horns and a driving rhythm section.',
  'A new age track that uses synthesizers to create a calming, ethereal atmosphere.',
  'A bluegrass tune featuring banjo, fiddle, and lyrics about rural life.',
  'A funk song with a groovy bass line, tight rhythm section, and a call-and-response vocal pattern.',
  'A military march for a brass band, capturing a sense of discipline and pride.',
  'A chillwave track that combines lo-fi elements with electronic beats and dreamy synths.',
  'A power ballad with emotional lyrics, a soaring chorus, and a climactic guitar solo.',
  'A doo-wop song reminiscent of the 50s and 60s, featuring tight harmonies and simple, catchy lyrics.',
  'A dubstep track with wobble bass, syncopated rhythms, and a drop that gets the crowd moving.',
  'A ragtime piano piece that captures the joy and energy of the early 20th century.',
];
