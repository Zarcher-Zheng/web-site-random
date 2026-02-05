document.addEventListener('DOMContentLoaded', () => {
    const pickBtn = document.getElementById('pick-btn');
    const clearBtn = document.getElementById('clear-btn');
    const retryBtn = document.getElementById('retry-btn');
    const itemsInput = document.getElementById('items-input');
    const resultSection = document.getElementById('result-section');
    const resultDisplay = document.getElementById('result-display');

    function getRandomItem() {
        const text = itemsInput.value.trim();
        if (!text) return null;

        // Split by newlines and filter out empty lines
        const items = text.split('\n')
            .map(item => item.trim())
            .filter(item => item.length > 0);

        if (items.length === 0) return null;

        const randomIndex = Math.floor(Math.random() * items.length);
        return items[randomIndex];
    }

    function showResult() {
        const result = getRandomItem();

        if (!result) {
            alert('請先輸入至少一個項目！');
            return;
        }

        // Add some "thinking" delay for better UX
        pickBtn.disabled = true;
        const btnText = pickBtn.querySelector('.btn-text');
        btnText.textContent = '挑選中...';

        resultSection.classList.add('hidden');

        setTimeout(() => {
            resultDisplay.innerText = result;
            resultSection.classList.remove('hidden');

            // Scroll to result on mobile
            resultSection.scrollIntoView({ behavior: 'smooth', block: 'center' });

            pickBtn.disabled = false;
            btnText.textContent = '立即隨機抽選';
        }, 600);
    }

    pickBtn.addEventListener('click', showResult);

    retryBtn.addEventListener('click', showResult);

    clearBtn.addEventListener('click', () => {
        if (confirm('確定要清空所有項目嗎？')) {
            itemsInput.value = '';
            resultSection.classList.add('hidden');
            localStorage.removeItem('random_picker_items');
        }
    });

    // Save content to local storage for convenience
    itemsInput.addEventListener('input', () => {
        localStorage.setItem('random_picker_items', itemsInput.value);
    });

    // Load saved content
    const savedItems = localStorage.getItem('random_picker_items');
    if (savedItems) {
        itemsInput.value = savedItems;
    }
});
