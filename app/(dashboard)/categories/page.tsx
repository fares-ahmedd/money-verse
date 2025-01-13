import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CategoriesTable from "@/features/categories/components/CategoriesTable";
import CreateCategoryBtn from "@/features/categories/components/CreateCategoryBtn";

function CategoriesPage() {
  return (
    <div className="max-w-screen-2xl mx-auto pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 flex-row items-center justify-between">
          <CardTitle className="text-xl line-clamp-1">
            Categories page
          </CardTitle>
          <CreateCategoryBtn />
        </CardHeader>
        <CardContent>
          <CategoriesTable />
        </CardContent>
      </Card>
    </div>
  );
}

export default CategoriesPage;
