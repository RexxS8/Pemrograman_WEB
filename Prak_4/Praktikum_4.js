$(document).ready(function() {
    // Event listener untuk tombol "Submit Informasi Implementasi"
    $('#submitImplementationInfo').click(function() {
        // Get current date and time
        const now = new Date();
        const lastUpdatedTime = now.toLocaleString(); // Format time
       
        // Update nilai waktu terakhir pada elemen yang sesuai
        $('#displayLastUpdated').val(lastUpdatedTime);
    });

    $('#registrationForm').submit(function(event) {
        event.preventDefault(); // Prevent the form from submitting via the browser.

        // Get current date and time
        const now = new Date();
        const dateTimeString = now.toLocaleString();

        // Informasi implementasi
        const implementasiInfo = {
            hardwareDescription: $('#hardwareDescription').val(),
            partiesInvolved: $('#partiesInvolved').val(),
            activityDescription: $('#activityDescription').val(),
            startDate: $('#startDate').val(),
            endDate: $('#endDate').val(),
            implementationStatus: $('#implementationStatus').val(),
            notes: $('#finalNotes').val(),
            recordTime: dateTimeString,
            lastUpdated: "" // Waktu update informasi terakhir (kosongkan terlebih dahulu)
        };

        let isValid = true; // Flag for validation state.
        const password = $('#password').val().trim();
        const confirmPassword = $('#confirmPassword').val().trim();

        // Define array of inputs to validate.
        const inputs = ['#name', '#email', '#password', '#confirmPassword'];

        // Loop through inputs for validation.
        inputs.forEach(function(input) {
            const $input = $(input);
            if ($input.val().trim() === "") {
                $input.css('borderColor', 'red'); // Change border to red if empty.
                alert('Isian kolom ${input.name} tidak boleh kosong');                isValid = false; // Update validation flag.
                return false; // Break out of the loop.
            } else {
                $input.css('borderColor', ''); // Reset border if input is filled.
            }
        });

        // Validate password length
        if (password.length < 6) {
            $('#password').css('borderColor', 'red');
            alert('Kata Sandi harus memiliki minimal 6 karakter.');
            isValid = false;
        }

        // Validate password and confirm password
        if (password !== confirmPassword) {
            $('#confirmPassword').css('borderColor', 'red');
            alert('Kata Sandi dan Konfirmasi Kata Sandi harus sama.');
            isValid = false;
        }

        if (isValid) {
            implementasiInfo.lastUpdated = now.toLocaleString(); // Set last update time
            implementasiInfo.recordTime = dateTimeString; // Set record time
        
            // Menampilkan waktu update informasi terakhir
            $('#displayLastUpdated').val(implementasiInfo.lastUpdated);
        
            // Additional actions here, e.g., sending data to server, etc.
        
            // Menampilkan informasi implementasi
            $('#displayHardwareDescription').text(implementasiInfo.hardwareDescription);
            $('#displayPartiesInvolved').text(implementasiInfo.partiesInvolved);
            $('#displayActivityDescription').text(implementasiInfo.activityDescription);
            $('#displayStartDate').val(implementasiInfo.startDate);
            $('#displayEndDate').val(implementasiInfo.endDate);
            $('#displayImplementationStatus').val(implementasiInfo.implementationStatus);
            $('#displayFinalNotes').text(implementasiInfo.notes);
            $('#displayRecordTime').val(implementasiInfo.recordTime); // Menampilkan waktu perekaman
        
            // Menampilkan informasi implementasi setelah tombol "Daftar" diklik
            $('#implementasiInfo').show();
        
            // Menyembunyikan formulir setelah tombol "Daftar" diklik
            $('#registrationForm').hide();
        
            alert("Pendaftaran berhasil!");
        
            // Uncomment the next line to actually submit the form.
            // this.submit(); // Submit form if all inputs are valid.
        }
        
        
    });
});