import { useState, useEffect, useCallback, useRef } from "react";

const REZY_LOGO = "data:image/jpeg;base64,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";
// ─── Design Tokens ────────────────────────────────────────────────────────────
const C = {
  forest:      "#1D5C2E",
  forestDark:  "#163f20",
  forestMid:   "#2a7a3e",
  orange:      "#E07020",
  orangeLight: "#f08030",
  cream:       "#D8EDD8",
  creamDark:   "#B8CEB8",
  creamMid:    "#C8DEC8",
  charcoal:    "#111811",   // darker — near black with green tint
  muted:       "#2d4a33",   // dark forest green — readable on light green bg
  mutedLight:  "#4a6a50",   // medium — for secondary labels
  white:       "#ffffff",
  red:         "#c0392b",
  blue:        "#1a5fa8",
  pageBg:      "#E4EEE4",
  cardBg:      "#F4FAF4",
  headerBg:    "#F4FAF4",
  headerBorder:"#B8CEB8",
  navActive:   "#1D5C2E",
  navInactive: "#3a5a40",   // darker than before — clearly readable
};

// ─── i18n — Bilingual Dictionary ─────────────────────────────────────────────
const TRANSLATIONS = {
  en: {
    // Nav
    dashboard: "Dashboard", newBatch: "New Batch", verify: "Verify",
    records: "Records", settings: "Settings", signOut: "Sign out",
    // Login
    selectRole: "Select your role", enterPin: "Enter 4-digit PIN",
    signInAs: "Sign in as", wrongPin: "Wrong PIN. Try again.",
    demoPins: "Demo PINs — Admin: 1234 · Operator: 5678 · VVB: 9012 · Buyer: 3456",
    mrvPlatform: "MRV Platform",
    // Roles
    roleAdmin: "Admin", roleOperator: "Hub Operator", roleVerifier: "VVB Verifier", roleBuyer: "EPR Buyer",
    roleAdminDesc: "Full access — Rezycology HQ",
    roleOperatorDesc: "Hub Depok-01 — data entry only",
    roleVerifierDesc: "SCS Global Services — verification only",
    roleBuyerDesc: "EPR Sponsor — read-only credit view",
    // Dashboard
    totalPlasticLogged: "Total Plastic Logged", creditsIssued: "Credits Issued",
    totalBatches: "Total Batches", awaitingVerification: "Awaiting Verification",
    chainStatus: "Chain Status · End-to-End", recentBatches: "Recent Batches",
    noBatchesYet: "No batches yet.", goToNewBatch: "Go to New Batch to log your first collection.",
    livePilot: "Live pilot · PPRS v8 · Signed in as",
    // Stages
    stageCollection: "Collection", stageTransport: "Transport",
    stageProcessing: "Processing", stageVerification: "Verification", stageCredit: "Credit",
    chainOfCustody: "PPRS v8 Chain of Custody",
    // Stage 1
    stage1Title: "Stage 1 — Collection Data",
    stage1Note: "PPRS v8: Record feedstock type, gross weight, weighing equipment ID, and collector identity for every batch.",
    feedstockType: "Feedstock Type", grossWeight: "Gross Weight (kg)",
    collector: "Collector / Worker", weighingEquip: "Weighing Equipment",
    collectionDate: "Collection Date", notes: "Notes / Field Observations",
    notesPlaceholder: "Condition of batch, contamination notes, etc.",
    collectionPhoto: "Collection Photo (PPRS evidence)",
    creditEstimate: "pending full chain + VVB",
    logCollection: "Log Collection →",
    // Stage 2
    stage2Title: "Stage 2 — Transport Documentation",
    transportRef: "Transport Manifest Ref.", transportDate: "Transport Date",
    transportRefPlaceholder: "e.g. MNF-DPK-2026-041",
    transportPhoto: "Transport Photo (vehicle, loading, manifest)",
    confirmTransport: "Confirm Transport →",
    // Stage 3
    stage3Title: "Stage 3 — End-of-Waste Processing",
    landfillWarning: "⚠ PPRS v8 Global Standard: End-of-Waste is reached when the material undergoes a qualifying recovery operation and meets all four criteria: (1) commonly used substance, (2) market/demand exists, (3) meets technical standards, (4) no adverse environmental impact. Landfill and open burning are excluded.",
    processingFacility: "Processing Facility", eowProcess: "End-of-Waste Process",
    processingEndDate: "Processing End Date",
    processingFacilityPlaceholder: "e.g. PT Daur Ulang Nusantara",
    processingPhoto: "Processing Photo (facility, sorting, output)",
    confirmProcessing: "Confirm Processing →",
    // Stage 4
    stage4Title: "Stage 4 — VVB Impact Verification",
    stage4Note: "PPRS v8 mandates a third-party VVB approved by PCX Solutions. The VVB reviews chain-of-custody records before credits can be issued.",
    chainSummary: "Chain of Custody Summary",
    vvbLabel: "VVB (Verra-Approved)", vvbAuditRef: "VVB Audit Reference No.",
    vvbAuditPlaceholder: "e.g. SCS-2026-IDN-0044",
    eprBuyer: "EPR Credit Buyer",
    confirmVerification: "Confirm VVB Verification →",
    // Stage 5
    stage5Title: "Stage 5 — Plastic Credit Issuance",
    creditsToBeIssued: "Credits to be Issued (PPRS v8)",
    fullChainVerified: "Full chain verified: Collection → Transport → End-of-Waste → VVB sign-off.",
    buyer: "Buyer", verifier: "Verifier",
    marketPrice: "Market price reference: $106–$804 per MT (PCX marketplace, 2024). Price set by project partner.",
    issueCredit: "Issue Plastic Credit 🎉",
    creditRequiresAdmin: "Credit issuance requires Admin role.",
    // Verify tab
    verificationQueue: "Verification Queue", verifySubtitle: "Batches awaiting VVB review",
    noPendingVerification: "No batches pending verification.",
    custodyTrail: "Chain of Custody Trail",
    approve: "Approve →", reject: "Reject", viewDetails: "View Details",
    // Records
    batchRecords: "Batch Records", addNewBatch: "+ New Batch",
    batchId: "Batch ID", feedstock: "Feedstock", weight: "Weight",
    status: "Status", loggedAt: "Logged At", collectionGps: "Collection GPS",
    // Reject modal
    rejectBatch: "Reject Batch",
    rejectNote: "Provide a reason. This will be logged and visible to the hub operator.",
    rejectionReason: "Rejection Reason",
    rejectionPlaceholder: "e.g. Contamination detected, weighing equipment calibration expired…",
    confirmReject: "Confirm Reject", cancel: "Cancel",
    // Detail drawer
    evidencePhotos: "Evidence Photos",
    rejectionReasonLabel: "Rejection Reason",
    viewPCC: "View PCC", close: "Close",
    // Cert modal
    plasticCreditCert: "Plastic Credit Certificate",
    certNote: "Prototype PCC — binding issuance requires PPRS Registry + VVB sign-off.",
    print: "Print",
    // Settings
    settingsTitle: "Settings", settingsSubtitle: "Hub configuration · Admin only",
    sheetsIntegration: "Google Sheets Integration",
    sheetsDesc: "Every batch action syncs automatically to your Google Sheet when a URL is configured.",
    setupSteps: "Setup Steps (do once)",
    appsScriptUrl: "Apps Script Web App URL",
    testConnection: "Test Connection", saveUrl: "Save URL",
    connectionSuccess: "Connection successful! ✓", connectionFailed: "Connection failed — check URL",
    bulkSync: "Bulk Sync All Batches",
    rolePins: "Role Access PINs",
    pinNote: "To change PINs, update the ROLES constant in source. Use a proper auth system for production scale.",
    dataManagement: "Data Management",
    batchesStored: "batches stored", persistent: "Persistent across sessions.",
    exportJson: "Export JSON Backup", clearData: "Clear All Data",
    confirmClear: "Delete ALL batch data? Cannot be undone.",
    jsonExported: "JSON backup exported.", dataCleared: "All data cleared.",
    // Geo / map
    locationPin: "Location — Tap map to pin",
    pinSet: "Pin set", tapToOpenMap: "Tap to open map and drop pin",
    searchPlace: "Search place… (e.g. Pasar Depok)",
    dragToAdjust: "drag pin to adjust", tapMapToDrop: "Tap the map to drop a pin",
    confirm: "Confirm ✓", loadingMap: "Loading map…",
    // Activity log
    activityLog: "Activity Log",
    locationNotCaptured: "Location not captured",
    noLocation: "No location",
    // Toasts
    gettingLocation: "Getting location…",
    saving: "Saving…",
    syncingSheets: "📊 Syncing to Sheets…",
    syncedSheets: "📊 Synced to Sheets ✓",
    syncFailed: "📊 Sheets sync failed",
    // Status labels
    statusCollection: "Collection", statusTransport: "Transport",
    statusProcessing: "Processing", statusVerified: "Verified",
    statusCredited: "Credit Issued", statusRejected: "Rejected",
    // Misc
    remove: "Remove", go: "Go", out: "Out",
    hubDepok: "Hub Depok-01",
  },
  id: {
    // Nav
    dashboard: "Dasbor", newBatch: "Batch Baru", verify: "Verifikasi",
    records: "Riwayat", settings: "Pengaturan", signOut: "Keluar",
    // Login
    selectRole: "Pilih peran Anda", enterPin: "Masukkan PIN 4 digit",
    signInAs: "Masuk sebagai", wrongPin: "PIN salah. Coba lagi.",
    demoPins: "PIN Demo — Admin: 1234 · Operator: 5678 · VVB: 9012 · Pembeli: 3456",
    mrvPlatform: "Platform MRV",
    // Roles
    roleAdmin: "Admin", roleOperator: "Operator Hub", roleVerifier: "Verifikator VVB", roleBuyer: "Pembeli EPR",
    roleAdminDesc: "Akses penuh — Rezycology HQ",
    roleOperatorDesc: "Hub Depok-01 — input data saja",
    roleVerifierDesc: "SCS Global Services — verifikasi saja",
    roleBuyerDesc: "Sponsor EPR — hanya lihat kredit",
    // Dashboard
    totalPlasticLogged: "Total Plastik Tercatat", creditsIssued: "Kredit Diterbitkan",
    totalBatches: "Total Batch", awaitingVerification: "Menunggu Verifikasi",
    chainStatus: "Status Rantai · End-to-End", recentBatches: "Batch Terbaru",
    noBatchesYet: "Belum ada batch.", goToNewBatch: "Buka Batch Baru untuk mencatat koleksi pertama.",
    livePilot: "Pilot langsung · PPRS v8 · Masuk sebagai",
    // Stages
    stageCollection: "Pengumpulan", stageTransport: "Pengangkutan",
    stageProcessing: "Pemrosesan", stageVerification: "Verifikasi", stageCredit: "Kredit",
    chainOfCustody: "Rantai Penjagaan PPRS v8",
    // Stage 1
    stage1Title: "Tahap 1 — Data Pengumpulan",
    stage1Note: "PPRS v8: Catat jenis bahan baku, berat kotor, ID alat timbang, dan identitas pengumpul untuk setiap batch.",
    feedstockType: "Jenis Bahan Baku", grossWeight: "Berat Kotor (kg)",
    collector: "Pengumpul / Pekerja", weighingEquip: "Alat Timbang",
    collectionDate: "Tanggal Pengumpulan", notes: "Catatan / Observasi Lapangan",
    notesPlaceholder: "Kondisi batch, catatan kontaminasi, dll.",
    collectionPhoto: "Foto Pengumpulan (bukti PPRS)",
    creditEstimate: "menunggu rantai lengkap + VVB",
    logCollection: "Catat Pengumpulan →",
    // Stage 2
    stage2Title: "Tahap 2 — Dokumentasi Pengangkutan",
    transportRef: "Referensi Manifes Angkutan", transportDate: "Tanggal Angkutan",
    transportRefPlaceholder: "mis. MNF-DPK-2026-041",
    transportPhoto: "Foto Pengangkutan (kendaraan, muat, manifes)",
    confirmTransport: "Konfirmasi Pengangkutan →",
    // Stage 3
    stage3Title: "Tahap 3 — Pemrosesan Akhir Limbah",
    landfillWarning: "⚠ PPRS v8: Tempat pembuangan akhir tidak memenuhi syarat sebagai aktivitas Akhir Limbah.",
    processingFacility: "Fasilitas Pemrosesan", eowProcess: "Proses Akhir Limbah",
    processingEndDate: "Tanggal Selesai Proses",
    processingFacilityPlaceholder: "mis. PT Daur Ulang Nusantara",
    processingPhoto: "Foto Pemrosesan (fasilitas, sortir, output)",
    confirmProcessing: "Konfirmasi Pemrosesan →",
    // Stage 4
    stage4Title: "Tahap 4 — Verifikasi Dampak VVB",
    stage4Note: "PPRS v8 mengharuskan VVB pihak ketiga yang disetujui PCX Solutions. VVB meninjau catatan rantai penjagaan sebelum kredit dapat diterbitkan.",
    chainSummary: "Ringkasan Rantai Penjagaan",
    vvbLabel: "VVB (Disetujui Verra)", vvbAuditRef: "No. Referensi Audit VVB",
    vvbAuditPlaceholder: "mis. SCS-2026-IDN-0044",
    eprBuyer: "Pembeli Kredit EPR",
    confirmVerification: "Konfirmasi Verifikasi VVB →",
    // Stage 5
    stage5Title: "Tahap 5 — Penerbitan Kredit Plastik",
    creditsToBeIssued: "Kredit yang Akan Diterbitkan (PPRS v8)",
    fullChainVerified: "Rantai lengkap terverifikasi: Pengumpulan → Angkutan → Akhir Limbah → Tanda tangan VVB.",
    buyer: "Pembeli", verifier: "Verifikator",
    marketPrice: "Referensi harga pasar: $106–$804 per MT (PCX marketplace, 2024). Harga ditetapkan oleh mitra proyek.",
    issueCredit: "Terbitkan Kredit Plastik 🎉",
    creditRequiresAdmin: "Penerbitan kredit memerlukan peran Admin.",
    // Verify tab
    verificationQueue: "Antrean Verifikasi", verifySubtitle: "Batch menunggu tinjauan VVB",
    noPendingVerification: "Tidak ada batch yang menunggu verifikasi.",
    custodyTrail: "Jejak Rantai Penjagaan",
    approve: "Setujui →", reject: "Tolak", viewDetails: "Lihat Detail",
    // Records
    batchRecords: "Riwayat Batch", addNewBatch: "+ Batch Baru",
    batchId: "ID Batch", feedstock: "Bahan Baku", weight: "Berat",
    status: "Status", loggedAt: "Dicatat Pada", collectionGps: "GPS Pengumpulan",
    // Reject modal
    rejectBatch: "Tolak Batch",
    rejectNote: "Berikan alasan. Ini akan dicatat dan terlihat oleh operator hub.",
    rejectionReason: "Alasan Penolakan",
    rejectionPlaceholder: "mis. Kontaminasi terdeteksi, kalibrasi alat timbang kedaluwarsa…",
    confirmReject: "Konfirmasi Tolak", cancel: "Batal",
    // Detail drawer
    evidencePhotos: "Foto Bukti",
    rejectionReasonLabel: "Alasan Penolakan",
    viewPCC: "Lihat PCC", close: "Tutup",
    // Cert modal
    plasticCreditCert: "Sertifikat Kredit Plastik",
    certNote: "Prototipe PCC — penerbitan mengikat memerlukan Registri PPRS + tanda tangan VVB.",
    print: "Cetak",
    // Settings
    settingsTitle: "Pengaturan", settingsSubtitle: "Konfigurasi hub · Admin saja",
    sheetsIntegration: "Integrasi Google Sheets",
    sheetsDesc: "Setiap tindakan batch disinkronkan otomatis ke Google Sheet Anda saat URL dikonfigurasi.",
    setupSteps: "Langkah Pengaturan (lakukan sekali)",
    appsScriptUrl: "URL Web App Apps Script",
    testConnection: "Uji Koneksi", saveUrl: "Simpan URL",
    connectionSuccess: "Koneksi berhasil! ✓", connectionFailed: "Koneksi gagal — periksa URL",
    bulkSync: "Sinkron Semua Batch",
    rolePins: "PIN Akses Peran",
    pinNote: "Untuk mengubah PIN, perbarui konstanta ROLES di kode sumber.",
    dataManagement: "Manajemen Data",
    batchesStored: "batch tersimpan", persistent: "Persisten antar sesi.",
    exportJson: "Ekspor Cadangan JSON", clearData: "Hapus Semua Data",
    confirmClear: "Hapus SEMUA data batch? Tidak dapat dibatalkan.",
    jsonExported: "Cadangan JSON diekspor.", dataCleared: "Semua data dihapus.",
    // Geo / map
    locationPin: "Lokasi — Ketuk peta untuk pin",
    pinSet: "Pin terpasang", tapToOpenMap: "Ketuk untuk membuka peta dan pasang pin",
    searchPlace: "Cari tempat… (mis. Pasar Depok)",
    dragToAdjust: "seret pin untuk menyesuaikan", tapMapToDrop: "Ketuk peta untuk memasang pin",
    confirm: "Konfirmasi ✓", loadingMap: "Memuat peta…",
    // Activity log
    activityLog: "Log Aktivitas",
    locationNotCaptured: "Lokasi tidak tertangkap",
    noLocation: "Tidak ada lokasi",
    // Toasts
    gettingLocation: "Mendapatkan lokasi…",
    saving: "Menyimpan…",
    syncingSheets: "📊 Menyinkron ke Sheets…",
    syncedSheets: "📊 Tersinkron ke Sheets ✓",
    syncFailed: "📊 Sinkron Sheets gagal",
    // Status labels
    statusCollection: "Pengumpulan", statusTransport: "Pengangkutan",
    statusProcessing: "Pemrosesan", statusVerified: "Terverifikasi",
    statusCredited: "Kredit Diterbitkan", statusRejected: "Ditolak",
    // Misc
    remove: "Hapus", go: "Cari", out: "Keluar",
    hubDepok: "Hub Depok-01",
  },
};

