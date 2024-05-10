// Mengambil elemen form
const form = document.getElementById('buyerForm');

// Mengambil elemen input yang memerlukan validasi (memiliki tanda bintang)
const requiredInputs = document.querySelectorAll('[required]');

// Menambahkan event listener untuk form submission
form.addEventListener('submit', function(event) {
    // Mencegah form untuk melakukan pengiriman default
    event.preventDefault();

    // Validasi apakah semua input yang memerlukan validasi diisi
    let isValid = true;
    requiredInputs.forEach(function(input) {
        if (!input.value.trim()) {
            isValid = false;
            // Membuat popup untuk menampilkan pesan error
            const errorPopup = document.createElement('div');
            errorPopup.classList.add('error-popup');
            errorPopup.textContent = `Please fill in ${input.previousElementSibling.textContent.replace('*', '')}`;
            document.body.appendChild(errorPopup);
            // Menghilangkan popup setelah beberapa detik
            setTimeout(() => {
                errorPopup.remove();
            }, 3000);
        }
    });

    // Jika semua input yang memerlukan validasi diisi, tampilkan konfirmasi
    if (isValid) {
        // Membuat popup untuk menampilkan konfirmasi
        const confirmPopup = document.createElement('div');
        confirmPopup.classList.add('confirm-popup');
        const confirmText = document.createElement('p');
        confirmText.textContent = 'Are you sure you want to proceed?';
        const confirmButtons = document.createElement('div');
        confirmButtons.classList.add('confirm-buttons');
        const yesButton = document.createElement('button');
        yesButton.textContent = 'Yes';
        yesButton.addEventListener('click', function() {
            // Jika pengguna mengonfirmasi, tampilkan seluruh isian dari pengguna dalam carousel
            const carouselContainer = document.getElementById('carousel-container');
            carouselContainer.innerHTML = ''; // Bersihkan konten sebelumnya

            const formData = new FormData(form);
            const carouselWrapper = document.createElement('div');
            carouselWrapper.classList.add('swiper-container');

            const carouselSlides = document.createElement('div');
            carouselSlides.classList.add('swiper-wrapper');

            for (const [key, value] of formData.entries()) {
                const slide = document.createElement('div');
                slide.classList.add('swiper-slide');
                slide.textContent = `${key}: ${value}`;
                carouselSlides.appendChild(slide);
            }

            carouselWrapper.appendChild(carouselSlides);
            carouselContainer.appendChild(carouselWrapper);

            // Inisialisasi Swiper
            const swiper = new Swiper(carouselWrapper, {
                loop: true,
                autoplay: {
                    delay: 5000, // Setel delay sesuai kebutuhan Anda
                },
            });

            // Menghilangkan popup konfirmasi setelah menampilkan carousel
            confirmPopup.remove();
        });
        const noButton = document.createElement('button');
        noButton.textContent = 'No';
        noButton.addEventListener('click', function() {
            // Jika pengguna membatalkan, cukup hilangkan popup konfirmasi
            confirmPopup.remove();
        });
        confirmButtons.appendChild(yesButton);
        confirmButtons.appendChild(noButton);
        confirmPopup.appendChild(confirmText);
        confirmPopup.appendChild(confirmButtons);
        document.body.appendChild(confirmPopup);
    }
});
