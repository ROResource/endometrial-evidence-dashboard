// Endometrial cancer adjuvant evidence - extracted from published trial reports.
// Values are author-reported point estimates (%). Not pooled across trials unless labelled.
const TRIALS = {
  P1:  {name:"PORTEC-1", ref:"Creutzberg et al. IJROBP 2011 (15-yr update)", doi:"10.1016/j.ijrobp.2011.04.013", n:714, fu:"13.3 yr", pop:"Stage I (IC G1–2, IB G2–3), intermediate risk", arms:"Pelvic EBRT 46 Gy vs no additional treatment (NAT)", key:"EBRT cut 15-yr locoregional recurrence 15.5% → 6% (mostly vaginal); no OS benefit. Avoid EBRT in low/intermediate risk."},
  G99: {name:"GOG-99", ref:"Keys et al. Gynecol Oncol 2004", doi:"10.1016/j.ygyno.2003.11.048", n:392, fu:"69 mo", pop:"Stage IB, IC, II (occult) intermediate risk; GOG-99 HIR subgroup defined", arms:"Pelvic RT 50.4 Gy/28 vs NAT", key:"RT reduced recurrence (2-yr 12% → 3%), greatest in HIR (26% → 6%); no significant OS difference."},
  P2:  {name:"PORTEC-2", ref:"Nout et al. Lancet 2010", doi:"10.1016/S0140-6736(09)62163-2", n:427, fu:"45 mo", pop:"Stage I–IIA, high-intermediate risk", arms:"EBRT 46 Gy/23 vs VBT 21 Gy HDR/3 (or 30 Gy LDR)", key:"VBT non-inferior for vaginal control with far less GI toxicity; slightly more isolated pelvic relapse."},
  P4a: {name:"PORTEC-4a", ref:"van den Heerik et al. Lancet Oncol 2026", doi:"", pm:"PORTEC-4a molecular profile van den Heerik 2026", n:564, fu:"58 mo", pop:"Stage I–II high-intermediate risk", arms:"Molecular-profile-based (obs / VBT / EBRT) vs standard VBT (2:1)", key:"Molecular strategy non-inferior for vaginal recurrence; spared 46% (favourable profile) adjuvant RT."},
  G249:{name:"GOG-249", ref:"Randall et al. JCO 2019", doi:"10.1200/JCO.18.01575", n:601, fu:"53 mo", pop:"Stage I HIR endometrioid, stage II, stage I–II serous/clear cell", arms:"Pelvic RT 45–50.4 Gy vs VCB + carboplatin/paclitaxel ×3", key:"VCB/chemo not superior; more nodal relapse (9% vs 4%) and more acute toxicity. Pelvic RT remains standard."},
  P3:  {name:"PORTEC-3", ref:"de Boer et al. Lancet Oncol 2018; 2019 update", doi:"10.1016/S1470-2045(19)30395-X", n:660, fu:"72.6 mo", pop:"High-risk stage I–III (incl. serous/clear cell)", arms:"Pelvic RT 48.6 Gy vs RT + cisplatin ×2 then carboplatin/paclitaxel ×4", key:"Chemoradiotherapy improved 5-yr OS (+5%) and FFS (+7%); benefit concentrated in stage III and serous."},
  G258:{name:"GOG-258", ref:"Matei et al. NEJM 2019", doi:"10.1056/NEJMoa1813181", n:736, fu:"47 mo", pop:"Stage III–IVA (≤2 cm residual)", arms:"Chemoradiotherapy (cisplatin-RT then carbo/pacli ×4) vs carbo/pacli ×6", key:"No RFS gain from adding RT, but RT halved vaginal and nodal recurrence; distant relapse higher with CRT."}
};

// Stage/risk groups
const GROUPS = {
  ir:  {label:"Stage I–II · intermediate / high-intermediate risk", short:"Early · HIR"},
  hr:  {label:"Stage I–II · high risk (incl. serous/clear cell)", short:"Early · high risk"},
  adv: {label:"Stage III–IVA", short:"Advanced"}
};