function useT(lang) {
  return (key) => TRANSLATIONS[lang]?.[key] ?? TRANSLATIONS.en[key] ?? key;
}
const ROLES = {
  admin: {
    label: "Admin",
    name: "Bregas Satria",
    pin: "1234",
    color: C.forest,
    access: ["dashboard", "log", "records", "settings"],
    desc: "Full access — Rezycology HQ",
  },
  operator: {
    label: "Hub Operator",
    name: "Operator Depok",
    pin: "5678",
    color: C.orange,
    access: ["dashboard", "log", "records"],
    desc: "Hub Depok-01 — data entry only",
  },

};

// ─── Reference Data ───────────────────────────────────────────────────────────
const FEEDSTOCK_TYPES = [
  "PET (Rigid)", "HDPE (Rigid)", "LDPE (Flexible)",
  "PP (Mixed)", "PS", "LVP – Flexibles",
  "LVP – Multi-layer", "Mixed Post-Consumer Plastic",
];
// PPRS v8 Global Standard — End-of-Waste definitions
// EoW is reached when plastic waste has undergone a recovery operation and meets
// specific criteria: the substance is commonly used, a market or demand exists,
// it meets technical requirements and applicable standards, and its use will not
// lead to adverse environmental or human health impacts.
const EOW_PROCESSES = [
  "Mechanical Recycling — Material reprocessed into pellets/flakes for new products (EoW reached at output of washing/extrusion line)",
  "Chemical Recycling — Depolymerisation or pyrolysis back to monomers/feedstock (EoW at certified output)",
  "Co-processing — Used as alternative fuel or raw material in cement kilns (EoW at point of kiln acceptance)",
  "Energy Recovery — Incineration with energy recovery under R1 efficiency threshold (not preferred; no credit for landfill diversion only)",
];
const EPR_BUYERS = [
  "Unilever Indonesia", "Danone AQUA", "Indofood",
  "Nestle Indonesia", "P&G Indonesia",
];
const VVB_BODIES = [
  "SCS Global Services (Verra-Approved VVB)",
  "PT Sucofindo – Persero (Indonesian LVV)",
];
const COLLECTORS = [
  "WRK-001 – Pak Suharto", "WRK-002 – Bu Wati",
  "WRK-003 – Pak Deden", "WRK-004 – Bu Rina",
  "WRK-005 – Pak Agus",
];
const SCALES = ["SCL-DPK-01", "SCL-DPK-02"];

