// ---------------- Data ----------------
const KB = [
    {
        id: 'color-mismatch',
        title: 'Colour mismatch',
        category: 'Colour & Tone',
        symptoms: ['DeltaE out of spec', 'Brand colour drift', 'Inconsistent site-to-site results'],
        causes: [
            'Wrong or variable anilox volume',
            'Ink strength too low / wrong base choice',
            'Dirty anilox / plugged cells',
            'Viscosity drift / over-thinning',
            'Press-to-press standard not defined',
        ],
        fixes: [
            'Standardise with Monolox® fixed-anilox methodology to remove volume variability',
            'Use PureTone® high-strength single-pigment bases; confirm correct base and let-down',
            'Deep clean anilox; verify LPI/BCM vs spec',
            'Control viscosity within window; avoid over-thinning',
            'Lock target curves and colour standards; share across sites',
        ],
        pulse: {
            puretone: 'PureTone® single-pigment strength delivers tighter ∆E at lower film weight, ideal for EG and site-to-site standardisation.',
            monolox: 'Monolox® fixes anilox choice so curves don’t move—colour travel between presses and sites becomes predictable.',
        },
    },
    {
        id: 'poor-cure',
        title: 'Ink not curing / set-off',
        category: 'Cure & Dry',
        symptoms: ['Tacky surface', 'Odour', 'Set-off on back of web', 'Low solvent rub'],
        causes: ['Insufficient UV dose / LED irradiance', 'Excess ink film (too high BCM)', 'Wrong wavelength or lamp distance', 'O2 inhibition from poor inerting (where applicable)', 'Photoinitiator quench from contaminants'],
        fixes: [
            'Measure dose/irradiance; maintain lamp output & line speed match',
            'Adopt Monolox® to control film weight via fixed BCM',
            'Verify LED nm spec and lamp-to-web gap',
            'Check inerting; reduce O2 to spec for sensitive colours/OPVs',
            'Audit substrates, cleaners, silicones; ensure correct PI package',
        ],
        pulse: {
            puretone: 'PureTone®’s higher strength achieves target colour at lower film, easing cure window and reducing set-off.',
            monolox: 'Monolox® locks BCM to a known curing window, so speed vs dose can be confidently set and repeated.',
        },
    },
    {
        id: 'adhesion',
        title: 'Poor adhesion',
        category: 'Substrate & Adhesion',
        symptoms: ['Crosshatch failure', 'Tape pull-off', 'Delamination in conversion'],
        causes: [
            'Low surface energy / dyne level',
            'Wrong primer / topcoat / corona level',
            'Under-cure or over-cure (brittle film)',
            'Contamination (silicone, oil, water)',
            'Incompatible ink/substrate pairing',
        ],
        fixes: [
            'Verify dyne ≥ recommended; pre-treat or corona as required',
            'Use correct primer/topcoat; validate with supplier',
            'Rebalance cure window; avoid brittle films',
            'Improve housekeeping; avoid silicone migration',
            'Confirm Pulse ink grade vs substrate family',
        ],
        pulse: {
            puretone: 'PureTone® grades matched to common film/label stocks; strength enables thinner, more flexible films for bend/crease.',
            monolox: 'With a fixed anilox, adhesion tests become comparable day-to-day and across presses.',
        },
    },
    {
        id: 'opv',
        title: 'OPV / Varnish issues',
        category: 'Overprint Varnish',
        symptoms: ['Uneven gloss', 'Scuffing', 'Poor cure', 'Blocking in rewind'],
        causes: ['Wrong BCM / excessive laydown', 'Incompatible OPV vs substrate', 'Low UV dose or wrong wavelength', 'Dust / contamination'],
        fixes: ['Use Monolox® defined BCM for varnish laydown', 'Select Pulse PureFinish® varnish matched to stock', 'Confirm lamp nm output and dose; lower film weight eases cure', 'Improve cleanliness in pressroom'],
        pulse: {
            puretone: 'PureFinish® varnishes complement PureTone® inks, ensuring cure and application range.',
            monolox: 'Monolox® locks varnish BCM so gloss and scuff resistance are consistent roll-to-roll.',
        },
    },
    {
        id: 'dot-gain',
        title: 'Dot gain / mottling',
        category: 'Print Quality',
        symptoms: ['Dark mid-tones', 'Loss of detail', 'Blotchy solids'],
        causes: ['Excess film weight (high BCM)', 'Incorrect plate durometer / impression', 'Anilox wear / plugged cells', 'Viscosity too low / solvent swell'],
        fixes: [
            'Adopt Monolox® fixed BCM appropriate to screen work',
            'Optimise impression; verify plate hardness & tape',
            'Clean/measure anilox; replace if worn',
            'Hold viscosity window; avoid over-reduction',
        ],
        pulse: {
            puretone: 'High strength allows lower lay; cleaner dots and smoother vignettes.',
            monolox: 'Consistent BCM = predictable tone curves and repeatable plates-to-press relationship.',
        },
    },
    {
        id: 'foaming',
        title: 'Foaming / air entrapment',
        category: 'Handling & Stability',
        symptoms: ['Bubbles in tray', 'Pinholes', 'Micro-foam on solids'],
        causes: ['High shear mixing / return-line turbulence', 'Contaminants or surfactant overload', 'Low viscosity / temperature effects'],
        fixes: [
            'Adjust return lines; reduce shear; consider baffles',
            'Audit cleaners/flush; avoid incompatible additives',
            'Control temperature; maintain viscosity spec',
        ],
        pulse: {
            puretone: 'Formulated to balance wetting and defoaming for flexo circulation.',
            monolox: 'Stable BCM helps keep return flow consistent and reduces aeration swings.',
        },
    },
    {
        id: 'dirty-print',
        title: 'Dirty print / scumming',
        category: 'Print Quality',
        symptoms: ['Background tinting', 'Non-image pick-up'],
        causes: ['Excess impression', 'Too high film weight', 'Plate swell / solvent incompatibility'],
        fixes: [
            'Reduce impression; verify plate/tape stack',
            'Move to Monolox® BCM standard suited to artwork',
            'Check solvent resistance; review wash-up fluids',
        ],
        pulse: {
            puretone: 'Controlled rheology reduces background tinting at target film.',
            monolox: 'Fixed BCM minimises over-inking tendencies that trigger scum.',
        },
    },
    {
        id: 'eg-curves',
        title: 'Extended Gamut (EG) curve management',
        category: 'Process Control',
        symptoms: ['∆E drift on CMYK/OGV', 'Brand colour mismatch', 'Long approvals'],
        causes: [
            'Tone curves not locked across presses',
            'Different anilox BCM across sites',
            'Inconsistent ink strength',
        ],
        fixes: [
            'Adopt Monolox® fixed BCM to stabilise film weights',
            'Use PureTone® high-strength primaries for EG',
            'Baseline and share tone curves across all sites',
        ],
        pulse: {
            puretone: 'PureTone® bases give predictable behaviour in 7-colour sets, lowering ∆E and shortening approvals.',
            monolox: 'With Monolox®, EG tone curves don’t drift when operators swap anilox—less recalibration required.',
        },
    },
];