// Outcome rows: trial, group, endpoint, timepoint(yr), arm, value(%), ci, note
// endpoints: OS, RFS (RFS/FFS/DFS), VR vaginal recurrence, LRR locoregional, NODAL pelvic/PA nodal, DM distant
const OUT = [
 // PORTEC-1 (15-yr)
 {t:"P1",g:"ir",e:"OS",y:15,arm:"No adjuvant (NAT)",tx:"none",v:60},
 {t:"P1",g:"ir",e:"OS",y:15,arm:"Pelvic EBRT",tx:"ebrt",v:52,note:"p=0.14"},
 {t:"P1",g:"ir",e:"RFS",y:15,arm:"No adjuvant (NAT)",tx:"none",v:54,note:"Failure-free survival"},
 {t:"P1",g:"ir",e:"RFS",y:15,arm:"Pelvic EBRT",tx:"ebrt",v:50},
 {t:"P1",g:"ir",e:"LRR",y:15,arm:"No adjuvant (NAT)",tx:"none",v:15.5,note:"11.0% vaginal"},
 {t:"P1",g:"ir",e:"LRR",y:15,arm:"Pelvic EBRT",tx:"ebrt",v:6,note:"p<0.0001"},
 {t:"P1",g:"ir",e:"DM",y:15,arm:"No adjuvant (NAT)",tx:"none",v:7},
 {t:"P1",g:"ir",e:"DM",y:15,arm:"Pelvic EBRT",tx:"ebrt",v:9},
 // GOG-99
 {t:"G99",g:"ir",e:"OS",y:4,arm:"No adjuvant (NAT)",tx:"none",v:86},
 {t:"G99",g:"ir",e:"OS",y:4,arm:"Pelvic RT",tx:"ebrt",v:92,note:"NS, p=0.56"},
 {t:"G99",g:"ir",e:"ANYREC",y:2,arm:"No adjuvant (NAT)",tx:"none",v:12,note:"Cumulative incidence of recurrence"},
 {t:"G99",g:"ir",e:"ANYREC",y:2,arm:"Pelvic RT",tx:"ebrt",v:3,note:"RH 0.42"},
 {t:"G99",g:"ir",e:"ANYREC",y:2,arm:"NAT – HIR subgroup",tx:"none",v:26,note:"HIR subgroup"},
 {t:"G99",g:"ir",e:"ANYREC",y:2,arm:"Pelvic RT – HIR subgroup",tx:"ebrt",v:6,note:"HIR subgroup"},
 // PORTEC-2
 {t:"P2",g:"ir",e:"OS",y:5,arm:"Pelvic EBRT",tx:"ebrt",v:79.6,ci:"71.2–88.0"},
 {t:"P2",g:"ir",e:"OS",y:5,arm:"Vaginal brachytherapy",tx:"vbt",v:84.8,ci:"79.3–90.3"},
 {t:"P2",g:"ir",e:"RFS",y:5,arm:"Pelvic EBRT",tx:"ebrt",v:78.1,note:"Disease-free survival"},
 {t:"P2",g:"ir",e:"RFS",y:5,arm:"Vaginal brachytherapy",tx:"vbt",v:82.7},
 {t:"P2",g:"ir",e:"VR",y:5,arm:"Pelvic EBRT",tx:"ebrt",v:1.6,ci:"0.5–4.9"},
 {t:"P2",g:"ir",e:"VR",y:5,arm:"Vaginal brachytherapy",tx:"vbt",v:1.8,ci:"0.6–5.9"},
 {t:"P2",g:"ir",e:"LRR",y:5,arm:"Pelvic EBRT",tx:"ebrt",v:2.1},
 {t:"P2",g:"ir",e:"LRR",y:5,arm:"Vaginal brachytherapy",tx:"vbt",v:5.1,note:"Isolated pelvic 1.5% vs 0.5%"},
 {t:"P2",g:"ir",e:"DM",y:5,arm:"Pelvic EBRT",tx:"ebrt",v:5.7},
 {t:"P2",g:"ir",e:"DM",y:5,arm:"Vaginal brachytherapy",tx:"vbt",v:8.3},
 // PORTEC-4a
 {t:"P4a",g:"ir",e:"OS",y:5,arm:"Standard VBT",tx:"vbt",v:90.9},
 {t:"P4a",g:"ir",e:"OS",y:5,arm:"Molecular-profile-based",tx:"mol",v:88.0,note:"HR 1.24 (0.72–2.13)"},
 {t:"P4a",g:"ir",e:"VR",y:5,arm:"Standard VBT",tx:"vbt",v:1.6},
 {t:"P4a",g:"ir",e:"VR",y:5,arm:"Molecular-profile-based",tx:"mol",v:4.5,note:"Non-inferior (margin 7%)"},
 {t:"P4a",g:"ir",e:"VR",y:5,arm:"Favourable profile: VBT",tx:"vbt",v:0.9,note:"POLEmut / NSMP-CTNNB1wt"},
 {t:"P4a",g:"ir",e:"VR",y:5,arm:"Favourable profile: observation",tx:"none",v:4.1,note:"POLEmut / NSMP-CTNNB1wt"},
 // GOG-249
 {t:"G249",g:"hr",e:"OS",y:5,arm:"Pelvic RT",tx:"ebrt",v:87,ci:"83–91"},
 {t:"G249",g:"hr",e:"OS",y:5,arm:"VCB + chemo ×3",tx:"vbtct",v:85,ci:"81–90"},
 {t:"G249",g:"hr",e:"RFS",y:5,arm:"Pelvic RT",tx:"ebrt",v:76},
 {t:"G249",g:"hr",e:"RFS",y:5,arm:"VCB + chemo ×3",tx:"vbtct",v:76},
 {t:"G249",g:"hr",e:"VR",y:5,arm:"Pelvic RT",tx:"ebrt",v:2.5,note:"≈2.5% both arms"},
 {t:"G249",g:"hr",e:"VR",y:5,arm:"VCB + chemo ×3",tx:"vbtct",v:2.5},
 {t:"G249",g:"hr",e:"NODAL",y:5,arm:"Pelvic RT",tx:"ebrt",v:4},
 {t:"G249",g:"hr",e:"NODAL",y:5,arm:"VCB + chemo ×3",tx:"vbtct",v:9},
 {t:"G249",g:"hr",e:"DM",y:5,arm:"Pelvic RT",tx:"ebrt",v:18},
 {t:"G249",g:"hr",e:"DM",y:5,arm:"VCB + chemo ×3",tx:"vbtct",v:18},
 // PORTEC-3 stage I-II subgroup
 {t:"P3",g:"hr",e:"OS",y:5,arm:"Pelvic RT",tx:"ebrt",v:82.0,ci:"76.5–87.7",note:"Stage I–II subgroup"},
 {t:"P3",g:"hr",e:"OS",y:5,arm:"Chemoradiotherapy",tx:"crt",v:83.8,ci:"78.4–89.5",note:"HR 0.84, p=0.50"},
 // PORTEC-3 stage III subgroup
 {t:"P3",g:"adv",e:"OS",y:5,arm:"Pelvic RT",tx:"ebrt",v:68.5,ci:"61.2–76.7",note:"Stage III subgroup"},
 {t:"P3",g:"adv",e:"OS",y:5,arm:"Chemoradiotherapy",tx:"crt",v:78.5,ci:"72.2–85.4",note:"HR 0.63, p=0.043"},
 {t:"P3",g:"adv",e:"RFS",y:5,arm:"Pelvic RT",tx:"ebrt",v:58.4,note:"Failure-free survival, stage III"},
 {t:"P3",g:"adv",e:"RFS",y:5,arm:"Chemoradiotherapy",tx:"crt",v:70.9,note:"HR 0.61"},
 // PORTEC-3 whole cohort recurrence (stage I-III)
 {t:"P3",g:"all",e:"VR",y:5,arm:"Pelvic RT",tx:"ebrt",v:0.3,note:"Isolated vaginal, first site (whole trial)"},
 {t:"P3",g:"all",e:"VR",y:5,arm:"Chemoradiotherapy",tx:"crt",v:0.3},
 {t:"P3",g:"all",e:"DM",y:5,arm:"Pelvic RT",tx:"ebrt",v:29.1,note:"Whole trial"},
 {t:"P3",g:"all",e:"DM",y:5,arm:"Chemoradiotherapy",tx:"crt",v:21.4,note:"HR 0.74"},
 // GOG-258
 {t:"G258",g:"adv",e:"RFS",y:5,arm:"Chemotherapy alone",tx:"ct",v:58,ci:"53–64"},
 {t:"G258",g:"adv",e:"RFS",y:5,arm:"Chemoradiotherapy",tx:"crt",v:59,ci:"53–65"},
 {t:"G258",g:"adv",e:"VR",y:5,arm:"Chemotherapy alone",tx:"ct",v:7},
 {t:"G258",g:"adv",e:"VR",y:5,arm:"Chemoradiotherapy",tx:"crt",v:2,note:"HR 0.36"},
 {t:"G258",g:"adv",e:"NODAL",y:5,arm:"Chemotherapy alone",tx:"ct",v:20},
 {t:"G258",g:"adv",e:"NODAL",y:5,arm:"Chemoradiotherapy",tx:"crt",v:11,note:"HR 0.43"},
 {t:"G258",g:"adv",e:"DM",y:5,arm:"Chemotherapy alone",tx:"ct",v:21},
 {t:"G258",g:"adv",e:"DM",y:5,arm:"Chemoradiotherapy",tx:"crt",v:27,note:"HR 1.36"}
];
// PORTEC-3 whole-trial OS/FFS (headline)
OUT.push(
 {t:"P3",g:"all",e:"OS",y:5,arm:"Pelvic RT",tx:"ebrt",v:76.1,ci:"71.6–80.9",note:"Whole trial"},
 {t:"P3",g:"all",e:"OS",y:5,arm:"Chemoradiotherapy",tx:"crt",v:81.4,ci:"77.2–85.8",note:"HR 0.70, p=0.034"}
);

