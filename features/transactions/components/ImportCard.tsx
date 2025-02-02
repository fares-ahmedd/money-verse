/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useState } from "react";
import ImportTable from "./ImportTable";
import { convertAmountToMelinite } from "@/lib/utils";
import { format } from "date-fns";

const outputFormat = "yyyy-MM-dd";

const requiredOptions = ["amount", "date", "payee"];

interface SelectColumnState {
  [key: string]: string | null;
}
type Props = {
  data: string[][];
  onCancel: VoidFunction;
  onSubmit: (data: any) => void;
  isOpen: boolean;
};

function ImportCard({ data, onCancel, onSubmit, isOpen }: Props) {
  const [selectedColumns, setSelectedColumns] = useState<SelectColumnState>({});

  const headers = data[0];
  const body = data?.slice(1);

  const onTableHeadSelectChange = (
    columnIndex: number,
    value: string | null
  ) => {
    setSelectedColumns((prev) => {
      const newSelectedColumns = { ...prev };

      for (const key in newSelectedColumns) {
        if (newSelectedColumns[key] === value) {
          newSelectedColumns[key] = null;
        }
      }

      if (value === "skip") {
        value = null;
      }

      newSelectedColumns[`column_${columnIndex}`] = value;
      return newSelectedColumns;
    });
  };

  const handleContinue = () => {
    const getColumnIndex = (column: string) => {
      return column.split("_")[1];
    };

    const mappedData = {
      headers: headers.map((_, index) => {
        const columnIndex = getColumnIndex(`column_${index}`);
        return selectedColumns[`column_${columnIndex}`] || null;
      }),
      body: body
        .map((row) => {
          const transformedRow = row.map((cell, index) => {
            const columnIndex = getColumnIndex(`column_${index}`);
            return selectedColumns[`column_${columnIndex}`] ? cell : null;
          });

          return transformedRow.every((item) => item === null)
            ? []
            : transformedRow;
        })
        .filter((row) => row.length > 0),
    };

    const arrayData = mappedData.body.map((row) => {
      return row.reduce((acc: any, cell, index) => {
        const header = mappedData.headers[index];
        if (header !== null) {
          acc[header] = cell;
        }
        return acc;
      }, {});
    });

    const formattedData = arrayData.map((item) => ({
      ...item,
      amount: convertAmountToMelinite(parseFloat(item.amount)),
      date: format(new Date(item.date), outputFormat),
    }));

    onSubmit(formattedData);
  };

  const progress = Object.values(selectedColumns).filter(Boolean).length;

  return (
    <Sheet open={isOpen} onOpenChange={onCancel}>
      <SheetContent side={"bottom"} className="h-full">
        <SheetHeader className="flex justify-between items-center flex-col md:flex-row gap-1 mx-[0.3rem]">
          <SheetTitle className="line-clamp-1">Import Transaction</SheetTitle>
          <div className="flex items-center gap-2">
            <Button size={"sm"} variant={"destructive"} onClick={onCancel}>
              Close
            </Button>
            <Button
              disabled={progress < requiredOptions.length}
              size={"sm"}
              onClick={handleContinue}
            >
              Continue ({progress} / {requiredOptions.length})
            </Button>
          </div>
        </SheetHeader>

        <ImportTable
          headers={headers}
          body={body}
          selectedColumns={selectedColumns}
          onTableHeadSelectChange={onTableHeadSelectChange}
        />
      </SheetContent>
    </Sheet>
  );
}

export default ImportCard;
