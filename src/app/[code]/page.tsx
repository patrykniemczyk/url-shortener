import { getUrlFromCode } from "@/app/actions";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;

  const url = await getUrlFromCode(code);

  if (url) {
    redirect(url);
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Link not found</h1>
        <p className="text-slate-600">
          The short link you requested does not exist.
        </p>
      </div>
    </main>
  );
}
