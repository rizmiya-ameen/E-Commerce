import Link from "next/link";
import { MdArrowBack } from "react-icons/md";

interface NullDataProps {
  title: string;
}

const NullData: React.FC<NullDataProps> = ({ title }) => {
  return (
    <div className="w-full min-h-[40vh] flex flex-col items-center justify-center gap-3 text-center">
      <p className="text-xl md:text-2xl">{title}</p>
      <Link href="/" className="text-slate-500 flex items-center gap-1">
        <MdArrowBack />
        <span>Back to all products</span>
      </Link>
    </div>
  );
};

export default NullData;