const MONOLOX_CLASSES = [
    { name: 'Line / Text', bcm: '1.2–1.6 BCM, 1200 LPI' },
    { name: 'Screen / Tints', bcm: '2.0–2.6 BCM, 800–1000 LPI' },
    { name: 'Solids', bcm: '3.5–4.5 BCM, 600–800 LPI' },
    { name: 'Varnish / OPV', bcm: '5–6 BCM, 400–600 LPI' },
];

// ---------------- ROI ----------------
function computeRoi(i) {
    const timeSavedMinPerCO = Math.max(0, i.minsPerChangeoverNow - i.minsPerChangeoverWith);
    const timeSavedHoursPerMonth = (i.changeoversPerDay * i.daysPerMonth * timeSavedMinPerCO) / 60;
    const wasteSavedPerCO = Math.max(0, i.wasteMetersNow - i.wasteMetersWith);
    const wasteSavedMetersPerMonth = i.changeoversPerDay * i.daysPerMonth * wasteSavedPerCO;
    const timeSavingsValue = timeSavedHoursPerMonth * i.pressCostPerHour;
    const wasteSavingsValue = wasteSavedMetersPerMonth * i.substrateCostPerMeter;
    const speedHoursFreed = (i.runHoursPerMonth * (i.speedGainPct / 100)) || 0;
    const speedValue = speedHoursFreed * i.marginPerHour;
    const monthlySavings = timeSavingsValue + wasteSavingsValue + speedValue;
    const annualSavings = monthlySavings * 12;
    const paybackMonths = monthlySavings > 0 ? i.implementationCost / monthlySavings : Infinity;
    const roiPct = i.implementationCost > 0 ? (annualSavings / i.implementationCost) * 100 : 0;
    return { timeSavedHoursPerMonth, wasteSavedMetersPerMonth, timeSavingsValue, wasteSavingsValue, speedHoursFreed, speedValue, monthlySavings, annualSavings, paybackMonths, roiPct };
}

