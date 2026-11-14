"use server";
import { Resend } from 'resend';


export type ContactState = {
    status: "idle" | "success" | "error";
    message: string;
    errors?: { name?: string; email?: string; message?: string };
    // Sent back on error so the form keeps what the user typed
    values?: { name: string; email: string; message: string };
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendContact(
    _prev: ContactState,
    formData: FormData,
): Promise<ContactState> {
    // Honeypot: humans never see this field, bots fill everything.
    // We answer "success" so the bot learns nothing.
    if (formData.get("company")) {
        return { status: "success", message: "Thanks, your message was sent." };
    }

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const values = { name, email, message };

    const errors: NonNullable<ContactState["errors"]> = {};
    if (name.length < 2 || name.length > 100) errors.name = "Please enter your name.";
    if (!EMAIL_RE.test(email) || email.length > 200) errors.email = "Please enter a valid email.";
    if (message.length < 10 || message.length > 5000) {
        errors.message = "Please write a few more words (10 to 5000 characters).";
    }
    if (Object.keys(errors).length > 0) {
        return { status: "error", message: "Please fix the highlighted fields.", errors, values };
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL;
    if (!apiKey || !to) {
        console.error("Contact form: RESEND_API_KEY or CONTACT_TO_EMAIL is missing");
        return { status: "error", message: "The form is not available right now.", values };
    }

    try {
        const { error } = await new Resend(apiKey).emails.send({
            // Works without a verified domain, but only delivers to your own Resend account email
            from: "Portfolio <onboarding@resend.dev>",
            to,
            replyTo: email, // pressing "Reply" answers the visitor directly
            subject: `Portfolio message from ${name.replace(/[\r\n]+/g, " ")}`,
            text: `From: ${name} <${email}>\n\n${message}`,
        });
        if (error) throw new Error(error.message);
    } catch (err) {
        console.error("Contact form: send failed", err);
        return { status: "error", message: "Something went wrong. Please try again.", values };
    }

    return { status: "success", message: "Thanks, your message was sent." };
}