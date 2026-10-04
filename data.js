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