// Local-control comparisons (absolute benefit of adjuvant therapy)
const LC = [
 {g:"ir",t:"P1",cmp:"Pelvic EBRT vs no adjuvant",end:"Locoregional recurrence",y:15,ctrl:15.5,tx:6,rand:true},
 {g:"ir",t:"G99",cmp:"Pelvic RT vs no adjuvant (all)",end:"Any recurrence",y:2,ctrl:12,tx:3,rand:true},
 {g:"ir",t:"G99",cmp:"Pelvic RT vs no adjuvant (HIR)",end:"Any recurrence",y:2,ctrl:26,tx:6,rand:true},
 {g:"ir",t:"P4a",cmp:"VBT vs observation (favourable molecular)",end:"Vaginal recurrence",y:5,ctrl:4.1,tx:0.9,rand:true,caveat:"Not significant; salvage effective"},
 {g:"ir",t:"P2",cmp:"VBT vs EBRT",end:"Vaginal recurrence",y:5,ctrl:1.6,tx:1.8,rand:true,caveat:"Equivalent – VBT non-inferior"},
 {g:"hr",t:"G249",cmp:"Pelvic RT vs VCB + chemo",end:"Pelvic/para-aortic nodal",y:5,ctrl:9,tx:4,rand:true},
 {g:"adv",t:"G258",cmp:"Adding RT to chemo",end:"Vaginal recurrence",y:5,ctrl:7,tx:2,rand:true},
 {g:"adv",t:"G258",cmp:"Adding RT to chemo",end:"Pelvic/para-aortic nodal",y:5,ctrl:20,tx:11,rand:true},
 {g:"adv",t:"G258",cmp:"Adding RT to chemo",end:"Distant recurrence",y:5,ctrl:21,tx:27,rand:true,caveat:"Worse with CRT (less chemo delivered)"},
 {g:"adv",t:"P3",cmp:"Adding chemo to RT (whole trial)",end:"Distant recurrence",y:5,ctrl:29.1,tx:21.4,rand:true}
];

