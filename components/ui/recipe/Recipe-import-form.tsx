import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { FiCornerDownLeft, FiSearch } from "react-icons/fi";

import LoadingDots from "../Loading-dots/LoadingDots";

type Props = {
  handleSubmitForm: (event: React.FormEvent) => Promise<void>;
  setValue: (value: React.SetStateAction<string>) => void;
  value?: string;
  isRequested: boolean;
  placeHolder?: string;
  wfull?: boolean;
  register?: UseFormRegister<FieldValues>;
};

const RecipeImportForm: React.FunctionComponent<Props> = ({ handleSubmitForm, setValue, value, isRequested, wfull = false, placeHolder = "Paste the URL of a recipe" }) => {
  return (
    <form onSubmit={handleSubmitForm} className={`relative top-0 h-12 rounded-lg bg-dark-neutral shadow-md lg:shadow-none ${wfull ? "w-full" : "w-full lg:w-[350px]"}`}>
      <label htmlFor="urlKeyword" aria-label="urlKeyword">
        <FiSearch className="absolute left-5 top-1/2 hidden h-4 w-4 -translate-y-1/2 md:block" />
      </label>
      <input
        type="text"
        onChange={(event: React.FormEvent<HTMLInputElement>) => setValue(event.currentTarget.value)}
        id="urlKeyword"
        autoComplete="off"
        value={value || ""}
        className="h-full w-[calc(100%-75px)] rounded-lg bg-transparent pl-4 text-sm focus:outline-none md:pl-12"
        placeholder={placeHolder}
      />
      <button
        type="submit"
        id="submitUrl"
        className="absolute right-1 top-1/2 -translate-y-1/2 rounded-lg bg-[#3e3f41] py-2.5 px-6 text-sm transition duration-200 ease-out hover:bg-[#7cd492cf] disabled:cursor-not-allowed disabled:hover:bg-[#3e3f41]"
        disabled={!value || isRequested}
      >
        <span>{isRequested ? <LoadingDots /> : <FiCornerDownLeft className="h-5 w-5" />}</span>
      </button>
    </form>
  );
};

export default RecipeImportForm;
