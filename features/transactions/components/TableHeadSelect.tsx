"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
type Props = {
  columnIndex: number;
  selectedColumns: Record<string, string | null>;
  onChange: (columnIndex: number, value: string | null) => void;
};
const options = ["amount", "date", "payee"];
function TableHeadSelect({ columnIndex, onChange, selectedColumns }: Props) {
  const currentSelection = selectedColumns[`column_${columnIndex}`];

  return (
    <Select
      value={currentSelection || ""}
      onValueChange={(value) =>
        onChange(columnIndex, value === "skip" ? null : value)
      }
    >
      <SelectTrigger
        className={
          "focus:ring-offset-0 focus:ring-transparent outline-none border-none bg-transparent capitalize"
        }
        style={{ color: currentSelection ? "#2a2ae3" : "" }}
      >
        <SelectValue placeholder="Skip" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={"skip"}>Skip</SelectItem>
        {options.map((option, index) => {
          const disabled =
            Object.values(selectedColumns).includes(option) &&
            selectedColumns[`column_${columnIndex}`] !== option;
          return (
            <SelectItem
              key={index}
              value={option}
              disabled={disabled}
              className="capitalize"
            >
              {option}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}

export default TableHeadSelect;
