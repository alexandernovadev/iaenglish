import { useGPT } from "@/hooks/chapgpt/useGPT";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

export default function Home() {
  const { data,isLoading, getDataGPT } = useGPT();

  const stories = useSelector(state => state);
  const dispatch = useDispatch();


  console.log("elr reduc es",stories);
  
  return (
    <div className="text-white">
      Hello wolrd
      <button onClick={getDataGPT}>CLICK</button>
      {isLoading && <AiOutlineLoading3Quarters />}
      <pre>
        <code>
          {/* @ts-ignore */}
          <SyntaxHighlighter language="javascript">
            {data}
          </SyntaxHighlighter>
        </code>
      </pre>
    </div>
  );
}
