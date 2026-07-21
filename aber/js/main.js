const themeBtn = document.getElementById("theme-toggle");
const menuBtn = document.getElementById("menu-toggle");
const navActions = document.querySelector(".nav-actions");
const menuLinks = document.querySelectorAll("#main-menu a");
const body = document.body;
const logo = document.getElementById("logo");
const header = document.querySelector("header");
const counters = document.querySelectorAll(".stat h2");
const inquiryForm = document.getElementById("inquiry-form");
const formMessage = document.getElementById("form-message");

const companyPhone = "0575700009";
const companyWhatsApp = "966575700009";

/*================ MOBILE HEADER =================*/

const mobileHeaderStyle = document.createElement("style");

mobileHeaderStyle.textContent = `
@media (max-width: 991px) {
    body {
        padding-top: 76px;
    }

    header {
        position: fixed !important;
        top: 0 !important;
        right: 0 !important;
        width: 100% !important;
        transform: translateY(0);
        transition: transform .3s ease !important;
    }

    header.hide {
        transform: translateY(-110%) !important;
    }

    header .container {
        width: 94% !important;
    }

    header nav {
        min-height: 76px !important;
        height: 76px !important;
        padding: 8px 0 !important;
        display: flex !important;
        flex-direction: row !important;
        align-items: center !important;
        justify-content: space-between !important;
        gap: 10px !important;
    }

    header .logo {
        flex-shrink: 0;
    }

    header .logo img {
        width: auto !important;
        height: 52px !important;
        max-width: 135px !important;
    }

    header .nav-actions {
        width: auto !important;
        margin: 0 !important;
        display: flex !important;
        flex-direction: row !important;
        align-items: center !important;
        gap: 7px !important;
    }

    header .nav-actions ul {
        position: absolute !important;
        top: 68px !important;
        right: 0 !important;
        width: 220px !important;
        margin: 0 !important;
        padding: 8px !important;
        display: none !important;
        flex-direction: column !important;
        align-items: stretch !important;
        gap: 0 !important;
        background: rgba(15, 15, 15, .98) !important;
        border-radius: 12px !important;
        box-shadow: 0 12px 28px rgba(0, 0, 0, .3);
    }

    header .nav-actions.menu-open ul {
        display: flex !important;
    }

    header .nav-actions ul li a {
        display: block !important;
        padding: 10px 12px !important;
        white-space: nowrap !important;
    }

    header .menu-toggle,
    header #theme-toggle {
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        width: 40px !important;
        height: 40px !important;
        flex-shrink: 0 !important;
    }

    header .btn-call {
        display: none !important;
    }

    .hero-content {
        padding-top: 30px !important;
    }
}

@media (max-width: 480px) {
    header .container {
        width: 96% !important;
    }

    header .logo img {
        height: 46px !important;
        max-width: 120px !important;
    }

    header .menu-toggle,
    header #theme-toggle {
        width: 37px !important;
        height: 37px !important;
        font-size: 15px !important;
    }

    header .nav-actions ul {
        width: 205px !important;
    }
}
`;

document.head.appendChild(mobileHeaderStyle);

/*================ THEME =================*/

function updateThemeIcon() {
    if (!themeBtn) return;

    const isDark = body.classList.contains("dark");

    themeBtn.innerHTML = isDark
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';

    themeBtn.setAttribute(
        "aria-label",
        isDark ? "تفعيل الوضع النهاري" : "تفعيل الوضع الليلي"
    );
}

if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark");
}

updateThemeIcon();

if (themeBtn) {
    themeBtn.addEventListener("click", () => {
        body.classList.toggle("dark");

        localStorage.setItem(
            "theme",
            body.classList.contains("dark") ? "dark" : "light"
        );

        updateThemeIcon();
    });
}

/*================ MOBILE MENU =================*/

function closeMenu() {
    if (!navActions || !menuBtn) return;

    navActions.classList.remove("menu-open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.setAttribute("aria-label", "فتح القائمة");
    menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
}

if (menuBtn && navActions) {
    menuBtn.addEventListener("click", event => {
        event.stopPropagation();

        const isOpen = navActions.classList.toggle("menu-open");

        menuBtn.setAttribute("aria-expanded", String(isOpen));
        menuBtn.setAttribute(
            "aria-label",
            isOpen ? "إغلاق القائمة" : "فتح القائمة"
        );

        menuBtn.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';
    });

    menuLinks.forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", event => {
        if (!navActions.contains(event.target)) {
            closeMenu();
        }
    });
}

