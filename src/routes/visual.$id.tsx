import { createFileRoute, Link } from "@tanstack/react-router";
import { BackgroundGlow } from "@/components/app-chrome";
import { FaIcon } from "@/components/fa-icon";
import { VISUALS } from "@/lib/visuals";

export const Route = createFileRoute("/visual/$id")({ component: VisualPage });

function VisualPage() {
  const { id } = Route.useParams();
  const item = VISUALS.find((v) => v.id === id);
  return (
    <div>
      <BackgroundGlow />
      <div className="nx-room" style={{ maxWidth: 1100 }}>
        <header className="nx-room-head">
          <Link to="/" className="nx-back">
            <FaIcon name="fa-arrow-left" /> Katalog
          </Link>
          <div className="nx-room-title">
            <b>{item?.name ?? "Visual"}</b>
            <span>FAHMI Visual Website</span>
          </div>
        </header>
        {item ? (
          <iframe title={item.name} srcDoc={item.html} style={{ width: "100%", height: "70vh", border: 0, borderRadius: 20, background: "#030712" }} />
        ) : (
          <p>Visual tidak ditemukan.</p>
        )}
      </div>
    </div>
  );
}
