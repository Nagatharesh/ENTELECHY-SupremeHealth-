
import type { LucideProps } from 'lucide-react';
import React from 'react';

// Assuming you have a way to get the list of icon names.
// This could be from a file, a script that generates this file, etc.
type IconName = "User" | "Bell" | "PanelLeft" | "MessageSquare" | "Droplets" | "X" | "Search" | "BrainCircuit" | "HeartPulse" | "Map" | "Dna" | "Award" | "Briefcase" | "Star" | "TrendingUp" | "UserCheck" | "Users" | "CheckCircle" | "Bot" | "Paperclip" | "Send" | "Video" | "Phone" | "List" | "Pencil" | "Loader2" | "Building" | "FlaskConical" | "BarChart3" | "AlertTriangle" | "BedDouble" | "DollarSign" | "Calendar" | "ExternalLink" | "HelpCircle" | "Siren" | "LogOut";

// This creates a type for the dynamic component.
type Icon = React.FC<LucideProps>;

// This maps the icon names to their component type.
declare module "lucide-react" {
  export const User: Icon;
  export const Bell: Icon;
  export const PanelLeft: Icon;
  export const MessageSquare: Icon;
  export const Droplets: Icon;
  export const X: Icon;
  export const Search: Icon;
  export const BrainCircuit: Icon;
  export const HeartPulse: Icon;
  export const Map: Icon;
  export const Dna: Icon;
  export const Award: Icon;
  export const Briefcase: Icon;
  export const Star: Icon;
  export const TrendingUp: Icon;
  export const UserCheck: Icon;
  export const Users: Icon;
  export const CheckCircle: Icon;
  export const Bot: Icon;
  export const Paperclip: Icon;
  export const Send: Icon;
  export const Video: Icon;
  export const Phone: Icon;
  export const List: Icon;
  export const Pencil: Icon;
  export const Loader2: Icon;
  export const Building: Icon;
  export const FlaskConical: Icon;
  export const BarChart3: Icon;
  export const AlertTriangle: Icon;
  export const BedDouble: Icon;
  export const DollarSign: Icon;
  export const Calendar: Icon;
  export const ExternalLink: Icon;
  export const HelpCircle: Icon;
  export const Siren: Icon;
  export const LogOut: Icon;

  // Add all other icons you use here...
  // You can script this part to avoid manual work.
  // For example, read from lucide-react/dist/esm/icons and generate this file.
  
  // As a fallback for icons not explicitly listed:
  export const default: Record<IconName, Icon>;
}
