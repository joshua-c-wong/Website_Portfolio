/**
 * All site text lives here. Edit this file to update the portfolio.
 *
 * Project media:
 *   1. Put files in  public/projects/<slug>/
 *   2. List them below, e.g.  images: ["/projects/revit-automation-tool/sheet-set.jpg"]
 *   3. For a 3D model set  model: "/projects/<slug>/model.glb"  (.glb, .gltf, .stl or .obj)
 */
import kcbLogo from "@/assets/logos/klohn-crippen-berger.png";
import properMeasureLogo from "@/assets/logos/proper-measure.png";
import autocadIcon from "@/assets/software/autocad.svg";
import revitIcon from "@/assets/software/revit.svg";
import dynamoIcon from "@/assets/software/dynamo.png";
import civil3dIcon from "@/assets/software/civil-3d.svg";
import bluebeamIcon from "@/assets/software/bluebeam.svg";
import excelIcon from "@/assets/software/excel.svg";

export const profile = {
  name: "Joshua Wong",
  tagline: "Architecture & Building Technology · BCIT",
  location: "Vancouver, BC",
  links: [
    { label: "Resume", href: "/Joshua_Wong_Resume.pdf", external: true },
    { label: "Email", href: "mailto:wjosh8857@gmail.com", external: false },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/joshua-c-wong", external: true },
  ],
};

export const about = {
  paragraphs: [
    "Hey, I'm Josh! I'm studying Architectural & Building Technology at BCIT, where most of my time goes into Revit and AutoCAD.",
    "I'm also big on cinematography, soccer and bouldering!",
  ],
};

export type Experience = {
  company: string;
  role: string;
  team?: string;
  period: string;
  description: string;
  url: string;
  logo: string;
  logoClassName?: string;
};

export const experience: Experience[] = [
  {
    company: "Klohn Crippen Berger",
    role: "Structural Drafting Technologist Practicum",
    period: "Mar 2025",
    description: "Structural drawing QA & code compliance",
    url: "https://www.klohn.com",
    logo: kcbLogo,
  },
  {
    company: "Proper Measure",
    role: "As-Built Drafting Technician",
    period: "Apr – Aug 2024",
    description: "Schematic floor plans & Matterport interactive tours",
    url: "https://www.propermeasure.com",
    logo: properMeasureLogo,
  },
];

export type Project = {
  slug: string;
  name: string;
  tech: string;
  period: string;
  summary: string;
  details: string[];
  /** Small image shown beside the project in the list (optional) */
  thumbnail?: string;
  /** Gallery images, e.g. "/projects/<slug>/01.jpg" */
  images: string[];
  /** Optional 3D model: .glb, .gltf, .stl or .obj */
  model?: string;
};

export const projects: Project[] = [
  {
    slug: "revit-automation-tool",
    name: "Revit API & Automation Tool",
    tech: "Dynamo, Python, Revit",
    period: "Jun 2026",
    summary:
      "A Dynamo and Python script that batch-generates Revit sheets and syncs parameters from Excel tracking sheets.",
    details: [
      "Engineered a Dynamo and Python script to automate batch-generation of Revit sheets, eliminating manual entry and saving hours of setup.",
      "Integrated external Excel tracking spreadsheets directly into the Revit database to auto-assign parameters, ensuring 100% data consistency.",
      "Programmed robust error handling in the Python code to bypass empty datasets, preventing crashes and keeping the workflow stable.",
    ],
    images: [],
  },
  {
    slug: "conceptual-design-to-bim",
    name: "Conceptual Design to BIM Integration",
    tech: "AutoCAD, Revit",
    period: "Jan 2025",
    summary:
      "Took a virtual concept from 2D AutoCAD drawings through to a full 3D BIM model in Revit.",
    details: [
      "Drafted comprehensive 2D technical drawings in AutoCAD, translating complex virtual geometry into precise floor, roof and elevation plans.",
      "Translated virtual design elements into constructible real-world metrics by determining ceiling heights and structural wall spans.",
      "Built a complete 3D BIM model in Revit from the initial 2D drafts to visualise spatial relationships and building massing.",
    ],
    images: [],
  },
  {
    slug: "tilt-up-quality-check",
    name: "Structural Tilt-Up Quality Check",
    tech: "AutoCAD",
    period: "Feb 2025",
    summary:
      "A detailed QA audit of a multi-sheet drawing package for a concrete tilt-up building.",
    details: [
      "Performed a detailed quality assurance audit on a multi-sheet AutoCAD drawing package for a concrete tilt-up building.",
      "Analysed the structural drawing set to catch critical design discrepancies, ensuring all components met building standards.",
      "Cross-referenced floor plans, elevations and structural connection details for consistency across the entire package.",
    ],
    images: [],
  },
];

/** Software icons shown in the Skills section (greyscale until hovered) */
export const software: { name: string; icon: string }[] = [
  { name: "AutoCAD", icon: autocadIcon },
  { name: "Revit", icon: revitIcon },
  { name: "Dynamo", icon: dynamoIcon },
  { name: "Civil 3D", icon: civil3dIcon },
  { name: "Bluebeam Revu", icon: bluebeamIcon },
  { name: "Excel", icon: excelIcon },
];

export const skills: { group: string; items: string }[] = [
  { group: "Drafting & BIM", items: "AutoCAD (2D/3D), Revit (Architecture/Structure), Dynamo, Civil 3D" },
  { group: "Document Control", items: "Bluebeam Revu, Microsoft Office (Excel, Word, Teams)" },
];

export const footer = {
  // Short tagline after the copyright, like the example's "served with rice"
  tagline: "drawn to scale",
};
