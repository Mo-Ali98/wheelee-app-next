import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

import placeholder from "../assets/placeholder.svg";
export default async function Home() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect("/dashboard");
  }

  return (
    <div className="flex-1 flex flex-col gap-12 max-w-4xl px-3">
      <main className="flex-1 flex flex-col gap-6">
        <section className="w-full py-5 md:py-24 lg:py-16">
          <div className="">
            <div className="mx-auto grid max-w-[1300px] gap-4 md:grid-cols-2 md:gap-16">
              <div>
                <h1 className="lg:leading-tighter my-2 text-center text-3xl font-bold tracking-tighter text-[hsl(280,100%,70%)] sm:text-4xl md:text-left md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
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
                    className="inline-flex h-9 items-center justify-center rounded-md bg-purple-700 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-purple-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
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
      </main>
    </div>
  );
}
