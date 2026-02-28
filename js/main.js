document.addEventListener("DOMContentLoaded", function () {

    const modal = document.getElementById("serviceModal");
    const title = document.getElementById("modalTitle");
    const list = document.getElementById("modalList");
    const closeBtn = document.querySelector(".close");
    const cards = document.querySelectorAll(".card");
    const whatsappBtn = document.getElementById("whatsappBtn");

    const phoneNumber = "34661277738"; // ⚠️ CAMBIA ESTO POR TU NÚMERO REAL

    const services = {
        clonacion: {
            title: "Clonación de ECUs",
            items: [
                "Clonación completa de centralitas",
                "Transferencia de datos inmovilizador",
                "Adaptación de unidades",
                "Lectura y escritura EEPROM",
                "Busqueda de recambio adecuado"
            ]
        },
        reparacion: {
            title: "Reparación Electrónica",
            items: [
                "Reparación de centralitas motor",
                "Cuadros de instrumentos",
                "Unidades defectuosas",
                "Problemas de arranque",
                "Diagnóstico avanzado"
            ]
        },
        stage1: {
            title: "Reprogramación",
            items: [
                "Stage 1 seguro",
                "EGR, DPF, AdBlue, IMMO OFF",
                "Airbag Reset",
                "DTC OFF",
                "Soluciones personalizadas"
            ]
        }
    };

    function openModal(serviceKey) {

        title.innerText = services[serviceKey].title;
        list.innerHTML = "";

        services[serviceKey].items.forEach(item => {
            let li = document.createElement("li");
            li.textContent = item;
            list.appendChild(li);
        });

        // Configurar mensaje dinámico WhatsApp
        let message = "Hola, quiero información sobre " + services[serviceKey].title;
        whatsappBtn.href = "https://wa.me/" + phoneNumber + "?text=" + encodeURIComponent(message);

        modal.style.display = "block";
        document.body.classList.add("modal-open");
    }

    function closeModal() {
        modal.style.display = "none";
        document.body.classList.remove("modal-open");
    }

    cards.forEach(card => {
        card.addEventListener("click", function () {
            const serviceKey = this.getAttribute("data-service");
            openModal(serviceKey);
        });
    });

    closeBtn.addEventListener("click", closeModal);

    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Cerrar con tecla ESC
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeModal();
        }
    });


/* ================= SLIDER MOVIL COMPLETO ================= */

function initMobileReviewsSlider() {

    if (window.innerWidth > 768) return;

    const container = document.querySelector('.reviews-grid');
    const cards = document.querySelectorAll('.review-card');

    if (!container || cards.length === 0) return;

    let index = 0;
    let autoSlide;

    // Crear contenedor de indicadores
    const indicatorsContainer = document.createElement("div");
    indicatorsContainer.classList.add("reviews-indicators");
    container.parentNode.appendChild(indicatorsContainer);

    // Crear puntitos
    cards.forEach((_, i) => {
        const dot = document.createElement("span");
        if (i === 0) dot.classList.add("active");

        dot.addEventListener("click", () => {
            index = i;
            updateSlider();
            resetAutoSlide();
        });

        indicatorsContainer.appendChild(dot);
    });

    const dots = indicatorsContainer.querySelectorAll("span");

    function updateSlider() {
        container.scrollTo({
            left: container.clientWidth * index,
            behavior: 'smooth'
        });

        dots.forEach(dot => dot.classList.remove("active"));
        dots[index].classList.add("active");
    }

    function startAutoSlide() {
        autoSlide = setInterval(() => {
            index++;
            if (index >= cards.length) index = 0;
            updateSlider();
        }, 4000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlide);
    }

    function resetAutoSlide() {
        stopAutoSlide();
        startAutoSlide();
    }

    // Detectar swipe manual
    container.addEventListener('scroll', () => {
        index = Math.round(container.scrollLeft / container.clientWidth);
        dots.forEach(dot => dot.classList.remove("active"));
        dots[index].classList.add("active");
    });

    container.addEventListener('touchstart', stopAutoSlide);
    container.addEventListener('touchend', startAutoSlide);

    startAutoSlide();
}

initMobileReviewsSlider();

});