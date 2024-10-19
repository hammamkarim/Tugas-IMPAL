// Daftar untuk menyimpan pengaturan Auto TP
let autoTPList = [];
let currentAction = ''; // Menyimpan aksi saat ini

// Fungsi navigasi menu berdasarkan input
function navigatePage(currentPage) {
    const pilihan = document.getElementById('input-menu-utama').value;

    switch (pilihan) {
        case '1':
            showPage('transfer-pulsa');
            currentAction = 'transfer'; // Set aksi saat ini
            break;
        case '2':
            showPage('minta-pulsa');
            currentAction = 'minta'; // Set aksi saat ini
            break;
        case '3':
            showPage('auto-tp');
            currentAction = 'auto'; // Set aksi saat ini
            break;
        case '4':
            showPage('delete-auto-tp');
            break;
        case '5':
            showPage('list-auto-tp');
            displayAutoTPList();
            break;
        case '6':
            showPage('cek-kupon-tp');
            break;
        default:
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Pilihan tidak valid, silakan coba lagi.',
            });
    }
}

// Fungsi untuk memvalidasi nomor ponsel
function validatePhoneNumber(nomor) {
    const phoneRegex = /^[0-9]{10,15}$/; // Validasi nomor 10-15 digit
    return phoneRegex.test(nomor);
}

// Fungsi untuk memvalidasi jumlah pulsa
function validateJumlahPulsa(jumlah) {
    const jumlahRegex = /^[1-9][0-9]*$/; // Validasi jumlah pulsa minimal 1
    return jumlahRegex.test(jumlah);
}

// Fungsi untuk input nomor transfer pulsa
function inputNomorTransferPulsa() {
    const nomorPenerima = document.getElementById('nomor-penerima').value;

    if (nomorPenerima && validatePhoneNumber(nomorPenerima)) {
        showPage('konfirmasi-transfer');
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Peringatan',
            text: 'Harap masukkan nomor tujuan yang valid',
        });
    }
}

// Fungsi untuk mengonfirmasi transfer pulsa
function confirmTransferPulsa() {
    const jumlahPulsa = document.getElementById('jumlah-pulsa').value;

    if (validateJumlahPulsa(jumlahPulsa)) {
        Swal.fire({
            icon: 'success',
            title: 'Konfirmasi',
            text: `Anda yakin ingin mengirim pulsa Rp ${jumlahPulsa} ke nomor ${document.getElementById('nomor-penerima').value}?`,
            showCancelButton: true,
            confirmButtonText: 'Ya',
            cancelButtonText: 'Tidak',
        }).then((result) => {
            if (result.isConfirmed) {
                autoTPList.push({ nomor: document.getElementById('nomor-penerima').value, jumlah: jumlahPulsa });
                showSuccessMessage(`Pulsa ${jumlahPulsa} telah berhasil dikirim ke ${document.getElementById('nomor-penerima').value}.`);
            }
        });
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Peringatan',
            text: 'Harap masukkan jumlah pulsa yang valid',
        });
    }
}

// Fungsi untuk input nomor minta pulsa
function inputNomorMintaPulsa() {
    const nomorPengirim = document.getElementById('nomor-pengirim').value;

    if (nomorPengirim && validatePhoneNumber(nomorPengirim)) {
        showPage('konfirmasi-minta-pulsa');
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Peringatan',
            text: 'Harap masukkan nomor pengirim yang valid',
        });
    }
}

// Fungsi untuk mengonfirmasi minta pulsa
function confirmMintaPulsa() {
    const jumlahMintaPulsa = document.getElementById('jumlah-minta-pulsa').value;

    if (validateJumlahPulsa(jumlahMintaPulsa)) {
        Swal.fire({
            icon: 'success',
            title: 'Konfirmasi',
            text: `Anda yakin ingin meminta pulsa Rp ${jumlahMintaPulsa} dari nomor ${document.getElementById('nomor-pengirim').value}?`,
            showCancelButton: true,
            confirmButtonText: 'Ya',
            cancelButtonText: 'Tidak',
        }).then((result) => {
            if (result.isConfirmed) {
                showSuccessMessage(`Permintaan pulsa ${jumlahMintaPulsa} telah dikirim ke ${document.getElementById('nomor-pengirim').value}.`);
            }
        });
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Peringatan',
            text: 'Harap masukkan jumlah pulsa yang valid',
        });
    }
}

