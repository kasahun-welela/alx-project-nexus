import Link from "next/link";

export default function LinkAsButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="bg-primary text-white px-4 py-2 rounded-2xl hover:bg-primary/80"
    >
      {children}
    </Link>
  );
}