// Toxicity: trial, group, category, grade, phase, rows [arm,rate]
const TOX = [
 {t:"P2",g:"ir",cat:"GI",gr:"G1–2",ph:"Acute (end of RT)",a:[["Pelvic EBRT",53.8],["VBT",12.6]]},
 {t:"G99",g:"ir",cat:"GI",gr:"G3–4",ph:"Any (GOG criteria)",a:[["No adjuvant",0.5],["Pelvic RT",4.7]],note:"2 RT-related deaths (bowel)"},
 {t:"G99",g:"ir",cat:"Bowel obstruction",gr:"G3–4",ph:"Any",a:[["No adjuvant",0.5],["Pelvic RT",3.2]]},
 {t:"P4a",g:"ir",cat:"GU",gr:"G≥3",ph:"Any",a:[["Standard VBT",2],["Molecular-based",1]]},
 {t:"G249",g:"hr",cat:"Neuropathy",gr:"G≥2",ph:"Any",a:[["Pelvic RT",0.5],["VCB + chemo",10]],note:"Acute toxicity greater with VCB/C; late similar"},
 {t:"P3",g:"hr",cat:"Any adverse event",gr:"G≥3",ph:"During treatment",a:[["Pelvic RT",12],["Chemoradiotherapy",60]],note:"Mostly haematological"},
 {t:"P3",g:"hr",cat:"Any adverse event",gr:"G3",ph:"Late (5 yr)",a:[["Pelvic RT",5],["Chemoradiotherapy",8]]},
 {t:"P3",g:"hr",cat:"Any adverse event",gr:"G≥2",ph:"Late (5 yr)",a:[["Pelvic RT",23],["Chemoradiotherapy",38]]},
 {t:"P3",g:"hr",cat:"Neuropathy",gr:"G≥2",ph:"Late (5 yr)",a:[["Pelvic RT",0],["Chemoradiotherapy",6]]},
 {t:"P3",g:"hr",cat:"Fatigue",gr:"G≥2",ph:"During treatment",a:[["Pelvic RT",2],["Chemoradiotherapy",21]]},
 {t:"G258",g:"adv",cat:"Any adverse event",gr:"G≥3",ph:"Any",a:[["Chemo alone",63],["Chemoradiotherapy",58]]},
 {t:"G258",g:"adv",cat:"GI",gr:"G≥3",ph:"Any",a:[["Chemo alone",4],["Chemoradiotherapy",13]]},
 {t:"G258",g:"adv",cat:"Haematological",gr:"G≥3",ph:"Any",a:[["Chemo alone",52],["Chemoradiotherapy",40]]},
 {t:"G258",g:"adv",cat:"GU",gr:"G≥3",ph:"Any",a:[["Chemo alone",1],["Chemoradiotherapy",2]]}
];
// PORTEC-3 rows apply to whole trial (stage I-III); shown in both high-risk and advanced
TOX.filter(x=>x.t==="P3").forEach(x=>TOX.push({...x,g:"adv"}));

