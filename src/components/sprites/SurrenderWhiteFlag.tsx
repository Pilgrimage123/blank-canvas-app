import React from "react";

interface SurrenderWhiteFlagProps {
  size?: number;
  className?: string;
}

export const SurrenderWhiteFlag: React.FC<SurrenderWhiteFlagProps> = ({
  size = 38,
  className = "",
}) => {
  const width = size;
  const height = Math.round(size * 1.22);

  return (
    <div
      className={`relative flex flex-col items-center pointer-events-none select-none ${className}`}
      title="Vzdává se (bílá vlajka)"
    >
      <svg
        width={width}
        height={height}
        viewBox="0 0 44 54"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible filter drop-shadow-[0_2px_3px_rgba(28,19,8,0.4)]"
      >
        {/* Celá vlajka se kolébá ve větru */}
        <g className="anim-surrender-flag">
          {/* Dřevěná ozdobná kulička na špici žerdi */}
          <circle cx="10" cy="5" r="3.2" fill="#8c5614" stroke="#1c1308" strokeWidth="1.5" />

          {/* Dřevěná žerď v Josefově Ladovském stylu s inkoustovou linkou */}
          <line
            x1="10"
            y1="5"
            x2="13"
            y2="50"
            stroke="#5e3b1c"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <line
            x1="10"
            y1="5"
            x2="13"
            y2="50"
            stroke="#1c1308"
            strokeWidth="1.2"
            strokeLinecap="round"
          />

          {/* Bílé plátno vlajky vlající ve větru */}
          <g className="anim-surrender-cloth">
            {/* Tělo bílé plátěné vlajky s inkoustovou konturou */}
            <path
              d="M 11 7 
                 C 20 4.5, 27 12, 39 8 
                 C 40 15, 38 22, 40 29 
                 C 28 25, 22 33, 12 26 
                 Z"
              fill="#fffef5"
              stroke="#1c1308"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            {/* Ladovské stínové záhyby látky */}
            <path
              d="M 22 8 C 25 15, 24 21, 25 28"
              stroke="#ebd9b5"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="M 31 8.5 C 34 16, 32 22, 33 28"
              stroke="#ebd9b5"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* Jemná linka švu */}
            <path
              d="M 22.5 11 C 24 16, 23.5 21, 24.5 25"
              stroke="#1c1308"
              strokeWidth="0.8"
              strokeLinecap="round"
              opacity="0.35"
            />

            {/* Úvazy k žerdi */}
            <circle cx="10.8" cy="8" r="1.4" fill="#1c1308" />
            <circle cx="12" cy="25" r="1.4" fill="#1c1308" />
          </g>
        </g>
      </svg>
    </div>
  );
};
