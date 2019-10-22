export const getUserName = (user: any) => {
  if (!user) return '';
  if (user.displayName) return user.displayName;
  if (user.email) return user.email.split('@')[0];
  return "Anonymous";
}