// ─── Utilities ────────────────────────────────────────────────────────────────
function uid() { return Date.now().toString(36).toUpperCase() + Math.random().toString(36).slice(2,5).toUpperCase(); }
function nowISO() { return new Date().toISOString(); }
function parseDate(val) {
  if (!val) return null;
  // Handle DD/MM/YYYY format (e.g. "24/3/2026" or "24/03/2026")
  if (typeof val === "string" && /^\d{1,2}\/\d{1,2}\/\d{4}/.test(val)) {
    const [d, m, y] = val.split("/");
    return new Date(+y, +m - 1, +d);
  }
  // Handle DD/MM/YYYY, HH.MM.SS format (e.g. "24/3/2026, 14.08.57")
  if (typeof val === "string" && /^\d{1,2}\/\d{1,2}\/\d{4},/.test(val)) {
    const [datePart, timePart] = val.split(", ");
    const [d, m, y] = datePart.split("/");
    const [h, min, s] = (timePart || "0.0.0").split(".");
    return new Date(+y, +m - 1, +d, +h, +min, +(s||0));
  }
  // ISO and everything else
  const d = new Date(val);
  return isNaN(d.getTime()) ? null : d;
}
function fmtDate(val) {
  if (!val) return "—";
  // Extract YYYY-MM-DD parts directly to avoid UTC→local timezone shift on date-only fields
  if (typeof val === "string") {
    const m = val.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (m) {
      const d = new Date(+m[1], +m[2] - 1, +m[3]);
      return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    }
  }
  const d = parseDate(val);
  if (!d) return "—";
  try {
    return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  } catch { return d.toDateString(); }
}
function fmtDateTime(val) {
  if (!val) return "—";
  const d = parseDate(val);
  if (!d) return "—";
  try {
    // Use individual options — dateStyle/timeStyle not supported on older Safari
    return d.toLocaleString("en-GB", {
      day: "2-digit", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
  } catch { return d.toLocaleString(); }
}
function kgToTonnes(kg) { return +(Number(kg) / 1000).toFixed(4); }

// ─── Geolocation ──────────────────────────────────────────────────────────────
// Auto-attempts GPS. Returns null if blocked (e.g. sandboxed iframe) — UI falls back to manual input.
function getGeo(manualLat, manualLng) {
  // Accept either separate args or a {lat,lng} object
  const lat = typeof manualLat === "object" ? manualLat?.lat : manualLat;
  const lng = typeof manualLat === "object" ? manualLat?.lng : manualLng;
  if (lat && lng && !isNaN(Number(lat)) && !isNaN(Number(lng))) {
    return Promise.resolve({
      lat: +Number(lat).toFixed(6),
      lng: +Number(lng).toFixed(6),
      accuracy: null,
      manual: true,
      ts: new Date().toISOString(),
    });
  }
  return new Promise((resolve) => {
    if (!navigator.geolocation) { resolve(null); return; }
    navigator.geolocation.getCurrentPosition(
      pos => resolve({
        lat: +pos.coords.latitude.toFixed(6),
        lng: +pos.coords.longitude.toFixed(6),
        accuracy: Math.round(pos.coords.accuracy),
        manual: false,
        ts: new Date().toISOString(),
      }),
      () => resolve(null),
      { timeout: 5000, maximumAge: 60000 }
    );
  });
}
function fmtGeo(geo) {
  if (!geo) return "No location";
  const tag = geo.manual ? "manual" : `±${geo.accuracy}m`;
  return `${geo.lat}, ${geo.lng} (${tag})`;
}
function geoUrl(geo) {
  if (!geo) return null;
  return `https://www.google.com/maps?q=${geo.lat},${geo.lng}`;
}

// ─── Map Picker Component ─────────────────────────────────────────────────────
// Uses Leaflet + OpenStreetMap — no API key needed, fully free
// Tap anywhere on map to drop pin and capture coordinates
function MapPicker({ value, onChange, lang = "en" }) {
  const t = useT(lang);
  const mapRef = useRef(null);
  const leafletMapRef = useRef(null);
  const markerRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);

  // Default center: Depok, Indonesia
  const DEFAULT_LAT = -6.4025;
  const DEFAULT_LNG = 106.7942;

  const hasPin = value.lat != null && value.lat !== "" && !isNaN(Number(value.lat))
              && value.lng != null && value.lng !== "" && !isNaN(Number(value.lng));

  // Pre-seed with hub default on first render so geo is always captured
  useEffect(() => {
    if (!value.lat || !value.lng || isNaN(Number(value.lat))) {
      onChange({ lat: DEFAULT_LAT, lng: DEFAULT_LNG });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function buildIcon(L) {
    return L.divIcon({
      html: `<div style="width:24px;height:24px;background:${C.forest};border:3px solid #fff;border-radius:50% 50% 50% 0;transform:rotate(-45deg);box-shadow:0 2px 8px rgba(0,0,0,0.3)"></div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 24],
      className: "",
    });
  }

  function initMap() {
    const L = window.L;
    if (!L || !mapRef.current) return;

    // Destroy previous instance if exists
    if (leafletMapRef.current) {
      leafletMapRef.current.remove();
      leafletMapRef.current = null;
      markerRef.current = null;
    }

    // Use existing pin coords or default to Depok center
    const initLat = hasPin ? Number(value.lat) : DEFAULT_LAT;
    const initLng = hasPin ? Number(value.lng) : DEFAULT_LNG;

    const map = L.map(mapRef.current, { zoomControl: true }).setView([initLat, initLng], 16);
    leafletMapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap",
      maxZoom: 19,
    }).addTo(map);

    const icon = buildIcon(L);

    // Always drop a pin immediately — at existing coords or default center
    const pinLat = hasPin ? Number(value.lat) : DEFAULT_LAT;
    const pinLng = hasPin ? Number(value.lng) : DEFAULT_LNG;
    markerRef.current = L.marker([pinLat, pinLng], { icon, draggable: true }).addTo(map);
    markerRef.current.on("dragend", e => {
      const p = e.target.getLatLng();
      onChange({ lat: +p.lat.toFixed(6), lng: +p.lng.toFixed(6) });
    });

    // If no existing pin, set value to Depok center so user sees coordinates
    if (!hasPin) {
      onChange({ lat: DEFAULT_LAT, lng: DEFAULT_LNG });
    }

    map.on("click", e => {
      const newLat = +e.latlng.lat.toFixed(6);
      const newLng = +e.latlng.lng.toFixed(6);
      onChange({ lat: newLat, lng: newLng });
      markerRef.current.setLatLng([newLat, newLng]);
    });

    setTimeout(() => { map.invalidateSize(); setReady(true); }, 150);
  }

  useEffect(() => {
    if (!open) return;
    setReady(false);

    if (window.L) {
      setTimeout(initMap, 50);
      return;
    }

    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";
      document.head.appendChild(link);
    }

    if (!document.getElementById("leaflet-js")) {
      const script = document.createElement("script");
      script.id = "leaflet-js";
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";
      script.onload = () => setTimeout(initMap, 50);
      document.head.appendChild(script);
    } else {
      setTimeout(initMap, 50);
    }
  }, [open]);

  async function handleSearch() {
    if (!search.trim()) return;
    setSearching(true);
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(search + " Indonesia")}&format=json&limit=1`);
      const data = await res.json();
      if (data[0]) {
        const lat = +Number(data[0].lat).toFixed(6);
        const lng = +Number(data[0].lon).toFixed(6);
        onChange({ lat, lng });
        if (leafletMapRef.current) leafletMapRef.current.setView([lat, lng], 16);
      }
    } catch {}
    setSearching(false);
  }

  return (
    <div>
      <Lbl>{t("locationPin")}</Lbl>

      {/* Pin preview / open button */}
      <div
        onClick={() => {
          setOpen(true);
          setTimeout(() => {
            if (leafletMapRef.current) leafletMapRef.current.invalidateSize();
          }, 150);
        }}
        style={{
          border: `1.5px solid ${hasPin ? C.forest : C.creamDark}`,
          borderRadius: 10, padding: "10px 14px", cursor: "pointer",
          background: hasPin ? "#e8f5e9" : C.cream,
          display: "flex", alignItems: "center", gap: 10,
          marginBottom: open ? 10 : 0,
          transition: "all 0.2s",
        }}
      >
        <span style={{ fontSize: 18 }}>📍</span>
        <div style={{ flex: 1 }}>
          {hasPin ? (
            <>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.forest }}>Pin set</div>
              <div style={{ fontSize: 11, color: C.muted, fontFamily: "'DM Mono', monospace" }}>
                {Number(value.lat).toFixed(6)}, {Number(value.lng).toFixed(6)}
              </div>
            </>
          ) : (
            <div style={{ fontSize: 13, color: C.muted }}>Tap to open map and drop pin</div>
          )}
        </div>
        {hasPin && (
          <a
            href={`https://www.google.com/maps?q=${value.lat},${value.lng}`}
            target="_blank" rel="noreferrer"
            onClick={e => e.stopPropagation()}
            style={{ fontSize: 11, color: C.forest, fontWeight: 600, textDecoration: "none" }}
          >
            GMaps ↗
          </a>
        )}
      </div>

      {/* Inline map panel */}
      {open && (
        <div style={{ borderRadius: 12, overflow: "hidden", border: `1.5px solid ${C.forest}`, marginBottom: 8 }}>
          {/* Search bar */}
          <div style={{ background: C.forest, padding: "8px 10px", display: "flex", gap: 6 }}>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSearch()}
              placeholder="Search place… (e.g. Pasar Depok)"
              style={{
                flex: 1, padding: "7px 10px", borderRadius: 7, border: "none",
                fontSize: 12, fontFamily: "inherit", outline: "none",
                background: "rgba(255,255,255,0.95)", color: C.charcoal,
              }}
            />
            <button onClick={handleSearch} disabled={searching} style={{
              background: C.orange, color: "#fff", border: "none",
              borderRadius: 7, padding: "7px 12px", fontSize: 12,
              fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
            }}>
              {searching ? "…" : "Go"}
            </button>
            <button onClick={() => setOpen(false)} style={{
              background: "rgba(255,255,255,0.15)", color: "#fff", border: "none",
              borderRadius: 7, padding: "7px 10px", fontSize: 12,
              cursor: "pointer", fontFamily: "inherit",
            }}>✕</button>
          </div>

          {/* Map container — position relative so we can overlay the GPS button */}
          <div style={{ position: "relative" }}>
            <div ref={mapRef} style={{ height: 280, width: "100%", background: "#e8e4dc" }}>
              {!ready && (
                <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: C.muted, fontSize: 13 }}>
                  Loading map…
                </div>
              )}
            </div>

            {/* GPS "locate me" button — bottom right, like Google Maps */}
            <button
              onClick={async () => {
                if (!navigator.geolocation) {
                  alert("GPS not available on this device/browser.");
                  return;
                }
                navigator.geolocation.getCurrentPosition(
                  pos => {
                    const lat = +pos.coords.latitude.toFixed(6);
                    const lng = +pos.coords.longitude.toFixed(6);
                    onChange({ lat, lng });
                    if (leafletMapRef.current) {
                      leafletMapRef.current.setView([lat, lng], 17);
                      if (markerRef.current) markerRef.current.setLatLng([lat, lng]);
                    }
                  },
                  err => {
                    // GPS blocked — fall back: ask user to tap the map
                    alert("Location access denied. Please tap the map to set your pin manually.");
                  },
                  { timeout: 8000, enableHighAccuracy: true }
                );
              }}
              style={{
                position: "absolute", bottom: 12, right: 12, zIndex: 1000,
                width: 42, height: 42, borderRadius: 10,
                background: "#fff", border: "none",
                boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 20,
              }}
              title="Use my current location"
            >
              📡
            </button>
          </div>

          {/* Instruction + confirm */}
          <div style={{ background: C.pageBg, padding: "10px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 11, color: C.muted }}>
              {hasPin
                ? `📍 ${Number(value.lat).toFixed(5)}, ${Number(value.lng).toFixed(5)} — drag pin to adjust`
                : t("tapMapToDrop")}
            </span>
            {hasPin && (
              <button onClick={() => setOpen(false)} style={{
                background: C.forest, color: "#fff", border: "none",
                borderRadius: 7, padding: "6px 14px", fontSize: 12,
                fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
              }}>Confirm ✓</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Activity Log ─────────────────────────────────────────────────────────────
// Each entry: { stage, actor, ts, geo, note }
function makeActivity(stage, actor, geo, note = "") {
  return { stage, actor, ts: nowISO(), geo: geo || null, note };
}

function generateSerial({ procType, vvb, tonnes, seq }) {
  const d = new Date().toISOString().slice(0,10).replace(/-/g,"");
  const pc = procType?.startsWith("Mechanical") ? "MR" : procType?.startsWith("Chemical") ? "CR" : procType?.startsWith("Co-processing") ? "CP" : "ER";
  const vc = vvb?.includes("SCS") ? "SCS" : "SUCO";
  return `PPRS8-${d}-AGG-${pc}-${d}-${d}-IDN-${vc}-REZY-${d}-${String(seq).padStart(4,"0")}-REZY-DPK-PC-${d}-${vc}-${tonnes}MT`;
}

// ─── Storage helpers ──────────────────────────────────────────────────────────
const STORAGE_KEY = "rezy-mrv-batches-depok";
const SETTINGS_KEY = "rezy-mrv-settings";

async function loadBatches() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

async function saveBatches(batches) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(batches));
    return true;
  } catch { return false; }
}

async function loadSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

async function saveSettings(s) {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(s));
  } catch {}
}

// ─── Load batches from Google Sheet ──────────────────────────────────────────
// Fetches all batch rows from Sheet on app load — enables multi-device sync
async function loadBatchesFromSheet(sheetsUrl) {
  if (!sheetsUrl) return null;
  try {
    const url = `${sheetsUrl}?action=get_batches`;
    const res = await fetch(url);
    const json = await res.json();
    if (json.ok && Array.isArray(json.batches) && json.batches.length > 0) {
      return json.batches.map(b => ({ ...b, id: b.id || b.batchId, activities: b.activities || [] }));
    }
    return null;
  } catch { return null; }
}

// ─── Photo Compression ────────────────────────────────────────────────────────
// Compresses a base64 photo to a tiny thumbnail (~3-5KB)
// 120x120px, JPEG quality 0.3 — enough to identify batch visually
function compressPhoto(dataUrl, maxSize = 120, quality = 0.3) {
  return new Promise((resolve) => {
    if (!dataUrl) { resolve(null); return; }
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ratio = Math.min(maxSize / img.width, maxSize / img.height);
      canvas.width  = Math.round(img.width  * ratio);
      canvas.height = Math.round(img.height * ratio);
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/jpeg", quality));
    };
    img.onerror = () => resolve(null);
    img.src = dataUrl;
  });
}

// Sends photos as separate GET requests (one per photo type)
async function syncPhotosToSheets(sheetsUrl, batch) {
  if (!sheetsUrl) return;
  const photos = [
    { field: "photoDataUrl",            label: "collection" },
    { field: "transportPhotoDataUrl",   label: "transport"  },
    { field: "processingPhotoDataUrl",  label: "processing" },
  ];
  for (const p of photos) {
    if (!batch[p.field]) continue;
    try {
      const compressed = await compressPhoto(batch[p.field]);
      if (!compressed) continue;
      const payload = {
        action: "upsert_photo",
        batchId: batch.batchId,
        photoType: p.label,
        photoData: compressed,
      };
      const encoded = encodeURIComponent(JSON.stringify(payload));
      // Only send if URL length is manageable (~10KB limit for photos)
      if (encoded.length < 15000) {
        await fetch(`${sheetsUrl}?data=${encoded}`, { method: "GET", mode: "no-cors" });
      }
    } catch {}
  }
}

// ─── Google Sheets Sync ───────────────────────────────────────────────────────
function stripForSheets(batch) {
  return {
    batchId:           batch.batchId,
    hub:               batch.hub,
    status:            batch.status,
    feedstockType:     batch.feedstockType,
    weightKg:          batch.weightKg,
    collectorId:       batch.collectorId,
    weighingEquipId:   batch.weighingEquipId,
    collectionDate:    batch.collectionDate,
    transportRef:      batch.transportRef,
    transportDate:     batch.transportDate,
    processor:         batch.processor,
    eowProcess:        batch.eowProcess,
    processingEndDate: batch.processingEndDate,
    vvb:               batch.vvb,
    verifierRef:       batch.verifierRef,
    eprBuyer:          batch.eprBuyer,
    creditsTonnes:     batch.creditsTonnes,
    pprsSerial:        (batch.pprsSerial || "").slice(0, 120),
    issuedAt:          batch.issuedAt,
    rejectionReason:   batch.rejectionReason,
    loggedBy:          batch.loggedBy,
    createdAt:         batch.createdAt,
    collectionLat:     batch.activities?.[0]?.geo?.lat || "",
    collectionLng:     batch.activities?.[0]?.geo?.lng || "",
    // Include activities with stage, timestamp, and GPS only
    activities: (batch.activities || []).map(a => ({
      stage: a.stage,
      actor: (a.actor || "").slice(0, 50),
      ts:    a.ts,
      geo:   a.geo ? { lat: a.geo.lat, lng: a.geo.lng } : null,
    })),
  };
}

async function syncToSheets(sheetsUrl, batch, activity) {
  if (!sheetsUrl || !sheetsUrl.startsWith("https://")) return { ok: false };
  try {
    const payload = {
      action: "upsert_batch",
      batch: stripForSheets(batch),
      activity: activity ? {
        stage: activity.stage,
        actor: (activity.actor || "").slice(0, 50),
        ts: activity.ts,
        note: (activity.note || "").slice(0, 80),
        geo: activity.geo ? { lat: activity.geo.lat, lng: activity.geo.lng } : null,
      } : null,
    };
    const encoded = encodeURIComponent(JSON.stringify(payload));
    const url = `${sheetsUrl}?data=${encoded}`;
    const finalUrl = url.length > 3800
      ? `${sheetsUrl}?data=${encodeURIComponent(JSON.stringify({ ...payload, activity: null }))}`
      : url;
    await fetch(finalUrl, { method: "GET", mode: "no-cors" });
    // no-cors always returns opaque — treat any non-throw as success
    // Verify by checking the Sheet directly
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

async function testSheetsConnection(sheetsUrl) {
  if (!sheetsUrl) return false;
  try {
    await fetch(sheetsUrl, { mode: "no-cors" });
    return true;
  } catch { return false; }
}

// ─── UI Atoms ─────────────────────────────────────────────────────────────────
function Lbl({ children, required }) {
  return (
    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", color: C.charcoal, marginBottom: 5 }}>
      {children}{required && <span style={{ color: C.orange }}> *</span>}
    </div>
  );
}

function Inp({ label, type = "text", value, onChange, placeholder, required, disabled }) {
  const [focus, setFocus] = useState(false);
  return (
    <div>
      {label && <Lbl required={required}>{label}</Lbl>}
      <input type={type} value={value ?? ""} onChange={e => onChange(e.target.value)}
        placeholder={placeholder} disabled={disabled}
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        style={{
          width: "100%", padding: "9px 12px", borderRadius: 8, boxSizing: "border-box",
          border: `1.5px solid ${focus ? C.forest : C.creamDark}`,
          background: disabled ? C.creamMid : C.white,
          fontSize: 13, color: C.charcoal, outline: "none", fontFamily: "inherit",
          transition: "border-color 0.2s",
        }} />
    </div>
  );
}

function Sel({ label, value, onChange, options, required, disabled }) {
  return (
    <div>
      {label && <Lbl required={required}>{label}</Lbl>}
      <select value={value ?? ""} onChange={e => onChange(e.target.value)} disabled={disabled}
        style={{
          width: "100%", padding: "9px 12px", borderRadius: 8, boxSizing: "border-box",
          border: `1.5px solid ${C.creamDark}`, background: disabled ? C.creamMid : C.white,
          fontSize: 13, color: C.charcoal, outline: "none", fontFamily: "inherit", appearance: "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%231D5C2E'/%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center",
        }}>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function Btn({ children, onClick, disabled, variant = "primary", small, full }) {
  const v = {
    primary:   { bg: C.forest,   color: "#fff",      border: "none" },
    accent:    { bg: C.orange,   color: "#fff",      border: "none" },
    secondary: { bg: "transparent", color: C.forest, border: `2px solid ${C.forest}` },
    ghost:     { bg: C.creamMid, color: C.charcoal,  border: `1px solid ${C.creamDark}` },
    danger:    { bg: C.red,      color: "#fff",      border: "none" },
    blue:      { bg: C.blue,     color: "#fff",      border: "none" },
  }[variant];
  return (
    <button onClick={onClick} disabled={disabled} style={{
      background: v.bg, color: v.color, border: v.border,
      borderRadius: 9, padding: small ? "5px 13px" : "10px 22px",
      fontSize: small ? 11 : 13, fontWeight: 700,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1, transition: "all 0.15s",
      fontFamily: "inherit", width: full ? "100%" : "auto",
      letterSpacing: 0.2,
    }}>{children}</button>
  );
}

// ─── Signature Pad ────────────────────────────────────────────────────────────
function SignaturePad({ label, value, onChange }) {
  const canvasRef = useRef(null);
  const drawing   = useRef(false);
  const [has, setHas] = useState(!!value);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (value) {
      const img = new Image();
      img.onload = () => ctx.drawImage(img, 0, 0);
      img.src = value;
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function pos(e) {
    const r = canvasRef.current.getBoundingClientRect();
    const s = e.touches ? e.touches[0] : e;
    return {
      x: (s.clientX - r.left) * (canvasRef.current.width  / r.width),
      y: (s.clientY - r.top)  * (canvasRef.current.height / r.height),
    };
  }
  function start(e) { e.preventDefault(); drawing.current = true; const ctx = canvasRef.current.getContext("2d"); const p = pos(e); ctx.beginPath(); ctx.moveTo(p.x, p.y); }
  function move(e)  { e.preventDefault(); if (!drawing.current) return; const ctx = canvasRef.current.getContext("2d"); const p = pos(e); ctx.lineTo(p.x, p.y); ctx.strokeStyle = C.forest; ctx.lineWidth = 2.5; ctx.lineCap = "round"; ctx.lineJoin = "round"; ctx.stroke(); }
  function end(e)   { e.preventDefault(); if (!drawing.current) return; drawing.current = false; const d = canvasRef.current.toDataURL("image/png"); setHas(true); onChange(d); }
  function clear()  { const ctx = canvasRef.current.getContext("2d"); ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height); setHas(false); onChange(null); }

  const ts = has ? new Date().toLocaleString("id-ID") : null;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <Lbl>{label || "Digital Signature"}</Lbl>
        {has && <button onClick={clear} style={{ background: "none", border: "none", color: C.red, fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Clear ↺</button>}
      </div>
      <div style={{ border: `2px solid ${has ? C.forest : C.creamDark}`, borderRadius: 10, background: "#fff", position: "relative", transition: "border-color 0.2s" }}>
        <canvas ref={canvasRef} width={600} height={150}
          onMouseDown={start} onMouseMove={move} onMouseUp={end} onMouseLeave={end}
          onTouchStart={start} onTouchMove={move} onTouchEnd={end}
          style={{ width: "100%", height: 90, display: "block", borderRadius: 8, touchAction: "none", cursor: "crosshair" }}
        />
        {!has && (
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
            <span style={{ color: "#c8d8c8", fontSize: 13, fontWeight: 600 }}>✍ Sign here</span>
          </div>
        )}
      </div>
      {has && <div style={{ fontSize: 11, color: C.forest, marginTop: 4, fontWeight: 600 }}>✓ Signed — {ts}</div>}
    </div>
  );
}

function Badge({ status, lang = "en" }) {
  const t = useT(lang);
  const m = {
    collection: { bg: "#fff3e0", color: "#b87020", key: "statusCollection" },
    transport:  { bg: "#e8f0ff", color: "#1a5fa8", key: "statusTransport" },
    processing: { bg: "#fef3c7", color: "#92600a", key: "statusProcessing" },
    verified:   { bg: "#dcfce7", color: "#166534", key: "statusVerified" },
    credited:   { bg: C.forest,  color: "#fff",    key: "statusCredited" },
    rejected:   { bg: "#fee2e2", color: C.red,     key: "statusRejected" },
  };
  const s = m[status] || m.collection;
  return (
    <span style={{
      background: s.bg, color: s.color, padding: "3px 10px", borderRadius: 20,
      fontSize: 10, fontWeight: 700, letterSpacing: 0.5,
      fontFamily: "'DM Mono', monospace", textTransform: "uppercase",
    }}>{t(s.key)}</span>
  );
}

function Card({ children, style, accent }) {
  return (
    <div style={{
      background: C.cardBg, borderRadius: 14, padding: "22px 26px",
      border: `1px solid ${C.creamDark}`,
      borderTop: accent ? `3px solid ${C.orange}` : `1px solid ${C.creamDark}`,
      boxShadow: "0 1px 3px rgba(29,92,46,0.06)",
      ...style,
    }}>{children}</div>
  );
}

// ─── Activity Log Display ─────────────────────────────────────────────────────
const STAGE_ICONS = {
  "Collection": "📦",
  "Transport":  "🚛",
  "Processing": "⚙️",
  "Verification": "✅",
  "Credit":     "🏅",
  "Rejected":   "❌",
};
function ActivityLog({ activities, lang = "en" }) {
  const t = useT(lang);
  if (!activities || activities.length === 0) return null;
  return (
    <div style={{ marginTop: 4 }}>
      <SectionTitle>{t("activityLog")}</SectionTitle>
      <div style={{ position: "relative" }}>
        {/* vertical line */}
        <div style={{ position: "absolute", left: 13, top: 0, bottom: 0, width: 2, background: C.creamDark }} />
        {activities.map((a, i) => (
          <div key={i} style={{ display: "flex", gap: 12, marginBottom: 14, position: "relative" }}>
            {/* dot */}
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: C.forest, border: `2px solid ${C.white}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, flexShrink: 0, zIndex: 1 }}>
              <span>{STAGE_ICONS[a.stage] || "•"}</span>
            </div>
            <div style={{ flex: 1, paddingTop: 2 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: C.charcoal }}>{a.stage}</span>
                <span style={{ fontSize: 11, color: C.mutedLight }}>by {a.actor}</span>
                <span style={{ fontSize: 11, color: C.mutedLight, fontFamily: "'DM Mono', monospace" }}>{fmtDateTime(a.ts)}</span>
              </div>
              {a.geo ? (
                <div style={{ fontSize: 11, color: C.muted, marginTop: 3, display: "flex", alignItems: "center", gap: 4 }}>
                  <span>📍</span>
                  <a href={geoUrl(a.geo)} target="_blank" rel="noreferrer" style={{ color: C.forest, textDecoration: "underline", fontFamily: "'DM Mono', monospace" }}>
                    {fmtGeo(a.geo)}
                  </a>
                </div>
              ) : (
                <div style={{ fontSize: 11, color: C.mutedLight, marginTop: 3 }}>📍 Location not captured</div>
              )}
              {a.note && <div style={{ fontSize: 11, color: C.muted, marginTop: 2, fontStyle: "italic" }}>{a.note}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <div style={{
      fontSize: 10, fontWeight: 700, color: C.muted,
      letterSpacing: 0.6, textTransform: "uppercase", marginBottom: 14,
      paddingLeft: 10,
      borderLeft: `3px solid ${C.orange}`,
    }}>{children}</div>
  );
}

function InfoRow({ label, value, mono }) {
  return (
    <div>
      <div style={{ fontSize: 10, fontWeight: 700, color: C.muted, letterSpacing: 0.4, textTransform: "uppercase" }}>{label}</div>
      <div style={{ fontSize: 13, fontWeight: 600, color: C.charcoal, marginTop: 2, fontFamily: mono ? "'DM Mono', monospace" : "inherit", wordBreak: "break-all" }}>{value || "—"}</div>
    </div>
  );
}

// ─── Stage Progress Bar ───────────────────────────────────────────────────────
const STAGE_KEYS = ["stageCollection", "stageTransport", "stageProcessing"];
function StageBar({ current, lang = "en" }) {
  const t = useT(lang);
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: 26 }}>
      {STAGE_KEYS.map((key, i) => {
        const label = t(key);
        const idx = i + 1;
        const done = current > idx, active = current === idx;
        return (
          <div key={key} style={{ display: "flex", alignItems: "center", flex: i < STAGE_KEYS.length - 1 ? 1 : 0 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                background: done ? C.forest : active ? C.orange : C.creamDark,
                border: `2px solid ${done ? C.forest : active ? C.orange : C.creamDark}`,
                boxShadow: active ? `0 0 0 3px ${C.orange}33` : "none",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: done || active ? "#fff" : C.muted,
                fontSize: 11, fontWeight: 800, transition: "all 0.3s",
              }}>{done ? "✓" : idx}</div>
              <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.3, textTransform: "uppercase", whiteSpace: "nowrap", color: done ? C.forest : active ? C.orange : C.muted }}>{label}</span>
            </div>
            {i < STAGE_KEYS.length - 1 && (
              <div style={{ flex: 1, height: 2, margin: "0 4px", marginBottom: 14, background: done ? C.forest : C.creamDark, transition: "background 0.4s" }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Certificate Modal ────────────────────────────────────────────────────────
function CertModal({ record, onClose, lang = "en" }) {
  const t = useT(lang);
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(10,20,12,0.78)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 20 }} onClick={onClose}>
      <div style={{ background: C.white, borderRadius: 20, padding: "38px 42px", maxWidth: 580, width: "100%", position: "relative", border: `3px solid ${C.forest}`, boxShadow: "0 24px 72px rgba(29,92,46,0.3)", maxHeight: "90vh", overflowY: "auto" }} onClick={e => e.stopPropagation()}>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", opacity: 0.03 }}>
          <span style={{ fontSize: 130, fontWeight: 900, color: C.forest, transform: "rotate(-20deg)", fontFamily: "serif" }}>REZY</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
          <div>
            <div style={{ fontSize: 10, color: C.muted, letterSpacing: 1, textTransform: "uppercase" }}>Rezycology MRV · Hub Depok-01 · PPRS v8</div>
            <div style={{ fontSize: 21, fontWeight: 800, color: C.forest, fontFamily: "'Playfair Display', serif", marginTop: 2 }}>Plastic Credit Certificate</div>
          </div>
          <div style={{ background: C.forest, color: "#fff", borderRadius: 8, padding: "5px 12px", fontSize: 10, fontWeight: 700, letterSpacing: 0.5, marginTop: 4 }}>VERIFIED</div>
        </div>
        <div style={{ fontSize: 11, color: C.muted, marginBottom: 18 }}>Prototype PCC — binding issuance requires PPRS Registry + VVB sign-off.</div>
        <div style={{ background: C.forest, borderRadius: 12, padding: "14px 20px", marginBottom: 18, display: "flex", alignItems: "baseline", gap: 8 }}>
          <span style={{ fontSize: 38, fontWeight: 900, color: "#fff", fontFamily: "'DM Mono', monospace" }}>{record.creditsTonnes?.toFixed(4)}</span>
          <span style={{ fontSize: 15, color: "#a8d4b0" }}>Plastic Credits (MT)</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 28px", marginBottom: 18 }}>
          {[
            ["Batch ID", record.batchId, true],
            ["PPRS Serial", record.pprsSerial, true],
            ["Feedstock", record.feedstockType, false],
            ["Weight", `${Number(record.weightKg).toLocaleString()} kg (${record.creditsTonnes?.toFixed(4)} MT)`, false],
            ["Hub", "Hub Depok-01", false],
            ["Weighing Equip.", record.weighingEquipId, true],
            ["EoW Process", record.eowProcess, false],
            ["Processor", record.processor, false],
            ["EPR Buyer", record.eprBuyer, false],
            ["VVB", record.vvb, false],
            ["VVB Audit Ref.", record.verifierRef, true],
            ["Collector", record.collectorId, false],
            ["Collection Date", fmtDate(record.collectionDate), false],
            ["PCC Issued At", fmtDateTime(record.issuedAt), false],
          ].map(([k, v, mono]) => <InfoRow key={k} label={k} value={v} mono={mono} />)}
        </div>
        <div style={{ background: "#e8f5e9", borderRadius: 8, padding: "10px 14px", marginBottom: 18, fontSize: 11, color: C.forest, lineHeight: 1.6 }}>
          <strong>PPRS v8 Serial Syntax:</strong> PPRS[Ver]-[RegDate]-[AggType]-[ProcType]-[VerifDate]-[GenDate]-[Country]-[VVB]-[Aggregator]-[ProcEndDate]-[Seq]-[ProjectCode]-[CleanupType]-[AggEndDate]-[ImpactVerifier]-[Tonnage]
        </div>
        {(record.photoDataUrl || record.transportPhotoDataUrl || record.processingPhotoDataUrl) && (
          <div style={{ marginBottom: 18 }}>
            <SectionTitle>Evidence Photos</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: record.transportPhotoDataUrl || record.processingPhotoDataUrl ? "repeat(3,1fr)" : "1fr", gap: 8 }}>
              {record.photoDataUrl && (
                <div>
                  <div style={{ fontSize: 9, fontWeight: 700, color: C.muted, letterSpacing: 0.4, textTransform: "uppercase", marginBottom: 3 }}>Collection</div>
                  <img src={record.photoDataUrl} alt="collection" style={{ width: "100%", borderRadius: 8, objectFit: "cover", height: 90 }} />
                </div>
              )}
              {record.transportPhotoDataUrl && (
                <div>
                  <div style={{ fontSize: 9, fontWeight: 700, color: C.muted, letterSpacing: 0.4, textTransform: "uppercase", marginBottom: 3 }}>Transport</div>
                  <img src={record.transportPhotoDataUrl} alt="transport" style={{ width: "100%", borderRadius: 8, objectFit: "cover", height: 90 }} />
                </div>
              )}
              {record.processingPhotoDataUrl && (
                <div>
                  <div style={{ fontSize: 9, fontWeight: 700, color: C.muted, letterSpacing: 0.4, textTransform: "uppercase", marginBottom: 3 }}>Processing</div>
                  <img src={record.processingPhotoDataUrl} alt="processing" style={{ width: "100%", borderRadius: 8, objectFit: "cover", height: 90 }} />
                </div>
              )}
            </div>
          </div>
        )}
        <ActivityLog activities={record.activities} lang={lang} />

        {/* Signatures */}
        {(record.sigCollection || record.sigTransport || record.sigProcessing || record.sigVerification || record.sigCredit) && (
          <div style={{ marginBottom: 18 }}>
            <SectionTitle>Digital Signatures</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[
                { label: "Collector",    sig: record.sigCollection },
                { label: "Transport",    sig: record.sigTransport },
                { label: "Processor",    sig: record.sigProcessing },
                { label: "VVB Verifier", sig: record.sigVerification },
                { label: "Admin",        sig: record.sigCredit },
              ].filter(s => s.sig).map(s => (
                <div key={s.label} style={{ border: `1px solid ${C.creamDark}`, borderRadius: 8, padding: 8, background: C.cardBg }}>
                  <div style={{ fontSize: 9, fontWeight: 700, color: C.muted, letterSpacing: 0.4, textTransform: "uppercase", marginBottom: 4 }}>{s.label}</div>
                  <img src={s.sig} alt={s.label} style={{ width: "100%", height: 50, objectFit: "contain", background: "#fff", borderRadius: 4 }} />
                </div>
              ))}
            </div>
          </div>
        )}
        <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
          <Btn onClick={onClose} variant="primary">{t("close")}</Btn>
          <Btn onClick={() => window.print()} variant="secondary">{t("print")}</Btn>
        </div>
      </div>
    </div>
  );
}

// ─── Reject Modal ─────────────────────────────────────────────────────────────
function RejectModal({ onConfirm, onCancel, lang = "en" }) {
  const t = useT(lang);
  const [reason, setReason] = useState("");
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(10,20,12,0.78)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 20 }}>
      <div style={{ background: C.white, borderRadius: 16, padding: "28px 32px", maxWidth: 420, width: "100%", border: `2px solid ${C.red}` }}>
        <div style={{ fontSize: 16, fontWeight: 800, color: C.red, marginBottom: 12 }}>Reject Batch</div>
        <div style={{ fontSize: 13, color: C.muted, marginBottom: 14 }}>Provide a reason. This will be logged and visible to the hub operator.</div>
        <Lbl>Rejection Reason</Lbl>
        <textarea value={reason} onChange={e => setReason(e.target.value)} rows={3} placeholder="e.g. Contamination detected, weighing equipment calibration expired…" style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${C.creamDark}`, background: C.white, fontSize: 13, color: C.charcoal, outline: "none", resize: "vertical", boxSizing: "border-box", fontFamily: "inherit" }} />
        <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
          <Btn onClick={() => reason.trim() && onConfirm(reason)} disabled={!reason.trim()} variant="danger">{t("confirmReject")}</Btn>
          <Btn onClick={onCancel} variant="ghost">{t("cancel")}</Btn>
        </div>
      </div>
    </div>
  );
}

// ─── Login Screen ─────────────────────────────────────────────────────────────
function LoginScreen({ onLogin, lang, setLang }) {
  const t = useT(lang);
  const [selected, setSelected] = useState(null);
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const ROLE_KEYS = {
    admin:    { label: t("roleAdmin"),    desc: t("roleAdminDesc") },
    operator: { label: t("roleOperator"), desc: t("roleOperatorDesc") },

  };

  function attempt() {
    if (!selected) return;
    if (ROLES[selected].pin === pin) {
      setError("");
      onLogin(selected);
    } else {
      setError(t("wrongPin"));
      setPin("");
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: C.pageBg, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500;700&family=Playfair+Display:wght@700;800&display=swap" rel="stylesheet" />
      <div style={{ width: "100%", maxWidth: 420 }}>

        {/* Lang toggle */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
          <div style={{ background: C.creamDark, borderRadius: 8, display: "flex", overflow: "hidden", border: `1px solid ${C.creamDark}` }}>
            {["en","id"].map(l => (
              <button key={l} onClick={() => setLang(l)} style={{
                background: lang === l ? C.forest : "transparent",
                color: lang === l ? "#fff" : C.muted,
                border: "none", padding: "6px 16px",
                fontSize: 12, fontWeight: 700, cursor: "pointer",
                fontFamily: "inherit", letterSpacing: 0.5,
                transition: "all 0.15s",
              }}>{l === "en" ? "EN" : "ID"}</button>
            ))}
          </div>
        </div>

        {/* Logo card */}
        <div style={{
          background: C.cardBg, borderRadius: 20, padding: "32px 28px 28px",
          boxShadow: "0 4px 24px rgba(29,92,46,0.12), 0 1px 4px rgba(29,92,46,0.08)",
          border: `1px solid ${C.creamDark}`,
          borderTop: `4px solid ${C.orange}`,
        }}>
          {/* Logo */}
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <img
              src={REZY_LOGO}
              alt="Rezycology"
              style={{ height: 90, objectFit: "contain", display: "block", margin: "0 auto 16px" }}
            />
            <div style={{ fontSize: 18, fontWeight: 800, color: C.forest, fontFamily: "'Playfair Display', serif" }}>{t("mrvPlatform")}</div>
            <div style={{ display: "inline-block", marginTop: 6, background: C.orange, color: "#fff", fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", padding: "3px 10px", borderRadius: 20 }}>
              {t("hubDepok")} · PPRS v8
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: C.creamDark, marginBottom: 20 }} />

          <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 12 }}>{t("selectRole")}</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
            {Object.entries(ROLES).map(([key, role]) => (
              <div key={key} onClick={() => { setSelected(key); setPin(""); setError(""); }} style={{
                padding: "12px 14px", borderRadius: 10, cursor: "pointer",
                border: `2px solid ${selected === key ? role.color : C.creamDark}`,
                background: selected === key ? `${role.color}10` : C.pageBg,
                transition: "all 0.15s",
              }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: selected === key ? role.color : C.charcoal }}>{ROLE_KEYS[key].label}</div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{ROLE_KEYS[key].desc}</div>
              </div>
            ))}
          </div>

          {selected && (
            <div style={{ animation: "fadeIn .2s ease" }}>
              <Inp label={t("enterPin")} type="password" value={pin} onChange={v => { setPin(v); setError(""); }} placeholder="• • • •" />
              {error && <div style={{ color: C.red, fontSize: 12, marginTop: 6, fontWeight: 600 }}>{error}</div>}
              <div style={{ marginTop: 14 }}>
                <Btn onClick={attempt} disabled={pin.length < 4} full variant="primary">
                  {t("signInAs")} {ROLE_KEYS[selected].label} →
                </Btn>
              </div>
              <div style={{ fontSize: 11, color: C.mutedLight, marginTop: 10, textAlign: "center" }}>
                {t("demoPins")}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: 16, fontSize: 11, color: C.mutedLight }}>
          Rezycology · Sustainability &amp; Waste Solution
        </div>
      </div>
    </div>
  );
}

// ─── Analytics Panel ──────────────────────────────────────────────────────────
function AnalyticsPanel({ batches }) {
  const safeArr = Array.isArray(batches) ? batches : [];

  const countByStatus = (st) => safeArr.filter(b => b.status === st).length;
  const totalKg       = safeArr.reduce((sum, b) => sum + (Number(b.weightKg) || 0), 0);
  const totalCredits  = safeArr.filter(b => b.status === "credited")
                               .reduce((sum, b) => sum + (Number(b.creditsTonnes) || 0), 0);
  const rejectedCount = countByStatus("rejected");

  // ── Feedstock breakdown ───────────────────────────────────────────────────
  const feedstockMap = {};
  safeArr.forEach(b => {
    const key = b.feedstockType || "Unknown";
    feedstockMap[key] = (feedstockMap[key] || 0) + (Number(b.weightKg) || 0);
  });
  const feedstockRows = Object.entries(feedstockMap).sort((a, b) => b[1] - a[1]);
  const feedMax = feedstockRows.length > 0 ? feedstockRows[0][1] : 1;

  // ── Pipeline stages ───────────────────────────────────────────────────────
  const PIPELINE = [
    { label: "Collection", status: "collection", color: "#e07020", icon: "📦" },
    { label: "Transport",  status: "transport",  color: C.blue,    icon: "🚛" },
    { label: "Processing", status: "processing", color: "#92600a", icon: "⚙️" },
    { label: "Verified",   status: "verified",   color: "#166534", icon: "✅" },
    { label: "Credited",   status: "credited",   color: C.forest,  icon: "🏅" },
    { label: "Rejected",   status: "rejected",   color: C.red,     icon: "❌" },
  ];
  const pipelineMax = Math.max(...PIPELINE.map(p => countByStatus(p.status)), 1);

  // ── Collection trend (last 8 batches grouped by week) ────────────────────
  const weeklyKg = {};
  safeArr.forEach(b => {
    const d = new Date(b.createdAt || b.collectionDate || Date.now());
    if (isNaN(d)) return;
    const week = `W${Math.ceil(d.getDate() / 7)} ${d.toLocaleString("en", { month: "short" })}`;
    weeklyKg[week] = (weeklyKg[week] || 0) + (Number(b.weightKg) || 0);
  });
  const weeklyRows = Object.entries(weeklyKg).slice(-6);
  const weekMax = weeklyRows.length > 0 ? Math.max(...weeklyRows.map(([,v]) => v)) : 1;

  if (safeArr.length === 0) {
    return (
      <div>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: C.forest, fontFamily: "'Playfair Display', serif", margin: "0 0 4px" }}>Analytics</h1>
        <p style={{ color: C.muted, fontSize: 13, margin: "0 0 20px" }}>Hub Depok-01</p>
        <Card>
          <div style={{ textAlign: "center", padding: "40px 0", color: C.muted }}>
            <div style={{ fontSize: 36, marginBottom: 10 }}>📊</div>
            <div style={{ fontSize: 15, fontWeight: 600 }}>No data yet</div>
            <div style={{ fontSize: 13, marginTop: 6 }}>Log your first batch to see analytics.</div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 800, color: C.forest, fontFamily: "'Playfair Display', serif", margin: "0 0 4px" }}>Analytics</h1>
      <p style={{ color: C.muted, fontSize: 13, margin: "0 0 20px" }}>Hub Depok-01 · {safeArr.length} batches</p>

      {/* ── KPI cards ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12, marginBottom: 20 }}>
        {[
          { label: "Total Plastic Logged",  val: `${totalKg.toLocaleString()} kg`,   sub: `${(totalKg / 1000).toFixed(3)} MT`,   accent: false },
          { label: "Plastic Credits Issued", val: totalCredits.toFixed(4),            sub: "MT (PPRS v8)",                         accent: true  },
          { label: "Total Batches",          val: String(safeArr.length),             sub: `${rejectedCount} rejected`,            accent: false },
          { label: "Verified + Credited",    val: String(countByStatus("verified") + countByStatus("credited")), sub: "full chain complete", accent: false },
        ].map((item, i) => (
          <div key={i} style={{
            background: item.accent ? C.forest : C.cardBg,
            borderRadius: 12, padding: "15px 18px",
            border: `1px solid ${item.accent ? C.forestMid : C.creamDark}`,
            borderLeft: `4px solid ${item.accent ? C.orange : C.forestMid}`,
            boxShadow: item.accent ? "0 2px 12px rgba(224,112,32,0.18)" : "0 1px 3px rgba(29,92,46,0.06)",
          }}>
            <div style={{ fontSize: 10, color: item.accent ? "#a8d4b0" : C.muted, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 4 }}>{item.label}</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: item.accent ? "#fff" : C.forest, fontFamily: "'DM Mono', monospace" }}>{item.val}</div>
            {item.sub && <div style={{ fontSize: 10, color: item.accent ? "#a8d4b0" : C.muted, marginTop: 2 }}>{item.sub}</div>}
          </div>
        ))}
      </div>

      {/* ── Pipeline bar chart ── */}
      <Card style={{ marginBottom: 16 }}>
        <SectionTitle>Batch Pipeline — Counts by Stage</SectionTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {PIPELINE.map(p => {
            const count = countByStatus(p.status);
            const pct   = pipelineMax > 0 ? Math.max((count / pipelineMax) * 100, count > 0 ? 6 : 0) : 0;
            return (
              <div key={p.status}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: C.charcoal, display: "flex", alignItems: "center", gap: 5 }}>
                    <span>{p.icon}</span>{p.label}
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 800, color: p.color, fontFamily: "'DM Mono', monospace", minWidth: 24, textAlign: "right" }}>{count}</span>
                </div>
                <div style={{ background: C.creamDark, borderRadius: 6, height: 14, overflow: "hidden", position: "relative" }}>
                  <div style={{
                    width: `${pct}%`,
                    background: `linear-gradient(90deg, ${p.color}dd, ${p.color})`,
                    height: "100%",
                    borderRadius: 6,
                    minWidth: count > 0 ? 18 : 0,
                    transition: "width 0.6s cubic-bezier(0.4,0,0.2,1)",
                    display: "flex", alignItems: "center", justifyContent: "flex-end",
                  }} />
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* ── Feedstock breakdown ── */}
      {feedstockRows.length > 0 && (
        <Card style={{ marginBottom: 16 }}>
          <SectionTitle>Feedstock Mix — Weight (kg)</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {feedstockRows.map(([type, kg]) => {
              const pct = feedMax > 0 ? Math.max((kg / feedMax) * 100, 4) : 4;
              return (
                <div key={type}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 5 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: C.charcoal }}>{type}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: C.forest, fontFamily: "'DM Mono', monospace" }}>{kg.toLocaleString()} kg</span>
                  </div>
                  <div style={{ background: C.creamDark, borderRadius: 6, height: 14, overflow: "hidden" }}>
                    <div style={{
                      width: `${pct}%`,
                      background: `linear-gradient(90deg, ${C.forestMid}, ${C.forest})`,
                      height: "100%",
                      borderRadius: 6,
                      transition: "width 0.6s cubic-bezier(0.4,0,0.2,1)",
                    }} />
                  </div>
                  <div style={{ fontSize: 10, color: C.mutedLight, marginTop: 3 }}>{((kg / totalKg) * 100).toFixed(1)}% of total</div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* ── Weekly collection trend ── */}
      {weeklyRows.length > 0 && (
        <Card>
          <SectionTitle>Collection Trend — kg per Week</SectionTitle>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 80, paddingTop: 4 }}>
            {weeklyRows.map(([week, kg]) => {
              const barH = weekMax > 0 ? Math.max((kg / weekMax) * 70, 4) : 4;
              return (
                <div key={week} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  <div style={{ fontSize: 9, color: C.muted, fontFamily: "'DM Mono', monospace", whiteSpace: "nowrap" }}>{kg >= 1000 ? `${(kg/1000).toFixed(1)}t` : `${kg}kg`}</div>
                  <div style={{ width: "100%", background: `linear-gradient(180deg, ${C.forestMid}, ${C.forest})`, borderRadius: "4px 4px 0 0", height: barH, transition: "height 0.5s ease", minHeight: 4 }} />
                  <div style={{ fontSize: 8, color: C.mutedLight, fontWeight: 600, textAlign: "center", whiteSpace: "nowrap" }}>{week}</div>
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function RezyMRVLive() {
  const [role, setRole] = useState(null);
  const [lang, setLang] = useState("en");
  const t = useT(lang);
  const [tab, setTab] = useState("dashboard");
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [geoLoading, setGeoLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [certView, setCertView] = useState(null);
  const [rejectTarget, setRejectTarget] = useState(null);
  const [detailView, setDetailView] = useState(null);

  // New batch form state
  const [stage, setStage] = useState(1);
  const [activeId, setActiveId] = useState(null);
  const [col, setCol] = useState({ feedstockType: FEEDSTOCK_TYPES[0], weightKg: "", collectorId: COLLECTORS[0], weighingEquipId: SCALES[0], collectionDate: new Date().toISOString().slice(0,10), notes: "", photoDataUrl: null, calibCertUrl: null });
  const [colGeo, setColGeo] = useState({ lat: "", lng: "" });
  const [trn, setTrn] = useState({ transportRef: "", transportDate: new Date().toISOString().slice(0,10), photoDataUrl: null });
  const [trnGeo, setTrnGeo] = useState({ lat: "", lng: "" });
  const [prc, setPrc] = useState({ processor: "", eowProcess: EOW_PROCESSES[0], processingEndDate: new Date().toISOString().slice(0,10), photoDataUrl: null });
  const [prcGeo, setPrcGeo] = useState({ lat: "", lng: "" });
  // Signatures per stage
  const [sigCol,   setSigCol]   = useState(null); // Collection
  const [sigTrn,   setSigTrn]   = useState(null); // Transport
  const [sigPrc,   setSigPrc]   = useState(null); // Processing
  const [sigVrf,   setSigVrf]   = useState(null); // Verification
  const [sigCred,  setSigCred]  = useState(null); // Credit Issuance
  const [vrf, setVrf] = useState({ vvb: VVB_BODIES[0], eprBuyer: EPR_BUYERS[0], verifierRef: "" });

  // Settings
  const [settings, setSettings] = useState({ buyerName: "EPR Sponsor", hubName: "Hub Depok-01" });
  const [sheetsUrl, setSheetsUrl] = useState("");
  const [syncStatus, setSyncStatus] = useState(null); // null | "syncing" | "ok" | "fail"

  const roleObj = role ? ROLES[role] : null;
  const canAccess = (t) => roleObj?.access.includes(t);
  const active = batches.find(b => b.id === activeId);

  // ── Inject global styles ──────────────────────────────────────────────────
  useEffect(() => {
    const id = "rezy-mrv-styles";
    if (document.getElementById(id)) return;
    const el = document.createElement("style");
    el.id = id;
    const rules = [
      "@keyframes fadeSlide { from { transform: translateX(14px); opacity: 0 } to { transform: none; opacity: 1 } }",
      "@keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }",
      "* { box-sizing: border-box; scrollbar-width: none }",
      "*::-webkit-scrollbar { display: none }",
      "tr:hover td { background: #f5f0e8 !important }",
    ];
    el.textContent = rules.join(" ");
    document.head.appendChild(el);
  }, []);

  // ── Load on mount ──────────────────────────────────────────────────────────
  useEffect(() => {
    (async () => {
      const [localBatches, s] = await Promise.all([loadBatches(), loadSettings()]);
      let url = "";
      if (s && Object.keys(s).length) {
        setSettings(s);
        if (s.sheetsUrl) { setSheetsUrl(s.sheetsUrl); url = s.sheetsUrl; }
      }

      // Try to load from Sheet first (multi-device sync)
      // Falls back to local storage if Sheet unavailable
      if (url) {
        setLoading(true);
        const sheetBatches = await loadBatchesFromSheet(url);
        if (sheetBatches && sheetBatches.length > 0) {
          setBatches(sheetBatches);
          // Merge with local to preserve photos (not stored in Sheet)
          setBatches(prev => sheetBatches.map(sb => {
            const local = localBatches.find(lb => lb.batchId === sb.batchId);
            return local ? { ...sb, 
              photoDataUrl: local.photoDataUrl,
              transportPhotoDataUrl: local.transportPhotoDataUrl,
              processingPhotoDataUrl: local.processingPhotoDataUrl,
              activities: local.activities || [],
            } : sb;
          }));
        } else {
          setBatches(localBatches);
        }
      } else {
        setBatches(localBatches);
      }
      setLoading(false);
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Save batches whenever they change ─────────────────────────────────────
  const persistBatches = useCallback(async (next) => {
    setSaving(true);
    await saveBatches(next);
    setSaving(false);
  }, []);

  function showToast(msg, type = "ok") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3400);
  }

  async function doSync(batch, activity) {
    if (!sheetsUrl) return;
    setSyncStatus("syncing");
    await syncToSheets(sheetsUrl, batch, activity);
    syncPhotosToSheets(sheetsUrl, batch); // fire-and-forget
    setSyncStatus("ok");
    setTimeout(() => setSyncStatus(null), 2000);
  }

  function mutateBatches(fn) {
    setBatches(prev => {
      const next = fn(prev);
      persistBatches(next);
      return next;
    });
  }

  function updateBatch(id, patch) {
    mutateBatches(prev => prev.map(b => b.id === id ? { ...b, ...patch } : b));
  }

  // ── Photo upload ───────────────────────────────────────────────────────────
  function handlePhoto(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setCol(p => ({ ...p, photoDataUrl: ev.target.result }));
    reader.readAsDataURL(file);
  }

  function handleTransportPhoto(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setTrn(p => ({ ...p, photoDataUrl: ev.target.result }));
    reader.readAsDataURL(file);
  }

  function handleProcessingPhoto(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPrc(p => ({ ...p, photoDataUrl: ev.target.result }));
    reader.readAsDataURL(file);
  }

  // ── Stage submissions ──────────────────────────────────────────────────────
  async function submitCollection() {
    if (!col.weightKg || isNaN(Number(col.weightKg)) || Number(col.weightKg) <= 0) {
      showToast("Enter a valid weight", "err"); return;
    }
    if (!col.calibCertUrl) { showToast("Calibration certificate required", "err"); return; }
    if (!sigCol) { showToast("Signature required", "err"); return; }
    setGeoLoading(true);
    showToast("Getting location…");
    const geo = await getGeo(colGeo);
    setGeoLoading(false);
    const batch = {
      id: uid(), batchId: "DPK-" + uid().slice(0, 6),
      hub: "Hub Depok-01",
      feedstockType: col.feedstockType, weightKg: Number(col.weightKg),
      collectorId: col.collectorId, weighingEquipId: col.weighingEquipId,
      collectionDate: col.collectionDate + "T00:00:00.000Z",
      notes: col.notes, photoDataUrl: col.photoDataUrl, calibCertUrl: col.calibCertUrl,
      status: "collection",
      transportRef: null, transportDate: null,
      processor: null, eowProcess: null, processingEndDate: null,
      eprBuyer: null, vvb: null, verifierRef: null, rejectionReason: null,
      creditsTonnes: 0, pprsSerial: null, issuedAt: null,
      loggedBy: roleObj.label, createdAt: nowISO(),
      sigCollection: sigCol, sigTransport: null,
      sigProcessing: null, sigVerification: null, sigCredit: null,
      activities: [makeActivity("Collection", roleObj.name, geo, col.notes)],
    };
    mutateBatches(prev => [batch, ...prev]);
    setActiveId(batch.id);
    setStage(2);
    showToast(`Batch ${batch.batchId} logged.`);
    doSync(batch, batch.activities[0]);
  }

  async function submitTransport() {
    if (!trn.transportRef.trim()) { showToast("Enter transport manifest reference", "err"); return; }
    if (!sigTrn) { showToast("Signature required", "err"); return; }
    setGeoLoading(true);
    showToast("Getting location…");
    const geo = await getGeo(trnGeo);
    setGeoLoading(false);
    mutateBatches(prev => prev.map(b => b.id === activeId ? {
      ...b,
      status: "transport",
      transportRef: trn.transportRef,
      transportDate: trn.transportDate,
      transportPhotoDataUrl: trn.photoDataUrl,
      sigTransport: sigTrn,
      activities: [...(b.activities || []), makeActivity("Transport", roleObj.name, geo, `Manifest: ${trn.transportRef}`)],
    } : b));
    setStage(3);
    showToast("Transport documented.");
    const updated = batches.find(b => b.id === activeId);
    if (updated) doSync({ ...updated, status: "transport", transportRef: trn.transportRef, transportDate: trn.transportDate }, { stage: "Transport", actor: roleObj.name, ts: nowISO(), geo, note: `Manifest: ${trn.transportRef}` });
  }

  async function submitProcessing() {
    if (!prc.processor.trim()) { showToast("Enter processing facility name", "err"); return; }
    if (!sigPrc) { showToast("Signature required", "err"); return; }
    setGeoLoading(true);
    showToast("Getting location…");
    const geo = await getGeo(prcGeo);
    setGeoLoading(false);
    mutateBatches(prev => prev.map(b => b.id === activeId ? {
      ...b,
      status: "processing",
      processor: prc.processor,
      eowProcess: prc.eowProcess,
      processingEndDate: prc.processingEndDate,
      processingPhotoDataUrl: prc.photoDataUrl,
      sigProcessing: sigPrc,
      activities: [...(b.activities || []), makeActivity("Processing", roleObj.name, geo, `${prc.eowProcess} · ${prc.processor}`)],
    } : b));
    setStage(4);
    showToast("Processing recorded.");
    const upd = batches.find(b => b.id === activeId);
    if (upd) doSync({ ...upd, status: "processing", processor: prc.processor, eowProcess: prc.eowProcess }, { stage: "Processing", actor: roleObj.name, ts: nowISO(), geo, note: `${prc.eowProcess} · ${prc.processor}` });
  }

  async function submitVerification() {
    if (!vrf.verifierRef.trim()) { showToast("Enter VVB audit reference", "err"); return; }
    if (!sigVrf) { showToast("VVB signature required", "err"); return; }
    setGeoLoading(true);
    showToast("Getting location…");
    const geo = await getGeo();
    setGeoLoading(false);
    mutateBatches(prev => prev.map(b => b.id === activeId ? {
      ...b,
      status: "verified",
      vvb: vrf.vvb,
      eprBuyer: vrf.eprBuyer,
      verifierRef: vrf.verifierRef,
      sigVerification: sigVrf,
      activities: [...(b.activities || []), makeActivity("Verification", vrf.vvb.split(" ")[0], geo, `Audit ref: ${vrf.verifierRef}`)],
    } : b));
    setStage(5);
    showToast("VVB verification confirmed.");
    const updv = batches.find(b => b.id === activeId);
    if (updv) doSync({ ...updv, status: "verified", vvb: vrf.vvb, eprBuyer: vrf.eprBuyer, verifierRef: vrf.verifierRef }, { stage: "Verification", actor: vrf.vvb.split(" ")[0], ts: nowISO(), geo: null, note: `Audit ref: ${vrf.verifierRef}` });
  }

  async function issueCredit() {
    if (!sigCred) { showToast("Admin signature required to issue credit", "err"); return; }
    const batch = batches.find(b => b.id === activeId);
    if (!batch) return;
    setGeoLoading(true);
    showToast("Getting location…");
    const geo = await getGeo();
    setGeoLoading(false);
    const tonnes = kgToTonnes(batch.weightKg);
    const seq = batches.filter(b => b.status === "credited").length + 1;
    const serial = generateSerial({ procType: batch.eowProcess, vvb: batch.vvb, tonnes, seq });
    const issuedAt = nowISO();
    mutateBatches(prev => prev.map(b => b.id === activeId ? {
      ...b,
      status: "credited",
      sigCredit: sigCred,
      creditsTonnes: tonnes,
      pprsSerial: serial,
      issuedAt,
      activities: [...(b.activities || []), makeActivity("Credit", roleObj.name, geo, `${tonnes} MT · Serial: ${serial.slice(0, 24)}…`)],
    } : b));
    const updated = { ...batch, status: "credited", creditsTonnes: tonnes, pprsSerial: serial, issuedAt, activities: [...(batch.activities || []), makeActivity("Credit", roleObj.name, geo)] };
    setCertView(updated);
    setActiveId(null);
    setStage(1);
    setCol({ feedstockType: FEEDSTOCK_TYPES[0], weightKg: "", collectorId: COLLECTORS[0], weighingEquipId: SCALES[0], collectionDate: new Date().toISOString().slice(0,10), notes: "", photoDataUrl: null, calibCertUrl: null });
    setColGeo({ lat: "", lng: "" });
    setTrn({ transportRef: "", transportDate: new Date().toISOString().slice(0,10), photoDataUrl: null });
    setTrnGeo({ lat: "", lng: "" });
    setPrc({ processor: "", eowProcess: EOW_PROCESSES[0], processingEndDate: new Date().toISOString().slice(0,10), photoDataUrl: null });
    setPrcGeo({ lat: "", lng: "" });
    setSigCol(null); setSigTrn(null); setSigPrc(null); setSigVrf(null); setSigCred(null);
    setTab("records");
    showToast("Plastic Credit issued!");
    doSync(updated, { stage: "Credit", actor: roleObj.name, ts: nowISO(), geo: null, note: `${tonnes} MT · ${serial.slice(0,24)}…` });
  }

  async function rejectBatch(id, reason) {
    setGeoLoading(true);
    const geo = await getGeo();
    setGeoLoading(false);
    mutateBatches(prev => prev.map(b => b.id === id ? {
      ...b,
      status: "rejected",
      rejectionReason: reason,
      activities: [...(b.activities || []), makeActivity("Rejected", roleObj.name, geo, reason)],
    } : b));
    setRejectTarget(null);
    showToast("Batch rejected.", "warn");
    const rejb = batches.find(b => b.id === id);
    if (rejb) doSync({ ...rejb, status: "rejected", rejectionReason: reason }, { stage: "Rejected", actor: roleObj.name, ts: nowISO(), geo: null, note: reason });
  }

  // ── Stats ──────────────────────────────────────────────────────────────────
  const totalKg = batches.reduce((s, b) => s + (Number(b.weightKg) || 0), 0);
  const totalCredits = batches.filter(b => b.status === "credited").reduce((s, b) => s + (b.creditsTonnes || 0), 0);
  const byStatus = s => batches.filter(b => b.status === s).length;

  // ── Render ─────────────────────────────────────────────────────────────────
  if (!role) return <LoginScreen onLogin={r => { setRole(r); setTab("dashboard"); }} lang={lang} setLang={setLang} />;

  const NAV = [
    { key: "dashboard", label: t("dashboard") },
    { key: "log",       label: t("newBatch"),  gate: "log" },
    { key: "records",   label: t("records") },
    { key: "analytics", label: "Analytics",     gate: "settings" },
    { key: "settings",  label: t("settings"),  gate: "settings" },
  ].filter(n => !n.gate || canAccess(n.gate));

  return (
    <div style={{ minHeight: "100vh", background: C.pageBg, fontFamily: "'DM Sans', 'Segoe UI', sans-serif", color: C.charcoal }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500;700&family=Playfair+Display:wght@700;800&display=swap" rel="stylesheet" />

      {/* Toast */}
      {toast && (
        <div style={{ position: "fixed", top: 20, right: 20, zIndex: 2000, background: toast.type === "err" ? C.red : toast.type === "warn" ? C.orange : C.forest, color: "#fff", padding: "10px 18px", borderRadius: 10, fontSize: 13, fontWeight: 600, boxShadow: "0 4px 20px rgba(0,0,0,0.2)", animation: "fadeSlide .25s ease" }}>{toast.msg}</div>
      )}

      {saving && (
        <div style={{ position: "fixed", bottom: 16, right: 16, zIndex: 1900, background: C.charcoal, color: "#fff", padding: "6px 14px", borderRadius: 8, fontSize: 11, fontWeight: 600, opacity: 0.85 }}>{t("saving")}</div>
      )}

      {geoLoading && (
        <div style={{ position: "fixed", bottom: 48, right: 16, zIndex: 1900, background: C.blue, color: "#fff", padding: "6px 14px", borderRadius: 8, fontSize: 11, fontWeight: 600, opacity: 0.9 }}>📍 Getting location…</div>
      )}

      {syncStatus && (
        <div style={{ position: "fixed", bottom: 80, right: 16, zIndex: 1900, padding: "6px 14px", borderRadius: 8, fontSize: 11, fontWeight: 600, opacity: 0.92,
          background: syncStatus === "syncing" ? "#1a5fa8" : syncStatus === "ok" ? C.forest : C.red,
          color: "#fff",
        }}>
          {syncStatus === "syncing" && "📊 Syncing to Sheets…"}
          {syncStatus === "ok"      && "📊 Synced to Sheets ✓"}
          {syncStatus === "fail"    && "📊 Sheets sync failed"}
        </div>
      )}

      {certView && <CertModal record={certView} onClose={() => setCertView(null)} lang={lang} />}
      {rejectTarget && <RejectModal onConfirm={reason => rejectBatch(rejectTarget, reason)} onCancel={() => setRejectTarget(null)} lang={lang} />}

      {/* Detail drawer */}
      {detailView && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(10,20,12,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 900, padding: 20 }} onClick={() => setDetailView(null)}>
          <div style={{ background: C.white, borderRadius: 16, padding: "28px 32px", maxWidth: 520, width: "100%", maxHeight: "85vh", overflowY: "auto" }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 12, color: C.muted, fontFamily: "'DM Mono', monospace" }}>{detailView.batchId}</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: C.forest }}>{detailView.feedstockType}</div>
              </div>
              <Badge status={detailView.status} lang={lang} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 24px", marginBottom: 16 }}>
              {[
                ["Weight", `${Number(detailView.weightKg).toLocaleString()} kg`],
                ["Collector", detailView.collectorId],
                ["Weighing Equip.", detailView.weighingEquipId],
                ["Collection Date", fmtDate(detailView.collectionDate)],
                ["Transport Ref.", detailView.transportRef],
                ["Transport Date", fmtDate(detailView.transportDate)],
                ["Processor", detailView.processor],
                ["EoW Process", detailView.eowProcess],
                ["Proc. End Date", fmtDate(detailView.processingEndDate)],
                ["VVB", detailView.vvb],
                ["VVB Audit Ref.", detailView.verifierRef],
                ["EPR Buyer", detailView.eprBuyer],
                ["Logged By", detailView.loggedBy],
                ["Logged At", fmtDateTime(detailView.createdAt)],
              ].map(([k, v]) => <InfoRow key={k} label={k} value={v} />)}
            </div>
            {detailView.notes && (
              <div style={{ background: C.creamMid, borderRadius: 8, padding: "10px 14px", marginBottom: 14, fontSize: 12, color: C.muted }}>
                <strong>Notes:</strong> {detailView.notes}
              </div>
            )}
            {detailView.rejectionReason && (
              <div style={{ background: "#fee2e2", borderRadius: 8, padding: "10px 14px", marginBottom: 14, fontSize: 12, color: C.red }}>
                <strong>Rejection Reason:</strong> {detailView.rejectionReason}
              </div>
            )}
            <ActivityLog activities={detailView.activities} lang={lang} />

            {/* Signatures */}
            {(detailView.sigCollection || detailView.sigTransport || detailView.sigProcessing || detailView.sigVerification || detailView.sigCredit) && (
              <div style={{ marginBottom: 14 }}>
                <SectionTitle>Digital Signatures</SectionTitle>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {[
                    { label: "Collector",    sig: detailView.sigCollection },
                    { label: "Transport",    sig: detailView.sigTransport },
                    { label: "Processor",   sig: detailView.sigProcessing },
                    { label: "VVB Verifier", sig: detailView.sigVerification },
                    { label: "Admin",        sig: detailView.sigCredit },
                  ].filter(s => s.sig).map(s => (
                    <div key={s.label} style={{ border: `1px solid ${C.creamDark}`, borderRadius: 8, padding: 6, background: C.cardBg }}>
                      <div style={{ fontSize: 9, fontWeight: 700, color: C.muted, letterSpacing: 0.4, textTransform: "uppercase", marginBottom: 3 }}>{s.label}</div>
                      <img src={s.sig} alt={s.label} style={{ width: "100%", height: 44, objectFit: "contain", background: "#fff", borderRadius: 4 }} />
                    </div>
                  ))}
                </div>
              </div>
            )}
            {(detailView.photoDataUrl || detailView.transportPhotoDataUrl || detailView.processingPhotoDataUrl) && (
              <div style={{ marginBottom: 14 }}>
                <SectionTitle>Evidence Photos</SectionTitle>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {detailView.photoDataUrl && (
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 700, color: C.muted, letterSpacing: 0.4, textTransform: "uppercase", marginBottom: 4 }}>Collection</div>
                      <img src={detailView.photoDataUrl} alt="collection" style={{ width: "100%", borderRadius: 8, objectFit: "cover", maxHeight: 160 }} />
                    </div>
                  )}
                  {detailView.transportPhotoDataUrl && (
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 700, color: C.muted, letterSpacing: 0.4, textTransform: "uppercase", marginBottom: 4 }}>Transport</div>
                      <img src={detailView.transportPhotoDataUrl} alt="transport" style={{ width: "100%", borderRadius: 8, objectFit: "cover", maxHeight: 160 }} />
                    </div>
                  )}
                  {detailView.processingPhotoDataUrl && (
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 700, color: C.muted, letterSpacing: 0.4, textTransform: "uppercase", marginBottom: 4 }}>Processing</div>
                      <img src={detailView.processingPhotoDataUrl} alt="processing" style={{ width: "100%", borderRadius: 8, objectFit: "cover", maxHeight: 160 }} />
                    </div>
                  )}
                </div>
              </div>
            )}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {detailView.status === "credited" && (
                <Btn small onClick={() => { setCertView(detailView); setDetailView(null); }} variant="primary">{t("viewPCC")}</Btn>
              )}
              {canAccess("verify") && detailView.status === "processing" && (
                <>
                  <Btn small onClick={() => { updateBatch(detailView.id, { status: "verified" }); setDetailView(null); showToast("Verified."); }} variant="blue">Approve</Btn>
                  <Btn small onClick={() => { setRejectTarget(detailView.id); setDetailView(null); }} variant="danger">Reject</Btn>
                </>
              )}
              <Btn small onClick={() => setDetailView(null)} variant="ghost">Close</Btn>
            </div>
          </div>
        </div>
      )}

      {/* ── Header ── */}
      <div style={{ background: C.white, boxShadow: `0 1px 0 ${C.headerBorder}, 0 2px 8px rgba(29,92,46,0.06)` }}>
        {/* Top row: logo + role */}
        <div style={{ padding: "8px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <img
            src={REZY_LOGO}
            alt="Rezycology"
            style={{ height: 36, objectFit: "contain" }}
          />
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {/* Language toggle */}
            <div style={{ background: C.creamDark, borderRadius: 7, display: "flex", overflow: "hidden" }}>
              {["en","id"].map(l => (
                <button key={l} onClick={() => setLang(l)} style={{
                  background: lang === l ? C.forest : "transparent",
                  color: lang === l ? "#fff" : C.muted,
                  border: "none", padding: "4px 10px",
                  fontSize: 11, fontWeight: 700, cursor: "pointer",
                  fontFamily: "inherit", transition: "all 0.15s",
                }}>{l === "en" ? "EN" : "ID"}</button>
              ))}
            </div>
            <div style={{ width: 22, height: 22, background: roleObj.color, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ color: "#fff", fontSize: 9, fontWeight: 800 }}>{roleObj.label[0]}</span>
            </div>
            <span style={{ color: C.muted, fontSize: 11, fontWeight: 600 }}>{roleObj.label}</span>
            <button onClick={() => setRole(null)} style={{ background: C.creamDark, border: "none", color: C.muted, cursor: "pointer", fontSize: 10, fontFamily: "inherit", borderRadius: 5, padding: "3px 8px", fontWeight: 600 }}>{t("out")}</button>
          </div>
        </div>
        {/* Nav row */}
        <div style={{ display: "flex", overflowX: "auto", padding: "0 12px", borderTop: `1px solid ${C.creamDark}` }}>
          {NAV.map(n => (
            <button key={n.key} onClick={() => setTab(n.key)} style={{
              background: "transparent",
              color: tab === n.key ? C.forest : C.navInactive,
              borderBottom: tab === n.key ? `2px solid ${C.orange}` : "2px solid transparent",
              borderTop: "none", borderLeft: "none", borderRight: "none",
              padding: "10px 14px",
              cursor: "pointer", fontSize: 12, fontWeight: tab === n.key ? 700 : 500,
              fontFamily: "inherit", whiteSpace: "nowrap",
              flexShrink: 0, transition: "all 0.15s",
            }}>{n.label}</button>
          ))}
        </div>
      </div>

      {loading ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "60vh", gap: 12 }}>
          <div style={{ fontSize: 22 }}>🔄</div>
          <div style={{ color: C.muted, fontSize: 14, fontWeight: 600 }}>
            {sheetsUrl ? "Loading from Google Sheets…" : "Loading…"}
          </div>
          <div style={{ color: C.mutedLight, fontSize: 12 }}>
            {sheetsUrl ? "Syncing latest data from your Sheet" : ""}
          </div>
        </div>
      ) : (
        <div style={{ width: "100%", maxWidth: 640, margin: "0 auto", padding: "20px 16px", boxSizing: "border-box" }}>

          {/* ════════════════ DASHBOARD ════════════════ */}
          {tab === "dashboard" && (
            <div>
              <div style={{ marginBottom: 20 }}>
                <h1 style={{ fontSize: 24, fontWeight: 800, color: C.forest, fontFamily: "'Playfair Display', serif", margin: 0 }}>Hub Depok-01</h1>
                <p style={{ color: C.muted, fontSize: 13, marginTop: 3 }}>{t("livePilot")} <strong style={{ color: C.charcoal }}>{roleObj.name}</strong></p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12, marginBottom: 20 }}>
                {[
                  { label: t("totalPlasticLogged"), val: `${totalKg.toLocaleString()} kg`, sub: `${(totalKg/1000).toFixed(3)} MT` },
                  { label: t("creditsIssued"), val: totalCredits.toFixed(4), sub: "Plastic Credits (MT)", accent: true },
                  { label: t("totalBatches"), val: batches.length },
                  { label: t("awaitingVerification"), val: byStatus("processing"), warn: byStatus("processing") > 0 },
                ].map((s, i) => (
                  <div key={i} style={{
                    background: s.accent ? C.forest : C.cardBg,
                    borderRadius: 12, padding: "15px 18px",
                    border: `1px solid ${s.accent ? C.forestMid : s.warn && s.val > 0 ? C.orange+"60" : C.creamDark}`,
                    borderLeft: s.accent ? `4px solid ${C.orange}` : `4px solid ${s.warn && s.val > 0 ? C.orange : C.forestMid}`,
                    boxShadow: s.accent ? "0 2px 12px rgba(224,112,32,0.18)" : "0 1px 3px rgba(29,92,46,0.06)",
                  }}>
                    <div style={{ fontSize: 10, color: s.accent ? "#a8d4b0" : C.muted, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 4 }}>{s.label}</div>
                    <div style={{ fontSize: 24, fontWeight: 800, color: s.accent ? "#fff" : s.warn && s.val > 0 ? C.orange : C.forest, fontFamily: "'DM Mono', monospace" }}>{s.val}</div>
                    {s.sub && <div style={{ fontSize: 10, color: s.accent ? "#a8d4b0" : C.muted, marginTop: 2 }}>{s.sub}</div>}
                  </div>
                ))}
              </div>

              <Card style={{ marginBottom: 16 }} accent>
                <SectionTitle>{t("chainStatus")}</SectionTitle>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                  {[
                    { label: t("statusCollection"), s: "collection", color: "#e07020" },
                    { label: t("statusTransport"),  s: "transport",  color: C.blue },
                    { label: t("statusProcessing"), s: "processing", color: "#92600a" },
                    { label: t("statusVerified"),   s: "verified",   color: "#166534" },
                    { label: t("statusCredited"),   s: "credited",   color: C.forest },
                    { label: t("statusRejected"),   s: "rejected",   color: C.red },
                  ].map((x) => (
                    <div key={x.label} style={{ background: `${x.color}14`, borderRadius: 10, padding: "10px 12px", textAlign: "center", border: `1px solid ${x.color}22` }}>
                      <div style={{ fontSize: 20, fontWeight: 800, color: x.color, fontFamily: "'DM Mono', monospace" }}>{byStatus(x.s)}</div>
                      <div style={{ fontSize: 9, color: C.muted, fontWeight: 700, marginTop: 2, textTransform: "uppercase", letterSpacing: 0.3 }}>{x.label}</div>
                    </div>
                  ))}
                </div>
              </Card>

              {batches.length === 0 ? (
                <Card>
                  <div style={{ textAlign: "center", padding: "24px 0", color: C.muted }}>
                    <div style={{ fontSize: 32, marginBottom: 8 }}>📦</div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{t("noBatchesYet")}</div>
                    {canAccess("log") && <div style={{ fontSize: 13, marginTop: 6 }}>{t("goToNewBatch")}</div>}
                  </div>
                </Card>
              ) : (
                <Card accent>
                  <SectionTitle>{t("recentBatches")}</SectionTitle>
                  {batches.slice(0, 6).map(b => {
                    const firstActivity = b.activities?.[0];
                    const geo = firstActivity?.geo;
                    return (
                      <div key={b.id} onClick={() => setDetailView(b)} style={{ padding: "10px 0", borderBottom: `1px solid ${C.creamDark}`, cursor: "pointer" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                          <div>
                            <span style={{ fontFamily: "'DM Mono', monospace", color: C.forest, fontWeight: 700, fontSize: 12 }}>{b.batchId}</span>
                            <span style={{ color: C.muted, marginLeft: 10, fontSize: 12 }}>{b.feedstockType} · {Number(b.weightKg).toLocaleString()} kg</span>
                          </div>
                          <Badge status={b.status} lang={lang} />
                        </div>
                        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                          <span style={{ fontSize: 11, color: C.mutedLight }}>
                            🕐 {fmtDateTime(b.createdAt)}
                          </span>
                          {geo ? (
                            <a href={`https://www.google.com/maps?q=${geo.lat},${geo.lng}`} target="_blank" rel="noreferrer"
                              onClick={e => e.stopPropagation()}
                              style={{ fontSize: 11, color: C.forest, textDecoration: "none", fontFamily: "'DM Mono', monospace" }}>
                              📍 {geo.lat}, {geo.lng}{geo.accuracy ? ` ±${geo.accuracy}m` : ""}
                            </a>
                          ) : (
                            <span style={{ fontSize: 11, color: C.mutedLight }}>📍 No location</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </Card>
              )}
            </div>
          )}

          {/* ════════════════ NEW BATCH ════════════════ */}
          {tab === "log" && canAccess("log") && (
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 800, color: C.forest, fontFamily: "'Playfair Display', serif", margin: "0 0 4px" }}>{t("newBatch")}</h1>
              <p style={{ color: C.muted, fontSize: 13, margin: "0 0 20px" }}>{t("chainOfCustody")} · {t(STAGE_KEYS[stage - 1])}</p>

              <Card accent>
                <StageBar current={stage} lang={lang} />

                {/* Stage 1 */}
                {stage === 1 && (
                  <div>
                    <SectionTitle>Stage 1 — Collection Data</SectionTitle>
                    <div style={{ background: "#fffbf5", border: `1px solid #f0e8d8`, borderRadius: 10, padding: "10px 14px", marginBottom: 16, fontSize: 12, color: C.muted }}>
                      PPRS v8: Record feedstock type, gross weight, weighing equipment ID, and collector identity for every batch.
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 13, marginBottom: 13 }}>
                      <Sel label="Feedstock Type" value={col.feedstockType} onChange={v => setCol(p=>({...p,feedstockType:v}))} options={FEEDSTOCK_TYPES} required />
                      <Inp label="Gross Weight (kg)" type="number" value={col.weightKg} onChange={v => setCol(p=>({...p,weightKg:v}))} placeholder="e.g. 1500" required />
                      <Sel label="Collector / Worker" value={col.collectorId} onChange={v => setCol(p=>({...p,collectorId:v}))} options={COLLECTORS} required />
                      <Sel label="Weighing Equipment" value={col.weighingEquipId} onChange={v => setCol(p=>({...p,weighingEquipId:v}))} options={SCALES} required />
                      <div>
                        <Lbl>Calibration Certificate <span style={{ color: C.orange, fontWeight: 700 }}>*</span></Lbl>
                        <div style={{ fontSize: 11, color: C.muted, marginBottom: 6 }}>PPRS v8 requires valid calibration certificate for weighing equipment. Upload photo or scan.</div>
                        <input type="file" accept="image/*,application/pdf" capture="environment" onChange={e => { const file = e.target.files[0]; if (!file) return; const reader = new FileReader(); reader.onload = ev => setCol(p=>({...p,calibCertUrl:ev.target.result})); reader.readAsDataURL(file); }} style={{ fontSize: 12, color: C.muted }} />
                        {col.calibCertUrl && (
                          <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 8, background: "#e8f5e9", borderRadius: 6, padding: "6px 10px" }}>
                            <span style={{ fontSize: 18 }}>📋</span>
                            <span style={{ fontSize: 12, color: C.forest, fontWeight: 600 }}>Certificate attached</span>
                            <button onClick={() => setCol(p=>({...p,calibCertUrl:null}))} style={{ marginLeft: "auto", background: "none", border: "none", color: C.muted, cursor: "pointer", fontSize: 11 }}>Remove</button>
                          </div>
                        )}
                        {!col.calibCertUrl && (
                          <div style={{ marginTop: 4, fontSize: 11, color: "#c0392b" }}>Required — calibration proof must be attached per PPRS chain-of-custody requirements.</div>
                        )}
                      </div>
                      <Inp label="Collection Date" type="date" value={col.collectionDate} onChange={v => setCol(p=>({...p,collectionDate:v}))} required />
                      <MapPicker value={colGeo} onChange={setColGeo} lang={lang} />
                    </div>
                    <div style={{ marginBottom: 13 }}>
                      <Lbl>{t("notes")}</Lbl>
                      <textarea value={col.notes} onChange={e => setCol(p=>({...p,notes:e.target.value}))} rows={2} placeholder={t("notesPlaceholder")} style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${C.creamDark}`, background: C.pageBg, fontSize: 13, color: C.charcoal, outline: "none", resize: "vertical", boxSizing: "border-box", fontFamily: "inherit" }} />
                    </div>
                    <div style={{ marginBottom: 18 }}>
                      <Lbl>{t("collectionPhoto")}</Lbl>
                      <input type="file" accept="image/*" onChange={handlePhoto} style={{ fontSize: 12, color: C.muted }} />
                      {col.photoDataUrl && <img src={col.photoDataUrl} alt="preview" style={{ marginTop: 8, width: "100%", maxHeight: 160, objectFit: "cover", borderRadius: 8 }} />}
                    </div>
                    {col.weightKg > 0 && (
                      <div style={{ background: "#e8f5e9", borderRadius: 8, padding: "9px 14px", marginBottom: 16, fontSize: 12, color: C.forest, fontWeight: 600 }}>
                        {Number(col.weightKg).toLocaleString()} kg = {kgToTonnes(col.weightKg).toFixed(4)} MT → <strong>{kgToTonnes(col.weightKg).toFixed(4)} Plastic Credits</strong> (pending full chain + VVB)
                      </div>
                    )}
                    <SignaturePad label="Collector Signature" value={sigCol} onChange={setSigCol} />
                    <div style={{marginTop:12}}><Btn onClick={submitCollection} variant="primary" disabled={!sigCol}>{t("logCollection")}</Btn></div>
                  </div>
                )}

                {/* Stage 2 */}
                {stage === 2 && active && (
                  <div>
                    <SectionTitle>Stage 2 — Transport Documentation</SectionTitle>
                    <div style={{ background: C.creamMid, borderRadius: 10, padding: "11px 15px", marginBottom: 16, fontSize: 13 }}>
                      Batch <span style={{ fontFamily: "'DM Mono', monospace", color: C.forest, fontWeight: 700 }}>{active.batchId}</span> · {active.feedstockType} · {Number(active.weightKg).toLocaleString()} kg
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 13, marginBottom: 13 }}>
                      <Inp label={t("transportRef")} value={trn.transportRef} onChange={v => setTrn(p=>({...p,transportRef:v}))} placeholder={t("transportRefPlaceholder")} required />
                      <Inp label={t("transportDate")} type="date" value={trn.transportDate} onChange={v => setTrn(p=>({...p,transportDate:v}))} required />
                      <MapPicker value={trnGeo} onChange={setTrnGeo} lang={lang} />
                    </div>
                    <div style={{ marginBottom: 18 }}>
                      <Lbl>{t("transportPhoto")}</Lbl>
                      <input type="file" accept="image/*" capture="environment" onChange={handleTransportPhoto} style={{ fontSize: 12, color: C.muted }} />
                      {trn.photoDataUrl && (
                        <div style={{ position: "relative", marginTop: 8 }}>
                          <img src={trn.photoDataUrl} alt="transport" style={{ width: "100%", maxHeight: 160, objectFit: "cover", borderRadius: 8 }} />
                          <button onClick={() => setTrn(p=>({...p,photoDataUrl:null}))} style={{ position: "absolute", top: 6, right: 6, background: "rgba(0,0,0,0.55)", color: "#fff", border: "none", borderRadius: 6, padding: "3px 8px", fontSize: 11, cursor: "pointer" }}>Remove</button>
                        </div>
                      )}
                    </div>
                    <SignaturePad label="Transport Officer Signature" value={sigTrn} onChange={setSigTrn} />
                    <div style={{marginTop:12}}><Btn onClick={submitTransport} variant="primary" disabled={!sigTrn}>{t("confirmTransport")}</Btn></div>
                  </div>
                )}

                {/* Stage 3 */}
                {stage === 3 && active && (
                  <div>
                    <SectionTitle>{t("stage3Title")}</SectionTitle>
                    <div style={{ background: "#fff8e1", border: `1px solid #f0d58a`, borderRadius: 10, padding: "10px 14px", marginBottom: 14, fontSize: 12, color: "#7a5800" }}>
                      ⚠ PPRS v8 Global Standard: End-of-Waste is reached when the material undergoes a qualifying recovery operation and meets all four criteria: (1) commonly used substance, (2) market/demand exists, (3) meets technical standards, (4) no adverse environmental impact. Landfill and open burning are excluded.
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 13, marginBottom: 13 }}>
                      <Inp label={t("processingFacility")} value={prc.processor} onChange={v => setPrc(p=>({...p,processor:v}))} placeholder={t("processingFacilityPlaceholder")} required />
                      <Sel label={t("eowProcess")} value={prc.eowProcess} onChange={v => setPrc(p=>({...p,eowProcess:v}))} options={EOW_PROCESSES} required />
                      <Inp label={t("processingEndDate")} type="date" value={prc.processingEndDate} onChange={v => setPrc(p=>({...p,processingEndDate:v}))} required />
                      <MapPicker value={prcGeo} onChange={setPrcGeo} lang={lang} />
                    </div>
                    <div style={{ marginBottom: 18 }}>
                      <Lbl>{t("processingPhoto")}</Lbl>
                      <input type="file" accept="image/*" capture="environment" onChange={handleProcessingPhoto} style={{ fontSize: 12, color: C.muted }} />
                      {prc.photoDataUrl && (
                        <div style={{ position: "relative", marginTop: 8 }}>
                          <img src={prc.photoDataUrl} alt="processing" style={{ width: "100%", maxHeight: 160, objectFit: "cover", borderRadius: 8 }} />
                          <button onClick={() => setPrc(p=>({...p,photoDataUrl:null}))} style={{ position: "absolute", top: 6, right: 6, background: "rgba(0,0,0,0.55)", color: "#fff", border: "none", borderRadius: 6, padding: "3px 8px", fontSize: 11, cursor: "pointer" }}>Remove</button>
                        </div>
                      )}
                    </div>
                    <SignaturePad label="Processor Signature" value={sigPrc} onChange={setSigPrc} />
                    <div style={{marginTop:12}}><Btn onClick={submitProcessing} variant="accent" disabled={!sigPrc}>{t("confirmProcessing")}</Btn></div>
                    <div style={{ marginTop: 16, background: "#e8f5e9", borderRadius: 8, padding: "12px 14px", fontSize: 12, color: C.forest, border: `1px solid #b2dfb2` }}>
                      <strong>✓ Chain of Custody Complete (Operator Scope)</strong><br/>
                      Collection → Transport → End-of-Waste Processing documented.<br/>
                      <span style={{ color: C.muted, marginTop: 4, display: "block" }}>Verification and credit issuance will be executed externally by the VVB and PCX Solutions Registry.</span>
                    </div>
                  </div>
                )}
              </Card>
            </div>
          )}

          {/* ════════════════ VERIFY TAB ════════════════ */}
          {tab === "verify" && canAccess("verify") && (
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 800, color: C.forest, fontFamily: "'Playfair Display', serif", margin: "0 0 4px" }}>Verification Queue</h1>
              <p style={{ color: C.muted, fontSize: 13, margin: "0 0 20px" }}>Batches awaiting VVB review · {roleObj.name}</p>

              {batches.filter(b => b.status === "processing").length === 0 ? (
                <Card>
                  <div style={{ textAlign: "center", padding: "24px 0", color: C.muted }}>
                    <div style={{ fontSize: 28, marginBottom: 8 }}>✓</div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>No batches pending verification.</div>
                  </div>
                </Card>
              ) : (
                batches.filter(b => b.status === "processing").map(b => (
                  <Card key={b.id} style={{ marginBottom: 12 }} accent>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                      <div>
                        <div style={{ fontFamily: "'DM Mono', monospace", color: C.forest, fontWeight: 700, fontSize: 13 }}>{b.batchId}</div>
                        <div style={{ fontSize: 15, fontWeight: 700, color: C.charcoal, marginTop: 2 }}>{b.feedstockType} · {Number(b.weightKg).toLocaleString()} kg</div>
                      </div>
                      <Badge status={b.status} lang={lang} />
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "8px 20px", marginBottom: 14 }}>
                      {[["Hub","Hub Depok-01"],["Collector",b.collectorId],["Collection Date",fmtDate(b.collectionDate)],["Transport Ref.",b.transportRef],["Processor",b.processor],["EoW Process",b.eowProcess]].map(([k,v])=>(
                        <InfoRow key={k} label={k} value={v} />
                      ))}
                    </div>
                    {b.photoDataUrl && <img src={b.photoDataUrl} alt="collection" style={{ width: "100%", maxHeight: 140, objectFit: "cover", borderRadius: 8, marginBottom: 14 }} />}

                    {/* Compact activity trail */}
                    {b.activities && b.activities.length > 0 && (
                      <div style={{ background: C.pageBg, borderRadius: 10, padding: "12px 14px", marginBottom: 14 }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: C.muted, letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 10 }}>Chain of Custody Trail</div>
                        {b.activities.map((a, i) => {
                          const geo = a.geo;
                          return (
                            <div key={i} style={{ display: "flex", gap: 10, marginBottom: i < b.activities.length - 1 ? 10 : 0, alignItems: "flex-start" }}>
                              <div style={{ width: 22, height: 22, borderRadius: "50%", background: C.forest, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 10 }}>
                                {STAGE_ICONS[a.stage] || "•"}
                              </div>
                              <div style={{ flex: 1 }}>
                                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "baseline" }}>
                                  <span style={{ fontSize: 12, fontWeight: 700, color: C.charcoal }}>{a.stage}</span>
                                  <span style={{ fontSize: 11, color: C.mutedLight }}>by {a.actor}</span>
                                </div>
                                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 2 }}>
                                  <span style={{ fontSize: 10, color: C.muted, fontFamily: "'DM Mono', monospace" }}>🕐 {fmtDateTime(a.ts)}</span>
                                  {geo ? (
                                    <a href={`https://www.google.com/maps?q=${geo.lat},${geo.lng}`} target="_blank" rel="noreferrer"
                                      style={{ fontSize: 10, color: C.forest, fontFamily: "'DM Mono', monospace", textDecoration: "none" }}>
                                      📍 {geo.lat}, {geo.lng}{geo.accuracy ? ` ±${geo.accuracy}m` : ""}
                                    </a>
                                  ) : (
                                    <span style={{ fontSize: 10, color: C.mutedLight }}>📍 Location not captured</span>
                                  )}
                                </div>
                                {a.note && <div style={{ fontSize: 10, color: C.muted, marginTop: 1, fontStyle: "italic" }}>{a.note}</div>}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    <ActivityLog activities={[]} lang={lang} />{/* full log in detail view */}
                    <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
                      <Btn small onClick={() => { updateBatch(b.id, { status: "verified", vvb: ROLES.verifier.name }); showToast(`Batch ${b.batchId} approved.`); }} variant="blue">Approve →</Btn>
                      <Btn small onClick={() => setRejectTarget(b.id)} variant="danger">Reject</Btn>
                      <Btn small onClick={() => setDetailView(b)} variant="ghost">View Details</Btn>
                    </div>
                  </Card>
                ))
              )}
            </div>
          )}

          {/* ════════════════ RECORDS ════════════════ */}
          {tab === "records" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 20 }}>
                <div>
                  <h1 style={{ fontSize: 24, fontWeight: 800, color: C.forest, fontFamily: "'Playfair Display', serif", margin: 0 }}>{t("batchRecords")}</h1>
                  <p style={{ color: C.muted, fontSize: 13, marginTop: 3 }}>{batches.length} batches · Hub Depok-01</p>
                </div>
                {canAccess("log") && <Btn onClick={() => setTab("log")} variant="primary">{t("addNewBatch")}</Btn>}
              </div>

              {batches.length === 0 ? (
                <Card>
                  <div style={{ textAlign: "center", padding: "24px 0", color: C.muted }}>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>No records yet.</div>
                  </div>
                </Card>
              ) : (
                <div style={{ width: "100%", overflowX: "auto", borderRadius: 14, border: `1px solid ${C.creamDark}`, background: C.white }}>
                  <table style={{ width: "100%", minWidth: 480, borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ background: C.cream }}>
                        {["Batch ID","Feedstock","Weight","Collector","Status","Logged At","Collection GPS",""].map(h => (
                          <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 10, fontWeight: 700, color: C.muted, letterSpacing: 0.5, textTransform: "uppercase", borderBottom: `1px solid ${C.creamDark}`, whiteSpace: "nowrap" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {batches.map((b, i) => {
                        const collectionActivity = b.activities?.find(a => a.stage === "Collection");
                        const geo = collectionActivity?.geo;
                        // Fall back to sheet fields when activities is empty (seed/imported data)
                        const collectionLat = (geo?.lat != null && geo.lat !== "") ? geo.lat : b.collectionLat;
                        const collectionLng = (geo?.lng != null && geo.lng !== "") ? geo.lng : b.collectionLng;
                        const hasGeo = collectionLat != null && collectionLat !== "" && !isNaN(Number(collectionLat))
                                    && collectionLng != null && collectionLng !== "" && !isNaN(Number(collectionLng));
                        const loggedAt = b.createdAt || b.collectionDate;
                        return (
                          <tr key={b.id} onClick={() => setDetailView(b)} style={{ background: i % 2 === 0 ? C.cardBg : C.creamMid, borderBottom: `1px solid ${C.creamDark}`, cursor: "pointer" }}>
                            <td style={{ padding: "10px 14px", fontFamily: "'DM Mono', monospace", fontSize: 11, color: C.forest, fontWeight: 700 }}>{b.batchId}</td>
                            <td style={{ padding: "10px 14px", fontSize: 12 }}>{b.feedstockType}</td>
                            <td style={{ padding: "10px 14px", fontSize: 12, fontWeight: 700, whiteSpace: "nowrap" }}>{Number(b.weightKg).toLocaleString()} kg</td>
                            <td style={{ padding: "10px 14px", fontSize: 11, color: C.muted }}>{b.collectorId?.split("–")[0]?.trim()}</td>
                            <td style={{ padding: "10px 14px" }}><Badge status={b.status} lang={lang} /></td>
                            <td style={{ padding: "10px 14px", fontSize: 11, color: C.muted, whiteSpace: "nowrap" }}>
                              {fmtDateTime(loggedAt)}
                            </td>
                            <td style={{ padding: "10px 14px", fontSize: 11 }}>
                              {hasGeo ? (
                                <a href={`https://www.google.com/maps?q=${collectionLat},${collectionLng}`}
                                  target="_blank" rel="noreferrer"
                                  onClick={e => e.stopPropagation()}
                                  style={{ color: C.forest, textDecoration: "none", fontFamily: "'DM Mono', monospace", fontSize: 10, display: "flex", alignItems: "center", gap: 3 }}>
                                  📍 {Number(collectionLat).toFixed(5)}, {Number(collectionLng).toFixed(5)}
                                  {geo?.accuracy && <span style={{ color: C.mutedLight }}>±{geo.accuracy}m</span>}
                                </a>
                              ) : (
                                <span style={{ color: C.mutedLight }}>—</span>
                              )}
                            </td>
                            <td style={{ padding: "10px 14px" }}>
                              {b.status === "credited" && <Btn small onClick={e => { e.stopPropagation(); setCertView(b); }} variant="primary">PCC</Btn>}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}


          {/* ════════════════ ANALYTICS ════════════════ */}
          {tab === "analytics" && canAccess("settings") && (
            <AnalyticsPanel batches={batches} sheetsUrl={sheetsUrl} />
          )}

          {/* ════════════════ SETTINGS ════════════════ */}
          {tab === "settings" && canAccess("settings") && (
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 800, color: C.forest, fontFamily: "'Playfair Display', serif", margin: "0 0 4px" }}>Settings</h1>
              <p style={{ color: C.muted, fontSize: 13, margin: "0 0 20px" }}>Hub configuration · Admin only</p>

              {/* ── Google Sheets ── */}
              <Card style={{ marginBottom: 16 }}>
                <SectionTitle>Google Sheets Integration</SectionTitle>
                <div style={{ fontSize: 13, color: C.muted, marginBottom: 14, lineHeight: 1.6 }}>
                  Every batch action syncs automatically to your Google Sheet when a URL is configured.
                  The Sheet will have three tabs: <strong>Batches</strong>, <strong>Activity Log</strong>, and <strong>Credits Issued</strong>.
                </div>

                {/* Step-by-step */}
                <div style={{ background: "#e8f5e9", borderRadius: 10, padding: "14px 18px", marginBottom: 16 }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: C.forest, letterSpacing: 0.4, textTransform: "uppercase", marginBottom: 10 }}>Setup Steps (do once)</div>
                  {[
                    "Open your Google Sheet → Extensions → Apps Script",
                    "Delete existing code, paste the rezy-mrv-apps-script.js file",
                    "Click Save, then Deploy → New Deployment",
                    'Set "Execute as: Me" and "Who has access: Anyone"',
                    "Click Deploy → copy the Web App URL",
                    "Paste it below and click Test Connection",
                  ].map((step, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, marginBottom: 6, alignItems: "flex-start" }}>
                      <div style={{ width: 20, height: 20, background: C.forest, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <span style={{ color: "#fff", fontSize: 10, fontWeight: 800 }}>{i + 1}</span>
                      </div>
                      <span style={{ fontSize: 12, color: C.charcoal, lineHeight: 1.5 }}>{step}</span>
                    </div>
                  ))}
                </div>

                <Inp
                  label="Apps Script Web App URL"
                  value={sheetsUrl}
                  onChange={v => setSheetsUrl(v)}
                  placeholder="https://script.google.com/macros/s/…/exec"
                />
                <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
                  <Btn small onClick={async () => {
                    showToast("Opening in new tab — check for ok:true");
                    window.open(sheetsUrl, "_blank");
                    setSyncStatus("ok");
                    setTimeout(() => setSyncStatus(null), 3000);
                  }} variant="primary" disabled={!sheetsUrl}>
                    {t("testConnection")}
                  </Btn>
                  <Btn small onClick={async () => {
                    await saveSettings({ ...settings, sheetsUrl });
                    showToast("URL saved.");
                  }} variant="secondary" disabled={!sheetsUrl}>
                    Save URL
                  </Btn>
                </div>

                {sheetsUrl && (
                  <div style={{ marginTop: 14 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: 0.4, textTransform: "uppercase", marginBottom: 6 }}>Sync existing batches to Sheet</div>
                    <div style={{ fontSize: 12, color: C.muted, marginBottom: 8 }}>Push all {batches.length} stored batches to the Sheet now. Useful after first setup.</div>
                    <Btn small onClick={async () => {
                      if (!sheetsUrl) return;
                      setSyncStatus("syncing");
                      showToast("Syncing to Sheets…");
                      let synced = 0;
                      for (const b of batches) {
                        try {
                          await syncToSheets(sheetsUrl, b, null);
                          synced++;
                          // Small delay to avoid rate limiting
                          await new Promise(r => setTimeout(r, 300));
                        } catch {}
                      }
                      setSyncStatus("ok");
                      showToast(`Synced ${synced}/${batches.length} batches. Check your Sheet.`);
                      setTimeout(() => setSyncStatus(null), 4000);
                    }} variant="accent">
                      {t("bulkSync")} ({batches.length})
                    </Btn>
                  </div>
                )}
              </Card>

              {/* ── Role PINs ── */}
              <Card style={{ marginBottom: 16 }}>
                <SectionTitle>Role Access PINs</SectionTitle>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {Object.entries(ROLES).map(([key, r]) => (
                    <div key={key} style={{ background: C.creamMid, borderRadius: 10, padding: "12px 16px" }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: r.color, marginBottom: 2 }}>{r.label}</div>
                      <div style={{ fontSize: 11, color: C.muted, marginBottom: 4 }}>{r.desc}</div>
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: C.charcoal, fontWeight: 700 }}>PIN: {r.pin}</div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 10, fontSize: 12, color: C.muted }}>To change PINs, update the ROLES constant in source. Use a proper auth system for production scale.</div>
              </Card>

              {/* ── Data ── */}
              <Card>
                <SectionTitle>Data Management</SectionTitle>
                <div style={{ fontSize: 13, color: C.muted, marginBottom: 14 }}>
                  {batches.length} batches stored · {(JSON.stringify(batches).length / 1024).toFixed(1)} KB · Persistent across sessions.
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <Btn small onClick={() => {
                    const data = JSON.stringify(batches, null, 2);
                    const blob = new Blob([data], { type: "application/json" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url; a.download = `rezy-depok-${new Date().toISOString().slice(0,10)}.json`;
                    a.click();
                    showToast("JSON backup exported.");
                  }} variant="secondary">Export JSON Backup</Btn>
                  <Btn small onClick={() => {
                    if (window.confirm("Delete ALL batch data? Cannot be undone.")) {
                      mutateBatches(() => []);
                      showToast("All data cleared.", "warn");
                    }
                  }} variant="danger">Clear All Data</Btn>
                </div>
              </Card>
            </div>
          )}
        </div>
      )}

      {/* styles injected via useEffect to avoid JSX/CSS brace conflict */}
    </div>
  );
}