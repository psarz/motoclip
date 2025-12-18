// Sample video data - Replace with actual video URLs hosted on GitHub or CDN
const videosData = [
    {
        id: 1,
        title: "Zero SR/F Electric Bike",
        description: "Zero Motorcycles unveils new SR/F with 200-mile range",
        category: "electric",
        thumbnail: "https://via.placeholder.com/400x300/1a1a1a/ffffff?text=Zero+SR/F",
        videoUrl: "https://via.placeholder.com/800x600/1a1a1a/ffffff?text=Zero+Video",
        date: "2025-12-18",
        duration: "3s"
    },
    {
        id: 2,
        title: "MotoGP 2025 Season Start",
        description: "MotoGP kicks off with new regulations and rider lineup",
        category: "racing",
        thumbnail: "https://via.placeholder.com/400x300/ff6b35/ffffff?text=MotoGP",
        videoUrl: "https://via.placeholder.com/800x600/ff6b35/ffffff?text=MotoGP+Video",
        date: "2025-12-17",
        duration: "3s"
    },
    {
        id: 3,
        title: "Ducati Panigale V4 SP2",
        description: "Ducati reveals limited edition Panigale with track-focused upgrades",
        category: "luxury",
        thumbnail: "https://via.placeholder.com/400x300/2d2d2d/ffffff?text=Ducati+V4",
        videoUrl: "https://via.placeholder.com/800x600/2d2d2d/ffffff?text=Ducati+Video",
        date: "2025-12-16",
        duration: "3s"
    },
    {
        id: 4,
        title: "Smart Helmet Technology",
        description: "New AR helmet displays navigation and bike data in real-time",
        category: "tech",
        thumbnail: "https://via.placeholder.com/400x300/1a1a1a/ffffff?text=Smart+Helmet",
        videoUrl: "https://via.placeholder.com/800x600/1a1a1a/ffffff?text=Helmet+Video",
        date: "2025-12-15",
        duration: "3s"
    },
    {
        id: 5,
        title: "Honda CB750 Restoration",
        description: "1970s Honda CB750 receives full restoration to original glory",
        category: "classic",
        thumbnail: "https://via.placeholder.com/400x300/ff6b35/ffffff?text=Honda+CB750",
        videoUrl: "https://via.placeholder.com/800x600/ff6b35/ffffff?text=Honda+Video",
        date: "2025-12-14",
        duration: "3s"
    },
    {
        id: 6,
        title: "E-Bike Market Boom",
        description: "Electric motorcycle sales surge 80% in Q4 2025",
        category: "industry",
        thumbnail: "https://via.placeholder.com/400x300/2d2d2d/ffffff?text=E-Bike+Market",
        videoUrl: "https://via.placeholder.com/800x600/2d2d2d/ffffff?text=Market+Video",
        date: "2025-12-13",
        duration: "3s"
    },
    {
        id: 7,
        title: "Harley-Davidson LiveWire S2",
        description: "Harley's electric lineup expands with performance-focused S2",
        category: "electric",
        thumbnail: "https://via.placeholder.com/400x300/1a1a1a/ffffff?text=LiveWire+S2",
        videoUrl: "https://via.placeholder.com/800x600/1a1a1a/ffffff?text=Harley+Video",
        date: "2025-12-12",
        duration: "3s"
    },
    {
        id: 8,
        title: "Isle of Man TT Records",
        description: "New lap record set at legendary Isle of Man TT race",
        category: "racing",
        thumbnail: "https://via.placeholder.com/400x300/ff6b35/ffffff?text=Isle+of+Man",
        videoUrl: "https://via.placeholder.com/800x600/ff6b35/ffffff?text=TT+Video",
        date: "2025-12-11",
        duration: "3s"
    },
    {
        id: 9,
        title: "BMW S1000RR M Sport",
        description: "BMW unveils ultimate superbike with M division engineering",
        category: "luxury",
        thumbnail: "https://via.placeholder.com/400x300/2d2d2d/ffffff?text=BMW+M+Sport",
        videoUrl: "https://via.placeholder.com/800x600/2d2d2d/ffffff?text=BMW+Video",
        date: "2025-12-10",
        duration: "3s"
    },
    {
        id: 10,
        title: "Adaptive Cruise Control",
        description: "New radar-based ACC system for motorcycles launches",
        category: "tech",
        thumbnail: "https://via.placeholder.com/400x300/1a1a1a/ffffff?text=ACC+System",
        videoUrl: "https://via.placeholder.com/800x600/1a1a1a/ffffff?text=Tech+Video",
        date: "2025-12-09",
        duration: "3s"
    },
    {
        id: 11,
        title: "Kawasaki Z900RS Cafe",
        description: "Classic-inspired modern cafe racer with retro styling",
        category: "classic",
        thumbnail: "https://via.placeholder.com/400x300/ff6b35/ffffff?text=Kawasaki+Z900",
        videoUrl: "https://via.placeholder.com/800x600/ff6b35/ffffff?text=Kawasaki+Video",
        date: "2025-12-08",
        duration: "3s"
    },
    {
        id: 12,
        title: "Motorcycle Market Growth",
        description: "Global motorcycle industry sees record sales in 2025",
        category: "industry",
        thumbnail: "https://via.placeholder.com/400x300/2d2d2d/ffffff?text=Market+Growth",
        videoUrl: "https://via.placeholder.com/800x600/2d2d2d/ffffff?text=Industry+Video",
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
    card.href = `video.html?id=${video.id}`;
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
