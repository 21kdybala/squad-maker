/**
 * 단계별 스쿼드 메이커 — 인원 → 포메이션 → 이름 → PNG/JPEG 저장
 */

const STORAGE_KEY = "squad-maker-v2";

/** 인기 포메이션(별표·상단 고정) */
/** 11 vs 11 · 현대 프로·동호회/조기에서 가장 많이 쓰이는 편인 포메이션 */
const POPULAR_11_IDS = ["433", "442", "4231", "352", "451", "343", "4321"];
/** 10 vs 10 · 청소년/픽업에서 자주 언급되는 포메이션 (3-4-2, 4-3-1-1 등) */
const POPULAR_10_IDS = ["t342", "t4311"];
/** 9 vs 9 · 유소년에서 많이 쓰이는 4-3-1, 3-3-2, 3-2-3 */
const POPULAR_9_IDS = ["n431", "n332", "n323"];

/** @typedef {{ id: string, label: string, x: number, y: number, gk?: boolean }} Slot */
/** @typedef {{ id: string, title: string, slots: Slot[] }} FormationOption */

/**
 * 11인 포메이션 — FotMob 라인업 빌더 목록 순서 참고
 * @see https://www.fotmob.com/ko/lineup-builder
 */
const OPTIONS = {
  11: [
    { id: "433", title: "4-3-3", slots: formation433() },
    { id: "442", title: "4-4-2", slots: formation442() },
    { id: "4231", title: "4-2-3-1", slots: formation4231() },
    { id: "4141", title: "4-1-4-1", slots: formation4141() },
    { id: "4321", title: "4-3-2-1", slots: formation4321() },
    { id: "41212", title: "4-1-2-1-2", slots: formation41212() },
    { id: "343", title: "3-4-3", slots: formation343() },
    { id: "352", title: "3-5-2", slots: formation352() },
    { id: "3241", title: "3-2-4-1", slots: formation3241() },
    { id: "532", title: "5-3-2", slots: formation532() },
    { id: "541", title: "5-4-1", slots: formation541() },
    { id: "451", title: "4-5-1", slots: formation451() },
    { id: "4411", title: "4-4-1-1", slots: formation4411() },
    { id: "4222", title: "4-2-2-2", slots: formation4222() },
    { id: "424", title: "4-2-4", slots: formation424() },
    { id: "3421", title: "3-4-2-1", slots: formation3421() },
    { id: "3412", title: "3-4-1-2", slots: formation3412() },
    { id: "4312", title: "4-3-1-2", slots: formation4312() },
    { id: "523", title: "5-2-3", slots: formation523() },
    { id: "5221", title: "5-2-2-1", slots: formation5221() },
    { id: "4213", title: "4-2-1-3", slots: formation4213() },
    { id: "4123", title: "4-1-2-3", slots: formation4123() },
    { id: "3142", title: "3-1-4-2", slots: formation3142() },
    { id: "4132", title: "4-1-3-2", slots: formation4132() },
    { id: "41221", title: "4-1-2-2-1", slots: formation41221() },
    { id: "334", title: "3-3-4", slots: formation334() },
    { id: "3331", title: "3-3-3-1", slots: formation3331() },
    { id: "5311", title: "5-3-1-1", slots: formation5311() },
    { id: "3322", title: "3-3-2-2", slots: formation3322() },
    { id: "3511", title: "3-5-1-1", slots: formation3511() },
    { id: "2323", title: "2-3-2-3", slots: formation2323() },
  ],
  10: [
    { id: "t432", title: "4-3-2", slots: formation432() },
    { id: "t342", title: "3-4-2", slots: formation342_10() },
    { id: "t333", title: "3-3-3", slots: formation333() },
    { id: "t423", title: "4-2-3", slots: formation423_10() },
    { id: "t4311", title: "4-3-1-1", slots: formation4311_10() },
    { id: "t441", title: "4-4-1", slots: formation441_10() },
    { id: "t531", title: "5-3-1", slots: formation531_10() },
    { id: "t4221", title: "4-2-2-1", slots: formation4221_10() },
    { id: "t351", title: "3-5-1", slots: formation351_10() },
    { id: "t4122", title: "4-1-2-2", slots: formation4122_10() },
  ],
  9: [
    { id: "n422", title: "4-2-2", slots: formation422() },
    { id: "n332", title: "3-3-2", slots: formation332() },
    { id: "n233", title: "2-3-3", slots: formation233() },
    { id: "n323", title: "3-2-3", slots: formation323() },
    { id: "n431", title: "4-3-1", slots: formation431() },
    { id: "n341", title: "3-4-1", slots: formation341() },
    { id: "n242", title: "2-4-2", slots: formation242_9() },
    { id: "n4211", title: "4-2-1-1", slots: formation4211_9() },
    { id: "n3221", title: "3-2-2-1", slots: formation3221_9() },
  ],
};

function mk(id, label, x, y, gk = false) {
  return { id, label, x, y, gk };
}

function formation442() {
  return [
    mk("gk", "GK", 50, 93, true),
    mk("lb", "LB", 12, 72),
    mk("cb1", "CB", 36, 76),
    mk("cb2", "CB", 64, 76),
    mk("rb", "RB", 88, 72),
    mk("lm", "LM", 12, 48),
    mk("cm1", "CM", 38, 52),
    mk("cm2", "CM", 62, 52),
    mk("rm", "RM", 88, 48),
    mk("st1", "ST", 38, 22),
    mk("st2", "ST", 62, 22),
  ];
}

function formation433() {
  return [
    mk("gk", "GK", 50, 93, true),
    mk("lb", "LB", 12, 72),
    mk("cb1", "CB", 36, 76),
    mk("cb2", "CB", 64, 76),
    mk("rb", "RB", 88, 72),
    mk("cm1", "CM", 28, 50),
    mk("cm2", "CM", 50, 54),
    mk("cm3", "CM", 72, 50),
    mk("lw", "LW", 14, 26),
    mk("st", "ST", 50, 18),
    mk("rw", "RW", 86, 26),
  ];
}

function formation4231() {
  return [
    mk("gk", "GK", 50, 93, true),
    mk("lb", "LB", 12, 72),
    mk("cb1", "CB", 36, 76),
    mk("cb2", "CB", 64, 76),
    mk("rb", "RB", 88, 72),
    mk("cdm1", "CDM", 38, 58),
    mk("cdm2", "CDM", 62, 58),
    mk("lam", "LAM", 22, 36),
    mk("cam", "CAM", 50, 32),
    mk("ram", "RAM", 78, 36),
    mk("st", "ST", 50, 14),
  ];
}

function formation352() {
  return [
    mk("gk", "GK", 50, 93, true),
    mk("cb1", "CB", 22, 76),
    mk("cb2", "CB", 50, 78),
    mk("cb3", "CB", 78, 76),
    mk("lwb", "LWB", 8, 48),
    mk("dm1", "DM", 36, 56),
    mk("dm2", "DM", 64, 56),
    mk("rwb", "RWB", 92, 48),
    mk("am", "AM", 50, 34),
    mk("st1", "ST", 38, 18),
    mk("st2", "ST", 62, 18),
  ];
}

