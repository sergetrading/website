import type { Metadata } from "next";
import {
  LegalLayout,
  LegalHeading,
  Placeholder,
} from "@/components/ui/legal-layout";

export const metadata: Metadata = {
  title: "Legal Notice · Crestmont Consulting Ltd",
  description: "Legal notice and company disclosure of Crestmont Consulting Ltd.",
};

export default function LegalNoticePage() {
  return (
    <LegalLayout title="Legal Notice">
      <p className="text-sm text-[hsl(var(--gray-300)/0.6)]">
        Note: fields shown with a <Placeholder>highlight</Placeholder> are
        placeholders and must be replaced with your real details before going
        live.
      </p>

      <section className="space-y-4">
        <LegalHeading>Company details</LegalHeading>
        <p>
          Crestmont Consulting Ltd
          <br />
          <Placeholder>Street &amp; number</Placeholder>
          <br />
          <Placeholder>Postal code</Placeholder> Paphos
          <br />
          Cyprus
        </p>
      </section>

      <section className="space-y-4">
        <LegalHeading>Represented by</LegalHeading>
        <p>
          <Placeholder>Name of the director</Placeholder>
        </p>
      </section>

      <section className="space-y-4">
        <LegalHeading>Contact</LegalHeading>
        <p>
          Email:{" "}
          <a
            href="mailto:info@crestmont.consulting"
            className="underline underline-offset-4 hover:text-[hsl(var(--foreground))]"
          >
            info@crestmont.consulting
          </a>
          <br />
          Phone: <Placeholder>Phone number</Placeholder>
        </p>
      </section>

      <section className="space-y-4">
        <LegalHeading>Company registration</LegalHeading>
        <p>
          Registry:{" "}
          <Placeholder>Department of Registrar of Companies, Cyprus</Placeholder>
          <br />
          Registration number:{" "}
          <Placeholder>HE number</Placeholder>
        </p>
      </section>

      <section className="space-y-4">
        <LegalHeading>VAT</LegalHeading>
        <p>
          VAT identification number:{" "}
          <Placeholder>VAT / TIC number</Placeholder>
        </p>
      </section>

      <section className="space-y-4">
        <LegalHeading>Responsible for content</LegalHeading>
        <p>
          <Placeholder>
            Name &amp; address of the person responsible for the content
          </Placeholder>
        </p>
      </section>
    </LegalLayout>
  );
}
