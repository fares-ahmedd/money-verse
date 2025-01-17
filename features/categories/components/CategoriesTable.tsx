"use client";
import { DataTable } from "@/components/DataTable";
import { useBulkDeleteCategories } from "../api/useBulkDeleteCategories";
import { useGetCategories } from "../api/useGetCategories";
import CategoryTableSkeleton from "./CategoryTableSkeleton";
import { columns } from "@/app/(dashboard)/categories/columns";

function CategoriesTable() {
  const { isLoading, data } = useGetCategories();
  const { isPending, mutate: deleteCategories } = useBulkDeleteCategories();
  const categories = data || [];

  const isDisabled = isLoading || isPending;

  if (isLoading) {
    return <CategoryTableSkeleton />;
  }

  console.log("Render");
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
