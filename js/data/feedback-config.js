/* ============================================================
   FWRD feedback survey configuration.

   The survey itself is a Google Form (owned by fwrdmed@gmail.com)
   embedded in the Feedback page. To connect it:
   1. Create the form (see FWRD_Validation_Survey_v2_GoogleForm_spec.md).
   2. Click "Send" in Google Forms → the link icon → copy the URL
      (it looks like https://docs.google.com/forms/d/e/XXXX/viewform).
   3. Paste it into formUrl below. That's it — the app handles the rest.
   ============================================================ */
window.FWRD = window.FWRD || {};

FWRD.feedbackConfig = {
  formUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfZ4HN0fS7KVD5UE29uWEXZuZZc-teQ82lCE-p6tSYdPkBcaQ/viewform",
  formHeight: 2400,            // embed height in px (raise if the form gets longer)
  email: "fwrdmed@gmail.com",  // fallback contact while formUrl is empty
  minutes: 3                   // advertised time commitment
};
