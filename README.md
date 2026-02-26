# 🛒 TechKart India - Responsive Product Grid

A premium, production-ready product grid application built for the **QuantumIT Internship Assignment**. This project demonstrates a mobile-first approach, modular Vanilla JavaScript, and high-performance filtering logic tailored for the Indian e-commerce market.



## 🚀 Live Demo
**View Project:** 

---

## 🛠️ Technical Features

### 1. High-Performance Search (Debouncing)
Instead of filtering on every single keystroke, I implemented a **300ms Debounce function**. This prevents the UI from lagging by ensuring the filter logic only runs once the user has finished typing.

### 2. Modern UI & UX
- **Skeleton Loading:** Replaced traditional spinners with skeleton screens to improve perceived performance and reduce layout shift (CLS).
- **Mobile-First Grid:** - 📱 **Mobile:** 1 Column
  - 7️⃣ **Tablet:** 2 Columns
  - 💻 **Desktop:** 4 Columns
- **Micro-interactions:** Smooth CSS transitions on hover and fade-in animations for product entry.

### 3. Clean Code Architecture
- **State Management:** Uses a centralized `state` object to track product data and filter status.
- **BEM Methodology:** CSS follows the Block-Element-Modifier naming convention for better maintainability.
- **Indian Context:** Localized pricing (₹), Indian electronics brands (boAt, Nothing, Noise), and `en-IN` currency formatting.

---

## 📂 Project Structure

```text
/
├── index.html      # Semantic HTML5 structure
├── style.css       # Custom CSS (Grid, Flexbox, Variables)
├── app.js          # Modular JS logic & API simulation
└── products.json   # Mock Database (Localized for India)
