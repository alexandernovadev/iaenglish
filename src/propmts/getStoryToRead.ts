export interface Config {
  level?: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  topic: string;
  language?: "es" | "en" | "pt";
}

export const getStoryToRead = ({
  level = "B2",
  topic = "The IA in Modern AGES",
  language="en"
}: Config) => {
  return `
  Generar un JSON with a story about ${topic} with level ${level} of english all story in language "/${language}/"
  , your RTA must be related to topic and
  con las siguientes claves:

  'title': maximos 16 char,
  'subtitle' un subtile con max 40 char
  'paragraps'un array con 3 parrafos de maximo 410 caratersies cadao uno

    example:
    {
      "title": "The Roman Civilization",
      "subtitle": "An Epoch of Unprecedented Expansion, Cultural Flourishing, and Enduring Influence on the Modern World",
      "paragraps":["The Roman Empire, a colossal entity in human history, emerged from a small city-state in central 
      Italy. Its origins, steeped in myth and reality, date back to 753 BCE. 
      Over centuries, Rome's influence expanded, driven by military might,
       shrewd politics, and a knack for assimilating diverse cultures. 
       This expansion laid the groundwork for a sophisticated society that would profoundly impact the world",
       "At its zenith, Rome's dominion stretched from the rain-soaked hills of Britain to the sun-baked sands of Egypt, 
       encompassing diverse peoples and customs. Roman law, architecture, and roads were marvels of their time,
        facilitating trade and communication across vast distances. Latin, Rome's language,
         and its literature shaped the linguistic and cultural foundations of Western civilization","
         The fall of Rome in 476 CE marked the end of an era, but its legacy endures. Roman contributions to law,
          government, engineering, and the arts continue to influence modern society. The remnants of 
          its grandeur, seen in ruins and artifacts, testify to a civilization that, for centuries, 
          was the epicenter of human achievement and a beacon of cultural and political might
         "]
    }

  `;
};