function formation541() {
  return [
    mk("gk", "GK", 50, 93, true),
    mk("lb", "LB", 8, 72),
    mk("cb1", "CB", 28, 78),
    mk("cb2", "CB", 50, 80),
    mk("cb3", "CB", 72, 78),
    mk("rb", "RB", 92, 72),
    mk("lm", "LM", 12, 48),
    mk("cm1", "CM", 38, 52),
    mk("cm2", "CM", 62, 52),
    mk("rm", "RM", 88, 48),
    mk("st", "ST", 50, 16),
  ];
}

function formation343() {
  return [
    mk("gk", "GK", 50, 93, true),
    mk("cb1", "CB", 22, 78),
    mk("cb2", "CB", 50, 80),
    mk("cb3", "CB", 78, 78),
    mk("lm", "LM", 6, 50),
    mk("cm1", "CM", 32, 54),
    mk("cm2", "CM", 68, 54),
    mk("rm", "RM", 94, 50),
    mk("lw", "LW", 18, 24),
    mk("st", "ST", 50, 16),
    mk("rw", "RW", 82, 24),
  ];
}

function formation451() {
  return [
    mk("gk", "GK", 50, 93, true),
    mk("lb", "LB", 10, 72),
    mk("cb1", "CB", 32, 76),
    mk("cb2", "CB", 68, 76),
    mk("rb", "RB", 90, 72),
    mk("lm", "LM", 8, 48),
    mk("lcm", "CM", 28, 52),
    mk("cm", "CM", 50, 55),
    mk("rcm", "CM", 72, 52),
    mk("rm", "RM", 92, 48),
    mk("st", "ST", 50, 16),
  ];
}

function formation4141() {
  return [
    mk("gk", "GK", 50, 93, true),
    mk("lb", "LB", 12, 72),
    mk("cb1", "CB", 36, 76),
    mk("cb2", "CB", 64, 76),
    mk("rb", "RB", 88, 72),
    mk("dm", "CDM", 50, 62),
    mk("lw", "LW", 10, 38),
    mk("lcm", "CM", 32, 42),
    mk("rcm", "CM", 68, 42),
    mk("rw", "RW", 90, 38),
    mk("st", "ST", 50, 18),
  ];
}

function formation4321() {
  return [
    mk("gk", "GK", 50, 93, true),
    mk("lb", "LB", 12, 72),
    mk("cb1", "CB", 36, 76),
    mk("cb2", "CB", 64, 76),
    mk("rb", "RB", 88, 72),
    mk("lm", "LM", 12, 48),
    mk("cm", "CM", 50, 52),
    mk("rm", "RM", 88, 48),
    mk("lf", "LF", 32, 26),
    mk("rf", "RF", 68, 26),
    mk("st", "ST", 50, 14),
  ];
}

function formation41212() {
  return [
    mk("gk", "GK", 50, 93, true),
    mk("lb", "LB", 12, 72),
    mk("cb1", "CB", 36, 76),
    mk("cb2", "CB", 64, 76),
    mk("rb", "RB", 88, 72),
    mk("dm", "DM", 50, 60),
    mk("cm1", "CM", 32, 48),
    mk("cm2", "CM", 68, 48),
    mk("cam", "CAM", 50, 34),
    mk("st1", "ST", 38, 16),
    mk("st2", "ST", 62, 16),
  ];
}

function formation3241() {
  return [
    mk("gk", "GK", 50, 93, true),
    mk("cb1", "CB", 26, 78),
    mk("cb2", "CB", 50, 80),
    mk("cb3", "CB", 74, 78),
    mk("dm1", "DM", 36, 58),
    mk("dm2", "DM", 64, 58),
    mk("lm", "LM", 8, 40),
    mk("lam", "AM", 36, 32),
    mk("ram", "AM", 64, 32),
    mk("rm", "RM", 92, 40),
    mk("st", "ST", 50, 14),
  ];
}

function formation532() {
  return [
    mk("gk", "GK", 50, 93, true),
    mk("lwb", "LWB", 6, 70),
    mk("cb1", "CB", 22, 77),
    mk("cb2", "CB", 50, 80),
    mk("cb3", "CB", 78, 77),
    mk("rwb", "RWB", 94, 70),
    mk("cm1", "CM", 30, 48),
    mk("cm2", "CM", 50, 52),
    mk("cm3", "CM", 70, 48),
    mk("st1", "ST", 38, 18),
    mk("st2", "ST", 62, 18),
  ];
}

function formation4411() {
  return [
    mk("gk", "GK", 50, 93, true),
    mk("lb", "LB", 12, 72),
    mk("cb1", "CB", 36, 76),
    mk("cb2", "CB", 64, 76),
    mk("rb", "RB", 88, 72),
    mk("lm", "LM", 12, 48),
    mk("cm1", "CM", 38, 52),
    mk("cm2", "CM", 62, 52),
    mk("rm", "RM", 88, 48),
    mk("ss", "SS", 50, 30),
    mk("st", "ST", 50, 14),
  ];
}

function formation4222() {
  return [
    mk("gk", "GK", 50, 93, true),
    mk("lb", "LB", 12, 72),
    mk("cb1", "CB", 36, 76),
    mk("cb2", "CB", 64, 76),
    mk("rb", "RB", 88, 72),
    mk("cdm1", "CDM", 38, 58),
    mk("cdm2", "CDM", 62, 58),
    mk("lam", "CAM", 22, 36),
    mk("ram", "CAM", 78, 36),
    mk("st1", "ST", 38, 16),
    mk("st2", "ST", 62, 16),
  ];
}

function formation424() {
  return [
    mk("gk", "GK", 50, 93, true),
    mk("lb", "LB", 12, 72),
    mk("cb1", "CB", 36, 76),
    mk("cb2", "CB", 64, 76),
    mk("rb", "RB", 88, 72),
    mk("cm1", "CM", 38, 52),
    mk("cm2", "CM", 62, 52),
    mk("lw", "LW", 10, 22),
    mk("lf", "LF", 36, 20),
    mk("rf", "RF", 64, 20),
    mk("rw", "RW", 90, 22),
  ];
}

function formation3421() {
  return [
    mk("gk", "GK", 50, 93, true),
    mk("cb1", "CB", 26, 78),
    mk("cb2", "CB", 50, 80),
    mk("cb3", "CB", 74, 78),
    mk("lm", "LM", 8, 48),
    mk("cm1", "CM", 36, 52),
    mk("cm2", "CM", 64, 52),
    mk("rm", "RM", 92, 48),
    mk("lam", "AM", 36, 30),
    mk("ram", "AM", 64, 30),
    mk("st", "ST", 50, 14),
  ];
}

function formation3412() {
  return [
    mk("gk", "GK", 50, 93, true),
    mk("cb1", "CB", 26, 78),
    mk("cb2", "CB", 50, 80),
    mk("cb3", "CB", 74, 78),
    mk("lm", "LM", 8, 48),
    mk("cm1", "CM", 36, 52),
    mk("cm2", "CM", 64, 52),
    mk("rm", "RM", 92, 48),
    mk("cam", "CAM", 50, 34),
    mk("st1", "ST", 38, 16),
    mk("st2", "ST", 62, 16),
  ];
}

