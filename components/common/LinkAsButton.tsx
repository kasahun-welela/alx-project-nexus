import Link from "next/link";

export default function LinkAsButton({
  href,
  text,
}: {
  href: string;
  text: string;
}) {
  return (
    <Link
      href={href}
      className="bg-primary text-white px-4 py-2 rounded-2xl hover:bg-primary/80"
    >
      {text}
    </Link>
  );
}
