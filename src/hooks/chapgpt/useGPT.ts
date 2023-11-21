import { askToChatGPT } from "@/services/gpt/askToChatGPT";
import { useDispatch } from "react-redux";

export const useGPT = () => {
  const dispatch = useDispatch();

  const getDataGPT = async (prompt:string) => {
    dispatch({ type: "IS_LOADING", payload: true });
    dispatch({ type: "IS_ERROR", payload: "" });

    try {

      
      const response = await askToChatGPT(prompt);
      dispatch({ type: "ADD_DATA", payload: response }); 
    } catch (error:any) {
      dispatch({ type: "IS_ERROR", payload: error.message });
    } finally {
      dispatch({ type: "IS_LOADING", payload: false });
    }
  };

  return { getDataGPT };
};