function formation4312() {
  return [
    mk("gk", "GK", 50, 93, true),
    mk("lb", "LB", 12, 72),
    mk("cb1", "CB", 36, 76),
    mk("cb2", "CB", 64, 76),
    mk("rb", "RB", 88, 72),
    mk("cm1", "CM", 30, 50),
    mk("cm2", "CM", 50, 54),
    mk("cm3", "CM", 70, 50),
    mk("cam", "CAM", 50, 34),
    mk("st1", "ST", 40, 16),
    mk("st2", "ST", 60, 16),
  ];
}

function formation523() {
  return [
    mk("gk", "GK", 50, 93, true),
    mk("lwb", "LWB", 6, 70),
    mk("cb1", "CB", 26, 77),
    mk("cb2", "CB", 50, 80),
    mk("cb3", "CB", 74, 77),
    mk("rwb", "RWB", 94, 70),
    mk("cm1", "CM", 40, 48),
    mk("cm2", "CM", 60, 48),
    mk("lw", "LW", 18, 24),
    mk("st", "ST", 50, 16),
    mk("rw", "RW", 82, 24),
  ];
}

function formation5221() {
  return [
    mk("gk", "GK", 50, 93, true),
    mk("lwb", "LWB", 6, 70),
    mk("cb1", "CB", 26, 77),
    mk("cb2", "CB", 50, 80),
    mk("cb3", "CB", 74, 77),
    mk("rwb", "RWB", 94, 70),
    mk("cm1", "CM", 40, 48),
    mk("cm2", "CM", 60, 48),
    mk("wl", "WF", 22, 28),
    mk("wr", "WF", 78, 28),
    mk("st", "ST", 50, 14),
  ];
}

function formation4213() {
  return [
    mk("gk", "GK", 50, 93, true),
    mk("lb", "LB", 12, 72),
    mk("cb1", "CB", 36, 76),
    mk("cb2", "CB", 64, 76),
    mk("rb", "RB", 88, 72),
    mk("cdm1", "CDM", 38, 56),
    mk("cdm2", "CDM", 62, 56),
    mk("cam", "CAM", 50, 36),
    mk("lw", "LW", 14, 18),
    mk("st", "ST", 50, 14),
    mk("rw", "RW", 86, 18),
  ];
}

function formation4123() {
  return [
    mk("gk", "GK", 50, 93, true),
    mk("lb", "LB", 12, 72),
    mk("cb1", "CB", 36, 76),
    mk("cb2", "CB", 64, 76),
    mk("rb", "RB", 88, 72),
    mk("dm", "DM", 50, 58),
    mk("cm1", "CM", 32, 42),
    mk("cm2", "CM", 68, 42),
    mk("lw", "LW", 14, 20),
    mk("st", "ST", 50, 14),
    mk("rw", "RW", 86, 20),
  ];
}

function formation3142() {
  return [
    mk("gk", "GK", 50, 93, true),
    mk("cb1", "CB", 26, 78),
    mk("cb2", "CB", 50, 80),
    mk("cb3", "CB", 74, 78),
    mk("dm", "DM", 50, 60),
    mk("lm", "LM", 8, 44),
    mk("cm1", "CM", 36, 46),
    mk("cm2", "CM", 64, 46),
    mk("rm", "RM", 92, 44),
    mk("st1", "ST", 38, 18),
    mk("st2", "ST", 62, 18),
  ];
}

function formation4132() {
  return [
    mk("gk", "GK", 50, 93, true),
    mk("lb", "LB", 12, 72),
    mk("cb1", "CB", 36, 76),
    mk("cb2", "CB", 64, 76),
    mk("rb", "RB", 88, 72),
    mk("dm", "DM", 50, 58),
    mk("lm", "LM", 12, 40),
    mk("cm", "CM", 50, 42),
    mk("rm", "RM", 88, 40),
    mk("st1", "ST", 38, 18),
    mk("st2", "ST", 62, 18),
  ];
}

function formation41221() {
  return [
    mk("gk", "GK", 50, 93, true),
    mk("lb", "LB", 12, 72),
    mk("cb1", "CB", 36, 76),
    mk("cb2", "CB", 64, 76),
    mk("rb", "RB", 88, 72),
    mk("dm", "DM", 50, 60),
    mk("m1", "MF", 32, 46),
    mk("m2", "MF", 68, 46),
    mk("a1", "AM", 36, 30),
    mk("a2", "AM", 64, 30),
    mk("st", "ST", 50, 14),
  ];
}

function formation334() {
  return [
    mk("gk", "GK", 50, 93, true),
    mk("cb1", "CB", 26, 78),
    mk("cb2", "CB", 50, 80),
    mk("cb3", "CB", 74, 78),
    mk("ml", "MF", 28, 52),
    mk("mc", "MF", 50, 55),
    mk("mr", "MF", 72, 52),
    mk("fl1", "FW", 18, 26),
    mk("fl2", "FW", 38, 22),
    mk("fr2", "FW", 62, 22),
    mk("fr1", "FW", 82, 26),
  ];
}

function formation3331() {
  return [
    mk("gk", "GK", 50, 93, true),
    mk("cb1", "CB", 26, 78),
    mk("cb2", "CB", 50, 80),
    mk("cb3", "CB", 74, 78),
    mk("ml", "MF", 22, 50),
    mk("mc", "MF", 50, 54),
    mk("mr", "MF", 78, 50),
    mk("al", "AM", 28, 32),
    mk("ac", "AM", 50, 28),
    mk("ar", "AM", 72, 32),
    mk("st", "ST", 50, 14),
  ];
}

function formation5311() {
  return [
    mk("gk", "GK", 50, 93, true),
    mk("lwb", "LWB", 6, 70),
    mk("cb1", "CB", 26, 77),
    mk("cb2", "CB", 50, 80),
    mk("cb3", "CB", 74, 77),
    mk("rwb", "RWB", 94, 70),
    mk("cm1", "CM", 32, 48),
    mk("cm2", "CM", 50, 52),
    mk("cm3", "CM", 68, 48),
    mk("ss", "SS", 50, 30),
    mk("st", "ST", 50, 14),
  ];
}

function formation3322() {
  return [
    mk("gk", "GK", 50, 93, true),
    mk("cb1", "CB", 26, 78),
    mk("cb2", "CB", 50, 80),
    mk("cb3", "CB", 74, 78),
    mk("ml", "MF", 22, 50),
    mk("mc", "MF", 50, 54),
    mk("mr", "MF", 78, 50),
    mk("al", "AM", 36, 32),
    mk("ar", "AM", 64, 32),
    mk("st1", "ST", 38, 16),
    mk("st2", "ST", 62, 16),
  ];
}

