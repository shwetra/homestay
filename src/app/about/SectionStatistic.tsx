import React, { FC } from "react";
import Heading from "@/shared/Heading";

export interface Statistic {
  id: string;
  heading: string;
  subHeading: string;
}

const FOUNDER_DEMO: Statistic[] = [
  {
    id: "1",
    heading: "VDEA Entrepreneur of the Year – 2024",
    subHeading:
      "Shailza Sood Dasgupta (Co-founder, HOI) is presented with Vijayalakshmi Das Entrepreneur of the year award organised by SATYA Micro Finance. She was recognized for her acumen in business and empowering other women through her entrepreneurial journey.&nbsp;",
  },
  {
    id: "2",
    heading: "National Women Excellence Award – 2020",
    subHeading: "Shailza Sood Dasgupta (Co-founder, HOI) is felicitated with the prestigious National Women Excellence Award 2020 organized by Indo European Chamber of Small and Medium Enterprises (IECSME). Shailza was chosen for her remarkable work in rural India and empowering women by developing homestays.",
  },
  {
    id: "3",
    heading: "National Business Leadership Award",
    subHeading:
      "The team is presented National Business Leadership Award 2019 for the exemplary work in the field of Travel and Tourism. It is an acknowledgment of the quality and the authenticity of the homestay experience that the team strive to bring to every single customer from all over the world.",
  },
];

export interface SectionStatisticProps {
  className?: string;
}

const SectionStatistic: FC<SectionStatisticProps> = ({ className = "" }) => {
  return (
    <div className={`nc-SectionStatistic relative ${className}`}>
      <Heading
        desc=""
        // className="text-[#e66c1b] mb-10"
      >
        🏆 Awards and Accolades
      </Heading>
      <div className="grid gap-8">
        {FOUNDER_DEMO.map((item) => (
          <div
            key={item.id}
            className="p-6 bg-neutral-50 dark:bg-neutral-800 rounded-2xl dark:border-neutral-800 shadow"
          >
            <h3 className="text-2xl font-semibold leading-none text-neutral-900 md:text-3xl dark:text-neutral-200">
              {item.heading}
            </h3>
            <span className="block text-sm text-neutral-500 mt-3 sm:text-base dark:text-neutral-400">
              {item.subHeading}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionStatistic;
