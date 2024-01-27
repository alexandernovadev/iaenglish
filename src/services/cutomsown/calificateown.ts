export const Calificate = async (questions: string, userAnswers: string) => {
  try {
    const response = await fetch("http://localhost:1234/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content: `
              Genera un JSON que califique 
              mira las question ${questions} 
              
              con la estructura

              [{
                "id": "string", // debe coincidir con el id de la question
                "calification": "string" // Lo mas detallado, de por qué está o por qué está bien, min 300 caracteres
              }], es un array por cada pregunta
            `,
          },
          { role: "user", content: `Mira mis rta de user ${userAnswers}` },
        ],
        temperature: 0.4,
        max_tokens: -1,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    // console.log(data);
    // return data
    return JSON.parse(data.choices[0].message.content);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
