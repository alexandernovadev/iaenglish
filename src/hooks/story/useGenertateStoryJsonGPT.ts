import { StoryMock } from "@/data/storymock";
import { Story } from "@/interfaces/story";
import { getStoryToRead } from "@/propmts/getStoryToRead";
import { dataJsonClean } from "@/utils/cleanDataandJsonParse";
import axios from "axios";
import { useEffect, useState } from "react";

export const useGenertateStoryJsonGPT = () => {
  const [story, setStory] = useState<Story>(StoryMock);
  const [isLoadingGetStory, setIsLoadingGetStory] = useState(false);
  const [isErrorGetStory, setIsErrorGetStory] = useState(false);

  useEffect(() => {
    const lastStory = localStorage.getItem("laststory");
    if (lastStory) {
      setStory(JSON.parse(lastStory));
    }
  }, []);

  const getStory = async () => {
    setIsLoadingGetStory(true);
    setIsErrorGetStory(false);

    console.log("Y al stery", story);

    try {
      const prompt = getStoryToRead(story);
      const response = await axios.post("/api/gpt", { prompt });
      const newData  = dataJsonClean(response.data.name);

      setStory((s) => ({
        ...s,
        title: newData.title,
        subtitle: newData.ssubtitle,
        paragraphs: newData.paragraphs,
      }));
      console.log(story);
      console.log(response);
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
    setStory,
  };
};
