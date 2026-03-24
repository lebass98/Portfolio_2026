import * as lucide from 'lucide-react';
const icons = ['MessageSquare', 'Users', 'PenTool', 'CheckCircle2', 'Monitor', 'Book', 'Calendar', 'Gift', 'Heart', 'Stethoscope', 'Smile', 'Coffee', 'Terminal', 'Layout', 'Smartphone', 'Database', 'ChevronRight', 'Plus'];
const missing = icons.filter(i => !lucide[i]);
console.log('Missing icons:', missing);
