import { Story } from "@/interfaces/story";
import mongoose, { Document, Model, Schema, model } from "mongoose";

const StorySchema = new Schema<Story>(
  {
    title: String,
    subtitle: String,
    paragraphs: [String],
    img: String,
    times_seen: {
      type: Number,
      default: 0,
    },
    level: String,
    language: String,
    notes: String,
    topicUser:String
  },
  {
    timestamps: true,
  }
);

const StoryModel: Model<Story> =
  mongoose.models.Story || model("Story", StorySchema);

export { StoryModel };
