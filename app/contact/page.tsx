import type { Metadata } from "next";
import { StaticPage } from "@/components/StaticPage";

export const metadata: Metadata = { title: "Contact – Marshmallow" };

export default function ContactPage() {
  return (
    <StaticPage title="contact">
      <dl>
        <dt>contact us</dt>
        <dd>
          <a href="mailto:hello@marshmallow.computer">
            hello@marshmallow.computer
          </a>
        </dd>
        <dt>github</dt>
        <dd>
          <a href="https://github.com" target="_blank" rel="noreferrer noopener">
            marshmallow
          </a>
        </dd>
        <dt>x</dt>
        <dd>
          <a href="https://x.com" target="_blank" rel="noreferrer noopener">
            @marshmallow
          </a>
        </dd>
        <dt>discord</dt>
        <dd>
          <a href="https://discord.com" target="_blank" rel="noreferrer noopener">
            Marshmallow
          </a>
        </dd>
      </dl>
    </StaticPage>
  );
}
