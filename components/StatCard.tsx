import { type LucideIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  subValue?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  subValue,
}) => (
  <Card className="w-full overflow-hidden">
    <CardHeader className="pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent className="pb-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-2xl font-bold">{value}</div>
          {subValue && (
            <p className="text-xs text-muted-foreground">{subValue}</p>
          )}
        </div>
        <div className="group h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200">
          <Icon className="h-5 w-5 text-black group-hover:scale-110 group-hover:skew-y-3 transition-transform" />
        </div>
      </div>
    </CardContent>
  </Card>
);
