import { createFileRoute, Link } from "@tanstack/react-router";
import { AiDock, BackgroundGlow, FreeMark } from "@/components/app-chrome";
import { FaIcon } from "@/components/fa-icon";
import { getTool } from "@/lib/catalog";
import { renderTool } from "@/tools/registry";

export const Route = createFileRoute("/tool/$id")({ component: ToolPage });

function ToolPage() {
  const { id } = Route.useParams();
  const tool = getTool(id);
  if (!tool) {
    return (
      <div className="nx-room">
        <p>Tool tidak ada.</p>
        <Link to="/" className="nx-back">
          Kembali
        </Link>
      </div>
    );
  }
  return (
    <div>
      <BackgroundGlow />
      <FreeMark />
      <div className="nx-room">
        <header className="nx-room-head">
          <Link to="/" className="nx-back">
            <FaIcon name="fa-arrow-left" /> Kembali
          </Link>
          <div className="nx-room-title">
            <b>{tool.name}</b>
            <span>
              {tool.badge} · {tool.format}
            </span>
          </div>
          <span className="badge" style={{ marginLeft: "auto" }}>
            FREE
          </span>
        </header>
        {renderTool(tool.id)}
        <p className="nx-lead" style={{ marginTop: 16 }}>
          {tool.description} Semua tool di katalog ini gratis dan tidak minta login.
        </p>
      </div>
      <AiDock />
    </div>
  );
}