function formation3511() {
  return [
    mk("gk", "GK", 50, 93, true),
    mk("cb1", "CB", 26, 78),
    mk("cb2", "CB", 50, 80),
    mk("cb3", "CB", 74, 78),
    mk("lwb", "LWB", 6, 52),
    mk("cm1", "CM", 30, 54),
    mk("cm2", "CM", 50, 58),
    mk("cm3", "CM", 70, 54),
    mk("rwb", "RWB", 94, 52),
    mk("ss", "SS", 50, 32),
    mk("st", "ST", 50, 14),
  ];
}

function formation2323() {
  return [
    mk("gk", "GK", 50, 93, true),
    mk("cb1", "CB", 36, 78),
    mk("cb2", "CB", 64, 78),
    mk("dm1", "DM", 30, 58),
    mk("dm2", "DM", 50, 60),
    mk("dm3", "DM", 70, 58),
    mk("wl", "WF", 22, 38),
    mk("wr", "WF", 78, 38),
    mk("fw1", "FW", 22, 20),
    mk("fw2", "FW", 50, 14),
    mk("fw3", "FW", 78, 20),
  ];
}

/** FotMob ‘자유 포메이션’ — 위치는 임의이므로 4-4-2와 동일 배치로 둠 */
function formationFree() {
  return formation442();
}

/** 10: GK + 9 */
function formation432() {
  return [
    mk("gk", "GK", 50, 93, true),
    mk("lb", "LB", 12, 72),
    mk("cb1", "CB", 36, 76),
    mk("cb2", "CB", 64, 76),
    mk("rb", "RB", 88, 72),
    mk("lm", "LM", 12, 48),
    mk("cm", "CM", 50, 52),
    mk("rm", "RM", 88, 48),
    mk("st1", "ST", 36, 22),
    mk("st2", "ST", 64, 22),
  ];
}

function formation342_10() {
  return [
    mk("gk", "GK", 50, 93, true),
    mk("cb1", "CB", 22, 78),
    mk("cb2", "CB", 50, 80),
    mk("cb3", "CB", 78, 78),
    mk("lm", "LM", 8, 50),
    mk("cm1", "CM", 36, 54),
    mk("cm2", "CM", 64, 54),
    mk("rm", "RM", 92, 50),
    mk("st1", "ST", 38, 20),
    mk("st2", "ST", 62, 20),
  ];
}

function formation333() {
  return [
    mk("gk", "GK", 50, 93, true),
    mk("cb1", "CB", 26, 78),
    mk("cb2", "CB", 50, 80),
    mk("cb3", "CB", 74, 78),
    mk("ml", "MF", 22, 50),
    mk("mc", "MF", 50, 52),
    mk("mr", "MF", 78, 50),
    mk("fl", "FW", 26, 24),
    mk("fc", "FW", 50, 18),
    mk("fr", "FW", 74, 24),
  ];
}

function formation423_10() {
  return [
    mk("gk", "GK", 50, 93, true),
    mk("lb", "LB", 12, 72),
    mk("cb1", "CB", 36, 76),
    mk("cb2", "CB", 64, 76),
    mk("rb", "RB", 88, 72),
    mk("cdm1", "CDM", 38, 58),
    mk("cdm2", "CDM", 62, 58),
    mk("lw", "LW", 16, 32),
    mk("cam", "CAM", 50, 30),
    mk("rw", "RW", 84, 32),
  ];
}

function formation4311_10() {
  return [
    mk("gk", "GK", 50, 93, true),
    mk("lb", "LB", 12, 72),
    mk("cb1", "CB", 36, 76),
    mk("cb2", "CB", 64, 76),
    mk("rb", "RB", 88, 72),
    mk("cm1", "CM", 28, 52),
    mk("cm2", "CM", 50, 55),
    mk("cm3", "CM", 72, 52),
    mk("ss", "SS", 50, 32),
    mk("st", "ST", 50, 16),
  ];
}

function formation441_10() {
  return [
    mk("gk", "GK", 50, 93, true),
    mk("lb", "LB", 12, 72),
    mk("cb1", "CB", 36, 76),
    mk("cb2", "CB", 64, 76),
    mk("rb", "RB", 88, 72),
    mk("lm", "LM", 12, 48),
    mk("cm1", "CM", 38, 52),
    mk("cm2", "CM", 62, 52),
    mk("rm", "RM", 88, 48),
    mk("st", "ST", 50, 22),
  ];
}

function formation531_10() {
  return [
    mk("gk", "GK", 50, 93, true),
    mk("lb", "LB", 8, 72),
    mk("cb1", "CB", 28, 78),
    mk("cb2", "CB", 50, 80),
    mk("cb3", "CB", 72, 78),
    mk("rb", "RB", 92, 72),
    mk("cm1", "CM", 32, 48),
    mk("cm2", "CM", 50, 52),
    mk("cm3", "CM", 68, 48),
    mk("st", "ST", 50, 18),
  ];
}

function formation4221_10() {
  return [
    mk("gk", "GK", 50, 93, true),
    mk("lb", "LB", 12, 72),
    mk("cb1", "CB", 36, 76),
    mk("cb2", "CB", 64, 76),
    mk("rb", "RB", 88, 72),
    mk("cdm1", "CDM", 38, 58),
    mk("cdm2", "CDM", 62, 58),
    mk("lam", "CAM", 26, 34),
    mk("ram", "CAM", 74, 34),
    mk("st", "ST", 50, 16),
  ];
}

function formation351_10() {
  return [
    mk("gk", "GK", 50, 93, true),
    mk("cb1", "CB", 26, 78),
    mk("cb2", "CB", 50, 80),
    mk("cb3", "CB", 74, 78),
    mk("lm", "LM", 8, 48),
    mk("cm1", "CM", 28, 54),
    mk("cm2", "CM", 50, 56),
    mk("cm3", "CM", 72, 54),
    mk("rm", "RM", 92, 48),
    mk("st", "ST", 50, 18),
  ];
}

function formation4122_10() {
  return [
    mk("gk", "GK", 50, 93, true),
    mk("lb", "LB", 12, 72),
    mk("cb1", "CB", 36, 76),
    mk("cb2", "CB", 64, 76),
    mk("rb", "RB", 88, 72),
    mk("dm", "DM", 50, 58),
    mk("lam", "CAM", 28, 36),
    mk("ram", "CAM", 72, 36),
    mk("st1", "ST", 38, 18),
    mk("st2", "ST", 62, 18),
  ];
}

/** 9: GK + 8 */
function formation422() {
  return [
    mk("gk", "GK", 50, 93, true),
    mk("lb", "LB", 12, 72),
    mk("cb1", "CB", 36, 76),
    mk("cb2", "CB", 64, 76),
    mk("rb", "RB", 88, 72),
    mk("cm1", "CM", 38, 50),
    mk("cm2", "CM", 62, 50),
    mk("st1", "ST", 36, 22),
    mk("st2", "ST", 64, 22),
  ];
}

function formation332() {
  return [
    mk("gk", "GK", 50, 93, true),
    mk("cb1", "CB", 26, 78),
    mk("cb2", "CB", 50, 80),
    mk("cb3", "CB", 74, 78),
    mk("ml", "MF", 28, 50),
    mk("mc", "MF", 50, 53),
    mk("mr", "MF", 72, 50),
    mk("st1", "ST", 38, 20),
    mk("st2", "ST", 62, 20),
  ];
}

