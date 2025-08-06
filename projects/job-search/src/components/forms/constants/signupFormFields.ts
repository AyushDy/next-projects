export const ROLE_OPTIONS = [
  { value: "user", label: "User" },
  { value: "admin", label: "Admin" },
];

export const FORM_FIELDS = {
  username: {
    id: "username",
    name: "username",
    type: "text",
    label: "Username",
    placeholder: "Choose a username",
    required: true,
  },
  email: {
    id: "email",
    name: "email",
    type: "email",
    label: "Email Address",
    placeholder: "Enter your email",
    required: true,
  },
  password: {
    id: "password",
    name: "password",
    type: "password",
    label: "Password",
    placeholder: "Create a strong password",
    required: true,
  },
  role: {
    id: "role",
    name: "role",
    label: "Account Type",
  },
} as const;
