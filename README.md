# The core of this app should be the REDUX
 WORD 
  words
  activeWord
  selectedUserWord
  isLoad
  isError

Story
  stories
  activeStory
  isLoad
  isError

Speech
 lang : string
 voice : string
 config :{}
 isListening: boolean
 userSpeeh: string

Lyric
  lyrics
  active_lyric
  isLoad
  isError


todas las words que tengan un espacio en blanco, o almento dos palabras
{"$or": [{"word": {"$regex": "\\s"}}, {"word": {"$regex": "\\s+\\w+\\s"}}]}




Generate an array that containing all variations of the word 'fleet'