function formation233() {
  return [
    mk("gk", "GK", 50, 93, true),
    mk("dl", "DF", 30, 76),
    mk("dr", "DF", 70, 76),
    mk("ml", "MF", 22, 50),
    mk("mc", "MF", 50, 53),
    mk("mr", "MF", 78, 50),
    mk("fl", "FW", 24, 24),
    mk("fc", "FW", 50, 17),
    mk("fr", "FW", 76, 24),
  ];
}

function formation323() {
  return [
    mk("gk", "GK", 50, 93, true),
    mk("cb1", "CB", 26, 78),
    mk("cb2", "CB", 50, 80),
    mk("cb3", "CB", 74, 78),
    mk("dm1", "DM", 36, 56),
    mk("dm2", "DM", 64, 56),
    mk("fw1", "FW", 34, 28),
    mk("fw2", "FW", 50, 22),
    mk("fw3", "FW", 66, 28),
  ];
}

function formation431() {
  return [
    mk("gk", "GK", 50, 93, true),
    mk("lb", "LB", 12, 72),
    mk("cb1", "CB", 36, 76),
    mk("cb2", "CB", 64, 76),
    mk("rb", "RB", 88, 72),
    mk("cm1", "CM", 32, 50),
    mk("cm2", "CM", 50, 54),
    mk("cm3", "CM", 68, 50),
    mk("st", "ST", 50, 18),
  ];
}

function formation341() {
  return [
    mk("gk", "GK", 50, 93, true),
    mk("cb1", "CB", 26, 78),
    mk("cb2", "CB", 50, 80),
    mk("cb3", "CB", 74, 78),
    mk("lw", "LW", 8, 48),
    mk("cm1", "CM", 36, 52),
    mk("cm2", "CM", 64, 52),
    mk("rw", "RW", 92, 48),
    mk("st", "ST", 50, 18),
  ];
}

function formation242_9() {
  return [
    mk("gk", "GK", 50, 93, true),
    mk("dl", "DF", 32, 78),
    mk("dr", "DF", 68, 78),
    mk("lm", "MF", 10, 48),
    mk("cm1", "MF", 36, 52),
    mk("cm2", "MF", 64, 52),
    mk("rm", "MF", 90, 48),
    mk("st1", "ST", 38, 20),
    mk("st2", "ST", 62, 20),
  ];
}

function formation4211_9() {
  return [
    mk("gk", "GK", 50, 93, true),
    mk("lb", "LB", 12, 72),
    mk("cb1", "CB", 36, 76),
    mk("cb2", "CB", 64, 76),
    mk("rb", "RB", 88, 72),
    mk("cm1", "CM", 38, 50),
    mk("cm2", "CM", 62, 50),
    mk("ss", "SS", 50, 30),
    mk("st", "ST", 50, 14),
  ];
}

function formation3221_9() {
  return [
    mk("gk", "GK", 50, 93, true),
    mk("cb1", "CB", 28, 78),
    mk("cb2", "CB", 50, 80),
    mk("cb3", "CB", 72, 78),
    mk("dm1", "DM", 40, 56),
    mk("dm2", "DM", 60, 56),
    mk("wl", "WF", 22, 32),
    mk("wr", "WF", 78, 32),
    mk("st", "ST", 50, 14),
  ];
}

/** --- State --- */

function defaultState() {
  return {
    step: 1,
    match: null,
    formationId: null,
    names: {},
    subs: {},
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const s = JSON.parse(raw);
    if (![11, 10, 9].includes(s.match)) s.match = null;
    if (!s.names || typeof s.names !== "object") s.names = {};
    if (!s.subs || typeof s.subs !== "object") s.subs = {};
    return {
      step: 1,
      match: s.match,
      formationId: s.formationId,
      names: s.names,
      subs: s.subs,
    };
  } catch {
    return defaultState();
  }
}

function saveState() {
  const { step: _s, ...persist } = state;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(persist));
}

let state = loadState();

const els = {
  stepIndicators: [...document.querySelectorAll("[data-step-indicator]")],
  step1: document.getElementById("step1"),
  step2: document.getElementById("step2"),
  step3: document.getElementById("step3"),
  formationGrid: document.getElementById("formationGrid"),
  step2Summary: document.getElementById("step2Summary"),
  step2Legend: document.getElementById("step2Legend"),
  pitch: document.getElementById("pitch"),
  subsList: document.getElementById("subsList"),
  capture: document.getElementById("capture"),
  captureBadge: document.getElementById("captureBadge"),
  captureFormation: document.getElementById("captureFormation"),
  btnStep1Next: document.getElementById("btnStep1Next"),
  btnStep2Back: document.getElementById("btnStep2Back"),
  btnStep2Next: document.getElementById("btnStep2Next"),
  btnStep3Back: document.getElementById("btnStep3Back"),
  btnRestart: document.getElementById("btnRestart"),
  exportFormat: document.getElementById("exportFormat"),
  btnSaveImage: document.getElementById("btnSaveImage"),
  choiceCards: [...document.querySelectorAll(".choice-card")],
  brandHome: document.getElementById("brandHome"),
};

function getFormationList() {
  if (!state.match) return [];
  return OPTIONS[state.match];
}

/** 2단계 그리드용 순서(각 인원별로 인기 포메이션을 상단에 정렬) */
function getFormationListForStep2() {
  const list = getFormationList();
  if (!state.match) return list;

  let popularIds = [];
  if (state.match === 11) popularIds = POPULAR_11_IDS;
  else if (state.match === 10) popularIds = POPULAR_10_IDS;
  else if (state.match === 9) popularIds = POPULAR_9_IDS;

  if (!popularIds.length) {
    // 별표는 없지만 숫자 기준으로 정렬
    return [...list].sort((a, b) => {
      const na = parseInt(String(a.title).split("-")[0], 10) || 0;
      const nb = parseInt(String(b.title).split("-")[0], 10) || 0;
      if (na !== nb) return na - nb;
      return String(a.title).localeCompare(String(b.title));
    });
  }

  const top = popularIds.map((id) => list.find((f) => f.id === id)).filter(Boolean);
  const topIds = new Set(top.map((f) => f.id));
  const rest = list.filter((f) => !topIds.has(f.id));

  const restSorted = rest.sort((a, b) => {
    const na = parseInt(String(a.title).split("-")[0], 10) || 0;
    const nb = parseInt(String(b.title).split("-")[0], 10) || 0;
    if (na !== nb) return na - nb;
    return String(a.title).localeCompare(String(b.title));
  });

  return [...top, ...restSorted];
}

function getSelectedFormation() {
  const list = getFormationList();
  return list.find((f) => f.id === state.formationId) || null;
}

