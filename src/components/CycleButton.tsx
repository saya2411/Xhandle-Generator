import React, { useState } from "react";
import { View } from "./native/View";
import { Text } from "./native/Text";
import { Pressable } from "./native/Pressable";

interface CycleButtonProps {
  onCycle: () => void;
  isLoading: boolean;
  isOffline: boolean;
}

/**
 * Animated moving bicycle with a person riding it (leaning forward, hands on handlebars, pedaling).
 * Positioned in the middle of the button on hover.
 */
export const CenteredMovingBicycle: React.FC = () => {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
      aria-hidden="true"
    >
      <div className="relative flex items-center justify-center animate-[bike-ride_1.6s_ease-in-out_infinite]">
        <svg
          className="w-12 h-12 text-neutral-100 drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]"
          viewBox="0 0 52 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <style>{`
            @keyframes bike-spin-wheels {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            @keyframes bike-ride {
              0% { transform: translateX(-18px); }
              50% { transform: translateX(18px); }
              100% { transform: translateX(-18px); }
            }
            @keyframes rider-pedal-bob {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-1.8px); }
            }
            @keyframes pedal-crank {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            .center-spin-wheel {
              animation: bike-spin-wheels 0.42s linear infinite;
              transform-origin: center;
            }
            .rider-group {
              animation: rider-pedal-bob 0.28s ease-in-out infinite;
              transform-origin: bottom center;
            }
            .crank-rotate {
              animation: pedal-crank 0.42s linear infinite;
              transform-origin: 22px 34px;
            }
          `}</style>

          {/* Rear Wheel (Left) with animated spinning spokes */}
          <g className="center-spin-wheel" style={{ transformBox: "fill-box" }}>
            <circle cx="12" cy="34" r="8.5" stroke="currentColor" strokeWidth="2.2" />
            <circle cx="12" cy="34" r="2" fill="currentColor" />
            <line x1="12" y1="25.5" x2="12" y2="42.5" stroke="currentColor" strokeWidth="1.1" strokeDasharray="2 1" />
            <line x1="3.5" y1="34" x2="20.5" y2="34" stroke="currentColor" strokeWidth="1.1" strokeDasharray="2 1" />
          </g>

          {/* Front Wheel (Right) with animated spinning spokes */}
          <g className="center-spin-wheel" style={{ transformBox: "fill-box" }}>
            <circle cx="38" cy="34" r="8.5" stroke="currentColor" strokeWidth="2.2" />
            <circle cx="38" cy="34" r="2" fill="currentColor" />
            <line x1="38" y1="25.5" x2="38" y2="42.5" stroke="currentColor" strokeWidth="1.1" strokeDasharray="2 1" />
            <line x1="29.5" y1="34" x2="46.5" y2="34" stroke="currentColor" strokeWidth="1.1" strokeDasharray="2 1" />
          </g>

          {/* Bicycle Frame */}
          {/* Chainstay */}
          <line x1="12" y1="34" x2="22" y2="34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          {/* Seat Tube */}
          <line x1="22" y1="34" x2="19" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          {/* Down Tube */}
          <line x1="22" y1="34" x2="32" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          {/* Top Tube */}
          <line x1="19" y1="23" x2="32" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          {/* Rear Stays */}
          <line x1="12" y1="34" x2="19" y2="23" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          {/* Front Fork */}
          <line x1="38" y1="34" x2="32" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          {/* Stem */}
          <line x1="32" y1="22" x2="34" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          {/* Handlebars */}
          <path d="M31 17h5c1 0 1.6.8 1.6 1.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          {/* Saddle */}
          <line x1="16" y1="22" x2="21" y2="22" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />

          {/* Rotating Crank / Pedal */}
          <g className="crank-rotate">
            <line x1="22" y1="34" x2="25" y2="38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="23" y1="38" x2="27" y2="38" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </g>

          {/* PERSON SITTING ON CYCLE & RIDING (Animated Bouncing/Pedaling) */}
          <g className="rider-group">
            {/* Cyclist Head with aerodynamic cap/helmet */}
            <circle cx="28" cy="9" r="4" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.2" />
            <path d="M26 6h4.5c1 0 1.5.5 1.7 1.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />

            {/* Torso leaning forward from saddle to neck */}
            <line x1="27" y1="13" x2="19.5" y2="22" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />

            {/* Arm reaching forward gripping handlebars */}
            <polyline points="25.5,14 31,17 35,17.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />

            {/* Leg: Hip on saddle -> Knee forward-down -> Foot on pedal */}
            <polyline points="19.5,22 25,27 24,35" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </g>

          {/* Speed & motion streaks */}
          <line x1="0" y1="31" x2="5" y2="31" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.6" />
          <line x1="2" y1="35" x2="7" y2="35" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.4" />
        </svg>
      </div>
    </div>
  );
};

export const CycleButton: React.FC<CycleButtonProps> = ({
  onCycle,
  isLoading,
  isOffline,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <View className="w-full max-w-lg mx-auto my-3 px-2 flex-col items-center relative z-10">
      <div
        className="w-full relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Pressable
          id="cycle-handle-primary-btn"
          onPress={onCycle}
          disabled={isLoading}
          accessibilityLabel="Cycle to next unique underground handle"
          accessibilityHint="Generates next unique suggestion. Shortcut: Space or Enter key."
          className={`w-full py-3.5 px-6 rounded-xl text-neutral-100 font-mono font-semibold tracking-wider uppercase border inline-flex items-center justify-center transition-all min-h-[52px] shadow-lg relative overflow-hidden select-none ${
            isLoading
              ? "bg-neutral-850 border-neutral-600 cursor-wait"
              : isHovered
              ? "bg-neutral-850 border-neutral-500 shadow-neutral-900/60"
              : "bg-neutral-900 hover:bg-neutral-850 active:bg-neutral-800 text-neutral-100 border-neutral-700/80 hover:border-neutral-500 active:border-neutral-400"
          }`}
        >
          {/* Subtle ground line track in the center when hovered */}
          <div
            className={`absolute bottom-2 left-10 right-10 h-[1.5px] bg-gradient-to-r from-transparent via-neutral-600 to-transparent transition-opacity duration-300 pointer-events-none ${
              isHovered && !isLoading ? "opacity-40" : "opacity-0"
            }`}
          />

          {isLoading ? (
            /* Loading State */
            <span className="text-neutral-200 font-mono font-bold uppercase tracking-wider text-base sm:text-lg select-none text-center relative z-10">
              Cycling...
            </span>
          ) : isHovered ? (
            /* Hover State: Text is hidden, only the person riding the moving cycle is visible in the middle */
            <CenteredMovingBicycle />
          ) : (
            /* Normal Default State: Clean text */
            <span className="text-neutral-100 font-mono font-bold uppercase tracking-wider text-base sm:text-lg select-none text-center relative z-10">
              Cycle Handle
            </span>
          )}
        </Pressable>
      </div>

      <Text
        baseSize={11}
        className="text-neutral-500 font-mono tracking-wide mt-2.5 text-center select-none"
      >
        {isOffline ? "Instant Offline Pool • Spacebar to cycle" : "Press Spacebar or Click to cycle"}
      </Text>
    </View>
  );
};
