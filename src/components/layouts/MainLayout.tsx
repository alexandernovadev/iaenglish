import React, { useState } from "react";
import NextLink from "next/link";
import { FaBook, FaWindowRestore } from "react-icons/fa";
import { Modal } from "../molecules/Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { StoryActionTypes } from "@/redux/storyReducer/types";
import { RootState } from "@/redux/reducers";
import { IoSend } from "react-icons/io5";
import { IoIosHome } from "react-icons/io";
import { GrTest } from "react-icons/gr";

interface Props {
  children: JSX.Element | JSX.Element[];
}
export const MainLayout = ({ children }: Props) => {
  const [isModalListStories, setIsModalListStories] = useState(false);
  const dispatch = useDispatch();

  const { activeStory, isError, isLoad, selectedActivedWord, stories } =
    useSelector((state: RootState) => state.story);

  return (
    <>
      <div className="w-full h-screen bg-slate-800 text-white overflow-hidden">
        <div className="flex flex-col h-full overflow-auto ">
          <div className="flex bg-gradient-to-b from-slate-900 via-slate-800 opacity-9  0 to-transparent  ">
            <div className="flex gap-2 justify-between p-4 ">
              {window.location.pathname !== "/" && (
                <NextLink href="/" passHref>
                  <IoIosHome
                    style={{ fontSize: 36 }}
                    className="text-slate-100"
                  />
                </NextLink>
              )}

              <NextLink href="/exams" passHref>
                <GrTest style={{ fontSize: 32 }} />
              </NextLink>


              <NextLink href="/dictionary" passHref>
                <FaBook style={{ fontSize: 32 }} />
              </NextLink>


              <button
                onClick={() => setIsModalListStories(true)}
                className="flex"
              >
                <FaWindowRestore style={{ fontSize: 32 }} /> | {stories.length}
              </button>
            </div>
          </div>
          <div className="flex overflow-auto bg-slate-800 pb-16 h-full ">
            {children}
          </div>
        </div>
      </div>

      <Modal isOpen={isModalListStories} setIsOpen={setIsModalListStories}>
        <section className="w-full h-screen overflow-auto">
          {stories.map((story, id) => (
            <div
              key={`story-${id}.`}
              className="flex justify-between items-center p-2 bg-gray-800 rounded-lg mb-2"
            >
              <div>
                <h1 className="text-xl font-bold">{story.title}</h1>
                <h4 className="text-sm">{story.subtitle}</h4>
              </div>
              <div className="flex gap-2  pb-4">
                <button
                  onClick={() => {
                    dispatch({
                      type: StoryActionTypes.SET_ACTIVE_STORY,
                      payload: story,
                    });

                    setIsModalListStories(false);
                  }}
                  className="px-2 py-1 bg-blue-600 rounded hover:bg-blue-700 transition duration-300"
                >
                  <IoSend />
                </button>
              </div>
            </div>
          ))}
        </section>
      </Modal>
    </>
  );
};
