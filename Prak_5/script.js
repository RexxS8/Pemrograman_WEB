$(document).ready(function() {
    // Event listener untuk tombol "Get Started"
    $('#getStartedButton').click(function() {
        // Sembunyikan elemen dengan id "hero-image"
        $('#hero-image').hide();
        // Tampilkan elemen dengan id "implementasiInfo"
        $('#implementasiInfo').show();
        // Tampilkan elemen h2 "Informasi Implementasi"
        $('#implementasiInfo h2').show();
    });

    // Event listener untuk tombol "Submit Informasi Implementasi"
    $('#submitImplementationInfo').click(function() {
        // Mengambil nilai dari setiap elemen input
        const projectName = $('#Project').val();
        const hardware = $('#Hardware').val();  
        const stakeholder = $('#Stakeholder').val();
        const activity = $('#Activity').val();
        const date = $('#Date').val();
        const status = $('#Status').val();
        const notes = $('#Notes').val();

        // Periksa apakah semua input telah diisi
        if (projectName && hardware && stakeholder && activity && date && status && notes) {
            // Menambahkan baris ke dalam tabel implementasi
            const newRow = `
                <tr>
                    <td>${projectName}</td>
                    <td>${hardware}</td>
                    <td>${stakeholder}</td>
                    <td>${activity}</td>
                    <td>${date}</td>
                    <td>${status}</td>
                    <td>${notes}</td>
                    <td>
                        <button class="updateBtn">Update</button>
                        <button class="deleteBtn">Delete</button>
                    </td>
                </tr>
            `;

            $('#implementationTableBody').append(newRow);

            // Tampilkan tabel setelah data dimasukkan
            $('.table-wrapper').show();
            
            // Menyimpan proyek ke dalam localStorage
            saveProject(projectName, hardware, stakeholder, activity, date, status, notes);
        } else {
            alert('Harap isi semua informasi implementasi terlebih dahulu.');
        }
    });

    // Event listener untuk tombol "Delete" di setiap baris tabel
    $('#implementationTableBody').on('click', '.deleteBtn', function() {
        // Hapus baris tempat tombol "Delete" ditekan
        $(this).closest('tr').remove();
        // Menghapus proyek dari localStorage dan memperbarui tabel
        var index = $(this).closest('tr').index() - 1;
        deleteProject(index);
    });

    // Fungsi untuk memuat proyek dari 'localStorage' dan menampilkan ke dalam tabel
    function loadProjects() {
        let projects = localStorage.getItem('projects') ? JSON.parse(localStorage.getItem('projects')) : [];
        const table = document.getElementById("implementationTable");
        while (table.rows.length > 1) {
            table.deleteRow(1);
        }
        projects.forEach((project, index) => {
            var row = table.insertRow();
            row.insertCell().innerHTML = project.projectName;
            row.insertCell().innerHTML = project.hardware;
            row.insertCell().innerHTML = project.stakeholder;
            row.insertCell().innerHTML = project.activity;
            row.insertCell().innerHTML = project.date;
            row.insertCell().innerHTML = project.status;
            row.insertCell().innerHTML = project.notes;
            var actionCell = row.insertCell();
            var deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = function() {
                deleteProject(index);
            };
            actionCell.appendChild(deleteButton);
        });
    }

    // Fungsi untuk menyimpan proyek ke dalam 'localStorage'
    function saveProject(projectName, hardware, stakeholder, activity, date, status, notes) {
        let projects = localStorage.getItem('projects') ? JSON.parse(localStorage.getItem('projects')) : [];
        projects.push({ projectName, hardware, stakeholder, activity, date, status, notes });
        localStorage.setItem('projects', JSON.stringify(projects)); // Menyimpan proyek ke dalam localStorage
        loadProjects(); // Memperbarui tabel
    }

    // Fungsi untuk menghapus proyek dari localStorage dan memperbarui tabel
    function deleteProject(index) {
        let projects = localStorage.getItem('projects') ? JSON.parse(localStorage.getItem('projects')) : [];
        projects.splice(index, 1);
        localStorage.setItem('projects', JSON.stringify(projects));
        loadProjects(); // Memperbarui tabel
    }

    // Memuat proyek saat dokumen siap
    loadProjects();

    // Event listener for the search button
    $('#searchButton').click(function() {
        searchProject();
    });

    // Fungsi mencari project
    function searchProject() {
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("searchInput");
        filter = input.value.toUpperCase();
        table = document.getElementById("implementationTable");
        tr = table.getElementsByTagName("tr");

        // Loop through all table rows, and hide those who don't match the search query
        for (i = 1; i < tr.length; i++) { // Dimulai dari i = 1 agar baris header tidak terpengaruh
            td = tr[i].getElementsByTagName("td");
            var rowMatch = false; // Flag untuk menunjukkan apakah baris cocok dengan kriteria pencarian
            for (var j = 0; j < td.length; j++) {
                if (td[j]) {
                    txtValue = td[j].textContent || td[j].innerText;
                    if (txtValue.toUpperCase().indexOf(filter) > -1) {
                        rowMatch = true; // Set flag rowMatch menjadi true jika ada kecocokan dalam baris
                        break;
                    }
                }
            }
            // Menampilkan atau menyembunyikan baris berdasarkan flag rowMatch
            tr[i].style.display = rowMatch ? "" : "none";
        }

        // Menampilkan pesan jika tidak ada proyek yang cocok dengan kriteria pencarian
        var noResultRow = document.getElementById("noResultRow");
        if (tr.length === 1) { // Jika hanya ada satu baris (header) di tabel
            if (noResultRow) noResultRow.style.display = "none"; // Sembunyikan pesan jika ada
        } else {
            var found = false;
            // Periksa apakah ada baris yang ditampilkan (menunjukkan ada kecocokan)
            for (i = 1; i < tr.length; i++) {
                if (tr[i].style.display !== 'none') {
                    found = true;
                    break;
                }
            }
            if (!found) {
                // Tampilkan pesan "No project found" jika tidak ada baris yang ditampilkan
                if (noResultRow) noResultRow.style.display = "";
            }
        }
    }    
});