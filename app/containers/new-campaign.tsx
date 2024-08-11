"use client";

import { CalendarDaysIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface FormData {
  name: string;
  audience: string;
  customAudience: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  budget: number;
  description: string;
}

export default function NewCampaignForm() {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    audience: "",
    customAudience: "",
    startDate: undefined,
    endDate: undefined,
    budget: 0.0,
    description: "",
  });
  const [error, setError] = useState<string | null>(null); // For error message

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleDateChange = (id: keyof FormData, date: Date | undefined) => {
    setFormData({ ...formData, [id]: date });
  };

  const handleSelectChange = (val: string) => {
    setFormData({ ...formData, ["audience"]: val });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.audience !== "other") {
      setFormData({ ...formData, ["customAudience"]: "" });
    }

    try {
      const response = await fetch("/api/campaigns", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Redirect on successful submission
        router.push("/dashboard");
      } else {
        // Handle error response
        const errorData = await response.json();
        setError(
          errorData.message || "An error occurred while submitting the form."
        );
      }
    } catch (error) {
      setError("An error occurred while submitting the form.");
      console.error("Form submission error:", error);
    }

    // Perform form submission logic here (e.g., API call)
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 md:px-6 lg:py-16">
      <div className="rounded-lg border bg-background p-6 shadow-sm md:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Create New Ad Campaign
          </h1>
          <p className="mt-2 text-muted-foreground">
            Fill out the form to create a new ad campaign.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="grid gap-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Campaign Name</Label>
              <Input
                id="name"
                placeholder="Enter campaign name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="audience">Target Audience</Label>
              <Select
                name="audience"
                value={formData.audience}
                onValueChange={(e) => handleSelectChange(e)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select target audience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="youth">Youth</SelectItem>
                  <SelectItem value="seniors">Seniors</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <Input
                id="customAudience"
                placeholder="Enter custom target audience"
                className={formData.audience === "other" ? "" : "hidden"}
                value={formData.customAudience}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start font-normal"
                  >
                    <CalendarDaysIcon className="mr-1 h-4 w-4 -translate-x-1" />
                    {formData.startDate
                      ? formData.startDate.toLocaleDateString()
                      : "Pick a start date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.startDate}
                    onSelect={(date: Date | undefined) =>
                      handleDateChange("startDate", date)
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start font-normal"
                  >
                    <CalendarDaysIcon className="mr-1 h-4 w-4 -translate-x-1" />
                    {formData.endDate
                      ? formData.endDate.toLocaleDateString()
                      : "Pick an end date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.endDate}
                    onSelect={(date) => handleDateChange("endDate", date)}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="budget">Ad Budget</Label>
              <Input
                id="budget"
                placeholder="Enter ad budget"
                type="number"
                step="0.01"
                min="0"
                value={formData.budget}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Campaign Description</Label>
            <Textarea
              id="description"
              placeholder="Enter campaign description"
              className="min-h-[120px]"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <Button type="submit" className="ml-auto">
            Create Campaign
          </Button>
        </form>
        {error && (
          <div className="mt-6 border border-red-500 bg-red-50 p-3 rounded-md text-red-600">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