/*================ HEADER SCROLL =================*/

let lastScrollTop = window.scrollY;
let scrollTimer;

window.addEventListener("scroll", () => {
    if (!header) return;

    const currentScroll = Math.max(window.scrollY, 0);
    const scrollingDown = currentScroll > lastScrollTop;
    const isMobile = window.innerWidth <= 991;

    header.classList.toggle("scrolled", currentScroll > 80);

    if (currentScroll < 20) {
        header.classList.remove("hide");
    } else if (scrollingDown) {
        header.classList.add("hide");
        closeMenu();
    } else {
        header.classList.remove("hide");
    }

    lastScrollTop = currentScroll;

    clearTimeout(scrollTimer);

    scrollTimer = setTimeout(() => {
        if (!isMobile && currentScroll < 20) {
            header.classList.remove("hide");
        }
    }, 120);
}, { passive: true });

window.addEventListener("resize", () => {
    if (window.innerWidth > 991) {
        closeMenu();
        header?.classList.remove("hide");
    }
});

/*================ PROPERTIES =================*/

const properties = [
    {
        type: "sale",
        label: "للبيع",
        title: "فيلا سكنية فاخرة",
        location: "الرياض - حي الملقا",
        price: "2,500,000 ريال",
        details: "5 غرف نوم | 4 دورات مياه | 420 م²",
        image: "images/property1.jpg"
    },
    {
        type: "rent",
        label: "للإيجار",
        title: "شقة عصرية",
        location: "جدة - حي الشاطئ",
        price: "65,000 ريال سنويًا",
        details: "3 غرف نوم | 3 دورات مياه | 180 م²",
        image: "images/property2.jpg"
    },
    {
        type: "sale",
        label: "للبيع",
        title: "أرض تجارية",
        location: "الدمام - حي النخيل",
        price: "1,800,000 ريال",
        details: "مساحة 900 م² | على شارع تجاري",
        image: "images/property3.jpg"
    },
    {
        type: "rent",
        label: "للإيجار",
        title: "مكتب إداري مجهز",
        location: "الرياض - طريق الملك فهد",
        price: "120,000 ريال سنويًا",
        details: "مساحة 250 م² | مواقف خاصة",
        image: "images/property4.jpg"
    },
    {
        type: "sale",
        label: "للبيع",
        title: "عمارة استثمارية",
        location: "مكة المكرمة - حي العزيزية",
        price: "2,200,000 ريال",
        details: "8 وحدات سكنية | دخل استثماري",
        image: "images/property5.jpg"
    },
    {
        type: "rent",
        label: "للإيجار",
        title: "محل تجاري",
        location: "الخبر - حي العليا",
        price: "90,000 ريال سنويًا",
        details: "مساحة 160 م² | واجهة مميزة",
        image: "images/property6.jpg"
    }
];

function addPropertiesSection() {
    const projectsSection = document.querySelector("#projects");

    if (!projectsSection || document.querySelector("#properties")) return;

    const section = document.createElement("section");

    section.id = "properties";
    section.className = "properties-section";

    section.innerHTML = `
        <div class="container">
            <div class="section-title">
                <span>العقارات المتاحة</span>
                <h2>عقارات للبيع والإيجار</h2>
                <p class="section-desc">
                    استعرض مجموعة من العقارات المتاحة واختر العقار المناسب لاحتياجاتك.
                </p>
            </div>

            <div class="property-filters">
                <button class="property-filter active" data-filter="all">جميع العقارات</button>
                <button class="property-filter" data-filter="sale">عقارات للبيع</button>
                <button class="property-filter" data-filter="rent">عقارات للإيجار</button>
            </div>

            <div class="properties-grid" id="properties-grid"></div>
        </div>
    `;

    projectsSection.before(section);

    const grid = document.getElementById("properties-grid");
    const filters = section.querySelectorAll(".property-filter");

    function renderProperties(filter = "all") {
        const filtered = filter === "all"
            ? properties
            : properties.filter(property => property.type === filter);

        grid.innerHTML = filtered.map(property => {
            const message = encodeURIComponent(
                `مرحبًا، أرغب في الاستفسار عن العقار: ${property.title} - ${property.location} - السعر: ${property.price}`
            );

            return `
                <article class="property-card">
                    <div class="property-image">
                        <img src="${property.image}" alt="${property.title}" loading="lazy">
                        <span class="property-status">${property.label}</span>
                    </div>

                    <div class="property-content">
                        <h3>${property.title}</h3>
                        <p class="property-location">
                            <i class="fa-solid fa-location-dot"></i>
                            ${property.location}
                        </p>
                        <p class="property-details">${property.details}</p>
                        <strong class="property-price">${property.price}</strong>

                        <div class="property-contact-buttons">
                            <a class="property-call-btn" href="tel:${companyPhone}">
                                <i class="fa-solid fa-phone"></i>
                                اتصال
                            </a>

                            <a class="property-whatsapp-btn"
                               href="https://wa.me/${companyWhatsApp}?text=${message}"
                               target="_blank"
                               rel="noopener">
                                <i class="fa-brands fa-whatsapp"></i>
                                واتساب
                            </a>
                        </div>
                    </div>
                </article>
            `;
        }).join("");
    }

    filters.forEach(button => {
        button.addEventListener("click", () => {
            filters.forEach(item => item.classList.remove("active"));
            button.classList.add("active");
            renderProperties(button.dataset.filter);
        });
    });

    renderProperties();
}