// ---------------- State/els ----------------
const els = {
    views: ['main', 'guide', 'puretone', 'monolox', 'knowledge', 'classes', 'roi', 'ink'],
    main: document.getElementById('view-main'),
    guide: document.getElementById('view-guide'),
    classCards: document.getElementById('classCards'),
    cards: document.getElementById('cards'),
    bmList: document.getElementById('bmList'),
    bmEmpty: document.getElementById('bmEmpty'),
    tsSelect: document.getElementById('tsSelect'),
    tsSelectTop: document.getElementById('tsSelectTop'),
    q: document.getElementById('q'),
    qTop: document.getElementById('qTop'),
    goTs: document.getElementById('goTs'),
    tsPicker: document.getElementById('ts-picker'),
};

let bookmarks = JSON.parse(localStorage.getItem('pulse_bookmarks') || '[]');
const storageKey = 'pulse_roi_defaults_v1';

// ---------------- Views ----------------
function showView(name) {
    els.views.forEach(v => {
        const n = document.getElementById('view-' + v);
        if (!n) return;

        if (v === name) {
            // unhide + retrigger animation
            n.hidden = false;
            n.classList.remove('anim-in');
            // force reflow so the animation restarts every time
            void n.offsetWidth;
            n.classList.add('anim-in');
        } else {
            n.hidden = true;
            n.classList.remove('anim-in');
        }
    });
}

document.querySelectorAll('.menu-btn[data-goto]').forEach(btn => {
    btn.addEventListener('click', () => showView(btn.dataset.goto));
});
document.querySelectorAll('[data-back]').forEach(btn => btn.addEventListener('click', () => showView('main')));

// Troubleshoot dropdown on main
document.getElementById('openTs').addEventListener('click', () => {
    els.tsPicker.hidden = !els.tsPicker.hidden;
});

// Populate selects
function fillSelect(sel, withAll) {
    sel.innerHTML = '';
    if (withAll) {
        const all = document.createElement('option'); all.value = ''; all.textContent = 'All issues'; sel.appendChild(all);
    } else {
        const none = document.createElement('option'); none.value = ''; none.textContent = '— Select a problem —'; sel.appendChild(none);
    }
    KB.forEach(k => {
        const opt = document.createElement('option');
        opt.value = k.id; opt.textContent = k.title;
        sel.appendChild(opt);
    });
}
fillSelect(els.tsSelect, false);
fillSelect(els.tsSelectTop, true);

// From main → open troubleshoot
els.goTs.addEventListener('click', () => {
    showView('guide');
    // seed filters
    els.qTop.value = els.q.value || '';
    els.tsSelectTop.value = els.tsSelect.value || '';
    applyFilter();
});
els.tsSelect.addEventListener('change', () => (els.tsSelect.value ? els.goTs.click() : null));

// Guide filters
['input', 'change'].forEach(ev => {
    els.qTop.addEventListener(ev, applyFilter);
    els.tsSelectTop.addEventListener(ev, applyFilter);
});