const BOTTOM = {
 ir:["Adjuvant RT roughly halves-to-thirds locoregional recurrence but does not improve OS.","VBT gives vaginal control equal to EBRT with far less GI toxicity — standard for HIR.","Favourable molecular profile (POLEmut, NSMP-CTNNB1wt): observation is reasonable (PORTEC-4a)."],
 hr:["Pelvic RT remains the backbone; VCB + chemo did not improve RFS and increased nodal relapse (GOG-249).","Adding chemo in stage I–II gave no significant OS gain in PORTEC-3 (83.8% vs 82.0%).","Cost: much more acute G≥3 toxicity and persistent neuropathy with chemo."],
 adv:["Chemo is key for survival: PORTEC-3 stage III 5-yr OS 78.5% with CRT vs 68.5% RT alone.","RT adds pelvic/vaginal control on top of chemo (GOG-258) but no RFS gain.","Distant relapse dominates (≈20–30%) – the main failure pattern."]
};

// ===== v2 additions =====
Object.assign(TRIALS,{
  P3L: {name:"PORTEC-3 10-yr", ref:"Post et al. Lancet Oncol 2025", doi:"10.1016/S1470-2045(25)00379-1", n:660, fu:"10.1 yr", pop:"High-risk stage I–III; molecular class in 411", arms:"Pelvic RT vs chemoradiotherapy", key:"Benefit durable at 10 yr (OS +7%); clinically relevant gain mainly in p53abn; none apparent in MMRd/POLEmut."},
  P3M: {name:"PORTEC-3 molecular", ref:"León-Castillo et al. JCO 2020", doi:"10.1200/JCO.20.00549", n:410, fu:"5 yr", pop:"PORTEC-3 patients with molecular classification", arms:"Pelvic RT vs chemoradiotherapy", key:"p53abn: 5-yr RFS 59% vs 36% with CRT regardless of histology; POLEmut ~98–100% either arm."},
  P2L: {name:"PORTEC-2 10-yr", ref:"Wortman et al. Br J Cancer 2018", doi:"10.1038/s41416-018-0310-8", n:427, fu:"116 mo", pop:"Stage I–IIA high-intermediate risk", arms:"EBRT vs VBT", key:"VBT vaginal control durable; pelvic recurrence higher without EBRT (6.3% vs 0.9%), concentrated in p53abn, L1CAM+ or substantial LVSI."},
  G258L:{name:"GOG-258 final OS", ref:"Matei et al. Gynecol Oncol (final OS analysis)", doi:"", pm:"GOG-258 final overall survival Matei", n:813, fu:"112 mo", pop:"Stage III–IVA", arms:"Chemoradiotherapy vs chemotherapy", key:"No OS difference (HR 1.05, 0.82–1.34); no subgroup predicted OS benefit from adding RT."},
  G258M:{name:"GOG-258 molecular", ref:"Clements et al., summarised in Brower et al. Pract Radiat Oncol 2026", doi:"", pm:"GOG-258 molecular classification Clements", n:420, fu:"113 mo", pop:"GOG-258 patients with MMR/p53 IHC (no POLE testing)", arms:"Chemoradiotherapy vs chemotherapy", key:"p53wt/MMRp (≈NSMP): 5-yr RFS 77% vs 60% with added RT; no gain in p53abn or MMRd. Exploratory."},
  TIMEC:{name:"TIME-C (RTOG 1203)", ref:"Klopp et al. JCO 2018", doi:"", pmid:"29989857", n:278, fu:"End of RT", pop:"Post-op pelvic RT, endometrial and cervix", arms:"4-field 3D RT vs IMRT", key:"IMRT reduced patient-reported bowel and urinary toxicity during RT."},
  RUBY:{name:"RUBY", ref:"Mirza et al. NEJM 2023", doi:"10.1056/NEJMoa2216334", n:494, fu:"24 mo", pop:"Primary stage III–IV or first recurrent", arms:"Carbo/paclitaxel ± dostarlimab", key:"Large PFS and OS gain in dMMR/MSI-H (PFS HR 0.28); smaller effect in MMRp."}
});
TRIALS.G258L.key=TRIALS.G258L.key; // final OS from author manuscript
OUT.push(
 {t:"P2L",g:"ir",e:"OS",y:10,arm:"Pelvic EBRT",tx:"ebrt",v:67.6},
 {t:"P2L",g:"ir",e:"OS",y:10,arm:"Vaginal brachytherapy",tx:"vbt",v:69.5,note:"p=0.72"},
 {t:"P2L",g:"ir",e:"VR",y:10,arm:"Pelvic EBRT",tx:"ebrt",v:2.4},
 {t:"P2L",g:"ir",e:"VR",y:10,arm:"Vaginal brachytherapy",tx:"vbt",v:3.4,note:"p=0.55"},
 {t:"P2L",g:"ir",e:"NODAL",y:10,arm:"Pelvic EBRT",tx:"ebrt",v:0.9,note:"Pelvic recurrence"},
 {t:"P2L",g:"ir",e:"NODAL",y:10,arm:"Vaginal brachytherapy",tx:"vbt",v:6.3,note:"p=0.004"},
 {t:"P2L",g:"ir",e:"DM",y:10,arm:"Pelvic EBRT",tx:"ebrt",v:8.9},
 {t:"P2L",g:"ir",e:"DM",y:10,arm:"Vaginal brachytherapy",tx:"vbt",v:10.4},
 {t:"P3L",g:"all",e:"OS",y:10,arm:"Pelvic RT",tx:"ebrt",v:67.3,ci:"62.3–72.7",note:"Whole trial"},
 {t:"P3L",g:"all",e:"OS",y:10,arm:"Chemoradiotherapy",tx:"crt",v:74.4,ci:"69.8–79.4",note:"HR 0.73, p=0.032"},
 {t:"P3L",g:"all",e:"RFS",y:10,arm:"Pelvic RT",tx:"ebrt",v:67.4,note:"Whole trial"},
 {t:"P3L",g:"all",e:"RFS",y:10,arm:"Chemoradiotherapy",tx:"crt",v:72.8,note:"HR 0.74"},
 {t:"RUBY",g:"adv",e:"OS",y:2,arm:"Chemo + placebo",tx:"ct",v:56.0,note:"All-comers, incl. recurrent"},
 {t:"RUBY",g:"adv",e:"OS",y:2,arm:"Chemo + dostarlimab",tx:"io",v:71.3,note:"HR 0.64"},
 {t:"RUBY",g:"adv",e:"RFS",y:2,arm:"Chemo + placebo",tx:"ct",v:18.1,note:"Progression-free survival"},
 {t:"RUBY",g:"adv",e:"RFS",y:2,arm:"Chemo + dostarlimab",tx:"io",v:36.1,note:"HR 0.64"}
);
LC.push(
 {g:"ir",t:"P2L",cmp:"EBRT vs VBT",end:"Pelvic recurrence",y:10,ctrl:6.3,tx:0.9,rand:true,caveat:"Gain concentrated in p53abn / L1CAM+ / substantial LVSI"},
 {g:"adv",t:"G258M",cmp:"Adding RT to chemo – p53wt/MMRp (≈NSMP)",end:"Any recurrence or death (1 − RFS)",y:5,ctrl:40,tx:23,rand:true,caveat:"Exploratory molecular subgroup"}
);
TOX.push(
 {t:"TIMEC",g:"ir",cat:"Patient-reported diarrhoea (frequent/constant)",gr:"PRO",ph:"End of RT",a:[["3D 4-field",51.9],["IMRT",33.7]],note:"Antidiarrhoeal ≥4×/day: 20.4% vs 7.8%"},
 {t:"TIMEC",g:"hr",cat:"Patient-reported diarrhoea (frequent/constant)",gr:"PRO",ph:"End of RT",a:[["3D 4-field",51.9],["IMRT",33.7]]},
 {t:"TIMEC",g:"adv",cat:"Patient-reported diarrhoea (frequent/constant)",gr:"PRO",ph:"End of RT",a:[["3D 4-field",51.9],["IMRT",33.7]]}
);
BOTTOM.adv.push("GOG-258 final analysis: no OS difference with added RT (HR 1.05); molecular data suggest RT helps p53wt/NSMP (RFS 77% vs 60%).","dMMR stage III–IV: chemo + immunotherapy (RUBY 2-yr OS 83% vs 59% in dMMR).");
BOTTOM.ir.push("PORTEC-2 10-yr: VBT vaginal control holds (3.4% vs 2.4%); pelvic relapse 6.3% vs 0.9% – consider EBRT for p53abn / substantial LVSI.");
BOTTOM.hr.push("PORTEC-3 10-yr: OS 74.4% vs 67.3% with CRT – benefit chiefly in p53abn.");

