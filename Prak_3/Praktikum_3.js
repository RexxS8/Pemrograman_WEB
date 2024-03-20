document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('registrationForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Mencegah form dari mengirim data secara default

        // Mendefinisikan array input yang akan divalidasi
        const inputs = [
            document.getElementById('name'),
            document.getElementById('email'),
            document.getElementById('password'),
            document.getElementById('confirmPassword'), // Menambahkan input untuk konfirmasi kata sandi
            document.getElementById('birthDate') // Menambahkan input untuk tanggal lahir
        ];

        let isValid = true; // Flag untuk menandai validasi

        // Loop melalui setiap input untuk cek kekosongan dan validitas kata sandi
        for (let input of inputs) {
            if (input.value.trim() === "") { 
                input.style.borderColor = 'red'; // Ubah border jadi merah jika kosong
                isValid = false; // Update flag validasi
                alert(`Isian kolom ${input.name} tidak boleh kosong`); // Tampilkan alert sesuai input yang kosong
                break; // Keluar dari loop jika sudah menemukan input kosong
            } else {
                input.style.borderColor = ''; // Reset border jika input terisi
            }

            if (input.id === 'password' && input.value.length < 8) { // Validasi panjang kata sandi
                input.style.borderColor = 'red'; // Ubah border jadi merah jika kurang dari 8 karakter
                isValid = false; // Update flag validasi
                alert('Kata sandi harus memiliki minimal 8 karakter'); // Tampilkan pesan error
                break; // Keluar dari loop jika ada kesalahan
            }

            if (input.id === 'confirmPassword') { // Validasi konfirmasi kata sandi
                const password = document.getElementById('password').value;
                const confirmPassword = input.value;
                if (password !== confirmPassword) { // Jika kata sandi tidak cocok
                    input.style.borderColor = 'red'; // Ubah border jadi merah
                    isValid = false; // Update flag validasi
                    alert('Konfirmasi kata sandi tidak cocok'); // Tampilkan pesan error
                    break; // Keluar dari loop jika ada kesalahan
                }
            }
        }

        if (isValid) {
            // Jika semua input terisi form bisa di submit atau melakukan aksi selanjutnya
            alert("Registrasi berhasil");
            // this.submit(); // Aktifkan ini untuk submit form jika sudah valid
        }
    });
});
