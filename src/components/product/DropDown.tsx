import React, { FC } from "react";

interface Props {
  id: string;
  selected: string;
  options: string[];
  setSelectedTrl: React.Dispatch<React.SetStateAction<string>>;
}
const DropDown: FC<Props> = ({ id, options, selected, setSelectedTrl }) => {
  return (
    <select
      id={id}
      onChange={(e) => setSelectedTrl(e.target.value)}
      className="mt-3 w-full rounded-lg border border-[#ccc] bg-gray-50 px-3 py-[6px] text-sm text-gray-900 focus:border-blue-400 focus:ring-blue-500"
    >
      <option defaultValue={selected}>{selected}</option>
      {options.map((el, i) => (
        <option key={i} value={el}>
          {el}
        </option>
      ))}
    </select>
  );
};

export default DropDown;
