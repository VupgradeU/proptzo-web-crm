import Image from "next/image";

export default function Avatar({
  img,
  alt = "?",
  batch,
}: {
  img?: string;
  alt?: string;
  batch?: string;
}) {
  const batchColorMap: Record<string, string> = {
    green: "bg-green-500",
    red: "bg-red-500",
    blue: "bg-blue-500",
    yellow: "bg-yellow-500",
    purple: "bg-purple-500",
  };
  const badgeColorClass = batch ? batchColorMap[batch] || "bg-gray-500" : "";
  return (
    <div className="shrink-0 relative border border-gray-300 dark:border-white/10 bg-gray-200 dark:bg-white/20 w-10 h-10 rounded-full shadow-sm flex items-center justify-center">
      {img ? (
        <Image
          src={img}
          alt={alt}
          layout="fill"
          objectFit="cover"
          className="rounded-full"
        />
      ) : (
        <h6 className="h-full w-full flex items-center justify-center text-lg uppercase font-semibold text-gray-500 dark:text-gray-300">
          {alt && alt.charAt(0)}
        </h6>
      )}
      {batch && (
        <div
          className={`absolute bottom-0.5 right-0 p-1 rounded-full ${badgeColorClass} shadow-md border border-gray-300 dark:border-white/10`}
        ></div>
      )}
    </div>
  );
}
