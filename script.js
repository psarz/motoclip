// BMW Motorcycle News Video Data - 3 Second Clips
const videosData = [
    // BMW C 400 GT Scooter Series
    { id: 1, title: "BMW C 400 GT Feature 1", description: "Premium touring scooter with advanced tech", category: "luxury", videoUrl: "videos/c400gt_video_1.mp4", date: "2025-12-22", duration: "3s" },
    { id: 2, title: "BMW C 400 GT Feature 2", description: "Urban mobility redefined with comfort", category: "tech", videoUrl: "videos/c400gt_video_2.mp4", date: "2025-12-22", duration: "3s" },
    { id: 3, title: "BMW C 400 GT Feature 3", description: "Smart connectivity and storage solutions", category: "tech", videoUrl: "videos/c400gt_video_3.mp4", date: "2025-12-21", duration: "3s" },
    { id: 4, title: "BMW C 400 GT Feature 4", description: "Touring comfort meets city agility", category: "luxury", videoUrl: "videos/c400gt_video_4.mp4", date: "2025-12-21", duration: "3s" },
    { id: 5, title: "BMW C 400 GT Feature 5", description: "Weather protection and convenience", category: "tech", videoUrl: "videos/c400gt_video_5.mp4", date: "2025-12-20", duration: "3s" },
    
    // BMW CE 02 Electric Series
    { id: 6, title: "BMW CE 02 Electric 1", description: "Urban electric mobility revolution", category: "electric", videoUrl: "videos/ce02_video_1.mp4", date: "2025-12-20", duration: "3s" },
    { id: 7, title: "BMW CE 02 Electric 2", description: "Zero emissions city commuting", category: "electric", videoUrl: "videos/ce02_video_2.mp4", date: "2025-12-19", duration: "3s" },
    { id: 8, title: "BMW CE 02 Electric 3", description: "Compact electric design innovation", category: "electric", videoUrl: "videos/ce02_video_3.mp4", date: "2025-12-19", duration: "3s" },
    { id: 9, title: "BMW CE 02 Electric 4", description: "Smart battery technology unveiled", category: "tech", videoUrl: "videos/ce02_video_4.mp4", date: "2025-12-18", duration: "3s" },
    { id: 10, title: "BMW CE 02 Electric 5", description: "Future of urban transportation", category: "electric", videoUrl: "videos/ce02_video_5.mp4", date: "2025-12-18", duration: "3s" },
    
    // BMW CE 04 Electric Series
    { id: 11, title: "BMW CE 04 Scooter 1", description: "Futuristic electric scooter design", category: "electric", videoUrl: "videos/ce04_video_1.mp4", date: "2025-12-17", duration: "3s" },
    { id: 12, title: "BMW CE 04 Scooter 2", description: "Long-range electric commuter", category: "electric", videoUrl: "videos/ce04_video_2.mp4", date: "2025-12-17", duration: "3s" },
    { id: 13, title: "BMW CE 04 Scooter 3", description: "Smart screen integration", category: "tech", videoUrl: "videos/ce04_video_3.mp4", date: "2025-12-16", duration: "3s" },
    
    // BMW F 450 GS
    { id: 14, title: "BMW F 450 GS Adventure 1", description: "Entry-level adventure bike unveiled", category: "racing", videoUrl: "videos/f450gs_video_1.mp4", date: "2025-12-16", duration: "3s" },
    { id: 15, title: "BMW F 450 GS Adventure 2", description: "Off-road capability showcase", category: "racing", videoUrl: "videos/f450gs_video_2.mp4", date: "2025-12-15", duration: "3s" },
    { id: 16, title: "BMW F 450 GS Adventure 3", description: "Lightweight adventure design", category: "racing", videoUrl: "videos/f450gs_video_3.mp4", date: "2025-12-15", duration: "3s" },
    
    // BMW F 900 GS Adventure Series
    { id: 17, title: "F 900 GS Adventure 1", description: "Long-distance adventure ready", category: "racing", videoUrl: "videos/f900gs_adventure_video_1.mp4", date: "2025-12-14", duration: "3s" },
    { id: 18, title: "F 900 GS Adventure 2", description: "Enhanced fuel capacity touring", category: "racing", videoUrl: "videos/f900gs_adventure_video_2.mp4", date: "2025-12-14", duration: "3s" },
    { id: 19, title: "F 900 GS Adventure 3", description: "Adventure tech features", category: "tech", videoUrl: "videos/f900gs_adventure_video_3.mp4", date: "2025-12-13", duration: "3s" },
    { id: 20, title: "F 900 GS Adventure 4", description: "Suspension and comfort upgrades", category: "racing", videoUrl: "videos/f900gs_adventure_video_4.mp4", date: "2025-12-13", duration: "3s" },
    { id: 21, title: "F 900 GS Adventure 5", description: "Rugged reliability tested", category: "racing", videoUrl: "videos/f900gs_adventure_video_5.mp4", date: "2025-12-12", duration: "3s" },
    
    // BMW F 900 GS Series
    { id: 22, title: "BMW F 900 GS Feature 1", description: "Versatile mid-size adventure", category: "racing", videoUrl: "videos/f900gs_video_1.mp4", date: "2025-12-12", duration: "3s" },
    { id: 23, title: "BMW F 900 GS Feature 2", description: "Balanced power and control", category: "racing", videoUrl: "videos/f900gs_video_2.mp4", date: "2025-12-11", duration: "3s" },
    { id: 24, title: "BMW F 900 GS Feature 3", description: "Riding modes explained", category: "tech", videoUrl: "videos/f900gs_video_3.mp4", date: "2025-12-11", duration: "3s" },
    { id: 25, title: "BMW F 900 GS Feature 4", description: "Ergonomics and adjustability", category: "racing", videoUrl: "videos/f900gs_video_4.mp4", date: "2025-12-10", duration: "3s" },
    
    // BMW G 310 RR
    { id: 26, title: "BMW G 310 RR Sport 1", description: "Entry-level sportbike excitement", category: "racing", videoUrl: "videos/g310rr_video_1.mp4", date: "2025-12-10", duration: "3s" },
    { id: 27, title: "BMW G 310 RR Sport 2", description: "Agile handling characteristics", category: "racing", videoUrl: "videos/g310rr_video_2.mp4", date: "2025-12-09", duration: "3s" },
    { id: 28, title: "BMW G 310 RR Sport 3", description: "Aerodynamic design details", category: "tech", videoUrl: "videos/g310rr_video_3.mp4", date: "2025-12-09", duration: "3s" },
    { id: 29, title: "BMW G 310 RR Sport 4", description: "Track-inspired street bike", category: "racing", videoUrl: "videos/g310rr_video_4.mp4", date: "2025-12-08", duration: "3s" },
    { id: 30, title: "BMW G 310 RR Sport 5", description: "Lightweight performance focus", category: "racing", videoUrl: "videos/g310rr_video_5.mp4", date: "2025-12-08", duration: "3s" },
    
    // BMW K 1600 B Bagger
    { id: 31, title: "BMW K 1600 B Bagger 1", description: "Ultimate luxury bagger touring", category: "luxury", videoUrl: "videos/k1600b_video_1.mp4", date: "2025-12-07", duration: "3s" },
    { id: 32, title: "BMW K 1600 B Bagger 2", description: "Six-cylinder touring power", category: "luxury", videoUrl: "videos/k1600b_video_2.mp4", date: "2025-12-07", duration: "3s" },
    { id: 33, title: "BMW K 1600 B Bagger 3", description: "Premium audio and comfort", category: "luxury", videoUrl: "videos/k1600b_video_3.mp4", date: "2025-12-06", duration: "3s" },
    { id: 34, title: "BMW K 1600 B Bagger 4", description: "Advanced rider aids", category: "tech", videoUrl: "videos/k1600b_video_4.mp4", date: "2025-12-06", duration: "3s" },
    { id: 35, title: "BMW K 1600 B Bagger 5", description: "Long-distance luxury cruising", category: "luxury", videoUrl: "videos/k1600b_video_5.mp4", date: "2025-12-05", duration: "3s" },
    
    // BMW K 1600 GTL
    { id: 36, title: "K 1600 GTL Grand Tourer 1", description: "Supreme touring comfort", category: "luxury", videoUrl: "videos/k1600gtl_video_1.mp4", date: "2025-12-05", duration: "3s" },
    { id: 37, title: "K 1600 GTL Grand Tourer 2", description: "Full luxury equipment package", category: "luxury", videoUrl: "videos/k1600gtl_video_2.mp4", date: "2025-12-04", duration: "3s" },
    { id: 38, title: "K 1600 GTL Grand Tourer 3", description: "Smooth six-cylinder engine", category: "luxury", videoUrl: "videos/k1600gtl_video_3.mp4", date: "2025-12-04", duration: "3s" },
    { id: 39, title: "K 1600 GTL Grand Tourer 4", description: "Weather protection features", category: "luxury", videoUrl: "videos/k1600gtl_video_4.mp4", date: "2025-12-03", duration: "3s" },
    { id: 40, title: "K 1600 GTL Grand Tourer 5", description: "Touring technology suite", category: "tech", videoUrl: "videos/k1600gtl_video_5.mp4", date: "2025-12-03", duration: "3s" },
    
    // BMW M 1000 XR
    { id: 41, title: "M 1000 XR Sport Tourer 1", description: "M Performance sport touring", category: "luxury", videoUrl: "videos/m1000xr_video_1.mp4", date: "2025-12-02", duration: "3s" },
    { id: 42, title: "M 1000 XR Sport Tourer 2", description: "Track performance meets touring", category: "racing", videoUrl: "videos/m1000xr_video_2.mp4", date: "2025-12-02", duration: "3s" },
    { id: 43, title: "M 1000 XR Sport Tourer 3", description: "Carbon fiber M components", category: "luxury", videoUrl: "videos/m1000xr_video_3.mp4", date: "2025-12-01", duration: "3s" },
    { id: 44, title: "M 1000 XR Sport Tourer 4", description: "Advanced electronics package", category: "tech", videoUrl: "videos/m1000xr_video_4.mp4", date: "2025-12-01", duration: "3s" },
    { id: 45, title: "M 1000 XR Sport Tourer 5", description: "Versatile sport touring capability", category: "luxury", videoUrl: "videos/m1000xr_video_5.mp4", date: "2025-11-30", duration: "3s" },
    
    // BMW R 12 nineT
    { id: 46, title: "R 12 nineT Roadster 1", description: "Classic roadster reimagined", category: "classic", videoUrl: "videos/r12_ninet_video_1.mp4", date: "2025-11-30", duration: "3s" },
    { id: 47, title: "R 12 nineT Roadster 2", description: "Boxer engine heritage", category: "classic", videoUrl: "videos/r12_ninet_video_2.mp4", date: "2025-11-29", duration: "3s" },
    { id: 48, title: "R 12 nineT Roadster 3", description: "Customization possibilities", category: "classic", videoUrl: "videos/r12_ninet_video_3.mp4", date: "2025-11-29", duration: "3s" },
    { id: 49, title: "R 12 nineT Roadster 4", description: "Modern classic design", category: "classic", videoUrl: "videos/r12_ninet_video_4.mp4", date: "2025-11-28", duration: "3s" },
    { id: 50, title: "R 12 nineT Roadster 5", description: "Pure riding experience", category: "classic", videoUrl: "videos/r12_ninet_video_5.mp4", date: "2025-11-28", duration: "3s" },
    
    // BMW R 12
    { id: 51, title: "BMW R 12 Feature 1", description: "New generation boxer engine", category: "classic", videoUrl: "videos/r12_video_1.mp4", date: "2025-11-27", duration: "3s" },
    { id: 52, title: "BMW R 12 Feature 2", description: "Traditional BMW character", category: "classic", videoUrl: "videos/r12_video_2.mp4", date: "2025-11-27", duration: "3s" },
    { id: 53, title: "BMW R 12 Feature 3", description: "Modern rider assistance", category: "tech", videoUrl: "videos/r12_video_3.mp4", date: "2025-11-26", duration: "3s" },
    { id: 54, title: "BMW R 12 Feature 4", description: "Timeless boxer design", category: "classic", videoUrl: "videos/r12_video_4.mp4", date: "2025-11-26", duration: "3s" },
    { id: 55, title: "BMW R 12 Feature 5", description: "Heritage meets innovation", category: "classic", videoUrl: "videos/r12_video_5.mp4", date: "2025-11-25", duration: "3s" },
    
    // BMW R 1250 RT
    { id: 56, title: "R 1250 RT Tourer 1", description: "Premium sport touring refined", category: "luxury", videoUrl: "videos/r1250rt_video_1.mp4", date: "2025-11-25", duration: "3s" },
    { id: 57, title: "R 1250 RT Tourer 2", description: "ShiftCam technology explained", category: "tech", videoUrl: "videos/r1250rt_video_2.mp4", date: "2025-11-24", duration: "3s" },
    { id: 58, title: "R 1250 RT Tourer 3", description: "All-weather touring comfort", category: "luxury", videoUrl: "videos/r1250rt_video_3.mp4", date: "2025-11-24", duration: "3s" },
    { id: 59, title: "R 1250 RT Tourer 4", description: "Electronic suspension system", category: "tech", videoUrl: "videos/r1250rt_video_4.mp4", date: "2025-11-23", duration: "3s" },
    { id: 60, title: "R 1250 RT Tourer 5", description: "Long-distance sport touring", category: "luxury", videoUrl: "videos/r1250rt_video_5.mp4", date: "2025-11-23", duration: "3s" },
    
    // BMW R 1300 GS Adventure
    { id: 61, title: "R 1300 GS Adventure 1", description: "New flagship adventure bike", category: "racing", videoUrl: "videos/r1300gs_adventure_video_1.mp4", date: "2025-11-22", duration: "3s" },
    { id: 62, title: "R 1300 GS Adventure 2", description: "Extended fuel capacity touring", category: "racing", videoUrl: "videos/r1300gs_adventure_video_2.mp4", date: "2025-11-22", duration: "3s" },
    { id: 63, title: "R 1300 GS Adventure 3", description: "Ultimate adventure capability", category: "racing", videoUrl: "videos/r1300gs_adventure_video_3.mp4", date: "2025-11-21", duration: "3s" },
    { id: 64, title: "R 1300 GS Adventure 4", description: "Advanced rider assistance", category: "tech", videoUrl: "videos/r1300gs_adventure_video_4.mp4", date: "2025-11-21", duration: "3s" },
    { id: 65, title: "R 1300 GS Adventure 5", description: "World-touring redefined", category: "racing", videoUrl: "videos/r1300gs_adventure_video_5.mp4", date: "2025-11-20", duration: "3s" },
    
    // BMW R 1300 GS
    { id: 66, title: "BMW R 1300 GS Feature 1", description: "Revolutionary GS redesign", category: "racing", videoUrl: "videos/r1300gs_video_1.mp4", date: "2025-11-20", duration: "3s" },
    { id: 67, title: "BMW R 1300 GS Feature 2", description: "Enhanced performance boxer", category: "racing", videoUrl: "videos/r1300gs_video_2.mp4", date: "2025-11-19", duration: "3s" },
    { id: 68, title: "BMW R 1300 GS Feature 3", description: "Improved weight distribution", category: "tech", videoUrl: "videos/r1300gs_video_3.mp4", date: "2025-11-19", duration: "3s" },
    { id: 69, title: "BMW R 1300 GS Feature 4", description: "New shaft drive design", category: "tech", videoUrl: "videos/r1300gs_video_4.mp4", date: "2025-11-18", duration: "3s" },
    { id: 70, title: "BMW R 1300 GS Feature 5", description: "Adventure icon evolved", category: "racing", videoUrl: "videos/r1300gs_video_5.mp4", date: "2025-11-18", duration: "3s" },
    
    // BMW R 18 Transcontinental
    { id: 71, title: "R 18 Transcontinental 1", description: "Full-dress touring cruiser", category: "luxury", videoUrl: "videos/r18_transcontinental_video_1.mp4", date: "2025-11-17", duration: "3s" },
    { id: 72, title: "R 18 Transcontinental 2", description: "Big boxer cruising comfort", category: "luxury", videoUrl: "videos/r18_transcontinental_video_2.mp4", date: "2025-11-17", duration: "3s" },
    { id: 73, title: "R 18 Transcontinental 3", description: "Classic American styling", category: "classic", videoUrl: "videos/r18_transcontinental_video_3.mp4", date: "2025-11-16", duration: "3s" },
    { id: 74, title: "R 18 Transcontinental 4", description: "Massive storage capacity", category: "luxury", videoUrl: "videos/r18_transcontinental_video_4.mp4", date: "2025-11-16", duration: "3s" },
    { id: 75, title: "R 18 Transcontinental 5", description: "Highway cruising luxury", category: "luxury", videoUrl: "videos/r18_transcontinental_video_5.mp4", date: "2025-11-15", duration: "3s" },
    
    // BMW S 1000 R
    { id: 76, title: "BMW S 1000 R Roadster 1", description: "Superbike in naked form", category: "racing", videoUrl: "videos/s1000r_video_1.mp4", date: "2025-11-15", duration: "3s" },
    { id: 77, title: "BMW S 1000 R Roadster 2", description: "Street performance unleashed", category: "racing", videoUrl: "videos/s1000r_video_2.mp4", date: "2025-11-14", duration: "3s" },
    { id: 78, title: "BMW S 1000 R Roadster 3", description: "Inline-four power delivery", category: "racing", videoUrl: "videos/s1000r_video_3.mp4", date: "2025-11-14", duration: "3s" },
    { id: 79, title: "BMW S 1000 R Roadster 4", description: "Dynamic riding modes", category: "tech", videoUrl: "videos/s1000r_video_4.mp4", date: "2025-11-13", duration: "3s" },
    { id: 80, title: "BMW S 1000 R Roadster 5", description: "Aggressive street presence", category: "racing", videoUrl: "videos/s1000r_video_5.mp4", date: "2025-11-13", duration: "3s" },
    
    // BMW S 1000 RR
    { id: 81, title: "S 1000 RR Superbike 1", description: "Track-focused superbike tech", category: "racing", videoUrl: "videos/s1000rr_video_1.mp4", date: "2025-11-12", duration: "3s" },
    { id: 82, title: "S 1000 RR Superbike 2", description: "Race-proven performance", category: "racing", videoUrl: "videos/s1000rr_video_2.mp4", date: "2025-11-12", duration: "3s" },
    { id: 83, title: "S 1000 RR Superbike 3", description: "Aerodynamic winglet design", category: "tech", videoUrl: "videos/s1000rr_video_3.mp4", date: "2025-11-11", duration: "3s" },
    { id: 84, title: "S 1000 RR Superbike 4", description: "Electronic rider aids suite", category: "tech", videoUrl: "videos/s1000rr_video_4.mp4", date: "2025-11-11", duration: "3s" },
    { id: 85, title: "S 1000 RR Superbike 5", description: "Ultimate track weapon", category: "racing", videoUrl: "videos/s1000rr_video_5.mp4", date: "2025-11-10", duration: "3s" },
    
    // BMW S 1000 XR
    { id: 86, title: "S 1000 XR Adventure Sport 1", description: "Sport touring versatility", category: "racing", videoUrl: "videos/s1000xr_video_1.mp4", date: "2025-11-10", duration: "3s" },
    { id: 87, title: "S 1000 XR Adventure Sport 2", description: "Superbike meets adventure", category: "racing", videoUrl: "videos/s1000xr_video_2.mp4", date: "2025-11-09", duration: "3s" },
    { id: 88, title: "S 1000 XR Adventure Sport 3", description: "All-road capability", category: "racing", videoUrl: "videos/s1000xr_video_3.mp4", date: "2025-11-09", duration: "3s" },
    { id: 89, title: "S 1000 XR Adventure Sport 4", description: "Dynamic ESA suspension", category: "tech", videoUrl: "videos/s1000xr_video_4.mp4", date: "2025-11-08", duration: "3s" }
];