function setStep(step) {
  state.step = step;
  saveState();

  els.stepIndicators.forEach((el) => {
    const n = Number(el.dataset.stepIndicator);
    el.classList.toggle("is-active", n === step);
    el.classList.toggle("is-done", n < step);
  });

  [els.step1, els.step2, els.step3].forEach((panel, i) => {
    const n = i + 1;
    const on = n === step;
    panel.hidden = !on;
    panel.classList.toggle("is-active", on);
    panel.toggleAttribute("aria-hidden", !on);
  });

  if (step === 2) renderFormationChoices();
  if (step === 3) {
    renderPitch();
    renderSubs();
  }
}

function renderFormationChoices() {
  const list = getFormationListForStep2();
  els.step2Summary.textContent = `${state.match} vs ${state.match}`;
  els.step2Summary.hidden = state.match == null;
  els.formationGrid.replaceChildren();
  const hasPopular =
    (state.match === 11 && POPULAR_11_IDS.length) ||
    (state.match === 10 && POPULAR_10_IDS.length) ||
    (state.match === 9 && POPULAR_9_IDS.length);
  if (els.step2Legend) els.step2Legend.hidden = !hasPopular;

  let hasSelection = false;
  list.forEach((fm) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "formation-btn";
    btn.setAttribute("role", "option");
    btn.dataset.formationId = fm.id;

    const isPopular =
      (state.match === 11 && POPULAR_11_IDS.includes(fm.id)) ||
      (state.match === 10 && POPULAR_10_IDS.includes(fm.id)) ||
      (state.match === 9 && POPULAR_9_IDS.includes(fm.id));
    if (isPopular) {
      const star = document.createElement("span");
      star.className = "formation-btn__star";
      star.setAttribute("aria-hidden", "true");
      star.textContent = "★";
      btn.appendChild(star);
    }

    const titleEl = document.createElement("span");
    titleEl.className = "formation-btn__title";
    titleEl.textContent = fm.title;
    btn.appendChild(titleEl);

    if (isPopular) {
      btn.setAttribute("aria-label", `${fm.title}, 인기 포메이션`);
    }

    if (fm.id === state.formationId) {
      btn.classList.add("is-selected");
      hasSelection = true;
    }

    btn.addEventListener("click", () => {
      els.formationGrid.querySelectorAll(".formation-btn").forEach((b) => b.classList.remove("is-selected"));
      btn.classList.add("is-selected");
      state.formationId = fm.id;
      pruneNamesToSlots(fm.slots);
      state.subs = {};
      saveState();
      els.btnStep2Next.disabled = false;
      setStep(3);
    });

    els.formationGrid.appendChild(btn);
  });

  els.btnStep2Next.disabled = !hasSelection && list.length > 0;
  if (!list.length) els.btnStep2Next.disabled = true;
}

function pruneNamesToSlots(slots) {
  const valid = new Set(slots.map((s) => s.id));
  const next = {};
  for (const k of Object.keys(state.names)) {
    if (valid.has(k)) next[k] = state.names[k];
  }
  state.names = next;
}

/** 세로형 하프 코트 — 골대선·페널티 박스·센터 서클 등 */
function createPitchMarkingsSvg() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "pitch__markings");
  svg.setAttribute("viewBox", "0 0 100 100");
  svg.setAttribute("preserveAspectRatio", "none");
  svg.setAttribute("aria-hidden", "true");

  /* 라인 진하게 — 종횡비 68:105 코트에서 preserveAspectRatio none 보정으로 센터 서클은 타원으로 그려 화면에서는 정원 */
  const stroke = "rgba(255,255,255,0.92)";
  const strokeGoal = "#ffffff";
  const thin = "0.48";
  const goal = "0.62";
  /** 세로 코트(W:H=68:105)에서 정원으로 보이려면 viewBox에서 rx/ry = H/W */
  const centerRy = 12;
  const centerRx = (centerRy * 105) / 68;

  svg.innerHTML = `
    <!-- 터치라인·골라인 -->
    <rect x="5" y="5" width="90" height="90" fill="none" stroke="${stroke}" stroke-width="${thin}" />
    <!-- 센터 라인 -->
    <line x1="5" y1="50" x2="95" y2="50" stroke="${stroke}" stroke-width="${thin}" />
    <!-- 센터 서클 (타원 → 화면상 균일한 원) -->
    <ellipse cx="50" cy="50" rx="${centerRx}" ry="${centerRy}" fill="none" stroke="${stroke}" stroke-width="${thin}" />
    <!-- 페널티 에어리어 (상·하) -->
    <rect x="18" y="5" width="64" height="22" fill="none" stroke="${stroke}" stroke-width="${thin}" />
    <rect x="18" y="73" width="64" height="22" fill="none" stroke="${stroke}" stroke-width="${thin}" />
    <!-- 골 에어리어 (작은 박스) -->
    <rect x="32" y="5" width="36" height="9" fill="none" stroke="${stroke}" stroke-width="${thin}" />
    <rect x="32" y="86" width="36" height="9" fill="none" stroke="${stroke}" stroke-width="${thin}" />
    <!-- 골대 라인 (중앙 강조) -->
    <line x1="36" y1="5" x2="64" y2="5" stroke="${strokeGoal}" stroke-width="${goal}" stroke-linecap="round" opacity="0.98" />
    <line x1="36" y1="95" x2="64" y2="95" stroke="${strokeGoal}" stroke-width="${goal}" stroke-linecap="round" opacity="0.98" />
  `;

  return svg;
}

function renderPitch() {
  const fm = getSelectedFormation();
  if (!fm) return;

  const label = `${state.match} vs ${state.match}`;
  els.captureBadge.textContent = label;
  els.captureFormation.textContent = fm.title;

  els.pitch.replaceChildren();
  els.pitch.appendChild(createPitchMarkingsSvg());
  pruneNamesToSlots(fm.slots);

  fm.slots.forEach((slot) => {
    const wrap = document.createElement("div");
    wrap.className = "position-node";
    wrap.style.left = `${slot.x}%`;
    wrap.style.top = `${slot.y}%`;

    const slotLabel = String(slot.label || "").toUpperCase();

    let kind = "attacker";
    if (slot.gk || slotLabel === "GK") kind = "gk";
    else if (
      slotLabel === "CB" ||
      slotLabel === "LB" ||
      slotLabel === "RB" ||
      slotLabel === "DF" ||
      slotLabel === "DL" ||
      slotLabel === "DR" ||
      slotLabel === "LWB" ||
      slotLabel === "RWB"
    ) {
      kind = "defender";
    } else if (
      slotLabel === "CM" ||
      slotLabel === "DM" ||
      slotLabel === "LM" ||
      slotLabel === "RM" ||
      slotLabel === "AM" ||
      slotLabel === "CAM" ||
      slotLabel === "LAM" ||
      slotLabel === "RAM" ||
      slotLabel === "CDM" ||
      slotLabel === "LCM" ||
      slotLabel === "RCM" ||
      slotLabel === "MC" ||
      slotLabel === "ML" ||
      slotLabel === "MR" ||
      slotLabel === "MF"
    ) {
      kind = "midfielder";
    } else {
      kind = "attacker";
    }

    const marker = document.createElement("div");
    marker.className = `marker marker--${kind}`;

    const abbr = document.createElement("span");
    abbr.className = "marker__abbr";
    abbr.textContent = slot.label || "";

    const input = document.createElement("input");
    input.type = "text";
    input.className = "name-input";
    input.dataset.slotId = slot.id;
    input.placeholder = "이름";
    input.maxLength = 14;
    input.autocomplete = "off";
    input.value = state.names[slot.id] || "";

    const nameMirror = document.createElement("div");
    nameMirror.className = "name-mirror";
    nameMirror.setAttribute("aria-hidden", "true");

    const sync = () => {
      state.names[slot.id] = input.value;
      nameMirror.textContent = input.value.trim();
      saveState();
    };

    input.addEventListener("input", sync);
    input.addEventListener("keydown", handleStep3InputKeydown);
    nameMirror.textContent = (state.names[slot.id] || "").trim();

    marker.appendChild(abbr);
    wrap.appendChild(marker);
    wrap.appendChild(input);
    wrap.appendChild(nameMirror);

    els.pitch.appendChild(wrap);
  });
}

