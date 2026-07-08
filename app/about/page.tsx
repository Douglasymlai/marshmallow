import type { Metadata } from "next";
import { StaticPage } from "@/components/StaticPage";

export const metadata: Metadata = { title: "About – Marshmallow" };

export default function AboutPage() {
  return (
    <StaticPage title="about">
      <p>
        Marshmallow is a tool that <b>simplifies</b> how you run your{" "}
        <b>repos</b>. Starting from your <b>notifications</b>.
      </p>
      <p>
        We care because we are <b>makers of tools</b> – tools that do their job
        quietly.
      </p>
      <p>
        We see beauty in these ordinary things we use everyday.
        <br />
        From <b>terminals</b> we type in to <b>repos</b> we tend.
        <br />
        From <b>pens</b> we write with to <b>roads</b> we drive on.
        <br />
        From <b>buildings</b> we live in to <b>software</b> we use.
      </p>
      <p>
        We hope <b>marshmallow</b> can become one of these ordinary things in
        your life!
      </p>
    </StaticPage>
  );
}
