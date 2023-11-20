import { Story } from "@/interfaces/story";

export const StoryMock = () => {
  const s:Story = {
    title: "AI in Modern Times",
    subtitle: "Influence of Artificial Intelligence in the Contemporary Age",
    paragraps: [
      "Artificial intelligence (AI), as a concept, has been a part of human consciousness since the advent of speculative fiction. However, it's only in recent times that AI has become a tangible and powerful phenomenon, widespread across various sectors and industries. From healthcare to entertainment, from transportation to communication, AI's presence is palpably felt and universally acknowledged.",
      "Today, AI is not just about robots and fancy gadgets. It's an all-encompassing technological wizardry that drives everything from predictive typing on our smartphones to complex weather forecasting models. The paramountcy of AI and its offshoots like machine learning, deep learning, and data science are transforming the modern world, instigating new advancements and insights.",
      "However, the rise of AI also poses important questions about data privacy, job automation, and ethical considerations. Areas like AI fairness and algorithmic bias are hotly debated topics. The challenge lies in harnessing the power of AI while maintaining a balance with human values, privacy, and respect for individual autonomy. Despite the challenges, AI's potential for shaping our future remains undeniable.",
    ],
  }

  return s
};
