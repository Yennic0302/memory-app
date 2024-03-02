import { Category, Difficulty } from "./memoryEnums";

export type Time = 30 | 45 | 60;

export interface MemoryOptions {
  difficulty: Difficulty;
  time: Time;
  category: Category;
}

export interface MemoryState {
  playing: boolean;
  memoryOptions: MemoryOptions;
}