// Fungsi untuk input nomor Auto TP
function inputNomorAutoTP() {
    const nomorTujuan = document.getElementById('auto-tp-nomor').value;

    if (nomorTujuan && validatePhoneNumber(nomorTujuan)) {
        showPage('konfirmasi-auto-tp');
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Peringatan',
            text: 'Harap masukkan nomor tujuan yang valid',
        });
    }
}

// Fungsi untuk mengonfirmasi Auto TP
function confirmAutoTP() {
    const jumlahPulsa = document.getElementById('auto-tp-jumlah').value;
    const frekuensi = document.getElementById('auto-tp-frekuensi').value;

    if (validateJumlahPulsa(jumlahPulsa)) {
        Swal.fire({
            icon: 'success',
            title: 'Konfirmasi',
            text: `Anda yakin ingin mengatur Auto TP sebesar ${jumlahPulsa} setiap ${frekuensi} ke nomor ${document.getElementById('auto-tp-nomor').value}?`,
            showCancelButton: true,
            cancelButtonText: 'Tidak',
            confirmButtonText: 'Ya',
        }).then((result) => {
            if (result.isConfirmed) {
                autoTPList.push({ nomor: document.getElementById('auto-tp-nomor').value, jumlah: jumlahPulsa, frekuensi });
                showSuccessMessage(`Auto TP sebesar ${jumlahPulsa} telah berhasil diatur untuk ${frekuensi} ke ${document.getElementById('auto-tp-nomor').value}.`);
            }
        });
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Peringatan',
            text: 'Harap masukkan jumlah pulsa yang valid',
        });
    }
}

// Fungsi untuk menampilkan daftar Auto TP
function displayAutoTPList() {
    const listContainer = document.getElementById('auto-tp-list');
    listContainer.innerHTML = ''; // Clear the list

    autoTPList.forEach(autoTP => {
        const listItem = document.createElement('li');
        listItem.textContent = `Nomor: ${autoTP.nomor}, Jumlah: ${autoTP.jumlah}, Frekuensi: ${autoTP.frekuensi}`;
        listContainer.appendChild(listItem);
    });
}

// Fungsi untuk menghapus Auto TP
function confirmDeleteAutoTP() {
    const nomorTujuan = document.getElementById('delete-auto-tp-nomor').value;

    if (nomorTujuan && validatePhoneNumber(nomorTujuan)) {
        autoTPList = autoTPList.filter(autoTP => autoTP.nomor !== nomorTujuan);
        Swal.fire({
            icon: 'success',
            title: 'Berhasil',
            text: `Auto TP untuk nomor ${nomorTujuan} telah dihapus.`,
        });
        backToMenu();
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Peringatan',
            text: 'Harap masukkan nomor tujuan yang valid',
        });
    }
}

// Fungsi untuk menampilkan pesan sukses
function showSuccessMessage(message) {
    document.getElementById('success-message').innerText = message;
    showPage('konfirmasi-sukses');
}

// Fungsi untuk menampilkan halaman tertentu
function showPage(pageId) {
    const pages = document.querySelectorAll('.ussd-container');
    pages.forEach(page => {
        page.style.display = 'none'; // Sembunyikan semua halaman
    });
    document.getElementById(pageId).style.display = 'block'; // Tampilkan halaman yang diminta
}

// Fungsi untuk kembali ke menu utama
function backToMenu() {
    showPage('menu-utama');
    document.getElementById('input-menu-utama').value = ''; // Reset input
    document.getElementById('nomor-penerima').value = ''; // Reset input
    document.getElementById('jumlah-pulsa').value = ''; // Reset input
    document.getElementById('nomor-pengirim').value = ''; // Reset input
    document.getElementById('jumlah-minta-pulsa').value = ''; // Reset input
    document.getElementById('auto-tp-nomor').value = ''; // Reset input
    document.getElementById('auto-tp-jumlah').value = ''; // Reset input
    document.getElementById('auto-tp-frekuensi').value = ''; // Reset input
    document.getElementById('delete-auto-tp-nomor').value = ''; // Reset input
    document.getElementById('success-message').innerText = ''; // Reset pesan sukses
}
