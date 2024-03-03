import { CardStack } from "./ui/card-stack";
import  cn  from "../utils/cn";

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
      <p>
  Our whiteboard provides users with a rich array of drawing tools, empowering them to express their creativity freely. From pens to pencils, markers to highlighters, users can select from a diverse palette of options to bring their ideas to life on the digital canvas.
      </p>
    ),
  },
  {
    id: 1,
    name: "Kartike Tiwari",
    designation: "Software Engineer",
    content: (
      <p>
 Tailoring the brush size and color is key to realizing your artistic vision. Our platform offers extensive brush customization options, allowing users to adjust parameters to perfectly match their preferences and artistic style.
      </p>
    ),
  },
  {
    id: 2,
    name: "Kartike Tiwari",
    designation: "Software Engineer",
    content: (
      <p>
   Mistakes happen, but with our intuitive eraser tool, users can effortlessly correct errors or remove unwanted elements from their drawings. The erasing functionality ensures a seamless and frustration-free drawing experience.
      </p>
    ),
  },
  {
    id: 3,
    name: "Kartike Tiwari",
    designation: "Software Engineer",
    content: (
      <p>
  Capture your creative moments and preserve them for posterity with our save and retrieve feature. Whether it's for future reference, collaboration, or simply to admire your work later, our platform makes it easy to store and access your drawings at any time.
      </p>
    ),
  },
  {
    id: 4,
    name: "Kartike Tiwari",
    designation: "Software Engineer",
    content: (
      <p>
  Take your creations beyond the digital realm by downloading them locally. Our download option enables users to save their drawings to their devices, facilitating easy sharing, printing, or archiving of their artistic endeavors.
      </p>
    ),
  },
  {
    id: 5,
    name: "Kartike Tiwari",
    designation: "Software Engineer",
    content: (
      <p>
 Collaboration thrives on communication, which is why our platform features a real-time chat function. Engage in lively discussions, share ideas, and brainstorm with other users, all within the same digital workspace.
      </p>
    ),
  },
  {
    id: 6,
    name: "Kartike Tiwari",
    designation: "Software Engineer",
    content: (
      <p>
Extend your collaborative network effortlessly by sending email invitations to others to join your whiteboard sessions. Seamlessly integrate colleagues, friends, or collaborators into your creative process with just a few clicks.      </p>
    ),
  },
  {
    id: 5,
    name: "Kartike Tiwari",
    designation: "Software Engineer",
    content: (
      <p>
Tailor your collaborative experience to your preferences by creating personalized rooms. Whether you opt for a named room for recurring meetings or a random room for spontaneous brainstorming sessions, our customizable room creation feature ensures flexibility and adaptability to your collaboration needs.      </p>
    ),
  },
];