addPropertiesSection();

/*================ FOOTER SOCIAL LINKS =================*/

function addSocialLinks() {
    const footer = document.querySelector("footer .container");

    if (!footer || footer.querySelector(".footer-social")) return;

    const socialLinks = document.createElement("div");

    socialLinks.className = "footer-social";

    socialLinks.innerHTML = `
        <a href="https://wa.me/${companyWhatsApp}" target="_blank" rel="noopener" aria-label="واتساب">
            <i class="fa-brands fa-whatsapp"></i>
        </a>
        <a href="https://www.instagram.com/" target="_blank" rel="noopener" aria-label="إنستغرام">
            <i class="fa-brands fa-instagram"></i>
        </a>
        <a href="https://www.tiktok.com/" target="_blank" rel="noopener" aria-label="تيك توك">
            <i class="fa-brands fa-tiktok"></i>
        </a>
        <a href="mailto:aberalakariah@gmail.com" aria-label="البريد الإلكتروني">
            <i class="fa-solid fa-envelope"></i>
        </a>
    `;

    footer.appendChild(socialLinks);
}

addSocialLinks();

/*================ STATISTICS =================*/

const statsSection = document.querySelector(".stats");
let countersAnimated = false;

function animateCounters() {
    counters.forEach(counter => {
        const target = Number(counter.dataset.target);
        const isPercent = target === 100;
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const progress = Math.min(
                (currentTime - startTime) / 1500,
                1
            );

            const value = Math.floor(progress * target);
            counter.textContent = isPercent ? `${value}%` : `${value}+`;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }

        requestAnimationFrame(updateCounter);
    });
}

if (statsSection && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && !countersAnimated) {
            animateCounters();
            countersAnimated = true;
            observer.disconnect();
        }
    }, { threshold: 0.4 });

    observer.observe(statsSection);
}

/*================ INQUIRY FORM =================*/

if (inquiryForm) {
    inquiryForm.addEventListener("submit", event => {
        event.preventDefault();

        if (!inquiryForm.checkValidity()) {
            inquiryForm.reportValidity();
            return;
        }

        const data = new FormData(inquiryForm);

        const serviceNames = {
            brokerage: "الوساطة العقارية",
            management: "إدارة العقارات وتشغيلها",
            investment: "الاستثمار العقاري",
            marketing: "التسويق العقاري",
            consultation: "استشارة عقارية"
        };

        const message = `
مرحباً، لدي استفسار جديد من الموقع العقاري:

الاسم: ${data.get("client_name")}
رقم الهاتف: ${data.get("client_phone")}
البريد الإلكتروني: ${data.get("client_email") || "غير مضاف"}
نوع الخدمة: ${serviceNames[data.get("service_type")] || data.get("service_type")}

تفاصيل الاستفسار:
${data.get("message")}
        `.trim();

        window.open(
            `https://wa.me/${companyWhatsApp}?text=${encodeURIComponent(message)}`,
            "_blank",
            "noopener,noreferrer"
        );

        if (formMessage) {
            formMessage.textContent =
                "تم تجهيز رسالتك. أكمل الإرسال من خلال واتساب.";
            formMessage.style.display = "block";

            setTimeout(() => {
                formMessage.style.display = "none";
            }, 6000);
        }

        inquiryForm.reset();
    });
}
