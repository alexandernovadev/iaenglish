import { GetPromt_StoryToRead } from "@/propmts/GetPromt_StoryToRead";
import { StoryActionTypes } from "@/redux/storyReducer/types";
import { askToChatGPT } from "@/services/gpt/askToChatGPT";
import { useDispatch } from "react-redux";

export const useStory = () => {
  const dispatch = useDispatch();

  const getStoryFromGPT = async (topic: string) => {
    dispatch({ type: StoryActionTypes.IS_LOADING, payload: true });
    dispatch({ type: StoryActionTypes.IS_ERROR, payload: "" });
    try {
      const promtRefined = GetPromt_StoryToRead({
        language: "en",
        level: "B2",
        topicUser: topic,
      });

      const response = await askToChatGPT(promtRefined);

      const payload = {
        ...response,
        status: "FAIL",
        times_seen: 1,
      };

      dispatch({ type: StoryActionTypes.ADD_STORY, payload });
    } catch (error: any) {
      dispatch({ type: StoryActionTypes.IS_ERROR, payload: error.message });
    } finally {
      dispatch({ type: StoryActionTypes.IS_LOADING, payload: false });
    }
  };

  const saveStoryToDb = () => {};
  const editStoryToDb = () => {};
  const removeStoryToDb = () => {};

  return { getStoryFromGPT, saveStoryToDb };
};
