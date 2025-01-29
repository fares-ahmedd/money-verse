import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

function DataGridSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  );
}

export default DataGridSkeleton;

function CardSkeleton() {
  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between gap-x-4">
        <div className="space-y-3 flex-1 ">
          <CardTitle className="skeleton h-5 w-full max-w-xs"></CardTitle>
          <CardDescription className="skeleton h-3 w-full max-w-lg"></CardDescription>
        </div>
        <div className="skeleton size-12 "></div>
      </CardHeader>
      <CardContent>
        <h1 className="skeleton h-5 w-24 mb-4"></h1>

        <p className="skeleton h-3 w-full max-w-lg"></p>
      </CardContent>
    </Card>
  );
}
