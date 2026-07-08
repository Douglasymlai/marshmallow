"use client";

import { Stage } from "./engine";
import { Chrome } from "./Chrome";
import { Hero } from "./scenes/Hero";
import { Brief } from "./scenes/Brief";
import { Room } from "./scenes/Room";
import { Search } from "./scenes/Search";
import { People } from "./scenes/People";
import { Sorting } from "./scenes/Sorting";
import { FooterScene } from "./scenes/FooterScene";

export function Landing() {
  return (
    <Stage>
      <Hero />
      <Brief />
      <Room />
      <Search />
      <People />
      <Sorting />
      <FooterScene />
      <Chrome />
    </Stage>
  );
}
