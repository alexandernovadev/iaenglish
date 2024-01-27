export const CustomGpt = async (prompt: string) => {
  try {
    const response = await fetch('http://localhost:1234/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages: [
          { role: 'system', content: `
            Genera un JSON para un examen de inglés nivel B2.
             Este examen debe SOLO evaluara las  áreas de gramática, comprensión de lectura y habilidades lingüísticas variadas.
             El examen debe estar completamente en inglés y debe ser similar en estilo a los exámenes TOEFL o IELTS.
             Por favor, incluye una variedad de preguntas que evalúen diferentes aspectos del inglés B2,
             como uso de tiempos verbales, comprensión de textos, vocabulario, y estructuras gramaticales complejas.
             // Las rta no se repeteiran y la complejidad del examen es ALTA
             
       
             
             La estructura del JSON es la siguiente:

            interface Question {
              id: string;
              type: single_choice | multiple_choice | true_false | open_text; // Se coherente con lo que das
              title: string;
              options?: string[];
              correct_answer?: string;
              explanation?: string;
            }
            
            interface TestComponentProps {
              questions: Question[];
            }

         
          ` },
          { role: 'user', content: prompt }
        ],
        temperature: 0.5,
        max_tokens: -1,
        stream: false,
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return JSON.parse(data.choices[0].message.content);
  } catch (error) {
    console.log(error);
    throw error; 
  }
};
