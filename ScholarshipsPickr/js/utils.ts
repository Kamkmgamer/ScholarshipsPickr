// utils.ts

// Function for Lazy Loading Images
export function enableLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target as HTMLImageElement;
                img.src = img.dataset.src!;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(image => {
        observer.observe(image);
    });
}

// Function for smooth scrolling (optional, CSS scroll-behavior can handle this)
export function enableSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = (this as HTMLAnchorElement).getAttribute('href')!;
            document.querySelector(targetId)?.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// Function for fade-in animations on scroll
export function enableFadeInOnScroll() {
    const fadeElements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 }); // Adjust threshold as needed

    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

// Scholarship data structure (example)
export interface Scholarship {
    id: string;
    name: string;
    country: string;
    deadline: string;
    majors: string[];
    description: string;
    link: string;
}

// Example scholarship data (replace with actual data from an API or JSON file)
export const scholarshipsData: Scholarship[] = [
    {
        id: 's1',
        name: 'منحة جامعة الملك فهد للبترول والمعادن',
        country: 'السعودية',
        deadline: '2025-09-30',
        majors: ['هندسة البترول', 'علوم الحاسوب', 'إدارة الأعمال'],
        description: 'منحة دراسية ممولة بالكامل لدرجة البكالوريوس والدراسات العليا.',
        link: '#'
    },
    {
        id: 's2',
        name: 'منحة تشيفنينج البريطانية',
        country: 'المملكة المتحدة',
        deadline: '2025-11-01',
        majors: ['جميع التخصصات'],
        description: 'منحة قيادية ممولة بالكامل للدراسات العليا في المملكة المتحدة.',
        link: '#'
    },
    {
        id: 's3',
        name: 'منحة فولبرايت الأمريكية',
        country: 'الولايات المتحدة الأمريكية',
        deadline: '2025-10-15',
        majors: ['جميع التخصصات'],
        description: 'برنامج تبادل ثقافي ممول من الحكومة الأمريكية.',
        link: '#'
    },
    {
        id: 's4',
        name: 'منحة الحكومة التركية',
        country: 'تركيا',
        deadline: '2025-12-01',
        majors: ['هندسة', 'طب', 'علوم إنسانية'],
        description: 'منحة حكومية ممولة بالكامل للدراسة في تركيا.',
        link: '#'
    },
    {
        id: 's5',
        name: 'منح DLR الصيفية للتدريب',
        country: 'ألمانيا',
        deadline: '2026-03-01',
        majors: ['هندسة الطيران', 'الفيزياء', 'علوم الفضاء'],
        description: 'فرصة تدريب صيفية في مركز الطيران والفضاء الألماني.',
        link: '#'
    }
];