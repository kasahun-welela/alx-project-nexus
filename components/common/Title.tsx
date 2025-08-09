function Title({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-6">
      <h2 className="text-2xl md:text-4xl font-bold">{title}</h2>
      <p className="text-gray-600 ">{description}</p>
    </div>
  );
}

export default Title;
