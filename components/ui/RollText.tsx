/**
 * Each letter rolls up and is replaced by an accent-colored copy when the
 * parent has class "group" and is hovered. Pure CSS: no JS runs on hover.
 */
export function RollText({ text }: { text: string }) {
  return (
    <span aria-hidden="true" className="inline-flex flex-wrap">
      {[...text].map((char, i) => (
        <span key={i} className="relative -my-[0.1em] inline-block overflow-hidden py-[0.1em]">
          <span
            className="block transition-transform duration-500 ease-out group-hover:-translate-y-full motion-reduce:transition-none"
            style={{ transitionDelay: `${i * 18}ms` }}
          >
            {char}
          </span>
          <span
            className="text-accent absolute inset-0 block translate-y-full py-[0.1em] transition-transform duration-500 ease-out group-hover:translate-y-0 motion-reduce:transition-none"
            style={{ transitionDelay: `${i * 18}ms` }}
          >
            {char}
          </span>
        </span>
      ))}
    </span>
  );
}