// DOM Elements
const videoGrid = document.getElementById('videoGrid');
const modal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');
const closeVideoModal = document.querySelector('.close-modal');
const filterButtons = document.querySelectorAll('.filter-btn');
const categoryCards = document.querySelectorAll('.category-card');
const navLinks = document.querySelectorAll('.nav-link');

// State
let currentFilter = 'all';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderVideos();
    setupEventListeners();
    setupNavigation();
});

// Render videos based on filter
function renderVideos(filter = 'all') {
    const filteredVideos = filter === 'all' 
        ? videosData 
        : videosData.filter(video => video.category === filter);
    
    videoGrid.innerHTML = '';
    
    // Limit to 10 videos
    filteredVideos.slice(0, 10).forEach(video => {
        const videoCard = createVideoCard(video);
        videoGrid.appendChild(videoCard);
    });
}

// Create video card element
function createVideoCard(video) {
    const card = document.createElement('a');
    card.href = `video.html?id=${video.id}`;
    card.className = 'video-card';
    card.setAttribute('data-category', video.category);
    card.style.textDecoration = 'none';
    card.style.color = 'inherit';
    
    card.innerHTML = `
        <div class="video-thumbnail">
            <video muted preload="metadata" style="width: 100%; height: 100%; object-fit: cover;">
                <source src="${video.videoUrl}#t=0.5" type="video/mp4">
            </video>
            <div class="play-overlay">
                <i class="fas fa-play"></i>
            </div>
            <span class="duration-badge">${video.duration}</span>
        </div>
        <div class="video-info">
            <h3>${video.title}</h3>
            <p>${video.description}</p>
            <div class="video-meta">
                <span class="category-badge">${formatCategory(video.category)}</span>
                <span class="video-date">${formatDate(video.date)}</span>
            </div>
        </div>
    `;
    
    return card;
}

