// src/utils/auth.ts
export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};
