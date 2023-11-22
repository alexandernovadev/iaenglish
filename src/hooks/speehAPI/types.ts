export interface SpeechConfig {
  recognitionLang?: string; // Idioma para el reconocimiento de voz
  interimResults?: boolean; // Si se deben mostrar resultados interinos
  continuous?: boolean; // Si el reconocimiento debe ser continuo
  maxAlternatives?: number; // Número máximo de alternativas de reconocimiento

  // Configuraciones para la síntesis de voz
  synthesisLang?: string; // Idioma para la síntesis de voz
  voiceName?: string; // Nombre de la voz a utilizar
  rate?: number; // Velocidad de la voz
  pitch?: number; // Tono de la voz
  volume?: number; // Volumen de la voz

}