// Molecular subgroup outcomes: chemo/RT benefit by class
const MOL = [
 {cls:"p53abn",t:"P3L",e:"10-yr OS",ctrlL:"RT",ctrl:36.6,txL:"CRT",tx:52.7,hr:"HR 0.52 (0.30–0.91)",sig:true},
 {cls:"p53abn",t:"P3L",e:"10-yr RFS",ctrlL:"RT",ctrl:37.0,txL:"CRT",tx:52.6,hr:"HR 0.42 (0.24–0.74)",sig:true},
 {cls:"p53abn",t:"P3M",e:"5-yr RFS",ctrlL:"RT",ctrl:36,txL:"CRT",tx:59,hr:"p=0.019",sig:true},
 {cls:"p53abn",t:"G258M",e:"5-yr RFS",ctrlL:"Chemo",ctrl:29,txL:"Chemo + RT",tx:29,hr:"HR 0.76 (0.46–1.24)"},
 {cls:"POLEmut",t:"P3L",e:"10-yr OS",ctrlL:"RT",ctrl:96.4,txL:"CRT",tx:100,hr:"p=0.40"},
 {cls:"POLEmut",t:"P3M",e:"5-yr RFS",ctrlL:"RT",ctrl:97,txL:"CRT",tx:100,hr:"p=0.64"},
 {cls:"POLEmut",t:"P4a",e:"5-yr vaginal recurrence*",ctrlL:"VBT",ctrl:0.9,txL:"Observation",tx:4.1,hr:"Favourable profile incl. NSMP-CTNNB1wt",lower:true},
 {cls:"MMRd",t:"P3L",e:"10-yr OS",ctrlL:"RT",ctrl:74.4,txL:"CRT",tx:68.7,hr:"HR 1.34 (0.71–2.55)"},
 {cls:"MMRd",t:"P3L",e:"10-yr RFS",ctrlL:"RT",ctrl:76.4,txL:"CRT",tx:72.9,hr:"HR 1.13 (0.59–2.15)"},
 {cls:"MMRd",t:"G258M",e:"5-yr RFS",ctrlL:"Chemo",ctrl:64,txL:"Chemo + RT",tx:53,hr:"HR 1.34 (0.70–2.56)"},
 {cls:"MMRd",t:"RUBY",e:"2-yr OS (stage III–IV / recurrent)",ctrlL:"Chemo",ctrl:58.7,txL:"Chemo + dostarlimab",tx:83.3,hr:"HR 0.30 (0.13–0.70)",sig:true},
 {cls:"MMRd",t:"RUBY",e:"2-yr PFS (stage III–IV / recurrent)",ctrlL:"Chemo",ctrl:15.7,txL:"Chemo + dostarlimab",tx:61.4,hr:"HR 0.28 (0.16–0.50)",sig:true},
 {cls:"NSMP",t:"P3L",e:"10-yr OS",ctrlL:"RT",ctrl:74.1,txL:"CRT",tx:81.2,hr:"HR 0.60 (0.27–1.32)"},
 {cls:"NSMP",t:"P3L",e:"10-yr RFS",ctrlL:"RT",ctrl:61.7,txL:"CRT",tx:72.8,hr:"HR 0.61 (0.33–1.15); modulated by ER status"},
 {cls:"NSMP",t:"G258M",e:"5-yr RFS (p53wt/MMRp)",ctrlL:"Chemo",ctrl:60,txL:"Chemo + RT",tx:77,hr:"HR 0.54 (0.32–0.94)",sig:true},
 {cls:"MMRp",t:"RUBY",e:"2-yr OS (MMRp/MSS)",ctrlL:"Chemo",ctrl:55.1,txL:"Chemo + dostarlimab",tx:67.7,hr:"HR 0.73 (0.52–1.02)"}
];
const MOLPROG = {t:"P3L",label:"10-yr RFS by class, PORTEC-3 (both arms)",v:[["POLEmut",98.0],["MMRd",74.7],["NSMP",67.8],["p53abn",45.3]]};
const MOLNOTE = {
 POLEmut:"Excellent prognosis regardless of adjuvant therapy; de-escalation supported (PORTEC-4a, ESGO).",
 MMRd:"No benefit from adding chemo to RT or RT to chemo in adjuvant trials; immunotherapy benefit in advanced/recurrent disease.",
 NSMP:"Intermediate prognosis; RT appears important in stage III (GOG-258 p53wt). ER status modifies chemo benefit.",
 p53abn:"Worst prognosis; clear benefit from chemoradiotherapy (PORTEC-3). Adding RT to chemo alone did not help in GOG-258.",
 MMRp:"Mismatch-repair proficient (POLEmut, NSMP, p53abn combined)."
};

