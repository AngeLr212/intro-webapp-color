document.addEventListener('DOMContentLoaded', () => {
    const redRange = document.getElementById('redRange');
    const greenRange = document.getElementById('greenRange');
    const blueRange = document.getElementById('blueRange');
    
    const redValue = document.getElementById('redValue');
    const greenValue = document.getElementById('greenValue');
    const blueValue = document.getElementById('blueValue');
    
    const colorPicker = document.getElementById('colorPicker');
    const colorBox = document.getElementById('colorBox');
    const hexCode = document.getElementById('hexCode');

    function updateColor() {
        const red = parseInt(redValue.value, 10);
        const green = parseInt(greenValue.value, 10);
        const blue = parseInt(blueValue.value, 10);

        const rgbColor = `rgb(${red}, ${green}, ${blue})`;
        const hexColor = rgbToHex(red, green, blue);

        colorBox.style.backgroundColor = rgbColor;
        hexCode.textContent = hexColor;
        colorPicker.value = hexColor;
    }

    function rgbToHex(r, g, b) {
        const toHex = (num) => {
            const hex = parseInt(num, 10).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
    }

    function syncRangeAndValue(range, valueInput) {
        range.addEventListener('input', () => {
            valueInput.value = range.value;
            updateColor();
        });
    }

    function syncValueAndRange(valueInput, range) {
        valueInput.addEventListener('input', () => {
            if (valueInput.value < 0) valueInput.value = 0;
            if (valueInput.value > 255) valueInput.value = 255;
            range.value = valueInput.value;
            updateColor();
        });
    }

    function syncColorPicker() {
        colorPicker.addEventListener('input', () => {
            const color = colorPicker.value;
            const { r, g, b } = hexToRgb(color);
            redValue.value = r;
            greenValue.value = g;
            blueValue.value = b;
            redRange.value = r;
            greenRange.value = g;
            blueRange.value = b;
            updateColor();
        });
    }

    function hexToRgb(hex) {
        let r = 0, g = 0, b = 0;
        // 3 digits
        if (hex.length === 4) {
            r = parseInt(hex[1] + hex[1], 16);
            g = parseInt(hex[2] + hex[2], 16);
            b = parseInt(hex[3] + hex[3], 16);
        }
        // 6 digits
        else if (hex.length === 7) {
            r = parseInt(hex[1] + hex[2], 16);
            g = parseInt(hex[3] + hex[4], 16);
            b = parseInt(hex[5] + hex[6], 16);
        }
        return { r, g, b };
    }

    syncRangeAndValue(redRange, redValue);
    syncRangeAndValue(greenRange, greenValue);
    syncRangeAndValue(blueRange, blueValue);

    syncValueAndRange(redValue, redRange);
    syncValueAndRange(greenValue, greenRange);
    syncValueAndRange(blueValue, blueRange);

    syncColorPicker();
});
