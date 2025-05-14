// ملف: fancy-loader.js
class FancyLoader {
  constructor() {
    this.createLoader();
    this.addStyles();
  }

  createLoader() {
    this.loader = document.createElement('div');
    this.loader.id = 'fancy-loader';
    this.loader.innerHTML = `
      <div class="loader-container">
        <div class="logo-spin">
          <img src="assets/logo.png" alt=" E-commerce">
        </div>
        <div class="spinner">
          <div class="spinner-sector spinner-sector-red"></div>
          <div class="spinner-sector spinner-sector-blue"></div>
          <div class="spinner-sector spinner-sector-green"></div>
        </div>
        <div class="progress-text">Trendify...</div>
      </div>
    `;
    document.body.prepend(this.loader);
  }

  addStyles() {
    const style = document.createElement('style');
    style.textContent = `
      #fancy-loader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.95);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
      }
      
      .loader-container {
        text-align: center;
      }
      
      .logo-spin {
        margin-bottom: 30px;
        animation: bounce 2s infinite;
      }
      
      .logo-spin img {
        width: 100px;
        height: 100px;
        object-fit: contain;
      }
      
      .spinner {
        position: relative;
        width: 80px;
        height: 80px;
        margin: 0 auto 20px;
      }
      
      .spinner-sector {
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: 8px solid transparent;
        mix-blend-mode: overlay;
      }
      
      .spinner-sector-red {
        border-top-color: #ff6b6b;
        animation: spin 1.5s ease-in-out infinite;
      }
      
      .spinner-sector-blue {
        border-left-color: #48dbfb;
        animation: spin 2s ease infinite;
      }
      
      .spinner-sector-green {
        border-right-color: #1dd1a1;
        animation: spin 2.5s ease-out infinite;
      }
      
      .progress-text {
        font-family: 'Arial', sans-serif;
        font-size: 18px;
        color: #333;
        margin-top: 20px;
        animation: pulse 1.5s infinite;
      }
      
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
      
      @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-20px); }
      }
      
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
    `;
    document.head.appendChild(style);
  }

  show() {
    this.loader.style.display = 'flex';
    this.loader.style.opacity = '1';
  }

  hide() {
    this.loader.style.opacity = '0';
    setTimeout(() => {
      this.loader.style.display = 'none';
    }, 500);
  }
}

// جعل الكلاس متاحًا عالميًا
window.fancyLoader = new FancyLoader();

// الاستخدام التلقائي عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
  window.fancyLoader.show();
});

window.addEventListener('load', () => {
  setTimeout(() => {
    window.fancyLoader.hide();
  }, 1000);
});