// Open video modal
function openModal(video) {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Set video source (placeholder for now)
    modalVideo.src = video.videoUrl;
    
    // Set video info
    document.getElementById('modalTitle').textContent = video.title;
    document.getElementById('modalDescription').textContent = video.description;
    document.getElementById('modalCategory').textContent = formatCategory(video.category);
    document.getElementById('modalDate').textContent = formatDate(video.date);
    
    modalVideo.play();
}

// Close modal
function closeVideoModalHandler() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    modalVideo.pause();
    modalVideo.src = '';
}

// Setup event listeners
function setupEventListeners() {
    // Close modal
    if (closeVideoModal) {
        closeVideoModal.addEventListener('click', closeVideoModalHandler);
    }
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeVideoModalHandler();
        }
    });
    
    // Escape key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeVideoModalHandler();
        }
    });
    
    // Filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            currentFilter = filter;
            renderVideos(filter);
        });
    });
    
    // Category cards
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.getAttribute('data-category');
            
            // Scroll to video section
            document.getElementById('trending').scrollIntoView({ behavior: 'smooth' });
            
            // Filter videos
            setTimeout(() => {
                const filterBtn = document.querySelector(`[data-filter="${category}"]`);
                if (filterBtn) {
                    filterBtn.click();
                }
            }, 500);
        });
    });
}

// Setup navigation
function setupNavigation() {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
    
    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Helper function to scroll to videos
function scrollToVideos() {
    document.getElementById('trending').scrollIntoView({ behavior: 'smooth' });
}

// Format category for display
function formatCategory(category) {
    const categories = {
        'electric': 'Electric',
        'racing': 'Racing',
        'luxury': 'Luxury',
        'tech': 'Technology',
        'classic': 'Classic',
        'industry': 'Industry'
    };
    return categories[category] || category;
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// Search functionality (can be expanded)
function searchVideos(query) {
    const filteredVideos = videosData.filter(video => 
        video.title.toLowerCase().includes(query.toLowerCase()) ||
        video.description.toLowerCase().includes(query.toLowerCase())
    );
    
    videoGrid.innerHTML = '';
    // Limit to 10 videos
    filteredVideos.slice(0, 10).forEach(video => {
        const videoCard = createVideoCard(video);
        videoGrid.appendChild(videoCard);
    });
}

// Export functions for use in HTML
window.scrollToVideos = scrollToVideos;
window.searchVideos = searchVideos;
