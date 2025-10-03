
import type { LucideProps } from 'lucide-react';
import React from 'react';

// Assuming you have a way to get the list of icon names.
// This could be from a file, a script that generates this file, etc.
type IconName = "User" | "Bell" | "PanelLeft" | "MessageSquare" | "Droplets" | "Dna" | "X" | "Search" | "BrainCircuit" | "Siren" | "HeartPulse" | "Map";

// This creates a type for the dynamic component.
type Icon = React.FC<LucideProps>;

// This maps the icon names to their component type.
declare module "lucide-react" {
  export const User: Icon;
  export const Bell: Icon;
  export const PanelLeft: Icon;
  export const MessageSquare: Icon;
  export const Droplets: Icon;
  export const Dna: Icon;
  export const X: Icon;
  export const Search: Icon;
  export const BrainCircuit: Icon;
  export const Siren: Icon;
  export const HeartPulse: Icon;
  export const Map: Icon;

  // Add all other icons you use here...
  // You can script this part to avoid manual work.
  // For example, read from lucide-react/dist/esm/icons and generate this file.
  
  // As a fallback for icons not explicitly listed:
  export const default: Record<IconName, Icon>;
}
