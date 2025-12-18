// video.js - Handles dynamic video page loading

// Get video ID from URL parameters
function getVideoIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('id'));
}

// Find video by ID
function getVideoById(id) {
    return videosData.find(video => video.id === id);
}

// Get related videos by category (excluding current video)
function getRelatedVideos(currentVideo, limit = 3) {
    return videosData
        .filter(video => 
            video.category === currentVideo.category && 
            video.id !== currentVideo.id
        )
        .slice(0, limit);
}

// Format category for display
function formatCategoryDisplay(category) {
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
function formatVideoDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// Render video page
function renderVideoPage() {
    const videoId = getVideoIdFromURL();
    const contentContainer = document.getElementById('videoContent');
    
    if (!videoId) {
        contentContainer.innerHTML = `
            <div class="error-message">
                <h2>Video Not Found</h2>
                <p>Please select a video from the home page.</p>
                <a href="index.html" class="btn-primary" style="display: inline-block; margin-top: 1rem; text-decoration: none;">
                    <i class="fas fa-home"></i> Go Home
                </a>
            </div>
        `;
        return;
    }
    
    const video = getVideoById(videoId);
    
    if (!video) {
        contentContainer.innerHTML = `
            <div class="error-message">
                <h2>Video Not Found</h2>
                <p>The video you're looking for doesn't exist.</p>
                <a href="index.html" class="btn-primary" style="display: inline-block; margin-top: 1rem; text-decoration: none;">
                    <i class="fas fa-home"></i> Go Home
                </a>
            </div>
        `;
        return;
    }
    
    // Update page title
    document.getElementById('pageTitle').textContent = `${video.title} - AutoClip`;
    
    // Get related videos
    const relatedVideos = getRelatedVideos(video);
    
    // Render video content
    contentContainer.innerHTML = `
        <div class="video-detail-container">
            <div class="video-player-wrapper">
                <img src="${video.thumbnail.replace('400x300', '1920x1080')}" alt="${video.title}">
            </div>
            <div class="video-content">
                <div class="video-header">
                    <h1 class="video-title-main">${video.title}</h1>
                    <div class="video-meta-main">
                        <span class="category-badge">${formatCategoryDisplay(video.category)}</span>
                        <span style="color: var(--text-secondary);"><i class="far fa-calendar"></i> ${formatVideoDate(video.date)}</span>
                        <span style="color: var(--text-secondary);"><i class="far fa-clock"></i> ${video.duration}</span>
                    </div>
                </div>
                <div class="video-description-full">
                    <p>${video.description}</p>
                </div>
                <div class="video-actions-main">
                    <button class="action-btn-large" onclick="likeVideo()">
                        <i class="fas fa-thumbs-up"></i> Like
                    </button>
                    <button class="action-btn-large" onclick="shareVideo()">
                        <i class="fas fa-share"></i> Share
                    </button>
                    <button class="action-btn-large" onclick="saveVideo()">
                        <i class="fas fa-bookmark"></i> Save
                    </button>
                    <button class="action-btn-large" onclick="downloadVideo()">
                        <i class="fas fa-download"></i> Download
                    </button>
                </div>
                
                ${relatedVideos.length > 0 ? `
                <div class="related-section">
                    <h2 class="related-title">Related Videos</h2>
                    <div class="related-videos">
                        ${relatedVideos.map(relVideo => `
                            <a href="video.html?id=${relVideo.id}" class="video-card" style="text-decoration: none; color: inherit;">
                                <div class="video-thumbnail">
                                    <img src="${relVideo.thumbnail}" alt="${relVideo.title}" style="width: 100%; height: 100%; object-fit: cover;">
                                    <div class="play-overlay"><i class="fas fa-play"></i></div>
                                    <span class="duration-badge">${relVideo.duration}</span>
                                </div>
                                <div class="video-info">
                                    <h3>${relVideo.title}</h3>
                                    <p>${relVideo.description}</p>
                                </div>
                            </a>
                        `).join('')}
                    </div>
                </div>
                ` : ''}
                
                <!-- Comments Section -->
                <input type="hidden" id="videoId" value="${video.id}">
                <div class="comments-section">
                    <div class="comments-header">
                        <h2 class="comments-title">Comments</h2>
                        <span class="comments-count" id="commentsCount">0 Comments</span>
                    </div>
                    <div class="comment-form">
                        <h3>Share Your Thoughts</h3>
                        <form id="commentForm">
                            <div class="form-group">
                                <label for="commentName">Name</label>
                                <input type="text" id="commentName" placeholder="Enter your name" required maxlength="50">
                            </div>
                            <div class="form-group">
                                <label for="commentText">Comment</label>
                                <textarea id="commentText" placeholder="What do you think about this news?" required minlength="5" maxlength="500"></textarea>
                            </div>
                            <button type="submit" class="submit-comment-btn">
                                <i class="fas fa-paper-plane"></i> Post Comment
                            </button>
                        </form>
                    </div>
                    <div class="comments-list" id="commentsList">
                        <!-- Comments will be loaded here -->
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Initialize comments if the comments.js is loaded
    if (typeof loadComments === 'function') {
        loadComments();
    }
}

// Video action functions
function likeVideo() {
    const videoId = getVideoIdFromURL();
    const likes = JSON.parse(localStorage.getItem('videoLikes') || '{}');
    
    if (likes[videoId]) {
        delete likes[videoId];
        alert('Like removed!');
    } else {
        likes[videoId] = true;
        alert('Video liked!');
    }
    
    localStorage.setItem('videoLikes', JSON.stringify(likes));
}

function shareVideo() {
    const video = getVideoById(getVideoIdFromURL());
    
    if (navigator.share) {
        navigator.share({
            title: video.title,
            text: video.description,
            url: window.location.href
        }).catch(() => {
            copyToClipboard(window.location.href);
        });
    } else {
        copyToClipboard(window.location.href);
    }
}

function saveVideo() {
    const videoId = getVideoIdFromURL();
    const saved = JSON.parse(localStorage.getItem('savedVideos') || '[]');
    
    if (saved.includes(videoId)) {
        const index = saved.indexOf(videoId);
        saved.splice(index, 1);
        alert('Video removed from saved!');
    } else {
        saved.push(videoId);
        alert('Video saved!');
    }
    
    localStorage.setItem('savedVideos', JSON.stringify(saved));
}

function downloadVideo() {
    alert('Download functionality would be available with actual video files. For demo purposes, this would download the video.');
}

function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            alert('Link copied to clipboard!');
        }).catch(() => {
            fallbackCopyToClipboard(text);
        });
    } else {
        fallbackCopyToClipboard(text);
    }
}

function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
        document.execCommand('copy');
        alert('Link copied to clipboard!');
    } catch (err) {
        alert('Could not copy link. Please copy manually: ' + text);
    }
    
    document.body.removeChild(textArea);
}

// Initialize video page when DOM is loaded
if (document.getElementById('videoContent')) {
    document.addEventListener('DOMContentLoaded', renderVideoPage);
}
