export const promt__getWordToDictonaryJson = (inputWord: string) => {
  return `
  Generar un JSON para la palabra '${inputWord}' con las siguientes claves:

   'word'(la palabra en inglés), 'es' (un objeto con la palabra en español y su definición),
   'pt' (un objeto con la palabra en portugues y su definición), 
   'ipa' (la pronunciación en IPA), 'type_word' (tipo de palabra, como sustantivo, verbo, etc.), 
   'definition' (definición en inglés), y 'examples' (una lista de ejemplos de uso). 

  Asegúrate de que todas estas claves estén presentes en la respuesta.fill this with "${inputWord}" como rererencias

  example with "Step away": 

    {
      "es": {
          "word": "Alejarse",
          "definition": "Moverse o distanciarse de algo o alguien, especialmente para crear espacio o dejar de participar en una situación."
      },
      "pt":{
        "word": "Afastar-se",
        "definition": "Mover-se ou distanciar-se de algo ou alguém, especialmente para criar espaço ou deixar de participar em uma situação."
      },
      "word": "Step away",
      "ipa": "/stɛp əˈweɪ/",
      "type_word": "p. v. ",
      "definition": "To move or distance oneself from something or someone, especially to create space or to cease involvement in a situation.",
      "examples": [
          "When arguments get heated, it's better to step away and take a moment to cool off.",
          "The team decided to step away from that project to focus on other priorities.",
          "Step away from the edge of the cliff; it's dangerous to be so close.",
          "It's important to learn to step away from toxic situations in life.",
          "If you feel the pressure is too much, don't hesitate to step away and seek support."
      ]
  }
  `;
};
