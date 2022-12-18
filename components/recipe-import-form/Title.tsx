import clsx from "clsx";
import React from "react";
import { Plus } from "react-feather";
import { UseFormRegister } from "react-hook-form";

import { RootSchema } from "@/types";

import Input from "../ui/Form/Input";
import FieldWrapper from "./FieldWrapper";

interface Props extends React.ComponentPropsWithoutRef<"input"> {
  onEditFields: { [key: string]: boolean };
  handleDescriptionToggle: () => void;
  register: UseFormRegister<RootSchema>;
}

const Title: React.FunctionComponent<Props> = ({ onEditFields, handleDescriptionToggle, register }) => {
  return (
    <FieldWrapper aria-label="Title" className="mt-6">
      <div className="relative">
        <Input {...register("name")} className={clsx(onEditFields.description ? "w-[calc(100%-170px)]" : "w-[calc(100%-150px)]")} name="name" placeholder="Recipe Title" />
        <button
          onClick={handleDescriptionToggle}
          type="button"
          className="absolute right-1 -top-3 translate-y-1/2 rounded-md bg-dark-1 py-1.5 px-3 text-sm transition duration-200 ease-out hover:bg-[#7cd492cf] disabled:cursor-not-allowed disabled:hover:bg-[#3e3f41]"
        >
          <span className="flex items-center space-x-1">
            <Plus className="h-4 w-4" />
            <span>{onEditFields.description ? "Remove" : "Add"} Description</span>
          </span>
        </button>
      </div>
    </FieldWrapper>
  );
};

export default Title;
