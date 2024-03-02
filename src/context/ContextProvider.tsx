import React, { createContext, useReducer } from "react";
import { MemoryState } from "../../types/memory";
import { Category, Difficulty } from "../../types/memoryEnums";
import { MemoryActions } from "../../types/memoryReducer";
import { MemoryReducer } from "./reducer";

const defaultValues: MemoryState = {
  playing: false,
  memoryOptions: {
    difficulty: Difficulty.EASY,
    time: 30,
    category: Category.ANIME,
  },
};

export const MemoryContext = createContext<
  [state: MemoryState, dispatch: React.Dispatch<MemoryActions>]
>([defaultValues, () => null]);

export default function ContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [memoryState, dispatch] = useReducer(MemoryReducer, defaultValues);

  return (
    <MemoryContext.Provider value={[memoryState, dispatch]}>
      {children}
    </MemoryContext.Provider>
  );
}
