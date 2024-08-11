import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { MarqueeDemo } from "@/components/marquee";
import { getAccountByAuthId } from "@/lib/accounts/accountsService";
import { createClient } from "@/utils/supabase/server";

import placeholder from "../assets/placeholder.svg";
export default async function Home() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const account = await getAccountByAuthId(user.id);

    if (!account || !account.onboarded) {
      redirect("/welcome");
    }

    return redirect("/dashboard");
  }

  return (
    <div className="flex-1 flex flex-col gap-12 max-w-5xl px-3">
      <main className="flex-1 flex flex-col gap-6">
        <section className="w-full py-5 md:py-24 lg:py-16">
          <div className="">
            <div className="mx-auto grid max-w-[1300px] gap-4 md:grid-cols-2 md:gap-16">
              <div>
                <h1 className="lg:leading-tighter my-2 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-left md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                  Put Your Ad in Motion!
                </h1>
                <p className="mx-auto max-w-[700px] md:text-md">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
                <div className="mt-4 space-x-4">
                  <Link
                    href="/login"
                    className="inline-flex h-9 items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Get Started
                  </Link>
                </div>
              </div>
              <Image
                src={placeholder} // eslint-disable-line @typescript-eslint/no-unsafe-assignment
                alt="Hero"
                className="mx-auto aspect-[2/1] overflow-hidden rounded-xl object-cover"
              />
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-18">
          <div className="space-y-12 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg  px-3 py-1 text-sm text-white bg-black">
                  Key Features
                </div>

                <h1 className="lg:leading-tighter my-2 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                  Why Choose Our Mobile Vehicle Advertising?{" "}
                </h1>

                <p className="mx-auto max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover the Features That Drive Results and Take Your Brand
                  Further
                </p>
              </div>
            </div>
            <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              <div className="flex flex-col h-[250px] gap-1 rounded-lg bg-white p-6 shadow-md">
                <h3 className="text-center text-lg font-bold sm:text-left">
                  Wide Reach & High Visibility{" "}
                </h3>
                <p className="text-center text-sm text-gray-500 sm:text-left">
                  Your ads travel through high-traffic areas, reaching thousands
                  of potential customers daily. Target a broad and varied
                  audience, from commuters to pedestrians, without geographic
                  limitations.
                </p>
              </div>
              <div className="flex flex-col h-[250px] gap-1 rounded-lg bg-white p-6 shadow-md">
                <h3 className="text-center text-lg font-bold  sm:text-left">
                  Targeted Advertising{" "}
                </h3>
                <p className="text-center text-sm text-gray-500 sm:text-left">
                  Customize your campaign to specific regions, neighbourhood's,
                  or routes for maximum impact. Choose vehicles that align with
                  your target demographic, ensuring your ads reach the right
                  audience.
                </p>
              </div>
              <div className="flex flex-col h-[250px] gap-1 rounded-lg bg-white p-6 shadow-md">
                <h3 className="text-center text-lg font-bold  sm:text-left">
                  Cost-Effective Marketing{" "}
                </h3>
                <p className="text-center text-sm text-gray-500 sm:text-left">
                  Competitive pricing models that provide high ROI compared to
                  traditional billboards and digital ads. Choose from various
                  campaign lengths and ad formats to suit your marketing budget
                  and goals.
                </p>
              </div>
              <div className="flex flex-col h-[250px] gap-1 rounded-lg bg-white p-6 shadow-md">
                <h3 className="text-center text-lg font-bold  sm:text-left">
                  Customizable Ad Design{" "}
                </h3>
                <p className="text-center text-sm text-gray-500 sm:text-left">
                  From vinyl wraps to magnetic signs, select the ad format that
                  best fits your campaign. From vinyl wraps to magnetic signs,
                  select the ad format that best fits your campaign.
                </p>
              </div>
              <div className="flex flex-col h-[250px] gap-1 rounded-lg bg-white p-6 shadow-md">
                <h3 className="text-center text-lg font-bold  sm:text-left">
                  Real-Time Tracking & Analytics
                </h3>
                <p className="text-center text-sm text-gray-500 sm:text-left">
                  Monitor the exact routes and locations where your ads are
                  displayed in real-time. Access detailed reports on
                  impressions, reach, and engagement to measure your campaign's
                  success.
                </p>
              </div>
              <div className="flex flex-col h-[250px] gap-1 rounded-lg bg-white p-6 shadow-md">
                <h3 className="text-center text-lg font-bold  sm:text-left">
                  Easy Campaign Management
                </h3>
                <p className="text-center text-sm text-gray-500 sm:text-left">
                  Simple tools to create, launch, and manage your ad campaigns
                  all in one place. Our team is available around the clock to
                  assist with any aspect of your advertising campaign.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-18">
          <div className="space-y-12 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="lg:leading-tighter my-2 text-3xl font-bold tracking-tighter  sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                  Testimonials
                </h1>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  What Our Clients Say
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Hear from our satisfied clients about their experience with
                  Wheelie.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-xs md:max-w-5xl">
              <MarqueeDemo />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
