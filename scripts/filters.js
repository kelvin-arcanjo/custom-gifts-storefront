//Logic for the occasion gallery cards (Casamento/Aniversário/Pessoal/Personalizadas)...

document.addEventListener('DOMContentLoaded', () => {
    const galleryButtons = document.querySelectorAll('.gallery-personalizar-btn')
    const teamGalleryButtons = document.querySelectorAll('.gallery-team-btn')
    const modeRadios = document.querySelectorAll('input[name="mode"]')
    const productSelect = document.getElementById('product-select')
    const teamSelect = document.getElementById('team-select')
    const customSection = document.getElementById('customization-section')

    function switchToPersonalizado() {
        modeRadios.forEach(radio => {
            radio.checked = (radio.value.trim() === 'Personalizado')
        })
        const personalizadoRadio = document.querySelector('input[name="mode"][value="Personalizado"]')
        if (personalizadoRadio) personalizadoRadio.dispatchEvent(new Event('change'))
    }

    galleryButtons.forEach(button => {
        button.addEventListener('click', () => {
            switchToPersonalizado()
            if (productSelect) productSelect.disabled = true
            if (teamSelect) teamSelect.disabled = true
            if (customSection) customSection.scrollIntoView({ behavior: 'smooth', block: 'center' })
        })
    })

    teamGalleryButtons.forEach(button => {
        button.addEventListener('click', () => {
            switchToPersonalizado()
            if (productSelect) productSelect.disabled = true
            if (teamSelect) teamSelect.disabled = false   // keep Equipa usable
            if (customSection) customSection.scrollIntoView({ behavior: 'smooth', block: 'center' })
        })
    })
})