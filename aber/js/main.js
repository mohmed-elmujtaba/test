/*================ ELEMENTS =================*/

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

/*================ THEME TOGGLE =================*/

const savedTheme = localStorage.getItem("theme");

function updateThemeIcon() {
    if (body.classList.contains("dark")) {
        themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        themeBtn.setAttribute("aria-label", "تفعيل الوضع النهاري");
        logo.src = "images/logo.png";
    } else {
        themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
        themeBtn.setAttribute("aria-label", "تفعيل الوضع الليلي");
        logo.src = "images/logo.png";
    }
}

if (savedTheme === "dark") {
    body.classList.add("dark");
}

if (themeBtn && logo) {
    updateThemeIcon();

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

if (menuBtn && navActions) {
    menuBtn.addEventListener("click", () => {
        const isOpen = navActions.classList.toggle("menu-open");

        menuBtn.setAttribute("aria-expanded", isOpen);
        menuBtn.setAttribute(
            "aria-label",
            isOpen ? "إغلاق القائمة" : "فتح القائمة"
        );

        menuBtn.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';
    });

    menuLinks.forEach(link => {
        link.addEventListener("click", () => {
            navActions.classList.remove("menu-open");
            menuBtn.setAttribute("aria-expanded", "false");
            menuBtn.setAttribute("aria-label", "فتح القائمة");
            menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        });
    });
}

/*================ HEADER SCROLL =================*/

let lastScrollTop = 0;

window.addEventListener("scroll", () => {
    const currentScroll =
        window.pageYOffset || document.documentElement.scrollTop;

    if (header) {
        header.classList.toggle("scrolled", currentScroll > 120);

        if (currentScroll > lastScrollTop && currentScroll > 100) {
            header.classList.add("hide");
        } else {
            header.classList.remove("hide");
        }
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
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

const companyPhone = "0575700009";
const companyWhatsApp = "966575700009";

function addPropertiesSection() {
    const projectsSection = document.querySelector("#projects");

    if (!projectsSection || document.querySelector("#properties")) {
        return;
    }

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

            <div class="property-filters" aria-label="تصفية العقارات">
                <button class="property-filter active" data-filter="all">
                    جميع العقارات
                </button>
                <button class="property-filter" data-filter="sale">
                    عقارات للبيع
                </button>
                <button class="property-filter" data-filter="rent">
                    عقارات للإيجار
                </button>
            </div>

            <div class="properties-grid" id="properties-grid"></div>
        </div>
    `;

    projectsSection.parentNode.insertBefore(section, projectsSection);

    const grid = document.getElementById("properties-grid");
    const filters = document.querySelectorAll(".property-filter");

    function renderProperties(filter = "all") {
        const filteredProperties = filter === "all"
            ? properties
            : properties.filter(property => property.type === filter);

        grid.innerHTML = filteredProperties.map(property => {
            const whatsappText = encodeURIComponent(
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
                               href="https://wa.me/${companyWhatsApp}?text=${whatsappText}"
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

    filters.forEach(filterButton => {
        filterButton.addEventListener("click", () => {
            filters.forEach(button => button.classList.remove("active"));
            filterButton.classList.add("active");
            renderProperties(filterButton.dataset.filter);
        });
    });

    renderProperties();
}

addPropertiesSection();

/*================ SOCIAL LINKS IN FOOTER =================*/

function addSocialLinks() {
    const footer = document.querySelector("footer .container");

    if (!footer || document.querySelector(".footer-social")) {
        return;
    }

    const socialLinks = document.createElement("div");
    socialLinks.className = "footer-social";

    socialLinks.innerHTML = `
        <a href="https://wa.me/${companyWhatsApp}"
           target="_blank"
           rel="noopener"
           aria-label="واتساب">
            <i class="fa-brands fa-whatsapp"></i>
        </a>

        <a href="https://www.instagram.com/"
           target="_blank"
           rel="noopener"
           aria-label="إنستغرام">
            <i class="fa-brands fa-instagram"></i>
        </a>

        <a href="https://www.tiktok.com/"
           target="_blank"
           rel="noopener"
           aria-label="تيك توك">
            <i class="fa-brands fa-tiktok"></i>
        </a>

        <a href="https://www.linkedin.com/"
           target="_blank"
           rel="noopener"
           aria-label="لينكدإن">
            <i class="fa-brands fa-linkedin-in"></i>
        </a>

        <a href="mailto:aberalakariah@gmail.com"
           aria-label="البريد الإلكتروني">
            <i class="fa-solid fa-envelope"></i>
        </a>
    `;

    footer.appendChild(socialLinks);
}

addSocialLinks();

/*================ DYNAMIC STYLES =================*/

const propertyStyles = document.createElement("style");

propertyStyles.textContent = `
    .properties-section {
        padding: 120px 0;
        background: #f8f8f8;
    }

    .property-filters {
        display: flex;
        justify-content: center;
        gap: 12px;
        flex-wrap: wrap;
        margin-bottom: 40px;
    }

    .property-filter {
        border: 1px solid #c8a04d;
        background: #fff;
        color: #333;
        padding: 12px 24px;
        border-radius: 10px;
        cursor: pointer;
        font-family: 'Cairo', sans-serif;
        font-size: 15px;
        font-weight: 700;
        transition: .3s;
    }

    .property-filter:hover,
    .property-filter.active {
        background: #c8a04d;
        color: #fff;
    }

    .properties-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 28px;
    }

    .property-card {
        overflow: hidden;
        background: #fff;
        border-radius: 18px;
        box-shadow: 0 12px 32px rgba(0, 0, 0, .08);
        transition: .35s;
    }

    .property-card:hover {
        transform: translateY(-8px);
    }

    .property-image {
        position: relative;
        height: 230px;
    }

    .property-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .property-status {
        position: absolute;
        top: 16px;
        right: 16px;
        padding: 7px 14px;
        border-radius: 8px;
        background: #c8a04d;
        color: #fff;
        font-size: 14px;
        font-weight: 700;
    }

    .property-content {
        padding: 24px;
    }

    .property-content h3 {
        margin-bottom: 10px;
        font-size: 22px;
    }

    .property-location {
        color: #777;
        margin-bottom: 12px;
    }

    .property-location i {
        color: #c8a04d;
        margin-left: 5px;
    }

    .property-details {
        min-height: 52px;
        color: #777;
        line-height: 1.8;
        font-size: 14px;
    }

    .property-price {
        display: block;
        margin: 20px 0;
        color: #b28732;
        font-size: 18px;
    }

    .property-contact-buttons {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
        padding-top: 18px;
        border-top: 1px solid #eee;
    }

    .property-contact-buttons a {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 7px;
        padding: 11px 8px;
        border-radius: 9px;
        color: #fff;
        font-size: 14px;
        font-weight: 700;
        transition: .3s;
    }

    .property-call-btn {
        background: #b28732;
    }

    .property-whatsapp-btn {
        background: #25d366;
    }

    .property-contact-buttons a:hover {
        transform: translateY(-2px);
        opacity: .88;
    }

    .footer-social {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        margin: 22px 0 10px;
    }

    .footer-social a {
        width: 42px;
        height: 42px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: #2b2b2b;
        color: #fff;
        font-size: 18px;
        transition: .3s;
    }

    .footer-social a:hover {
        background: #c8a04d;
        transform: translateY(-4px);
    }

    body.dark .properties-section {
        background: #181818;
    }

    body.dark .property-card {
        background: #242424;
    }

    body.dark .property-filter {
        background: #242424;
        color: #fff;
    }

    body.dark .property-filter:hover,
    body.dark .property-filter.active {
        background: #c8a04d;
    }

    body.dark .property-contact-buttons {
        border-color: #3a3a3a;
    }

    @media (max-width: 600px) {
        .properties-section {
            padding: 80px 0;
        }

        .property-contact-buttons {
            grid-template-columns: 1fr;
        }
    }
`;

document.head.appendChild(propertyStyles);

/*================ STATISTICS COUNTER =================*/

const statsSection = document.querySelector(".stats");
let countersAnimated = false;

function animateCounters() {
    counters.forEach(counter => {
        const target = Number(counter.dataset.target);
        const isPercent = target === 100;
        const duration = 1500;
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const progress = Math.min(
                (currentTime - startTime) / duration,
                1
            );

            const value = Math.floor(progress * target);

            counter.textContent = isPercent
                ? `${value}%`
                : `${value}+`;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }

        requestAnimationFrame(updateCounter);
    });
}

if (statsSection && "IntersectionObserver" in window) {
    const statsObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                animateCounters();
                countersAnimated = true;
                statsObserver.disconnect();
            }
        });
    }, {
        threshold: 0.4
    });

    statsObserver.observe(statsSection);
}

/*================ WHATSAPP INQUIRY =================*/

if (inquiryForm) {
    inquiryForm.addEventListener("submit", event => {
        event.preventDefault();

        if (!inquiryForm.checkValidity()) {
            inquiryForm.reportValidity();
            return;
        }

        const formData = new FormData(inquiryForm);

        const clientName = formData.get("client_name");
        const clientPhone = formData.get("client_phone");
        const clientEmail = formData.get("client_email") || "غير مضاف";
        const serviceType = formData.get("service_type");
        const inquiryMessage = formData.get("message");

        const serviceNames = {
            brokerage: "الوساطة العقارية",
            management: "إدارة العقارات وتشغيلها",
            investment: "الاستثمار العقاري",
            marketing: "التسويق العقاري",
            consultation: "استشارة عقارية"
        };

        const whatsappMessage = `
مرحباً، لدي استفسار جديد من الموقع العقاري:

الاسم: ${clientName}
رقم الهاتف: ${clientPhone}
البريد الإلكتروني: ${clientEmail}
نوع الخدمة: ${serviceNames[serviceType] || serviceType}

تفاصيل الاستفسار:
${inquiryMessage}
        `.trim();

        const whatsappUrl =
            `https://wa.me/${companyWhatsApp}?text=${encodeURIComponent(whatsappMessage)}`;

        window.open(whatsappUrl, "_blank", "noopener,noreferrer");

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