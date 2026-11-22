document.addEventListener("DOMContentLoaded", () => {
  // 1. Año actual en el pie de página
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Menú móvil responsivo
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // 3. Modal interactivo de Planes de Estudio
  const planesEstudio = {
    inicial: {
      badge: "NIVEL INICIAL (3 A 5 AÑOS)",
      title: "Aprendizaje Lúdico y Seguro",
      desc: "Despertamos la curiosidad natural del niño mediante el juego dirigido, el arte y el afecto.",
      items: [
        "Psicomotricidad fina y gruesa en aulas equipadas",
        "Iniciación a la lectoescritura y pensamiento lógico",
        "Inglés comunicativo diario con canciones y juegos",
        "Acompañamiento psicológico permanente"
      ]
    },
    primaria: {
      badge: "NIVEL PRIMARIA (1.° A 6.° GRADO)",
      title: "Cimientos Sólidos y Creatividad",
      desc: "Desarrollamos hábitos de estudio, comprensión lectora y razonamiento matemático desde los primeros grados.",
      items: [
        "Matemática recreativa y razonamiento verbal",
        "Ciencia, tecnología y talleres de robótica",
        "Inglés intensivo por niveles",
        "Formación ciudadana, deporte y danza"
      ]
    },
    secundaria: {
      badge: "NIVEL SECUNDARIA (1.° A 5.° AÑO)",
      title: "Alto Rendimiento Preuniversitario",
      desc: "Preparamos a nuestros jóvenes para destacar en los exámenes de admisión más exigentes del país.",
      items: [
        "Círculos de estudio en Ciencias y Letras",
        "Simulacros quincenales tipo examen de admisión",
        "Orientación vocacional y proyecto de vida",
        "Talleres de oratoria, liderazgo y computación"
      ]
    }
  };

  const modal = document.getElementById("studyModal");
  const modalBadge = document.getElementById("modalBadge");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDesc");
  const modalList = document.getElementById("modalList");
  const closeModalBtn = document.getElementById("closeModal");
  const modalCta = document.getElementById("modalCta");

  document.querySelectorAll(".btn-card").forEach((btn) => {
    btn.addEventListener("click", () => {
      const nivel = btn.getAttribute("data-nivel");
      const data = planesEstudio[nivel];
      if (!data || !modal) return;

      modalBadge.textContent = data.badge;
      modalTitle.textContent = data.title;
      modalDesc.textContent = data.desc;
      modalList.innerHTML = data.items.map((item) => `<li>${item}</li>`).join("");
      modal.classList.add("active");
      modal.setAttribute("aria-hidden", "false");
    });
  });

  const cerrarModal = () => {
    if (!modal) return;
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
  };

  if (closeModalBtn) closeModalBtn.addEventListener("click", cerrarModal);
  if (modalCta) modalCta.addEventListener("click", cerrarModal);
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) cerrarModal();
    });
  }

  // 4. Animación de contadores de resultados
  const counters = document.querySelectorAll(".stat-number");
  let animated = false;

  const animateCounters = () => {
    if (animated) return;
    const section = document.getElementById("resultados");
    if (!section) return;
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      animated = true;
      counters.forEach((counter) => {
        const target = Number(counter.getAttribute("data-target"));
        let current = 0;
        const step = Math.max(1, Math.ceil(target / 40));
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            counter.textContent = String(target);
            clearInterval(timer);
          } else {
            counter.textContent = String(current);
          }
        }, 30);
      });
    }
  };

  window.addEventListener("scroll", animateCounters);
  animateCounters();

  // 5. Validación del formulario de admisión
  const form = document.getElementById("admissionForm");
  const feedback = document.getElementById("formFeedback");

  if (form && feedback) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const apoderado = document.getElementById("apoderado").value.trim();
      const telefono = document.getElementById("telefono").value.trim();
      const nivel = document.getElementById("nivelSelect").value;

      if (!apoderado || telefono.length < 7 || !nivel) {
        feedback.style.color = "#FFD600";
        feedback.textContent = "Por favor, completa todos los campos correctamente.";
        return;
      }

      feedback.style.color = "#6EE7B7";
      feedback.textContent = `¡Gracias, ${apoderado}! Hemos registrado tu solicitud para Nivel ${nivel}. Nos comunicaremos pronto.`;
      form.reset();
    });
  }
});
