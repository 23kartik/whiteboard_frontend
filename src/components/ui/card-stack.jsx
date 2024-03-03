import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const CardStack = ({
  items,
  offset,
  scaleFactor,
}) => {
  const CARD_OFFSET = offset || 10;
  const SCALE_FACTOR = scaleFactor || 0.06;
  const [cards, setCards] = useState(items);

  useEffect(() => {
    startFlipping();
  }, []);

  const startFlipping = () => {
    const interval = setInterval(() => {
      setCards((prevCards) => {
        const newArray = [...prevCards];
        newArray.unshift(newArray.pop());
        return newArray;
      });
    }, 5000);

    return () => clearInterval(interval);
  };

  return (
    <div className="relative  h-[320px] w-[540px] ml-20 mt-16" >
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          className="absolute bg-opacity-50 dark:bg-black dark:bg-opacity-50 h-[320px] w-[540px] rounded-3xl p-4 shadow-xl border border-neutral-200 dark:border-white/[0.1] shadow-black/[0.1] dark:shadow-white/[0.05] flex flex-col justify-between"
          style={{
            transformOrigin: "top center",
           
            backgroundColor:'#F8F2ED'
          }}
          animate={{
            top: index * -CARD_OFFSET,
            scale: 1 - index * SCALE_FACTOR,
            zIndex: cards.length - index,
          }}
        >
          <div className="font-normal text-neutral-700 dark:text-neutral-200">
            {card.content}
          </div>

        </motion.div>
      ))}
    </div>
  );
};
