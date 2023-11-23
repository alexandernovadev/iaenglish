import { Word } from "@/interfaces/word";
import { connect, disconnect } from "@/mongo";
import { WordModel } from "@/mongo/models/Word";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connect(); // Establecer conexión con MongoDB

  const { method } = req;

  try {
    switch (method) {
      case "GET":
        // Buscar los repetidos con
        /**
         * {
  _id: "$word",
  count: {
    $sum: 1,
  },
}

         
        const repeatedWords = await WordModel.aggregate([
          {
            $group: {
              _id: "$word", // Agrupar por la palabra
              count: { $sum: 1 }, // Contar apariciones
            },
          },
          {
            $match: {
              count: { $gt: 1 }, // Filtrar solo las palabras que aparecen más de una vez
            },
          },
          {
            $sort: { count: -1 }, // Opcional: ordenar por las más repetidas primero
          },
        ]);
        console.log(repeatedWords);
        
      
        for (const wordObj of repeatedWords) {
          const wordInstances = await WordModel.find({ word: wordObj._id });
  
          // Si hay más de una instancia, elimina todas excepto la primera
          for (let i = 1; i < wordInstances.length; i++) {
              await WordModel.deleteOne({ _id: wordInstances[i]._id });
          }
      }
      
        res.status(200).json({repeatedWords, r:repeatedWords.length});

      */



const words = [
   
  "be", "am", "is", "are", "was", "were", "been", "being",
  "have", "has", "had", "having",
  "do", "does", "did", "doing",
  "say", "says", "said", "saying",
  "get", "gets", "got", "getting",
  "make", "makes", "made", "making",
  "go", "goes", "went", "going", "gone",
  "know", "knows", "knew", "knowing", "known",
  "take", "takes", "took", "taking", "taken",
  "see", "sees", "saw", "seeing", "seen",
  "come", "comes", "came", "coming",
  "think", "thinks", "thought", "thinking",
  "look", "looks", "looked", "looking",
  "want", "wants", "wanted", "wanting",
  "give", "gives", "gave", "giving", "given",
  "use", "uses", "used", "using",
  "find", "finds", "found", "finding",
  "tell", "tells", "told", "telling",
  "ask", "asks", "asked", "asking",
  "work", "works", "worked", "working",
  "play", "plays", "played", "playing",
  "run", "runs", "ran", "running",
  "move", "moves", "moved", "moving",
  "live", "lives", "lived", "living",
  "believe", "believes", "believed", "believing",
  "bring", "brings", "brought", "bringing",
  "happen", "happens", "happened", "happening",
  "write", "writes", "wrote", "writing", "written",
  "provide", "provides", "provided", "providing",
  "sit", "sits", "sat", "sitting",
  "stand", "stands", "stood", "standing",
  "lose", "loses", "lost", "losing",
  "pay", "pays", "paid", "paying",
  "meet", "meets", "met", "meeting",
  "include", "includes", "included", "including",
  "continue", "continues", "continued", "continuing",
  "set", "sets", "setting",
  "learn", "learns", "learned", "learnt", "learning",
  "change", "changes", "changed", "changing",
  "lead", "leads", "led", "leading",
  "understand", "understands", "understood", "understanding",
  "watch", "watches", "watched", "watching",
  "follow", "follows", "followed", "following",
  "stop", "stops", "stopped", "stopping",
  "create", "creates", "created", "creating",
  "speak", "speaks", "spoke", "speaking", "spoken",
  "read", "reads", "read", "reading", 
  "allow", "allows", "allowed", "allowing",
  "add", "adds", "added", "adding",
  "spend", "spends", "spent", "spending",
  "grow", "grows", "grew", "growing", "grown",
  "open", "opens", "opened", "opening",
  "walk", "walks", "walked", "walking",
  "win", "wins", "won", "winning",
  "offer", "offers", "offered", "offering",
  "remember", "remembers", "remembered", "remembering",
  "love", "loves", "loved", "loving",
  "consider", "considers", "considered", "considering",
  "appear", "appears", "appeared", "appearing",
  "buy", "buys", "bought", "buying",
  "wait", "waits", "waited", "waiting",
  "serve", "serves", "served", "serving",
  "die", "dies", "died", "dying",
  "send", "sends", "sent", "sending"]

  // Buscar en mongo Word.word esa lista comparar con la lista de arriba
  // Las palabras que no estén en mongo, agregarlas a un array y devolverlas como respuesta
  const wordsInMongo = await WordModel.find({}).select("word");
  const wordsInMongoArray = wordsInMongo.map((word) => word.word);
  const wordsNotInMongo = words.filter(
    (word) => !wordsInMongoArray.includes(word)
  );
  res.status(200).json(wordsNotInMongo);
        break;

      case "POST":
        const newWord: Word = req.body;
        const word = await WordModel.create(newWord);
        res.status(201).json(word);
        break;

      case "PUT":
        const { id } = req.query;
        const updatedWord: Word = req.body;
        const updated = await WordModel.findByIdAndUpdate(id, updatedWord, {
          new: true,
        });
        res.status(200).json(updated);
        break;

      case "DELETE":
        const { id: deleteId } = req.query;
        await WordModel.findByIdAndRemove(deleteId);
        res.status(204).send("Palabra eliminada correctamente.");
        break;

      default:
        res.status(405).json({ error: "Método no permitido." });
        break;
    }
  } catch (error: any) {
    res.status(500).json({ error: "Error en el servidor: " + error.message });
  } finally {
    await disconnect(); // Cerrar conexión con MongoDB
  }
}
