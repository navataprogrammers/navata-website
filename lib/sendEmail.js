import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_qcnehvj";
const TEMPLATE_ID = "template_czdwi9d";
const PUBLIC_KEY = "r9COI73BbzYVEmBJ1";

/* "Handle user input " */
const sanitizeFormFields = (form) => {
  const elements = form.elements;
  for (let i = 0; i < elements.length; i++) {
    const el = elements[i];
    // text-based inputs and textareas
    if ((el.tagName === "TEXTAREA" || el.type === "text") && el.value) {
      el.value = el.value.replace(/\r\n|\r|\n/g, "\r\n");
    }
  }
};

export const sendEmail = async (formRef) => {
  if (!formRef?.current) {
    throw new Error("Form reference not found");
  }
  sanitizeFormFields(formRef.current);
  return emailjs.sendForm(
    SERVICE_ID,
    TEMPLATE_ID,
    formRef.current,
    PUBLIC_KEY
  );
};