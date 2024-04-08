export default function Loader({ text }: { text: string }) {
  return (
    <div className="absolute inset-0 ">
      <div className="flex h-full items-center justify-center">
        <div className="z-50 flex aspect-square w-[200px] animate-pulse items-center justify-center rounded-full bg-main text-2xl font-extrabold text-white">
          {text}
        </div>
      </div>
    </div>
  );
}
