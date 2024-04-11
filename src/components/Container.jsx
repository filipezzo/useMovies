export function Container({ children, className }) {
  return (
    <section
      className={`my-4 h-[400px] w-full overflow-y-scroll rounded-md   bg-zinc-950 sm:h-[668px]  ${className}`}
    >
      {children}
    </section>
  );
}
