type ButtonProps = {
  href: string;
  children: React.ReactNode;
};

export default function Button({ href, children }: ButtonProps) {
  return (
    <a
      href={href}
      className="rounded-full bg-amber-400 px-8 py-4 font-bold text-black transition-all duration-300 hover:scale-105 hover:bg-amber-300"
    >
      {children}
    </a>
  );
}