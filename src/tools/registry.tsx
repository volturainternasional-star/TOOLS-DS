import type { ReactNode } from "react";
import {
  AiChatTool,
  AiImageTool,
  AnimeDiscover,
  ComicReader,
  DanbooruTool,
  Downloader,
  GenMail,
  GetCode,
  IpTool,
  PromptVision,
  SpaceTool,
  VirusScan,
  VoiceStudio,
  WebIntel,
} from "@/tools/net-tools";
import {
  AlightPack,
  AutoPdf,
  AvatarStudio,
  CalcTool,
  CertTool,
  Classics,
  DeployCheck,
  EktpTool,
  Enhancer,
  FakeLobby,
  FakeOvo,
  FotoLink,
  HtmlVideo,
  MlTools,
  MorseTool,
  NokiaMsg,
  PdfLab,
  PlaceholderStudio,
  PwGenTool,
  QrTool,
  QuoteTool,
  RemoveBg,
  SmartCutout,
  SvgAlight,
  TikTokQuote,
  TiktokHdPrep,
  UnbanWa,
  Vectorizer,
  WebEncrypt,
  WinQuotes,
} from "@/tools/local-tools";
import { BmkgTool, CapitalAgent, CryptoAnalisa, CryptoTool, DataHub, FreeMusicTool, MarketPulse, SahamDesk } from "@/tools/live-tools";

export function renderTool(id: string): ReactNode {
  switch (id) {
    case "aiodownloader":
      return <Downloader hint="Tempel link TikTok, YouTube, Instagram, atau Spotify." />;
    case "terabox":
      return <Downloader hint="Tempel link share Terabox. Unduhan file besar tergantung ketersediaan host." />;
    case "instagram":
      return <Downloader hint="Tempel URL reel/post Instagram." />;
    case "tiktok":
      return <Downloader hint="Tempel URL TikTok. Provider tikwm dipakai jika tersedia." />;
    case "youtube":
      return <Downloader hint="Tempel URL YouTube. Metadata oEmbed selalu dicoba." />;
    case "spotify":
      return <Downloader hint="Tempel URL track/playlist Spotify." />;
    case "htmlvideo":
      return <HtmlVideo />;
    case "avatarstudio":
      return <AvatarStudio />;
    case "sertifikat":
      return <CertTool />;
    case "ektp":
      return <EktpTool />;
    case "fakelobby":
      return <FakeLobby />;
    case "winquotes":
      return <WinQuotes />;
    case "nokiamsg":
      return <NokiaMsg />;
    case "mltools":
      return <MlTools />;
    case "comicreader":
      return <ComicReader />;
    case "multiai":
      return <AiChatTool title="FAHMI Multi-AI" system="Kamu hub AI FAHMI. Jawab dengan struktur: Ringkas, Langkah, Risiko." />;
    case "aiimage":
      return <AiImageTool />;
    case "aivideo":
      return <AiImageTool prefix="cinematic storyboard still, 16:9, motion implied, " />;
    case "genmail":
      return <GenMail />;
    case "danbooru":
      return <DanbooruTool />;
    case "animegallery":
      return <AnimeDiscover />;
    case "animetoreal":
      return <AiImageTool prefix="photorealistic reinterpretation of an anime still, natural skin, photography, " />;
    case "aisong":
      return <AiChatTool title="AI Song" system="Tuliskan judul, mood, struktur verse/chorus, dan lirik lengkap bilingual." />;
    case "elevenlabs":
      return <VoiceStudio />;
    case "promptgenerate":
      return <PromptVision />;
    case "novelcover":
      return <AiImageTool prefix="premium novel cover, typography space at top, painted, dramatic lighting, " />;
    case "fakeovo":
      return <FakeOvo />;
    case "quotegenerator":
      return <QuoteTool />;
    case "carifakta":
      return <AiChatTool title="CariFakta" system="Analisis klaim: ringkas klaim, bukti yang perlu dicek, kemungkinan bias, verdik tentatif." />;
    case "virusscan":
      return <VirusScan />;
    case "cryptomarket":
      return <CryptoTool />;
    case "cryptoanalisa":
      return <CryptoAnalisa />;
    case "marketpulse":
      return <MarketPulse />;
    case "sahamdesk":
      return <SahamDesk />;
    case "capitalagent":
      return <CapitalAgent />;
    case "datahub":
      return <DataHub />;
    case "freemusic":
      return <FreeMusicTool />;
    case "webintel":
      return <WebIntel />;
    case "ipintel":
      return <IpTool />;
    case "bmkg":
      return <BmkgTool />;
    case "spaceexplorer":
      return <SpaceTool />;
    case "ocrintel":
      return <PromptVision />;
    case "documentai":
      return <AiChatTool title="Document AI" system="Ringkas dokumen user, ekstrak poin, tabel, dan pertanyaan lanjutan." />;
    case "autopdf":
      return <AutoPdf />;
    case "pdflab":
      return <PdfLab />;
    case "svgalight":
      return <SvgAlight />;
    case "alightpremium":
      return <AlightPack kind="alightpremium" />;
    case "imagevectorizer":
      return <Vectorizer />;
    case "fotolink":
      return <FotoLink />;
    case "smartcutout":
      return <SmartCutout />;
    case "placeholderstudio":
      return <PlaceholderStudio />;
    case "text2d":
      return <AlightPack kind="text2d" />;
    case "text3d":
      return <AlightPack kind="text3d" />;
    case "textfxanimation":
      return <AlightPack kind="textfxanimation" />;
    case "textvector":
      return <AlightPack kind="textvector" />;
    case "trimpath":
      return <AlightPack kind="trimpath" />;
    case "logoanimate":
      return <AlightPack kind="logoanimate" />;
    case "calc":
      return <CalcTool />;
    case "pwgen":
      return <PwGenTool />;
    case "morse":
      return <MorseTool />;
    case "removebg":
      return <RemoveBg />;
    case "enhancer":
      return <Enhancer />;
    case "worldclassics":
      return <Classics />;
    case "ttquote":
      return <TikTokQuote />;
    case "qrgen":
      return <QrTool />;
    case "tiktokhd":
      return <TiktokHdPrep />;
    case "getcode":
      return <GetCode />;
    case "vdeploy":
      return <DeployCheck />;
    case "zxvai":
      return <AiChatTool title="ZxVAI" system="Kamu ZxVAI, workspace AI FAHMI yang tajam dan teknis." />;
    case "webencryption":
      return <WebEncrypt />;
    case "unbanwa":
      return <UnbanWa />;
    default:
      return <p>Tool tidak ditemukan.</p>;
  }
}
