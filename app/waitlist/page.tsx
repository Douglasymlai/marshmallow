import type { Metadata } from "next";
import { StaticPage } from "@/components/StaticPage";

export const metadata: Metadata = { title: "Waitlist – Marshmallow" };

export default function WaitlistPage() {
  return (
    <StaticPage title="waitlist">
      <p>
        Marshmallow is being crafted quietly. Leave your email and we’ll
        write to you — <b>with a real letter feel</b> — when your seat is ready.
      </p>
      <p>
        <a href="mailto:hello@marshmallow.computer?subject=Waitlist">
          hello@marshmallow.computer
        </a>
      </p>
    </StaticPage>
  );
}
