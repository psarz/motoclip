// Comments functionality for video pages

class CommentsManager {
    constructor(videoId) {
        this.videoId = videoId;
        this.storageKey = `autoclip_comments_${videoId}`;
        this.comments = this.loadComments();
        this.init();
    }

    init() {
        this.renderComments();
        this.updateCommentsCount();
        this.setupFormSubmit();
    }

    loadComments() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            return stored ? JSON.parse(stored) : [];
        } catch (e) {
            console.error('Error loading comments:', e);
            return [];
        }
    }

    saveComments() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.comments));
        } catch (e) {
            console.error('Error saving comments:', e);
        }
    }

    addComment(name, comment) {
        const newComment = {
            id: Date.now(),
            name: name.trim(),
            comment: comment.trim(),
            date: new Date().toISOString(),
            likes: 0,
            liked: false
        };
        
        this.comments.unshift(newComment);
        this.saveComments();
        this.renderComments();
        this.updateCommentsCount();
    }

    deleteComment(commentId) {
        this.comments = this.comments.filter(c => c.id !== commentId);
        this.saveComments();
        this.renderComments();
        this.updateCommentsCount();
    }

    toggleLike(commentId) {
        const comment = this.comments.find(c => c.id === commentId);
        if (comment) {
            comment.liked = !comment.liked;
            comment.likes = comment.liked ? comment.likes + 1 : comment.likes - 1;
            this.saveComments();
            this.renderComments();
        }
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
        if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
        
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }

    getInitials(name) {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);
    }

    renderComments() {
        const commentsList = document.getElementById('commentsList');
        
        if (this.comments.length === 0) {
            commentsList.innerHTML = `
                <div class="no-comments">
                    <i class="far fa-comments"></i>
                    <p>No comments yet. Be the first to share your thoughts!</p>
                </div>
            `;
            return;
        }

        commentsList.innerHTML = this.comments.map(comment => `
            <div class="comment-item" data-comment-id="${comment.id}">
                <div class="comment-header">
                    <div class="comment-avatar">${this.getInitials(comment.name)}</div>
                    <div class="comment-author-info">
                        <div class="comment-author">${this.escapeHtml(comment.name)}</div>
                        <div class="comment-date">${this.formatDate(comment.date)}</div>
                    </div>
                </div>
                <div class="comment-text">${this.escapeHtml(comment.comment)}</div>
                <div class="comment-actions">
                    <button class="comment-action-btn like-btn ${comment.liked ? 'liked' : ''}" data-comment-id="${comment.id}">
                        <i class="${comment.liked ? 'fas' : 'far'} fa-thumbs-up"></i>
                        <span>${comment.likes > 0 ? comment.likes : ''}</span>
                    </button>
                    <button class="comment-action-btn reply-btn">
                        <i class="far fa-comment"></i>
                        <span>Reply</span>
                    </button>
                </div>
            </div>
        `).join('');

        // Add event listeners for like buttons
        document.querySelectorAll('.like-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const commentId = parseInt(e.currentTarget.dataset.commentId);
                this.toggleLike(commentId);
            });
        });
    }

    updateCommentsCount() {
        const countElement = document.getElementById('commentsCount');
        if (countElement) {
            const count = this.comments.length;
            countElement.textContent = `${count} ${count === 1 ? 'Comment' : 'Comments'}`;
        }
    }

    setupFormSubmit() {
        const form = document.getElementById('commentForm');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nameInput = document.getElementById('commentName');
            const commentInput = document.getElementById('commentText');
            
            const name = nameInput.value.trim();
            const comment = commentInput.value.trim();
            
            if (!name || !comment) {
                alert('Please fill in both name and comment fields.');
                return;
            }

            if (comment.length < 5) {
                alert('Comment must be at least 5 characters long.');
                return;
            }

            this.addComment(name, comment);
            
            // Clear form
            nameInput.value = '';
            commentInput.value = '';
            
            // Show success message
            this.showSuccessMessage();
            
            // Scroll to comments
            document.getElementById('commentsList').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    }

    showSuccessMessage() {
        const form = document.getElementById('commentForm');
        const message = document.createElement('div');
        message.style.cssText = 'background: #10b981; color: white; padding: 12px 20px; border-radius: 10px; margin-top: 15px; text-align: center; font-weight: 600;';
        message.innerHTML = '<i class="fas fa-check-circle"></i> Comment posted successfully!';
        
        form.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 3000);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize comments when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const videoIdElement = document.getElementById('videoId');
    if (videoIdElement) {
        const videoId = videoIdElement.value;
        window.commentsManager = new CommentsManager(videoId);
    }
});
