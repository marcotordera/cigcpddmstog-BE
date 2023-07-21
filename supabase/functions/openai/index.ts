import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey",
};

/**
    The Spectral Phantom:     A ghostly figure, condemned to wander the realm of the living, pursuing those who dare to cross its path with relentless determination.
    The Sinister Doll:        An eerie, possessed doll that comes to life, haunting and pursuing its unfortunate victims through the darkest corners of their nightmares.
    The Vengeful Spirit:      A tormented soul seeking revenge, appearing suddenly and ominously chasing anyone who disturbs its eternal rest.
    The Wraith:               An elusive and malevolent entity, shrouded in darkness, haunting its victims' footsteps and disappearing when they least expect it.
    The Lycanthrope:          A fearsome werewolf, driven by a primal urge to hunt under the full moon, relentlessly chasing those unfortunate enough to become its prey.
    The Cursed Child:         A young, innocent-looking child with a malevolent aura, pursuing unsuspecting victims with uncanny speed and agility.
    The Demented Clown:       A twisted and deranged clown, lurking in the shadows of the sinister carnival, chasing anyone who ventures into its nightmarish domain.
    The Mad Butcher:          A deranged and relentless killer, wielding a blood-stained cleaver, chasing victims through a labyrinth of gore and terror.
    The Haunted Puppeteer:    A mysterious figure controlling an army of possessed puppets, relentlessly chasing intruders into its macabre puppet theater.
    The Shadow Stalker:       An elusive and dark entity that lurks in the shadows, moving with supernatural speed to pursue those who catch its attention.
 */

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

const CHARACTERS = [
  "The Spectral Phantom:     A ghostly figure, condemned to wander the realm of the living, pursuing those who dare to cross its path with relentless determination.",
  "The Sinister Doll:        An eerie, possessed doll that comes to life, haunting and pursuing its unfortunate victims through the darkest corners of their nightmares.",
  "The Vengeful Spirit:      A tormented soul seeking revenge, appearing suddenly and ominously chasing anyone who disturbs its eternal rest.",
  "The Wraith:               An elusive and malevolent entity, shrouded in darkness, haunting its victims' footsteps and disappearing when they least expect it.",
  "The Lycanthrope:          A fearsome werewolf, driven by a primal urge to hunt under the full moon, relentlessly chasing those unfortunate enough to become its prey.",
  "The Cursed Child:         A young, innocent-looking child with a malevolent aura, pursuing unsuspecting victims with uncanny speed and agility.",
  "The Demented Clown:       A twisted and deranged clown, lurking in the shadows of the sinister carnival, chasing anyone who ventures into its nightmarish domain.",
  "The Mad Butcher:          A deranged and relentless killer, wielding a blood-stained cleaver, chasing victims through a labyrinth of gore and terror.",
  "The Haunted Puppeteer:    A mysterious figure controlling an army of possessed puppets, relentlessly chasing intruders into its macabre puppet theater.",
  "The Shadow Stalker:       An elusive and dark entity that lurks in the shadows, moving with supernatural speed to pursue those who catch its attention.",
];

serve(async (req) => {
  let { query } = await req.json();
  let character;
  if (!query) {
    character = CHARACTERS[getRandomInt(0, CHARACTERS.length)];
    query = character;
  }

  const completionConfig = {
    prompt: query,
  };

  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${Deno.env.get("OPENAI_API_KEY")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(completionConfig),
  });
  const data = await response.json();
  return new Response(JSON.stringify({ ...data, query, character }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
