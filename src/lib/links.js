/** YouTube form-video search for an exercise name. */
export function youtubeSearch(name) {
  const base = String(name)
    .split(/\s+—\s+|\s+\/\s+|\s+or\s+/i)[0]
    .trim();

  return `https://www.youtube.com/results?search_query=${encodeURIComponent(`${base} form`)}`;
}
