import { Types } from "../../types/actionsEnum";
import { MemoryState } from "../../types/memory";
import { MemoryActions } from "../../types/memoryReducer";

export const MemoryReducer: React.Reducer<MemoryState, MemoryActions> = (
  state,
  action
) => {
  switch (action.type) {
    case Types.setMemoryOptions:
      return { ...state, memoryOptions: action.payload };
    case Types.setPlaying:
      return { ...state, playing: action.payload };
  }
};
