export default defineEventHandler(async (event) => {
  // Magazine submissions
  await sendRedirect(event, "https://forms.gle/N8DKzTNSeCopWZng9");
});