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
    demoPins: "Demo PINs — Admin: 1234 · Collection: 1111 · Transport: 2222 · Processing: 3333 · Off-taker Transport: 4444 · Downstream: 5555",
    mrvPlatform: "MRV Platform",
    // Roles
    roleAdmin: "Admin", roleOperator: "Hub Operator", roleCollection: "Collection Operator", roleTransport: "Transport Operator", roleProcessing: "Processing Operator", roleVerifier: "VVB Verifier", roleBuyer: "EPR Buyer",
    roleAdminDesc: "Full access — Rezycology HQ",
    roleOperatorDesc: "Hub Depok-01 — data entry only",
    roleCollectionDesc: "Collection input only",
    roleTransportDesc: "Transport input only",
    roleProcessingDesc: "Processing input only",
    roleVerifierDesc: "SCS Global Services — verification only",
    roleBuyerDesc: "EPR Sponsor — read-only credit view",
    // Dashboard
    totalPlasticLogged: "Total Plastic Logged", creditsIssued: "Credits Issued",
    totalBatches: "Total Batches", awaitingVerification: "Awaiting Verification",
    chainStatus: "Chain Status · End-to-End", recentBatches: "Recent Batches",
    noBatchesYet: "No batches yet.", goToNewBatch: "Go to New Batch to log your first collection.",
    livePilot: "Signed in as",
    // Stages
    stageCollection: "Collection", stageTransport: "Collection to Hub Transport",
    stageProcessing: "Processing at Hub", stageOfftakerTransport: "Transport to Off-takers",
    stageDownstreamProcessing: "Downstream Processing",
    entryDescCollection: "Record feedstock received at collection point.",
    entryDescTransport: "Record movement from collection point to hub.",
    entryDescProcessing: "Record hub processing activity directly.",
    entryDescOfftakerTransport: "Record movement of processed material from hub to off-takers.",
    entryDescDownstream: "Record downstream processing activity at the off-taker facility.",
    allFacilities: "All Facilities",
    noBatchesAtProcessingFacility: "No batches delivered to the processing facility yet.",
    noBatchesAtOfftakers: "No batches delivered to off-takers yet.",
    selectPlaceholder: "Select…",
    searchNamePlaceholder: "Search name…",
    noMatches: "No matches",
    digitalSignature: "Digital Signature",
    clearSignature: "Clear",
    signHere: "Sign here",
    signedAt: "Signed",
    stageVerification: "Verification", stageCredit: "Credit",
    chainOfCustody: "Chain of Custody",
    // Stage 1
    stage1Title: "Stage 1 — Collection Data",
    stage1Note: "Record feedstock type, gross weight, weighing equipment ID, and collector identity for every batch.",
    feedstockType: "Feedstock Type", grossWeight: "Gross Weight (kg)",
    collector: "Lapak Name", weighingEquip: "Weighing Equipment",
    collectionDate: "Collection Date", notes: "Notes / Field Observations",
    notesPlaceholder: "Condition of batch, contamination notes, etc.",
    collectionPhoto: "Collection Photo (chain-of-custody evidence)",
    enterLapakName: "Enter lapak name",
    endToEndYield: "End-to-end yield",
    completedLinesOnly: "completed lines only",
    stillInProgressKg: "Still in progress",
    notCountedAsLoss: "not counted as loss",
    lostLabel: "lost across the chain",
    collectedLabelShort: "collected",
    hubAcceptedLabelShort: "accepted at hub",
    shippedLabelShort: "shipped to off-taker",
    downstreamOutputLabelShort: "downstream output",
    proRataNote: "Pro rata share of the downstream run",
    downstreamRunInput: "run input",
    lapakBillPhoto: "Lapak Bill Photo",
    qcReportPhoto: "QC Report Photo",
    qcReportPhotoNote: "Photograph the quality-control report for this processed line.",
    autoCalculated: "auto",
    outputExceedsInput: "Contamination + rejected exceeds the input weight of this line",
    inputLabelShort: "input",
    acceptedLabelShort: "accepted",
    contaminationLabelShort: "contamination",
    rejectedLabelShort: "rejected",
    lapakBillPhotoNote: "Photograph the bill/receipt issued by the lapak for this collection.",
    creditEstimate: "pending full chain + VVB",
    logCollection: "Save →",
    // Stage 2
    stage2Title: "Stage 2 — Transport Documentation",
    transportRef: "Transport Manifest Ref.", transportDate: "Transport Date",
    transportRefPlaceholder: "e.g. MNF-DPK-2026-041",
    transportPhoto: "Transport Photo (vehicle, loading, manifest)",
    confirmTransport: "Confirm Transport →",
    // Stage 3
    stage3Title: "Stage 3 — End-of-Waste Processing",
    landfillWarning: "⚠ End-of-Waste is reached when the material undergoes a qualifying recovery operation and meets all four criteria: (1) commonly used substance, (2) market/demand exists, (3) meets technical standards, (4) no adverse environmental impact. Landfill and open burning are excluded.",
    processingFacility: "Processing Facility", eowProcess: "End-of-Waste Process",
    processingEndDate: "Processing End Date",
    processingFacilityPlaceholder: "e.g. PT Daur Ulang Nusantara",
    processingFacilityOther: "Other Facility Name",
    processingFacilityOtherPlaceholder: "Enter facility name",
    processingPhoto: "Processing Photo (facility, sorting, output)",
    processedMaterial: "Material Processed", processedMaterialPlaceholder: "Select material…",
    acceptedWeight: "Accepted Weight (kg)", rejectedWeight: "Rejected Weight (kg)",
    contaminationVolume: "Contamination Volume (kg)", contaminationNote: "Contamination Notes",
    contaminationNotePlaceholder: "Describe the contamination found…",
    contaminationPhoto: "Contamination Photo",
    yieldVariance: "Yield Variance",
    yieldRatio: "Yield Ratio",
    confirmProcessing: "Confirm Processing →",
    // Stage 4
    stage4Title: "Stage 4 — VVB Impact Verification",
    stage4Note: "A third-party VVB approved by PCX Solutions is required. The VVB reviews chain-of-custody records before credits can be issued.",
    chainSummary: "Chain of Custody Summary",
    vvbLabel: "VVB (Verra-Approved)", vvbAuditRef: "VVB Audit Reference No.",
    vvbAuditPlaceholder: "e.g. SCS-2026-IDN-0044",
    eprBuyer: "EPR Credit Buyer",
    confirmVerification: "Confirm VVB Verification →",
    // Stage 5
    stage5Title: "Stage 5 — Plastic Credit Issuance",
    creditsToBeIssued: "Credits to be Issued",
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
    certNote: "Prototype PCC — binding issuance requires Registry + VVB sign-off.",
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
    clearData: "Clear All Data",
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
    statusCollection: "Collection", statusTransport: "Collection to Hub Transport",
    statusProcessing: "Processing at Hub", statusVerified: "Verified",
    statusCredited: "Credit Issued", statusRejected: "Rejected",
    statusOfftakerTransport: "Transport to Off-takers",
    statusDownstreamProcessing: "Downstream Processing",
    adminRejected: "Admin Rejected",
    exceptionsLabel: "Exceptions",
    pendingAdminReview: "Pending Admin Review",
    acceptedInputs: "Accepted Inputs",
    rejectedSuffix: "rejected",
    // Stage forms — batch entry
    weightPlaceholder: "e.g. 1500",
    calibCert: "Calibration Certificate",
    calibCertNote: "A valid calibration certificate is required for the weighing equipment. Upload a photo or scan.",
    certAttached: "Certificate attached",
    calibCertRequired: "Required — calibration proof must be attached per chain-of-custody requirements.",
    weighingPhotoNote: "Photo of the weighing process as collection evidence.",
    sigCollector: "Collector Signature",
    sigTransportOfficer: "Transport Officer Signature",
    sigProcessor: "Processor Signature",
    // Records / detail
    noRecordsYet: "No records yet.",
    weighingEquipShort: "Weighing Equip.",
    processorLabel: "Processor",
    procEndDate: "Proc. End Date",
    loggedByLabel: "Logged By",
    digitalSignatures: "Digital Signatures",
    notesLabel: "Notes",
    // New Batch — operator input forms
    selectOperatorInput: "Select Operator Input",
    searchBatchId: "Search batch ID…",
    referenceBatchId: "Reference Batch ID",
    collectionTimestamp: "Collection Timestamp (GMT+7)",
    transportTimestamp: "Transport Timestamp (GMT+7)",
    processingTimestamp: "Processing Timestamp (GMT+7)",
    materialsLabel: "Materials",
    materialPickupVehicle: "Material Pick-up Vehicle",
    materialPlateNo: "Material Plate No.",
    handwrittenWeighingId: "Handwritten Weighing Identification",
    batchAvailableForPickup: "Batch Available for Pickup (collected D-day / D-1)",
    batchAvailableToProcess: "Batch Available to Process (delivered by transport manifest)",
    batchesAvailableOfftaker: "Batches Available for Off-taker Pickup (processed at hub)",
    // Admin Review / Verify tab
    adminReviewTitle: "Admin Review",
    adminReviewSubtitle: "Accept or reject operator inputs",
    selectedForTransport: "Selected for this Transport",
    stageStalledLines: "Waiting on material lines still at the hub",
    filterAll: "All",
    pageLabel: "Page",
    filterInput: "Filter Input",
    findReviewItems: "Find Review Items",
    findRecords: "Find Records",
    fromDate: "From Date",
    toDate: "To Date",
    minKg: "Min kg",
    maxKg: "Max kg",
    searchReviewPlaceholder: "Search batch, feedstock, inputter, manifest...",
    searchRecordsPlaceholder: "Search batch, material, operator, manifest...",
    acceptInput: "Accept Input",
    acceptLabel: "Accept",
    detailsLabel: "Details",
    prevLabel: "Prev",
    nextLabel: "Next",
    refreshData: "Refresh Data",
    noPendingReview: "No operator inputs pending review.",
    showingLabel: "Showing",
    ofLabel: "of",
    // Custody + Settings tabs
    custodySubtitle: "Verifiable material movement from lapak to downstream processing",
    inProgress: "In progress",
    searchLabel: "Search",
    batchLabelShort: "Batch",
    backendSync: "Backend Sync",
    backendUrlLabel: "Backend URL (Apps Script or Supabase)",
    syncExistingToBackend: "Sync existing batches to backend",
    generateFromBackend: "Generate app data from backend",
    adminReviewDevice: "Admin Review Device",
    settingsAccessDevice: "Settings Access Device",
    // Full UI sweep
    readingPhoto: "Reading photo...",
    analyticsTitle: "Analytics",
    pickupVehicleLabel: "Pick-up Vehicle",
    transportRefShort: "Transport Ref.",
    offtakerTransportRef: "Offtaker Transport Ref.",
    offtakerTransportDate: "Offtaker Transport Date",
    offtakerPlateNo: "Offtaker Plate No.",
    downstreamMaterialProcessed: "Downstream Material Processed",
    downstreamEowProcess: "Downstream EoW Process",
    downstreamProcEndDate: "Downstream Proc. End Date",
    collectionInputterIp: "Collection Inputter IP",
    collectionInputterId: "Collection Inputter ID",
    transportInputterIp: "Transport Inputter IP",
    transportInputterId: "Transport Inputter ID",
    processingInputterIp: "Processing Inputter IP",
    processingInputterId: "Processing Inputter ID",
    offtakerInputterIp: "Offtaker Transport Inputter IP",
    offtakerInputterId: "Offtaker Transport Inputter ID",
    downstreamInputterIp: "Downstream Processing Inputter IP",
    downstreamInputterId: "Downstream Processing Inputter ID",
    weighingIdLabel: "Weighing ID",
    sigTransportShort: "Transport Signature",
    weighingProcessEvidence: "Weighing Process Evidence",
    deleteBatchLabel: "Delete Batch",
    noRecentForCategory: "No recent batches for this input category.",
    chooseOperatorInput: "Choose which operator input you want to record.",
    changeInput: "Change Input",
    materialType: "Material Type",
    handwrittenPhotoNote: "Photo of the handwritten weighing ID or scale note for this material record.",
    autoGenerate: "Auto-generate",
    weightKgLabel: "Weight (kg)",
    noProcessedMatch: "No processed batches match the selected feedstock type(s).",
    noProcessedAwaiting: "No processed batches awaiting off-taker pickup yet.",
    photoDeliveryOrder: "Photo of Delivery Order",
    batchAvailableDownstream: "Batch Available for Downstream Processing (delivered to off-taker)",
    downstreamFacilityOther: "Downstream Facility (Other)",
    enterFacilityName: "Enter facility name",
    listView: "List View",
    cardView: "Card View",
    stageLabel: "Stage",
    operatorLabel: "Operator",
    actionsLabel: "Actions",
    materialLabel: "Material",
    inputterIpLabel: "Inputter IP",
    inputterLabel: "Inputter",
    timeLabel: "Time",
    settingsSubtitleText: "Hub configuration · Admin only",
    settingsEnabledHere: "Settings is enabled on this device",
    settingsDisabledHere: "Settings is disabled on this device",
    reviewEnabledHere: "Admin Review is enabled on this device",
    reviewDisabledHere: "Admin Review is disabled on this device",
    disableHere: "Disable Here",
    enableHere: "Enable Here",
    rejectedExceedsAccepted: "Rejected weight cannot exceed accepted weight — please check the figures.",
    roleOfftakerTransport: "Operator Off-taker Transport",
    roleOfftakerTransportDesc: "Transport to off-takers input only",
    roleDownstreamProcessing: "Operator Downstream Processing",
    roleDownstreamProcessingDesc: "Downstream processing input only",
    // Off-taker transport + downstream processing pages
    downstreamFacility: "Downstream Facility",
    sigDownstreamProcessor: "Downstream Processor Signature",
    sigOfftakerTransport: "Off-taker Transport Signature",
    confirmOfftakerTransport: "Confirm Off-taker Transport →",
    confirmDownstreamProcessing: "Confirm Downstream Processing →",
    addMaterial: "Add Material",
    addedLabel: "Added ✓",
    totalSelectedWeight: "Total Selected Weight",
    egPrefix: "e.g.",
    rejectionPlaceholderShort: "e.g. Contamination detected, weighing equipment calibration expired…",
    verifyBatchTitle: "Verify a Batch",
    verifyBatchDesc: "Publicly check a batch's chain-of-custody record & blockchain anchor",
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
    demoPins: "PIN Demo — Admin: 1234 · Collection: 1111 · Transport: 2222 · Processing: 3333 · Transport Off-taker: 4444 · Hilir: 5555",
    mrvPlatform: "Platform MRV",
    // Roles
    roleAdmin: "Admin", roleOperator: "Operator Hub", roleCollection: "Operator Collection", roleTransport: "Operator Transport", roleProcessing: "Operator Processing", roleVerifier: "Verifikator VVB", roleBuyer: "Pembeli EPR",
    roleAdminDesc: "Akses penuh — Rezycology HQ",
    roleOperatorDesc: "Hub Depok-01 — input data saja",
    roleCollectionDesc: "Input collection saja",
    roleTransportDesc: "Input transport saja",
    roleProcessingDesc: "Input processing saja",
    roleVerifierDesc: "SCS Global Services — verifikasi saja",
    roleBuyerDesc: "Sponsor EPR — hanya lihat kredit",
    // Dashboard
    totalPlasticLogged: "Total Plastik Tercatat", creditsIssued: "Kredit Diterbitkan",
    totalBatches: "Total Batch", awaitingVerification: "Menunggu Verifikasi",
    chainStatus: "Status Chain-of-Custody · End-to-End", recentBatches: "Batch Terbaru",
    noBatchesYet: "Belum ada batch.", goToNewBatch: "Buka Batch Baru untuk mencatat koleksi pertama.",
    livePilot: "Masuk sebagai",
    // Stages
    stageCollection: "Pengumpulan", stageTransport: "Transport Collection ke Hub",
    stageProcessing: "Pemrosesan di Hub", stageOfftakerTransport: "Transport ke Off-taker",
    stageDownstreamProcessing: "Pemrosesan Hilir",
    entryDescCollection: "Catat bahan baku yang diterima di titik pengumpulan.",
    entryDescTransport: "Catat perpindahan dari titik pengumpulan ke hub.",
    entryDescProcessing: "Catat aktivitas pemrosesan di hub secara langsung.",
    entryDescOfftakerTransport: "Catat perpindahan material terproses dari hub ke off-taker.",
    entryDescDownstream: "Catat aktivitas pemrosesan hilir di fasilitas off-taker.",
    allFacilities: "Semua Fasilitas",
    noBatchesAtProcessingFacility: "Belum ada batch yang dikirim ke fasilitas pemrosesan.",
    noBatchesAtOfftakers: "Belum ada batch yang dikirim ke off-taker.",
    selectPlaceholder: "Pilih…",
    searchNamePlaceholder: "Cari nama…",
    noMatches: "Tidak ada hasil",
    digitalSignature: "Tanda Tangan Digital",
    clearSignature: "Hapus",
    signHere: "Tanda tangan di sini",
    signedAt: "Ditandatangani",
    stageVerification: "Verifikasi", stageCredit: "Kredit",
    chainOfCustody: "Chain of Custody",
    // Stage 1
    stage1Title: "Tahap 1 — Data Pengumpulan",
    stage1Note: "Catat jenis bahan baku, berat kotor, ID alat timbang, dan identitas pengumpul untuk setiap batch.",
    feedstockType: "Jenis Bahan Baku", grossWeight: "Berat Kotor (kg)",
    collector: "Nama Lapak", weighingEquip: "Alat Timbang",
    collectionDate: "Tanggal Pengumpulan", notes: "Catatan / Observasi Lapangan",
    notesPlaceholder: "Kondisi batch, catatan kontaminasi, dll.",
    collectionPhoto: "Foto Pengumpulan (bukti chain-of-custody)",
    enterLapakName: "Masukkan nama lapak",
    endToEndYield: "Yield ujung ke ujung",
    completedLinesOnly: "hanya baris yang selesai",
    stillInProgressKg: "Masih berjalan",
    notCountedAsLoss: "tidak dihitung sebagai kehilangan",
    lostLabel: "hilang sepanjang rantai",
    collectedLabelShort: "terkumpul",
    hubAcceptedLabelShort: "diterima di hub",
    shippedLabelShort: "dikirim ke off-taker",
    downstreamOutputLabelShort: "keluaran hilir",
    proRataNote: "Porsi pro rata dari proses hilir",
    downstreamRunInput: "masukan proses",
    lapakBillPhoto: "Foto Nota Lapak",
    qcReportPhoto: "Foto Laporan QC",
    qcReportPhotoNote: "Foto laporan kendali mutu untuk baris material ini.",
    autoCalculated: "otomatis",
    outputExceedsInput: "Kontaminasi + ditolak melebihi berat masuk baris ini",
    inputLabelShort: "masuk",
    acceptedLabelShort: "diterima",
    contaminationLabelShort: "kontaminasi",
    rejectedLabelShort: "ditolak",
    lapakBillPhotoNote: "Foto nota/kuitansi yang diterbitkan lapak untuk pengumpulan ini.",
    creditEstimate: "menunggu chain-of-custody lengkap + VVB",
    logCollection: "Simpan →",
    // Stage 2
    stage2Title: "Tahap 2 — Dokumentasi Pengangkutan",
    transportRef: "Referensi Manifes Angkutan", transportDate: "Tanggal Angkutan",
    transportRefPlaceholder: "mis. MNF-DPK-2026-041",
    transportPhoto: "Foto Pengangkutan (kendaraan, muat, manifes)",
    confirmTransport: "Konfirmasi Pengangkutan →",
    // Stage 3
    stage3Title: "Tahap 3 — Pemrosesan Akhir Limbah",
    landfillWarning: "⚠ Akhir Limbah tercapai ketika material menjalani operasi pemulihan yang memenuhi syarat dan memenuhi keempat kriteria: (1) bahan yang lazim digunakan, (2) terdapat pasar/permintaan, (3) memenuhi standar teknis, (4) tidak menimbulkan dampak lingkungan yang merugikan. Pembuangan akhir dan pembakaran terbuka dikecualikan.",
    processingFacility: "Fasilitas Pemrosesan", eowProcess: "Proses Akhir Limbah",
    processingEndDate: "Tanggal Selesai Proses",
    processingFacilityPlaceholder: "mis. PT Daur Ulang Nusantara",
    processingFacilityOther: "Nama Fasilitas Lainnya",
    processingFacilityOtherPlaceholder: "Masukkan nama fasilitas",
    processingPhoto: "Foto Pemrosesan (fasilitas, sortir, output)",
    processedMaterial: "Material Diproses", processedMaterialPlaceholder: "Pilih material…",
    acceptedWeight: "Berat Diterima (kg)", rejectedWeight: "Berat Ditolak (kg)",
    contaminationVolume: "Volume Kontaminasi (kg)", contaminationNote: "Catatan Kontaminasi",
    contaminationNotePlaceholder: "Jelaskan kontaminasi yang ditemukan…",
    contaminationPhoto: "Foto Kontaminasi",
    yieldVariance: "Varians Hasil",
    yieldRatio: "Rasio Hasil",
    confirmProcessing: "Konfirmasi Pemrosesan →",
    // Stage 4
    stage4Title: "Tahap 4 — Verifikasi Dampak VVB",
    stage4Note: "Diperlukan VVB pihak ketiga yang disetujui PCX Solutions. VVB meninjau catatan chain-of-custody sebelum kredit dapat diterbitkan.",
    chainSummary: "Ringkasan Chain-of-Custody",
    vvbLabel: "VVB (Disetujui Verra)", vvbAuditRef: "No. Referensi Audit VVB",
    vvbAuditPlaceholder: "mis. SCS-2026-IDN-0044",
    eprBuyer: "Pembeli Kredit EPR",
    confirmVerification: "Konfirmasi Verifikasi VVB →",
    // Stage 5
    stage5Title: "Tahap 5 — Penerbitan Kredit Plastik",
    creditsToBeIssued: "Kredit yang Akan Diterbitkan",
    fullChainVerified: "Chain-of-custody lengkap terverifikasi: Pengumpulan → Angkutan → Akhir Limbah → Tanda tangan VVB.",
    buyer: "Pembeli", verifier: "Verifikator",
    marketPrice: "Referensi harga pasar: $106–$804 per MT (PCX marketplace, 2024). Harga ditetapkan oleh mitra proyek.",
    issueCredit: "Terbitkan Kredit Plastik 🎉",
    creditRequiresAdmin: "Penerbitan kredit memerlukan peran Admin.",
    // Verify tab
    verificationQueue: "Antrean Verifikasi", verifySubtitle: "Batch menunggu tinjauan VVB",
    noPendingVerification: "Tidak ada batch yang menunggu verifikasi.",
    custodyTrail: "Jejak Chain-of-Custody",
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
    certNote: "Prototipe PCC — penerbitan mengikat memerlukan Registri + tanda tangan VVB.",
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
    clearData: "Hapus Semua Data",
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
    statusCollection: "Pengumpulan", statusTransport: "Transport Collection ke Hub",
    statusProcessing: "Pemrosesan di Hub", statusVerified: "Terverifikasi",
    statusCredited: "Kredit Diterbitkan", statusRejected: "Ditolak",
    statusOfftakerTransport: "Transport ke Off-taker",
    statusDownstreamProcessing: "Pemrosesan Hilir",
    adminRejected: "Ditolak Admin",
    exceptionsLabel: "Pengecualian",
    pendingAdminReview: "Menunggu Tinjauan Admin",
    acceptedInputs: "Input Diterima",
    rejectedSuffix: "ditolak",
    // Stage forms — batch entry
    weightPlaceholder: "mis. 1500",
    calibCert: "Sertifikat Kalibrasi",
    calibCertNote: "Sertifikat kalibrasi yang masih berlaku wajib ada untuk alat timbang. Unggah foto atau hasil pindai.",
    certAttached: "Sertifikat terlampir",
    calibCertRequired: "Wajib — bukti kalibrasi harus dilampirkan sesuai persyaratan chain-of-custody.",
    weighingPhotoNote: "Foto proses penimbangan sebagai bukti pengumpulan.",
    sigCollector: "Tanda Tangan Pengumpul",
    sigTransportOfficer: "Tanda Tangan Petugas Angkutan",
    sigProcessor: "Tanda Tangan Pemroses",
    // Records / detail
    noRecordsYet: "Belum ada catatan.",
    weighingEquipShort: "Alat Timbang",
    processorLabel: "Pemroses",
    procEndDate: "Tgl. Selesai Proses",
    loggedByLabel: "Dicatat Oleh",
    digitalSignatures: "Tanda Tangan Digital",
    notesLabel: "Catatan",
    // New Batch — operator input forms
    selectOperatorInput: "Pilih Input Operator",
    searchBatchId: "Cari ID batch…",
    referenceBatchId: "ID Batch Referensi",
    collectionTimestamp: "Waktu Pengumpulan (GMT+7)",
    transportTimestamp: "Waktu Pengangkutan (GMT+7)",
    processingTimestamp: "Waktu Pemrosesan (GMT+7)",
    materialsLabel: "Material",
    materialPickupVehicle: "Kendaraan Pengangkut Material",
    materialPlateNo: "No. Plat Kendaraan",
    handwrittenWeighingId: "Identifikasi Penimbangan Tulis Tangan",
    batchAvailableForPickup: "Batch Tersedia untuk Diambil (dikumpulkan H / H-1)",
    batchAvailableToProcess: "Batch Tersedia untuk Diproses (dikirim sesuai manifes angkutan)",
    batchesAvailableOfftaker: "Batch Tersedia untuk Pengambilan Off-taker (diproses di hub)",
    // Admin Review / Verify tab
    adminReviewTitle: "Tinjauan Admin",
    adminReviewSubtitle: "Terima atau tolak input operator",
    selectedForTransport: "Dipilih untuk Transport Ini",
    stageStalledLines: "Menunggu baris material yang masih di hub",
    filterAll: "Semua",
    pageLabel: "Halaman",
    filterInput: "Saring Input",
    findReviewItems: "Cari Item Tinjauan",
    findRecords: "Cari Catatan",
    fromDate: "Dari Tanggal",
    toDate: "Sampai Tanggal",
    minKg: "Min kg",
    maxKg: "Maks kg",
    searchReviewPlaceholder: "Cari batch, bahan baku, penginput, manifes...",
    searchRecordsPlaceholder: "Cari batch, material, operator, manifes...",
    acceptInput: "Terima Input",
    acceptLabel: "Terima",
    detailsLabel: "Detail",
    prevLabel: "Sebelumnya",
    nextLabel: "Berikutnya",
    refreshData: "Muat Ulang Data",
    noPendingReview: "Tidak ada input operator yang menunggu tinjauan.",
    showingLabel: "Menampilkan",
    ofLabel: "dari",
    // Custody + Settings tabs
    custodySubtitle: "Pergerakan material yang dapat diverifikasi dari lapak ke pemrosesan hilir",
    inProgress: "Sedang berjalan",
    searchLabel: "Cari",
    batchLabelShort: "Batch",
    backendSync: "Sinkronisasi Backend",
    backendUrlLabel: "URL Backend (Apps Script atau Supabase)",
    syncExistingToBackend: "Sinkronkan batch yang ada ke backend",
    generateFromBackend: "Buat data aplikasi dari backend",
    adminReviewDevice: "Perangkat Tinjauan Admin",
    settingsAccessDevice: "Perangkat Akses Pengaturan",
    // Full UI sweep
    readingPhoto: "Membaca foto...",
    analyticsTitle: "Analitik",
    pickupVehicleLabel: "Kendaraan Pengangkut",
    transportRefShort: "Ref. Angkutan",
    offtakerTransportRef: "Ref. Angkutan Off-taker",
    offtakerTransportDate: "Tgl. Angkutan Off-taker",
    offtakerPlateNo: "No. Plat Off-taker",
    downstreamMaterialProcessed: "Material Hilir Diproses",
    downstreamEowProcess: "Proses Akhir Limbah Hilir",
    downstreamProcEndDate: "Tgl. Selesai Proses Hilir",
    collectionInputterIp: "IP Penginput Pengumpulan",
    collectionInputterId: "ID Penginput Pengumpulan",
    transportInputterIp: "IP Penginput Angkutan",
    transportInputterId: "ID Penginput Angkutan",
    processingInputterIp: "IP Penginput Pemrosesan",
    processingInputterId: "ID Penginput Pemrosesan",
    offtakerInputterIp: "IP Penginput Angkutan Off-taker",
    offtakerInputterId: "ID Penginput Angkutan Off-taker",
    downstreamInputterIp: "IP Penginput Pemrosesan Hilir",
    downstreamInputterId: "ID Penginput Pemrosesan Hilir",
    weighingIdLabel: "ID Penimbangan",
    sigTransportShort: "Tanda Tangan Angkutan",
    weighingProcessEvidence: "Bukti Proses Penimbangan",
    deleteBatchLabel: "Hapus Batch",
    noRecentForCategory: "Belum ada batch terbaru untuk kategori input ini.",
    chooseOperatorInput: "Pilih input operator yang ingin Anda catat.",
    changeInput: "Ganti Input",
    materialType: "Jenis Material",
    handwrittenPhotoNote: "Foto ID penimbangan tulis tangan atau catatan timbangan untuk record material ini.",
    autoGenerate: "Buat otomatis",
    weightKgLabel: "Berat (kg)",
    noProcessedMatch: "Tidak ada batch terproses yang cocok dengan jenis bahan baku terpilih.",
    noProcessedAwaiting: "Belum ada batch terproses yang menunggu pengambilan off-taker.",
    photoDeliveryOrder: "Foto Surat Jalan",
    batchAvailableDownstream: "Batch Tersedia untuk Pemrosesan Hilir (dikirim ke off-taker)",
    downstreamFacilityOther: "Fasilitas Hilir (Lainnya)",
    enterFacilityName: "Masukkan nama fasilitas",
    listView: "Tampilan Daftar",
    cardView: "Tampilan Kartu",
    stageLabel: "Tahap",
    operatorLabel: "Operator",
    actionsLabel: "Tindakan",
    materialLabel: "Material",
    inputterIpLabel: "IP Penginput",
    inputterLabel: "Penginput",
    timeLabel: "Waktu",
    settingsSubtitleText: "Konfigurasi hub · Admin saja",
    settingsEnabledHere: "Pengaturan aktif di perangkat ini",
    settingsDisabledHere: "Pengaturan nonaktif di perangkat ini",
    reviewEnabledHere: "Tinjauan Admin aktif di perangkat ini",
    reviewDisabledHere: "Tinjauan Admin nonaktif di perangkat ini",
    disableHere: "Nonaktifkan di Sini",
    enableHere: "Aktifkan di Sini",
    rejectedExceedsAccepted: "Berat ditolak tidak boleh melebihi berat diterima — mohon periksa kembali angkanya.",
    roleOfftakerTransport: "Operator Transport Off-taker",
    roleOfftakerTransportDesc: "Input transport ke off-taker saja",
    roleDownstreamProcessing: "Operator Pemrosesan Hilir",
    roleDownstreamProcessingDesc: "Input pemrosesan hilir saja",
    // Off-taker transport + downstream processing pages
    downstreamFacility: "Fasilitas Hilir",
    sigDownstreamProcessor: "Tanda Tangan Pemroses Hilir",
    sigOfftakerTransport: "Tanda Tangan Angkutan Off-taker",
    confirmOfftakerTransport: "Konfirmasi Transport ke Off-taker →",
    confirmDownstreamProcessing: "Konfirmasi Pemrosesan Hilir →",
    addMaterial: "Tambah Material",
    addedLabel: "Ditambahkan ✓",
    totalSelectedWeight: "Total Berat Terpilih",
    egPrefix: "mis.",
    rejectionPlaceholderShort: "mis. Kontaminasi terdeteksi, kalibrasi alat timbang kedaluwarsa…",
    verifyBatchTitle: "Verifikasi Batch",
    verifyBatchDesc: "Periksa catatan chain-of-custody & anchor blockchain sebuah batch secara publik",
    // Misc
    remove: "Hapus", go: "Cari", out: "Keluar",
    hubDepok: "Hub Depok-01",
  },
};

function useT(lang) {
  return (key) => TRANSLATIONS[lang]?.[key] ?? TRANSLATIONS.en[key] ?? key;
}
const DEVICE_UNLOCK_PIN = "8825";
// Temporary test flag — hides the map/location-pin section on all entry forms
// while relying on the automatic GPS capture instead.
const SHOW_MAP_PICKER = false;
const ROLES = {
	  admin: {
	    label: "Admin",
	    name: "Khairul",
	    pin: "1234",
	    color: C.forest,
	    access: ["dashboard", "log", "verify", "records", "custody", "settings"],
	    allowedEntryModes: ["collection", "transport", "processing", "offtaker_transport", "downstream_processing"],
	    desc: "Full access — Rezycology HQ",
	  },
  operator: {
    label: "Hub Operator",
    name: "Operator Depok",
    pin: "5678",
    color: C.orange,
	    access: ["dashboard", "log"],
    allowedEntryModes: ["collection", "transport", "processing", "offtaker_transport", "downstream_processing"],
    desc: "Hub Depok-01 — data entry only",
  },
  collection: {
    label: "Collection Operator",
    name: "Collection Operator",
    pin: "1111",
    color: C.orange,
    access: ["dashboard", "log"],
    allowedEntryModes: ["collection"],
    desc: "Collection input only",
  },
  transport: {
    label: "Transport Operator",
    name: "Transport Operator",
    pin: "2222",
    color: C.blue,
    access: ["dashboard", "log"],
    allowedEntryModes: ["transport"],
    desc: "Transport input only",
  },
  processing: {
    label: "Processing Operator",
    name: "Processing Operator",
    pin: "3333",
    color: "#92600a",
    access: ["dashboard", "log"],
    allowedEntryModes: ["processing"],
    desc: "Processing input only",
  },
  offtaker_transport: {
    label: "Off-taker Transport Operator",
    name: "Off-taker Transport Operator",
    pin: "4444",
    color: C.blue,
    access: ["dashboard", "log"],
    allowedEntryModes: ["offtaker_transport"],
    desc: "Transport to off-takers input only",
  },
  downstream_processing: {
    label: "Downstream Processing Operator",
    name: "Downstream Processing Operator",
    pin: "5555",
    color: "#92600a",
    access: ["dashboard", "log"],
    allowedEntryModes: ["downstream_processing"],
    desc: "Downstream processing input only",
  },

};

// ─── Reference Data ───────────────────────────────────────────────────────────
const FEEDSTOCK_TYPES = [
  "PET (Rigid)", "HDPE (Rigid)", "LDPE (Flexible)",
  "PP (Mixed)", "PS", "LVP – Flexibles",
  "LVP – Multi-layer", "Mixed Post-Consumer Plastic",
];
// End-of-Waste definitions
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
// Same stored values, short display labels. The value must stay the full
// string — it is written to the batch record and feeds the record hash.
const EOW_PROCESS_OPTIONS = EOW_PROCESSES.map(p => ({ value: p, label: p.split(" — ")[0] }));
// Display-only short form. Stored values keep the full policy text because it
// is part of the hashed record; only what the UI renders is shortened.
function eowLabel(val) {
  return String(val || "").split(" — ")[0];
}
const EPR_BUYERS = [
  "Unilever Indonesia", "Danone AQUA", "Indofood",
  "Nestle Indonesia", "P&G Indonesia",
];
const VVB_BODIES = [
  "SCS Global Services (Verra-Approved VVB)",
  "PT Sucofindo – Persero (Indonesian LVV)",
];
const COLLECTORS = [
  "Acil Bery", "ACS", "Adik", "Agus", "AIM", "Alex", "Alfian", "Ambon", "Amin", "Amir",
  "Andi", "Andi/ Karim", "Anggoro", "Asmat", "Atmaja", "Bambang", "BEI", "Benen", "Budi",
  "Budiyanto", "Burhan", "Cahyono", "Chasim", "Cultivia", "Dasana", "Daur Id", "Dimas",
  "Dolly", "Donal", "Eban", "Edi", "Edi Cinere", "Egy", "Enen", "Faisol", "Fatih", "Gudang",
  "Hadi", "Hasanudin", "Hendra", "Hendrik", "Heri Saipah", "Hikmat", "Hj Latip", "Ilman",
  "Imam", "Imam Hanafi", "Inoh Enen", "Ipan", "Irul", "Isro", "Iut Kahfi", "Izal", "Jamal",
  "Jana BSD", "Jangkung", "Julius", "Juma", "Jumahi", "Kadani", "Kana", "Kariman",
  "Kholil Yuli", "Kohar", "Kong Adik", "Kopi Haus", "Kumis", "Mahfud", "Mahmud", "Mail",
  "Mamat", "Marwan", "Matio", "Miftah Amin", "Mirza", "Moasin", "Muklis", "Mursin", "Nadi",
  "Nadi Sueb", "Nadir", "Nanang", "Nizam", "Njam", "Nurbeco", "Odon", "Ojos", "Oling",
  "Panji", "Parno", "Pinroni", "Purwanto", "Putri Kembar", "Rahmadi", "Rahmat", "Regen",
  "Rekosistem", "Riyanto", "Roni", "Rosadi", "Rosi", "Rozi", "Rubiyo", "Rudi", "Ruspandi",
  "Sahil", "Samsudin", "Santi", "Sarno", "Sawal", "Selamet", "Sihombing", "Siran", "Soleh",
  "Suhendra", "Sule", "Sumiyati", "Sunawi", "Suniat", "Supri", "Suyanto", "Syafik", "Syamsi",
  "Tata", "Toat", "Tomi", "Toni Bap", "Toni Ilham", "Toni Inoh", "Topik", "Toshi", "Trisno",
  "Udin", "Umam", "Unang", "UU", "Wagimin", "Wahyu", "Wito", "Yani", "Yongki", "Yudi",
  "Yuli", "Yuliati", "Yusuf", "Zainal", "Zaky", "Zaky F",
];
const SCALES = ["SCL-DPK-01", "SCL-DPK-02"];
const PICKUP_VEHICLES = [
  "Grand Max B 9501 WAA",
  "Grand Max B 9273 PXR",
  "Suzuki Carry B 8124 KZP",
  "Mitsubishi L300 B 7642 TQA",
  "Isuzu Traga B 9038 KCN",
];
const PROCESSING_FACILITIES = [
  "Hub Depok Cinangka",
  "Hub Cikarang",
  "Hub Ciamis",
  "Hub Subang",
  "Hub Tangerang",
  "Hub Lampung",
  "Other",
];
const OFFTAKER_FEEDSTOCK_TYPES = [
  "PET Clear (Baled-press)",
  "PET Blue light (Baled-press)",
  "PET Mix (Baled-press)",
  "PET Green (Baled-press)",
  "PET Dark Blue (Baled-press)",
  "PET Dove (Baled-press)",
  "PET Grade B (Baled-press)",
  "PET Grade C (Baled-press)",
  "PP LVP (Pellet)",
  "PP Karung (Pellet)",
  "PS (Pellet)",
  "PP Mixed gabrug (Baled-press)",
  "HDPE (Flakes)",
  "LDPE (Flakes)",
];
// Maps each off-taker product grade to the collected/processed feedstock keyword
// (from FEEDSTOCK_TYPES) it should be sourced from, used to filter eligible batches.
const OFFTAKER_TO_FEEDSTOCK_KEYWORD = {
  "PET Clear (Baled-press)": "PET",
  "PET Blue light (Baled-press)": "PET",
  "PET Mix (Baled-press)": "PET",
  "PET Green (Baled-press)": "PET",
  "PET Dark Blue (Baled-press)": "PET",
  "PET Dove (Baled-press)": "PET",
  "PET Grade B (Baled-press)": "PET",
  "PET Grade C (Baled-press)": "PET",
  "PP LVP (Pellet)": "LVP",
  "PP Karung (Pellet)": "PP",
  "PS (Pellet)": "PS",
  "PP Mixed gabrug (Baled-press)": "Mixed Post-Consumer",
  "HDPE (Flakes)": "HDPE",
  "LDPE (Flakes)": "LDPE",
};
const OFFTAKER_PLATE_NUMBERS = [
  "B 9022 WAC",
  "B 9501 WAA",
  "B 9273 PXR",
  "B 8124 KZP",
  "B 7642 TQA",
];
const DOWNSTREAM_FACILITIES = [
  "PT Daur Ulang Plastik Nusantara",
  "PT Namasindo Plas",
  "PT Tridi Oasis",
  "PT Veolia Indonesia",
  "PT Polindo Utama",
  "Other",
];
const HUB_DEFAULT_GEO = { lat: -6.4025, lng: 106.7942, manual: true, fallback: true };

// ─── Utilities ────────────────────────────────────────────────────────────────
function uid() { return Date.now().toString(36).toUpperCase() + Math.random().toString(36).slice(2,8).toUpperCase(); }
function shortRef() { return uid().slice(-6); }
function generatedBatchId() { return "DPK-" + shortRef(); }
function generatedManifestRef(batchId, date = new Date().toISOString().slice(0, 10)) {
  const d = String(date || new Date().toISOString().slice(0, 10)).slice(0, 10).replace(/-/g, "");
  const suffix = String(batchId || generatedBatchId()).replace(/^DPK-?/i, "").slice(-6);
  return `MNF-DPK-${d}-${suffix}`;
}
function materialSummary(materials = []) {
  const rows = (Array.isArray(materials) ? materials : []).filter(m => m.feedstockType || Number(m.weightKg) > 0);
  return rows.length <= 1 ? rows[0]?.feedstockType || "" : `${rows.length} materials`;
}
function reviewRowMaterial(b) {
  const match = (b.status === "processing" && /^Processing \(M(\d+)\)$/.exec(b.reviewStage || ""))?.[1];
  if (match) {
    const m = (b.materials || []).find(mm => String(mm.index || 1) === match);
    if (m) return { material: m, index: Number(match), feedstockType: m.feedstockType, weightKg: m.weightKg };
  }
  return { material: null, index: null, feedstockType: b.feedstockType, weightKg: b.weightKg };
}
function materialTotalKg(materials = []) {
  return (Array.isArray(materials) ? materials : []).reduce((sum, m) => sum + (Number(m.weightKg) || 0), 0);
}
function nowISO() { return new Date().toISOString(); }
function jakartaNowLabel(val = nowISO()) { return `${fmtDateTime(val)} GMT+7`; }
function validDate(d) {
  return d instanceof Date && !Number.isNaN(d.getTime()) ? d : null;
}
function parseDate(val) {
  if (!val) return null;
  if (val instanceof Date) return validDate(val);

  // Google Sheets may return date serials. Treat large numbers as JS timestamps.
  if (typeof val === "number") {
    if (val > 100000000000) return validDate(new Date(val));
    if (val > 20000 && val < 80000) {
      const excelEpoch = Date.UTC(1899, 11, 30);
      return validDate(new Date(excelEpoch + val * 86400000));
    }
    return null;
  }

  if (typeof val !== "string") return null;
  const raw = val.trim();
  if (!raw || /^invalid date$/i.test(raw)) return null;
  if (/T\d{1,2}:\d{2}/.test(raw) && /(Z|[+-]\d{2}:?\d{2})$/i.test(raw)) {
    return validDate(new Date(raw));
  }

  // Handle DD/MM/YYYY with optional time (e.g. "24/3/2026, 14.08.57")
  const slashDate = raw.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})(?:,?\s+(\d{1,2})[.:](\d{2})(?:[.:](\d{2}))?)?$/);
  if (slashDate) {
    const [, dd, mm, yy, hh = "0", min = "0", ss = "0"] = slashDate;
    const year = yy.length === 2 ? 2000 + Number(yy) : Number(yy);
    return validDate(new Date(year, Number(mm) - 1, Number(dd), Number(hh), Number(min), Number(ss)));
  }

  // Handle YYYY-MM-DD or YYYY-MM-DDTHH:mm:ss without timezone surprises.
  const isoLocal = raw.match(/^(\d{4})-(\d{1,2})-(\d{1,2})(?:[T\s](\d{1,2}):(\d{2})(?::(\d{2}))?)?/);
  if (isoLocal) {
    const [, y, m, d, hh = "0", min = "0", ss = "0"] = isoLocal;
    return validDate(new Date(Number(y), Number(m) - 1, Number(d), Number(hh), Number(min), Number(ss)));
  }

  // Last resort for browser-supported strings from Apps Script / Sheets.
  return validDate(new Date(raw));
}
function fmtDate(val) {
  if (!val) return "—";
  // Extract YYYY-MM-DD parts directly to avoid UTC→local timezone shift on date-only fields
  if (typeof val === "string") {
    const m = val.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (m) {
      const d = new Date(+m[1], +m[2] - 1, +m[3]);
	      return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", timeZone: JAKARTA_TIME_ZONE });
    }
  }
  const d = parseDate(val);
  if (!d) return "—";
  try {
	    return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", timeZone: JAKARTA_TIME_ZONE });
  } catch { return validDate(d)?.toDateString() || "—"; }
}
function maskName(val) {
  const s = String(val || "").trim();
  if (!s) return s;
  const first = s[0].toUpperCase();
  const rest = s.slice(1).toUpperCase().replace(/[^A-Z]/g, "");
  const mask = ["X", "X", "X", "X"];
  // Deterministic per-name pseudo-random pick (seeded by char codes), so the
  // masked result stays fixed across re-renders instead of changing each time.
  let seed = first.charCodeAt(0);
  for (let i = 0; i < rest.length; i++) seed += rest.charCodeAt(i) * (i + 1);
  const positions = [0, 1, 2, 3];
  for (let i = positions.length - 1; i > 0; i--) {
    seed = (seed * 9301 + 49297) % 233280;
    const j = seed % (i + 1);
    [positions[i], positions[j]] = [positions[j], positions[i]];
  }
  for (let k = 0; k < 2; k++) {
    if (rest.length) {
      seed = (seed * 9301 + 49297) % 233280;
      mask[positions[k]] = rest[seed % rest.length];
    }
  }
  return first + mask.join("");
}
// Vehicle strings carry an Indonesian plate ("Grand Max B 9501 WAA"), which
// identifies a driver as directly as a name does. Keep the model and the shape
// of the plate, mask the identifying digits and letters.
function maskVehicle(val) {
  const s = String(val || "").trim();
  if (!s) return s;
  return s.replace(
    /\b([A-Z]{1,2})\s+(\d{1,4})\s+([A-Z]{1,3})\b/g,
    (_m, region, digits, suffix) =>
      `${region} ${digits[0]}${"•".repeat(digits.length - 1)} ${suffix[0]}${"•".repeat(suffix.length - 1)}`,
  );
}
// Haversine gives straight-line distance; real road distance runs longer, so
// the figure is shown as a range rather than a single approximate number.
const ROAD_FACTOR = 1.4;
function fmtDistanceRange(km) {
  if (!Number.isFinite(km) || km <= 0) return "—";
  const dp = km < 1 ? 2 : 1;
  return `${km.toFixed(dp)} – ${(km * ROAD_FACTOR).toFixed(dp)} km`;
}
function fmtDateTime(val) {
  if (!val) return "—";
  const d = parseDate(val);
  if (!d) return "—";
  try {
    // Use individual options — dateStyle/timeStyle not supported on older Safari
    return d.toLocaleString("en-GB", {
      day: "2-digit", month: "short", year: "numeric",
	      hour: "2-digit", minute: "2-digit", second: "2-digit",
	      timeZone: JAKARTA_TIME_ZONE,
    });
  } catch { return validDate(d)?.toLocaleString() || "—"; }
}
function fmtMobileDateTime(val) {
  const d = parseDate(val);
  if (!d) return "—";
  try {
    const date = d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", timeZone: JAKARTA_TIME_ZONE });
    const time = d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: JAKARTA_TIME_ZONE });
    return `${date}\n${time}`;
  } catch {
    return fmtDateTime(val).replace(", ", "\n");
  }
}
function firstValidDate(...vals) {
  for (const val of vals) {
    if (parseDate(val)) return val;
  }
  return null;
}
function kgToTonnes(kg) { return +(Number(kg) / 1000).toFixed(4); }

// Returns true if a collection date falls on D-day (today) or D-1 (yesterday) relative to refISO.
function isWithinPickupWindow(collectionDate, refISO) {
  const d = parseDate(collectionDate);
  const ref = parseDate(refISO) || new Date();
  if (!d) return false;
  const dDay = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  const refDay = new Date(ref.getFullYear(), ref.getMonth(), ref.getDate()).getTime();
  const dayMs = 86400000;
  return dDay === refDay || dDay === refDay - dayMs;
}

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
  const tag = geo.manual ? "manual" : (geo.accuracy ? `±${geo.accuracy}m` : "GPS");
  return `${geo.lat}, ${geo.lng} (${tag})`;
}
function geoUrl(geo) {
  if (!geo) return null;
  return `https://www.google.com/maps?q=${geo.lat},${geo.lng}`;
}
function formatIdDate(dateValue) {
  const d = parseDate(dateValue) || new Date();
  return d.toISOString().slice(0, 10).replace(/-/g, "");
}
function parseMoneyNumber(value) {
  if (!value) return 0;
  return Number(String(value).replace(/[.,\s]/g, ""));
}
function findSubsetSum(values, target) {
  const nums = values.filter(v => Number(v) > 0);
  let best = null;
  function walk(idx, picked, sum) {
    if (sum === target && picked.length) { best = picked; return true; }
    if (sum > target || idx >= nums.length || picked.length >= 4) return false;
    if (walk(idx + 1, [...picked, nums[idx]], sum + nums[idx])) return true;
    return walk(idx + 1, picked, sum);
  }
  walk(0, [], 0);
  return best || [];
}
function parseHandwrittenWeighingInput(raw) {
  const lines = String(raw || "")
    .split(/\n+/)
    .map(line => line.trim())
    .filter(Boolean);
  const numericLines = [];
  let multiply = null;
  let minusLine = null;

  lines.forEach((line, index) => {
    const normalized = line.replace(/[xX*]/g, "x");
    if (/^\d{1,2}\s*-\s*\d{1,2}\s*-\s*\d{2,4}$/.test(normalized)) return;
    const multiMatch = normalized.match(/(\d[\d.,]*)\s*x\s*(\d[\d.,]*)/);
    if (multiMatch && !multiply) {
      multiply = {
        index,
        netWeight: parseMoneyNumber(multiMatch[1]),
        rate: parseMoneyNumber(multiMatch[2]),
      };
    }
    const minusMatch = normalized.match(/^(\d[\d.,]*)\s*-\s*(\d[\d.,]*)$/);
    if (minusMatch && !minusLine) {
      minusLine = {
        index,
        subtotal: parseMoneyNumber(minusMatch[1]),
        deduction: parseMoneyNumber(minusMatch[2]),
      };
    }
    if (/^\d[\d.,]*$/.test(normalized)) {
      numericLines.push({ index, value: parseMoneyNumber(normalized) });
    }
  });

  const beforeExpression = numericLines
    .filter(n => !multiply || n.index < multiply.index)
    .map(n => n.value);
  let weights = [];
  let subtotal = minusLine?.subtotal || 0;
  let subtotalIndex = -1;
  let running = 0;
  for (let i = 0; i < beforeExpression.length; i += 1) {
    running += beforeExpression[i];
    const laterIndex = beforeExpression.findIndex((value, idx) => idx > i && value === running);
    if (laterIndex > i && i + 1 > weights.length) {
      weights = beforeExpression.slice(0, i + 1);
      subtotal = running;
      subtotalIndex = laterIndex;
    }
  }
  if (!weights.length && minusLine?.subtotal) {
    running = 0;
    for (const value of beforeExpression) {
      if (value === minusLine.subtotal) break;
      running += value;
      weights.push(value);
      if (running === minusLine.subtotal) break;
    }
  }
  if (!weights.length) {
    weights = beforeExpression.filter(value => value > 0 && value < 1000);
    subtotal = weights.reduce((sum, value) => sum + value, 0);
  }

  const netWeight = multiply?.netWeight || (minusLine ? minusLine.subtotal - minusLine.deduction : subtotal);
  const totalDeduction = Math.max(0, subtotal - netWeight);
  const afterSubtotal = subtotalIndex >= 0 ? beforeExpression.slice(subtotalIndex + 1) : [];
  const deductions = minusLine ? [minusLine.deduction] : findSubsetSum(afterSubtotal, totalDeduction);
  const rate = multiply?.rate || 0;
  const totalAmount = rate ? netWeight * rate : 0;

  return {
    rawText: raw,
    weights,
    grossWeight: subtotal,
    deductions,
    totalDeduction,
    netWeight,
    rate,
    totalAmount,
  };
}
function getHandwrittenWeighing(record) {
  if (!record) return null;
  if (record.handwrittenWeighing) return record.handwrittenWeighing;
  if (!record.handwrittenWeighingId && !record.handwrittenNetWeight) return null;
  return {
    weighingId: record.handwrittenWeighingId,
    rawText: record.handwrittenRawText || "",
    weights: String(record.handwrittenWeights || "").split("|").filter(Boolean).map(Number),
    grossWeight: Number(record.handwrittenGrossWeight) || 0,
    deductions: String(record.handwrittenDeductions || "").split("|").filter(Boolean).map(Number),
    totalDeduction: Number(record.handwrittenTotalDeduction) || 0,
    netWeight: Number(record.handwrittenNetWeight) || 0,
    rate: Number(record.handwrittenRate) || 0,
    totalAmount: Number(record.handwrittenTotalAmount) || 0,
  };
}
function prepareImageForOcr(dataUrl, maxSize = 1600, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(img.width * scale));
      canvas.height = Math.max(1, Math.round(img.height * scale));
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/jpeg", quality));
    };
    img.onerror = () => reject(new Error("Could not read the selected image"));
    img.src = dataUrl;
  });
}
function isValidCoord(v) {
  return v != null && v !== "" && !Number.isNaN(Number(v));
}
function normalizeGeo(lat, lng, extra = {}) {
  if (!isValidCoord(lat) || !isValidCoord(lng)) return null;
  return { lat: Number(lat), lng: Number(lng), ...extra };
}
function geoLabel(geo) {
  if (!geo) return "";
  if (geo.fallback) return "hub operator";
  if (geo.manual) return "manual pin";
  return geo.accuracy ? `±${geo.accuracy}m` : "GPS";
}
function geoTag(geo) {
  if (!geo) return "";
  return `${Number(geo.lat).toFixed(6)}, ${Number(geo.lng).toFixed(6)}${geoLabel(geo) ? ` (${geoLabel(geo)})` : ""}`;
}
function gpsLink(geo) {
  if (!geo || !isValidCoord(geo.lat) || !isValidCoord(geo.lng)) return "";
  return `https://www.google.com/maps?q=${Number(geo.lat).toFixed(6)},${Number(geo.lng).toFixed(6)}`;
}
function getCollectionGeo(batch) {
  const activityGeo = batch?.activities?.find(a => a.stage === "Collection")?.geo || batch?.activities?.[0]?.geo;
  return normalizeGeo(activityGeo?.lat, activityGeo?.lng, activityGeo)
      || normalizeGeo(batch?.collectionLat, batch?.collectionLng, { manual: true })
      || { ...HUB_DEFAULT_GEO };
}
function activityStatus(stage, fallback = "collection") {
  const key = String(stage || "").toLowerCase();
  if (key.includes("collection")) return "collection";
  if (key.includes("offtaker") && key.includes("transport")) return "offtaker_transport";
  if (key.includes("downstream") && key.includes("processing")) return "downstream_processing";
  if (key.includes("transport")) return "transport";
  if (key.includes("processing")) return "processing";
  if (key.includes("verification") || key.includes("verified")) return "verified";
  if (key.includes("credit")) return "credited";
  if (key.includes("reject")) return "rejected";
  return fallback;
}
function compactStatusLabel(status) {
  const key = activityStatus(status, status);
  if (key === "transport") return "HUB TRN";
  if (key === "processing") return "PROC";
  if (key === "offtaker_transport") return "OFT TRN";
  if (key === "downstream_processing") return "DSP PROC";
  if (key === "collection") return "COLL";
  if (key === "rejected") return "REJECT";
  if (key === "verified") return "VERIF";
  if (key === "credited") return "CREDIT";
  return String(status || "-").slice(0, 8).toUpperCase();
}
function getStageRecordRows(batches) {
  const materialRowsFor = (batch, status) => {
    if (status === "processing" && Array.isArray(batch.processedMaterials) && batch.processedMaterials.length) {
      return batch.processedMaterials.map(pm => ({
        feedstockType: pm.processedFeedstockType,
        weightKg: pm.processedWeightKg,
        index: Number(pm.processedMaterialIndex) || 1,
      })).filter(m => m.feedstockType || Number(m.weightKg) > 0);
    }
    const rows = Array.isArray(batch.materials) && batch.materials.length
      ? batch.materials
      : [{ feedstockType: batch.feedstockType, weightKg: batch.weightKg, index: 1 }];
    return rows.filter(m => m.feedstockType || Number(m.weightKg) > 0);
  };

  const allRows = (batches || []).flatMap(batch => {
    const activities = Array.isArray(batch.activities) ? batch.activities : [];
    if (activities.length === 0) {
      const geo = getCollectionGeo(batch);
      return materialRowsFor(batch, batch.status || "collection").map((material, materialIdx) => ({
        key: `${batch.id || batch.batchId}-m${materialIdx}-current`,
        batch,
        material,
        materialIndex: material.index || materialIdx + 1,
        status: batch.status || "collection",
        loggedAt: firstValidDate(batch.createdAt, batch.collectionDate, batch.issuedAt),
        inputter: batch.loggedBy || "-",
        inputterId: extractInputterId(parseInputterMap(batch.inputterDevice)[batch.status || "collection"]),
        inputterIp: parseInputterMap(batch.inputterIp)[batch.status || "collection"] || "-",
        geo,
      }));
    }
    return activities.flatMap((activity, idx) => {
      const status = activityStatus(activity.stage, batch.status || "collection");
      const geo = normalizeGeo(activity.geo?.lat, activity.geo?.lng, activity.geo)
               || (status === "collection" ? getCollectionGeo(batch) : { ...HUB_DEFAULT_GEO });
      return materialRowsFor(batch, status).map((material, materialIdx) => ({
        key: `${batch.id || batch.batchId}-${idx}-${status}-m${materialIdx}`,
        batch,
        material,
        materialIndex: material.index || materialIdx + 1,
        status,
        loggedAt: firstValidDate(activity.ts, batch.createdAt, batch.collectionDate, batch.issuedAt),
        inputter: activity.actor || batch.loggedBy || "-",
        inputterId: extractInputterId(parseInputterMap(batch.inputterDevice)[status]),
        inputterIp: parseInputterMap(batch.inputterIp)[status] || "-",
        geo,
      }));
    });
  });

  // Deduplicate: keep only the latest row per (batchId × status × materialIndex)
  // This prevents duplicate rows when the same stage has multiple activity entries
  const seen = new Map();
  const deduped = [];
  allRows
    .sort((a, b) => (parseDate(b.loggedAt)?.getTime() || 0) - (parseDate(a.loggedAt)?.getTime() || 0))
    .forEach(row => {
      const dedupeKey = `${row.batch.batchId}::${row.status}::${row.materialIndex}::${row.material?.feedstockType || ''}::${row.material?.weightKg || ''}`;
      if (!seen.has(dedupeKey)) {
        seen.set(dedupeKey, true);
        deduped.push(row);
      }
    });

  return deduped.sort((a, b) => {
    const da = parseDate(a.loggedAt)?.getTime() || 0;
    const db = parseDate(b.loggedAt)?.getTime() || 0;
    return db - da;
  });
}

function getDashboardRecentRows(rows) {
  const seen = new Map();
  (rows || []).forEach(row => {
    const material = row.material || {};
    const key = [
      row.batch?.batchId || row.batch?.id || "",
      row.materialIndex || material.index || 1,
      material.feedstockType || row.batch?.feedstockType || "",
      material.weightKg ?? row.batch?.weightKg ?? "",
    ].join("::");
    const current = seen.get(key);
    const rowTime = parseDate(row.loggedAt)?.getTime() || 0;
    const currentTime = parseDate(current?.loggedAt)?.getTime() || 0;
    if (!current || rowTime >= currentTime) {
      seen.set(key, row);
    }
  });
  return Array.from(seen.values()).sort((a, b) => {
    const da = parseDate(a.loggedAt)?.getTime() || 0;
    const db = parseDate(b.loggedAt)?.getTime() || 0;
    return db - da;
  });
}

function detailForMaterial(batch, material, materialIndex) {
  const normalizedBatch = withEvidenceAliases(batch);
  const selectedMaterial = material
    || normalizedBatch?.detailMaterial
    || (Array.isArray(normalizedBatch?.materials) && normalizedBatch.materials.length ? normalizedBatch.materials[0] : null);
  if (!selectedMaterial) return normalizedBatch;
  const selectedIndex = materialIndex || selectedMaterial.index || 1;
  const processedEntry = (normalizedBatch?.processedMaterials || []).find(m => String(m.processedMaterialIndex) === String(selectedIndex));
  return {
    ...normalizedBatch,
    detailMaterial: selectedMaterial,
    detailMaterialIndex: selectedIndex,
    feedstockType: selectedMaterial.feedstockType || normalizedBatch.feedstockType,
    weightKg: selectedMaterial.weightKg ?? normalizedBatch.weightKg,
    ...(processedEntry ? {
      processedFeedstockType: processedEntry.processedFeedstockType,
      processedWeightKg: processedEntry.processedWeightKg,
      acceptedWeightKg: processedEntry.acceptedWeightKg,
      rejectedWeightKg: processedEntry.rejectedWeightKg,
      contaminationKg: processedEntry.contaminationKg,
      contaminationNote: processedEntry.contaminationNote,
      yieldVarianceKg: processedEntry.yieldVarianceKg,
      yieldVariancePct: processedEntry.yieldVariancePct,
      processor: processedEntry.processor,
      eowProcess: processedEntry.eowProcess,
      processingEndDate: processedEntry.processingEndDate,
    } : (normalizedBatch.status === "processing" || (normalizedBatch.processedMaterials || []).length > 0) ? {
      // This material line has no matching processed entry — don't fall back to the
      // batch's top-level fields, which reflect a DIFFERENT (most-recently-processed) line.
      processedFeedstockType: null,
      processedWeightKg: null,
      acceptedWeightKg: null,
      rejectedWeightKg: null,
      contaminationKg: null,
      contaminationNote: null,
      yieldVarianceKg: null,
      yieldVariancePct: null,
      processor: null,
      eowProcess: null,
      processingEndDate: null,
    } : {}),
  };
}

function firstEvidenceValue(...values) {
  return values.find(value => typeof value === "string" && value.trim()) || null;
}

function withEvidenceAliases(batch) {
  if (!batch) return batch;
  const photoDataUrl = firstEvidenceValue(
    batch.photoDataUrl,
    batch.collectionPhotoUrl,
    batch.collectionPhoto,
    batch.pprsEvidence
  );
  const handwrittenWeighingIdDataUrl = firstEvidenceValue(
    batch.handwrittenWeighingIdDataUrl,
    batch.handwrittenWeighingIdUrl,
    batch.handwrittenWeighingIdentificationUrl,
    batch.handwrittenWeighingIdentification,
    batch.handwrittenWeightId
  );
  const lapakBillPhotoDataUrl = firstEvidenceValue(batch.lapakBillPhotoDataUrl, batch.lapakBillPhotoUrl);
  const contaminationPhotoDataUrl = firstEvidenceValue(batch.contaminationPhotoDataUrl, batch.contaminationPhotoUrl);
  const offtakerDeliveryPhotoDataUrl = firstEvidenceValue(batch.offtakerDeliveryPhotoDataUrl, batch.offtakerDeliveryPhotoUrl);
  const downstreamProcessingPhotoDataUrl = firstEvidenceValue(batch.downstreamProcessingPhotoDataUrl, batch.downstreamProcessingPhotoUrl);
  const downstreamQcReportPhotoDataUrl = firstEvidenceValue(batch.downstreamQcReportPhotoDataUrl, batch.downstreamQcReportPhotoUrl);
  const downstreamContaminationPhotoDataUrl = firstEvidenceValue(batch.downstreamContaminationPhotoDataUrl, batch.downstreamContaminationPhotoUrl);
  return {
    ...batch,
    photoDataUrl,
    lapakBillPhotoDataUrl,
    handwrittenWeighingIdDataUrl,
    collectionPhotoUrl: firstEvidenceValue(batch.collectionPhotoUrl, photoDataUrl),
    handwrittenWeighingIdUrl: firstEvidenceValue(batch.handwrittenWeighingIdUrl, handwrittenWeighingIdDataUrl),
    contaminationPhotoDataUrl,
    contaminationPhotoUrl: firstEvidenceValue(batch.contaminationPhotoUrl, contaminationPhotoDataUrl),
    offtakerDeliveryPhotoDataUrl,
    offtakerDeliveryPhotoUrl: firstEvidenceValue(batch.offtakerDeliveryPhotoUrl, offtakerDeliveryPhotoDataUrl),
    downstreamProcessingPhotoDataUrl,
    downstreamQcReportPhotoDataUrl,
    downstreamProcessingPhotoUrl: firstEvidenceValue(batch.downstreamProcessingPhotoUrl, downstreamProcessingPhotoDataUrl),
    downstreamContaminationPhotoDataUrl,
    downstreamContaminationPhotoUrl: firstEvidenceValue(batch.downstreamContaminationPhotoUrl, downstreamContaminationPhotoDataUrl),
  };
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

  // Default center: Hub Depok-01
  const DEFAULT_LAT = HUB_DEFAULT_GEO.lat;
  const DEFAULT_LNG = HUB_DEFAULT_GEO.lng;

  const hasPin = value.lat != null && value.lat !== "" && !isNaN(Number(value.lat))
              && value.lng != null && value.lng !== "" && !isNaN(Number(value.lng));

  // Auto-capture real-time device GPS on first render so location is never left
  // pointing at the static hub default. Falls back to the hub default only if
  // location access is unavailable or denied.
  useEffect(() => {
    if (value.lat || value.lng) return; // already has a pin (existing entry or user-set)
    if (!navigator.geolocation) {
      onChange({ lat: DEFAULT_LAT, lng: DEFAULT_LNG });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      pos => onChange({
        lat: +pos.coords.latitude.toFixed(6),
        lng: +pos.coords.longitude.toFixed(6),
      }),
      () => onChange({ lat: DEFAULT_LAT, lng: DEFAULT_LNG }),
      { timeout: 8000, enableHighAccuracy: true, maximumAge: 60000 }
    );
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

function makeActivityAt(stage, actor, ts, geo, note = "") {
  return { stage, actor, ts, geo: geo || null, note };
}

function demoGeo(i, stageOffset = 0) {
  const lat = HUB_DEFAULT_GEO.lat + (((i + stageOffset) % 19) - 9) * 0.0017;
  const lng = HUB_DEFAULT_GEO.lng + (((i * 3 + stageOffset) % 23) - 11) * 0.0015;
  return {
    lat: +lat.toFixed(6),
    lng: +lng.toFixed(6),
    accuracy: 12 + ((i + stageOffset) % 38),
    manual: false,
    fallback: false,
    ts: new Date(Date.UTC(2026, 0, 1, 8, 0, 0) + i * 3600000).toISOString(),
  };
}


function generateSerial({ procType, vvb, tonnes, seq }) {
  const d = new Date().toISOString().slice(0,10).replace(/-/g,"");
  const pc = procType?.startsWith("Mechanical") ? "MR" : procType?.startsWith("Chemical") ? "CR" : procType?.startsWith("Co-processing") ? "CP" : "ER";
  const vc = vvb?.includes("SCS") ? "SCS" : "SUCO";
  return `REZY-${d}-${pc}-IDN-${vc}-DPK-${String(seq).padStart(4,"0")}-${tonnes}MT`;
}

// ─── Storage helpers ──────────────────────────────────────────────────────────
const STORAGE_KEY = "rezy-mrv-batches-depok";
const SETTINGS_KEY = "rezy-mrv-settings";
const ADMIN_REVIEW_DEVICE_KEY = "rezy-mrv-admin-review-device";
const SETTINGS_DEVICE_KEY = "rezy-mrv-settings-device";
const LANG_KEY = "rezy-mrv-lang";
const DEFAULT_SHEETS_URL = "https://jyavuamwtrgffhqafext.supabase.co/functions/v1/rezy-mrv-api";
const JAKARTA_TIME_ZONE = "Asia/Jakarta";

// A Supabase Edge Function URL is also accepted as a backend — lets Settings
// point at either the legacy Apps Script web app or the new rezy-mrv-api function.
function isSupabaseFunctionUrl(url) {
  return /^https:\/\/[a-z0-9]+\.supabase\.co\/functions\/v1\/[\w-]+\/?(?:\?.*)?$/i.test(String(url || "").trim());
}

function isValidSheetsUrl(url) {
  const u = String(url || "").trim();
  return /^https:\/\/script\.google\.com\/macros\/s\/[^/]+\/exec(?:\?.*)?$/i.test(u) || isSupabaseFunctionUrl(u);
}

function normalizeActivities(value) {
  if (Array.isArray(value)) return value;
  if (typeof value === "string" && value.trim()) {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
}

async function loadBatches() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.map(b => ({ ...b, activities: normalizeActivities(b.activities) })) : [];
  } catch { return []; }
}

// Large base64 photo/signature fields — these are what blow past localStorage's
// (often ~5MB on mobile browsers) quota. Once a batch is fully accepted, its
// evidence already lives on the server, so it's safe to drop the local copies.
const EVIDENCE_BLOB_FIELDS = [
  "photoDataUrl", "lapakBillPhotoDataUrl", "lapakBillPhotoUrl",
  "handwrittenWeighingIdDataUrl", "collectionPhotoUrl",
  "transportPhotoDataUrl", "transportPhotoUrl",
  "processingPhotoDataUrl", "processingPhotoUrl",
  "contaminationPhotoDataUrl", "contaminationPhotoUrl",
  "offtakerTransportPhotoDataUrl", "offtakerDeliveryPhotoDataUrl", "offtakerDeliveryPhotoUrl",
  "downstreamProcessingPhotoDataUrl", "downstreamProcessingPhotoUrl",
  "downstreamQcReportPhotoDataUrl", "downstreamQcReportPhotoUrl",
  "downstreamContaminationPhotoDataUrl", "downstreamContaminationPhotoUrl",
  "calibCertUrl",
  "sigCollection", "sigTransport", "sigProcessing", "sigOfftakerTransport", "sigDownstreamProcessing",
];
function pruneEvidence(batch) {
  const pruned = { ...batch };
  EVIDENCE_BLOB_FIELDS.forEach(f => {
    if (typeof pruned[f] === "string" && pruned[f].startsWith("data:")) pruned[f] = null;
  });
  if (Array.isArray(pruned.processedMaterials)) {
    pruned.processedMaterials = pruned.processedMaterials.map(m => {
      const next = { ...m };
      ["processingPhotoDataUrl", "contaminationPhotoDataUrl", "sigProcessing"].forEach(f => {
        if (typeof next[f] === "string" && next[f].startsWith("data:")) next[f] = null;
      });
      return next;
    });
  }
  pruned.evidenceArchivedLocally = true;
  return pruned;
}

async function saveBatches(batches) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(batches));
    return { ok: true, batches };
  } catch {
    // Quota exceeded — free space by dropping large base64 evidence blobs,
    // starting with batches that are fully accepted/verified (already synced).
    for (const onlyReviewed of [true, false]) {
      const pruned = batches.map(b => (
        !onlyReviewed || b.reviewStatus === "accepted" || b.status === "verified"
      ) ? pruneEvidence(b) : b);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(pruned));
        return { ok: true, batches: pruned, pruned: true };
      } catch {}
    }
    return { ok: false, batches };
  }
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

function pickField(obj, keys) {
  for (const key of keys) {
    if (obj?.[key] != null && obj[key] !== "") return obj[key];
  }
  return "";
}

function parseWeightKg(value) {
  if (typeof value === "number") return value;
  const n = Number(String(value || "").replace(/kg/ig, "").replace(/,/g, "").trim());
  return Number.isFinite(n) ? n : 0;
}

function parseGeoPair(value) {
  const raw = String(value || "");
  const match = raw.match(/(-?\d+(?:\.\d+)?)\D+(-?\d+(?:\.\d+)?)/);
  return match ? { lat: Number(match[1]), lng: Number(match[2]) } : {};
}

function getOrCreateDeviceId() {
  const key = "rezy_mrv_device_id";
  try {
    const existing = localStorage.getItem(key);
    if (existing) return existing;
    const id = `DEV-${uid()}`;
    localStorage.setItem(key, id);
    return id;
  } catch {
    return `DEV-${shortRef()}`;
  }
}

function deviceLabel() {
  const nav = navigator || {};
  const uaData = nav.userAgentData;
  if (uaData?.brands?.length) {
    const brands = uaData.brands.map(b => `${b.brand} ${b.version}`).join(", ");
    return `${uaData.mobile ? "Mobile" : "Desktop"} · ${brands}`;
  }
  const ua = nav.userAgent || "";
  if (/iPhone/i.test(ua)) return "iPhone · Safari/Chrome";
  if (/iPad/i.test(ua)) return "iPad · Safari/Chrome";
  if (/Android/i.test(ua)) {
    const model = ua.match(/Android[^;]*;\s*([^;)]+)/)?.[1]?.trim();
    return model ? `Android · ${model}` : "Android device";
  }
  const platform = nav.platform || "Unknown platform";
  const browser = ua.match(/(Chrome|CriOS|Safari|Firefox|Edg|OPR)\/?[\d.]*/i)?.[0] || "Browser";
  return `${platform} · ${browser}`;
}

async function captureClientMeta() {
  let ip = "Unavailable";
  try {
    const ctrl = new AbortController();
    const timeout = setTimeout(() => ctrl.abort(), 2500);
    const res = await fetch("https://api.ipify.org?format=json", { signal: ctrl.signal });
    clearTimeout(timeout);
    const json = await res.json();
    if (json?.ip) ip = json.ip;
  } catch {}
  return {
    inputterIp: ip,
    inputterDevice: `${deviceLabel()} · ${getOrCreateDeviceId()}`,
  };
}

function parseInputterMap(val) {
  if (!val) return {};
  if (typeof val === "object") return val;
  try {
    const parsed = JSON.parse(val);
    if (parsed && typeof parsed === "object") return parsed;
  } catch {}
  // Legacy single-value string from before per-stage tracking — treat as Collection's value.
  return { collection: val };
}
function extractInputterId(deviceStr) {
  if (!deviceStr) return "-";
  const parts = String(deviceStr).split("·").map(s => s.trim()).filter(Boolean);
  return parts.find(p => p.startsWith("DEV-")) || parts[parts.length - 1] || "-";
}
function mergeInputterField(existing, stage, value) {
  const map = parseInputterMap(existing);
  if (value) map[stage] = value;
  return JSON.stringify(map);
}
// Union per-stage inputter maps from the Sheet and local state — the Sheet write for a
// later stage (e.g. transport) can lag a local reload, so a naive `sheet || local` pick
// silently drops stages local already has. Sheet wins per-stage on conflicts.
function mergeInputterMaps(sheetVal, localVal) {
  const merged = { ...parseInputterMap(localVal), ...parseInputterMap(sheetVal) };
  return Object.keys(merged).length ? JSON.stringify(merged) : (sheetVal || localVal);
}

// Union material lines by index, Sheet winning per-index. Either side can be
// incomplete (Sheet rows lost to rowId collisions, local lists polluted by
// duplicate-index recovery), so neither list can be trusted wholesale.
function mergeMaterialLines(sheetMaterials, localMaterials) {
  const byIndex = {};
  (localMaterials || []).forEach(m => { byIndex[m.index || 1] = m; });
  (sheetMaterials || []).forEach(m => { byIndex[m.index || 1] = m; });
  const merged = Object.keys(byIndex).map(Number).sort((a, b) => a - b).map(i => byIndex[i]);
  return merged.length ? merged : (sheetMaterials || localMaterials || []);
}

function normalizeSheetBatch(row) {
  const activities = normalizeActivities(pickField(row, ["activities", "Activities", "Activity Log"]));
  const geoPair = parseGeoPair(pickField(row, ["collectionGeoTag", "Collection GPS", "GPS", "Geo Tag", "Geotag"]));
  const status = String(pickField(row, ["status", "Status", "stage", "Stage"]) || "collection").toLowerCase();
  const batchId = pickField(row, ["batchId", "Batch ID", "BatchID", "batch_id", "id"]);
  const rowId = pickField(row, ["rowId", "Row ID"]);
  const materialIndex = Number(pickField(row, ["materialIndex", "Material Index"])) || 1;
  const feedstockType = pickField(row, ["feedstockType", "Feedstock", "Feedstock Type", "feedstock"]);
  const weightKg = parseWeightKg(pickField(row, ["weightKg", "Weight", "Weight (kg)", "Gross Weight (kg)", "weight"]));

  return {
    ...row,
    id: rowId || pickField(row, ["id"]) || batchId,
    rowId,
    batchId,
    materialIndex,
    hub: pickField(row, ["hub", "Hub"]) || "Hub Depok-01",
    status,
    reviewStatus: pickField(row, ["reviewStatus", "Review Status"]) || row.reviewStatus,
    reviewStage: pickField(row, ["reviewStage", "Review Stage"]) || row.reviewStage,
    reviewActor: pickField(row, ["reviewActor", "Review Actor"]) || row.reviewActor,
    reviewAt: pickField(row, ["reviewAt", "Review At"]) || row.reviewAt,
    inputterIp: pickField(row, ["inputterIp", "Inputter IP", "IP Address"]),
    inputterDevice: pickField(row, ["inputterDevice", "Inputter Device", "Device ID", "Smartphone ID"]),
    feedstockType,
    weightKg,
    collectorId: pickField(row, ["collectorId", "Collector", "Collector / Worker", "collector"]),
    weighingEquipId: pickField(row, ["weighingEquipId", "Weighing Equipment", "Scale"]),
    collectionDate: pickField(row, ["collectionDate", "Collection Date"]),
    collectionPhotoUrl: pickField(row, ["collectionPhotoUrl", "Collection Photo URL", "Collection Photo", "PPRS Evidence"]),
    handwrittenWeighingIdUrl: pickField(row, ["handwrittenWeighingIdUrl", "Handwritten Weighing Identification URL", "Handwritten Weighing Identification"]),
    handwrittenWeighingId: pickField(row, ["handwrittenWeighingId", "Generated Weighing ID", "Weighing ID"]),
    handwrittenRawText: pickField(row, ["handwrittenRawText", "Handwritten Raw Text", "Raw Weighing Text"]),
    handwrittenWeights: pickField(row, ["handwrittenWeights", "Handwritten Weights", "Raw Numbers"]),
    handwrittenGrossWeight: parseWeightKg(pickField(row, ["handwrittenGrossWeight", "Handwritten Gross Weight", "Gross Weight From Note"])),
    handwrittenDeductions: pickField(row, ["handwrittenDeductions", "Handwritten Deductions", "Deductions"]),
    handwrittenTotalDeduction: parseWeightKg(pickField(row, ["handwrittenTotalDeduction", "Handwritten Total Deduction", "Total Deduction"])),
    handwrittenNetWeight: parseWeightKg(pickField(row, ["handwrittenNetWeight", "Handwritten Net Weight", "Net Weight"])),
    handwrittenRate: parseMoneyNumber(pickField(row, ["handwrittenRate", "Handwritten Rate", "Rate"])),
    handwrittenTotalAmount: parseMoneyNumber(pickField(row, ["handwrittenTotalAmount", "Handwritten Total Amount", "Total Amount"])),
    digitizedScaleKg: parseWeightKg(pickField(row, ["digitizedScaleKg", "Digitized Scale Reading (kg)", "Digitized Scale Reading", "Scale Reading", "Manual Scale Reading"])),
    photoDataUrl: pickField(row, ["photoDataUrl", "collectionPhotoUrl", "Collection Photo URL", "Collection Photo", "PPRS Evidence"]),
    handwrittenWeighingIdDataUrl: pickField(row, ["handwrittenWeighingIdDataUrl", "handwrittenWeighingIdUrl", "Handwritten Weighing Identification URL", "Handwritten Weighing Identification"]),
    transportPhotoDataUrl: pickField(row, ["transportPhotoDataUrl", "transportPhotoUrl", "Transport Photo URL", "Transport Photo"]),
    processingPhotoDataUrl: pickField(row, ["processingPhotoDataUrl", "processingPhotoUrl", "Processing Photo URL", "Processing Photo"]),
    pickupVehicle: pickField(row, ["pickupVehicle", "Pickup Vehicle", "Material Pick-up Vehicle", "Material Pickup Vehicle"]),
    transportRef: pickField(row, ["transportRef", "Transport Ref.", "Transport Manifest Ref.", "Manifest"]),
    transportDate: pickField(row, ["transportDate", "Transport Date"]),
    processor: pickField(row, ["processor", "Processor", "Processing Facility"]),
    eowProcess: pickField(row, ["eowProcess", "EoW Process", "End-of-Waste Process"]),
    processingEndDate: pickField(row, ["processingEndDate", "Processing End Date"]),
    processedMaterialIndex: pickField(row, ["processedMaterialIndex", "Processed Material Index"]),
    processedFeedstockType: pickField(row, ["processedFeedstockType", "Processed Feedstock Type"]),
    acceptedWeightKg: parseWeightKg(pickField(row, ["acceptedWeightKg", "Accepted Weight (kg)"])),
    rejectedWeightKg: parseWeightKg(pickField(row, ["rejectedWeightKg", "Rejected Weight (kg)"])),
    contaminationKg: parseWeightKg(pickField(row, ["contaminationKg", "Contamination Volume (kg)"])),
    contaminationNote: pickField(row, ["contaminationNote", "Contamination Notes"]),
    contaminationPhotoUrl: pickField(row, ["contaminationPhotoUrl", "contaminationPhotoDataUrl", "Contamination Photo URL", "Contamination Photo"]),
    contaminationPhotoDataUrl: pickField(row, ["contaminationPhotoUrl", "contaminationPhotoDataUrl", "Contamination Photo URL", "Contamination Photo"]),
    yieldVarianceKg: pickField(row, ["yieldVarianceKg", "Yield Variance (kg)"]),
    yieldVariancePct: pickField(row, ["yieldVariancePct", "Yield Variance (%)"]),
    offtakerMaterials: pickField(row, ["offtakerMaterials", "Offtaker Materials"]) || [],
    processedMaterials: pickField(row, ["processedMaterials", "Processed Materials"]) || [],
    offtakerTransportRef: pickField(row, ["offtakerTransportRef", "Offtaker Transport Ref."]),
    offtakerTransportDate: pickField(row, ["offtakerTransportDate", "Offtaker Transport Date"]),
    offtakerPlateNo: pickField(row, ["offtakerPlateNo", "Offtaker Plate No."]),
    offtakerDeliveryPhotoUrl: pickField(row, ["offtakerDeliveryPhotoUrl", "offtakerDeliveryPhotoDataUrl", "Offtaker Delivery Photo URL", "Offtaker Delivery Photo"]),
    offtakerDeliveryPhotoDataUrl: pickField(row, ["offtakerDeliveryPhotoUrl", "offtakerDeliveryPhotoDataUrl", "Offtaker Delivery Photo URL", "Offtaker Delivery Photo"]),
    downstreamFacility: pickField(row, ["downstreamFacility", "Downstream Facility"]),
    downstreamProcessedMaterialIndex: pickField(row, ["downstreamProcessedMaterialIndex", "Downstream Processed Material Index"]),
    downstreamProcessedFeedstockType: pickField(row, ["downstreamProcessedFeedstockType", "Downstream Processed Feedstock Type"]),
    downstreamEowProcess: pickField(row, ["downstreamEowProcess", "Downstream EoW Process"]),
    downstreamProcessingEndDate: pickField(row, ["downstreamProcessingEndDate", "Downstream Processing End Date"]),
    downstreamAcceptedWeightKg: parseWeightKg(pickField(row, ["downstreamAcceptedWeightKg", "Downstream Accepted Weight (kg)"])),
    downstreamRejectedWeightKg: parseWeightKg(pickField(row, ["downstreamRejectedWeightKg", "Downstream Rejected Weight (kg)"])),
    downstreamContaminationKg: parseWeightKg(pickField(row, ["downstreamContaminationKg", "Downstream Contamination Volume (kg)"])),
    downstreamContaminationNote: pickField(row, ["downstreamContaminationNote", "Downstream Contamination Notes"]),
    downstreamContaminationPhotoUrl: pickField(row, ["downstreamContaminationPhotoUrl", "downstreamContaminationPhotoDataUrl", "Downstream Contamination Photo URL", "Downstream Contamination Photo"]),
    downstreamContaminationPhotoDataUrl: pickField(row, ["downstreamContaminationPhotoUrl", "downstreamContaminationPhotoDataUrl", "Downstream Contamination Photo URL", "Downstream Contamination Photo"]),
    downstreamYieldVarianceKg: pickField(row, ["downstreamYieldVarianceKg", "Downstream Yield Variance (kg)"]),
    downstreamYieldVariancePct: pickField(row, ["downstreamYieldVariancePct", "Downstream Yield Variance (%)"]),
    downstreamProcessingPhotoUrl: pickField(row, ["downstreamProcessingPhotoUrl", "downstreamProcessingPhotoDataUrl", "Downstream Processing Photo URL", "Downstream Processing Photo"]),
    downstreamProcessingPhotoDataUrl: pickField(row, ["downstreamProcessingPhotoUrl", "downstreamProcessingPhotoDataUrl", "Downstream Processing Photo URL", "Downstream Processing Photo"]),
    loggedBy: pickField(row, ["loggedBy", "Logged By"]) || "Hub Operator",
    createdAt: pickField(row, ["createdAt", "createdAtDisplay", "Logged At", "Timestamp", "timestamp"]),
    collectionLat: pickField(row, ["collectionLat", "Geo Lat", "geoLat"]) || geoPair.lat || "",
    collectionLng: pickField(row, ["collectionLng", "Geo Lng", "geoLng"]) || geoPair.lng || "",
    materials: [{ index: materialIndex, feedstockType, weightKg, inputter: pickField(row, ["inputter", "Inputter", "Logged By"]) }],
    activities,
  };
}

function hasMeaningfulBatch(batch) {
  return Boolean(batch.batchId || batch.feedstockType || Number(batch.weightKg) > 0);
}

// ─── Load batches from Google Sheet ──────────────────────────────────────────
// Fetches all batch rows from Sheet on app load — enables multi-device sync
function loadJsonp(url, timeoutMs = 12000) {
  return new Promise((resolve, reject) => {
    const callback = `rezyJsonp_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const sep = url.includes("?") ? "&" : "?";
    const script = document.createElement("script");
    const timer = setTimeout(() => {
      cleanup();
      reject(new Error("Sheet read timed out"));
    }, timeoutMs);
    function cleanup() {
      clearTimeout(timer);
      delete window[callback];
      script.remove();
    }
    window[callback] = data => {
      cleanup();
      resolve(data);
    };
    script.onerror = () => {
      cleanup();
      reject(new Error("Sheet read failed"));
    };
    script.src = `${url}${sep}callback=${encodeURIComponent(callback)}`;
    document.body.appendChild(script);
  });
}

// Group per-material Sheet rows into one batch object per batchId,
// merging their materials arrays. Each Sheet row = one material row.
function groupSheetBatchesByBatchId(rows) {
  const order = [];
  const map = {};
  rows.forEach(row => {
    const key = row.batchId;
    if (!key) return;
    if (!map[key]) {
      map[key] = { ...row, materials: [] };
      order.push(key);
    }
    const b = map[key];
    [
      "collectionPhotoUrl",
      "handwrittenWeighingIdUrl",
      "photoDataUrl",
      "handwrittenWeighingIdDataUrl",
      "transportPhotoDataUrl",
      "processingPhotoDataUrl",
      "contaminationPhotoUrl",
      "contaminationPhotoDataUrl",
      "calibCertUrl",
      "sigCollection",
      "sigTransport",
      "sigProcessing",
      "sigOfftakerTransport",
      "sigDownstreamProcessing",
      "digitizedScaleKg",
      "offtakerDeliveryPhotoUrl",
      "offtakerDeliveryPhotoDataUrl",
      "downstreamContaminationPhotoUrl",
      "downstreamContaminationPhotoDataUrl",
      "downstreamProcessingPhotoUrl",
      "downstreamProcessingPhotoDataUrl",
    ].forEach(field => {
      if (!b[field] && row[field]) b[field] = row[field];
    });
    // Merge materials (avoid duplicate indices)
    const incoming = row.materials || [];
    incoming.forEach(m => {
      const idx = m.index || 1;
      const existing = b.materials.find(x => (x.index || 1) === idx);
      if (!existing) {
        b.materials.push(m);
      } else if (
        existing.feedstockType !== m.feedstockType ||
        Number(existing.weightKg) !== Number(m.weightKg)
      ) {
        // Different material with same index (data corruption) — add with new index
        const maxIdx = b.materials.length > 0 ? Math.max(...b.materials.map(x => x.index || 1)) : 0;
        b.materials.push({ ...m, index: maxIdx + 1 });
      }
    });
    // Keep the latest status / review fields from highest materialIndex row
    if (Number(row.materialIndex || 1) >= Number(b.materialIndex || 1)) {
      b.status         = row.status         || b.status;
      b.reviewStatus   = row.reviewStatus   || b.reviewStatus;
      b.reviewStage    = row.reviewStage    || b.reviewStage;
      b.reviewAt       = row.reviewAt       || b.reviewAt;
      b.reviewActor    = row.reviewActor    || b.reviewActor;
      b.rejectionReason = row.rejectionReason || b.rejectionReason;
    }
  });
  return order.map(k => {
    const b = map[k];
    if (b.materials.length > 1) {
      b.weightKg = materialTotalKg(b.materials);
      b.feedstockType = materialSummary(b.materials);
    }
    return b;
  });
}

async function loadBatchesFromSheet(sheetsUrl, light = false) {
  if (!isValidSheetsUrl(sheetsUrl)) return null;
  try {
    const url = `${sheetsUrl}?action=get_batches${light ? "&light=1" : ""}&_ts=${Date.now()}`;
    let json = null;
    try {
      const res = await fetch(url, { cache: "no-store" });
      json = await res.json();
    } catch {
      json = await loadJsonp(url);
    }
    if (json.ok && Array.isArray(json.batches) && json.batches.length > 0) {
      const normalized = json.batches.map(normalizeSheetBatch).filter(hasMeaningfulBatch);
      const grouped = groupSheetBatchesByBatchId(normalized);
      return grouped.length ? grouped : null;
    }
    return null;
  } catch { return null; }
}

// ─── Photo Compression ────────────────────────────────────────────────────────
// Keeps evidence readable while staying below Google Sheets' practical cell size.
// maxBytes caps the decoded (binary) file size — base64 length is ~4/3 of that.
function compressPhoto(dataUrl, maxSize = 1400, quality = 0.88, maxBytes = 150 * 1024) {
  return new Promise((resolve) => {
    if (!dataUrl) { resolve(null); return; }
    const img = new Image();
    img.onload = () => {
      let size = maxSize;
      let q = quality;
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      let result = "";
      for (let attempt = 0; attempt < 8; attempt++) {
        const ratio = Math.min(size / img.width, size / img.height, 1);
        canvas.width  = Math.max(1, Math.round(img.width  * ratio));
        canvas.height = Math.max(1, Math.round(img.height * ratio));
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        result = canvas.toDataURL("image/jpeg", q);
        const base64Len = result.length - (result.indexOf(",") + 1);
        if (base64Len * 0.75 <= maxBytes) break;
        size = Math.round(size * 0.86);
        q = Math.max(0.6, q - 0.05);
      }
      resolve(result);
    };
    img.onerror = () => resolve(null);
    img.src = dataUrl;
  });
}

// Sends photos as GET requests (one per photo type).
// NOTE: Apps Script exec URL returns a 302 redirect — POST drops the body on redirect.
// GET preserves query params through the redirect, so we use GET here.
async function syncPhotosToSheets(sheetsUrl, batch) {
  if (!isValidSheetsUrl(sheetsUrl)) return;
  const photos = [
    { field: "photoDataUrl",               label: "collection" },
    { field: "lapakBillPhotoDataUrl",      label: "lapak_bill" },
    { field: "handwrittenWeighingIdDataUrl", label: "handwritten_weighing_identification" },
    { field: "transportPhotoDataUrl",      label: "transport" },
    { field: "processingPhotoDataUrl",     label: "processing" },
    { field: "contaminationPhotoDataUrl",  label: "contamination" },
    { field: "calibCertUrl",               label: "calibration_certificate" },
    { field: "offtakerDeliveryPhotoDataUrl", label: "offtaker_delivery" },
    { field: "downstreamProcessingPhotoDataUrl", label: "downstream_processing" },
    { field: "downstreamQcReportPhotoDataUrl", label: "downstream_qc_report" },
    { field: "downstreamContaminationPhotoDataUrl", label: "downstream_contamination" },
  ];
  if (isSupabaseFunctionUrl(sheetsUrl)) {
    for (const p of photos) {
      if (!batch[p.field]) continue;
      try {
        const photoData = await compressPhoto(batch[p.field], 1600, 0.85, 150 * 1024) || batch[p.field];
        await fetch(sheetsUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "upsert_photo", batchId: batch.batchId, photoType: p.label, photoData }),
        });
      } catch {}
    }
    return;
  }
  for (const p of photos) {
    if (!batch[p.field]) continue;
    try {
      // GET survives the Apps Script 302 redirect (POST drops the body).
      // Google Apps Script URL query limit ≈ 8 KB.
      // Strategy: compress down in steps until the full URL fits.
      let compressed = null;
      for (const [sz, q] of [[160, 0.60], [120, 0.50], [90, 0.40]]) {
        compressed = await compressPhoto(batch[p.field], sz, q);
        if (!compressed) break;
        const payload = { action: "upsert_photo", batchId: batch.batchId, photoType: p.label, photoData: compressed };
        const encoded = encodeURIComponent(JSON.stringify(payload));
        if (encoded.length <= 7500) {
          await fetch(`${sheetsUrl}?data=${encoded}`, { method: "GET", mode: "no-cors" });
          break; // sent successfully
        }
        // Too large — try smaller on next iteration
      }
    } catch {}
  }
}

async function syncSignaturesToSheets(sheetsUrl, batch) {
  if (!isValidSheetsUrl(sheetsUrl)) return { ok: false };
  const rawSigs = [
    { stage: "Collection", data: batch.sigCollection },
    { stage: "Transport",  data: batch.sigTransport  },
    { stage: "Processing", data: batch.sigProcessing },
    { stage: "Offtaker Transport", data: batch.sigOfftakerTransport },
    { stage: "Downstream Processing", data: batch.sigDownstreamProcessing },
  ].filter(s => s.data);
  if (!rawSigs.length) return { ok: true };
  if (isSupabaseFunctionUrl(sheetsUrl)) {
    try {
      await fetch(sheetsUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "upsert_signatures",
          batchId: batch.batchId,
          inputter: batch.loggedBy || "",
          signatures: rawSigs,
        }),
      });
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  }
  try {
    // Compress each signature to fit within GET URL limit (~7500 chars encoded).
    // Signatures are PNG canvas drawings — compressing to JPEG at small size works well.
    const compressed = await Promise.all(rawSigs.map(async s => {
      let data = s.data;
      for (const [sz, q] of [[280, 0.60], [180, 0.50], [120, 0.40]]) {
        const c = await compressPhoto(s.data, sz, q);
        if (!c) break;
        const testPayload = { action: "upsert_signatures", batchId: batch.batchId, inputter: "", signatures: [{ stage: s.stage, data: c }] };
        if (encodeURIComponent(JSON.stringify(testPayload)).length <= 7400) { data = c; break; }
      }
      return { stage: s.stage, data };
    }));
    // Send all signatures in one GET request
    const payload = {
      action: "upsert_signatures",
      batchId: batch.batchId,
      inputter: batch.loggedBy || "",
      signatures: compressed,
    };
    const encoded = encodeURIComponent(JSON.stringify(payload));
    if (encoded.length <= 7500) {
      await fetch(`${sheetsUrl}?data=${encoded}`, { method: "GET", mode: "no-cors" });
    } else {
      // Send one signature at a time if combined payload is too large
      for (const sig of compressed) {
        const p = { action: "upsert_signatures", batchId: batch.batchId, inputter: batch.loggedBy || "", signatures: [sig] };
        const e = encodeURIComponent(JSON.stringify(p));
        if (e.length <= 7500) await fetch(`${sheetsUrl}?data=${e}`, { method: "GET", mode: "no-cors" });
      }
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

// ─── Google Sheets Sync ───────────────────────────────────────────────────────
function sheetSafePhotoRef(value) {
  const raw = String(value || "");
  return raw.startsWith("data:") ? "" : raw;
}

function stripForSheets(batch) {
  const collectionGeo = getCollectionGeo(batch);
  const collectionActivity = (batch.activities || []).find(a => activityStatus(a.stage) === "collection");
  const transportActivity = (batch.activities || []).find(a => activityStatus(a.stage) === "transport");
  const processingActivity = (batch.activities || []).find(a => activityStatus(a.stage) === "processing");
  const offtakerTransportActivity = (batch.activities || []).find(a => activityStatus(a.stage) === "offtaker_transport");
  const downstreamProcessingActivity = (batch.activities || []).find(a => activityStatus(a.stage) === "downstream_processing");
  return {
    batchId:           batch.batchId,
    rowId:             batch.rowId,
    materialIndex:     batch.materialIndex,
    hub:               batch.hub,
    status:            batch.status,
    feedstockType:     batch.feedstockType,
    weightKg:          batch.weightKg,
    collectorId:       batch.collectorId,
    weighingEquipId:   batch.weighingEquipId,
    pickupVehicle:     batch.pickupVehicle,
    collectionDate:    collectionActivity?.ts || batch.collectionDate || batch.createdAt,
    collectionPhotoUrl: sheetSafePhotoRef(batch.collectionPhotoUrl || batch.photoDataUrl),
    handwrittenWeighingIdUrl: sheetSafePhotoRef(batch.handwrittenWeighingIdUrl || batch.handwrittenWeighingIdDataUrl),
    handwrittenWeighingId: batch.handwrittenWeighing?.weighingId || batch.handwrittenWeighingId || "",
    handwrittenRawText: (batch.handwrittenWeighing?.rawText || batch.handwrittenRawText || "").slice(0, 500),
    handwrittenWeights: batch.handwrittenWeighing?.weights?.join("|") || batch.handwrittenWeights || "",
    handwrittenGrossWeight: batch.handwrittenWeighing?.grossWeight || batch.handwrittenGrossWeight || "",
    handwrittenDeductions: batch.handwrittenWeighing?.deductions?.join("|") || batch.handwrittenDeductions || "",
    handwrittenTotalDeduction: batch.handwrittenWeighing?.totalDeduction || batch.handwrittenTotalDeduction || "",
    handwrittenNetWeight: batch.handwrittenWeighing?.netWeight || batch.handwrittenNetWeight || "",
    handwrittenRate: batch.handwrittenWeighing?.rate || batch.handwrittenRate || "",
    handwrittenTotalAmount: batch.handwrittenWeighing?.totalAmount || batch.handwrittenTotalAmount || "",
    digitizedScaleKg:  batch.digitizedScaleKg || "",
    transportRef:      batch.transportRef,
    transportDate:     transportActivity?.ts || batch.transportDate,
    processor:         batch.processor,
    eowProcess:        batch.eowProcess,
    processingEndDate: processingActivity?.ts || batch.processingEndDate,
    processedMaterialIndex: batch.processedMaterialIndex || "",
    processedFeedstockType: batch.processedFeedstockType || "",
    acceptedWeightKg:  batch.acceptedWeightKg || "",
    rejectedWeightKg:  batch.rejectedWeightKg || "",
    contaminationKg:   batch.contaminationKg || "",
    contaminationNote: batch.contaminationNote || "",
    contaminationPhotoUrl: sheetSafePhotoRef(batch.contaminationPhotoUrl || batch.contaminationPhotoDataUrl),
    yieldVarianceKg:   batch.yieldVarianceKg || "",
    yieldVariancePct:  batch.yieldVariancePct || "",
    offtakerMaterials: (batch.offtakerMaterials || []).map((m, idx) => ({
      index: idx + 1,
      feedstockType: m.feedstockType,
      weightKg: Number(m.weightKg) || 0,
    })),
    processedMaterials: batch.processedMaterials || [],
    offtakerTransportRef:  batch.offtakerTransportRef || "",
    offtakerTransportDate: offtakerTransportActivity?.ts || batch.offtakerTransportDate || "",
    offtakerPlateNo:       batch.offtakerPlateNo || "",
    offtakerDeliveryPhotoUrl: sheetSafePhotoRef(batch.offtakerDeliveryPhotoUrl || batch.offtakerDeliveryPhotoDataUrl),
    downstreamFacility:    batch.downstreamFacility || "",
    downstreamProcessedMaterialIndex: batch.downstreamProcessedMaterialIndex || "",
    downstreamProcessedFeedstockType: batch.downstreamProcessedFeedstockType || "",
    downstreamEowProcess:  batch.downstreamEowProcess || "",
    downstreamProcessingEndDate: downstreamProcessingActivity?.ts || batch.downstreamProcessingEndDate || "",
    downstreamAcceptedWeightKg: batch.downstreamAcceptedWeightKg || "",
    downstreamRejectedWeightKg: batch.downstreamRejectedWeightKg || "",
    downstreamContaminationKg:  batch.downstreamContaminationKg || "",
    downstreamContaminationNote: batch.downstreamContaminationNote || "",
    downstreamContaminationPhotoUrl: sheetSafePhotoRef(batch.downstreamContaminationPhotoUrl || batch.downstreamContaminationPhotoDataUrl),
    downstreamYieldVarianceKg:  batch.downstreamYieldVarianceKg || "",
    downstreamYieldVariancePct: batch.downstreamYieldVariancePct || "",
    downstreamProcessingPhotoUrl: sheetSafePhotoRef(batch.downstreamProcessingPhotoUrl || batch.downstreamProcessingPhotoDataUrl),
    rejectionReason:   batch.rejectionReason,
    reviewStatus:      batch.reviewStatus,
    reviewStage:       batch.reviewStage,
    reviewActor:       batch.reviewActor,
    reviewAt:          batch.reviewAt,
    inputterIp:         batch.inputterIp,
    inputterDevice:     batch.inputterDevice,
    loggedBy:          batch.loggedBy,
    inputter:          batch.loggedBy,
    createdAt:         batch.createdAt,
    createdAtDisplay:  fmtDateTime(batch.createdAt),
    collectionLat:     collectionGeo?.lat || "",
    collectionLng:     collectionGeo?.lng || "",
    collectionGeoTag:  geoTag(collectionGeo),
    gpsLink:           gpsLink(collectionGeo),
    materials:         (batch.materials && batch.materials.length ? batch.materials : [{ feedstockType: batch.feedstockType, weightKg: batch.weightKg }]).map((m, idx) => ({
      index: m.index || idx + 1,   // preserve original index — do NOT reassign
      feedstockType: m.feedstockType,
      weightKg: Number(m.weightKg) || 0,
      inputter: batch.loggedBy || "",
    })),
    signatures: [
      { stage: "Collection", inputter: batch.loggedBy || "", data: batch.sigCollection },
      { stage: "Transport", inputter: batch.loggedBy || "", data: batch.sigTransport },
      { stage: "Processing", inputter: batch.loggedBy || "", data: batch.sigProcessing },
      { stage: "Offtaker Transport", inputter: batch.loggedBy || "", data: batch.sigOfftakerTransport },
      { stage: "Downstream Processing", inputter: batch.loggedBy || "", data: batch.sigDownstreamProcessing },
    ].filter(s => s.data),
    // Include activities with stage, timestamp, and GPS only
    activities: (batch.activities || []).map(a => ({
      stage: a.stage,
      actor: (a.actor || "").slice(0, 50),
      inputter: (a.actor || batch.loggedBy || "").slice(0, 50),
      ts:    a.ts,
      tsDisplay: fmtDateTime(a.ts),
      geoLat: a.geo?.lat || "",
      geoLng: a.geo?.lng || "",
      geoTag: geoTag(a.geo),
      gpsLink: gpsLink(a.geo),
      geo:   a.geo ? { lat: a.geo.lat, lng: a.geo.lng, accuracy: a.geo.accuracy || "", label: geoLabel(a.geo) } : null,
    })),
  };
}

function stripBatchesForSheets(batch) {
  const base = stripForSheets(batch);
  const materials = base.materials && base.materials.length
    ? base.materials
    : [{ index: 1, feedstockType: base.feedstockType, weightKg: base.weightKg, inputter: base.inputter }];
  return materials.map((material, idx) => ({
    ...base,
    // Always derive per-material rowId from batchId+index — never reuse base.rowId,
    // which is a single batch-level field that the Sheet merge can populate from
    // material 1's row. Reusing it here made every material upsert the same row,
    // overwriting earlier materials with the last one synced.
    rowId: `${base.batchId}-M${String(material.index || idx + 1).padStart(2, "0")}`,
    materialIndex: material.index || idx + 1,
    feedstockType: material.feedstockType,
    weightKg: Number(material.weightKg) || 0,
    materials: [material],
  }));
}

async function syncToSheets(sheetsUrl, batch, activity) {
  if (!isValidSheetsUrl(sheetsUrl)) return { ok: false };
  try {
    const payload = {
      action: "upsert_batch",
      batch: stripBatchesForSheets(batch),
      activity: activity ? {
        stage: activity.stage,
        actor: (activity.actor || "").slice(0, 50),
        inputter: (activity.inputter || activity.actor || batch.loggedBy || "").slice(0, 50),
        ts: activity.ts,
        tsDisplay: fmtDateTime(activity.ts),
        note: (activity.note || "").slice(0, 80),
        geoLat: activity.geo?.lat || "",
        geoLng: activity.geo?.lng || "",
        geoTag: geoTag(activity.geo),
        gpsLink: gpsLink(activity.geo),
        geo: activity.geo ? { lat: activity.geo.lat, lng: activity.geo.lng, accuracy: activity.geo.accuracy || "", label: geoLabel(activity.geo) } : null,
      } : null,
    };
    if (isSupabaseFunctionUrl(sheetsUrl)) {
      const res = await fetch(sheetsUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({ ok: false }));
      return json;
    }
    await fetch(sheetsUrl, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    });
    // no-cors always returns opaque — treat any non-throw as success
    // Verify by checking the Sheet directly
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

async function clearSheetsData(sheetsUrl) {
  if (!isValidSheetsUrl(sheetsUrl)) return { ok: false };
  try {
    if (isSupabaseFunctionUrl(sheetsUrl)) {
      const res = await fetch(sheetsUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "clear_all" }),
      });
      return await res.json().catch(() => ({ ok: false }));
    }
    await fetch(sheetsUrl, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ action: "clear_all" }),
    });
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

async function deleteBatchFromBackend(sheetsUrl, batchId) {
  if (!isValidSheetsUrl(sheetsUrl)) return { ok: false };
  try {
    if (isSupabaseFunctionUrl(sheetsUrl)) {
      const res = await fetch(sheetsUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete_batch", batchId }),
      });
      return await res.json().catch(() => ({ ok: false }));
    }
    await fetch(sheetsUrl, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ action: "delete_batch", batchId }),
    });
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

async function testSheetsConnection(sheetsUrl) {
  if (!isValidSheetsUrl(sheetsUrl)) return false;
  try {
    if (isSupabaseFunctionUrl(sheetsUrl)) {
      const res = await fetch(sheetsUrl, { method: "GET" });
      const json = await res.json().catch(() => null);
      return Boolean(json?.ok);
    }
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
        {options.map(o => (typeof o === "object" && o !== null)
          ? <option key={o.value} value={o.value}>{o.label}</option>
          : <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function SearchSel({ label, value, onChange, options, required, disabled, placeholder, emptyLabel, lang = "en" }) {
  const t = useT(lang);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    const onClick = e => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const normalized = options.map(o => typeof o === "object" && o !== null ? o : { value: o, label: o });
  const selected = normalized.find(o => o.value === value);

  const filtered = query.trim()
    ? normalized.filter(o => o.label.toLowerCase().includes(query.trim().toLowerCase()))
    : normalized;

  return (
    <div ref={wrapRef} style={{ position: "relative" }}>
      {label && <Lbl required={required}>{label}</Lbl>}
      <div
        onClick={() => !disabled && setOpen(o => !o)}
        style={{
          width: "100%", padding: "9px 12px", borderRadius: 8, boxSizing: "border-box",
          border: `1.5px solid ${open ? C.forest : C.creamDark}`, background: disabled ? C.creamMid : C.white,
          fontSize: 13, color: value ? C.charcoal : C.muted, fontFamily: "inherit",
          cursor: disabled ? "default" : "pointer", display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
        <span>{selected ? selected.label : (emptyLabel || t("selectPlaceholder"))}</span>
        <span style={{ fontSize: 10, color: C.forest }}>▼</span>
      </div>
      {open && !disabled && (
        <div style={{
          position: "absolute", top: "100%", left: 0, right: 0, zIndex: 20, marginTop: 4,
          background: C.white, border: `1.5px solid ${C.creamDark}`, borderRadius: 8,
          boxShadow: "0 4px 14px rgba(0,0,0,0.12)", maxHeight: 240, display: "flex", flexDirection: "column",
        }}>
          <input
            autoFocus type="text" value={query} onChange={e => setQuery(e.target.value)}
            placeholder={placeholder || t("searchNamePlaceholder")}
            style={{
              padding: "9px 12px", border: "none", borderBottom: `1.5px solid ${C.creamDark}`,
              fontSize: 13, fontFamily: "inherit", outline: "none", boxSizing: "border-box",
            }} />
          <div style={{ overflowY: "auto" }}>
            {filtered.length === 0 && (
              <div style={{ padding: "10px 12px", fontSize: 12, color: C.muted }}>{t("noMatches")}</div>
            )}
            {filtered.map(o => (
              <div key={o.value} onClick={() => { onChange(o.value); setQuery(""); setOpen(false); }}
                style={{
                  padding: "8px 12px", fontSize: 13, cursor: "pointer",
                  background: o.value === value ? C.creamMid : "transparent", color: C.charcoal,
                }}
                onMouseEnter={e => e.currentTarget.style.background = C.creamMid}
                onMouseLeave={e => e.currentTarget.style.background = o.value === value ? C.creamMid : "transparent"}>
                {o.label}
              </div>
            ))}
          </div>
        </div>
      )}
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
function SignaturePad({ label, value, onChange, lang = "en" }) {
  const t = useT(lang);
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

  const ts = has ? new Date().toLocaleString("id-ID", { timeZone: JAKARTA_TIME_ZONE }) : null;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <Lbl>{label || t("digitalSignature")}</Lbl>
        {has && <button onClick={clear} style={{ background: "none", border: "none", color: C.red, fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>{t("clearSignature")} ↺</button>}
      </div>
      <div style={{ border: `2px solid ${has ? C.forest : C.creamDark}`, borderRadius: 10, background: "#fff", position: "relative", transition: "border-color 0.2s" }}>
        <canvas ref={canvasRef} width={600} height={150}
          onMouseDown={start} onMouseMove={move} onMouseUp={end} onMouseLeave={end}
          onTouchStart={start} onTouchMove={move} onTouchEnd={end}
          style={{ width: "100%", height: 90, display: "block", borderRadius: 8, touchAction: "none", cursor: "crosshair" }}
        />
        {!has && (
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
            <span style={{ color: "#c8d8c8", fontSize: 13, fontWeight: 600 }}>✍ {t("signHere")}</span>
          </div>
        )}
      </div>
      {has && <div style={{ fontSize: 11, color: C.forest, marginTop: 4, fontWeight: 600 }}>✓ {t("signedAt")} — {ts}</div>}
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
      background: s.bg, color: s.color, padding: "3px 10px", borderRadius: 12,
      fontSize: 10, fontWeight: 700, letterSpacing: 0.3,
      fontFamily: "'DM Mono', monospace", textTransform: "uppercase",
      // Labels like "Transport Collection ke Hub" are far wider than the
      // Stage column; as a bare inline span the pill overflowed and was
      // clipped by the table wrapper. Wrap inside the cell instead.
      display: "inline-block", maxWidth: "100%", whiteSpace: "normal",
      overflowWrap: "anywhere", lineHeight: 1.35, textAlign: "center",
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
        {[...activities]
          .sort((x, y) => (parseDate(y.ts)?.getTime() || 0) - (parseDate(x.ts)?.getTime() || 0))
          .map((a, i) => (
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
const STAGE_KEYS = ["stageCollection", "stageTransport", "stageProcessing", "stageOfftakerTransport", "stageDownstreamProcessing"];
function StageBar({ current, lang = "en", isMobile = false }) {
  const t = useT(lang);
  const circleSize = isMobile ? 22 : 28;
  const n = STAGE_KEYS.length;
  const half = 50 / n;
  const progressPct = Math.min(Math.max((current - 1) / (n - 1), 0), 1) * 100;
  return (
    <div style={{ marginBottom: isMobile ? 8 : 26, width: "100%", boxSizing: "border-box", overflow: "hidden" }}>
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", top: "50%", left: `${half}%`, right: `${half}%`, height: 2, background: C.creamDark, transform: "translateY(-50%)" }} />
        <div style={{ position: "absolute", top: "50%", left: `${half}%`, right: `${half}%`, height: 2, transform: "translateY(-50%)", overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${progressPct}%`, background: C.forest, transition: "width 0.4s" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${n}, 1fr)`, position: "relative" }}>
          {STAGE_KEYS.map((key, i) => {
            const idx = i + 1;
            const done = current > idx, active = current === idx;
            return (
              <div key={key} style={{ display: "flex", justifyContent: "center", minWidth: 0 }}>
                <div style={{
                  width: circleSize, height: circleSize, borderRadius: "50%", flexShrink: 0,
                  background: done ? C.forest : active ? C.orange : C.creamDark,
                  border: `2px solid ${done ? C.forest : active ? C.orange : C.creamDark}`,
                  boxShadow: active ? `0 0 0 3px ${C.orange}33` : "none",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: done || active ? "#fff" : C.muted,
                  fontSize: isMobile ? 10 : 11, fontWeight: 800, lineHeight: 1, boxSizing: "border-box", transition: "all 0.3s",
                }}>{done ? "✓" : idx}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${STAGE_KEYS.length}, 1fr)`, gap: isMobile ? 1 : 4, marginTop: 4, width: "100%" }}>
        {STAGE_KEYS.map((key, i) => {
          const label = t(key);
          const idx = i + 1;
          const done = current > idx, active = current === idx;
          return (
            <span key={key} style={{ fontSize: isMobile ? 7 : 9, fontWeight: 700, letterSpacing: 0.2, textTransform: "uppercase", whiteSpace: "normal", wordBreak: "break-word", overflowWrap: "anywhere", hyphens: "auto", textAlign: "center", lineHeight: 1.2, minWidth: 0, color: done ? C.forest : active ? C.orange : C.muted }}>{label}</span>
          );
        })}
      </div>
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
            <div style={{ fontSize: 10, color: C.muted, letterSpacing: 1, textTransform: "uppercase" }}>Rezycology MRV · Hub Depok-01</div>
            <div style={{ fontSize: 21, fontWeight: 800, color: C.forest, fontFamily: "'DM Sans', sans-serif", marginTop: 2 }}>Plastic Credit Certificate</div>
          </div>
          <div style={{ background: C.forest, color: "#fff", borderRadius: 8, padding: "5px 12px", fontSize: 10, fontWeight: 700, letterSpacing: 0.5, marginTop: 4 }}>VERIFIED</div>
        </div>
        <div style={{ fontSize: 11, color: C.muted, marginBottom: 18 }}>Prototype PCC — binding issuance requires Registry + VVB sign-off.</div>
        <div style={{ background: C.forest, borderRadius: 12, padding: "14px 20px", marginBottom: 18, display: "flex", alignItems: "baseline", gap: 8 }}>
          <span style={{ fontSize: 38, fontWeight: 900, color: "#fff", fontFamily: "'DM Mono', monospace" }}>{record.creditsTonnes?.toFixed(4)}</span>
          <span style={{ fontSize: 15, color: "#a8d4b0" }}>Plastic Credits (MT)</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 28px", marginBottom: 18 }}>
          {[
            ["Batch ID", record.batchId, true],
            ["Credit Serial", record.pprsSerial, true],
            ["Feedstock", record.feedstockType, false],
            [t("weight"), `${Number(record.weightKg).toLocaleString()} kg (${record.creditsTonnes?.toFixed(4)} MT)`, false],
            ["Hub", "Hub Depok-01", false],
            ["Weighing Equip.", record.weighingEquipId, true],
            ["EoW Process", eowLabel(record.eowProcess), false],
            ["Processor", record.processor, false],
            ["EPR Buyer", record.eprBuyer, false],
            ["VVB", record.vvb, false],
            ["VVB Audit Ref.", record.verifierRef, true],
            ["Lapak Name", record.collectorId, false],
            ["Collection Date", fmtDate(record.collectionDate), false],
            ["PCC Issued At", fmtDateTime(record.issuedAt), false],
          ].map(([k, v, mono]) => <InfoRow key={k} label={k} value={v} mono={mono} />)}
        </div>
        <div style={{ background: "#e8f5e9", borderRadius: 8, padding: "10px 14px", marginBottom: 18, fontSize: 11, color: C.forest, lineHeight: 1.6 }}>
          <strong>Credit Serial Syntax:</strong> REZY-[IssueDate]-[ProcType]-[Country]-[VVB]-[Hub]-[Seq]-[Tonnage]
        </div>
        {(record.photoDataUrl || record.handwrittenWeighingIdDataUrl || record.transportPhotoDataUrl || record.processingPhotoDataUrl) && (
          <div style={{ marginBottom: 18 }}>
            <SectionTitle>{t("evidencePhotos")}</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: record.transportPhotoDataUrl || record.processingPhotoDataUrl ? "repeat(2,1fr)" : "1fr", gap: 8 }}>
              {record.photoDataUrl && (
                <div>
                  <div style={{ fontSize: 9, fontWeight: 700, color: C.muted, letterSpacing: 0.4, textTransform: "uppercase", marginBottom: 3 }}>{t("weighingProcessEvidence")}</div>
                  <img src={record.photoDataUrl} alt="collection" style={{ width: "100%", borderRadius: 8, objectFit: "cover", height: 90 }} />
                </div>
              )}
              {record.handwrittenWeighingIdDataUrl && (
                <div>
                  <div style={{ fontSize: 9, fontWeight: 700, color: C.muted, letterSpacing: 0.4, textTransform: "uppercase", marginBottom: 3 }}>Handwritten Weighing Identification</div>
                  <img src={record.handwrittenWeighingIdDataUrl} alt="handwritten weighing identification" style={{ width: "100%", borderRadius: 8, objectFit: "cover", height: 90 }} />
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
            <SectionTitle>{t("digitalSignatures")}</SectionTitle>
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
        <textarea value={reason} onChange={e => setReason(e.target.value)} rows={3} placeholder={t("rejectionPlaceholderShort")} style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${C.creamDark}`, background: C.white, fontSize: 13, color: C.charcoal, outline: "none", resize: "vertical", boxSizing: "border-box", fontFamily: "inherit" }} />
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
    collection: { label: t("roleCollection"), desc: t("roleCollectionDesc") },
    transport: { label: t("roleTransport"), desc: t("roleTransportDesc") },
    processing: { label: t("roleProcessing"), desc: t("roleProcessingDesc") },
    offtaker_transport: { label: t("roleOfftakerTransport"), desc: t("roleOfftakerTransportDesc") },
    downstream_processing: { label: t("roleDownstreamProcessing"), desc: t("roleDownstreamProcessingDesc") },

  };
  const loginRoleKeys = ["admin", "collection", "transport", "processing", "offtaker_transport", "downstream_processing"];

  // Prompt for GPS permission as soon as a role is selected (PIN entry shown),
  // so the browser's location dialog appears early instead of mid-task later.
  useEffect(() => {
    if (selected && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(() => {}, () => {}, { timeout: 8000 });
    }
  }, [selected]);

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
    <div style={{ minHeight: "100vh", background: C.pageBg, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>
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
            <div style={{ fontSize: 18, fontWeight: 800, color: C.forest, fontFamily: "'DM Sans', sans-serif" }}>{t("mrvPlatform")}</div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: C.creamDark, marginBottom: 20 }} />

          <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 12 }}>{t("selectRole")}</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
            {loginRoleKeys.map(key => {
              const role = ROLES[key];
              return (
              <div key={key} onClick={() => { setSelected(key); setPin(""); setError(""); if (navigator.geolocation) navigator.geolocation.getCurrentPosition(() => {}, () => {}, { timeout: 8000 }); }} style={{
                padding: "12px 14px", borderRadius: 10, cursor: "pointer",
                border: `2px solid ${selected === key ? role.color : C.creamDark}`,
                background: selected === key ? `${role.color}10` : C.pageBg,
                transition: "all 0.15s",
              }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: selected === key ? role.color : C.charcoal }}>{ROLE_KEYS[key].label}</div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{ROLE_KEYS[key].desc}</div>
              </div>
            );})}
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

        {/* Verify a batch */}
        <a href={`/verify.html?lang=${lang}`} style={{
          display: "block", marginTop: 16, textDecoration: "none",
          background: C.cardBg, borderRadius: 14, padding: "14px 16px",
          border: `1px solid ${C.creamDark}`,
          boxShadow: "0 1px 4px rgba(29,92,46,0.06)",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.forest }}>🔒 {t("verifyBatchTitle")}</div>
              <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>
                {t("verifyBatchDesc")}
              </div>
            </div>
            <div style={{ fontSize: 18, color: C.forest }}>→</div>
          </div>
        </a>

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: 16, fontSize: 11, color: C.mutedLight }}>
          Rezycology · Sustainability &amp; Waste Solution
        </div>
      </div>
    </div>
  );
}

// ─── Chain of Custody Panel ───────────────────────────────────────────────────
// Great-circle (haversine) distance between two geo points, in kilometers —
// used as a proxy for "gmaps proximity" until a real routing/Scope 3 calc is added.
function haversineDistanceKm(geoA, geoB) {
  if (!geoA || !geoB) return null;
  const lat1 = Number(geoA.lat), lng1 = Number(geoA.lng);
  const lat2 = Number(geoB.lat), lng2 = Number(geoB.lng);
  if (![lat1, lng1, lat2, lng2].every(Number.isFinite)) return null;
  const R = 6371; // Earth radius in km
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// A batch is only through a downstream stage once EVERY processed line has been
// handed on. Shipping one line (LVP) while another (PET) is still at the hub used
// to mark the whole batch complete, which overstated the chain of custody.
function offtakerLinesOf(batch) {
  return (batch.processedMaterials && batch.processedMaterials.length)
    ? batch.processedMaterials.map(m => ({ index: String(m.processedMaterialIndex || 1), feedstockType: m.processedFeedstockType, weightKg: m.acceptedWeightKg, processor: m.processor }))
    : [{ index: "1", feedstockType: batch.processedFeedstockType || batch.feedstockType, weightKg: batch.acceptedWeightKg || batch.weightKg, processor: batch.processor }];
}
function processedLineIndexes(batch) {
  const pm = batch.processedMaterials || [];
  if (pm.length) return pm.map(m => String(m.processedMaterialIndex || 1));
  return batch.processedFeedstockType || batch.acceptedWeightKg ? ["1"] : [];
}
// Which processed lines have already gone to an off-taker.
// Entries written before per-line tracking carry no processedMaterialIndex, so they
// are reconciled against the processed lines by feedstock keyword. Anything still
// unmatched consumes the next free line, which keeps the count of shipped lines
// equal to the count of shipped entries: no double-shipping, and no line stranded
// forever just because the record predates the index.
function shippedLineIndexes(batch) {
  const entries = batch.offtakerMaterials || [];
  if (!entries.length) return [];
  const lines = offtakerLinesOf(batch);
  const shipped = new Set();
  const legacy = [];
  for (const e of entries) {
    if (e.processedMaterialIndex != null && e.processedMaterialIndex !== "") shipped.add(String(e.processedMaterialIndex));
    else legacy.push(e);
  }
  for (const e of legacy) {
    const keyword = OFFTAKER_TO_FEEDSTOCK_KEYWORD[e.feedstockType];
    const byKeyword = keyword
      ? lines.find(l => !shipped.has(String(l.index)) && String(l.feedstockType || "").includes(keyword))
      : null;
    const target = byKeyword || lines.find(l => !shipped.has(String(l.index)));
    if (target) shipped.add(String(target.index));
  }
  return [...shipped];
}
function unshippedLineIndexes(batch) {
  const shipped = shippedLineIndexes(batch);
  return processedLineIndexes(batch).filter(i => !shipped.includes(i));
}
function allLinesHandedOn(batch) {
  return processedLineIndexes(batch).length > 0 && unshippedLineIndexes(batch).length === 0;
}

// End-to-end yield: what survives from the weight collected at the lapak to the
// output of downstream processing.
//
// A downstream run usually processes a mixed load drawn from several hub batches,
// and only its own totals are recorded. So the batch is not credited with the run's
// whole output — the run's recovery ratio (accepted / input) is applied pro rata to
// the weight THIS batch contributed. A run that sources from B, C and D and yields
// 90% credits each of them 90% of what they put in, which is the rule asked for.
function endToEndYield(batch) {
  const mats = (batch.materials && batch.materials.length)
    ? batch.materials
    : [{ index: 1, weightKg: batch.weightKg }];
  const processed = (batch.processedMaterials && batch.processedMaterials.length)
    ? batch.processedMaterials
    : [];

  const dsAccepted = Number(batch.downstreamAcceptedWeightKg) || 0;
  const dsRejected = Number(batch.downstreamRejectedWeightKg) || 0;
  const dsContamination = Number(batch.downstreamContaminationKg) || 0;
  const downstreamRan = dsAccepted > 0 || Boolean(batch.downstreamProcessingEndDate);

  // Only lines that have actually been through the whole chain count towards the
  // yield. Material still sitting at the hub has not been lost, it just has not
  // finished, and folding it into the loss made the figure nonsense: DPK-QNR7HQ
  // read "218 kg (90.5%) lost" when 205 kg of that was untouched PET at the hub.
  const completedIdx = downstreamRan ? shippedLineIndexes(batch) : [];
  const completedSet = new Set(completedIdx.map(String));

  const weightOfCollectionLine = (idx) => {
    const hit = mats.find(m => String(m.index ?? 1) === String(idx));
    return Number(hit?.weightKg) || 0;
  };
  const collectedKg = completedIdx.reduce((s, i) => s + weightOfCollectionLine(i), 0);
  const hubAcceptedKg = processed.length
    ? processed
        .filter(m => completedSet.has(String(m.processedMaterialIndex || 1)))
        .reduce((s, m) => s + (Number(m.acceptedWeightKg) || 0), 0)
    : (completedIdx.length ? Number(batch.acceptedWeightKg) || 0 : 0);
  const shippedKg = (batch.offtakerMaterials || []).reduce((s, m) => s + (Number(m.weightKg) || 0), 0);

  // Weight collected on lines that have not completed the chain yet.
  const pendingKg = mats.reduce((s, m) => completedSet.has(String(m.index ?? 1)) ? s : s + (Number(m.weightKg) || 0), 0);

  // The run's own input: what it reports having handled, falling back to the weight
  // this batch shipped when the run recorded nothing else.
  const dsInputKg = (dsAccepted + dsRejected + dsContamination) || shippedKg;
  const dsRatio = dsInputKg > 0 ? dsAccepted / dsInputKg : 0;
  // This batch's share of the run's output.
  const attributedKg = shippedKg > 0 ? shippedKg * dsRatio : 0;

  const varianceKg = collectedKg - attributedKg;
  const retainedPct = collectedKg > 0 ? (attributedKg / collectedKg) * 100 : 0;
  const variancePct = collectedKg > 0 ? (varianceKg / collectedKg) * 100 : 0;

  return {
    // Nothing to report until at least one line has run the full chain.
    hasDownstream: downstreamRan && completedIdx.length > 0 && collectedKg > 0,
    partial: pendingKg > 0,
    pendingKg,
    collectedKg,
    hubAcceptedKg,
    shippedKg,
    dsInputKg,
    dsRatioPct: dsRatio * 100,
    attributedKg,
    varianceKg,
    variancePct,
    retainedPct,
    // Pro rata only bites when the run handled more than this batch shipped.
    proRata: dsInputKg > 0 && shippedKg > 0 && Math.abs(dsInputKg - shippedKg) > 0.01,
  };
}

function custodyStageRows(batch) {
  const ipMap = parseInputterMap(batch.inputterIp);
  const devMap = parseInputterMap(batch.inputterDevice);
  const acts = (batch.activities || []);
  const findAct = (s) => acts.find(a => String(a.stage || "").toLowerCase().includes(s));
  const findAcceptAfter = (ts) => acts.find(a =>
    String(a.stage || "").toLowerCase().includes("accept") && (!ts || new Date(a.ts) >= new Date(ts)));
  const colAct = findAct("collection");
  const traAct = findAct("transport");
  const proAct = findAct("processing");
  const oftAct = acts.find(a => String(a.stage || "").toLowerCase().includes("offtaker") && String(a.stage || "").toLowerCase().includes("transport"));
  const dspAct = acts.find(a => String(a.stage || "").toLowerCase().includes("downstream") && String(a.stage || "").toLowerCase().includes("processing"));
  const stages = [
    {
      key: "collection", title: "Collection", icon: "⚖️", done: true,
      when: colAct?.ts || batch.collectionDate,
      lines: [
        batch.collectorId && `Lapak: ${maskName(batch.collectorId)}`,
        batch.weighingEquipId && `Scale: ${batch.weighingEquipId}`,
      ].filter(Boolean),
      accepted: findAcceptAfter(colAct?.ts)?.ts,
      geo: colAct?.geo || null,
      evidence: [
        (batch.photoDataUrl || batch.collectionPhotoUrl) && "Photo",
        batch.sigCollection && "Signed",
        batch.calibCertUrl && "Calibration",
        (batch.handwrittenWeighingIdDataUrl || batch.handwrittenWeighingIdUrl) && "Weighing note",
      ].filter(Boolean),
      ip: ipMap.collection, dev: devMap.collection,
    },
    {
      key: "transport", title: "Transport", icon: "🚚",
      done: Boolean(traAct || batch.transportDate || batch.transportRef),
      when: traAct?.ts || batch.transportDate,
      lines: [
        batch.pickupVehicle && `Vehicle: ${maskVehicle(batch.pickupVehicle)}`,
        batch.transportRef && `Manifest: ${batch.transportRef}`,
      ].filter(Boolean),
      geo: traAct?.geo || null,
      evidence: [
        batch.transportPhotoDataUrl && "Photo",
        batch.sigTransport && "Signed",
      ].filter(Boolean),
      ip: ipMap.transport, dev: devMap.transport,
    },
    {
      key: "processing", title: "Processing", icon: "🏭",
      done: Boolean(proAct || batch.processingEndDate || batch.eowProcess),
      when: proAct?.ts || batch.processingEndDate,
      lines: [
        batch.processor && `Processor: ${batch.processor}`,
        batch.eowProcess && eowLabel(batch.eowProcess),
      ].filter(Boolean),
      accepted: findAcceptAfter(proAct?.ts)?.ts,
      geo: proAct?.geo || null,
      evidence: [
        batch.processingPhotoDataUrl && "Photo",
        batch.sigProcessing && "Signed",
      ].filter(Boolean),
      ip: ipMap.processing, dev: devMap.processing,
    },
    {
      key: "offtaker_transport", title: "Offtaker Transport", icon: "🚛",
      // Not done while processed lines are still waiting at the hub.
      done: Boolean(oftAct || batch.offtakerTransportDate || batch.offtakerTransportRef) && allLinesHandedOn(batch),
      pendingLines: unshippedLineIndexes(batch),
      when: oftAct?.ts || batch.offtakerTransportDate,
      lines: [
        batch.offtakerTransportRef && `Manifest: ${batch.offtakerTransportRef}`,
      ].filter(Boolean),
      geo: oftAct?.geo || null,
      evidence: [
        batch.offtakerTransportPhotoDataUrl && "Photo",
        batch.sigOfftakerTransport && "Signed",
      ].filter(Boolean),
      ip: ipMap.offtaker_transport, dev: devMap.offtaker_transport,
    },
    {
      key: "downstream_processing", title: "Downstream Processing", icon: "♻️",
      // End-of-Waste is only reached for the batch when nothing is left behind.
      done: Boolean(dspAct || batch.downstreamProcessingEndDate || batch.downstreamEowProcess) && allLinesHandedOn(batch),
      pendingLines: unshippedLineIndexes(batch),
      when: dspAct?.ts || batch.downstreamProcessingEndDate,
      lines: [
        batch.downstreamEowProcess && eowLabel(batch.downstreamEowProcess),
      ].filter(Boolean),
      geo: dspAct?.geo || null,
      evidence: [
        batch.downstreamProcessingPhotoDataUrl && "Photo",
        batch.sigDownstreamProcessing && "Signed",
      ].filter(Boolean),
      ip: ipMap.downstream_processing, dev: devMap.downstream_processing,
    },
  ];

  // Estimate distance from the previous stage with known coordinates — a
  // proxy for Scope 3 transport-distance calculations to be built later.
  let lastGeo = null;
  return stages.map(s => {
    const distanceFromPrevKm = (s.done && s.geo) ? haversineDistanceKm(lastGeo, s.geo) : null;
    if (s.geo) lastGeo = s.geo;
    return { ...s, distanceFromPrevKm };
  });
}

function custodyDuration(stages) {
  const first = stages[0]?.when;
  const last = [...stages].reverse().find(s => s.done && s.when)?.when;
  if (!first || !last || first === last) return null;
  const ms = new Date(last) - new Date(first);
  if (!(ms > 0)) return null;
  const h = Math.floor(ms / 3600000);
  const m = Math.round((ms % 3600000) / 60000);
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

function ChainOfCustodyPanel({ batches, lang }) {
  const t = useT(lang);
  const eligible = batches.filter(b => (b.reviewStatus || "pending") !== "pending");
  const sorted = [...eligible].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
  const [selectedId, setSelectedId] = useState(sorted[0]?.batchId || "");
  const [custodySearch, setCustodySearch] = useState("");
  const custodyQuery = custodySearch.trim().toLowerCase();
  const filteredSorted = custodyQuery
    ? sorted.filter(b => [b.batchId, b.collectorId, b.loggedBy, fmtDateTime(b.collectionDate)].filter(Boolean).join(" ").toLowerCase().includes(custodyQuery))
    : sorted;
  const batch = sorted.find(b => b.batchId === selectedId) || filteredSorted[0] || sorted[0];

  useEffect(() => {
    if (filteredSorted.length && !filteredSorted.some(b => b.batchId === selectedId)) {
      setSelectedId(filteredSorted[0].batchId);
    }
  }, [custodyQuery]);

  if (!batch) {
    return (
      <div>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: C.forest, fontFamily: "'DM Sans', sans-serif", margin: "0 0 4px" }}>{t("chainOfCustody")}</h1>
        <p style={{ color: C.muted, fontSize: 13 }}>No accepted batches yet. Batches appear here once they clear admin review.</p>
      </div>
    );
  }

  const stages = custodyStageRows(batch);
  const mats = (batch.materials && batch.materials.length)
    ? batch.materials
    : [{ index: 1, feedstockType: batch.feedstockType, weightKg: batch.weightKg }];
  const totalKg = mats.reduce((s, m) => s + (Number(m.weightKg) || 0), 0);
  const devices = new Set(stages.filter(s => s.dev).map(s => s.dev));
  const allDone = stages.every(s => s.done);
  const duration = custodyDuration(stages);
  const totalDistanceKm = stages.reduce((s, st) => s + (Number.isFinite(st.distanceFromPrevKm) ? st.distanceFromPrevKm : 0), 0);
  const e2e = endToEndYield(batch);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
        <div style={{ flex: 1, minWidth: 200 }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: C.forest, fontFamily: "'DM Sans', sans-serif", margin: "0 0 4px" }}>{t("chainOfCustody")}</h1>
          <p style={{ color: C.muted, fontSize: 13, margin: 0 }}>{t("custodySubtitle")}</p>
        </div>
        <div style={{ minWidth: 220 }}>
          <Inp label={t("searchLabel")} value={custodySearch} onChange={setCustodySearch} placeholder="Search by date, name, or batch ID…" />
        </div>
        <div style={{ minWidth: 220 }}>
          <Sel label={t("batchLabelShort")} value={batch.batchId} onChange={setSelectedId}
            options={filteredSorted.map(b => ({
              value: b.batchId,
              label: `${b.batchId} · ${maskName(b.collectorId || b.loggedBy) || "—"} · ${fmtDateTime(b.collectionDate).split(" at")[0]}`,
            }))} />
        </div>
      </div>

      <Card style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ background: C.forest, padding: "16px 20px", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 10, letterSpacing: 2, color: C.cream, textTransform: "uppercase" }}>Rezycology · chain of custody</div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 17, color: C.white, letterSpacing: 1 }}>{batch.batchId}</div>
          </div>
          <div style={{ marginLeft: "auto", textAlign: "right" }}>
            {allDone ? (
              <span style={{ fontSize: 11, padding: "4px 12px", borderRadius: 999, background: C.cream, color: C.forestDark, fontWeight: 700 }}>✓ End-of-waste verified</span>
            ) : (
              <span style={{ fontSize: 11, padding: "4px 12px", borderRadius: 999, background: C.orangeLight, color: C.white, fontWeight: 700 }}>{t("inProgress")}</span>
            )}
            <div style={{ fontSize: 11, color: C.creamMid, marginTop: 4 }}>{batch.hub || "Hub Depok-01"} · {fmtDateTime(batch.collectionDate).split(" at")[0]}</div>
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", borderBottom: `1px solid ${C.creamMid}`, background: C.white }}>
          {[
            ["Total weight", `${totalKg.toLocaleString()} kg`],
            ["Materials", `${mats.length} line${mats.length > 1 ? "s" : ""}`],
            ["Collection → EoW", duration || "—"],
            ["Custody devices", `${devices.size} distinct`],
            ["Est. transport distance", fmtDistanceRange(totalDistanceKm)],
            [t("endToEndYield"), e2e.hasDownstream ? `${e2e.retainedPct.toFixed(1)}%` : "—"],
          ].map(([label, value]) => (
            <div key={label} style={{ flex: "1 1 120px", padding: "12px 18px", borderRight: `1px solid ${C.cream}` }}>
              <div style={{ fontSize: 9.5, letterSpacing: 1.2, color: C.mutedLight, textTransform: "uppercase", fontWeight: 700 }}>{label}</div>
              <div style={{ fontSize: 18, color: C.charcoal, fontWeight: 700 }}>{value}</div>
            </div>
          ))}
        </div>

        {e2e.hasDownstream && (
          <div style={{ padding: "12px 18px", borderBottom: `1px solid ${C.creamMid}`, background: C.creamMid, fontSize: 12, color: C.charcoal, lineHeight: 1.6 }}>
            <div style={{ fontWeight: 800, color: C.forest, marginBottom: 4 }}>
              {t("endToEndYield")}{e2e.partial ? ` · ${t("completedLinesOnly")}` : ""}: {e2e.varianceKg.toLocaleString(undefined, { maximumFractionDigits: 1 })} kg ({e2e.variancePct.toFixed(1)}%) {t("lostLabel")}
            </div>
            <div style={{ color: C.muted }}>
              {e2e.collectedKg.toLocaleString()} kg {t("collectedLabelShort")} → {e2e.hubAcceptedKg.toLocaleString()} kg {t("hubAcceptedLabelShort")} → {e2e.shippedKg.toLocaleString()} kg {t("shippedLabelShort")} → {e2e.attributedKg.toLocaleString(undefined, { maximumFractionDigits: 1 })} kg {t("downstreamOutputLabelShort")}
            </div>
            {e2e.proRata && (
              <div style={{ color: C.muted, marginTop: 2 }}>
                {t("proRataNote")}: {e2e.dsRatioPct.toFixed(1)}% × {e2e.shippedKg.toLocaleString()} kg ({e2e.dsInputKg.toLocaleString()} kg {t("downstreamRunInput")})
              </div>
            )}
            {e2e.partial && (
              <div style={{ color: "#7a5800", marginTop: 4, fontWeight: 600 }}>
                {t("stillInProgressKg")}: {e2e.pendingKg.toLocaleString()} kg — {t("notCountedAsLoss")}
              </div>
            )}
          </div>
        )}

        <div style={{ padding: "14px 18px 4px", display: "flex", flexWrap: "wrap", gap: 8 }}>
          {mats.map((m, i) => (
            <div key={i} style={{ flex: "1 1 160px", background: C.white, border: `1px solid ${C.creamMid}`, borderRadius: 8, padding: "8px 12px", display: "flex", justifyContent: "space-between", gap: 8 }}>
              <span style={{ fontSize: 12.5, color: C.charcoal }}>{m.feedstockType}</span>
              <span style={{ fontSize: 12.5, color: C.forest, fontWeight: 700, whiteSpace: "nowrap" }}>{Number(m.weightKg).toLocaleString()} kg</span>
            </div>
          ))}
        </div>

        <div style={{ padding: "12px 18px 6px", position: "relative" }}>
          <div style={{ position: "absolute", left: 36, top: 28, bottom: 28, width: 2, background: C.creamDark }} />
          {stages.map(s => (
            <div key={s.key} style={{ position: "relative", display: "flex", gap: 14, padding: "8px 0" }}>
              <div style={{
                width: 38, height: 38, borderRadius: "50%", flexShrink: 0, zIndex: 1,
                background: s.done ? (s.key === "processing" ? C.orange : C.forest) : C.creamMid,
                border: `3px solid ${C.cardBg}`,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
                filter: s.done ? "none" : "grayscale(1)", opacity: s.done ? 1 : 0.7,
              }}>{s.icon}</div>
              <div style={{
                flex: 1, background: C.white, borderRadius: 10, padding: "11px 15px",
                border: s.done ? `1px solid ${C.creamDark}` : `1px dashed ${C.creamDark}`,
                opacity: s.done ? 1 : 0.75,
              }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 9, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: C.charcoal }}>{s.title}</span>
                  <span style={{ fontSize: 11.5, color: C.mutedLight }}>{s.done ? fmtDateTime(s.when) : "Pending"}</span>
                  {s.done && s.accepted && (
                    <span style={{ marginLeft: "auto", fontSize: 10, padding: "2px 9px", borderRadius: 999, background: C.cream, color: C.forestDark, fontWeight: 700 }}>✓ accepted {fmtDateTime(s.accepted).split("at ")[1] || ""}</span>
                  )}
                </div>
                {s.lines.map((line, i) => (
                  <div key={i} style={{ fontSize: 12, color: C.muted, marginTop: i === 0 ? 6 : 2, lineHeight: 1.5 }}>{line}</div>
                ))}
                {(s.pendingLines || []).length > 0 && (
                  <div style={{ fontSize: 11.5, color: "#7a5800", background: "#fff8e1", border: `1px solid #f0d58a`, borderRadius: 8, padding: "6px 10px", marginTop: 7, fontWeight: 600 }}>
                    {t("stageStalledLines")}: M{(s.pendingLines || []).join(", M")}
                  </div>
                )}
                {(s.evidence.length > 0 || s.geo) && (
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 7 }}>
                    {s.evidence.map(ev => (
                      <span key={ev} style={{ fontSize: 10.5, padding: "2px 8px", borderRadius: 999, border: `1px solid ${C.creamDark}`, color: C.muted }}>{ev}</span>
                    ))}
                    {s.geo && (
                      <a href={gpsLink(s.geo)} target="_blank" rel="noreferrer" style={{ fontSize: 10.5, padding: "2px 8px", borderRadius: 999, border: `1px solid ${C.creamDark}`, color: C.forest, textDecoration: "none" }}>
                        📍 {Number(s.geo.lat).toFixed(4)}, {Number(s.geo.lng).toFixed(4)}
                      </a>
                    )}
                    {s.done && Number.isFinite(s.distanceFromPrevKm) && (
                      <span style={{ fontSize: 10.5, padding: "2px 8px", borderRadius: 999, border: `1px solid ${C.creamDark}`, color: C.muted }}>
                        ↦ {fmtDistanceRange(s.distanceFromPrevKm)} from previous stage
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 6, padding: "11px 18px", background: C.cream, display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", justifyContent: "flex-end" }}>
          <span style={{ fontSize: 10.5, color: C.muted, fontFamily: "'DM Mono', monospace" }}>mrv.rezycology.com</span>
        </div>
      </Card>
    </div>
  );
}

// ─── Analytics Panel ──────────────────────────────────────────────────────────
function AnalyticsPanel({ batches, isMobile = false, lang = "en" }) {
  const t = useT(lang);
  const safeArr = Array.isArray(batches) ? batches : [];
  const [analyticsFrom, setAnalyticsFrom] = useState("");
  const [analyticsTo, setAnalyticsTo] = useState("");
  const [activeFeedstock, setActiveFeedstock] = useState(null);
  const fromDate = analyticsFrom ? parseDate(analyticsFrom) : null;
  const toDate = analyticsTo ? parseDate(analyticsTo) : null;
  const analyticsRows = safeArr.filter(b => {
    const d = parseDate(firstValidDate(b.createdAt, b.collectionDate, b.issuedAt));
    if (!d) return true;
    return (!fromDate || d >= fromDate)
      && (!toDate || d <= new Date(toDate.getFullYear(), toDate.getMonth(), toDate.getDate(), 23, 59, 59));
  });

  const countByStatus = (st) => st === "rejected"
    ? analyticsRows.filter(b => b.reviewStatus === "rejected").length
    : analyticsRows.filter(b => b.status === st).length;
  const totalKg       = analyticsRows.reduce((sum, b) => sum + (Number(b.weightKg) || 0), 0);
  const rejectedCount = countByStatus("rejected");

  // ── Feedstock breakdown ───────────────────────────────────────────────────
  const feedstockMap = {};
  analyticsRows.forEach(b => {
    const materials = Array.isArray(b.materials) && b.materials.length ? b.materials : [{ feedstockType: b.feedstockType, weightKg: b.weightKg }];
    materials.forEach(m => {
      const key = m.feedstockType || "Unknown";
      feedstockMap[key] = (feedstockMap[key] || 0) + (Number(m.weightKg) || 0);
    });
  });
  const feedstockRows = Object.entries(feedstockMap).sort((a, b) => b[1] - a[1]);
  const feedMax = feedstockRows.length > 0 ? feedstockRows[0][1] : 1;
  const pieColors = [C.forest, C.orange, C.blue, "#92600a", "#6b7280", "#0f766e", "#b45309", "#7c3aed"];
  const feedTotal = feedstockRows.reduce((sum, [, kg]) => sum + kg, 0) || 1;
  let pieCursor = 0;
  const pieSlices = feedstockRows.map(([type, kg], idx) => {
    const start = pieCursor;
    const angle = (kg / feedTotal) * 360;
    pieCursor += angle;
    return { type, kg, start, angle, color: pieColors[idx % pieColors.length] };
  });
  function piePoint(cx, cy, r, angle) {
    const rad = (angle - 90) * Math.PI / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  }
  function piePath(slice) {
    if (slice.angle >= 359.99) {
      return "M 120 20 A 100 100 0 1 1 119.99 20 Z";
    }
    const start = piePoint(120, 120, 100, slice.start);
    const end = piePoint(120, 120, 100, slice.start + slice.angle);
    const large = slice.angle > 180 ? 1 : 0;
    return `M 120 120 L ${start.x} ${start.y} A 100 100 0 ${large} 1 ${end.x} ${end.y} Z`;
  }

  // ── Pipeline stages ───────────────────────────────────────────────────────
  const PIPELINE = [
    { label: "Collection", status: "collection", color: "#e07020", icon: "📦" },
    { label: "Transport",  status: "transport",  color: C.blue,    icon: "🚛" },
    { label: "Processing", status: "processing", color: "#92600a", icon: "⚙️" },
    { label: "Rejected",   status: "rejected",   color: C.red,     icon: "❌" },
  ];
  const pipelineMax = Math.max(...PIPELINE.map(p => countByStatus(p.status)), 1);

  // ── Collection trend (last 6 calendar weeks, chronological) ───────────────
  const weeklyKg = {};
  analyticsRows.forEach(b => {
    const d = parseDate(firstValidDate(b.createdAt, b.collectionDate, b.issuedAt));
    if (!d) return;
    const weekStart = new Date(d.getFullYear(), d.getMonth(), d.getDate() - d.getDay());
    const key = weekStart.getTime();
    weeklyKg[key] = (weeklyKg[key] || 0) + (Number(b.weightKg) || 0);
  });
  const weeklyRows = Object.entries(weeklyKg)
    .sort((a, b) => Number(a[0]) - Number(b[0]))
    .slice(-6)
    .map(([key, kg]) => [`${new Date(Number(key)).toLocaleString("en", { month: "short" })} ${new Date(Number(key)).getDate()}`, kg]);
  const weekMax = weeklyRows.length > 0 ? Math.max(...weeklyRows.map(([,v]) => v)) : 1;

  if (safeArr.length === 0) {
    return (
      <div>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: C.forest, fontFamily: "'DM Sans', sans-serif", margin: "0 0 4px" }}>{t("analyticsTitle")}</h1>
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
      <h1 style={{ fontSize: 24, fontWeight: 800, color: C.forest, fontFamily: "'DM Sans', sans-serif", margin: "0 0 4px" }}>{t("analyticsTitle")}</h1>
      <p style={{ color: C.muted, fontSize: 13, margin: "0 0 20px" }}>Hub Depok-01 · {analyticsRows.length} of {safeArr.length} batches</p>

      <Card style={{ marginBottom: 16 }}>
        <SectionTitle>Analytics Filters</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr auto", gap: 12, alignItems: "end" }}>
          <Inp label={t("fromDate")} type="date" value={analyticsFrom} onChange={setAnalyticsFrom} />
          <Inp label={t("toDate")} type="date" value={analyticsTo} onChange={setAnalyticsTo} />
          <div style={isMobile ? { gridColumn: "1 / -1" } : undefined}>
            <Btn small onClick={() => { setAnalyticsFrom(""); setAnalyticsTo(""); }} variant="ghost">Reset</Btn>
          </div>
        </div>
      </Card>

      {/* ── KPI cards ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12, marginBottom: 20 }}>
        {[
          { label: "Total Plastic Logged",  val: `${totalKg.toLocaleString()} kg`,   sub: `${(totalKg / 1000).toFixed(3)} MT`,   accent: false },
          { label: "Total Batches",          val: String(analyticsRows.length),        sub: `${rejectedCount} rejected`,            accent: false },
          { label: "Collection Inputs",      val: String(countByStatus("collection")), sub: "operator submitted",                  accent: false },
          { label: "Transport + Processing", val: String(countByStatus("transport") + countByStatus("processing")), sub: "operator submitted", accent: false },
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
          <SectionTitle>Feedstock Mix — Interactive Pie</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "240px 1fr", gap: 18, alignItems: "center" }}>
            <svg viewBox="0 0 240 240" width="220" height="220" style={{ maxWidth: "100%", justifySelf: "center" }}>
              {pieSlices.map(slice => (
                <path
                  key={slice.type}
                  d={piePath(slice)}
                  fill={slice.color}
                  stroke={C.cardBg}
                  strokeWidth="2"
                  onMouseEnter={() => setActiveFeedstock(slice.type)}
                  onClick={() => setActiveFeedstock(slice.type)}
                  style={{ cursor: "pointer", opacity: !activeFeedstock || activeFeedstock === slice.type ? 1 : 0.45, transition: "opacity 0.15s" }}
                />
              ))}
              <circle cx="120" cy="120" r="52" fill={C.cardBg} />
              <text x="120" y="116" textAnchor="middle" style={{ fontSize: 18, fontWeight: 800, fill: C.forest, fontFamily: "DM Mono" }}>{Math.round(feedTotal).toLocaleString()}</text>
              <text x="120" y="134" textAnchor="middle" style={{ fontSize: 10, fontWeight: 700, fill: C.muted }}>kg</text>
            </svg>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {pieSlices.map(slice => (
                <div key={slice.type} onMouseEnter={() => setActiveFeedstock(slice.type)} onClick={() => setActiveFeedstock(slice.type)} style={{ display: "grid", gridTemplateColumns: isMobile ? "14px 1fr" : "14px 1fr auto", gap: 8, alignItems: "center", cursor: "pointer", opacity: !activeFeedstock || activeFeedstock === slice.type ? 1 : 0.55 }}>
                  <span style={{ width: 12, height: 12, borderRadius: "50%", background: slice.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 12, fontWeight: 700, color: C.charcoal, minWidth: 0, overflowWrap: "anywhere", gridColumn: isMobile ? "2 / 3" : "auto" }}>{slice.type}</span>
                  <span style={{ fontSize: 11, fontWeight: 800, color: C.forest, fontFamily: "'DM Mono', monospace", whiteSpace: "nowrap", gridColumn: isMobile ? "2 / 3" : "auto" }}>{slice.kg.toLocaleString()} kg · {((slice.kg / feedTotal) * 100).toFixed(1)}%</span>
                </div>
              ))}
            </div>
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
  // Persisted so the choice survives a reload and carries into /verify.html.
  const [lang, setLangState] = useState(() => {
    try { return localStorage.getItem(LANG_KEY) || "en"; } catch { return "en"; }
  });
  const setLang = (v) => {
    setLangState(v);
    try { localStorage.setItem(LANG_KEY, v); } catch {}
  };
  const t = useT(lang);
  const [tab, setTab] = useState("dashboard");
  const [batches, setBatches] = useState([]);
  // Always-current mirror of `batches`. setBatches' updater form runs on the next
  // render, so handlers that need the post-update batch (to sync it) cannot read it
  // back synchronously. mutateBatches keeps this ref in step immediately.
  const batchesRef = useRef(batches);
  useEffect(() => { batchesRef.current = batches; }, [batches]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [geoLoading, setGeoLoading] = useState(false);
  const [ocrLoading, setOcrLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [certView, setCertView] = useState(null);
  const [rejectTarget, setRejectTarget] = useState(null);
  const [detailView, setDetailView] = useState(null);

  // New batch form state
  const [stage, setStage] = useState(1);
  const [entryMode, setEntryMode] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const [col, setCol] = useState({ feedstockType: FEEDSTOCK_TYPES[0], weightKg: "", materials: [{ feedstockType: FEEDSTOCK_TYPES[0], weightKg: "" }], collectorId: "", weighingEquipId: SCALES[0], collectionDate: null, notes: "", photoDataUrl: null, lapakBillPhotoDataUrl: null, handwrittenWeighingIdDataUrl: null, handwrittenInput: "", handwrittenWeighing: null, digitizedScaleKg: "", calibCertUrl: null });
  const [directMeta, setDirectMeta] = useState({ batchId: "", manifestRef: "", feedstockType: FEEDSTOCK_TYPES[0], weightKg: "", collectorId: "", notes: "" });
  const [colGeo, setColGeo] = useState({ lat: "", lng: "" });
  const [trn, setTrn] = useState({ transportRef: "", transportDate: null, photoDataUrl: null, pickupVehicle: PICKUP_VEHICLES[0] });
  const [trnGeo, setTrnGeo] = useState({ lat: "", lng: "" });
  const [prc, setPrc] = useState({ processor: PROCESSING_FACILITIES[0], processorOther: "", eowProcess: EOW_PROCESSES[0], processingEndDate: null, photoDataUrl: null, processedMaterialIndex: "", acceptedWeightKg: "", rejectedWeightKg: "", contaminationKg: "", contaminationNote: "", contaminationPhotoDataUrl: null });
  const [prcGeo, setPrcGeo] = useState({ lat: "", lng: "" });
  const [oft, setOft] = useState({ selectedLines: [], materials: [{ feedstockType: OFFTAKER_FEEDSTOCK_TYPES[0], weightKg: "", processor: "" }], transportRef: "", transportDate: null, plateNo: OFFTAKER_PLATE_NUMBERS[0], photoDataUrl: null });
  const [oftGeo, setOftGeo] = useState({ lat: "", lng: "" });
  const [offtakerPage, setOfftakerPage] = useState(0);
  const [dsp, setDsp] = useState({ facility: "", facilityOther: "", eowProcess: EOW_PROCESSES[0], processingEndDate: null, photoDataUrl: null, qcReportPhotoDataUrl: null, processedMaterialIndex: "", rejectedWeightKg: "", contaminationKg: "", contaminationNote: "", contaminationPhotoDataUrl: null });
  const [dspGeo, setDspGeo] = useState({ lat: "", lng: "" });
  // Signatures per stage
  const [sigCol,   setSigCol]   = useState(null); // Collection
  const [sigTrn,   setSigTrn]   = useState(null); // Transport
  const [sigPrc,   setSigPrc]   = useState(null); // Processing
  const [sigOft,   setSigOft]   = useState(null); // Offtaker Transport
  const [sigDsp,   setSigDsp]   = useState(null); // Downstream Processing
  const [sigVrf,   setSigVrf]   = useState(null); // Verification
  const [sigCred,  setSigCred]  = useState(null); // Credit Issuance
  const [vrf, setVrf] = useState({ vvb: VVB_BODIES[0], eprBuyer: EPR_BUYERS[0], verifierRef: "" });

  // Settings
  const [settings, setSettings] = useState({ buyerName: "EPR Sponsor", hubName: "Hub Depok-01" });
  const [sheetsUrl, setSheetsUrl] = useState(DEFAULT_SHEETS_URL);
  const [syncStatus, setSyncStatus] = useState(null); // null | "syncing" | "ok" | "fail"
  const lastSheetRefreshRef = useRef(0);
  const [reviewViewMode, setReviewViewMode] = useState("list");
  const [recordQuery, setRecordQuery] = useState("");
  const [recordDateFrom, setRecordDateFrom] = useState("");
  const [recordDateTo, setRecordDateTo] = useState("");
  const [recordWeightMin, setRecordWeightMin] = useState("");
  const [recordWeightMax, setRecordWeightMax] = useState("");
  const [recordPage, setRecordPage] = useState(1);
  const [reviewQuery, setReviewQuery] = useState("");
  const [reviewStageFilter, setReviewStageFilter] = useState("all");
  const [reviewPage, setReviewPage] = useState(1);
  const [clockNow, setClockNow] = useState(nowISO());
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" ? window.innerWidth <= 680 : false);
  // The seven-column review table needs ~880px plus the page gutters. Below
  // that it can only be shown by clipping or side-scrolling it, so the card
  // view is used instead. Wider than isMobile on purpose: at 700-900px the
  // table was still being cut off at the container's edge.
  const REVIEW_TABLE_MIN_VIEWPORT = 920;
  const [isNarrow, setIsNarrow] = useState(() => typeof window !== "undefined" ? window.innerWidth < REVIEW_TABLE_MIN_VIEWPORT : false);
  const [isAdminReviewDevice, setIsAdminReviewDevice] = useState(() => {
    try { return localStorage.getItem(ADMIN_REVIEW_DEVICE_KEY) === "true"; } catch { return false; }
  });
  const setAdminReviewDevice = (val) => {
    setIsAdminReviewDevice(val);
    try { localStorage.setItem(ADMIN_REVIEW_DEVICE_KEY, val ? "true" : "false"); } catch {}
  };
  const [isSettingsDevice, setIsSettingsDevice] = useState(() => {
    try { return localStorage.getItem(SETTINGS_DEVICE_KEY) === "true"; } catch { return false; }
  });
  const setSettingsDevice = (val) => {
    setIsSettingsDevice(val);
    try { localStorage.setItem(SETTINGS_DEVICE_KEY, val ? "true" : "false"); } catch {}
  };
  const logoTapRef = useRef({ count: 0, timer: null });
  const handleLogoTap = () => {
    const ref = logoTapRef.current;
    ref.count += 1;
    if (ref.timer) clearTimeout(ref.timer);
    ref.timer = setTimeout(() => { ref.count = 0; }, 2000);
    if (ref.count >= 5) {
      ref.count = 0;
      clearTimeout(ref.timer);
      const pin = window.prompt("Device unlock PIN:");
      if (pin === DEVICE_UNLOCK_PIN) {
        setAdminReviewDevice(true);
        setSettingsDevice(true);
        showToast("Admin Review and Settings unlocked on this device.", "ok");
      } else if (pin !== null) {
        showToast("Incorrect PIN.", "err");
      }
    }
  };

  // Re-request GPS permission whenever the data-entry form is open, so that if
  // location was turned off after login (mid-session), the browser re-prompts
  // before the user reaches submit instead of silently failing later.
  useEffect(() => {
    if (tab === "log" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(() => {}, () => {}, { timeout: 8000 });
    }
  }, [tab, stage]);

  const roleObj = role ? ROLES[role] : null;
  const canAccess = (t) => {
    if (!roleObj?.access.includes(t)) return false;
    if (t === "verify") return isAdminReviewDevice;
    if (t === "settings") return isSettingsDevice;
    return true;
  };
  const active = batches.find(b => b.id === activeId);
  // Batches that have cleared admin review (accepted) — pending-review batches are hidden
  // from recent batches, records, dropdowns, and stats until an admin decides.
  const visibleBatches = batches.filter(b => (b.reviewStatus || "pending") !== "pending");
  // Batches collected (D-day or D-1) and not yet picked up by a transport manifest
  const pickupBatches = visibleBatches.filter(b => b.status === "collection" && isWithinPickupWindow(b.collectionDate, clockNow));
  // Helpers for partial (per-material-line) processing
  const allMaterialIndexesOf = (b) => (b.materials?.length ? b.materials.map(m => String(m.index || 1)) : ["1"]);
  const processedIndexesOf = (b) => (b.processedMaterials || []).map(m => String(m.processedMaterialIndex));
  const hasUnprocessedMaterial = (b) => allMaterialIndexesOf(b).some(idx => !processedIndexesOf(b).includes(idx));
  // Batches already picked up by transport, awaiting processing at the facility (incl. partially processed batches with remaining material lines)
  const processBatches = visibleBatches.filter(b => (b.status === "transport" || b.status === "processing") && hasUnprocessedMaterial(b));
  // Same helpers the Chain of Custody view uses, so the picker and the custody
  // trail can never disagree about which lines are still at the hub.
  const offtakerBatchLines = offtakerLinesOf;
  const unshippedLinesOf = (b) => {
    const outstanding = unshippedLineIndexes(b);
    return offtakerLinesOf(b).filter(l => outstanding.includes(String(l.index)));
  };
  const hasUnshippedLine = (b) => unshippedLinesOf(b).length > 0;
  // Batches with at least one processed line still awaiting off-taker transport.
  // Partially shipped batches stay listed: shipping the LVP line must not strand
  // the PET line, which is what happened to DPK-QNR7HQ.
  const offtakerBatches = visibleBatches.filter(b =>
    (b.processedMaterials || []).length > 0 &&
    ["processing", "offtaker_transport", "downstream_processing"].includes(b.status) &&
    hasUnshippedLine(b));
  // Filter eligible batches to those with a material line matching the selected off-taker feedstock type's keyword
  // and/or the selected processing facility
  const offtakerSelectedKeywords = [...new Set((oft.materials || []).map(m => OFFTAKER_TO_FEEDSTOCK_KEYWORD[m.feedstockType]).filter(Boolean))];
  const offtakerSelectedFacilities = [...new Set((oft.materials || []).map(m => m.processor).filter(Boolean))];
  const offtakerLineMatchesFilter = (l) => {
    const kwOk = !offtakerSelectedKeywords.length || offtakerSelectedKeywords.some(k => (l.feedstockType || "").includes(k));
    const facOk = !offtakerSelectedFacilities.length || offtakerSelectedFacilities.includes(l.processor);
    return kwOk && facOk;
  };
  // One selectable option per unshipped processed line, not per batch. A batch that
  // processed PET and LVP separately now offers two options, and shipping one leaves
  // the other on the list.
  const offtakerLinesAll = offtakerBatches.flatMap(b =>
    unshippedLinesOf(b).map(line => ({ b, line, key: `${b.id}::${line.index}` })));
  const offtakerLinesFiltered = (offtakerSelectedKeywords.length || offtakerSelectedFacilities.length)
    ? offtakerLinesAll.filter(({ line }) => offtakerLineMatchesFilter(line))
    : offtakerLinesAll;
  const OFFTAKER_BATCHES_PER_PAGE = 10;
  const offtakerPageCount = Math.max(1, Math.ceil(offtakerLinesFiltered.length / OFFTAKER_BATCHES_PER_PAGE));
  const offtakerLinesPaged = offtakerLinesFiltered.slice(offtakerPage * OFFTAKER_BATCHES_PER_PAGE, (offtakerPage + 1) * OFFTAKER_BATCHES_PER_PAGE);
  const offtakerSelectedLines = (oft.selectedLines || [])
    .map(sel => {
      const b = batches.find(x => x.id === sel.batchRef);
      return b ? { b, line: sel, key: `${sel.batchRef}::${sel.index}` } : null;
    })
    .filter(Boolean);
  useEffect(() => {
    if (offtakerPage > offtakerPageCount - 1) setOfftakerPage(0);
  }, [offtakerPageCount, offtakerPage]);
  // Batches delivered to off-takers, awaiting downstream processing
  // Any batch with material already delivered to an off-taker and no downstream
  // record yet. Partially shipped batches stay at status "processing", so filtering
  // on status alone would have hidden their delivered line from this stage.
  const downstreamBatches = visibleBatches.filter(b =>
    (b.offtakerMaterials || []).length > 0 &&
    !b.downstreamProcessingEndDate &&
    ["processing", "offtaker_transport"].includes(b.status));
  const entryOptions = [
    { mode: "collection", title: t("stageCollection"), desc: t("entryDescCollection"), color: C.orange, icon: "🗑️" },
    { mode: "transport", title: t("stageTransport"), desc: t("entryDescTransport"), color: C.blue, icon: "🚚" },
    { mode: "processing", title: t("stageProcessing"), desc: t("entryDescProcessing"), color: "#92600a", icon: "⚙️" },
    { mode: "offtaker_transport", title: t("stageOfftakerTransport"), desc: t("entryDescOfftakerTransport"), color: C.blue, icon: "🚛" },
    { mode: "downstream_processing", title: t("stageDownstreamProcessing"), desc: t("entryDescDownstream"), color: "#92600a", icon: "🏭" },
  ].filter(opt => !roleObj?.allowedEntryModes || roleObj.allowedEntryModes.includes(opt.mode));

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

  useEffect(() => {
    const timer = setInterval(() => setClockNow(nowISO()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth <= 680);
      setIsNarrow(window.innerWidth < REVIEW_TABLE_MIN_VIEWPORT);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // ── Load on mount ──────────────────────────────────────────────────────────
  useEffect(() => {
    (async () => {
      const [localBatches, s] = await Promise.all([loadBatches(), loadSettings()]);
      let url = "";
	      if (s && Object.keys(s).length) {
	        setSettings(s);
	        if (s.sheetsUrl) {
	          setSheetsUrl(s.sheetsUrl);
	          if (isValidSheetsUrl(s.sheetsUrl)) url = s.sheetsUrl;
	        }
	      }
      if (!url) {
        url = DEFAULT_SHEETS_URL;
        setSheetsUrl(DEFAULT_SHEETS_URL);
      }

      // Try to load from Sheet first (multi-device sync)
      // Falls back to local storage if Sheet unavailable
      if (url) {
        setLoading(true);
        const sheetBatches = await loadBatchesFromSheet(url);
        if (sheetBatches && sheetBatches.length > 0) {
          // Merge with local to preserve unsynced pending records and local evidence.
          setBatches(prev => {
            const merged = sheetBatches.map(sb => {
            const local = localBatches.find(lb => lb.batchId === sb.batchId);
            const sheetActivities = normalizeActivities(sb.activities);
            const localActivities = normalizeActivities(local?.activities);
            const normalizedSb = withEvidenceAliases(sb);
            // Prefer local review state if it's already final (rejected/accepted) or further along
            // than the Sheet — avoids a stale Sheet row reverting an admin decision on reload.
            const localReviewDone = local && (local.reviewStatus === "rejected" || local.reviewStatus === "accepted");
            const localIsAhead = local && localActivities.length > sheetActivities.length;
            const preferLocalReview = localReviewDone || localIsAhead;
            return local ? withEvidenceAliases({ ...normalizedSb,
              photoDataUrl: local.photoDataUrl || normalizedSb.photoDataUrl,
	      handwrittenWeighingIdDataUrl: local.handwrittenWeighingIdDataUrl || normalizedSb.handwrittenWeighingIdDataUrl,
              transportPhotoDataUrl: local.transportPhotoDataUrl || sb.transportPhotoDataUrl,
              processingPhotoDataUrl: local.processingPhotoDataUrl || sb.processingPhotoDataUrl,
              contaminationPhotoDataUrl: local.contaminationPhotoDataUrl || sb.contaminationPhotoDataUrl,
              offtakerDeliveryPhotoDataUrl: local.offtakerDeliveryPhotoDataUrl || sb.offtakerDeliveryPhotoDataUrl,
              downstreamProcessingPhotoDataUrl: local.downstreamProcessingPhotoDataUrl || sb.downstreamProcessingPhotoDataUrl,
              downstreamContaminationPhotoDataUrl: local.downstreamContaminationPhotoDataUrl || sb.downstreamContaminationPhotoDataUrl,
              offtakerMaterials: (local.offtakerMaterials && local.offtakerMaterials.length) ? local.offtakerMaterials : sb.offtakerMaterials,
              processedMaterials: (local.processedMaterials && local.processedMaterials.length) ? local.processedMaterials : sb.processedMaterials,
              sigCollection: local.sigCollection || sb.sigCollection,
              sigTransport: local.sigTransport || sb.sigTransport,
              sigProcessing: local.sigProcessing || sb.sigProcessing,
              sigOfftakerTransport: local.sigOfftakerTransport || sb.sigOfftakerTransport,
              sigDownstreamProcessing: local.sigDownstreamProcessing || sb.sigDownstreamProcessing,
              inputterIp:     mergeInputterMaps(normalizedSb.inputterIp, local.inputterIp),
              inputterDevice: mergeInputterMaps(normalizedSb.inputterDevice, local.inputterDevice),
              materials: mergeMaterialLines(normalizedSb.materials, local.materials),
              activities: localActivities.length >= sheetActivities.length ? localActivities : sheetActivities,
              status:             localIsAhead ? local.status        : normalizedSb.status,
              reviewStatus:       preferLocalReview ? local.reviewStatus : (normalizedSb.reviewStatus || local.reviewStatus),
              reviewStage:        preferLocalReview ? local.reviewStage  : (normalizedSb.reviewStage  || local.reviewStage),
              reviewActor:        preferLocalReview ? local.reviewActor  : (normalizedSb.reviewActor  || local.reviewActor),
              reviewAt:           preferLocalReview ? local.reviewAt     : (normalizedSb.reviewAt     || local.reviewAt),
	              rejectionReason:    preferLocalReview ? local.rejectionReason : (normalizedSb.rejectionReason || local.rejectionReason),
	            }) : normalizedSb;
	          });
            const sheetKeys = new Set();
            sheetBatches.forEach(sb => {
              [sb.id, sb.rowId, sb.batchId].filter(Boolean).forEach(k => sheetKeys.add(String(k)));
            });
            const localOnly = localBatches.filter(lb => {
              const keys = [lb.id, lb.rowId, lb.batchId].filter(Boolean).map(String);
              if (keys.some(k => sheetKeys.has(k))) return false;
              return (lb.reviewStatus || "pending") === "pending";
            });
            // Local batches the Sheet has never seen — the original sync POST likely
            // failed silently (no-cors). Re-push them now that we have a fresh connection.
            localOnly.forEach(b => {
              syncToSheets(sheetsUrl, b, null);
              syncPhotosToSheets(sheetsUrl, b);
              syncSignaturesToSheets(sheetsUrl, b);
            });
            return [...localOnly, ...merged];
          });
        } else {
          setBatches(localBatches);
        }
      } else {
        setBatches(localBatches);
      }
      setLoading(false);
    })();
	  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (role === "admin" && tab === "verify" && sheetsUrl) {
      refreshBatchesFromSheet(false);
    }
  }, [role, tab, sheetsUrl]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!role || !isValidSheetsUrl(sheetsUrl)) return undefined;
    const refreshIfStale = () => {
      if (document.visibilityState === "hidden") return;
      const now = Date.now();
      if (now - lastSheetRefreshRef.current < 30000) return;
      lastSheetRefreshRef.current = now;
      refreshBatchesFromSheet(false, true);
    };
    if (tab === "records" || tab === "verify") refreshIfStale();
    window.addEventListener("focus", refreshIfStale);
    document.addEventListener("visibilitychange", refreshIfStale);
    return () => {
      window.removeEventListener("focus", refreshIfStale);
      document.removeEventListener("visibilitychange", refreshIfStale);
    };
  }, [role, tab, sheetsUrl]); // eslint-disable-line react-hooks/exhaustive-deps

  // Periodic background retry — even if the app sits idle on one screen,
  // keep attempting to push any local batches the Sheet hasn't confirmed yet.
  useEffect(() => {
    if (!role || !isValidSheetsUrl(sheetsUrl)) return undefined;
    const id = setInterval(() => {
      if (document.visibilityState === "hidden") return;
      refreshBatchesFromSheet(false, true);
    }, 10000);
    return () => clearInterval(id);
  }, [role, sheetsUrl]); // eslint-disable-line react-hooks/exhaustive-deps

		  // ── Save batches whenever they change ─────────────────────────────────────
  const persistBatches = useCallback(async (next) => {
    setSaving(true);
    const result = await saveBatches(next);
    setSaving(false);
    if (result.pruned) {
      setBatches(result.batches);
      showToast("Device storage was almost full — archived photos/signatures from already-accepted batches to free up space.", "ok");
    }
    if (!result.ok) showToast("Failed to save locally — device storage may be full. Free up space or remove a photo.", "err");
  }, []);

  function showToast(msg, type = "ok") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), type === "err" ? 6000 : 3400);
  }

  function requireFields(fields) {
    const missing = fields.filter(f => !f.ok).map(f => f.label);
    if (missing.length) {
      showToast(`Please complete: ${missing.join(", ")}.`, "err");
      return false;
    }
    return true;
  }

  async function doSync(batch, activity) {
    if (!isValidSheetsUrl(sheetsUrl)) {
      setSyncStatus("fail");
      showToast("Enter a valid Apps Script Web App URL in Settings.", "err");
      setTimeout(() => setSyncStatus(null), 2500);
      return;
    }
    setSyncStatus("syncing");
    // The Apps Script POST is fire-and-forget (no-cors), so verify the write
    // landed by re-fetching and re-sending if the Sheet still shows stale data.
    // This guards against flaky mobile networks dropping the request silently.
    let verified = false;
    for (let attempt = 0; attempt < 5 && !verified; attempt++) {
      await syncToSheets(sheetsUrl, batch, activity);
      await Promise.allSettled([
        syncPhotosToSheets(sheetsUrl, batch),
        syncSignaturesToSheets(sheetsUrl, batch),
      ]);
      await new Promise(r => setTimeout(r, 1500 + attempt * 1000));
      const sheetBatches = await loadBatchesFromSheet(sheetsUrl);
      const row = (sheetBatches || []).find(sb => sb.batchId === batch.batchId);
      if (row && row.status === batch.status && (row.reviewStatus || "pending") === (batch.reviewStatus || "pending")) {
        verified = true;
      }
    }
    if (verified) {
      setSyncStatus("ok");
    } else {
      setSyncStatus("fail");
      showToast("Sync to Sheets did not confirm — will retry on next refresh.", "err");
    }
    setTimeout(() => setSyncStatus(null), 2500);
  }

  async function refreshBatchesFromSheet(showMessage = false, light = false) {
    if (!isValidSheetsUrl(sheetsUrl)) {
      setSyncStatus("fail");
      if (showMessage) showToast("Enter a valid Apps Script Web App URL first.", "err");
      setTimeout(() => setSyncStatus(null), 2500);
      return false;
    }
    setSyncStatus("syncing");
    const sheetBatches = await loadBatchesFromSheet(sheetsUrl, light);
    if (sheetBatches && sheetBatches.length > 0) {
      setBatches(prev => {
        const merged = sheetBatches.map(sb => {
          const local = prev.find(lb => lb.id === sb.id || lb.rowId === sb.rowId || lb.batchId === sb.batchId);
          const sheetActivities = normalizeActivities(sb.activities);
          const localActivities = normalizeActivities(local?.activities);
          const normalizedSb = withEvidenceAliases(sb);
          // Prefer local reviewStatus/reviewActor/reviewAt if the Sheet hasn't caught up yet
          // (Apps Script processing delay can cause stale "pending"/"rejected" to overwrite a newer local state)
          const localReviewDone = local && (local.reviewStatus === "rejected" || local.reviewStatus === "accepted");
          // If the operator has advanced the batch to a later stage locally, the Sheet may still
          // reflect the prior (e.g. rejected) stage — don't let that stale record bring it back.
          const localIsAhead = local && localActivities.length > sheetActivities.length;
          const preferLocalReview = localReviewDone || localIsAhead;
          return local ? withEvidenceAliases({
            ...normalizedSb,
            photoDataUrl: local.photoDataUrl || normalizedSb.photoDataUrl,
      handwrittenWeighingIdDataUrl: local.handwrittenWeighingIdDataUrl || normalizedSb.handwrittenWeighingIdDataUrl,
            transportPhotoDataUrl: local.transportPhotoDataUrl || sb.transportPhotoDataUrl,
            processingPhotoDataUrl: local.processingPhotoDataUrl || sb.processingPhotoDataUrl,
            contaminationPhotoDataUrl: local.contaminationPhotoDataUrl || sb.contaminationPhotoDataUrl,
            sigCollection: local.sigCollection || sb.sigCollection,
            sigTransport: local.sigTransport || sb.sigTransport,
            sigProcessing: local.sigProcessing || sb.sigProcessing,
            inputterIp:     mergeInputterMaps(normalizedSb.inputterIp, local.inputterIp),
            inputterDevice: mergeInputterMaps(normalizedSb.inputterDevice, local.inputterDevice),
            materials: mergeMaterialLines(normalizedSb.materials, local.materials),
            activities: localActivities.length >= sheetActivities.length ? localActivities : sheetActivities,
            status:             localIsAhead ? local.status        : normalizedSb.status,
            reviewStatus:       preferLocalReview ? local.reviewStatus : (normalizedSb.reviewStatus || local.reviewStatus),
            reviewStage:        preferLocalReview ? local.reviewStage  : (normalizedSb.reviewStage  || local.reviewStage),
            reviewActor:        preferLocalReview ? local.reviewActor  : (normalizedSb.reviewActor  || local.reviewActor),
            reviewAt:           preferLocalReview ? local.reviewAt     : (normalizedSb.reviewAt     || local.reviewAt),
            rejectionReason:    preferLocalReview ? local.rejectionReason : (normalizedSb.rejectionReason || local.rejectionReason),
          }) : normalizedSb;
        });
        const sheetKeys = new Set();
        sheetBatches.forEach(sb => {
          [sb.id, sb.rowId, sb.batchId].filter(Boolean).forEach(k => sheetKeys.add(String(k)));
        });
        const localOnly = prev.filter(lb => {
          const keys = [lb.id, lb.rowId, lb.batchId].filter(Boolean).map(String);
          if (keys.some(k => sheetKeys.has(k))) return false;
          return (lb.reviewStatus || "pending") === "pending";
        });
        // Local batches the Sheet has never seen — the original sync POST likely
        // failed silently (no-cors). Re-push them now that we have a fresh connection.
        localOnly.forEach(b => {
          syncToSheets(sheetsUrl, b, null);
          syncPhotosToSheets(sheetsUrl, b);
          syncSignaturesToSheets(sheetsUrl, b);
        });
        const next = [...localOnly, ...merged];
        saveBatches(next);
        return next;
      });
      setSyncStatus("ok");
      if (showMessage) showToast(`Loaded ${sheetBatches.length} Sheet records.`);
      setTimeout(() => setSyncStatus(null), 2000);
      return true;
    }
    setSyncStatus("fail");
    if (showMessage) showToast("No Sheet records loaded. Check the Apps Script URL.", "warn");
    setTimeout(() => setSyncStatus(null), 2500);
    return false;
  }

  function mutateBatches(fn) {
    // Compute against the ref so successive calls within one tick still see each
    // other's result, and so callers can read the outcome immediately.
    const next = fn(batchesRef.current);
    batchesRef.current = next;
    setBatches(next);
    persistBatches(next);
    return next;
  }

  function updateBatch(id, patch) {
    mutateBatches(prev => prev.map(b => b.id === id ? { ...b, ...patch } : b));
  }

  async function saveDigitizedScaleReading() {
    if (!detailView) return;
    const kg = Number(detailView.digitizedScaleKg);
    if (!(kg > 0)) {
      showToast("Enter a valid digitized scale reading in kg.", "err");
      return;
    }

    const updated = { ...detailView, digitizedScaleKg: kg };
    mutateBatches(prev => prev.map(b => {
      const sameRow = updated.rowId && b.rowId === updated.rowId;
      const sameId = b.id === updated.id;
      const sameMaterial = b.batchId === updated.batchId && Number(b.materialIndex || 1) === Number(updated.materialIndex || updated.detailMaterialIndex || 1);
      return sameRow || sameId || sameMaterial ? { ...b, digitizedScaleKg: kg } : b;
    }));
    setDetailView(updated);
    showToast("Digitized scale reading saved.");
    await doSync(updated, null);
    await refreshBatchesFromSheet(false, true);
  }

  function resetNewBatchForm() {
    setActiveId(null);
    setStage(1);
    setEntryMode(null);
    setCol({
      feedstockType: FEEDSTOCK_TYPES[0],
      weightKg: "",
      materials: [{ feedstockType: FEEDSTOCK_TYPES[0], weightKg: "" }],
      collectorId: "",
      weighingEquipId: SCALES[0],
      collectionDate: null,
      notes: "",
      photoDataUrl: null,
      handwrittenWeighingIdDataUrl: null,
      handwrittenInput: "",
      handwrittenWeighing: null,
      digitizedScaleKg: "",
      calibCertUrl: null,
    });
    setDirectMeta({ batchId: "", manifestRef: "", feedstockType: FEEDSTOCK_TYPES[0], weightKg: "", collectorId: "", notes: "" });
    setColGeo({ lat: "", lng: "" });
    setTrn({ transportRef: "", transportDate: null, photoDataUrl: null, pickupVehicle: PICKUP_VEHICLES[0] });
    setTrnGeo({ lat: "", lng: "" });
    setPrc({ processor: PROCESSING_FACILITIES[0], processorOther: "", eowProcess: EOW_PROCESSES[0], processingEndDate: null, photoDataUrl: null, processedMaterialIndex: "", acceptedWeightKg: "", rejectedWeightKg: "", contaminationKg: "", contaminationNote: "", contaminationPhotoDataUrl: null });
    setPrcGeo({ lat: "", lng: "" });
    setOft({ selectedLines: [], materials: [{ feedstockType: OFFTAKER_FEEDSTOCK_TYPES[0], weightKg: "", processor: "" }], transportRef: "", transportDate: null, plateNo: OFFTAKER_PLATE_NUMBERS[0], photoDataUrl: null });
    setOftGeo({ lat: "", lng: "" });
    setDsp({ facility: "", facilityOther: "", eowProcess: EOW_PROCESSES[0], processingEndDate: null, photoDataUrl: null, qcReportPhotoDataUrl: null, processedMaterialIndex: "", rejectedWeightKg: "", contaminationKg: "", contaminationNote: "", contaminationPhotoDataUrl: null });
    setDspGeo({ lat: "", lng: "" });
    setSigCol(null);
    setSigTrn(null);
    setSigPrc(null);
    setSigOft(null);
    setSigDsp(null);
  }

  function openNewBatch() {
    resetNewBatchForm();
    setTab("log");
  }

  function chooseEntryMode(mode) {
    if (roleObj?.allowedEntryModes && !roleObj.allowedEntryModes.includes(mode)) {
      showToast("This PIN is not allowed for that input stage.", "err");
      return;
    }
    if (mode === "collection") {
      let batchId = generatedBatchId();
      while (batches.some(b => b.batchId === batchId)) {
        batchId = generatedBatchId();
      }
      const manifestRef = generatedManifestRef(batchId, clockNow);
      setDirectMeta(p => ({ ...p, batchId, manifestRef }));
      setCol(p => ({ ...p, materials: p.materials?.length ? p.materials : [{ feedstockType: FEEDSTOCK_TYPES[0], weightKg: "" }] }));
    } else {
      // Batch IDs are only created at Collection — transport/processing must select an existing batch.
      setDirectMeta(p => ({ ...p, batchId: "", manifestRef: "" }));
    }
    setEntryMode(mode);
    setStage(mode === "transport" ? 2 : mode === "processing" ? 3 : mode === "offtaker_transport" ? 4 : mode === "downstream_processing" ? 5 : 1);
    setActiveId(null);
  }

  function directBatchId() {
    return directMeta.batchId;
  }

  function directManifestRef() {
    return directMeta.manifestRef || (directBatchId() ? generatedManifestRef(directBatchId(), clockNow) : "");
  }

  function makeDirectBase(status, activity, extra = {}) {
    const batchId = directBatchId();
    return {
      id: uid(),
      batchId,
      hub: "Hub Depok-01",
      feedstockType: directMeta.feedstockType,
      weightKg: Number(directMeta.weightKg),
      collectorId: directMeta.collectorId,
      weighingEquipId: null,
      collectionDate: null,
      notes: directMeta.notes,
      photoDataUrl: null,
      handwrittenWeighingIdDataUrl: null,
      handwrittenWeighing: null,
      digitizedScaleKg: "",
      calibCertUrl: null,
      status,
      transportRef: null,
      transportDate: null,
      processor: null,
      eowProcess: null,
      processingEndDate: null,
      processedMaterialIndex: null,
      processedFeedstockType: null,
      acceptedWeightKg: null,
      rejectedWeightKg: null,
      contaminationKg: null,
      contaminationNote: null,
      contaminationPhotoDataUrl: null,
      yieldVarianceKg: null,
      yieldVariancePct: null,
      offtakerMaterials: null,
      processedMaterials: null,
      offtakerTransportRef: null,
      offtakerTransportDate: null,
      offtakerPlateNo: null,
      offtakerDeliveryPhotoDataUrl: null,
      downstreamFacility: null,
      downstreamProcessedMaterialIndex: null,
      downstreamProcessedFeedstockType: null,
      downstreamEowProcess: null,
      downstreamProcessingEndDate: null,
      downstreamAcceptedWeightKg: null,
      downstreamRejectedWeightKg: null,
      downstreamContaminationKg: null,
      downstreamContaminationNote: null,
      downstreamContaminationPhotoDataUrl: null,
      downstreamYieldVarianceKg: null,
      downstreamYieldVariancePct: null,
      downstreamProcessingPhotoDataUrl: null,
      eprBuyer: null,
      vvb: null,
      verifierRef: null,
      rejectionReason: null,
      reviewStatus: "pending",
      reviewStage: status.charAt(0).toUpperCase() + status.slice(1),
      reviewActor: null,
      reviewAt: null,
      inputterIp: extra.inputterIp || null,
      inputterDevice: extra.inputterDevice || null,
      creditsTonnes: 0,
      pprsSerial: null,
      issuedAt: null,
      loggedBy: roleObj.label,
      createdAt: activity.ts || nowISO(),
      sigCollection: null,
      sigTransport: null,
      sigProcessing: null,
      sigOfftakerTransport: null,
      sigDownstreamProcessing: null,
      sigVerification: null,
      sigCredit: null,
      activities: [activity],
      ...extra,
    };
  }

  // ── Photo upload ───────────────────────────────────────────────────────────
  function handlePhoto(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const compressed = await compressPhoto(ev.target.result, 1600, 0.85, 150 * 1024) || ev.target.result;
      setCol(p => ({ ...p, photoDataUrl: compressed }));
    };
    reader.readAsDataURL(file);
  }

  function handleLapakBillPhoto(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const compressed = await compressPhoto(ev.target.result, 1600, 0.85, 150 * 1024) || ev.target.result;
      setCol(p => ({ ...p, lapakBillPhotoDataUrl: compressed }));
    };
    reader.readAsDataURL(file);
  }

  function handleHandwrittenWeighingIdPhoto(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const imageDataUrl = await compressPhoto(ev.target.result, 1600, 0.85, 150 * 1024) || ev.target.result;
      setCol(p => ({ ...p, handwrittenWeighingIdDataUrl: imageDataUrl }));
      await readHandwrittenPhoto(imageDataUrl);
    };
    reader.readAsDataURL(file);
  }

  function applyGeneratedHandwrittenWeighing(parsed, rawText, successMessage) {
    const seq = String(batches.length + 1).padStart(3, "0");
    const weighingId = `WGH-${formatIdDate(clockNow)}-${seq}`;
    setCol(p => {
      return {
        ...p,
        handwrittenInput: rawText || parsed.rawText || p.handwrittenInput,
        handwrittenWeighing: { ...parsed, weighingId },
      };
    });
    showToast(successMessage || `Weighing ID ${weighingId} generated.`);
  }

  function generateHandwrittenWeighing() {
    const parsed = parseHandwrittenWeighingInput(col.handwrittenInput);
    if (!parsed.weights.length && !parsed.netWeight) {
      showToast("Enter handwritten weighing numbers first.", "err");
      return;
    }
    applyGeneratedHandwrittenWeighing(parsed, col.handwrittenInput);
  }

  async function readHandwrittenPhoto(imageDataUrl) {
    setOcrLoading(true);
    showToast("Reading handwritten weighing photo...");
    try {
      const resizedImage = await prepareImageForOcr(imageDataUrl);
      const res = await fetch("/api/read-weighing-photo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: resizedImage }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "OCR failed");
      }
      const rawText = data.rawText || (data.weights || []).join("\n");
      const parsed = {
        ...parseHandwrittenWeighingInput(rawText),
        ...data,
        rawText,
        weights: data.weights?.length ? data.weights : parseHandwrittenWeighingInput(rawText).weights,
      };
      if (!parsed.weights?.length && !parsed.netWeight) {
        throw new Error("No weighing numbers detected");
      }
      applyGeneratedHandwrittenWeighing(parsed, rawText, "Handwritten photo read. Please review the generated numbers.");
    } catch (err) {
      showToast(`OCR failed: ${err.message}. You can still type the numbers manually.`, "warn");
    } finally {
      setOcrLoading(false);
    }
  }

  function handleTransportPhoto(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const compressed = await compressPhoto(ev.target.result, 1600, 0.85, 150 * 1024) || ev.target.result;
      setTrn(p => ({ ...p, photoDataUrl: compressed }));
    };
    reader.readAsDataURL(file);
  }

  function handleProcessingPhoto(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const compressed = await compressPhoto(ev.target.result, 1600, 0.85, 150 * 1024) || ev.target.result;
      setPrc(p => ({ ...p, photoDataUrl: compressed }));
    };
    reader.readAsDataURL(file);
  }

  function handleContaminationPhoto(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const compressed = await compressPhoto(ev.target.result, 1600, 0.85, 150 * 1024) || ev.target.result;
      setPrc(p => ({ ...p, contaminationPhotoDataUrl: compressed }));
    };
    reader.readAsDataURL(file);
  }

  function handleOfftakerTransportPhoto(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const compressed = await compressPhoto(ev.target.result, 1600, 0.85, 150 * 1024) || ev.target.result;
      setOft(p => ({ ...p, photoDataUrl: compressed }));
    };
    reader.readAsDataURL(file);
  }

  function handleDownstreamProcessingPhoto(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const compressed = await compressPhoto(ev.target.result, 1600, 0.85, 150 * 1024) || ev.target.result;
      setDsp(p => ({ ...p, photoDataUrl: compressed }));
    };
    reader.readAsDataURL(file);
  }

  function handleDownstreamQcReportPhoto(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const compressed = await compressPhoto(ev.target.result, 1600, 0.85, 150 * 1024) || ev.target.result;
      setDsp(p => ({ ...p, qcReportPhotoDataUrl: compressed }));
    };
    reader.readAsDataURL(file);
  }

  function handleDownstreamContaminationPhoto(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const compressed = await compressPhoto(ev.target.result, 1600, 0.85, 150 * 1024) || ev.target.result;
      setDsp(p => ({ ...p, contaminationPhotoDataUrl: compressed }));
    };
    reader.readAsDataURL(file);
  }

  // ── Stage submissions ──────────────────────────────────────────────────────
  async function submitCollection() {
    const rawMaterials = col.materials || [];
    const materials = rawMaterials.map(m => ({
      feedstockType: m.feedstockType || "",
      weightKg: Number(m.weightKg) || 0,
    }));
    const totalMaterialKg = materialTotalKg(materials);
    const materialMissing = [];
    if (!rawMaterials.length) materialMissing.push({ ok: false, label: "at least one material" });
    rawMaterials.forEach((m, idx) => {
      materialMissing.push({ ok: Boolean(m.feedstockType), label: `material ${idx + 1} type` });
      materialMissing.push({ ok: Number(m.weightKg) > 0, label: `material ${idx + 1} gross weight` });
    });
    if (!requireFields([
      { ok: Boolean(directBatchId()), label: "Batch ID" },
      ...materialMissing,
      { ok: totalMaterialKg > 0, label: "total gross weight" },
	      { ok: Boolean(col.collectorId), label: "Lapak Name" },
	      { ok: Boolean(col.weighingEquipId), label: "Weighing Equipment" },
      { ok: Boolean((col.notes || "").trim()), label: "Notes / Field Observations" },
      { ok: Boolean(col.photoDataUrl), label: "Collection Photo (chain-of-custody evidence)" },
      { ok: Boolean(col.lapakBillPhotoDataUrl), label: "Lapak Bill Photo" },
      { ok: Boolean(sigCol), label: "Collector Signature" },
    ])) return;
    setGeoLoading(true);
    showToast("Getting location…");
    const geo = await getGeo(colGeo);
    setGeoLoading(false);
    if (!geo) {
      showToast("Unable to get GPS location. Please make sure Location Services is turned on for this browser, then tap Submit again.", "err");
      return;
    }
    const capturedAt = nowISO();
    const clientMeta = await captureClientMeta();
    const activity = makeActivityAt("Collection", roleObj.name, capturedAt, geo, col.notes);
    const batch = {
      id: uid(), batchId: directBatchId(),
      hub: "Hub Depok-01",
      materials,
      feedstockType: materialSummary(materials), weightKg: totalMaterialKg,
	      collectorId: col.collectorId, weighingEquipId: col.weighingEquipId,
	      pickupVehicle: null,
      collectionDate: capturedAt,
      notes: col.notes,
      photoDataUrl: col.photoDataUrl,
      lapakBillPhotoDataUrl: col.lapakBillPhotoDataUrl,
      handwrittenWeighingIdDataUrl: col.handwrittenWeighingIdDataUrl,
      handwrittenWeighing: col.handwrittenWeighing,
      handwrittenWeighingId: col.handwrittenWeighing?.weighingId || "",
      handwrittenRawText: col.handwrittenWeighing?.rawText || "",
      handwrittenWeights: col.handwrittenWeighing?.weights?.join("|") || "",
      handwrittenGrossWeight: col.handwrittenWeighing?.grossWeight || "",
      handwrittenDeductions: col.handwrittenWeighing?.deductions?.join("|") || "",
      handwrittenTotalDeduction: col.handwrittenWeighing?.totalDeduction || "",
      handwrittenNetWeight: col.handwrittenWeighing?.netWeight || "",
      handwrittenRate: col.handwrittenWeighing?.rate || "",
      handwrittenTotalAmount: col.handwrittenWeighing?.totalAmount || "",
      calibCertUrl: col.calibCertUrl,
      status: "collection",
      transportRef: null, transportDate: null,
      processor: null, eowProcess: null, processingEndDate: null,
      eprBuyer: null, vvb: null, verifierRef: null, rejectionReason: null,
      reviewStatus: "pending", reviewStage: "Collection", reviewActor: null, reviewAt: null,
      inputterIp: mergeInputterField(null, "collection", clientMeta.inputterIp),
      inputterDevice: mergeInputterField(null, "collection", clientMeta.inputterDevice),
      creditsTonnes: 0, pprsSerial: null, issuedAt: null,
      loggedBy: roleObj.label, createdAt: capturedAt,
      sigCollection: sigCol, sigTransport: null,
      sigProcessing: null, sigVerification: null, sigCredit: null,
      activities: [activity],
    };
    mutateBatches(prev => [batch, ...prev]);
    resetNewBatchForm();
    showToast(`Collection input ${batch.batchId} recorded.`);
    doSync(batch, activity);
  }

  async function submitTransport() {
    const capturedAt = nowISO();
    const transportRef = activeId ? (trn.transportRef || generatedManifestRef(active?.batchId, capturedAt)) : (directMeta.manifestRef || generatedManifestRef(directBatchId(), capturedAt));
    if (!requireFields([
      { ok: Boolean(activeId ? active?.batchId : directBatchId()), label: "Batch ID" },
      { ok: activeId || Boolean(directMeta.feedstockType), label: "Feedstock Type" },
      { ok: activeId || Number(directMeta.weightKg) > 0, label: "Gross Weight" },
      { ok: activeId || Boolean(directMeta.collectorId), label: "Lapak Name" },
      { ok: Boolean(transportRef), label: "Transport Manifest Ref." },
      { ok: Boolean(trn.pickupVehicle), label: "Material Pick-up Vehicle" },
      { ok: Boolean(trn.photoDataUrl), label: "Transport Photo" },
      { ok: Boolean(sigTrn), label: "Transport Officer Signature" },
    ])) return;
    setGeoLoading(true);
    showToast("Getting location…");
    const geo = await getGeo(trnGeo);
    setGeoLoading(false);
    if (!geo) {
      showToast("Unable to get GPS location. Please make sure Location Services is turned on for this browser, then tap Submit again.", "err");
      return;
    }
    const clientMeta = await captureClientMeta();
    const activity = makeActivityAt("Transport", roleObj.name, capturedAt, geo, `Manifest: ${transportRef}`);

    if (!activeId) {
      const batch = makeDirectBase("transport", activity, {
        inputterIp: mergeInputterField(null, "transport", clientMeta.inputterIp),
        inputterDevice: mergeInputterField(null, "transport", clientMeta.inputterDevice),
        pickupVehicle: trn.pickupVehicle,
        transportRef,
        transportDate: capturedAt,
        transportPhotoDataUrl: trn.photoDataUrl,
        sigTransport: sigTrn,
      });
      mutateBatches(prev => [batch, ...prev]);
      resetNewBatchForm();
      showToast(`Transport input ${batch.batchId} recorded.`);
      doSync(batch, activity);
      setTab("dashboard");
      return;
    }

    mutateBatches(prev => prev.map(b => b.id === activeId ? {
      ...b,
      status: "transport",
      reviewStatus: "pending",
      reviewStage: "Transport",
      reviewActor: null,
      reviewAt: null,
      inputterIp: mergeInputterField(b.inputterIp, "transport", clientMeta.inputterIp),
      inputterDevice: mergeInputterField(b.inputterDevice, "transport", clientMeta.inputterDevice),
      pickupVehicle: trn.pickupVehicle,
      transportRef,
      transportDate: capturedAt,
      transportPhotoDataUrl: trn.photoDataUrl,
      sigTransport: sigTrn,
      activities: [...(b.activities || []), activity],
    } : b));
    setStage(3);
    setTab("dashboard");
    showToast("Transport documented.");
    const updated = batches.find(b => b.id === activeId);
    if (updated) {
      const inputterIp = mergeInputterField(updated.inputterIp, "transport", clientMeta.inputterIp);
      const inputterDevice = mergeInputterField(updated.inputterDevice, "transport", clientMeta.inputterDevice);
      doSync({ ...updated, status: "transport", reviewStatus: "pending", reviewStage: "Transport", reviewActor: null, reviewAt: null, inputterIp, inputterDevice, pickupVehicle: trn.pickupVehicle, transportRef, transportDate: capturedAt, transportPhotoDataUrl: trn.photoDataUrl, sigTransport: sigTrn, activities: [...(updated.activities || []), activity] }, activity);
    }
  }

  async function submitProcessing() {
    const capturedAt = nowISO();
    const processorFinal = prc.processor === "Other" ? (prc.processorOther || "").trim() : (prc.processor || "").trim();
    const materialsAvail = activeId
      ? (active?.materials || [])
      : [{ index: 1, feedstockType: directMeta.feedstockType, weightKg: directMeta.weightKg }];
    const procMaterial = materialsAvail.find(m => String(m.index) === String(prc.processedMaterialIndex)) || materialsAvail[0];
    const processedFeedstockType = procMaterial?.feedstockType || "";
    const processedWeightKg = Number(procMaterial?.weightKg) || 0;
    const rejectedWeightKg = Number(prc.rejectedWeightKg) || 0;
    const acceptedWeightKg = Math.max(0, processedWeightKg - rejectedWeightKg);
    const contaminationKg = Number(prc.contaminationKg) || 0;
    const yieldVarianceKg = processedWeightKg - (acceptedWeightKg + rejectedWeightKg);
    const yieldVariancePct = processedWeightKg > 0 ? (yieldVarianceKg / processedWeightKg) * 100 : 0;
    if (!requireFields([
      { ok: Boolean(activeId ? active?.batchId : directBatchId()), label: "Batch ID" },
      { ok: activeId || Boolean(directMeta.feedstockType), label: "Feedstock Type" },
      { ok: activeId || Number(directMeta.weightKg) > 0, label: "Gross Weight" },
      { ok: activeId || Boolean(directMeta.collectorId), label: "Lapak Name" },
      { ok: Boolean(processorFinal), label: "Processing Facility" },
      { ok: materialsAvail.length <= 1 || Boolean(prc.processedMaterialIndex), label: "Material Processed" },
      { ok: Boolean(prc.eowProcess), label: "End-of-Waste Process" },
      { ok: Boolean(prc.photoDataUrl), label: "Processing Photo" },
      { ok: Boolean(sigPrc), label: "Processor Signature" },
    ])) return;
    // Rejected must not exceed accepted. Accepted is derived as processed - rejected,
    // so this rejects any line where more than half the material is rejected.
    if (rejectedWeightKg > acceptedWeightKg) {
      showToast(`${t("rejectedExceedsAccepted")} (${rejectedWeightKg} kg > ${acceptedWeightKg} kg)`, "err");
      return;
    }
    setGeoLoading(true);
    showToast("Getting location…");
    const geo = await getGeo(prcGeo);
    setGeoLoading(false);
    if (!geo) {
      showToast("Unable to get GPS location. Please make sure Location Services is turned on for this browser, then tap Submit again.", "err");
      return;
    }
    const clientMeta = await captureClientMeta();
    const activity = makeActivityAt("Processing", roleObj.name, capturedAt, geo, `${prc.eowProcess} · ${processorFinal}`);
    const processingFields = {
      processor: processorFinal,
      eowProcess: prc.eowProcess,
      processingEndDate: capturedAt,
      processingPhotoDataUrl: prc.photoDataUrl,
      processedMaterialIndex: procMaterial?.index || 1,
      processedFeedstockType,
      processedWeightKg,
      acceptedWeightKg,
      rejectedWeightKg,
      contaminationKg,
      contaminationNote: prc.contaminationNote || "",
      contaminationPhotoDataUrl: prc.contaminationPhotoDataUrl,
      yieldVarianceKg,
      yieldVariancePct,
    };

    if (!activeId) {
      const batch = makeDirectBase("processing", activity, {
        inputterIp: mergeInputterField(null, "processing", clientMeta.inputterIp),
        inputterDevice: mergeInputterField(null, "processing", clientMeta.inputterDevice),
        ...processingFields,
        sigProcessing: sigPrc,
      });
      mutateBatches(prev => [batch, ...prev]);
      resetNewBatchForm();
      showToast(`Processing input ${batch.batchId} recorded.`);
      doSync(batch, activity);
      return;
    }

    const activityWithMaterial = { ...activity, stage: `Processing (M${procMaterial?.index || 1})` };

    // Compute everything from the freshest batch state, not the possibly-stale
    // `active` snapshot — otherwise a processed material line submitted just before this
    // one can be dropped from processedMaterials if `active` hadn't picked it up yet.
    // mutateBatches now applies synchronously, so these stay defined below and the
    // resulting batch actually reaches doSync (previously it never did).
    let updatedProcessedMaterials, allMaterialIndexes, processedIndexes, allProcessed, freshBatch;
    mutateBatches(prev => prev.map(b => {
      if (b.id !== activeId) return b;
      const existingProcessedMaterials = (b.processedMaterials || []).filter(m => String(m.processedMaterialIndex) !== String(procMaterial?.index || 1));
      updatedProcessedMaterials = [...existingProcessedMaterials, { ...processingFields, sigProcessing: sigPrc }];
      allMaterialIndexes = (b.materials?.length ? b.materials.map(m => String(m.index || 1)) : ["1"]);
      processedIndexes = updatedProcessedMaterials.map(m => String(m.processedMaterialIndex));
      allProcessed = allMaterialIndexes.every(idx => processedIndexes.includes(idx));

      const aggAccepted = updatedProcessedMaterials.reduce((s, m) => s + (Number(m.acceptedWeightKg) || 0), 0);
      const aggRejected = updatedProcessedMaterials.reduce((s, m) => s + (Number(m.rejectedWeightKg) || 0), 0);
      const aggContamination = updatedProcessedMaterials.reduce((s, m) => s + (Number(m.contaminationKg) || 0), 0);
      const totalProcessedWeight = updatedProcessedMaterials.reduce((s, m) => s + (Number(m.processedWeightKg) || 0), 0);
      const aggYieldVarianceKg = totalProcessedWeight - (aggAccepted + aggRejected);
      const aggYieldVariancePct = totalProcessedWeight > 0 ? (aggYieldVarianceKg / totalProcessedWeight) * 100 : 0;
      const aggregateFields = {
        ...processingFields,
        acceptedWeightKg: aggAccepted,
        rejectedWeightKg: aggRejected,
        contaminationKg: aggContamination,
        yieldVarianceKg: aggYieldVarianceKg,
        yieldVariancePct: aggYieldVariancePct,
      };
      const statusFields = {
        status: "processing",
        reviewStatus: "pending",
        reviewStage: allProcessed ? "Processing" : `Processing (M${procMaterial?.index || 1})`,
        reviewActor: null,
        reviewAt: null,
        ...aggregateFields,
      };
      freshBatch = {
        ...b,
        ...statusFields,
        processedMaterials: updatedProcessedMaterials,
        inputterIp: mergeInputterField(b.inputterIp, "processing", clientMeta.inputterIp),
        inputterDevice: mergeInputterField(b.inputterDevice, "processing", clientMeta.inputterDevice),
        sigProcessing: sigPrc,
        activities: [...(b.activities || []), activityWithMaterial],
      };
      return freshBatch;
    }));
    if (freshBatch) {
      doSync(freshBatch, activityWithMaterial);
    }
    if (allProcessed) {
      resetNewBatchForm();
      showToast("Processing recorded. Ready for next batch.");
    } else {
      setPrc(p => ({ processor: p.processor, processorOther: p.processorOther, eowProcess: p.eowProcess, processingEndDate: null, photoDataUrl: null, processedMaterialIndex: "", acceptedWeightKg: "", rejectedWeightKg: "", contaminationKg: "", contaminationNote: "", contaminationPhotoDataUrl: null }));
      setSigPrc(null);
      showToast(`Material M${procMaterial?.index || 1} processed. ${allMaterialIndexes.length - processedIndexes.length} material(s) remaining.`);
    }
  }

  async function submitOfftakerTransport() {
    const capturedAt = nowISO();
    // Selection is per processed line now. Group the picked lines by their batch so
    // one manifest can still carry several lines, possibly from the same batch.
    const selectedLines = oft.selectedLines || [];
    const linesByBatchRef = selectedLines.reduce((acc, sel) => {
      (acc[sel.batchRef] ||= []).push(sel);
      return acc;
    }, {});
    const selectedBatches = Object.keys(linesByBatchRef).map(id => batches.find(b => b.id === id)).filter(Boolean);
    const transportRef = selectedBatches.length > 0 ? (oft.transportRef || generatedManifestRef(selectedBatches[0].batchId, capturedAt)) : (directMeta.manifestRef || generatedManifestRef(directBatchId(), capturedAt));
    if (!requireFields([
      { ok: selectedLines.length > 0 ? true : Boolean(directBatchId()), label: "Batch ID" },
      { ok: (oft.materials || []).every(m => m.feedstockType && Number(m.weightKg) > 0), label: "Materials" },
      { ok: Boolean(transportRef), label: "Transport Manifest Ref." },
      { ok: Boolean(oft.plateNo), label: "Material Plate No." },
      { ok: Boolean(oft.photoDataUrl), label: "Delivery Order Photo" },
      { ok: Boolean(sigOft), label: "Off-taker Transport Signature" },
    ])) return;
    setGeoLoading(true);
    showToast("Getting location…");
    const geo = await getGeo(oftGeo);
    setGeoLoading(false);
    if (!geo) {
      showToast("Unable to get GPS location. Please make sure Location Services is turned on for this browser, then tap Submit again.", "err");
      return;
    }
    const clientMeta = await captureClientMeta();
    const activity = makeActivityAt("Offtaker Transport", roleObj.name, capturedAt, geo, `Manifest: ${transportRef}`);
    const offtakerFields = {
      offtakerMaterials: oft.materials,
      offtakerTransportRef: transportRef,
      offtakerTransportDate: capturedAt,
      offtakerPlateNo: oft.plateNo,
      offtakerDeliveryPhotoDataUrl: oft.photoDataUrl,
    };

    if (selectedBatches.length === 0) {
      const batch = makeDirectBase("offtaker_transport", activity, {
        inputterIp: mergeInputterField(null, "offtaker_transport", clientMeta.inputterIp),
        inputterDevice: mergeInputterField(null, "offtaker_transport", clientMeta.inputterDevice),
        ...offtakerFields,
        sigOfftakerTransport: sigOft,
      });
      mutateBatches(prev => [batch, ...prev]);
      resetNewBatchForm();
      showToast(`Offtaker Transport input ${batch.batchId} recorded.`);
      doSync(batch, activity);
      return;
    }

    // Each shipped line is appended to offtakerMaterials carrying the processed line
    // index it came from, so the remaining lines stay selectable. The batch only
    // leaves the off-taker queue once every processed line has been shipped.
    const buildOfftakerUpdate = (b) => {
      const picked = linesByBatchRef[b.id] || [];
      const existing = b.offtakerMaterials || [];
      const alreadyShipped = new Set(
        existing.map(m => (m.processedMaterialIndex == null ? null : String(m.processedMaterialIndex))).filter(Boolean),
      );
      const added = picked
        .filter(sel => !alreadyShipped.has(String(sel.index)))
        .map(sel => ({
          processedMaterialIndex: String(sel.index),
          feedstockType: sel.feedstockType,
          weightKg: sel.weightKg,
          processor: sel.processor,
        }));
      const merged = [...existing, ...added];
      const shippedNow = new Set(merged.map(m => String(m.processedMaterialIndex)).filter(Boolean));
      const allLinesShipped = offtakerBatchLines(b).every(l => shippedNow.has(String(l.index)));
      return {
        offtakerMaterials: merged,
        offtakerTransportRef: transportRef,
        offtakerTransportDate: capturedAt,
        offtakerPlateNo: oft.plateNo,
        offtakerDeliveryPhotoDataUrl: oft.photoDataUrl,
        // Lines still at the hub keep the batch in "processing" so it stays in the
        // off-taker picker; only a fully shipped batch advances.
        status: allLinesShipped ? "offtaker_transport" : b.status,
      };
    };

    const selectedIdSet = new Set(Object.keys(linesByBatchRef));
    mutateBatches(prev => prev.map(b => selectedIdSet.has(b.id) ? {
      ...b,
      ...buildOfftakerUpdate(b),
      reviewStatus: "pending",
      reviewStage: "Offtaker Transport",
      reviewActor: null,
      reviewAt: null,
      inputterIp: mergeInputterField(b.inputterIp, "offtaker_transport", clientMeta.inputterIp),
      inputterDevice: mergeInputterField(b.inputterDevice, "offtaker_transport", clientMeta.inputterDevice),
      sigOfftakerTransport: sigOft,
      activities: [...(b.activities || []), activity],
    } : b));
    selectedBatches.forEach(updo => {
      const inputterIp = mergeInputterField(updo.inputterIp, "offtaker_transport", clientMeta.inputterIp);
      const inputterDevice = mergeInputterField(updo.inputterDevice, "offtaker_transport", clientMeta.inputterDevice);
      doSync({ ...updo, ...buildOfftakerUpdate(updo), reviewStatus: "pending", reviewStage: "Offtaker Transport", reviewActor: null, reviewAt: null, inputterIp, inputterDevice, sigOfftakerTransport: sigOft, activities: [...(updo.activities || []), activity] }, activity);
    });
    resetNewBatchForm();
    showToast(`Offtaker Transport documented for ${selectedLines.length} material line(s). Ready for next batch.`);
  }

  async function submitDownstreamProcessing() {
    const capturedAt = nowISO();
    const facilityFinal = dsp.facility === "Other" ? (dsp.facilityOther || "").trim() : (dsp.facility || "").trim();
    const materialsAvail = active?.offtakerMaterials || [];
    const dspMaterial = materialsAvail.find((m, i) => String(i + 1) === String(dsp.processedMaterialIndex)) || materialsAvail[0];
    const processedFeedstockType = dspMaterial?.feedstockType || "";
    const processedWeightKg = Number(dspMaterial?.weightKg) || 0;
    const rejectedWeightKg = Number(dsp.rejectedWeightKg) || 0;
    const contaminationKg = Number(dsp.contaminationKg) || 0;
    // Accepted is derived, not entered: whatever is left of the input line.
    const acceptedWeightKg = Math.max(0, processedWeightKg - contaminationKg - rejectedWeightKg);
    // Yield variance is the material that did not survive processing.
    const yieldVarianceKg = processedWeightKg - acceptedWeightKg;
    const yieldVariancePct = processedWeightKg > 0 ? (yieldVarianceKg / processedWeightKg) * 100 : 0;
    if (!requireFields([
      { ok: Boolean(active?.batchId), label: "Batch ID" },
      { ok: Boolean(facilityFinal), label: "Downstream Facility" },
      { ok: materialsAvail.length <= 1 || Boolean(dsp.processedMaterialIndex), label: "Material Processed" },
      { ok: Boolean(dsp.eowProcess), label: "End-of-Waste Process" },
      { ok: Boolean(dsp.photoDataUrl), label: "Downstream Processing Photo" },
      { ok: Boolean(dsp.qcReportPhotoDataUrl), label: "QC Report Photo" },
      { ok: Boolean(sigDsp), label: "Downstream Processor Signature" },
    ])) return;
    // Contamination + rejected cannot exceed the line's input weight, or the
    // derived accepted weight would go negative.
    if (contaminationKg + rejectedWeightKg > processedWeightKg) {
      showToast(`${t("outputExceedsInput")} (${(contaminationKg + rejectedWeightKg).toLocaleString()} kg > ${processedWeightKg.toLocaleString()} kg)`, "err");
      return;
    }
    if (rejectedWeightKg > acceptedWeightKg) {
      showToast(`${t("rejectedExceedsAccepted")} (${rejectedWeightKg} kg > ${acceptedWeightKg} kg)`, "err");
      return;
    }
    setGeoLoading(true);
    showToast("Getting location…");
    const geo = await getGeo(dspGeo);
    setGeoLoading(false);
    if (!geo) {
      showToast("Unable to get GPS location. Please make sure Location Services is turned on for this browser, then tap Submit again.", "err");
      return;
    }
    const clientMeta = await captureClientMeta();
    const activity = makeActivityAt("Downstream Processing", roleObj.name, capturedAt, geo, `${dsp.eowProcess} · ${facilityFinal}`);
    const downstreamFields = {
      downstreamFacility: facilityFinal,
      downstreamProcessedMaterialIndex: materialsAvail.findIndex((m, i) => String(i + 1) === String(dsp.processedMaterialIndex)) + 1 || 1,
      downstreamProcessedFeedstockType: processedFeedstockType,
      downstreamEowProcess: dsp.eowProcess,
      downstreamProcessingEndDate: capturedAt,
      downstreamAcceptedWeightKg: acceptedWeightKg,
      downstreamRejectedWeightKg: rejectedWeightKg,
      downstreamContaminationKg: contaminationKg,
      downstreamContaminationNote: dsp.contaminationNote || "",
      downstreamContaminationPhotoDataUrl: dsp.contaminationPhotoDataUrl,
      downstreamYieldVarianceKg: yieldVarianceKg,
      downstreamYieldVariancePct: yieldVariancePct,
      downstreamProcessingPhotoDataUrl: dsp.photoDataUrl,
      downstreamQcReportPhotoDataUrl: dsp.qcReportPhotoDataUrl,
    };

    mutateBatches(prev => prev.map(b => b.id === activeId ? {
      ...b,
      status: "downstream_processing",
      reviewStatus: "pending",
      reviewStage: "Downstream Processing",
      reviewActor: null,
      reviewAt: null,
      inputterIp: mergeInputterField(b.inputterIp, "downstream_processing", clientMeta.inputterIp),
      inputterDevice: mergeInputterField(b.inputterDevice, "downstream_processing", clientMeta.inputterDevice),
      ...downstreamFields,
      sigDownstreamProcessing: sigDsp,
      activities: [...(b.activities || []), activity],
    } : b));
    const updd = batches.find(b => b.id === activeId);
    if (updd) {
      const inputterIp = mergeInputterField(updd.inputterIp, "downstream_processing", clientMeta.inputterIp);
      const inputterDevice = mergeInputterField(updd.inputterDevice, "downstream_processing", clientMeta.inputterDevice);
      doSync({ ...updd, status: "downstream_processing", reviewStatus: "pending", reviewStage: "Downstream Processing", reviewActor: null, reviewAt: null, inputterIp, inputterDevice, ...downstreamFields, sigDownstreamProcessing: sigDsp, activities: [...(updd.activities || []), activity] }, activity);
    }
    resetNewBatchForm();
    showToast("Downstream Processing recorded. Ready for next batch.");
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
    setCol({ feedstockType: FEEDSTOCK_TYPES[0], weightKg: "", materials: [{ feedstockType: FEEDSTOCK_TYPES[0], weightKg: "" }], collectorId: "", weighingEquipId: SCALES[0], collectionDate: null, notes: "", photoDataUrl: null, lapakBillPhotoDataUrl: null, handwrittenWeighingIdDataUrl: null, digitizedScaleKg: "", calibCertUrl: null });
    setColGeo({ lat: "", lng: "" });
    setTrn({ transportRef: "", transportDate: null, photoDataUrl: null, pickupVehicle: PICKUP_VEHICLES[0] });
    setTrnGeo({ lat: "", lng: "" });
    setPrc({ processor: PROCESSING_FACILITIES[0], processorOther: "", eowProcess: EOW_PROCESSES[0], processingEndDate: null, photoDataUrl: null, processedMaterialIndex: "", acceptedWeightKg: "", rejectedWeightKg: "", contaminationKg: "", contaminationNote: "", contaminationPhotoDataUrl: null });
    setPrcGeo({ lat: "", lng: "" });
    setOft({ selectedLines: [], materials: [{ feedstockType: OFFTAKER_FEEDSTOCK_TYPES[0], weightKg: "", processor: "" }], transportRef: "", transportDate: null, plateNo: OFFTAKER_PLATE_NUMBERS[0], photoDataUrl: null });
    setOftGeo({ lat: "", lng: "" });
    setDsp({ facility: "", facilityOther: "", eowProcess: EOW_PROCESSES[0], processingEndDate: null, photoDataUrl: null, qcReportPhotoDataUrl: null, processedMaterialIndex: "", rejectedWeightKg: "", contaminationKg: "", contaminationNote: "", contaminationPhotoDataUrl: null });
    setDspGeo({ lat: "", lng: "" });
    setSigCol(null); setSigTrn(null); setSigPrc(null); setSigOft(null); setSigDsp(null); setSigVrf(null); setSigCred(null);
    setTab("records");
    showToast("Plastic Credit issued!");
    doSync(updated, { stage: "Credit", actor: roleObj.name, ts: nowISO(), geo: null, note: `${tonnes} MT · ${serial.slice(0,24)}…` });
  }

  async function approveBatchInput(id) {
    const geo = await getGeo();
    const approvedAt = nowISO();
    const target = batches.find(b => b.id === id);
    if (!target) return;
    const reviewActivity = makeActivityAt("Admin Accepted", roleObj.name, approvedAt, geo, `${target.reviewStage || target.status} input accepted`);
    const updatedTarget = {
      ...target,
      reviewStatus: "accepted",
      reviewActor: roleObj.name,
      reviewAt: approvedAt,
      activities: [...(target.activities || []), reviewActivity],
    };
    mutateBatches(prev => prev.map(b => b.id === id ? updatedTarget : b));
    showToast(`Input accepted for ${target.batchId || "batch"}.`);
    await doSync(updatedTarget, reviewActivity);
    await refreshBatchesFromSheet(false, true);
  }

  async function rejectBatch(id, reason) {
    setGeoLoading(true);
    const geo = await getGeo();
    setGeoLoading(false);
    const rejectedAt = nowISO();
    const rejb = batches.find(b => b.id === id);
    if (!rejb) return;
    const reviewActivity = makeActivityAt("Admin Rejected", roleObj.name, rejectedAt, geo, reason);
    const updatedBatch = {
      ...rejb,
      reviewStatus: "rejected",
      reviewActor: roleObj.name,
      reviewAt: rejectedAt,
      rejectionReason: reason,
      activities: [...(rejb.activities || []), reviewActivity],
    };
    mutateBatches(prev => prev.map(b => b.id === id ? updatedBatch : b));
    setRejectTarget(null);
    showToast("Input rejected.", "warn");
    await doSync(updatedBatch, reviewActivity);
    await refreshBatchesFromSheet(false, true);
  }

  async function deleteRejectedBatch(id) {
    const target = batches.find(b => b.id === id);
    if (!target || target.reviewStatus !== "rejected") return;
    if (!window.confirm(`Permanently delete batch ${target.batchId}? This removes its record, photos, signatures and activity log. This cannot be undone.`)) return;
    mutateBatches(prev => prev.filter(b => b.id !== id));
    setDetailView(null);
    const result = await deleteBatchFromBackend(sheetsUrl, target.batchId);
    if (result.ok) {
      showToast(`Batch ${target.batchId} deleted.`, "warn");
    } else {
      showToast("Delete failed to sync — it may reappear after refresh.", "err");
    }
    await refreshBatchesFromSheet(false, true);
  }

  function reviewEvidence(batch) {
    const evidenceBatch = withEvidenceAliases(batch);
    const status = activityStatus(evidenceBatch?.reviewStage || evidenceBatch?.status, evidenceBatch?.status);
    if (status === "transport") {
      return {
        photoLabel: "Transport Photo",
        photo: evidenceBatch?.transportPhotoDataUrl,
        extraPhotos: [],
        signatureLabel: t("sigTransportShort"),
        signature: evidenceBatch?.sigTransport,
      };
    }
    if (status === "processing") {
      return {
        photoLabel: "Processing Photo",
        photo: evidenceBatch?.processingPhotoDataUrl,
        extraPhotos: [],
        signatureLabel: "Processor Signature",
        signature: evidenceBatch?.sigProcessing,
      };
    }
    return {
      photoLabel: "Weighing Process Evidence",
      photo: evidenceBatch?.photoDataUrl,
      extraPhotos: [
        { label: t("lapakBillPhoto"), src: evidenceBatch?.lapakBillPhotoDataUrl },
        { label: "Handwritten Weighing Identification", src: evidenceBatch?.handwrittenWeighingIdDataUrl },
      ].filter(p => p.src),
      signatureLabel: "Collector Signature",
      signature: evidenceBatch?.sigCollection,
    };
  }

  // ── Stats ──────────────────────────────────────────────────────────────────
  const totalKg = visibleBatches.reduce((s, b) => s + (Number(b.weightKg) || 0), 0);
  const byStatus = s => visibleBatches.filter(b => b.status === s).length;
  const recordRows = getStageRecordRows(visibleBatches);
  const operatorInputStatuses = ["collection", "transport", "processing", "offtaker_transport", "downstream_processing"];
  // Backend returns rows created_at ascending, so sort newest-first for review.
  const pendingReviewBatches = batches
    .filter(b => operatorInputStatuses.includes(b.status) && (b.reviewStatus || "pending") === "pending")
    .sort((a, b) => (parseDate(b.createdAt)?.getTime() || 0) - (parseDate(a.createdAt)?.getTime() || 0));
  const acceptedInputCount = batches.filter(b => operatorInputStatuses.includes(b.status) && b.reviewStatus === "accepted").length;
  const rejectedInputCount = batches.filter(b => operatorInputStatuses.includes(b.status) && b.reviewStatus === "rejected").length;
  const dashboardRecordRowsRaw = roleObj?.allowedEntryModes?.length === 1
    ? recordRows.filter(row => row.status === roleObj.allowedEntryModes[0])
    : recordRows;
  const dashboardRecordRows = getDashboardRecentRows(dashboardRecordRowsRaw);
  const reviewPageSize = 20;
  const normalizedReviewQuery = reviewQuery.trim().toLowerCase();
  const filteredReviewBatches = pendingReviewBatches.filter(b => {
    const latestActivity = [...(b.activities || [])].reverse().find(a => ["Collection", "Transport", "Processing"].includes(a.stage)) || {};
    const matchesStage = reviewStageFilter === "all" || b.status === reviewStageFilter;
    const rowMaterial = reviewRowMaterial(b);
    const haystack = [
      b.batchId, rowMaterial.feedstockType, b.collectorId, b.transportRef, b.processor,
      b.eowProcess, b.loggedBy, latestActivity.actor, b.status,
    ].filter(Boolean).join(" ").toLowerCase();
    return matchesStage && (!normalizedReviewQuery || haystack.includes(normalizedReviewQuery));
  });
  const reviewPageCount = Math.max(1, Math.ceil(filteredReviewBatches.length / reviewPageSize));
  const safeReviewPage = Math.min(reviewPage, reviewPageCount);
  const pagedReviewBatches = filteredReviewBatches.slice((safeReviewPage - 1) * reviewPageSize, safeReviewPage * reviewPageSize);
  const effectiveReviewViewMode = isNarrow ? "card" : reviewViewMode;
  const recordPageSize = 20;
  const normalizedRecordQuery = recordQuery.trim().toLowerCase();
  const filteredRecordRows = recordRows.filter(row => {
    const b = row.batch;
    const loggedDate = parseDate(row.loggedAt);
    const fromDate = recordDateFrom ? parseDate(recordDateFrom) : null;
    const toDate = recordDateTo ? parseDate(recordDateTo) : null;
    const minWeight = recordWeightMin === "" ? null : Number(recordWeightMin);
    const maxWeight = recordWeightMax === "" ? null : Number(recordWeightMax);
    const rowWeight = Number(row.material?.weightKg ?? b.weightKg) || 0;
    const matchesTime = (!fromDate || (loggedDate && loggedDate >= fromDate))
      && (!toDate || (loggedDate && loggedDate <= new Date(toDate.getFullYear(), toDate.getMonth(), toDate.getDate(), 23, 59, 59)));
    const matchesWeight = (minWeight == null || rowWeight >= minWeight)
      && (maxWeight == null || rowWeight <= maxWeight);
    const haystack = [
      b.batchId, row.material?.feedstockType, b.feedstockType, b.collectorId, b.pickupVehicle, b.transportRef, b.processor,
      b.eowProcess, b.loggedBy, row.inputter, row.inputterId, row.inputterIp, row.status, row.loggedAt,
    ].filter(Boolean).join(" ").toLowerCase();
    const matchesQuery = !normalizedRecordQuery || haystack.includes(normalizedRecordQuery);
    return matchesTime && matchesWeight && matchesQuery;
  });
  const recordPageCount = Math.max(1, Math.ceil(filteredRecordRows.length / recordPageSize));
  const safeRecordPage = Math.min(recordPage, recordPageCount);
  const pagedRecordRows = filteredRecordRows.slice((safeRecordPage - 1) * recordPageSize, safeRecordPage * recordPageSize);

  useEffect(() => {
    setRecordPage(1);
  }, [recordQuery, recordDateFrom, recordDateTo, recordWeightMin, recordWeightMax]);

  useEffect(() => {
    setReviewPage(1);
  }, [reviewQuery, reviewStageFilter]);

  // ── Downstream Processing: derived weights ────────────────────────────────
  // Accepted is no longer typed in. It is whatever survives the line:
  //   accepted = input - contamination - rejected
  // Yield variance is therefore the material that did NOT survive, i.e.
  // contamination + rejected, which is exactly input - accepted.
  const dspMaterialsAvail = active?.offtakerMaterials || [];
  const dspSelectedMaterial =
    dspMaterialsAvail.find((m, i) => String(i + 1) === String(dsp.processedMaterialIndex)) || dspMaterialsAvail[0];
  const dspInputKg = Number(dspSelectedMaterial?.weightKg) || 0;
  const dspRejectedKg = Number(dsp.rejectedWeightKg) || 0;
  const dspContaminationKg = Number(dsp.contaminationKg) || 0;
  const dspOverAllocated = dspRejectedKg + dspContaminationKg > dspInputKg;
  const dspAcceptedKg = Math.max(0, dspInputKg - dspContaminationKg - dspRejectedKg);
  const dspYieldVarianceKg = dspInputKg - dspAcceptedKg;
  const dspYieldVariancePct = dspInputKg > 0 ? (dspYieldVarianceKg / dspInputKg) * 100 : 0;

  // ── Render ─────────────────────────────────────────────────────────────────
  if (!role) return <LoginScreen onLogin={r => { setRole(r); setTab("dashboard"); }} lang={lang} setLang={setLang} />;

	  const NAV = [
	    { key: "dashboard", label: t("dashboard") },
	    { key: "log",       label: t("newBatch"),  gate: "log" },
	    { key: "verify",    label: t("adminReviewTitle"), gate: "verify" },
		    { key: "records",   label: t("records"), gate: "records" },
	    { key: "custody",   label: t("chainOfCustody"), gate: "custody" },
	    { key: "analytics", label: t("analyticsTitle"), gate: "settings" },
	    { key: "settings",  label: t("settings"),  gate: "settings" },
  ].filter(n => !n.gate || canAccess(n.gate));
  const detailHandwritten = getHandwrittenWeighing(detailView);

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

      {ocrLoading && (
        <div style={{ position: "fixed", bottom: 112, right: 16, zIndex: 1900, background: C.orange, color: "#fff", padding: "6px 14px", borderRadius: 8, fontSize: 11, fontWeight: 600, opacity: 0.92 }}>Reading handwritten photo…</div>
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
                {detailView.detailMaterialIndex && <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>Material line {detailView.detailMaterialIndex}</div>}
              </div>
              <Badge status={detailView.status} lang={lang} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 24px", marginBottom: 16 }}>
              {[
                [t("weight"), `${Number(detailView.weightKg).toLocaleString()} kg`],
	                [t("collector"), detailView.collectorId],
	                ["Weighing Equip.", detailView.weighingEquipId],
	                [t("pickupVehicleLabel"), detailView.pickupVehicle],
	                ["Collection Date", fmtDateTime(detailView.collectionDate)],
                [t("transportRefShort"), detailView.transportRef],
                [t("transportDate"), fmtDateTime(detailView.transportDate)],
                ["Processor", detailView.processor],
                ["EoW Process", eowLabel(detailView.eowProcess)],
                [t("procEndDate"), fmtDateTime(detailView.processingEndDate)],
                ["Material Processed", detailView.processedFeedstockType],
                ["Accepted Weight", detailView.acceptedWeightKg ? `${Number(detailView.acceptedWeightKg).toLocaleString()} kg` : ""],
                ["Rejected Weight", detailView.rejectedWeightKg ? `${Number(detailView.rejectedWeightKg).toLocaleString()} kg` : ""],
                [t("offtakerTransportRef"), detailView.offtakerTransportRef],
                [t("offtakerTransportDate"), fmtDateTime(detailView.offtakerTransportDate)],
                [t("offtakerPlateNo"), detailView.offtakerPlateNo],
                ["Downstream Facility", detailView.downstreamFacility],
                [t("downstreamMaterialProcessed"), detailView.downstreamProcessedFeedstockType],
                [t("downstreamEowProcess"), detailView.downstreamEowProcess],
                [t("downstreamProcEndDate"), fmtDateTime(detailView.downstreamProcessingEndDate)],
                ["Downstream Accepted Weight", detailView.downstreamAcceptedWeightKg ? `${Number(detailView.downstreamAcceptedWeightKg).toLocaleString()} kg` : ""],
                ["Downstream Rejected Weight", detailView.downstreamRejectedWeightKg ? `${Number(detailView.downstreamRejectedWeightKg).toLocaleString()} kg` : ""],
                ["Downstream Yield Variance", detailView.downstreamYieldVarianceKg !== null && detailView.downstreamYieldVarianceKg !== undefined && detailView.downstreamYieldVarianceKg !== "" ? `${Number(detailView.downstreamYieldVarianceKg).toLocaleString()} kg (${Number(detailView.downstreamYieldVariancePct || 0).toFixed(1)}%)` : ""],
                [t("loggedByLabel"), detailView.loggedBy],
                [t("loggedAt"), fmtDateTime(detailView.createdAt)],
                ...(() => {
                  const ipMap = parseInputterMap(detailView.inputterIp);
                  const devMap = parseInputterMap(detailView.inputterDevice);
                  const rows = [];
                  if (ipMap.collection || devMap.collection) rows.push(
                    [t("collectionInputterIp"), ipMap.collection || "—"],
                    [t("collectionInputterId"), devMap.collection ? extractInputterId(devMap.collection) : "—"],
                  );
                  if (ipMap.transport || devMap.transport) rows.push(
                    [t("transportInputterIp"), ipMap.transport || "—"],
                    [t("transportInputterId"), devMap.transport ? extractInputterId(devMap.transport) : "—"],
                  );
                  if (ipMap.processing || devMap.processing) rows.push(
                    [t("processingInputterIp"), ipMap.processing || "—"],
                    [t("processingInputterId"), devMap.processing ? extractInputterId(devMap.processing) : "—"],
                  );
                  if (ipMap.offtaker_transport || devMap.offtaker_transport) rows.push(
                    [t("offtakerInputterIp"), ipMap.offtaker_transport || "—"],
                    [t("offtakerInputterId"), devMap.offtaker_transport ? extractInputterId(devMap.offtaker_transport) : "—"],
                  );
                  if (ipMap.downstream_processing || devMap.downstream_processing) rows.push(
                    [t("downstreamInputterIp"), ipMap.downstream_processing || "—"],
                    [t("downstreamInputterId"), devMap.downstream_processing ? extractInputterId(devMap.downstream_processing) : "—"],
                  );
                  return rows;
                })(),
              ].map(([k, v]) => <InfoRow key={k} label={k} value={v} />)}
            </div>
            {Array.isArray(detailView.materials) && detailView.materials.length > 1 && (
              <div style={{ background: C.creamMid, borderRadius: 8, padding: "10px 14px", marginBottom: 14 }}>
                <div style={{ fontSize: 10, fontWeight: 800, color: C.muted, letterSpacing: 0.4, textTransform: "uppercase", marginBottom: 6 }}>Batch Material Lines</div>
                {detailView.materials.map((m, idx) => (
                  <div key={idx} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: detailView.detailMaterialIndex === (m.index || idx + 1) ? C.forest : C.muted, fontWeight: detailView.detailMaterialIndex === (m.index || idx + 1) ? 800 : 600 }}>
                    <span>{m.index || idx + 1}. {m.feedstockType}</span>
                    <span>{Number(m.weightKg).toLocaleString()} kg</span>
                  </div>
                ))}
              </div>
            )}
            {Array.isArray(detailView.processedMaterials) && detailView.processedMaterials.length > 0 && (
              <div style={{ background: C.creamMid, borderRadius: 8, padding: "10px 14px", marginBottom: 14 }}>
                <div style={{ fontSize: 10, fontWeight: 800, color: C.muted, letterSpacing: 0.4, textTransform: "uppercase", marginBottom: 6 }}>Processed Material Lines</div>
                {detailView.processedMaterials.map((m, idx) => (
                  <div key={idx} style={{ marginBottom: idx < detailView.processedMaterials.length - 1 ? 8 : 0, paddingBottom: idx < detailView.processedMaterials.length - 1 ? 8 : 0, borderBottom: idx < detailView.processedMaterials.length - 1 ? `1px solid ${C.creamDark}` : "none" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: C.forest, fontWeight: 800 }}>
                      <span>M{m.processedMaterialIndex} · {m.processedFeedstockType}</span>
                      <span>{Number(m.processedWeightKg || 0).toLocaleString()} kg</span>
                    </div>
                    <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>
                      Accepted {Number(m.acceptedWeightKg || 0).toLocaleString()} kg · Rejected {Number(m.rejectedWeightKg || 0).toLocaleString()} kg
                    </div>
                    {(m.processor || m.eowProcess) && (
                      <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{[m.processor, eowLabel(m.eowProcess)].filter(Boolean).join(" · ")}{m.processingEndDate ? ` · ${fmtDateTime(m.processingEndDate)}` : ""}</div>
                    )}
                  </div>
                ))}
              </div>
            )}
            {Array.isArray(detailView.offtakerMaterials) && detailView.offtakerMaterials.length > 0 && (
              <div style={{ background: C.creamMid, borderRadius: 8, padding: "10px 14px", marginBottom: 14 }}>
                <div style={{ fontSize: 10, fontWeight: 800, color: C.muted, letterSpacing: 0.4, textTransform: "uppercase", marginBottom: 6 }}>Offtaker Transport Material Lines</div>
                {detailView.offtakerMaterials.map((m, idx) => (
                  <div key={idx} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: C.muted, fontWeight: 600 }}>
                    <span>{m.index || idx + 1}. {m.feedstockType}</span>
                    <span>{Number(m.weightKg).toLocaleString()} kg</span>
                  </div>
                ))}
              </div>
            )}
            {detailView.notes && (
              <div style={{ background: C.creamMid, borderRadius: 8, padding: "10px 14px", marginBottom: 14, fontSize: 12, color: C.muted }}>
                <strong>Notes:</strong> {detailView.notes}
              </div>
            )}
            {detailHandwritten && (
              <div style={{ background: "#e8f5e9", border: `1px solid ${C.creamDark}`, borderRadius: 8, padding: "12px 14px", marginBottom: 14 }}>
                <SectionTitle>Handwritten Weighing Identification</SectionTitle>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 18px" }}>
                  {[
                    [t("weighingIdLabel"), detailHandwritten.weighingId],
                    ["Raw Numbers", detailHandwritten.weights?.join(", ")],
                    ["Gross Weight", detailHandwritten.grossWeight ? `${Number(detailHandwritten.grossWeight).toLocaleString()} kg` : ""],
                    ["Total Deduction", detailHandwritten.totalDeduction ? `${Number(detailHandwritten.totalDeduction).toLocaleString()} kg` : ""],
                    ["Net Weight", detailHandwritten.netWeight ? `${Number(detailHandwritten.netWeight).toLocaleString()} kg` : ""],
                    ["Rate", detailHandwritten.rate ? Number(detailHandwritten.rate).toLocaleString("id-ID") : ""],
                    ["Total Amount", detailHandwritten.totalAmount ? `Rp ${Number(detailHandwritten.totalAmount).toLocaleString("id-ID")}` : ""],
                  ].map(([k, v]) => <InfoRow key={k} label={k} value={v} />)}
                </div>
              </div>
            )}
            {detailView.contaminationNote && (
              <div style={{ background: C.creamMid, borderRadius: 8, padding: "10px 14px", marginBottom: 14, fontSize: 12, color: C.charcoal }}>
                <strong>Contamination Notes:</strong> {detailView.contaminationNote}
              </div>
            )}
            {detailView.downstreamContaminationNote && (
              <div style={{ background: C.creamMid, borderRadius: 8, padding: "10px 14px", marginBottom: 14, fontSize: 12, color: C.charcoal }}>
                <strong>Downstream Contamination Notes:</strong> {detailView.downstreamContaminationNote}
              </div>
            )}
            {detailView.rejectionReason && (
              <div style={{ background: "#fee2e2", borderRadius: 8, padding: "10px 14px", marginBottom: 14, fontSize: 12, color: C.red }}>
                <strong>Rejection Reason:</strong> {detailView.rejectionReason}
              </div>
            )}
            <ActivityLog activities={detailView.activities} lang={lang} />

            {/* Signatures */}
            {(detailView.sigCollection || detailView.sigTransport || detailView.sigProcessing || detailView.sigOfftakerTransport || detailView.sigDownstreamProcessing || detailView.sigVerification || detailView.sigCredit) && (
              <div style={{ marginBottom: 14 }}>
                <SectionTitle>{t("digitalSignatures")}</SectionTitle>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {[
                    { label: "Collector",    sig: detailView.sigCollection },
                    { label: "Transport",    sig: detailView.sigTransport },
                    { label: "Processor",   sig: detailView.sigProcessing },
                    { label: "Offtaker Transport", sig: detailView.sigOfftakerTransport },
                    { label: "Downstream Processing", sig: detailView.sigDownstreamProcessing },
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
            {(detailView.photoDataUrl || detailView.lapakBillPhotoDataUrl || detailView.downstreamQcReportPhotoDataUrl || detailView.handwrittenWeighingIdDataUrl || detailView.transportPhotoDataUrl || detailView.processingPhotoDataUrl || detailView.contaminationPhotoDataUrl || detailView.offtakerDeliveryPhotoDataUrl || detailView.downstreamProcessingPhotoDataUrl || detailView.downstreamContaminationPhotoDataUrl) && (
              <div style={{ marginBottom: 14 }}>
                <SectionTitle>{t("evidencePhotos")}</SectionTitle>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {detailView.photoDataUrl && (
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 700, color: C.muted, letterSpacing: 0.4, textTransform: "uppercase", marginBottom: 4 }}>Collection Photo — Weighing Process</div>
                      <img src={detailView.photoDataUrl} alt="collection" style={{ width: "100%", borderRadius: 8, objectFit: "contain", maxHeight: 320, background: C.creamMid }} />
                    </div>
                  )}
                  {detailView.lapakBillPhotoDataUrl && (
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 700, color: C.muted, letterSpacing: 0.4, textTransform: "uppercase", marginBottom: 4 }}>{t("lapakBillPhoto")}</div>
                      <img src={detailView.lapakBillPhotoDataUrl} alt="lapak bill" style={{ width: "100%", borderRadius: 8, objectFit: "contain", maxHeight: 320, background: C.creamMid }} />
                    </div>
                  )}
                  {detailView.handwrittenWeighingIdDataUrl && (
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 700, color: C.muted, letterSpacing: 0.4, textTransform: "uppercase", marginBottom: 4 }}>Handwritten Weighing Identification</div>
                      <img src={detailView.handwrittenWeighingIdDataUrl} alt="handwritten weighing identification" style={{ width: "100%", borderRadius: 8, objectFit: "contain", maxHeight: 320, background: C.creamMid }} />
                    </div>
                  )}
                  {detailView.transportPhotoDataUrl && (
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 700, color: C.muted, letterSpacing: 0.4, textTransform: "uppercase", marginBottom: 4 }}>Transport</div>
                      <img src={detailView.transportPhotoDataUrl} alt="transport" style={{ width: "100%", borderRadius: 8, objectFit: "contain", maxHeight: 320, background: C.creamMid }} />
                    </div>
                  )}
                  {detailView.processingPhotoDataUrl && (
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 700, color: C.muted, letterSpacing: 0.4, textTransform: "uppercase", marginBottom: 4 }}>Processing</div>
                      <img src={detailView.processingPhotoDataUrl} alt="processing" style={{ width: "100%", borderRadius: 8, objectFit: "contain", maxHeight: 320, background: C.creamMid }} />
                    </div>
                  )}
                  {detailView.contaminationPhotoDataUrl && (
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 700, color: C.muted, letterSpacing: 0.4, textTransform: "uppercase", marginBottom: 4 }}>Contamination</div>
                      <img src={detailView.contaminationPhotoDataUrl} alt="contamination" style={{ width: "100%", borderRadius: 8, objectFit: "contain", maxHeight: 320, background: C.creamMid }} />
                    </div>
                  )}
                  {detailView.offtakerDeliveryPhotoDataUrl && (
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 700, color: C.muted, letterSpacing: 0.4, textTransform: "uppercase", marginBottom: 4 }}>Offtaker Delivery Order</div>
                      <img src={detailView.offtakerDeliveryPhotoDataUrl} alt="offtaker delivery order" style={{ width: "100%", borderRadius: 8, objectFit: "contain", maxHeight: 320, background: C.creamMid }} />
                    </div>
                  )}
                  {detailView.downstreamProcessingPhotoDataUrl && (
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 700, color: C.muted, letterSpacing: 0.4, textTransform: "uppercase", marginBottom: 4 }}>Downstream Processing</div>
                      <img src={detailView.downstreamProcessingPhotoDataUrl} alt="downstream processing" style={{ width: "100%", borderRadius: 8, objectFit: "contain", maxHeight: 320, background: C.creamMid }} />
                    </div>
                  )}
                  {detailView.downstreamQcReportPhotoDataUrl && (
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 700, color: C.muted, letterSpacing: 0.4, textTransform: "uppercase", marginBottom: 4 }}>{t("qcReportPhoto")}</div>
                      <img src={detailView.downstreamQcReportPhotoDataUrl} alt="qc report" style={{ width: "100%", borderRadius: 8, objectFit: "contain", maxHeight: 320, background: C.creamMid }} />
                    </div>
                  )}
                  {detailView.downstreamContaminationPhotoDataUrl && (
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 700, color: C.muted, letterSpacing: 0.4, textTransform: "uppercase", marginBottom: 4 }}>Downstream Contamination</div>
                      <img src={detailView.downstreamContaminationPhotoDataUrl} alt="downstream contamination" style={{ width: "100%", borderRadius: 8, objectFit: "contain", maxHeight: 320, background: C.creamMid }} />
                    </div>
                  )}
                </div>
              </div>
            )}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {detailView.status === "credited" && (
                <Btn small onClick={() => { setCertView(detailView); setDetailView(null); }} variant="primary">{t("viewPCC")}</Btn>
              )}
              {canAccess("verify") && operatorInputStatuses.includes(detailView.status) && (detailView.reviewStatus || "pending") === "pending" && !(detailView.activities || []).some(a => a.stage === "Admin Rejected" || a.stage === "Admin Accepted") && (
                <>
                  <Btn small onClick={() => { approveBatchInput(detailView.id); setDetailView(null); }} variant="blue">{t("acceptInput")}</Btn>
                  <Btn small onClick={() => { setRejectTarget(detailView.id); setDetailView(null); }} variant="danger">{t("reject")}</Btn>
                </>
              )}
              {canAccess("verify") && detailView.reviewStatus === "rejected" && (
                <Btn small onClick={() => deleteRejectedBatch(detailView.id)} variant="danger">{t("deleteBatchLabel")}</Btn>
              )}
              <Btn small onClick={() => setDetailView(null)} variant="ghost">{t("close")}</Btn>
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
            onClick={handleLogoTap}
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
            <button key={n.key} onClick={() => n.key === "log" ? openNewBatch() : setTab(n.key)} style={{
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
        <div style={{
          width: "100%",
          maxWidth: tab === "records" || tab === "analytics" || tab === "verify" || tab === "custody" ? 980 : 640,
          margin: "0 auto",
          padding: "20px 16px",
          boxSizing: "border-box",
        }}>

          {/* ════════════════ DASHBOARD ════════════════ */}
          {tab === "dashboard" && (
            <div>
              <div style={{ marginBottom: 20 }}>
                <h1 style={{ fontSize: 24, fontWeight: 800, color: C.forest, fontFamily: "'DM Sans', sans-serif", margin: 0 }}>Hub Depok-01</h1>
                <p style={{ color: C.muted, fontSize: 13, marginTop: 3 }}>{t("livePilot")} <strong style={{ color: C.charcoal }}>{roleObj.name}</strong></p>
              </div>

	              <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12, marginBottom: 20 }}>
	                {[
	                  { label: t("totalPlasticLogged"), val: `${totalKg.toLocaleString()} kg`, sub: `${(totalKg/1000).toFixed(3)} MT` },
	                  { label: t("totalBatches"), val: visibleBatches.length },
	                  { label: t("pendingAdminReview"), val: pendingReviewBatches.length, warn: pendingReviewBatches.length > 0 },
	                  { label: t("acceptedInputs"), val: acceptedInputCount, sub: `${rejectedInputCount} ${t("rejectedSuffix")}` },
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
                {/* Full operational chain, in order: collection → downstream processing */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(96px, 1fr))", gap: 8 }}>
                  {[
                    { label: t("stageCollection"),           s: "collection",            color: "#e07020" },
                    { label: t("stageTransport"),            s: "transport",             color: C.blue },
                    { label: t("stageProcessing"),           s: "processing",            color: "#92600a" },
                    { label: t("stageOfftakerTransport"),    s: "offtaker_transport",    color: "#0e7490" },
                    { label: t("stageDownstreamProcessing"), s: "downstream_processing", color: "#075985" },
                  ].map((x) => (
                    <div key={x.s} style={{ background: `${x.color}14`, borderRadius: 10, padding: "10px 8px", textAlign: "center", border: `1px solid ${x.color}22` }}>
                      <div style={{ fontSize: 20, fontWeight: 800, color: x.color, fontFamily: "'DM Mono', monospace" }}>{byStatus(x.s)}</div>
                      <div style={{ fontSize: 9, color: C.muted, fontWeight: 700, marginTop: 2, textTransform: "uppercase", letterSpacing: 0.3, lineHeight: 1.3 }}>{x.label}</div>
                    </div>
                  ))}
                </div>

                {/* Exception state — kept out of the chain */}
                <div style={{ marginTop: 12, paddingTop: 10, borderTop: `1px dashed ${C.creamDark}`, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                  <span style={{ fontSize: 9, color: C.mutedLight, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.4 }}>{t("exceptionsLabel")}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <span style={{ fontSize: 9, color: C.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.3 }}>{t("adminRejected")}</span>
                    <span style={{ fontSize: 16, fontWeight: 800, color: C.red, fontFamily: "'DM Mono', monospace" }}>{rejectedInputCount}</span>
                  </div>
                </div>
              </Card>

              {dashboardRecordRows.length === 0 ? (
                <Card>
                  <div style={{ textAlign: "center", padding: "24px 0", color: C.muted }}>
                    <div style={{ fontSize: 32, marginBottom: 8 }}>📦</div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>
                      {visibleBatches.length === 0 ? t("noBatchesYet") : t("noRecentForCategory")}
                    </div>
                    {canAccess("log") && <div style={{ fontSize: 13, marginTop: 6 }}>{t("goToNewBatch")}</div>}
                  </div>
                </Card>
              ) : (
                <Card accent>
                  <SectionTitle>{t("recentBatches")}</SectionTitle>
                  {dashboardRecordRows.slice(0, 6).map(row => {
                    const b = row.batch;
                    const material = row.material || {};
                    const geo = row.geo || getCollectionGeo(b);
                    return (
                      <div key={row.key} onClick={() => setDetailView(detailForMaterial(b, material, row.materialIndex))} style={{ padding: "10px 0", borderBottom: `1px solid ${C.creamDark}`, cursor: "pointer" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                          <div>
                            <span style={{ fontFamily: "'DM Mono', monospace", color: C.forest, fontWeight: 700, fontSize: 12 }}>{b.batchId}</span>
                            <span style={{ color: C.muted, marginLeft: 10, fontSize: 12 }}>{material.feedstockType || b.feedstockType} · {Number(material.weightKg ?? b.weightKg).toLocaleString()} kg</span>
                          </div>
                          <Badge status={row.status || b.status} lang={lang} />
                        </div>
                        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                          <span style={{ fontSize: 11, color: C.mutedLight }}>
                            🕐 {fmtDateTime(firstValidDate(b.createdAt, b.collectionDate, b.issuedAt))}
                          </span>
                          <a href={`https://www.google.com/maps?q=${geo.lat},${geo.lng}`} target="_blank" rel="noreferrer"
                            onClick={e => e.stopPropagation()}
                            style={{ fontSize: 11, color: C.forest, textDecoration: "none", fontFamily: "'DM Mono', monospace" }}>
                            📍 {Number(geo.lat).toFixed(5)}, {Number(geo.lng).toFixed(5)}{geo.accuracy ? ` ±${geo.accuracy}m` : ""}{geo.fallback ? " hub operator" : ""}
                          </a>
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
              <h1 style={{ fontSize: 24, fontWeight: 800, color: C.forest, fontFamily: "'DM Sans', sans-serif", margin: "0 0 4px" }}>{t("newBatch")}</h1>
              <p style={{ color: C.muted, fontSize: 13, margin: "0 0 20px" }}>
                {entryMode ? `${t("chainOfCustody")} · ${t(STAGE_KEYS[stage - 1])}` : t("chooseOperatorInput")}
              </p>

              {!entryMode && (
                <Card accent>
                  <SectionTitle>{t("selectOperatorInput")}</SectionTitle>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12, width: "100%", boxSizing: "border-box" }}>
                    {entryOptions.map(opt => (
                      <button key={opt.mode} onClick={() => chooseEntryMode(opt.mode)} style={{
                        textAlign: "left",
                        border: `1px solid ${opt.color}55`,
                        background: `${opt.color}12`,
                        borderRadius: 10,
                        padding: "14px 16px",
                        cursor: "pointer",
                        fontFamily: "inherit",
                        minHeight: 116,
                        width: "100%",
                        boxSizing: "border-box",
                        minWidth: 0,
                      }}>
                        <div style={{ width: 34, height: 34, borderRadius: "50%", background: opt.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, marginBottom: 10 }}>
                          {opt.icon}
                        </div>
                        <div style={{ fontSize: 15, fontWeight: 800, color: C.charcoal, marginBottom: 5 }}>{opt.title}</div>
                        <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.35 }}>{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                </Card>
              )}

              {entryMode && <Card accent>
                <div style={{ marginBottom: 14 }}>
                  <StageBar current={stage} lang={lang} isMobile={isMobile} />
                  {role === "admin" && (
                    <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
                      <Btn small onClick={() => resetNewBatchForm()} variant="ghost">{t("changeInput")}</Btn>
                    </div>
                  )}
                </div>

                {/* Stage 1 */}
                {entryMode === "collection" && stage === 1 && (
                  <div>
                    <SectionTitle>{t("stage1Title")}</SectionTitle>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 13, marginBottom: 13 }}>
                      <Inp label={t("batchId")} value={directMeta.batchId} onChange={() => {}} disabled />
                      <div>
                        <Lbl>{t("materialsLabel")}</Lbl>
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                          {(col.materials || []).map((m, idx) => (
                            <div key={idx} style={{ display: "grid", gridTemplateColumns: "1fr 120px auto", gap: 8, alignItems: "end" }}>
                              <Sel label={idx === 0 ? t("materialType") : ""} value={m.feedstockType} onChange={v => setCol(p => {
                                const next = [...(p.materials || [])];
                                next[idx] = { ...next[idx], feedstockType: v };
                                return { ...p, materials: next };
                              })} options={FEEDSTOCK_TYPES} required />
                              <Inp label={idx === 0 ? t("grossWeight") : ""} type="number" value={m.weightKg} onChange={v => setCol(p => {
                                const next = [...(p.materials || [])];
                                next[idx] = { ...next[idx], weightKg: v };
                                return { ...p, materials: next };
                              })} placeholder="kg" required />
                              <Btn small onClick={() => setCol(p => ({ ...p, materials: (p.materials || []).filter((_, i) => i !== idx) }))} disabled={(col.materials || []).length <= 1} variant="ghost">{t("remove")}</Btn>
                            </div>
                          ))}
                        </div>
                        <div style={{ marginTop: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <Btn small onClick={() => setCol(p => ({ ...p, materials: [...(p.materials || []), { feedstockType: FEEDSTOCK_TYPES[0], weightKg: "" }] }))} variant="secondary">{t("addMaterial")}</Btn>
                          <span style={{ fontSize: 12, fontWeight: 800, color: C.forest, fontFamily: "'DM Mono', monospace" }}>Total {materialTotalKg(col.materials).toLocaleString()} kg</span>
                        </div>
                      </div>
	                      <SearchSel label={t("collector")} value={col.collectorId} onChange={v => setCol(p=>({...p,collectorId:v}))} options={COLLECTORS} required lang={lang} emptyLabel={t("enterLapakName")} placeholder={t("enterLapakName")} />
	                      <Sel label={t("weighingEquip")} value={col.weighingEquipId} onChange={v => setCol(p=>({...p,weighingEquipId:v}))} options={SCALES} required />
                      <Inp label={t("collectionTimestamp")} value={jakartaNowLabel(clockNow)} onChange={() => {}} disabled />
                      {SHOW_MAP_PICKER && <MapPicker value={colGeo} onChange={setColGeo} lang={lang} />}
                    </div>
                    <div style={{ marginBottom: 13 }}>
                      <Lbl>{t("notes")}</Lbl>
                      <textarea value={col.notes} onChange={e => setCol(p=>({...p,notes:e.target.value}))} rows={2} placeholder={t("notesPlaceholder")} style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${C.creamDark}`, background: C.pageBg, fontSize: 13, color: C.charcoal, outline: "none", resize: "vertical", boxSizing: "border-box", fontFamily: "inherit" }} />
                    </div>
                    <div style={{ marginBottom: 18 }}>
                      <Lbl>{t("collectionPhoto")} <span style={{ color: C.orange, fontWeight: 700 }}>*</span></Lbl>
                      <div style={{ fontSize: 11, color: C.muted, marginBottom: 6 }}>{t("weighingPhotoNote")}</div>
                      <input type="file" accept="image/*" capture="environment" onChange={handlePhoto} style={{ fontSize: 12, color: C.muted }} />
                      {col.photoDataUrl && (
                        <div style={{ position: "relative", marginTop: 8 }}>
                          <img src={col.photoDataUrl} alt="preview" style={{ width: "100%", maxHeight: 180, objectFit: "contain", borderRadius: 8, background: C.creamMid }} />
                          <button onClick={() => setCol(p=>({...p,photoDataUrl:null}))} style={{ position: "absolute", top: 6, right: 6, background: "rgba(0,0,0,0.55)", color: "#fff", border: "none", borderRadius: 6, padding: "3px 8px", fontSize: 11, cursor: "pointer" }}>{t("remove")}</button>
                        </div>
                      )}
                    </div>
                    <div style={{ marginBottom: 18 }}>
                      <Lbl>{t("lapakBillPhoto")} <span style={{ color: C.orange, fontWeight: 700 }}>*</span></Lbl>
                      <div style={{ fontSize: 11, color: C.muted, marginBottom: 6 }}>{t("lapakBillPhotoNote")}</div>
                      <input type="file" accept="image/*" capture="environment" onChange={handleLapakBillPhoto} style={{ fontSize: 12, color: C.muted }} />
                      {col.lapakBillPhotoDataUrl && (
                        <div style={{ position: "relative", marginTop: 8 }}>
                          <img src={col.lapakBillPhotoDataUrl} alt="lapak bill" style={{ width: "100%", maxHeight: 180, objectFit: "contain", borderRadius: 8, background: C.creamMid }} />
                          <button onClick={() => setCol(p=>({...p,lapakBillPhotoDataUrl:null}))} style={{ position: "absolute", top: 6, right: 6, background: "rgba(0,0,0,0.55)", color: "#fff", border: "none", borderRadius: 6, padding: "3px 8px", fontSize: 11, cursor: "pointer" }}>{t("remove")}</button>
                        </div>
                      )}
                    </div>
                    {materialTotalKg(col.materials) > 0 && (
                      <div style={{ background: "#e8f5e9", borderRadius: 8, padding: "9px 14px", marginBottom: 16, fontSize: 12, color: C.forest, fontWeight: 600 }}>
                        {materialTotalKg(col.materials).toLocaleString()} kg = {kgToTonnes(materialTotalKg(col.materials)).toFixed(4)} MT
                      </div>
                    )}
                    <SignaturePad label={t("sigCollector")} value={sigCol} onChange={setSigCol} lang={lang} />
                    <div style={{marginTop:12}}><Btn onClick={submitCollection} variant="primary" disabled={!sigCol}>{t("logCollection")}</Btn></div>
                  </div>
                )}

                {/* Stage 2 */}
                {entryMode === "transport" && stage === 2 && (
                  <div>
                    <SectionTitle>{t("stageTransport")}</SectionTitle>
                    <div style={{ marginBottom: 13 }}>
                      {pickupBatches.length > 0 && (
                        <SearchSel
                          label={t("batchAvailableForPickup")}
                          value={active?.batchId || ""}
                          onChange={v => { const b = pickupBatches.find(pb => pb.batchId === v); if (b) setActiveId(b.id); }}
                          options={pickupBatches.map(b => ({ value: b.batchId, label: `${b.batchId} · ${fmtDate(b.collectionDate)} · ${b.collectorId}` }))}
                          placeholder={t("searchBatchId")}
                          lang={lang}
                        />
                      )}
                    </div>
                    {active ? (
                      <div style={{ background: C.creamMid, borderRadius: 10, padding: "11px 15px", marginBottom: 16, fontSize: 13 }}>
                        Batch <span style={{ fontFamily: "'DM Mono', monospace", color: C.forest, fontWeight: 700 }}>{active.batchId}</span> · {active.feedstockType} · {Number(active.weightKg).toLocaleString()} kg
                      </div>
                    ) : (
                      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 13, marginBottom: 13 }}>
                        <Inp label={t("referenceBatchId")} value={directMeta.batchId} onChange={() => {}} disabled />
                        <Sel label={t("feedstockType")} value={directMeta.feedstockType} onChange={v => setDirectMeta(p => ({ ...p, feedstockType: v }))} options={FEEDSTOCK_TYPES} required />
                        <Inp label={t("grossWeight")} type="number" value={directMeta.weightKg} onChange={v => setDirectMeta(p => ({ ...p, weightKg: v }))} placeholder={`${t("egPrefix")} 1500`} required />
                        <SearchSel label={t("collector")} value={directMeta.collectorId} onChange={v => setDirectMeta(p => ({ ...p, collectorId: v }))} options={COLLECTORS} required lang={lang} emptyLabel={t("enterLapakName")} placeholder={t("enterLapakName")} />
                      </div>
                    )}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 13, marginBottom: 13 }}>
                      <Inp label={t("transportRef")} value={active ? (trn.transportRef || generatedManifestRef(active.batchId, clockNow)) : directManifestRef()} onChange={() => {}} disabled />
                      <Inp label={t("transportTimestamp")} value={jakartaNowLabel(clockNow)} onChange={() => {}} disabled />
                      <Sel label={t("materialPickupVehicle")} value={trn.pickupVehicle} onChange={v => setTrn(p=>({...p,pickupVehicle:v}))} options={PICKUP_VEHICLES} required />
                      {SHOW_MAP_PICKER && <MapPicker value={trnGeo} onChange={setTrnGeo} lang={lang} />}
                    </div>
                    <div style={{ marginBottom: 18 }}>
                      <Lbl>{t("transportPhoto")}</Lbl>
                      <input type="file" accept="image/*" capture="environment" onChange={handleTransportPhoto} style={{ fontSize: 12, color: C.muted }} />
                      {trn.photoDataUrl && (
                        <div style={{ position: "relative", marginTop: 8 }}>
                          <img src={trn.photoDataUrl} alt="transport" style={{ width: "100%", maxHeight: 160, objectFit: "cover", borderRadius: 8 }} />
                          <button onClick={() => setTrn(p=>({...p,photoDataUrl:null}))} style={{ position: "absolute", top: 6, right: 6, background: "rgba(0,0,0,0.55)", color: "#fff", border: "none", borderRadius: 6, padding: "3px 8px", fontSize: 11, cursor: "pointer" }}>{t("remove")}</button>
                        </div>
                      )}
                    </div>
                    <SignaturePad label={t("sigTransportOfficer")} value={sigTrn} onChange={setSigTrn} lang={lang} />
                    <div style={{marginTop:12}}><Btn onClick={submitTransport} variant="primary" disabled={!sigTrn}>{t("confirmTransport")}</Btn></div>
                  </div>
                )}

                {/* Stage 3 */}
                {entryMode === "processing" && stage === 3 && (
                  <div>
                    <SectionTitle>{t("stageProcessing")}</SectionTitle>
                    <div style={{ marginBottom: 13 }}>
                      {processBatches.length > 0 ? (
                        <SearchSel
                          label={t("batchAvailableToProcess")}
                          value={active?.batchId || ""}
                          onChange={v => { const b = processBatches.find(pb => pb.batchId === v); if (b) setActiveId(b.id); }}
                          options={processBatches.map(b => ({ value: b.batchId, label: `${b.batchId} · ${fmtDate(b.collectionDate)} · ${b.collectorId}` }))}
                          placeholder={t("searchBatchId")}
                          lang={lang}
                        />
                      ) : (
                        <div style={{ background: "#fff8e1", border: `1px solid #f0d58a`, borderRadius: 10, padding: "10px 14px", fontSize: 12, color: "#7a5800" }}>
                          {t("noBatchesAtProcessingFacility")}
                        </div>
                      )}
                    </div>
                    {!active && (
                      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 13, marginBottom: 13 }}>
                        <Inp label={t("referenceBatchId")} value={directMeta.batchId} onChange={() => {}} disabled />
                        <Sel label={t("feedstockType")} value={directMeta.feedstockType} onChange={v => setDirectMeta(p => ({ ...p, feedstockType: v }))} options={FEEDSTOCK_TYPES} required />
                        <Inp label={t("grossWeight")} type="number" value={directMeta.weightKg} onChange={v => setDirectMeta(p => ({ ...p, weightKg: v }))} placeholder={`${t("egPrefix")} 1500`} required />
                        <SearchSel label={t("collector")} value={directMeta.collectorId} onChange={v => setDirectMeta(p => ({ ...p, collectorId: v }))} options={COLLECTORS} required lang={lang} emptyLabel={t("enterLapakName")} placeholder={t("enterLapakName")} />
                      </div>
                    )}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 13, marginBottom: 13 }}>
                      <Sel label={t("processingFacility")} value={prc.processor} onChange={v => setPrc(p=>({...p,processor:v}))} options={PROCESSING_FACILITIES} required />
                      {prc.processor === "Other" && (
                        <Inp label={t("processingFacilityOther")} value={prc.processorOther} onChange={v => setPrc(p=>({...p,processorOther:v}))} placeholder={t("processingFacilityOtherPlaceholder")} required />
                      )}
                      {(() => {
                        const procMaterialsAll = (active?.materials?.length ? active.materials : [{ index: 1, feedstockType: directMeta.feedstockType, weightKg: directMeta.weightKg }]);
                        const procMaterialsAvail = procMaterialsAll.filter(m => !(active?.processedMaterials || []).some(pm => String(pm.processedMaterialIndex) === String(m.index || 1)));
                        return (
                          <Sel
                            label={t("processedMaterial")}
                            value={prc.processedMaterialIndex}
                            onChange={v => setPrc(p=>({...p,processedMaterialIndex:v}))}
                            options={[{ value: "", label: t("processedMaterialPlaceholder") }, ...procMaterialsAvail.map(m => ({ value: String(m.index || 1), label: `M${m.index || 1} · ${m.feedstockType || "-"} · ${Number(m.weightKg) || 0} kg` }))]}
                            required={procMaterialsAvail.length > 1}
                          />
                        );
                      })()}
                      <Inp label={t("processingTimestamp")} value={jakartaNowLabel(clockNow)} onChange={() => {}} disabled />
                      {SHOW_MAP_PICKER && <MapPicker value={prcGeo} onChange={setPrcGeo} lang={lang} />}
                    </div>
                    {(() => {
                      const procMaterialsAll = (active?.materials?.length ? active.materials : [{ index: 1, feedstockType: directMeta.feedstockType, weightKg: directMeta.weightKg }]);
                      const procMaterialsAvail = procMaterialsAll.filter(m => !(active?.processedMaterials || []).some(pm => String(pm.processedMaterialIndex) === String(m.index || 1)));
                      const procMaterial = procMaterialsAvail.find(m => String(m.index || 1) === String(prc.processedMaterialIndex)) || procMaterialsAvail[0];
                      const processedWeightKg = Number(procMaterial?.weightKg) || 0;
                      const rejectedKg = Number(prc.rejectedWeightKg) || 0;
                      const acceptedKgAuto = Math.max(0, processedWeightKg - rejectedKg);
                      const acceptedKg = acceptedKgAuto;
                      return (
                        <>
                          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 13, marginBottom: 13 }}>
                            <Inp label={`${t("acceptedWeight")} (auto)`} type="number" value={acceptedKgAuto} onChange={() => {}} disabled />
                            <Inp label={t("rejectedWeight")} type="number" value={prc.rejectedWeightKg} onChange={v => setPrc(p=>({...p,rejectedWeightKg:v}))} placeholder={`${t("egPrefix")} 50`} />
                          </div>
                          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 13, marginBottom: 13 }}>
                            <div>
                              <Lbl>{t("contaminationNote")}</Lbl>
                              <textarea value={prc.contaminationNote} onChange={e => setPrc(p=>({...p,contaminationNote:e.target.value}))} rows={3} placeholder={t("contaminationNotePlaceholder")} style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${C.creamDark}`, background: C.white, fontSize: 13, color: C.charcoal, outline: "none", resize: "vertical", boxSizing: "border-box", fontFamily: "inherit" }} />
                            </div>
                          </div>
                          <div style={{ marginBottom: 18, background: C.creamMid, borderRadius: 8, padding: "10px 14px", fontSize: 12, color: C.charcoal }}>
                            <strong>{t("yieldRatio")}:</strong> {(processedWeightKg > 0 ? (acceptedKg / processedWeightKg) * 100 : 0).toFixed(1)}% — {acceptedKg.toLocaleString()} kg accepted of {processedWeightKg.toLocaleString()} kg input ({rejectedKg.toLocaleString()} kg rejected).
                          </div>
                        </>
                      );
                    })()}
                    <div style={{ marginBottom: 18 }}>
                      <Lbl>{t("processingPhoto")}</Lbl>
                      <input type="file" accept="image/*" capture="environment" onChange={handleProcessingPhoto} style={{ fontSize: 12, color: C.muted }} />
                      {prc.photoDataUrl && (
                        <div style={{ position: "relative", marginTop: 8 }}>
                          <img src={prc.photoDataUrl} alt="processing" style={{ width: "100%", maxHeight: 160, objectFit: "cover", borderRadius: 8 }} />
                          <button onClick={() => setPrc(p=>({...p,photoDataUrl:null}))} style={{ position: "absolute", top: 6, right: 6, background: "rgba(0,0,0,0.55)", color: "#fff", border: "none", borderRadius: 6, padding: "3px 8px", fontSize: 11, cursor: "pointer" }}>{t("remove")}</button>
                        </div>
                      )}
                    </div>
                    <div style={{ marginBottom: 18 }}>
                      <Lbl>{t("contaminationPhoto")}</Lbl>
                      <input type="file" accept="image/*" capture="environment" onChange={handleContaminationPhoto} style={{ fontSize: 12, color: C.muted }} />
                      {prc.contaminationPhotoDataUrl && (
                        <div style={{ position: "relative", marginTop: 8 }}>
                          <img src={prc.contaminationPhotoDataUrl} alt="contamination" style={{ width: "100%", maxHeight: 160, objectFit: "cover", borderRadius: 8 }} />
                          <button onClick={() => setPrc(p=>({...p,contaminationPhotoDataUrl:null}))} style={{ position: "absolute", top: 6, right: 6, background: "rgba(0,0,0,0.55)", color: "#fff", border: "none", borderRadius: 6, padding: "3px 8px", fontSize: 11, cursor: "pointer" }}>{t("remove")}</button>
                        </div>
                      )}
                    </div>
                    <SignaturePad label={t("sigProcessor")} value={sigPrc} onChange={setSigPrc} lang={lang} />
                    <div style={{marginTop:12}}><Btn onClick={submitProcessing} variant="accent" disabled={!sigPrc}>{t("confirmProcessing")}</Btn></div>
                  </div>
                )}

                {/* Stage 4 */}
                {entryMode === "offtaker_transport" && stage === 4 && (
                  <div>
                    <SectionTitle>{t("stageOfftakerTransport")}</SectionTitle>
                    <div style={{ marginBottom: 13 }}>
                      <Lbl>{t("materialsLabel")}</Lbl>
                      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {(oft.materials || []).map((m, idx) => (
                          <div key={idx} style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 8, alignItems: isMobile ? "stretch" : "end" }}>
                            <div style={{ flex: "1 1 auto", minWidth: 0 }}>
                              <Sel label={idx === 0 ? t("feedstockType") : ""} value={m.feedstockType} onChange={v => setOft(p => {
                                const next = [...(p.materials || [])];
                                next[idx] = { ...next[idx], feedstockType: v };
                                return { ...p, materials: next };
                              })} options={OFFTAKER_FEEDSTOCK_TYPES} required />
                              <Sel label={idx === 0 ? t("processingFacility") : ""} value={m.processor || ""} onChange={v => setOft(p => {
                                const next = [...(p.materials || [])];
                                next[idx] = { ...next[idx], processor: v };
                                return { ...p, materials: next };
                              })} options={[{ value: "", label: t("allFacilities") }, ...PROCESSING_FACILITIES.map(f => ({ value: f, label: f }))]} />
                            </div>
                            <div style={{ display: "flex", gap: 8, alignItems: "end" }}>
                              <div style={{ flex: isMobile ? "1 1 auto" : "0 0 120px", minWidth: 0 }}>
                                <Inp label={idx === 0 ? t("weightKgLabel") : ""} type="number" value={m.weightKg} onChange={v => setOft(p => {
                                  const next = [...(p.materials || [])];
                                  next[idx] = { ...next[idx], weightKg: v };
                                  return { ...p, materials: next };
                                })} placeholder="kg" required />
                              </div>
                              <Btn small onClick={() => setOft(p => ({ ...p, materials: (p.materials || []).filter((_, i) => i !== idx) }))} disabled={(oft.materials || []).length <= 1} variant="ghost">{t("remove")}</Btn>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div style={{ marginTop: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Btn small onClick={() => setOft(p => ({ ...p, materials: [...(p.materials || []), { feedstockType: OFFTAKER_FEEDSTOCK_TYPES[0], weightKg: "", processor: "" }] }))} variant="secondary">{t("addMaterial")}</Btn>
                        <span style={{ fontSize: 12, fontWeight: 800, color: C.forest, fontFamily: "'DM Mono', monospace" }}>Total {materialTotalKg(oft.materials).toLocaleString()} kg</span>
                      </div>
                    </div>
                    <div style={{ marginBottom: 13 }}>
                      <Lbl>{t("batchesAvailableOfftaker")}</Lbl>
                      {offtakerLinesFiltered.length > 0 ? (
                        <>
                          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                            {offtakerLinesPaged.map(({ b, line, key }) => {
                              const checked = (oft.selectedLines || []).some(s => `${s.batchRef}::${s.index}` === key);
                              return (
                                <label key={key} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10, border: `1px solid ${checked ? C.forest : C.creamDark}`, background: checked ? C.creamMid : C.cardBg, cursor: checked ? "default" : "pointer", opacity: checked ? 0.75 : 1 }}>
                                  <input
                                    type="checkbox"
                                    checked={checked}
                                    disabled={checked}
                                    onChange={() => {
                                      if (checked) return;
                                      setOft(p => ({ ...p, selectedLines: [...(p.selectedLines || []), { batchRef: b.id, index: String(line.index), feedstockType: line.feedstockType, weightKg: line.weightKg, processor: line.processor }] }));
                                    }}
                                    style={{ width: 20, height: 20, accentColor: C.forest, flexShrink: 0 }}
                                  />
                                  <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontSize: 13, fontWeight: 700, color: C.charcoal, fontFamily: "'DM Mono', monospace" }}>{b.batchId} · M{line.index}</div>
                                    <div style={{ fontSize: 11, color: C.muted }}>{fmtDate(b.collectionDate)} · {b.collectorId}</div>
                                    <div style={{ fontSize: 11, color: C.muted }}>{line.feedstockType} · {Number(line.weightKg || 0).toLocaleString()} kg{line.processor ? ` · ${line.processor}` : ""}</div>
                                  </div>
                                  {checked && <span style={{ fontSize: 11, fontWeight: 800, color: C.forest, flexShrink: 0 }}>{t("addedLabel")}</span>}
                                </label>
                              );
                            })}
                          </div>
                          {offtakerPageCount > 1 && (
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
                              <Btn small onClick={() => setOfftakerPage(p => Math.max(0, p - 1))} disabled={offtakerPage === 0} variant="ghost">{t("prevLabel")}</Btn>
                              <span style={{ fontSize: 12, color: C.muted }}>{t("pageLabel")} {offtakerPage + 1} / {offtakerPageCount}</span>
                              <Btn small onClick={() => setOfftakerPage(p => Math.min(offtakerPageCount - 1, p + 1))} disabled={offtakerPage >= offtakerPageCount - 1} variant="ghost">{t("nextLabel")}</Btn>
                            </div>
                          )}
                        </>
                      ) : (
                        <div style={{ background: "#fff8e1", border: `1px solid #f0d58a`, borderRadius: 10, padding: "10px 14px", fontSize: 12, color: "#7a5800" }}>
                          {offtakerBatches.length > 0 ? t("noProcessedMatch") : t("noProcessedAwaiting")}
                        </div>
                      )}
                    </div>
                    {offtakerSelectedLines.length > 0 && (
                      <div style={{ background: C.creamMid, borderRadius: 10, padding: "11px 15px", marginBottom: 16, fontSize: 13 }}>
                        <div style={{ fontWeight: 800, color: C.forest, marginBottom: 6 }}>{t("selectedForTransport")} ({offtakerSelectedLines.length})</div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                          {offtakerSelectedLines.map(({ b, line, key }) => (
                            <div key={key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                              <span style={{ fontFamily: "'DM Mono', monospace", color: C.forest, fontWeight: 700 }}>{b.batchId} · M{line.index}</span>
                              <span style={{ flex: 1, textAlign: isMobile ? "left" : "right" }}>{line.feedstockType} · {Number(line.weightKg || 0).toLocaleString()} kg</span>
                              <Btn small onClick={() => setOft(p => ({ ...p, selectedLines: (p.selectedLines || []).filter(s => `${s.batchRef}::${s.index}` !== key) }))} variant="ghost">{t("remove")}</Btn>
                            </div>
                          ))}
                        </div>
                        <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.creamDark}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontWeight: 800, color: C.forest }}>{t("totalSelectedWeight")}</span>
                          <span style={{ fontSize: 13, fontWeight: 800, color: C.forest, fontFamily: "'DM Mono', monospace" }}>
                            {offtakerSelectedLines.reduce((sum, { line }) => sum + Number(line.weightKg || 0), 0).toLocaleString()} kg
                          </span>
                        </div>
                      </div>
                    )}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 13, marginBottom: 13 }}>
                      <Inp label={t("transportRef")} value={offtakerSelectedLines.length > 0 ? (oft.transportRef || generatedManifestRef(offtakerSelectedLines[0].b.batchId, clockNow)) : ""} onChange={() => {}} disabled />
                      <Inp label={t("transportTimestamp")} value={jakartaNowLabel(clockNow)} onChange={() => {}} disabled />
                      <Sel label={t("materialPlateNo")} value={oft.plateNo} onChange={v => setOft(p=>({...p,plateNo:v}))} options={OFFTAKER_PLATE_NUMBERS} required />
                      {SHOW_MAP_PICKER && <MapPicker value={oftGeo} onChange={setOftGeo} lang={lang} />}
                    </div>
                    <div style={{ marginBottom: 18 }}>
                      <Lbl>{t("photoDeliveryOrder")}</Lbl>
                      <input type="file" accept="image/*" capture="environment" onChange={handleOfftakerTransportPhoto} style={{ fontSize: 12, color: C.muted }} />
                      {oft.photoDataUrl && (
                        <div style={{ position: "relative", marginTop: 8 }}>
                          <img src={oft.photoDataUrl} alt="delivery order" style={{ width: "100%", maxHeight: 160, objectFit: "cover", borderRadius: 8 }} />
                          <button onClick={() => setOft(p=>({...p,photoDataUrl:null}))} style={{ position: "absolute", top: 6, right: 6, background: "rgba(0,0,0,0.55)", color: "#fff", border: "none", borderRadius: 6, padding: "3px 8px", fontSize: 11, cursor: "pointer" }}>{t("remove")}</button>
                        </div>
                      )}
                    </div>
                    <SignaturePad label={t("sigOfftakerTransport")} value={sigOft} onChange={setSigOft} lang={lang} />
                    <div style={{marginTop:12}}><Btn onClick={submitOfftakerTransport} variant="primary" disabled={!sigOft}>{t("confirmOfftakerTransport")}</Btn></div>
                  </div>
                )}

                {/* Stage 5 */}
                {entryMode === "downstream_processing" && stage === 5 && (
                  <div>
                    <SectionTitle>{t("stageDownstreamProcessing")}</SectionTitle>
                    <div style={{ marginBottom: 13 }}>
                      {downstreamBatches.length > 0 ? (
                        <SearchSel
                          label={t("batchAvailableDownstream")}
                          value={active?.batchId || ""}
                          onChange={v => { const b = downstreamBatches.find(pb => pb.batchId === v); if (b) setActiveId(b.id); }}
                          options={downstreamBatches.map(b => ({ value: b.batchId, label: `${b.batchId} · ${fmtDate(b.collectionDate)} · ${b.collectorId}` }))}
                          placeholder={t("searchBatchId")}
                          lang={lang}
                        />
                      ) : (
                        <div style={{ background: "#fff8e1", border: `1px solid #f0d58a`, borderRadius: 10, padding: "10px 14px", fontSize: 12, color: "#7a5800" }}>
                          {t("noBatchesAtOfftakers")}
                        </div>
                      )}
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 13, marginBottom: 13 }}>
                      <Sel label={t("downstreamFacility")} value={dsp.facility} onChange={v => setDsp(p=>({...p,facility:v}))} options={DOWNSTREAM_FACILITIES} required />
                      {dsp.facility === "Other" && (
                        <Inp label={t("downstreamFacilityOther")} value={dsp.facilityOther} onChange={v => setDsp(p=>({...p,facilityOther:v}))} placeholder={t("enterFacilityName")} required />
                      )}
                      {(() => {
                        const dspMaterialsAvail = active?.offtakerMaterials || [];
                        return (
                          <Sel
                            label={t("processedMaterial")}
                            value={dsp.processedMaterialIndex}
                            onChange={v => setDsp(p=>({...p,processedMaterialIndex:v}))}
                            options={[{ value: "", label: t("processedMaterialPlaceholder") }, ...dspMaterialsAvail.map((m, i) => ({ value: String(i + 1), label: `M${i + 1} · ${m.feedstockType || "-"} · ${Number(m.weightKg) || 0} kg` }))]}
                            required={dspMaterialsAvail.length > 1}
                          />
                        );
                      })()}
                      <Sel label={t("eowProcess")} value={dsp.eowProcess} onChange={v => setDsp(p=>({...p,eowProcess:v}))} options={EOW_PROCESS_OPTIONS} required />
                      <Inp label={t("processingTimestamp")} value={jakartaNowLabel(clockNow)} onChange={() => {}} disabled />
                      {SHOW_MAP_PICKER && <MapPicker value={dspGeo} onChange={setDspGeo} lang={lang} />}
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 13, marginBottom: 13 }}>
                      <Inp label={t("rejectedWeight")} type="number" value={dsp.rejectedWeightKg} onChange={v => setDsp(p=>({...p,rejectedWeightKg:v}))} placeholder={`${t("egPrefix")} 50`} />
                      <Inp label={t("contaminationVolume")} type="number" value={dsp.contaminationKg} onChange={v => setDsp(p=>({...p,contaminationKg:v}))} placeholder={`${t("egPrefix")} 15`} />
                    </div>
                    {/* Accepted is derived, never typed: input - contamination - rejected. */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 13, marginBottom: 13 }}>
                      <Inp label={`${t("acceptedWeight")} (${t("autoCalculated")})`} value={`${dspAcceptedKg.toLocaleString()} kg`} onChange={() => {}} disabled />
                      <div>
                        <Lbl>{t("contaminationNote")}</Lbl>
                        <textarea value={dsp.contaminationNote} onChange={e => setDsp(p=>({...p,contaminationNote:e.target.value}))} rows={3} placeholder={t("contaminationNotePlaceholder")} style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${C.creamDark}`, background: C.white, fontSize: 13, color: C.charcoal, outline: "none", resize: "vertical", boxSizing: "border-box", fontFamily: "inherit" }} />
                      </div>
                    </div>
                    {dspOverAllocated && (
                      <div style={{ marginBottom: 12, background: "#fee2e2", border: `1px solid #f3b4ae`, borderRadius: 8, padding: "10px 14px", fontSize: 12, color: C.red, fontWeight: 600 }}>
                        {t("outputExceedsInput")} ({(dspContaminationKg + dspRejectedKg).toLocaleString()} kg &gt; {dspInputKg.toLocaleString()} kg)
                      </div>
                    )}
                    <div style={{ marginBottom: 18, background: C.creamMid, borderRadius: 8, padding: "10px 14px", fontSize: 12, color: C.charcoal }}>
                      <strong>{t("yieldVariance")}:</strong> {dspYieldVarianceKg.toLocaleString()} kg ({dspYieldVariancePct.toFixed(1)}%) — {dspInputKg.toLocaleString()} kg {t("inputLabelShort")} − {dspAcceptedKg.toLocaleString()} kg {t("acceptedLabelShort")} = {dspContaminationKg.toLocaleString()} kg {t("contaminationLabelShort")} + {dspRejectedKg.toLocaleString()} kg {t("rejectedLabelShort")}.
                    </div>
                    <div style={{ marginBottom: 18 }}>
                      <Lbl>{t("processingPhoto")}</Lbl>
                      <input type="file" accept="image/*" capture="environment" onChange={handleDownstreamProcessingPhoto} style={{ fontSize: 12, color: C.muted }} />
                      {dsp.photoDataUrl && (
                        <div style={{ position: "relative", marginTop: 8 }}>
                          <img src={dsp.photoDataUrl} alt="downstream processing" style={{ width: "100%", maxHeight: 160, objectFit: "cover", borderRadius: 8 }} />
                          <button onClick={() => setDsp(p=>({...p,photoDataUrl:null}))} style={{ position: "absolute", top: 6, right: 6, background: "rgba(0,0,0,0.55)", color: "#fff", border: "none", borderRadius: 6, padding: "3px 8px", fontSize: 11, cursor: "pointer" }}>{t("remove")}</button>
                        </div>
                      )}
                    </div>
                    <div style={{ marginBottom: 18 }}>
                      <Lbl>{t("qcReportPhoto")} <span style={{ color: C.orange, fontWeight: 700 }}>*</span></Lbl>
                      <div style={{ fontSize: 11, color: C.muted, marginBottom: 6 }}>{t("qcReportPhotoNote")}</div>
                      <input type="file" accept="image/*" capture="environment" onChange={handleDownstreamQcReportPhoto} style={{ fontSize: 12, color: C.muted }} />
                      {dsp.qcReportPhotoDataUrl && (
                        <div style={{ position: "relative", marginTop: 8 }}>
                          <img src={dsp.qcReportPhotoDataUrl} alt="qc report" style={{ width: "100%", maxHeight: 180, objectFit: "contain", borderRadius: 8, background: C.creamMid }} />
                          <button onClick={() => setDsp(p=>({...p,qcReportPhotoDataUrl:null}))} style={{ position: "absolute", top: 6, right: 6, background: "rgba(0,0,0,0.55)", color: "#fff", border: "none", borderRadius: 6, padding: "3px 8px", fontSize: 11, cursor: "pointer" }}>{t("remove")}</button>
                        </div>
                      )}
                    </div>
                    <SignaturePad label={t("sigDownstreamProcessor")} value={sigDsp} onChange={setSigDsp} lang={lang} />
                    <div style={{marginTop:12}}><Btn onClick={submitDownstreamProcessing} variant="accent" disabled={!sigDsp}>{t("confirmDownstreamProcessing")}</Btn></div>
                  </div>
                )}
              </Card>}
            </div>
          )}

	          {/* ════════════════ VERIFY TAB ════════════════ */}
	          {tab === "verify" && canAccess("verify") && (
	            <div>
	              <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "stretch" : "flex-end", gap: 12, marginBottom: 20 }}>
	                <div>
	                  <h1 style={{ fontSize: isMobile ? 28 : 24, lineHeight: 1.08, fontWeight: 800, color: C.forest, fontFamily: "'DM Sans', sans-serif", margin: "0 0 4px" }}>{t("adminReviewTitle")}</h1>
	                  <p style={{ color: C.muted, fontSize: 13, margin: 0 }}>{t("adminReviewSubtitle")} · {roleObj.name}</p>
	                </div>
		                <div style={{ display: "flex", alignItems: "center", justifyContent: isMobile ? "space-between" : "flex-start", gap: 8, flexShrink: 0, flexWrap: "wrap" }}>
		                  <Btn small onClick={() => refreshBatchesFromSheet(true)} variant="secondary" disabled={!sheetsUrl}>{t("refreshData")}</Btn>
		                  {/* Hidden below the table's minimum width: the list option
		                      cannot be honoured there, so offering it is misleading. */}
		                  <div style={{ display: isNarrow ? "none" : "flex", background: C.creamDark, borderRadius: 8, padding: 3 }}>
		                    {[
		                      { key: "list", label: t("listView") },
		                      { key: "card", label: t("cardView") },
		                    ].map(opt => (
		                      <button key={opt.key} onClick={() => setReviewViewMode(opt.key)} style={{
		                        border: "none",
		                        background: reviewViewMode === opt.key ? C.forest : "transparent",
		                        color: reviewViewMode === opt.key ? "#fff" : C.muted,
		                        borderRadius: 6,
		                        padding: "6px 10px",
		                        fontSize: 11,
		                        fontWeight: 800,
		                        cursor: "pointer",
		                        fontFamily: "inherit",
		                      }}>{opt.label}</button>
		                    ))}
		                  </div>
		                </div>
	              </div>

	              <Card style={{ marginBottom: 12 }}>
	                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1.4fr 0.8fr", gap: 12, alignItems: "end" }}>
	                  <Inp label={t("findReviewItems")} value={reviewQuery} onChange={setReviewQuery} placeholder={t("searchRecordsPlaceholder")} />
	                  <Sel label={t("filterInput")} value={reviewStageFilter} onChange={setReviewStageFilter} options={[
	                    { value: "all", label: t("filterAll") },
	                    { value: "collection", label: t("statusCollection") },
	                    { value: "transport", label: t("statusTransport") },
	                    { value: "processing", label: t("statusProcessing") },
	                  ]} />
	                </div>
	              </Card>

	              {filteredReviewBatches.length === 0 ? (
	                <Card>
	                  <div style={{ textAlign: "center", padding: "24px 0", color: C.muted }}>
	                    <div style={{ fontSize: 28, marginBottom: 8 }}>✓</div>
	                    <div style={{ fontSize: 14, fontWeight: 600 }}>{t("noPendingReview")}</div>
	                  </div>
	                </Card>
	              ) : effectiveReviewViewMode === "list" ? (
	                <div style={{ width: "100%", borderRadius: 14, border: `1px solid ${C.creamDark}`, background: C.white, overflow: "hidden" }}>
	                {/* overflowX must be auto at every width, not just mobile: between
	                    681px and ~980px the table was squeezed with overflow hidden, so
	                    the action buttons were clipped with no way to scroll to them. */}
	                <div style={{ width: "100%", overflowX: "auto" }}>
	                  <table style={{ width: "100%", minWidth: 880, borderCollapse: "collapse", tableLayout: "fixed" }}>
	                    <colgroup>
		                      <col style={{ width: "11%" }} />
		                      <col style={{ width: "15%" }} />
		                      <col style={{ width: "19%" }} />
		                      <col style={{ width: "9%" }} />
		                      <col style={{ width: "9%" }} />
		                      <col style={{ width: "11%" }} />
		                      <col style={{ width: "26%" }} />
	                    </colgroup>
	                    <thead>
	                      <tr style={{ background: C.cream }}>
	                        {[t("batchId"),t("stageLabel"),t("feedstock"),t("weight"),t("operatorLabel"),t("loggedAt"),t("actionsLabel")].map(h => (
	                          <th key={h} style={{ padding: "9px 10px", textAlign: "left", fontSize: 9, fontWeight: 700, color: C.muted, letterSpacing: 0.3, textTransform: "uppercase", borderBottom: `1px solid ${C.creamDark}`, whiteSpace: "normal", lineHeight: 1.25 }}>{h}</th>
	                        ))}
	                      </tr>
	                    </thead>
	                    <tbody>
	                      {pagedReviewBatches.map((b, i) => {
	                        const latestActivity = [...(b.activities || [])].reverse().find(a => ["Collection", "Transport", "Processing"].includes(a.stage)) || {};
	                        const rowMaterial = reviewRowMaterial(b);
	                        return (
	                          <tr key={b.id} style={{ background: i % 2 === 0 ? C.cardBg : C.creamMid, borderBottom: i === pagedReviewBatches.length - 1 ? "none" : `1px solid ${C.creamDark}` }}>
	                            <td onClick={() => setDetailView(detailForMaterial(b, rowMaterial.material, rowMaterial.index))} style={{ padding: "10px", fontFamily: "'DM Mono', monospace", fontSize: 10, color: C.forest, fontWeight: 700, lineHeight: 1.25, overflowWrap: "anywhere", cursor: "pointer" }}>{b.batchId}</td>
	                            <td style={{ padding: "10px" }}><Badge status={b.status} lang={lang} /></td>
	                            <td style={{ padding: "10px", fontSize: 11, lineHeight: 1.25, overflowWrap: "anywhere" }}>{rowMaterial.feedstockType}{rowMaterial.index ? ` (M${rowMaterial.index})` : ""}</td>
	                            <td style={{ padding: "10px", fontSize: 11, fontWeight: 800, lineHeight: 1.25, overflowWrap: "anywhere" }}>{Number(rowMaterial.weightKg || 0).toLocaleString()} kg</td>
	                            <td style={{ padding: "10px", fontSize: 10, color: C.muted, overflowWrap: "anywhere" }}>{latestActivity.actor || b.loggedBy || "-"}</td>
	                            <td style={{ padding: "10px", fontSize: 10, color: C.muted, lineHeight: 1.35 }}>{fmtDateTime(latestActivity.ts || b.createdAt)}</td>
		                            <td style={{ padding: "10px" }}>
		                              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
	                                <Btn small onClick={() => approveBatchInput(b.id)} variant="blue">{t("acceptLabel")}</Btn>
	                                <Btn small onClick={() => setRejectTarget(b.id)} variant="danger">{t("reject")}</Btn>
	                                <Btn small onClick={() => setDetailView(detailForMaterial(b))} variant="ghost">{t("detailsLabel")}</Btn>
	                              </div>
	                            </td>
	                          </tr>
	                        );
	                      })}
	                    </tbody>
	                  </table>
	                </div>
	                  {/* 10px horizontal padding so this lines up with the table cells
	                      above it, which use padding: 10px. */}
	                  <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "stretch" : "center", gap: 8, padding: "10px", borderTop: `1px solid ${C.creamDark}`, background: C.cardBg }}>
	                    <div style={{ fontSize: 11, color: C.muted }}>
	                      {t("showingLabel")} {filteredReviewBatches.length === 0 ? 0 : ((safeReviewPage - 1) * reviewPageSize) + 1}-{Math.min(safeReviewPage * reviewPageSize, filteredReviewBatches.length)} {t("ofLabel")} {filteredReviewBatches.length}
	                    </div>
	                    <div style={{ display: "flex", alignItems: "center", justifyContent: isMobile ? "space-between" : "flex-start", gap: 8 }}>
	                      <Btn small onClick={() => setReviewPage(p => Math.max(1, p - 1))} disabled={safeReviewPage <= 1} variant="ghost">{t("prevLabel")}</Btn>
	                      <span style={{ fontSize: 11, color: C.muted, fontWeight: 700 }}>{t("pageLabel")} {safeReviewPage} / {reviewPageCount}</span>
	                      <Btn small onClick={() => setReviewPage(p => Math.min(reviewPageCount, p + 1))} disabled={safeReviewPage >= reviewPageCount} variant="ghost">{t("nextLabel")}</Btn>
	                    </div>
	                  </div>
	                </div>
	              ) : (
	                <>
	                {pagedReviewBatches.map(b => {
                    const evidence = reviewEvidence(b);
                    const rowMaterial = reviewRowMaterial(b);
                    return (
	                  <Card key={b.id} style={{ marginBottom: 12 }} accent>
	                    <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "stretch" : "flex-start", gap: 8, marginBottom: 12 }}>
	                      <div style={{ minWidth: 0 }}>
	                        <div style={{ fontFamily: "'DM Mono', monospace", color: C.forest, fontWeight: 700, fontSize: 13 }}>{b.batchId}</div>
	                        <div style={{ fontSize: isMobile ? 13 : 15, lineHeight: 1.3, fontWeight: 700, color: C.charcoal, marginTop: 2, overflowWrap: "anywhere" }}>{b.reviewStage || b.status} input · {rowMaterial.feedstockType}{rowMaterial.index ? ` (M${rowMaterial.index})` : ""} · {Number(rowMaterial.weightKg || 0).toLocaleString()} kg</div>
	                      </div>
	                      <div style={{ alignSelf: isMobile ? "flex-start" : "auto" }}><Badge status={b.status} lang={lang} /></div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(3,1fr)", gap: isMobile ? "10px 14px" : "8px 20px", marginBottom: 14 }}>
                      {[["Hub","Hub Depok-01"],[t("collector"),b.collectorId],[t("collectionDate"),fmtDateTime(b.collectionDate)],[t("transportRefShort"),b.transportRef],[t("processorLabel"),b.processor],[t("eowProcess"),eowLabel(b.eowProcess)]].map(([k,v])=>(
                        <InfoRow key={k} label={k} value={v} />
                      ))}
                    </div>
                    {(evidence.photo || evidence.extraPhotos?.length || evidence.signature) && (
                      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(160px, 1fr))", gap: 10, marginBottom: 14 }}>
                        {evidence.photo && (
                          <div style={{ border: `1px solid ${C.creamDark}`, borderRadius: 10, padding: 8, background: C.cardBg }}>
                            <div style={{ fontSize: 9, fontWeight: 800, color: C.muted, letterSpacing: 0.4, textTransform: "uppercase", marginBottom: 5 }}>{evidence.photoLabel}</div>
                            <img src={evidence.photo} alt={evidence.photoLabel} style={{ width: "100%", height: 120, objectFit: "cover", borderRadius: 8 }} />
                          </div>
                        )}
                        {(evidence.extraPhotos || []).map(p => (
                          <div key={p.label} style={{ border: `1px solid ${C.creamDark}`, borderRadius: 10, padding: 8, background: C.cardBg }}>
                            <div style={{ fontSize: 9, fontWeight: 800, color: C.muted, letterSpacing: 0.4, textTransform: "uppercase", marginBottom: 5 }}>{p.label}</div>
                            <img src={p.src} alt={p.label} style={{ width: "100%", height: 120, objectFit: "cover", borderRadius: 8 }} />
                          </div>
                        ))}
                        {evidence.signature && (
                          <div style={{ border: `1px solid ${C.creamDark}`, borderRadius: 10, padding: 8, background: C.cardBg }}>
                            <div style={{ fontSize: 9, fontWeight: 800, color: C.muted, letterSpacing: 0.4, textTransform: "uppercase", marginBottom: 5 }}>{evidence.signatureLabel}</div>
                            <img src={evidence.signature} alt={evidence.signatureLabel} style={{ width: "100%", height: 120, objectFit: "contain", borderRadius: 8, background: "#fff" }} />
                          </div>
                        )}
                      </div>
                    )}

                    {/* Compact activity trail */}
                    {b.activities && b.activities.length > 0 && (
                      <div style={{ background: C.pageBg, borderRadius: 10, padding: "12px 14px", marginBottom: 14 }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: C.muted, letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 10 }}>{t("custodyTrail")}</div>
                        {[...b.activities]
                          .sort((x, y) => (parseDate(y.ts)?.getTime() || 0) - (parseDate(x.ts)?.getTime() || 0))
                          .map((a, i) => {
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
	                    <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
	                      <Btn small onClick={() => approveBatchInput(b.id)} variant="blue">{t("acceptInput")}</Btn>
	                      <Btn small onClick={() => setRejectTarget(b.id)} variant="danger">{t("reject")}</Btn>
		                      <Btn small onClick={() => setDetailView(detailForMaterial(b, rowMaterial.material, rowMaterial.index))} variant="ghost">{t("viewDetails")}</Btn>
                    </div>
                  </Card>
                    );
                })}
                <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "stretch" : "center", gap: 10, padding: "10px 12px", border: `1px solid ${C.creamDark}`, borderRadius: 10, background: C.cardBg }}>
                  <div style={{ fontSize: 11, color: C.muted }}>
                    {t("showingLabel")} {((safeReviewPage - 1) * reviewPageSize) + 1}-{Math.min(safeReviewPage * reviewPageSize, filteredReviewBatches.length)} {t("ofLabel")} {filteredReviewBatches.length}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: isMobile ? "space-between" : "flex-start", gap: 8 }}>
                    <Btn small onClick={() => setReviewPage(p => Math.max(1, p - 1))} disabled={safeReviewPage <= 1} variant="ghost">{t("prevLabel")}</Btn>
                    <span style={{ fontSize: 11, color: C.muted, fontWeight: 700 }}>{t("pageLabel")} {safeReviewPage} / {reviewPageCount}</span>
                    <Btn small onClick={() => setReviewPage(p => Math.min(reviewPageCount, p + 1))} disabled={safeReviewPage >= reviewPageCount} variant="ghost">{t("nextLabel")}</Btn>
                  </div>
                </div>
                </>
              )}
            </div>
          )}

          {/* ════════════════ RECORDS ════════════════ */}
          {tab === "records" && canAccess("records") && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 20 }}>
                <div>
                  <h1 style={{ fontSize: 24, fontWeight: 800, color: C.forest, fontFamily: "'DM Sans', sans-serif", margin: 0 }}>{t("batchRecords")}</h1>
                  <p style={{ color: C.muted, fontSize: 13, marginTop: 3 }}>{filteredRecordRows.length} of {recordRows.length} process records · {visibleBatches.length} batches · Hub Depok-01</p>
                </div>
                {canAccess("log") && <Btn onClick={openNewBatch} variant="primary">{t("addNewBatch")}</Btn>}
              </div>

              <Card style={{ marginBottom: 12 }}>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1.4fr repeat(4, 0.75fr)", gap: 10, alignItems: "end" }}>
                  <Inp label={t("findRecords")} value={recordQuery} onChange={setRecordQuery} placeholder={t("searchReviewPlaceholder")} />
                  <Inp label={t("fromDate")} type="date" value={recordDateFrom} onChange={setRecordDateFrom} />
                  <Inp label={t("toDate")} type="date" value={recordDateTo} onChange={setRecordDateTo} />
                  <Inp label={t("minKg")} type="number" value={recordWeightMin} onChange={setRecordWeightMin} />
                  <Inp label={t("maxKg")} type="number" value={recordWeightMax} onChange={setRecordWeightMax} />
                </div>
              </Card>

              {visibleBatches.length === 0 ? (
                <Card>
                  <div style={{ textAlign: "center", padding: "24px 0", color: C.muted }}>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{t("noRecordsYet")}</div>
                  </div>
                </Card>
              ) : (
                <div style={{ width: "100%", overflowX: "hidden", borderRadius: 14, border: `1px solid ${C.creamDark}`, background: C.white }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
                    {isMobile ? (
                      <colgroup>
                        <col style={{ width: "22%" }} />
                        <col style={{ width: "18%" }} />
                        <col style={{ width: "10%" }} />
                        <col style={{ width: "15%" }} />
                        <col style={{ width: "17%" }} />
                        <col style={{ width: "18%" }} />
                      </colgroup>
                    ) : (
                      <colgroup>
                        <col style={{ width: "10%" }} />
                        <col style={{ width: "12%" }} />
                        <col style={{ width: "8%" }} />
                        <col style={{ width: "9%" }} />
                        <col style={{ width: "11%" }} />
                        <col style={{ width: "9%" }} />
                        <col style={{ width: "10%" }} />
                        <col style={{ width: "15%" }} />
                        <col style={{ width: "16%" }} />
                      </colgroup>
                    )}
                    <thead>
                      <tr style={{ background: C.cream }}>
                        {(isMobile ? [t("batchLabelShort"),t("materialLabel"),"Kg",t("status"),t("inputterIpLabel"),t("timeLabel")] : [t("batchId"),t("feedstock"),t("weight"),t("collector"),t("inputterLabel"),t("inputterIpLabel"),t("status"),t("loggedAt"),"GPS"]).map(h => (
                          <th key={h} style={{ padding: isMobile ? "8px 6px" : "9px 10px", textAlign: "left", fontSize: isMobile ? 8 : 9, fontWeight: 700, color: C.muted, letterSpacing: 0.3, textTransform: "uppercase", borderBottom: `1px solid ${C.creamDark}`, whiteSpace: "normal", lineHeight: 1.25, overflowWrap: "anywhere" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {pagedRecordRows.map((row, i) => {
                        const b = row.batch;
                        const material = row.material || {};
                        const geo = row.geo;
                        const collectionLat = geo.lat;
                        const collectionLng = geo.lng;
                        const loggedAt = row.loggedAt;
                        return (
                          <tr key={row.key} onClick={() => setDetailView(detailForMaterial(b, material, row.materialIndex))} style={{ background: i % 2 === 0 ? C.cardBg : C.creamMid, borderBottom: `1px solid ${C.creamDark}`, cursor: "pointer", minHeight: isMobile ? 76 : "auto" }}>
                            {isMobile ? (
                              <>
                                <td style={{ padding: "12px 6px", fontFamily: "'DM Mono', monospace", fontSize: 9, color: C.forest, fontWeight: 800, lineHeight: 1.25, overflowWrap: "anywhere", verticalAlign: "middle" }}>{b.batchId}</td>
                                <td style={{ padding: "12px 6px", fontSize: 10, lineHeight: 1.25, overflowWrap: "anywhere", verticalAlign: "middle" }}>{material.feedstockType || b.feedstockType}</td>
                                <td style={{ padding: "12px 6px", fontSize: 10, fontWeight: 800, lineHeight: 1.25, verticalAlign: "middle" }}>{Number(material.weightKg ?? b.weightKg).toLocaleString()}</td>
                                <td style={{ padding: "12px 4px", verticalAlign: "middle" }}>
                                  <span style={{ display: "inline-flex", maxWidth: "100%", borderRadius: 999, padding: "5px 7px", background: activityStatus(row.status) === "rejected" ? "#fee2e2" : activityStatus(row.status) === "transport" ? "#e8f1ff" : activityStatus(row.status) === "processing" ? "#fff1bf" : "#fff4e4", color: activityStatus(row.status) === "rejected" ? C.red : activityStatus(row.status) === "transport" ? C.blue : activityStatus(row.status) === "processing" ? "#92600a" : C.orange, fontSize: 8, fontWeight: 900, letterSpacing: 0.5, fontFamily: "'DM Mono', monospace", whiteSpace: "normal", lineHeight: 1.15, textAlign: "center", overflowWrap: "anywhere" }}>
                                    {compactStatusLabel(row.status)}
                                  </span>
                                </td>
                                <td style={{ padding: "12px 4px", fontSize: 8, color: C.muted, fontFamily: "'DM Mono', monospace", lineHeight: 1.25, overflowWrap: "anywhere", verticalAlign: "middle" }}>{row.inputterIp}</td>
                                <td style={{ padding: "12px 4px", fontSize: 8, color: C.muted, lineHeight: 1.25, whiteSpace: "pre-line", verticalAlign: "middle" }}>{fmtMobileDateTime(loggedAt)}</td>
                              </>
                            ) : (
                              <>
                                <td style={{ padding: "10px", fontFamily: "'DM Mono', monospace", fontSize: 10, color: C.forest, fontWeight: 700, lineHeight: 1.25, overflowWrap: "anywhere" }}>{b.batchId}</td>
                                <td style={{ padding: "10px", fontSize: 11, lineHeight: 1.25, overflowWrap: "anywhere" }}>{material.feedstockType || b.feedstockType}</td>
                                <td style={{ padding: "10px", fontSize: 11, fontWeight: 700, lineHeight: 1.25 }}>{Number(material.weightKg ?? b.weightKg).toLocaleString()} kg</td>
                                <td style={{ padding: "10px", fontSize: 10, color: C.muted, overflowWrap: "anywhere" }}>{b.collectorId || "-"}</td>
                                <td style={{ padding: "10px", fontSize: 10, color: C.muted, overflowWrap: "anywhere" }}>{row.inputter}</td>
                                <td style={{ padding: "10px", fontSize: 9, color: C.muted, fontFamily: "'DM Mono', monospace", overflowWrap: "anywhere" }}>{row.inputterIp}</td>
                                <td style={{ padding: "10px" }}><Badge status={row.status} lang={lang} /></td>
                                <td style={{ padding: "10px", fontSize: 10, color: C.muted, lineHeight: 1.35 }}>
                                  {fmtDateTime(loggedAt)}
                                </td>
                                <td style={{ padding: "10px", fontSize: 10 }}>
                                  <a href={`https://www.google.com/maps?q=${collectionLat},${collectionLng}`}
                                    target="_blank" rel="noreferrer"
                                    onClick={e => e.stopPropagation()}
                                    style={{ color: C.forest, textDecoration: "none", fontFamily: "'DM Mono', monospace", fontSize: 10, display: "block", lineHeight: 1.35, overflowWrap: "anywhere" }}>
                                    <span>📍 {Number(collectionLat).toFixed(5)}</span>
                                    <br />
                                    <span>{Number(collectionLng).toFixed(5)}</span>
                                    {geo?.accuracy && <span style={{ color: C.mutedLight }}> ±{geo.accuracy}m</span>}
                                    {geo?.fallback && <span style={{ color: C.mutedLight }}> hub operator</span>}
                                  </a>
                                </td>
                              </>
                            )}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", borderTop: `1px solid ${C.creamDark}`, background: C.cardBg }}>
                    <div style={{ fontSize: 11, color: C.muted }}>
                      {t("showingLabel")} {filteredRecordRows.length === 0 ? 0 : ((safeRecordPage - 1) * recordPageSize) + 1}-{Math.min(safeRecordPage * recordPageSize, filteredRecordRows.length)} {t("ofLabel")} {filteredRecordRows.length}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <Btn small onClick={() => setRecordPage(p => Math.max(1, p - 1))} disabled={safeRecordPage <= 1} variant="ghost">{t("prevLabel")}</Btn>
                      <span style={{ fontSize: 11, color: C.muted, fontWeight: 700 }}>{t("pageLabel")} {safeRecordPage} / {recordPageCount}</span>
                      <Btn small onClick={() => setRecordPage(p => Math.min(recordPageCount, p + 1))} disabled={safeRecordPage >= recordPageCount} variant="ghost">{t("nextLabel")}</Btn>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}


          {/* ════════════════ CHAIN OF CUSTODY ════════════════ */}
          {tab === "custody" && canAccess("custody") && (
            <ChainOfCustodyPanel batches={visibleBatches} lang={lang} />
          )}

          {/* ════════════════ ANALYTICS ════════════════ */}
          {tab === "analytics" && canAccess("settings") && (
            <AnalyticsPanel batches={visibleBatches} sheetsUrl={sheetsUrl} isMobile={isMobile} lang={lang} />
          )}

          {/* ════════════════ SETTINGS ════════════════ */}
          {tab === "settings" && canAccess("settings") && (
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 800, color: C.forest, fontFamily: "'DM Sans', sans-serif", margin: "0 0 4px" }}>{t("settingsTitle")}</h1>
              <p style={{ color: C.muted, fontSize: 13, margin: "0 0 20px" }}>{t("settingsSubtitleText")}</p>

              {/* ── Backend Sync ── */}
              <Card style={{ marginBottom: 16 }}>
                <SectionTitle>{t("backendSync")}</SectionTitle>
                <div style={{ fontSize: 13, color: C.muted, marginBottom: 14, lineHeight: 1.6 }}>
                  Every batch action syncs automatically to your configured backend.
                  Paste either a Google Apps Script Web App URL (ending in <strong>/exec</strong>) or a
                  Supabase Edge Function URL (ending in <strong>/functions/v1/rezy-mrv-api</strong>).
                </div>

                {/* Step-by-step */}
                <div style={{ background: "#e8f5e9", borderRadius: 10, padding: "14px 18px", marginBottom: 16 }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: C.forest, letterSpacing: 0.4, textTransform: "uppercase", marginBottom: 10 }}>Setup Steps (Apps Script — skip if using a Supabase URL)</div>
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
	                  label={t("backendUrlLabel")}
	                  value={sheetsUrl}
	                  onChange={v => setSheetsUrl(v)}
	                  placeholder="https://script.google.com/macros/s/…/exec or https://…supabase.co/functions/v1/rezy-mrv-api"
	                />
	                {sheetsUrl && !isValidSheetsUrl(sheetsUrl) && (
	                  <div style={{ marginTop: 8, background: "#fee2e2", color: C.red, borderRadius: 8, padding: "8px 10px", fontSize: 12, fontWeight: 700 }}>
	                    This is not a valid backend URL. Paste either a Google Apps Script Web App URL ending with /exec, or a Supabase Edge Function URL ending with /functions/v1/rezy-mrv-api.
	                  </div>
	                )}
		                <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
		                  <Btn small onClick={async () => {
		                    if (!isValidSheetsUrl(sheetsUrl)) { showToast("Paste a valid backend URL first.", "err"); return; }
		                    if (isSupabaseFunctionUrl(sheetsUrl)) {
		                      const ok = await testSheetsConnection(sheetsUrl);
		                      setSyncStatus(ok ? "ok" : "fail");
		                      showToast(ok ? "Connected — Supabase backend is reachable." : "Could not reach Supabase backend.", ok ? "ok" : "err");
		                      setTimeout(() => setSyncStatus(null), 3000);
		                      return;
		                    }
		                    showToast("Opening in new tab — check for ok:true");
	                    window.open(sheetsUrl, "_blank");
	                    setSyncStatus("ok");
	                    setTimeout(() => setSyncStatus(null), 3000);
	                  }} variant="primary" disabled={!isValidSheetsUrl(sheetsUrl)}>
	                    {t("testConnection")}
	                  </Btn>
	                  <Btn small onClick={async () => {
	                    if (!isValidSheetsUrl(sheetsUrl)) { showToast("Paste a valid backend URL first.", "err"); return; }
	                    await saveSettings({ ...settings, sheetsUrl });
	                    showToast("URL saved.");
	                  }} variant="secondary" disabled={!isValidSheetsUrl(sheetsUrl)}>
		                    Save URL
		                  </Btn>
		                </div>

		                <div style={{ marginTop: 14, padding: "12px 14px", border: `1px solid ${isValidSheetsUrl(sheetsUrl) ? C.forestMid : C.creamDark}`, borderRadius: 10, background: isValidSheetsUrl(sheetsUrl) ? "#e8f5e9" : C.cardBg }}>
		                  <div style={{ fontSize: 11, fontWeight: 800, color: C.forest, letterSpacing: 0.4, textTransform: "uppercase", marginBottom: 5 }}>{t("generateFromBackend")}</div>
		                  <div style={{ fontSize: 12, color: C.muted, marginBottom: 10, lineHeight: 1.45 }}>
		                    Pulls the current batches from your configured backend into this browser so Dashboard, Admin Review, Records, and Analytics do not stay blank.
		                  </div>
		                  <Btn full onClick={async () => {
		                    if (!isValidSheetsUrl(sheetsUrl)) {
		                      showToast("Paste a valid backend URL first.", "err");
		                      return;
		                    }
		                    await saveSettings({ ...settings, sheetsUrl });
		                    const loaded = await refreshBatchesFromSheet(true);
		                    if (loaded) setTab("dashboard");
		                  }} variant="primary" disabled={!isValidSheetsUrl(sheetsUrl)}>
		                    Generate Data from Backend
		                  </Btn>
		                </div>

		                {isValidSheetsUrl(sheetsUrl) && (
		                  <div style={{ marginTop: 14 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: 0.4, textTransform: "uppercase", marginBottom: 6 }}>{t("syncExistingToBackend")}</div>
                    <div style={{ fontSize: 12, color: C.muted, marginBottom: 8 }}>Push all {batches.length} stored batches to the backend now. Useful after first setup.</div>
	                    <div style={{ display: "flex", gap: 10 }}>
	                    <Btn small onClick={async () => {
	                      if (!isValidSheetsUrl(sheetsUrl)) return;
	                      setSyncStatus("syncing");
	                      showToast("Syncing to backend…");
                      let synced = 0;
                      for (const b of batches) {
                        try {
                          await syncToSheets(sheetsUrl, b, null);
                          await syncPhotosToSheets(sheetsUrl, b);
                          await syncSignaturesToSheets(sheetsUrl, b);
                          synced++;
                          // Small delay to avoid rate limiting
                          await new Promise(r => setTimeout(r, 300));
                        } catch {}
                      }
                      setSyncStatus("ok");
                      showToast(`Synced ${synced}/${batches.length} batches. Check your backend.`);
                      setTimeout(() => setSyncStatus(null), 4000);
	                    }} variant="accent">
	                      {t("bulkSync")} ({batches.length})
	                    </Btn>
                      <Btn small onClick={async () => {
                        if (!window.confirm("Delete ALL data on the backend? This cannot be undone.")) return;
                        setSyncStatus("syncing");
                        const result = await clearSheetsData(sheetsUrl);
                        setSyncStatus(result.ok ? "ok" : "fail");
                        showToast(result.ok ? "Backend data cleared." : "Failed to clear backend data.", result.ok ? "ok" : "warn");
                        setTimeout(() => setSyncStatus(null), 4000);
                      }} variant="ghost">
                        Clear Backend Data
                      </Btn>
                    </div>
                  </div>
                )}
              </Card>

              {/* ── Settings Access Device ── */}
              <Card style={{ marginBottom: 16 }}>
                <SectionTitle>{t("settingsAccessDevice")}</SectionTitle>
                <div style={{ fontSize: 13, color: C.muted, marginBottom: 14, lineHeight: 1.6 }}>
                  Settings and Analytics are hidden by default on every device. To unlock this card on a new device,
                  tap the Rezycology logo (top-left) 5 times quickly and enter the device unlock PIN.
                  Other devices signed in as Admin can still log inputs and (if enabled) review batches, but won't
                  see Settings or Analytics until unlocked the same way.
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, background: C.creamMid, borderRadius: 10, padding: "12px 16px" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.charcoal }}>
                      {isSettingsDevice ? t("settingsEnabledHere") : t("settingsDisabledHere")}
                    </div>
                    <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>
                      This setting is stored per-device (per browser) and does not affect other devices.
                    </div>
                  </div>
                  <Btn small onClick={() => setSettingsDevice(!isSettingsDevice)} variant={isSettingsDevice ? "ghost" : "primary"}>
                    {isSettingsDevice ? t("disableHere") : t("enableHere")}
                  </Btn>
                </div>
              </Card>

              {/* ── Admin Review Device ── */}
              <Card style={{ marginBottom: 16 }}>
                <SectionTitle>{t("adminReviewDevice")}</SectionTitle>
                <div style={{ fontSize: 13, color: C.muted, marginBottom: 14, lineHeight: 1.6 }}>
                  The "Admin Review" tab is hidden by default on every device. Other devices signed in as Admin
                  can still log Collection/Transport/Processing inputs, but will not see or access Admin Review —
                  reducing the risk of mismatched/misaligned review on phones and other screens. Use "Disable Here"
                  to re-lock this device; to unlock again, tap the Rezycology logo 5 times and enter the device
                  unlock PIN.
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, background: C.creamMid, borderRadius: 10, padding: "12px 16px" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.charcoal }}>
                      {isAdminReviewDevice ? t("reviewEnabledHere") : t("reviewDisabledHere")}
                    </div>
                    <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>
                      This setting is stored per-device (per browser) and does not affect other devices.
                    </div>
                  </div>
                  <Btn small onClick={() => setAdminReviewDevice(!isAdminReviewDevice)} variant={isAdminReviewDevice ? "ghost" : "primary"}>
                    {isAdminReviewDevice ? "Disable Here" : "Enable Here"}
                  </Btn>
                </div>
              </Card>

              {/* ── Role PINs ── */}
              <Card style={{ marginBottom: 16 }}>
                <SectionTitle>{t("rolePins")}</SectionTitle>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {Object.entries(ROLES).filter(([key]) => key !== "operator").map(([key, r]) => (
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
                <SectionTitle>{t("dataManagement")}</SectionTitle>
                <div style={{ fontSize: 13, color: C.muted, marginBottom: 14 }}>
                  {batches.length} batches stored · {(JSON.stringify(batches).length / 1024).toFixed(1)} KB · Persistent across sessions.
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <Btn small onClick={async () => {
                    if (window.confirm("Delete ALL batch data? Cannot be undone.")) {
                      mutateBatches(() => []);
                      if (sheetsUrl) await clearSheetsData(sheetsUrl);
                      showToast("All local and Sheet data cleared.", "warn");
                    }
                  }} variant="danger">{t("clearData")}</Btn>
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
