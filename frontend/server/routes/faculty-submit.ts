export default defineEventHandler(async (event) => {
  // Magazine submissions
  await sendRedirect(event, "https://forms.gle/vtXD4Dh13bTsQJKz5");
});
