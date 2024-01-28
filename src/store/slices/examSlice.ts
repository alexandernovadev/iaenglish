import { Exam } from "@/interfaces/Exam";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Assuming your interfaces are defined in another file, import them:

// Define the initial state for the slice
interface ExamsState {
  exams: Exam[];
}

const initialState: ExamsState = {
  exams: [],
};

// Create the slice
const examsSlice = createSlice({
  name: "exams",
  initialState,
  reducers: {
    // Reducer to add a new exam
    addExam: (state, action: PayloadAction<Exam>) => {
      state.exams.push(action.payload);
    },
    // Reducer to update an exam by id
    updateExam: (state, action: PayloadAction<Exam>) => {
      const index = state.exams.findIndex(
        (exam) => exam.id === action.payload.id
      );
      if (index !== -1) {
        state.exams[index] = action.payload;
      }
    },
    // Reducer to remove an exam by id
    removeExam: (state, action: PayloadAction<string>) => {
      state.exams = state.exams.filter((exam) => exam.id !== action.payload);
    },

  },
});

// Export actions
export const { addExam, updateExam, removeExam } = examsSlice.actions;

// Export reducer
export default examsSlice.reducer;
