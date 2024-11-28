import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Settings } from "lucide-react";

const LanguageAndRegion = () => {
  return (
    <div>
      <Card className="p-4">
        <CardHeader className="flex items-center justify-start gap-x-3 flex-row">
          <Settings size={30} className="text-primary w-[10%]" />
          <div className="space-y-2 flex-1">
            <CardTitle>Under development</CardTitle>
            <CardDescription className="text-xs md:textsm">
              Language & Region feature will be available soon. We are
              continuously working to get features online.
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};

export default LanguageAndRegion;
