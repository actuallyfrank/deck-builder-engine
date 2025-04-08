import { Scene, SceneNode } from "core";
import { createContext, ReactNode, useContext, useState } from "react";

interface SceneContextType {
  sceneItems: SceneNode[];
  selectedItemId: string | undefined;
  selectedItem: SceneNode | null;
  selectItem: (id: string) => void;
  addItem: (item: SceneNode) => void;
  deleteItem: (id: string) => void;
  updateItem: (item: SceneNode) => void;
}

const SceneContext = createContext<SceneContextType | undefined>(undefined);

export interface SceneProviderProps {
  initialScene: Scene;
  children: ReactNode;
}

export const SceneProvider = ({
  initialScene,
  children,
}: SceneProviderProps) => {
  const [selectedItemId, setSelectedItemId] = useState<string | undefined>(
    undefined,
  );
  const [scene, setScene] = useState<Scene>(initialScene);

  const selectItem = (id: string) => {
    const item = scene.nodes.find((item) => item.id === id);
    if (!item) {
      throw new Error("Item not found");
    }

    setSelectedItemId(id);
  };

  const addItem = (item: SceneNode) => {
    setScene((prev) => ({
      nodes: [...prev.nodes, item],
    }));
  };

  const deleteItem = (id: string) => {
    setScene((prev) => ({
      nodes: prev.nodes.filter((item) => item.id !== id),
    }));
  };
  const updateItem = (SceneItem: SceneNode) => {
    const index = scene.nodes.findIndex((item) => item.id === SceneItem.id);
    if (index === -1) {
      throw new Error("Item not found");
    }

    const newItems = [...scene.nodes];
    newItems[index] = SceneItem;

    setScene((prev) => ({ ...prev, nodes: newItems }));
  };

  const value: SceneContextType = {
    sceneItems: scene.nodes,
    selectedItemId,
    selectedItem:
      scene.nodes.find((item) => item.id === selectedItemId) || null,
    selectItem,
    updateItem,
    addItem,
    deleteItem,
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
