import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

function SettingsSkeleton() {
  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl line-clamp-1">Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className=" w-full flex items-center justify-center h-[180px]">
          <Loader2 className="animate-spin text-muted-foreground size-8" />
        </div>
      </CardContent>
    </Card>
  );
}

export default SettingsSkeleton;
