import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { fileStructure, trashBin } from "../components/data";

const FolderTree = () => {
  const [structure, setStructure] = useState(fileStructure);
  const [trash, setTrash] = useState(trashBin);

  // Function to add a file/folder
  const addItem = (parentId, defaultName, type) => {
    const name = window.prompt(`Enter ${type} name:`, defaultName);
    if (!name) return; // Exit if the user cancels or enters an empty name
  
    const newItem = {
      id: uuidv4(),
      name,
      type,
      children: type === "folder" ? [] : undefined
    };
  
    const updateStructure = (items) =>
      items.map((item) => {
        if (item.id === parentId && item.type === "folder") {
          return { ...item, children: [...(item.children || []), newItem] };
        }
        if (item.children) {
          return { ...item, children: updateStructure(item.children) };
        }
        return item;
      });
  
    setStructure(updateStructure(structure));
  };
  

  // Function to move a file/folder to Trash
  const moveToTrash = (id, items) => {
    let deletedItem = null;

    const filteredItems = items.filter((item) => {
      if (item.id === id) {
        deletedItem = item;
        return false;
      }
      if (item.children) item.children = moveToTrash(id, item.children);
      return true;
    });

    if (deletedItem) setTrash([...trash, deletedItem]);

    return filteredItems;
  };

  const handleDelete = (id) => {
    setStructure(moveToTrash(id, structure));
  };

  // Function to restore an item from Trash
  const restoreItem = (id) => {
    const itemToRestore = trash.find((item) => item.id === id);
    if (!itemToRestore) return;

    setStructure([...structure, itemToRestore]);
    setTrash(trash.filter((item) => item.id !== id));
  };

  // Render folders and files
  const renderItems = (items) =>
    items.map((item) => (
      <div key={item.id} style={{ marginLeft: "20px" }}>
        <span>{item.type === "folder" ? "📁" : "📄"} {item.name}</span>
        <button onClick={() => handleDelete(item.id)}>🗑</button>
        {item.type === "folder" && (
          <>
            <button onClick={() => addItem(item.id, "New File", "file")}>📄+</button>
            <button onClick={() => addItem(item.id, "New Folder", "folder")}>📁+</button>
            {item.children && <div>{renderItems(item.children)}</div>}
          </>
        )}
      </div>
    ));
    const handlePermanentDelete = (id) => {
      const confirmDelete = window.confirm("Are you sure you want to permanently delete this file?");
      if (!confirmDelete) return; // If user cancels, do nothing
    
      setTrash(trash.filter((item) => item.id !== id));
    };
    

  // Render Trash Bin
  const renderTrash = () =>
    trash.map((item) => (
      <div key={item.id} style={{ marginLeft: "20px", color: "red" }}>
        🗑 {item.name}
        <button onClick={() => restoreItem(item.id)}>♻ Restore</button>
        <button onClick={() => handlePermanentDelete(item.id)}>❌ Permanently Delete</button>
      </div>
    ));
  
  return (
    <div>
      <h2>File Explorer</h2>
      {renderItems(structure)}

      <h2>Trash Bin</h2>
      {trash.length === 0 ? <p>Trash is empty</p> : renderTrash()}
    </div>
  );
};

export default FolderTree;
