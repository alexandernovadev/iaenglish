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

  const getStory = async () => {
    
    setIsLoadingGetStory(true);
    setIsErrorGetStory(false);

    console.log("Y al stery", story);
    
    try {
      const prompt = getStoryToRead(story);
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
    setStory
  };
};
