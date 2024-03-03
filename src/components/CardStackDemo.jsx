import { CardStack } from "./ui/card-stack";
import  cn  from "../utils/cn";
import logo1 from '../assets/logo1.png';
import logo2 from '../assets/logo2.png';
import logo3 from '../assets/logo3.png';
import logo4 from '../assets/logo4.png';
import logo5 from '../assets/logo5.png';

export function CardStackDemo() {
  return (
    <div className="h-[40rem] flex items-center justify-center w-full">
      <CardStack items={CARDS} />
    </div>
  );
}

export const Highlight = ({
  children,
  className,
}) => {
  return (
    <span
      className={cn(
        "font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-700/[0.2] dark:text-emerald-500 px-1 py-0.5",
        className
      )}
    >
      {children}
    </span>
  );
};

const CARDS = [
  {
    id: 0,
    name: "Kartike Tiwari",
    designation: "Software Engineer",
    content: (
<img src={logo1} alt="lol" style={{ height: '300px', width: '500px' }} />


    ),
  },
  {
    id: 1,
    name: "Kartike Tiwari",
    designation: "Software Engineer",
    content: (
      <img src={logo2} alt="lol" style={{ height: '300px', width: '500px' }} />

    ),
  },
  {
    id: 2,
    name: "Kartike Tiwari",
    designation: "Software Engineer",
    content: (
<img src={logo3} alt="lol" style={{ height: '300px', width: '500px' }} />


    ),
  },
  {
    id: 3,
    name: "Kartike Tiwari",
    designation: "Software Engineer",
    content: (
      <img src={logo4} alt="lol" style={{ height: '300px', width: '500px' }} />

    ),
  },
  {
    id: 4,
    name: "Kartike Tiwari",
    designation: "Software Engineer",
    content: (
      <img src={logo5} alt="lol" style={{ height: '300px', width: '500px' }} />

    ),
  },
  
];
