(function() {
    // State Store
    const state = {
        products: [],
        filteredProducts: []
    };

    // Cache DOM Elements
    const elements = {
        grid: document.getElementById('productGrid'),
        skeleton: document.getElementById('skeletonContainer'),
        searchInput: document.getElementById('searchInput'),
        categoryFilter: document.getElementById('categoryFilter'),
        priceRange: document.getElementById('priceRange'),
        priceLabel: document.getElementById('priceLabel'),
        emptyState: document.getElementById('emptyState')
    };

    /**
     * Helper: Debounce function for performance
     */
    function debounce(func, timeout = 300) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => { func.apply(this, args); }, timeout);
        };
    }

    /**
     * Fetch Data
     */
    async function init() {
        try {
            const response = await fetch('products.json');
            if (!response.ok) throw new Error('Could not fetch products');
            
            state.products = await response.json();
            
            // Artificial delay to demonstrate skeleton loader
            setTimeout(() => {
                state.filteredProducts = [...state.products];
                renderProducts();
                elements.skeleton.classList.add('hidden');
                elements.grid.classList.remove('hidden');
            }, 1000);

        } catch (error) {
            console.error("App Init Error:", error);
            elements.grid.innerHTML = `<p style="color:red">Error loading products. Check your local server.</p>`;
        }
    }

    /**
     * Render Logic
     */
    function renderProducts() {
        elements.grid.innerHTML = '';
        
        if (state.filteredProducts.length === 0) {
            elements.emptyState.classList.remove('hidden');
            return;
        }

        elements.emptyState.classList.add('hidden');

        state.filteredProducts.forEach(product => {
            const card = document.createElement('article');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-card__img" loading="lazy">
                <span class="product-card__brand">${product.brand}</span>
                <h3 class="product-card__name">${product.name}</h3>
                <div class="product-card__rating">${product.rating} ★</div>
                <div class="product-card__price">₹${product.price.toLocaleString('en-IN')}</div>
                <button class="btn-add">Add to Cart</button>
            `;
            elements.grid.appendChild(card);
        });
    }

    
    /**
     * Filter Logic
     */
    function applyFilters() {
        const query = elements.searchInput.value.toLowerCase();
        const cat = elements.categoryFilter.value;
        const maxPrice = parseInt(elements.priceRange.value);

        state.filteredProducts = state.products.filter(p => {
            const matchesSearch = p.name.toLowerCase().includes(query) || p.brand.toLowerCase().includes(query);
            const matchesCat = cat === 'all' || p.category === cat;
            const matchesPrice = p.price <= maxPrice;
            return matchesSearch && matchesCat && matchesPrice;
        });

        renderProducts();
    }

    // Event Listeners
    elements.searchInput.addEventListener('input', debounce(() => applyFilters()));
    elements.categoryFilter.addEventListener('change', applyFilters);
    elements.priceRange.addEventListener('input', (e) => {
        elements.priceLabel.textContent = parseInt(e.target.value).toLocaleString('en-IN');
        applyFilters();
    });

    // Start App
    init();
})();