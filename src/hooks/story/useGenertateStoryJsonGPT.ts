import { StoryMock } from "@/data/storymock";
import { Story } from "@/interfaces/story";
import { getStoryToRead } from "@/propmts/getStoryToRead";
import { dataJsonClean } from "@/utils/cleanDataandJsonParse";
import axios from "axios";
import { useState } from "react";


export const useGenertateStoryJsonGPT = () => {
  const [story, setStory] = useState<Story>(StoryMock);
  const [isLoadingGetStory, setIsLoadingGetStory] = useState(false);
  const [isErrorGetStory, setIsErrorGetStory] = useState(false);

  const getStory = async (topic: string) => {
    setIsLoadingGetStory(true);
    setIsErrorGetStory(false);

    try {
      const prompt = getStoryToRead({
        topic,
        language: "en",
        level:"B2"
      });
      const response = await axios.post("/api/gpt", { prompt });
      setStory(dataJsonClean(response.data.name));
    } catch (error) {
      console.error("Error fetching Storys:", error);
      setIsErrorGetStory(true);
    } finally {
      setIsLoadingGetStory(false);
    }
  };

  return {
    story,
    isLoadingGetStory,
    isErrorGetStory,

    getStory,
  };
};
