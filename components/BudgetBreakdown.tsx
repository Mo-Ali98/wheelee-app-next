"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/utils/utils";

type Cost = {
  name: string;
  amount: number;
};

type BudgetBreakdownProps = {
  totalBudget: number;
  className?: string;
};

const costs: Cost[] = [
  { name: "Operations Cost", amount: 500 },
  { name: "Service Cost", amount: 300 },
  { name: "Printing Cost", amount: 200 },
  { name: "Miscellaneous", amount: 100 },
];

export default function BudgetBreakdown({
  totalBudget,
  className,
}: BudgetBreakdownProps) {
  let remainingBudget = totalBudget;

  return (
    <Card className={cn("w-full mx-auto", className)}>
      <CardHeader>
        <CardTitle>Budget Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between font-medium">
          <span>Total Budget</span>
          <span>£{totalBudget.toFixed(2)}</span>
        </div>

        {costs.map((cost, index) => {
          remainingBudget -= cost.amount;
          return (
            <div key={index} className="flex justify-between text-sm">
              <span>{cost.name}</span>
              <div>
                <span className="text-red-600">-£{cost.amount.toFixed(2)}</span>
                <span className="ml-4">£{remainingBudget.toFixed(2)}</span>
              </div>
            </div>
          );
        })}

        <div className="pt-4 border-t border-gray-200">
          <div className="flex justify-between font-medium">
            <span>Remaining Balance</span>
            <span
              className={
                remainingBudget >= 0 ? "text-green-600" : "text-red-600"
              }
            >
              £{remainingBudget.toFixed(2)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
