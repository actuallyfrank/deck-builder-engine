import { SceneItem } from "core";
import { createContext, ReactNode, useContext, useState } from "react";

interface SceneContextType {
  sceneItems: SceneItem[];
  selectedItemId: string | null;
  selectedItem: SceneItem | null;
  selectItem: (id: string) => void;
}

const SceneContext = createContext<SceneContextType | undefined>(undefined);

export interface SceneProviderProps {
  sceneItems: SceneItem[];
  children: ReactNode;
}

export const SceneProvider = ({ sceneItems, children }: SceneProviderProps) => {
  const [selectedItem, setSelectedItem] = useState<SceneItem | null>(null);

  const selectItem = (id: string) => {
    const item = sceneItems.find((item) => item.id === id);
    if (item) {
      setSelectedItem(item);
    }

    throw new Error("Item not found");
  };

  const value: SceneContextType = {
    sceneItems,
    selectedItemId: selectedItem?.id || null,
    selectedItem,
    selectItem,
  };

  return (
    <SceneContext.Provider value={value}>{children}</SceneContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useScene = () => {
  const context = useContext(SceneContext);

  if (!context) {
    throw new Error("useScene must be used within a SceneProvider");
  }

  return context;
};
