// Sample video data - Replace with actual video URLs hosted on GitHub or CDN
const videosData = [
    {
        id: 1,
        title: "Tesla Cybertruck Production Ramp",
        description: "Tesla accelerates Cybertruck production with new manufacturing techniques",
        category: "electric",
        thumbnail: "https://via.placeholder.com/400x300/2563eb/ffffff?text=Tesla+Cybertruck",
        videoUrl: "https://via.placeholder.com/800x600/2563eb/ffffff?text=Tesla+Video",
        date: "2025-12-18",
        duration: "3s"
    },
    {
        id: 2,
        title: "F1 2025 Season Preview",
        description: "Formula 1 unveils new regulations for the upcoming season",
        category: "racing",
        thumbnail: "https://via.placeholder.com/400x300/dc2626/ffffff?text=F1+Racing",
        videoUrl: "https://via.placeholder.com/800x600/dc2626/ffffff?text=F1+Video",
        date: "2025-12-17",
        duration: "3s"
    },
    {
        id: 3,
        title: "Mercedes EQS SUV Launch",
        description: "Mercedes-Benz introduces luxury electric SUV with 600km range",
        category: "luxury",
        thumbnail: "https://via.placeholder.com/400x300/7c3aed/ffffff?text=Mercedes+EQS",
        videoUrl: "https://via.placeholder.com/800x600/7c3aed/ffffff?text=Mercedes+Video",
        date: "2025-12-16",
        duration: "3s"
    },
    {
        id: 4,
        title: "Autonomous Driving Level 4",
        description: "New autonomous driving system achieves Level 4 certification",
        category: "tech",
        thumbnail: "https://via.placeholder.com/400x300/059669/ffffff?text=Autonomous",
        videoUrl: "https://via.placeholder.com/800x600/059669/ffffff?text=Auto+Video",
        date: "2025-12-15",
        duration: "3s"
    },
    {
        id: 5,
        title: "Porsche 911 Restored Classic",
        description: "1973 Porsche 911 receives complete restoration by experts",
        category: "classic",
        thumbnail: "https://via.placeholder.com/400x300/d97706/ffffff?text=Porsche+Classic",
        videoUrl: "https://via.placeholder.com/800x600/d97706/ffffff?text=Porsche+Video",
        date: "2025-12-14",
        duration: "3s"
    },
    {
        id: 6,
        title: "EV Market Growth Report",
        description: "Global electric vehicle sales surge 60% in Q4 2025",
        category: "industry",
        thumbnail: "https://via.placeholder.com/400x300/0891b2/ffffff?text=EV+Market",
        videoUrl: "https://via.placeholder.com/800x600/0891b2/ffffff?text=Market+Video",
        date: "2025-12-13",
        duration: "3s"
    },
    {
        id: 7,
        title: "BMW i7 Electric Sedan",
        description: "BMW's flagship electric sedan combines luxury with performance",
        category: "electric",
        thumbnail: "https://via.placeholder.com/400x300/2563eb/ffffff?text=BMW+i7",
        videoUrl: "https://via.placeholder.com/800x600/2563eb/ffffff?text=BMW+Video",
        date: "2025-12-12",
        duration: "3s"
    },
    {
        id: 8,
        title: "NASCAR Next Gen Cars",
        description: "NASCAR introduces new generation of stock cars with advanced tech",
        category: "racing",
        thumbnail: "https://via.placeholder.com/400x300/dc2626/ffffff?text=NASCAR",
        videoUrl: "https://via.placeholder.com/800x600/dc2626/ffffff?text=NASCAR+Video",
        date: "2025-12-11",
        duration: "3s"
    },
    {
        id: 9,
        title: "Rolls-Royce Spectre EV",
        description: "Rolls-Royce enters electric era with ultra-luxury Spectre",
        category: "luxury",
        thumbnail: "https://via.placeholder.com/400x300/7c3aed/ffffff?text=Rolls+Royce",
        videoUrl: "https://via.placeholder.com/800x600/7c3aed/ffffff?text=RR+Video",
        date: "2025-12-10",
        duration: "3s"
    },
    {
        id: 10,
        title: "AI-Powered Parking System",
        description: "New AI system makes parallel parking completely autonomous",
        category: "tech",
        thumbnail: "https://via.placeholder.com/400x300/059669/ffffff?text=AI+Parking",
        videoUrl: "https://via.placeholder.com/800x600/059669/ffffff?text=AI+Video",
        date: "2025-12-09",
        duration: "3s"
    },
    {
        id: 11,
        title: "1967 Mustang Fastback",
        description: "Iconic Ford Mustang Fastback undergoes frame-off restoration",
        category: "classic",
        thumbnail: "https://via.placeholder.com/400x300/d97706/ffffff?text=Mustang",
        videoUrl: "https://via.placeholder.com/800x600/d97706/ffffff?text=Mustang+Video",
        date: "2025-12-08",
        duration: "3s"
    },
    {
        id: 12,
        title: "Auto Industry Supply Chain",
        description: "Chip shortage eases as semiconductor production increases",
        category: "industry",
        thumbnail: "https://via.placeholder.com/400x300/0891b2/ffffff?text=Supply+Chain",
        videoUrl: "https://via.placeholder.com/800x600/0891b2/ffffff?text=Industry+Video",
        date: "2025-12-07",
        duration: "3s"
    }
];

// DOM Elements
const videoGrid = document.getElementById('videoGrid');
const modal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');
const closeModal = document.querySelector('.close-modal');
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
    
    filteredVideos.forEach(video => {
        const videoCard = createVideoCard(video);
        videoGrid.appendChild(videoCard);
    });
}

// Create video card element
function createVideoCard(video) {
    const card = document.createElement('a');
    card.href = `video-${video.id}.html`;
    card.className = 'video-card';
    card.setAttribute('data-category', video.category);
    card.style.textDecoration = 'none';
    card.style.color = 'inherit';
    
    card.innerHTML = `
        <div class="video-thumbnail">
            <img src="${video.thumbnail}" alt="${video.title}" style="width: 100%; height: 100%; object-fit: cover;">
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
function closeVideoModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    modalVideo.pause();
    modalVideo.src = '';
}

// Setup event listeners
function setupEventListeners() {
    // Close modal
    closeModal.addEventListener('click', closeVideoModal);
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeVideoModal();
        }
    });
    
    // Escape key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeVideoModal();
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
    filteredVideos.forEach(video => {
        const videoCard = createVideoCard(video);
        videoGrid.appendChild(videoCard);
    });
}

// Export functions for use in HTML
window.scrollToVideos = scrollToVideos;
window.searchVideos = searchVideos;
