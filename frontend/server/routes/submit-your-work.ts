export default defineEventHandler(async (event) => {
  // Magazine submissions
  await sendRedirect(event, "https://forms.gle/vWp1NQSizGfvtnVf6");
});