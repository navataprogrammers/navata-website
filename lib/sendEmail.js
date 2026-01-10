import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_qcnehvj";
const TEMPLATE_ID = "template_czdwi9d";
const PUBLIC_KEY = "r9COI73BbzYVEmBJ1";

export const sendEmail = async (formRef) => {
  if (!formRef?.current) {
    throw new Error("Form reference not found");
  }

  return emailjs.sendForm(
    SERVICE_ID,
    TEMPLATE_ID,
    formRef.current,
    PUBLIC_KEY
  );
};
