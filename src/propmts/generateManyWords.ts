import typewords from "../../public/typeword.json";

export const generateManyWords = (words: string[]) => {
  return `
  [
    {
      "es": {
        "word": "amando",
        "definition": "Expresión de la acción de amar, en forma continua o en progreso."
      },
      "pt": {
        "word": "amando",
        "definition": "Expressão da ação de amar, de forma contínua ou em progresso."
      },
      "word": "lovin'",
      "ipa": "/ˈlʌv.ɪn/",
      "type_word": [
        {
          "name": "Verb",
          "sigle": "v.",
          "description": "Words that express actions, states, or processes."
        },
        {
          "name": "Gerund",
          "sigle": "ger.",
          "description": "Verb forms ending in -ing that function as nouns."
        }
      ],
      "definition": "A casual or colloquial form of 'loving', often used in songs or informal speech.",
      "examples": [
        "She's lovin' the new job.",
        "I'm just lovin' this weather.",
        "They're lovin' every moment of their vacation.",
        "He keeps lovin' her despite everything.",
        "We're really lovin' this music."
      ],
      "times_seen": 1,
      "status": "FAIL"
    },
    {
      "es": {
        "word": "porque",
        "definition": "Expresión utilizada para introducir una razón o causa."
      },
      "pt": {
        "word": "porque",
        "definition": "Expressão usada para introduzir uma razão ou causa."
      },
      "word": "'cause",
      "ipa": "/kɔːz/",
      "type_word": [
        {
          "name": "Conjunction",
          "sigle": "conj.",
          "description": "Words that connect clauses, sentences, words, or phrases."
        }
      ],
      "definition": "Colloquial contraction of 'because', often used in informal speech or writing.",
      "examples": [
        "I left early 'cause I was tired.",
        "She didn't come 'cause she was sick.",
        "We're going out to eat 'cause it's late.",
        "I can't join you 'cause I have work.",
        "He's upset 'cause he lost the game."
      ],
      "times_seen": 1,
      "status": "FAIL"
    },
    {
      "es": {
        "word": "adecuado",
        "definition": "Correcto o apropiado en una situación dada; adecuado o apropiado."
      },
      "pt": {
        "word": "adequado",
        "definition": "Correto ou apropriado em uma situação dada; adequado ou apropriado."
      },
      "word": "proper",
      "ipa": "/ˈprɒpər/",
      "type_word": [
        {
          "name": "Adjective",
          "sigle": "adj.",
          "description": "Palabras que describen o modifican sustantivos."
        }
      ],
      "definition": "Correct or appropriate in a given situation; suitable or appropriate.",
      "examples": [
        "It's important to use proper grammar in formal writing.",
        "Wearing the proper attire is required for the event.",
        "He gave her a proper explanation for his actions.",
        "Proper planning is essential for the project's success.",
        "Following proper safety procedures is crucial."
      ],
      "times_seen": 1,
      "status": "FAIL"
    },
    {
      "es": {
        "word": "experiencia",
        "definition": "La acumulación de conocimiento, habilidades y vivencias a lo largo de la vida."
      },
      "pt": {
        "word": "experiência",
        "definition": "A acumulação de conhecimento, habilidades e vivências ao longo da vida."
      },
      "word": "experience",
      "ipa": "/ɪkˈspɪəriəns/",
      "type_word": [
        {
          "name": "Noun",
          "sigle": "n.",
          "description": "Palabras que nombran personas, animales, lugares, cosas, ideas o fenómenos."
        },
        {
          "name": "Verb",
          "sigle": "v.",
          "description": "Palabras que expresan acciones, estados o procesos."
        }
      ],
      "definition": "The accumulation of knowledge, skills, and life experiences over time.",
      "examples": [
        "Traveling is a great way to gain valuable experiences.",
        "She has years of experience in the field of medicine.",
        "Learning from one's experiences is important for personal growth.",
        "The job requires candidates to have relevant work experience.",
        "He wanted to experience new cultures and traditions."
      ],
      "times_seen": 1,
      "status": "FAIL"
    },
    {
      "es": {
        "word": "smooth",
        "definition": "Tener una superficie uniforme o sin asperezas; sin problemas o dificultades."
      },
      "pt": {
        "word": "suave",
        "definition": "Ter uma superfície uniforme ou sem irregularidades; sem problemas ou dificuldades."
      },
      "word": "smooth",
      "ipa": "/smuːð/",
      "type_word": [
        {
          "name": "Adjective",
          "sigle": "adj.",
          "description": "Palabras que describen o modifican sustantivos."
        },
        {
          "name": "Verb",
          "sigle": "v.",
          "description": "Palabras que expresan acciones, estados o procesos."
        }
      ],
      "definition": "Having a uniform or unblemished surface; without problems or difficulties.",
      "examples": [
        "The baby's skin was soft and smooth.",
        "They worked together to ensure a smooth transition.",
        "Her performance in the play was smooth and flawless.",
        "Smooth communication is key to a successful team.",
        "The car's engine ran smoothly without any issues."
      ],
      "times_seen": 1,
      "status": "FAIL"
    }
  ]
  
  
  
  GENERATE JSON (TU RTA SOLO TIENE QUE SER UN JSON) PARA LAS PALABARAs Siguientes: 

  ${JSON.stringify(words)}
  
  OJO con las mismas llaves que tienen todos,.SIGUE EL EJEMPLO
  
  es
   word - (LA PALABRA EN ESPAÑOL, LA TRADUCCION)
   definition - LA DEFINICION EN ESPAÑOL, LA TRADUCCION)
  pt
    word  -LA PALABRA EN PT LA TRADUCCION)
    definition - LA PALABRA EN PT LA TRADUCCION)
  word
  ipd
  type_word 
  definition
  examples [6 item always]
  times_seen 1
  status :"FAIL"
   

  1 AQUI ESTA LOS TYPES WORD DISPONIBLES(${JSON.stringify(typewords)})
  2 SOLO DAR el JSON y NADA MAS no comentarios, no sugurencias, NADA, SOLO EL JSON

  comienza con "${words[0]}" , ...
  
  
  `;
};
