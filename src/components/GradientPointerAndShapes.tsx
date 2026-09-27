import React, { useEffect, useState } from "react";

export const GradientPointerAndShapes: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: -200, y: -200 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isHovering) setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isHovering]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* 1. Dynamic Cursor-Following Gradient Glow Pointer */}
      <div
        className="fixed w-72 h-72 rounded-full transition-opacity duration-500 ease-out -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          opacity: isHovering ? 0.16 : 0,
          background:
            "radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, rgba(59, 130, 246, 0.25) 45%, rgba(0, 0, 0, 0) 70%)",
        }}
      />

      {/* Tiny sharp inner cursor focal accent */}
      <div
        className="fixed w-6 h-6 rounded-full transition-opacity duration-300 -translate-x-1/2 -translate-y-1/2 pointer-events-none blur-[1px]"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          opacity: isHovering ? 0.35 : 0,
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(147, 51, 234, 0.4) 50%, transparent 100%)",
        }}
      />

      {/* 2. Floating Ambient Aesthetic Shapes (Underground Geometry) */}
      {/* Top Left: Cyber Occult Hexagon with slow subtle pulse */}
      <div className="absolute -top-12 -left-12 w-64 h-64 border border-neutral-800/40 rounded-[38%] rotate-12 opacity-25 animate-[spin_40s_linear_infinite]" />
      <div className="absolute top-20 left-10 w-24 h-24 border border-dashed border-neutral-800/30 rounded-xl rotate-45 opacity-20" />

      {/* Top Right: Ethereal Void Eclipse Ring */}
      <div className="absolute top-8 -right-16 w-80 h-80 rounded-full border border-neutral-800/40 opacity-20 pointer-events-none" />
      <div className="absolute top-24 right-16 w-48 h-48 rounded-full border border-neutral-800/30 opacity-15" />
      <div className="absolute top-36 right-36 w-2 h-2 rounded-full bg-neutral-600/40 animate-ping" />

      {/* Bottom Left: Cipher Grid Matrix lines */}
      <div className="absolute bottom-16 left-8 opacity-20 flex flex-col gap-2">
        <div className="w-16 h-px bg-gradient-to-r from-neutral-600 to-transparent" />
        <div className="w-24 h-px bg-gradient-to-r from-neutral-600 to-transparent" />
        <div className="w-10 h-px bg-gradient-to-r from-neutral-600 to-transparent" />
      </div>

      {/* Bottom Right: Sacred Geometric Diamond & Orbit */}
      <div className="absolute -bottom-16 -right-12 w-72 h-72 border border-neutral-800/30 rotate-45 opacity-15" />
      <div className="absolute bottom-12 right-20 w-32 h-32 border border-dotted border-neutral-700/30 rounded-full opacity-20 animate-[spin_30s_linear_infinite]" />

      {/* Center Subtle Grid Matrix overlay */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
};