// ESGO-ESTRO-ESP 2025 molecular risk groups (FIGO 2023 'm' staging)
const ESGO = [
 {risk:"Low",col:"#3c8d4f",who:["Stage IAm POLEmut, MMRd, or NSMP low-grade ER+","Stage IBm POLEmut","Stage ICm POLEmut or MMRd","Stage IIm POLEmut"],rx:["No adjuvant therapy (I, A)"]},
 {risk:"Intermediate",col:"#d4b02a",who:["Stage IBm MMRd or NSMP low-grade ER+","Stage IIAm NSMP low-grade ER+","Stage IICm MMRd, myoinvasive, no cervical stromal invasion, no substantial LVSI"],rx:["Vaginal brachytherapy (I, A)","No adjuvant therapy is an option (III, C), esp. <60 yr or low grade"]},
 {risk:"High–intermediate",col:"#d47a2a",who:["Stage IIAm MMRd","Stage IIBm MMRd or NSMP low-grade ER+","Stage IICm MMRd with cervical invasion or substantial LVSI"],rx:["EBRT for optimal pelvic control (II, A)","VBT alternative, esp. if pN0 (II, B)","No adjuvant therapy can be considered if pN0, no substantial LVSI, low grade (IV, B)"]},
 {risk:"High",col:"#c0392b",who:["Stage IA2m–IBm NSMP high-grade/ER− or p53abn","Stage IIm NSMP high-grade/ER− or p53abn","Stage IIIm–IVAm (all non-POLEmut classes)"],rx:["EBRT + chemotherapy: concurrent + adjuvant (I, A) or sequential (I, B)","Chemotherapy ± VBT (I, B)","Stage IIIm–IVAm MMRd: chemo + immune checkpoint inhibitor ± EBRT (II, B)"]}
];
const ESGOREF={name:"ESGO–ESTRO–ESP 2025",ref:"Concin et al. Lancet Oncol 2025 (update 2025)",url:"https://pubmed.ncbi.nlm.nih.gov/?term=ESGO+ESTRO+ESP+guidelines+endometrial+carcinoma+update+2025"};
