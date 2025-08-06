/* 
Button Component Usage Examples

import Button from "@/components/UI/Button";
import { Plus, Save, Trash2, Edit, Eye } from "lucide-react";

// Basic usage examples:

// 1. Primary button with text
<Button variant="primary">Click Me</Button>

// 2. Button with icon and text
<Button variant="primary" icon={Plus} iconPosition="left">
  Add Item
</Button>

// 3. Icon-only button
<Button variant="ghost" icon={Eye} size="sm" />

// 4. Loading button
<Button 
  variant="primary" 
  isLoading={true} 
  loadingText="Saving..."
>
  Save
</Button>

// 5. Full width button
<Button variant="success" fullWidth>
  Submit Form
</Button>

// 6. Different variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="success">Success</Button>
<Button variant="danger">Danger</Button>
<Button variant="warning">Warning</Button>
<Button variant="ghost">Ghost</Button>

// 7. Different sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// 8. Custom classes
<Button variant="primary" className="my-custom-class">
  Custom Styled
</Button>

// 9. Form submission
<Button type="submit" variant="primary" isLoading={submitting}>
  {submitting ? "Submitting..." : "Submit"}
</Button>

// 10. Icon on right
<Button variant="secondary" icon={Save} iconPosition="right">
  Save Document
</Button>

*/

export {};
