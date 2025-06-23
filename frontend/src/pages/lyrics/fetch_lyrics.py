import sys
import lyricsgenius
import argparse

# Function to fetch lyrics using Genius API
def fetch_lyrics(song_name, artist_name=None, genius_api_key=None):
    if not genius_api_key:
        return "Error: Genius API key is required."

    try:
   
        genius = lyricsgenius.Genius(
            genius_api_key,
            skip_non_songs=True,  
            excluded_terms=["(Remix)", "(Live)"], 
            remove_section_headers=True 
        )


        if artist_name:
            song = genius.search_song(song_name, artist_name)
        else:

            song = genius.search_song(song_name)


        if song and song.lyrics:
            return song.lyrics
        else:
            return "Lyrics not found for this song."

    except Exception as e:
        return f"Error fetching lyrics: {str(e)}"

def main():
    parser = argparse.ArgumentParser(description="Fetch song lyrics using Genius API.")
    parser.add_argument("song_name", type=str, help="Name of the song to fetch lyrics for.")
    parser.add_argument("--artist", type=str, help="Artist name (optional, for better accuracy).", default=None)
    parser.add_argument("--api-key", type=str, help="Genius API key.", required=True)

    args = parser.parse_args()

    lyrics = fetch_lyrics(args.song_name, args.artist, args.api_key)

    print(lyrics)

if __name__ == "__main__":
    main()