// Render troubleshoot cards
function renderCards(list) {
    els.cards.innerHTML = '';
    list.forEach(item => {
        const c = document.createElement('div'); c.className = 'card';
        c.innerHTML = `
      <div style="display:flex;justify-content:space-between;gap:12px;align-items:flex-start">
        <div>
          <h3 style="margin:0 0 6px 0">${item.title}</h3>
          <div class="chips">
            <span class="chip">${item.category}</span>
            <span class="chip">${item.symptoms[0]}</span>
          </div>
        </div>
        <button class="bookmark" title="Bookmark" data-id="${item.id}">${bookmarks.includes(item.id) ? '⭐' : '☆'}</button>
      </div>
      <div class="section">
        <h4>Likely causes</h4>
        <ul class="list">${item.causes.map(c => `<li>${c}</li>`).join('')}</ul>
      </div>
      <div class="section">
        <h4>Fix it fast</h4>
        <ul class="list">${item.fixes.map(f => `<li>${f}</li>`).join('')}</ul>
      </div>
      <div class="row">
        <div class="card" style="flex:1">
          <div class="muted" style="font-weight:600;margin-bottom:4px">PureTone® advantage</div>
          <div>${item.pulse.puretone}</div>
        </div>
        <div class="card" style="flex:1">
          <div class="muted" style="font-weight:600;margin-bottom:4px">Monolox® advantage</div>
          <div>${item.pulse.monolox}</div>
        </div>
      </div>`;
        els.cards.appendChild(c);
    });

    els.cards.querySelectorAll('.bookmark').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            if (bookmarks.includes(id)) bookmarks = bookmarks.filter(x => x !== id); else bookmarks.push(id);
            localStorage.setItem('pulse_bookmarks', JSON.stringify(bookmarks));
            applyFilter();
            renderBookmarks();
        });
    });
}

function renderBookmarks() {
    els.bmList.innerHTML = '';
    if (!bookmarks.length) { els.bmEmpty.style.display = 'block'; return; }
    els.bmEmpty.style.display = 'none';
    bookmarks.forEach(id => {
        const it = KB.find(k => k.id === id);
        if (!it) return;
        const b = document.createElement('span');
        b.className = 'chip';
        b.textContent = it.title;
        b.addEventListener('click', () => {
            showView('guide');
            els.tsSelectTop.value = it.id;
            els.qTop.value = '';
            applyFilter();
        });
        els.bmList.appendChild(b);
    });
}

// Filtering
function applyFilter() {
    const q = (els.qTop.value || '').toLowerCase().trim();
    const idFilter = els.tsSelectTop.value;
    let list = KB;
    if (idFilter) list = list.filter(k => k.id === idFilter);
    if (q) list = list.filter(k =>
        [k.title, k.category, ...(k.symptoms || []), ...(k.causes || []), ...(k.fixes || [])]
            .join(' ').toLowerCase().includes(q)
    );
    renderCards(list);
}

// Classes
function renderClasses() {
    const cc = els.classCards; cc.innerHTML = '';
    MONOLOX_CLASSES.forEach(mc => {
        const c = document.createElement('div'); c.className = 'card';
        c.innerHTML = `<h3 style="margin:0 0 8px 0">${mc.name}</h3><div class="muted">${mc.bcm}</div>`;
        cc.appendChild(c);
    });
}

