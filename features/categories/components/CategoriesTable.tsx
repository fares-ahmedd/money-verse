"use client";
import { DataTable } from "@/components/DataTable";
import { columns } from "@/app/(dashboard)/accounts/columns";
import { useBulkDeleteCategories } from "../api/useBulkDeleteCategories";
import { useGetCategories } from "../api/useGetCategories";
import CategoryTableSkeleton from "./CategoryTableSkeleton";

function CategoriesTable() {
  const { isLoading, data } = useGetCategories();
  const { isPending, mutate: deleteCategories } = useBulkDeleteCategories();
  const categories = data || [];

  const isDisabled = isLoading || isPending;

  if (isLoading) {
    return <CategoryTableSkeleton />;
  }

  return (
    <DataTable
      filterKey="name"
      columns={columns}
      data={categories}
      onDelete={(row) => {
        const ids = row.map((r) => r.original.id);
        deleteCategories({ ids });
      }}
      disabled={isDisabled}
    />
  );
}

export default CategoriesTable;
