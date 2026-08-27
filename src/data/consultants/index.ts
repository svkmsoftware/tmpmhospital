import type { Doctor } from "@/types";
import darshanaPawara from "./darshana-pawara";
import shivramPawara from "./shivram-pawara";
import vaishnaviZile from "./vaishnavi-zile";
import dhirajRane from "./dhiraj-rane";
import sagarPatil from "./sagar-patil";
import girishVadgaonkar from "./girish-vadgaonkar";
import bhagyeshWankhede from "./bhagyesh-wankhede";
import ashwinBaviskar from "./ashwin-baviskar";
import girishChaudhary from "./girish-chaudhary";
import darshanRakhecha from "./darshan-rakhecha";
import manasiSonar from "./manasi-sonar";
import nainaChaudhari from "./naina-chaudhari";
import prashantKhairnar from "./prashant-khairnar";
import sagarMore from "./sagar-more";
import sandeepOswal from "./sandeep-oswal";
import subhamPatil from "./subham-patil";
import dishaBiswas from "./disha-biswas";

// One file per consultant — to add a new doctor, create a new file next to
// these (copy one as a template, pick the next free id) and list it here.
export const consultants: Doctor[] = [
  darshanaPawara,
  shivramPawara,
  vaishnaviZile,
  dhirajRane,
  sagarPatil,
  girishVadgaonkar,
  bhagyeshWankhede,
  ashwinBaviskar,
  girishChaudhary,
  darshanRakhecha,
  manasiSonar,
  nainaChaudhari,
  prashantKhairnar,
  sagarMore,
  sandeepOswal,
  subhamPatil,
  dishaBiswas,
];
