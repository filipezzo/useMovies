export function Container({ children }) {
  return (
    <section className="my-4 h-[500px] w-full overflow-y-scroll rounded-md   bg-zinc-950 sm:h-[668px] ">
      {children}
    </section>
  );
}