function renderSubs() {
  if (!els.subsList) return;
  els.subsList.replaceChildren();

  if (!state.subs || typeof state.subs !== "object") state.subs = {};

  for (let i = 0; i < 5; i++) {
    const key = `sub${i + 1}`;

    const row = document.createElement("div");
    row.className = "sub-row";

    const num = document.createElement("div");
    num.className = "sub-row__num";
    num.textContent = String(i + 1);

    const input = document.createElement("input");
    input.type = "text";
    input.className = "sub-input";
    input.placeholder = "이름";
    input.maxLength = 14;
    input.autocomplete = "off";
    input.dataset.subKey = key;
    input.value = state.subs[key] || "";

    const mirror = document.createElement("div");
    mirror.className = "sub-mirror";
    mirror.setAttribute("aria-hidden", "true");
    mirror.textContent = (state.subs[key] || "").trim();

    input.addEventListener("input", () => {
      state.subs[key] = input.value;
      mirror.textContent = input.value.trim();
      saveState();
    });
    input.addEventListener("keydown", handleStep3InputKeydown);

    row.appendChild(num);
    row.appendChild(input);
    row.appendChild(mirror);
    els.subsList.appendChild(row);
  }
}

/** 위→아래 줄 순, 줄 안에서는 왼쪽→오른쪽 → 이어서 SUB 1~5 */
function getStep3OrderedInputs() {
  const fm = getSelectedFormation();
  if (!fm || !els.pitch || !els.subsList) return [];
  const sorted = [...fm.slots].sort((a, b) => {
    if (a.y !== b.y) return a.y - b.y;
    return a.x - b.x;
  });
  const pitchInputs = [];
  for (const s of sorted) {
    const sel = `input.name-input[data-slot-id="${CSS.escape(s.id)}"]`;
    const inp = els.pitch.querySelector(sel);
    if (inp) pitchInputs.push(inp);
  }
  const subInputs = [...els.subsList.querySelectorAll("input.sub-input")];
  return [...pitchInputs, ...subInputs];
}

function handleStep3InputKeydown(e) {
  const el = e.target;
  if (!(el instanceof HTMLInputElement)) return;
  if (!el.matches("input.name-input, input.sub-input")) return;
  // 모바일(터치 기반)에서만 키 이동을 비활성화하고, 좁은 데스크톱 창은 허용.
  if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) return;

  const order = getStep3OrderedInputs();
  const i = order.indexOf(el);
  if (i === -1) return;

  const isEnter = (e.key === "Enter" || e.code === "Enter" || e.code === "NumpadEnter");
  if (isEnter && !e.shiftKey) {
    // 한글 IME 조합 중 Enter는 글자 확정용이므로 포커스 이동을 건너뜀.
    if (e.isComposing) return;
    e.preventDefault();
    if (i < order.length - 1) order[i + 1].focus();
    return;
  }

  if (e.key === "Tab") {
    if (e.shiftKey) {
      if (i > 0) {
        e.preventDefault();
        order[i - 1].focus();
      }
    } else if (i < order.length - 1) {
      e.preventDefault();
      order[i + 1].focus();
    }
  }
}

function isMobileDevice() {
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent || "");
}

function isIOSDevice() {
  return /iPad|iPhone|iPod/i.test(navigator.userAgent || "");
}

async function tryShareImage(blob, fileName) {
  if (typeof navigator === "undefined" || typeof navigator.share !== "function") return false;
  try {
    const file = new File([blob], fileName, { type: blob.type || "image/png" });
    if (typeof navigator.canShare === "function" && navigator.canShare({ files: [file] })) {
      await navigator.share({ files: [file], title: "squad-maker" });
      return true;
    }
  } catch {
    return false;
  }
  return false;
}

function canvasToBlob(canvas, mimeType, quality) {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), mimeType, quality);
  });
}

function triggerDownloadFromBlob(blob, fileName) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  anchor.rel = "noopener";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
  return url;
}

function triggerDownloadFromDataUrl(dataUrl, fileName) {
  const anchor = document.createElement("a");
  anchor.href = dataUrl;
  anchor.download = fileName;
  anchor.rel = "noopener";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  return dataUrl;
}

function getErrorMessage(error) {
  if (!error) return "unknown";
  if (typeof error === "string") return error;
  if (error instanceof Error) return error.message || error.name || "error";
  try {
    return JSON.stringify(error);
  } catch {
    return String(error);
  }
}

/* Navigation */
if (els.brandHome) {
  els.brandHome.addEventListener("click", () => setStep(1));
}

function goFromStep1ToStep2() {
  if (!state.match) return;
  setStep(2);
  const list = getFormationList();
  if (state.formationId && !list.some((f) => f.id === state.formationId)) {
    state.formationId = null;
    state.names = {};
    state.subs = {};
    saveState();
  }
}

els.choiceCards.forEach((card) => {
  card.addEventListener("click", () => {
    const m = Number(card.dataset.match);
    els.choiceCards.forEach((c) => c.classList.remove("is-selected"));
    card.classList.add("is-selected");
    state.match = m;
    state.formationId = null;
    state.names = {};
    state.subs = {};
    saveState();
    els.btnStep1Next.disabled = false;
    goFromStep1ToStep2();
  });
});

els.btnStep1Next.addEventListener("click", () => goFromStep1ToStep2());

els.btnStep2Back.addEventListener("click", () => setStep(1));

els.btnStep2Next.addEventListener("click", () => {
  if (!getSelectedFormation()) return;
  setStep(3);
});

els.btnStep3Back.addEventListener("click", () => setStep(2));

els.btnRestart.addEventListener("click", () => {
  if (!confirm("선택과 이름을 모두 초기하고 1단계로 돌아갈까요?")) return;
  state = defaultState();
  saveState();
  els.choiceCards.forEach((c) => c.classList.remove("is-selected"));
  els.btnStep1Next.disabled = true;
  setStep(1);
});

