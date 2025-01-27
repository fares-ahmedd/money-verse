/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useState } from "react";
import { useCSVReader } from "react-papaparse";
import ImportCard from "./ImportCard";
import { transactions } from "@/db/schema";
import useSelectAccount from "@/features/accounts/hooks/useSelectAccount";
import { toast } from "@/hooks/use-toast";
import { useBulkCreateTransactions } from "../api/useBulkCreateTransactions";

const INITIAL_IMPORT_RESULT = {
  data: [],
  errors: [],
  meta: {},
};

function ImportTransactionsBtn() {
  const [isOpen, setIsOpen] = useState(false);
  const [importResults, setImportResults] = useState(INITIAL_IMPORT_RESULT);
  const { CSVReader } = useCSVReader();
  const [AccountDialog, confirm] = useSelectAccount();
  const { mutate: createTransactions } = useBulkCreateTransactions();

  const onUpload = (results: typeof INITIAL_IMPORT_RESULT) => {
    setImportResults(results);
    setIsOpen(true);
  };

  const onCancelImport = () => {
    setImportResults(INITIAL_IMPORT_RESULT);
    setIsOpen(false);
  };

  const handleSubmit = async (values: (typeof transactions.$inferInsert)[]) => {
    setIsOpen(false);
    const accountId = await confirm();

    if (!accountId) {
      return toast({
        title: "Please select an account to continue",
        variant: "destructive",
      });
    }

    const data = values.map((value) => ({
      ...value,
      accountId: accountId as string,
      amount: Number.isNaN(value.amount) || !value.amount ? 0 : value.amount,
    }));

    createTransactions(data, {
      onSuccess: () => {
        setImportResults(INITIAL_IMPORT_RESULT);
      },
    });
  };

  if (isOpen) {
    return (
      <ImportCard
        data={importResults.data}
        onCancel={onCancelImport}
        onSubmit={handleSubmit}
        isOpen={isOpen}
      />
    );
  }

  return (
    <>
      <AccountDialog />
      <CSVReader onUploadAccepted={onUpload}>
        {({ getRootProps }: any) => (
          <Button size={"sm"} className="w-full lg:w-auto" {...getRootProps()}>
            <Upload className="size-4" />
            Import
          </Button>
        )}
      </CSVReader>
    </>
  );
}

export default ImportTransactionsBtn;
