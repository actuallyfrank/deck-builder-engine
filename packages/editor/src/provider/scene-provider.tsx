import { SceneItem } from "core";
import { createContext, ReactNode, useContext, useState } from "react";

interface SceneContextType {
  sceneItems: SceneItem[];
  selectedItemId: string | undefined;
  selectedItem: SceneItem | null;
  selectItem: (id: string) => void;
  updateItem: (item: SceneItem) => void;
}

const SceneContext = createContext<SceneContextType | undefined>(undefined);

export interface SceneProviderProps {
  sceneItems: SceneItem[];
  children: ReactNode;
}

export const SceneProvider = ({ sceneItems, children }: SceneProviderProps) => {
  const [selectedItemId, setSelectedItemId] = useState<string | undefined>(
    undefined,
  );
  const [allItems, setAllItems] = useState<SceneItem[]>(sceneItems);

  const selectItem = (id: string) => {
    const item = sceneItems.find((item) => item.id === id);
    if (!item) {
      throw new Error("Item not found");
    }

    setSelectedItemId(id);
  };

  const updateItem = (SceneItem: SceneItem) => {
    const index = allItems.findIndex((item) => item.id === SceneItem.id);
    if (index === -1) {
      throw new Error("Item not found");
    }

    const newItems = [...allItems];
    newItems[index] = SceneItem;

    setAllItems(newItems);
  };

  const value: SceneContextType = {
    sceneItems: allItems,
    selectedItemId,
    selectedItem: allItems.find((item) => item.id === selectedItemId) || null,
    selectItem,
    updateItem,
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
