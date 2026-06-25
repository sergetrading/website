import type { Metadata } from "next";
import {
  LegalLayout,
  LegalHeading,
  Placeholder,
} from "@/components/ui/legal-layout";

export const metadata: Metadata = {
  title: "Privacy Policy · Crestmont Consulting Ltd",
  description: "Privacy policy of Crestmont Consulting Ltd.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout title="Privacy Policy">
      <p className="text-sm text-[hsl(var(--gray-300)/0.6)]">
        Note: this is a scaffold. Fields shown with a{" "}
        <Placeholder>highlight</Placeholder> are placeholders. Please have it
        reviewed and adapt it to your actual data processing before going live.
      </p>

      <section className="space-y-4">
        <LegalHeading>1. Controller</LegalHeading>
        <p>
          The controller responsible for data processing on this website is:
          <br />
          Crestmont Consulting Ltd
          <br />
          <Placeholder>Address</Placeholder>, Paphos, Cyprus
          <br />
          Email:{" "}
          <a
            href="mailto:info@crestmont.consulting"
            className="underline underline-offset-4 hover:text-[hsl(var(--foreground))]"
          >
            info@crestmont.consulting
          </a>
        </p>
      </section>

      <section className="space-y-4">
        <LegalHeading>2. Collection and storage of personal data</LegalHeading>
        <p>
          When you visit this website, the hosting provider automatically
          collects information (server log files) such as your IP address, the
          date and time of access and the browser used. This processing serves
          to ensure secure and stable operation and is based on Art. 6(1)(f)
          GDPR.
        </p>
        <p>
          Hosting provider:{" "}
          <Placeholder>Name &amp; address of the host</Placeholder>.
        </p>
      </section>

      <section className="space-y-4">
        <LegalHeading>3. Contacting us</LegalHeading>
        <p>
          If you contact us by email, the information you provide will be stored
          in order to process your request (Art. 6(1)(b) and (f) GDPR). We will
          not share this data without your consent.
        </p>
      </section>

      <section className="space-y-4">
        <LegalHeading>4. Cookies &amp; analytics</LegalHeading>
        <p>
          <Placeholder>
            If cookies, web analytics or tracking are used, add the purpose,
            provider and legal basis here. Otherwise: “This website does not use
            cookies or tracking.”
          </Placeholder>
        </p>
      </section>

      <section className="space-y-4">
        <LegalHeading>5. Your rights</LegalHeading>
        <p>
          You have the right to access, rectify, erase, restrict processing of
          and port your data, as well as to object. You also have the right to
          lodge a complaint with the competent data protection authority (
          <Placeholder>
            Office of the Commissioner for Personal Data Protection, Cyprus
          </Placeholder>
          ).
        </p>
      </section>

      <section className="space-y-4">
        <LegalHeading>6. Status</LegalHeading>
        <p>
          Last updated: <Placeholder>Month / Year</Placeholder>.
        </p>
      </section>
    </LegalLayout>
  );
}
