// Get motorcycle ID from URL parameter
const urlParams = new URLSearchParams(window.location.search);
const motorcycleId = urlParams.get('id');

// Load motorcycle data
if (motorcycleId && motorcyclesData[motorcycleId]) {
    const bike = motorcyclesData[motorcycleId];
    
    // Update page title
    document.title = `${bike.name} - ${bike.brand} - MotoClip`;
    
    // Populate motorcycle details
    document.getElementById('motorcycleName').textContent = bike.name;
    document.getElementById('motorcycleBrand').textContent = bike.brand;
    document.getElementById('motorcycleOrigin').textContent = bike.origin;
    document.getElementById('motorcyclePrice').textContent = bike.price;
    document.getElementById('motorcycleDescription').textContent = bike.description;
    document.getElementById('motorcycleEngine').textContent = bike.engine;
    document.getElementById('motorcyclePower').textContent = bike.power;
    document.getElementById('motorcycleTorque').textContent = bike.torque;
    document.getElementById('motorcycleWeight').textContent = bike.weight;
    document.getElementById('motorcycleTopSpeed').textContent = bike.topSpeed;
    document.getElementById('motorcycleCategory').textContent = bike.category;
    
    // Set image
    const img = document.getElementById('motorcycleImage');
    img.src = bike.image;
    img.alt = bike.name;
    
    // Populate features
    const featuresList = document.getElementById('motorcycleFeatures');
    bike.features.forEach(feature => {
        const li = document.createElement('li');
        li.innerHTML = `<i class="fas fa-check"></i> ${feature}`;
        featuresList.appendChild(li);
    });
} else {
    // Redirect to home if motorcycle not found
    window.location.href = 'index.html';
}
