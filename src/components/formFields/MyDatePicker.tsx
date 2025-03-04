import { useState } from "react";
import { Controller } from "react-hook-form";
import Datepicker from "react-tailwindcss-datepicker";
import styled from "styled-components";

interface Props {
  name: string;
  control: any;
}

// const MIN_DATE = new Date();
// MIN_DATE.setDate(MIN_DATE.getDate() - 0);

const MyDatePicker = ({ name, control }: Props) => {
  return (
    <Div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Datepicker
            // minDate={MIN_DATE}
            useRange={false}
            asSingle={true}
            value={{ startDate: field.value, endDate: field.value }}
            onChange={(date) => field.onChange(date?.startDate || "")}
          />
        )}
      />
    </Div>
  );
};

export default MyDatePicker;

const Div = styled("div")`
  input {
    border-radius: 0 !important;
    height: 2.25rem !important;
  }
`;