/** 이미지 저장 직전 — 미러 텍스트를 입력값과 동기화 */
function syncExportMirrors() {
  els.capture.querySelectorAll("input.name-input").forEach((inp) => {
    const wrap = inp.closest(".position-node");
    const mir = wrap?.querySelector(".name-mirror");
    if (mir) mir.textContent = inp.value.trim();
  });
  els.capture.querySelectorAll("input.sub-input").forEach((inp) => {
    const row = inp.closest(".sub-row");
    const mir = row?.querySelector(".sub-mirror");
    if (mir) mir.textContent = inp.value.trim();
  });
}

/* Image export */
async function saveImageFile() {
  if (typeof html2canvas !== "function") {
    alert("이미지 라이브러리를 불러오지 못했습니다. 인터넷 연결을 확인한 뒤 다시 시도해 주세요.");
    return;
  }

  const fmt = els.exportFormat.value;
  els.btnSaveImage.disabled = true;
  syncExportMirrors();
  els.capture.classList.add("is-exporting");

  // html2canvas clone에서 input의 실시간 value가 유실될 수 있어, 캡처 직전 값을 별도로 스냅샷.
  const nameSnapshot = {};
  els.capture.querySelectorAll("input.name-input").forEach((inp) => {
    if (!inp.dataset.slotId) return;
    nameSnapshot[inp.dataset.slotId] = inp.value.trim();
  });
  const subSnapshot = {};
  els.capture.querySelectorAll("input.sub-input").forEach((inp) => {
    if (!inp.dataset.subKey) return;
    subSnapshot[inp.dataset.subKey] = inp.value.trim();
  });

  // 배포 환경에서 캡처 직전에 웹폰트가 늦게 적용되는 경우를 대비.
  if (document.fonts?.load) {
    try {
      await Promise.all([
        document.fonts.load('700 14px "Nanum Gothic"'),
        document.fonts.load('900 14px "Nanum Gothic"'),
      ]);
    } catch {
      // 폰트 로드는 실패해도 저장 자체는 진행.
    }
  }
  if (document.fonts?.ready) await document.fonts.ready;
  await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

  try {
    const renderWith = (overrides = {}) =>
      html2canvas(els.capture, {
        scale: Math.min(2.5, Math.max(2, window.devicePixelRatio || 2)),
        useCORS: true,
        // 캔버스 오염 리소스가 끼어 export가 막히는 것을 방지.
        allowTaint: false,
        /** 카드 하단 톤과 맞춤 — 반투명 배경과 합치면 테두리가 탁해짐 */
        backgroundColor: "#131b22",
        logging: false,
        removeContainer: false,
        imageTimeout: 15000,
        onclone(doc) {
          const root = doc.getElementById("capture");
          if (!root) return;
          root.classList.add("is-exporting");

          // 복제 DOM에서도 입력창/미러 상태를 강제로 맞춰 캡처 시점 레이스를 방지.
          root.querySelectorAll("input.name-input").forEach((inp) => {
            const node = inp.closest(".position-node");
            const mir = node?.querySelector(".name-mirror");
            if (mir) {
              const slotId = inp.dataset.slotId || "";
              mir.textContent = nameSnapshot[slotId] ?? "";
              mir.style.display = "flex";
              mir.style.opacity = "1";
            }
            inp.style.display = "none";
          });
          root.querySelectorAll("input.sub-input").forEach((inp) => {
            const row = inp.closest(".sub-row");
            const mir = row?.querySelector(".sub-mirror");
            if (mir) {
              const subKey = inp.dataset.subKey || "";
              mir.textContent = subSnapshot[subKey] ?? "";
              mir.style.display = "flex";
              mir.style.opacity = "1";
            }
            inp.style.display = "none";
          });

          const setExact = (el) => {
            if (el.nodeType !== Node.ELEMENT_NODE) return;
            el.style.setProperty("-webkit-print-color-adjust", "exact");
            el.style.setProperty("print-color-adjust", "exact");
            el.style.setProperty("color-adjust", "exact");
            for (const child of el.children) setExact(child);
          };
          setExact(root);
        },
        ...overrides,
      });

    let canvas;
    try {
      canvas = await renderWith();
    } catch (firstErr) {
      // 특정 브라우저에서 CORS/클론 이슈로 1차 렌더가 실패할 수 있어 완화 설정으로 1회 재시도.
      console.warn("primary export failed, retrying relaxed mode", firstErr);
      canvas = await renderWith({
        useCORS: false,
        allowTaint: true,
      });
    }

    /** JPEG는 크로마 서브샘플링으로 채도 손실될 수 있음 → 최고 품질 */
    const quality = fmt === "jpeg" ? 1 : undefined;
    const mimeType = fmt === "png" ? "image/png" : "image/jpeg";

    const ext = fmt === "png" ? "png" : "jpg";
    const stamp = new Date().toISOString().slice(0, 19).replace(/[:-]/g, "").replace("T", "-");
    const fname = `squad-${stamp}.${ext}`;

    let objectUrlOrDataUrl = "";
    const blob = await canvasToBlob(canvas, mimeType, quality);
    if (blob) {
      const shared = await tryShareImage(blob, fname);
      if (shared) return;
      objectUrlOrDataUrl = triggerDownloadFromBlob(blob, fname);
    } else {
      // 일부 브라우저에서 toBlob이 null을 반환하므로 dataURL 경로로 재시도.
      const dataUrl = canvas.toDataURL(mimeType, quality);
      objectUrlOrDataUrl = triggerDownloadFromDataUrl(dataUrl, fname);
    }

    // iOS Safari는 download 속성이 자주 무시되어 이미지 탭을 열어 길게 눌러 저장하도록 처리.
    if (isIOSDevice()) {
      const win = window.open(objectUrlOrDataUrl, "_blank");
      if (!win) window.location.href = objectUrlOrDataUrl;
      alert("이미지가 새 탭에 열렸습니다. 이미지를 길게 눌러 사진에 저장해 주세요.");
      return;
    }

    // 일부 모바일 브라우저(특히 안드로이드 웹뷰)에서 download 무시 시 새 탭 fallback.
    if (isMobileDevice()) {
      setTimeout(() => {
        if (document.visibilityState === "visible") {
          window.open(objectUrlOrDataUrl, "_blank");
        }
      }, 220);
    }
  } catch (e) {
    console.error(e);
    alert(`이미지 저장 실패: ${getErrorMessage(e)}`);
  } finally {
    els.capture.classList.remove("is-exporting");
    els.btnSaveImage.disabled = false;
  }
}

els.btnSaveImage.addEventListener("click", saveImageFile);

/** 페이지 로드 시 항상 1단계부터 (단계 번호는 저장하지 않음) */
function hydrate() {
  state.step = 1;

  if (state.match) {
    const card = els.choiceCards.find((c) => Number(c.dataset.match) === state.match);
    if (card) {
      els.choiceCards.forEach((c) => c.classList.remove("is-selected"));
      card.classList.add("is-selected");
      els.btnStep1Next.disabled = false;
    }
  }

  els.step1.hidden = false;
  els.step2.hidden = true;
  els.step3.hidden = true;
  els.stepIndicators.forEach((el) => {
    const n = Number(el.dataset.stepIndicator);
    el.classList.toggle("is-active", n === 1);
    el.classList.toggle("is-done", false);
  });

  setStep(1);
}

hydrate();
