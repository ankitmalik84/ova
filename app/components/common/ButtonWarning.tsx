import Link from "next/link";

interface BottomWarningProps {
  text: string;
  linkText: string;
  path: string;
}

const BottomWarning: React.FC<BottomWarningProps> = ({
  text,
  linkText,
  path,
}) => {
  return (
    <div className="text-center text-sm py-4">
      <span className="text-muted-foreground">{text}</span>
      <Link
        href={path}
        className="ml-2 underline cursor-pointer text-customPurple hover:text-customPurple/80 transition-colors "
      >
        {linkText}
        <span className="sr-only">, navigate to {linkText} page</span>
      </Link>
    </div>
  );
};

export default BottomWarning;
