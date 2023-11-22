import { typeWord } from "./../../interfaces/word";
import { Word } from "@/interfaces/word";
import mongoose, { Document, Model, Schema, model } from "mongoose";

const typeWordSchema = new Schema({
  name: String,
  sigle: String,
  description: String,
});

const wordSchema = new Schema<Word & Document>(
  {
    es: {
      word: String,
      definition: String,
    },
    pt: {
      word: String,
      definition: String,
    },
    word: {
      type: String,
      required: true,
    },
    ipa: {
      type: String,
      required: true,
    },
    type_word: {
      type: [typeWordSchema],
      required: true,
    },
    definition: String,
    examples: [String],
    times_seen: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["GOOD", "EASY", "HARD", "FAIL"],
      default: "FAIL",
    },
    img: String,
    note: String,
  },
  {
    timestamps: true,
  }
);

const WordModel: Model<Word> =
  mongoose.models.Word || model("Word", wordSchema);

export { WordModel };
