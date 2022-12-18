import React from "react";
import { FiEdit } from "react-icons/fi";

interface Props extends React.ComponentPropsWithoutRef<"button"> {
  targetKey: string;
  handleEditToggle: (key: string) => void;
}

const EditButton: React.FunctionComponent<Props> = ({ handleEditToggle, targetKey }) => {
  return (
    <button type="button" onClick={() => handleEditToggle(targetKey)} className="mt-4 flex items-center justify-center space-x-2 rounded-lg bg-dark-2 p-3 transition-all hover:bg-dark-neutral">
      <FiEdit className="h-4 w-4" /> <span className="text-sm capitalize">Edit {targetKey}</span>
    </button>
  );
};

export default EditButton;
