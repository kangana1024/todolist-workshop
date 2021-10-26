import { createContext } from "react";

export type TodoSettingType = {
  version: {
    version?: number;
    setVersion?: React.Dispatch<React.SetStateAction<number>>
  },
  loading: {
    loading: boolean,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  }

};
const TodoSetting = createContext<TodoSettingType>({
  version: {
    version: 1,
    setVersion: () => { return; }
  },
  loading: {
    loading: false,
    setLoading: () => { return; },
  }
});

export const TodoSettingProvider = TodoSetting.Provider;

export default TodoSetting;