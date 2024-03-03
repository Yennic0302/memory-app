import { Types } from "./actionsEnum";
import { MemoryOptions } from "./memory";

type ActionMap<M extends { [index: string]: unknown }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

type MemoryPayload = {
  [Types.setMemoryOptions]: MemoryOptions;
};

export type MemoryActions =
  ActionMap<MemoryPayload>[keyof ActionMap<MemoryPayload>];
