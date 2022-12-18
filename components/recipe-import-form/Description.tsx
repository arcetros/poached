import React from "react";
import { UseFormRegister } from "react-hook-form";

import { RootSchema } from "@/types";

import Textarea from "../ui/Form/Textarea";
import FieldWrapper from "./FieldWrapper";

interface Props extends React.ComponentPropsWithoutRef<"textarea"> {
  register: UseFormRegister<RootSchema>;
}

const Description: React.FunctionComponent<Props> = ({ register }) => {
  return (
    <FieldWrapper aria-label="Description" className="h-36">
      <Textarea {...register("description")} name="description" placeholder="Describe recipe about" />
    </FieldWrapper>
  );
};

export default Description;
