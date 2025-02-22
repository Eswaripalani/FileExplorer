import { v4 as uuidv4 } from "uuid";

const fileStructure = [
  {
    id: uuidv4(),
    name: "Documents",
    type: "folder",
    children: [
      { id: uuidv4(), name: "Resume.pdf", type: "file" },
      { id: uuidv4(), name: "CoverLetter.docx", type: "file" }
    ]
  },
  {
    id: uuidv4(),
    name: "Projects",
    type: "folder",
    children: [
      { id: uuidv4(), name: "Portfolio", type: "folder", children: [] }
    ]
  }
];

const trashBin = []; // Empty array for storing deleted items

export { fileStructure, trashBin };
