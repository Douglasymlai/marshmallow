import type { Metadata } from "next";
import { StaticPage } from "@/components/StaticPage";

export const metadata: Metadata = { title: "Change Log – Marshmallow" };

export default function LogPage() {
  return (
    <StaticPage title="log">
      <dl>
        <dt>v0.1</dt>
        <dd>
          The first fold of the paper plane — landing story, brief, room,
          search, contributor wiki, and the sorting cabinet.
        </dd>
      </dl>
    </StaticPage>
  );
}
