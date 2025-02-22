import React from "react";
import FolderTree from "./components/FolderTree";

function App() {
  return (
    <div className="h-screen bg-gradient-to-r from-green-800 via-green-400 via-orange-300 to-orange-600 text-white p-6 flex">
      {/* Left Side - File Explorer */}
      <div className="w-2/3 bg-white text-black p-6 rounded-lg shadow-lg overflow-y-auto">
        <h1 className="text-4xl font-bold mb-6">File Explorer with Trash Bin</h1>
        <FolderTree />
      </div>
    </div>
  );
}

export default App;