// ROI wiring
const $ = id => document.getElementById(id);
const inputs = {
    changeoversPerDay: $('i_changeoversPerDay'), daysPerMonth: $('i_daysPerMonth'),
    minsPerChangeoverNow: $('i_minsPerChangeoverNow'), minsPerChangeoverWith: $('i_minsPerChangeoverWith'),
    wasteMetersNow: $('i_wasteMetersNow'), wasteMetersWith: $('i_wasteMetersWith'),
    pressCostPerHour: $('i_pressCostPerHour'), substrateCostPerMeter: $('i_substrateCostPerMeter'),
    speedGainPct: $('i_speedGainPct'), runHoursPerMonth: $('i_runHoursPerMonth'), marginPerHour: $('i_marginPerHour'),
    implementationCost: $('i_implementationCost'),
};
const outputs = {
    timeSavedHoursPerMonth: $('out_timeSavedHoursPerMonth'), wasteSavedMetersPerMonth: $('out_wasteSavedMetersPerMonth'),
    timeSavingsValue: $('out_timeSavingsValue'), wasteSavingsValue: $('out_wasteSavingsValue'),
    speedHoursFreed: $('out_speedHoursFreed'), speedValue: $('out_speedValue'),
    monthlySavings: $('out_monthlySavings'), annualSavings: $('out_annualSavings'),
    paybackMonths: $('out_paybackMonths'), roiPct: $('out_roiPct'),
};
function getValues() { return Object.fromEntries(Object.entries(inputs).map(([k, el]) => [k, parseFloat(el.value || '0')])); }
function setDefaults() {
    const d = {
        changeoversPerDay: 3, daysPerMonth: 30,
        minsPerChangeoverNow: 20, minsPerChangeoverWith: 10,
        wasteMetersNow: 30, wasteMetersWith: 15,
        pressCostPerHour: 250, substrateCostPerMeter: 0.50,
        speedGainPct: 0, runHoursPerMonth: 480, marginPerHour: 250,
        implementationCost: 15000,
    };
    try { const raw = localStorage.getItem(storageKey); if (raw) Object.assign(d, JSON.parse(raw)); } catch { }
    Object.entries(d).forEach(([k, val]) => { inputs[k].value = String(val); });
    recalc();
}
function recalc() {
    const r = computeRoi(getValues());
    outputs.timeSavedHoursPerMonth.textContent = r.timeSavedHoursPerMonth.toFixed(1) + ' h';
    outputs.wasteSavedMetersPerMonth.textContent = r.wasteSavedMetersPerMonth.toLocaleString();
    outputs.timeSavingsValue.textContent = Math.round(r.timeSavingsValue).toLocaleString();
    outputs.wasteSavingsValue.textContent = Math.round(r.wasteSavingsValue).toLocaleString();
    outputs.speedHoursFreed.textContent = r.speedHoursFreed.toFixed(1);
    outputs.speedValue.textContent = Math.round(r.speedValue).toLocaleString();
    outputs.monthlySavings.textContent = Math.round(r.monthlySavings).toLocaleString();
    outputs.annualSavings.textContent = Math.round(r.annualSavings).toLocaleString();
    outputs.paybackMonths.textContent = isFinite(r.paybackMonths) ? r.paybackMonths.toFixed(1) : '—';
    outputs.roiPct.textContent = Math.round(r.roiPct) + '%';
}
$('saveDefaults').addEventListener('click', () => {
    try { localStorage.setItem(storageKey, JSON.stringify(getValues())); } catch { }
    alert('Defaults saved on this device.');
});
$('resetDefaults').addEventListener('click', () => {
    localStorage.removeItem(storageKey);
    setDefaults();
});
Object.values(inputs).forEach(el => el && el.addEventListener('input', recalc));

// Boot
renderClasses();
renderBookmarks();
showView('main');
fillSelect(els.tsSelectTop, true);
renderCards(KB);
setDefaults();

// Quick sanity check same as before
(function () {
    const r = computeRoi({
        changeoversPerDay: 3, daysPerMonth: 30,
        minsPerChangeoverNow: 20, minsPerChangeoverWith: 10,
        wasteMetersNow: 30, wasteMetersWith: 15,
        pressCostPerHour: 250, substrateCostPerMeter: 0.5,
        speedGainPct: 0, runHoursPerMonth: 480, marginPerHour: 250,
        implementationCost: 15000,
    });
    console.assert(Math.round(r.monthlySavings) === 4425, 'ROI monthly expected 4425, got', r.monthlySavings);
    console.assert(Math.round(r.annualSavings) === 53100, 'ROI annual expected 53100, got', r.annualSavings);
})();
