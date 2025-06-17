// Menú lateral: activa el botón correcto
function setActiveMenu(panel) {
  document.getElementById('menu-generate').classList.remove('active');
  document.getElementById('menu-result').classList.remove('active');
  if (panel === 'generate') {
    document.getElementById('menu-generate').classList.add('active');
  } else {
    document.getElementById('menu-result').classList.add('active');
  }
}
function showGenerate() {
  document.getElementById('generatePanel').classList.add('active');
  document.getElementById('resultPanel').classList.remove('active');
  setActiveMenu('generate');
}
function showResult() {
  document.getElementById('generatePanel').classList.remove('active');
  document.getElementById('resultPanel').classList.add('active');
  setActiveMenu('result');
}

// Generador de copys dinámicos
function generateCopy() {
  const business = document.getElementById('businessName').value.trim() || "Tu negocio";
  const desc = document.getElementById('description').value.trim();
  const promo = desc || "una promoción irresistible";
  const address = document.getElementById('address').value.trim();
  const waLink = document.getElementById('whatsappLink').value.trim();
  const social = document.querySelector('input[name="social"]:checked').value;
  const useEmojis = document.getElementById('useEmojis').checked;

  const format = {
    instagram: {
      start: [
        b => useEmojis ? `📸 ¡${b} está de moda!` : `¡${b} en Instagram!`,
        b => useEmojis ? `🔥 Mira lo nuevo en ${b}` : `Mira lo nuevo en ${b}`,
      ],
      body: [
        p => useEmojis ? `Aprovecha: ${p} 🎁` : `Aprovecha: ${p}`,
        p => useEmojis ? `Solo por hoy: ${p} 😍` : `Solo por hoy: ${p}`,
      ],
      extra: [
        a => a ? `📍 Visítanos: ${a}` : '',
        () => useEmojis ? "¡Corre ya! 💨" : "¡No te lo pierdas!",
      ],
      end: [
        l => l ? `📲 Escríbenos: ${l}` : "Envíanos DM",
        () => "#PromoInsta #HazteNotar",
      ]
    },
    facebook: {
      start: [
        b => `🔔 Novedades en ${b}`,
        b => `${b} te tiene una sorpresa`,
      ],
      body: [
        p => `Disfruta de ${p}`,
        p => `Solo esta semana: ${p}`,
      ],
      extra: [
        a => a ? `Ubicación: ${a}` : '',
        () => "Comenta o escríbenos 💬",
      ],
      end: [
        l => l ? `Contáctanos: ${l}` : "",
        () => "#FacebookPromo #Ofertas",
      ]
    },
    whatsapp: {
      start: [
        b => `👋 Hola, somos ${b}`,
        b => `🚨 Oferta nueva en ${b}`,
      ],
      body: [
        p => `Te tenemos ${p}`,
        p => `Pregunta por ${p} hoy`,
      ],
      extra: [
        a => a ? `📍 Estamos en: ${a}` : '',
      ],
      end: [
        l => l ? `Escríbenos: ${l}` : '',
        () => "#WhatsPromo #SaborYPromo",
      ]
    },
    tiktok: {
      start: [
        b => `🎵 Tendencia en ${b}`,
        b => `¿Ya viste lo nuevo de ${b}?`,
      ],
      body: [
        p => `Grábate probando ${p} 🤳`,
        p => `Reto: prueba ${p} 🔥`,
      ],
      extra: [
        a => a ? `📍 ${a}` : '',
      ],
      end: [
        l => l ? `Contáctanos: ${l}` : '',
        () => "#TikTokPromo #Tendencia",
      ]
    }
  };

  const f = format[social];
  const random = arr => arr[Math.floor(Math.random() * arr.length)];

  const copy = [
    random(f.start)(business),
    random(f.body)(promo),
    random(f.extra)(address),
    random(f.end)(waLink),
    `#${business.replace(/\s/g, '')} #PromosQueRugen`
  ].filter(Boolean).join('\n');

  document.getElementById('result').value = copy;
  showResult();
}

// Funciones extra
document.getElementById('generateCopy').addEventListener('click', generateCopy);
document.getElementById('copyText').addEventListener('click', () => {
  const text = document.getElementById('result').value;
  if (text) {
    navigator.clipboard.writeText(text);
    alert("¡Texto copiado!");
  }
});
document.getElementById('shareWhatsApp').addEventListener('click', () => {
  const text = document.getElementById('result').value;
  if (text) {
    const url = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
      ? `whatsapp://send?text=${encodeURIComponent(text)}`
      : `https://web.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  }
});
document.getElementById('regenerateCopy').addEventListener('click', generateCopy);

// IA Análisis
document.getElementById('analyzeDescription').addEventListener('click', () => {
  const text = document.getElementById('description').value.trim();
  const feedback = document.getElementById('iaFeedback');
  if (text.length < 20) {
    feedback.textContent = "Agrega más detalles para una mejor promoción.";
  } else {
    feedback.textContent = "Perfecto. ¡Listo para generar tu copy!";
  }
});

// Edición
let originalCopy = "";
document.getElementById('editCopy').addEventListener('click', () => {
  const res = document.getElementById('result');
  originalCopy = res.value;
  res.removeAttribute('readonly');
  document.getElementById('saveCopy').style.display = '';
  document.getElementById('editCopy').style.display = 'none';
});
document.getElementById('saveCopy').addEventListener('click', () => {
  const res = document.getElementById('result');
  res.setAttribute('readonly', true);
  document.getElementById('saveCopy').style.display = 'none';
  document.getElementById('editCopy').style.display = '';
});

// Sugerencia IA
document.getElementById('suggestChange').addEventListener('click', () => {
  const ideas = [
    "Agrega una pregunta al inicio.",
    "Haz la promo más urgente.",
    "Incluye un emoji adicional.",
    "Hazlo más corto y directo.",
    "Haz énfasis en el beneficio."
  ];
  const sugerencia = prompt("¿Qué quieres mejorar en tu copy?\n\nSugerencia IA: " + ideas[Math.floor(Math.random() * ideas.length)]);
  if (sugerencia) {
    alert("Gracias por tu sugerencia. La usaremos para mejorar.");
  }
});

// Panel motivacional
const tips = [
  "Recuerda: menos es más.",
  "Usa emojis llamativos 🎯",
  "Haz llamados a la acción claros.",
  "Agrega tu dirección o link siempre.",
  "Sé creativo, pero directo.",
  "¡Lo visual importa tanto como el texto!",
];
let tipIndex = 0;
const panel = document.getElementById("motivationalPanel");
setInterval(() => {
  panel.textContent = tips[tipIndex];
  tipIndex = (tipIndex + 1) % tips.length;
}, 6000);

// Panel AI typing
const aiTips = [
  "¿Sabías que usar 'solo hoy' puede duplicar tus ventas?",
  "Frases cortas y emojis = más atención.",
  "Haz preguntas para enganchar al lector.",
  "Incluye beneficios claros y visibles.",
];
let aiIndex = 0;
function typeAI(text, i = 0) {
  const aiTip = document.getElementById("aiTip");
  aiTip.textContent = "";
  let interval = setInterval(() => {
    aiTip.textContent += text.charAt(i);
    i++;
    if (i >= text.length) clearInterval(interval);
  }, 35);
}
typeAI(aiTips[0]);
setInterval(() => {
  aiIndex = (aiIndex + 1) % aiTips.length;
  typeAI(aiTips[aiIndex]);
}, 8000);
