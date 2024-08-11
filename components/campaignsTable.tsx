"use client";
import { DoorOpenIcon } from "lucide-react";
import Link from "next/link";

import { type Campaign } from "@/app/models/models";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatMoney } from "@/utils/utils";

interface CampaignTableProps {
  campaigns: Campaign[];
}

export const CampaignTable: React.FC<CampaignTableProps> = ({ campaigns }) => {
  if (!Boolean(campaigns.length)) {
    return (
      <Card className="p-5 w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="hidden sm:table-cell">Start</TableHead>
              <TableHead className="hidden sm:table-cell">End</TableHead>
              <TableHead className="hidden md:table-cell">Audience</TableHead>
              <TableHead className="hidden md:table-cell max-w-6">
                Description
              </TableHead>
              <TableHead className="">Budget</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody></TableBody>
        </Table>

        <div className="text-lg text-center my-5">
          <p className="mb-4">No campaigns available.</p>

          <Link
            href={"/new"}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Create New Campaign
          </Link>
        </div>
      </Card>
    );
  }
  return (
    <Card className="p-5 w-full shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="hidden sm:table-cell">
              <span className="sr-only">Image</span>
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="hidden sm:table-cell">Start</TableHead>
            <TableHead className="hidden sm:table-cell">End</TableHead>
            <TableHead className="hidden md:table-cell">Audience</TableHead>
            <TableHead className="">Budget</TableHead>
            <TableHead className="">View</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {campaigns.map((campaign) => (
            <TableRow key={campaign.id} className="bg-accent">
              <TableCell className="hidden sm:table-cell">
                <StatusBadge endDate={campaign.end_date} />
              </TableCell>
              <TableCell>
                <div className="font-medium">{campaign.name}</div>
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                {campaign.start_date}
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                {campaign.end_date}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {campaign.audience}
              </TableCell>
              <TableCell className="">{formatMoney(campaign.budget)}</TableCell>
              <TableCell className="">
                <Link href={`/campaign/${campaign.id}`} className="">
                  <DoorOpenIcon className="h-4 w-4 text-blue-400" />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

interface StatusBadgeProps {
  endDate: string; // End date in ISO string format
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ endDate }) => {
  const today = new Date();
  const endDateObj = new Date(endDate);
  const daysRemaining = Math.ceil(
    (endDateObj.getTime() - today.getTime()) / (1000 * 3600 * 24)
  );

  if (daysRemaining <= 3) {
    return (
      <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded">
        Ending Soon
      </span>
    );
  }

  if (endDateObj < today) {
    return (
      <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded">
        Inactive
      </span>
    );
  }

  return (
    <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
      Active
    </span>
  );
};
