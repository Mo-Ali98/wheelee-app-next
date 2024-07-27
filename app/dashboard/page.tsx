import {
  DollarSignIcon,
  UsersIcon,
  CreditCardIcon,
  ActivityIcon,
  ShoppingCartIcon,
  PercentIcon,
  PackageIcon,
} from "lucide-react";
import { redirect } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";

export default async function Dashboard() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  //Based on user role force driver

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <h1>Welcome user {user?.email}</h1>

      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>
                <DollarSignIcon className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Subscriptions
                </CardTitle>
                <UsersIcon className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+2350</div>
                <p className="text-xs text-muted-foreground">
                  +180.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Sales</CardTitle>
                <CreditCardIcon className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12,234</div>
                <p className="text-xs text-muted-foreground">
                  +19% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Now
                </CardTitle>
                <ActivityIcon className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+573</div>
                <p className="text-xs text-muted-foreground">
                  +201 since last hour
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  New Orders
                </CardTitle>
                <ShoppingCartIcon className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+124</div>
                <p className="text-xs text-muted-foreground">
                  +15% from last week
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  New Customers
                </CardTitle>
                <UsersIcon className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+350</div>
                <p className="text-xs text-muted-foreground">
                  +12% from last week
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Avg. Order Value
                </CardTitle>
                <DollarSignIcon className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$75.00</div>
                <p className="text-xs text-muted-foreground">
                  +3% from last week
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Conversion Rate
                </CardTitle>
                <PercentIcon className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.2%</div>
                <p className="text-xs text-muted-foreground">
                  +0.5% from last week
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Top Products
                </CardTitle>
                <PackageIcon className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">Laser Lemonade Machine</div>
                    <div>25 sold</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-medium">Hypernova Headphones</div>
                    <div>100 sold</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-medium">AeroGlow Desk Lamp</div>
                    <div>50 sold</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-medium">TechTonic Energy Drink</div>
                    <div>0 sold</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-medium">Gamer Gear Pro Controller</div>
                    <div>75 sold</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-medium">Luminous VR Headset</div>
                    <div>30 sold</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Recent Orders
                </CardTitle>
                <ShoppingCartIcon className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">Order #1234</div>
                    <div>$250.00</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-medium">Order #5678</div>
                    <div>$150.00</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-medium">Order #9012</div>
                    <div>$350.00</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-medium">Order #3456</div>
                    <div>$450.00</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-medium">Order #7890</div>
                    <div>$250.00</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-medium">Order #2345</div>
                    <div>$150.00</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Top Customers
                </CardTitle>
                <UsersIcon className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">Liam Johnson</div>
                    <div>$1,250.00</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-medium">Olivia Smith</div>
                    <div>$750.00</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-medium">Noah Williams</div>
                    <div>$1,050.00</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-medium">Emma Brown</div>
                    <div>$1,450.00</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-medium">Liam Johnson</div>
                    <div>$1,250.00</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-medium">Olivia Smith</div>
                    <div>$750.00</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Recent Activity
                </CardTitle>
                <ActivityIcon className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">New Order</div>
                    <div>Liam Johnson</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-medium">Product Added</div>
                    <div>Hypernova Headphones</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-medium">Customer Signup</div>
                    <div>Emma Brown</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-medium">Order Fulfilled</div>
                    <div>Noah Williams</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-medium">New Review</div>
                    <div>Olivia Smith</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
