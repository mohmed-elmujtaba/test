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

if (localStorage.getItem("theme") === "dark") {
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

    if (!header) {
        return;
    }

    header.classList.toggle("scrolled", currentScroll > 120);

    // إبقاء الهيدر ثابتًا وعدم إخفائه على الهاتف
    if (window.innerWidth > 991) {
        if (currentScroll > lastScrollTop && currentScroll > 100) {
            header.classList.add("hide");
        } else {
            header.classList.remove("hide");
        }
    } else {
        header.classList.remove("hide");
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

            <div class="property-filters">
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

    if (!footer || document.querySelector(".footer-social")) {
        return;
    }

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
        <a href="https://www.linkedin.com/" target="_blank" rel="noopener" aria-label="لينكدإن">
            <i class="fa-brands fa-linkedin-in"></i>
        </a>
        <a href="mailto:aberalakariah@gmail.com" aria-label="البريد الإلكتروني">
            <i class="fa-solid fa-envelope"></i>
        </a>
    `;

    footer.appendChild(socialLinks);
}

addSocialLinks();

/*================ STATISTICS COUNTER =================*/

const statsSection = document.querySelector(".stats");
let countersAnimated = false;

function animateCounters() {
    counters.forEach(counter => {
        const target = Number(counter.dataset.target);
        const isPercent = target === 100;
        const startTime = performance.now();
        const duration = 1500;

        function updateCounter(currentTime) {
            const progress = Math.min(
                (currentTime - startTime) / duration,
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
