// Referensi elemen HTML
const form = document.getElementById('resi-form');
const input = document.getElementById('resi-input');
const errorMessage = document.getElementById('error-message');
const resiTable = document.getElementById('resi-table');
const dataTable = document.getElementById('data-table');

// Kode resi yang valid
const validResi = "paketultahacu";

// Data JSON resi
const fetchResiData = async () => {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error('Gagal mengambil data.');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
    }
};

// Event listener untuk form submit
form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Mencegah reload halaman

    const resi = input.value.trim(); // Mengambil input resi
    if (resi === validResi) {
        // Resi valid, tampilkan data tabel
        const resiData = await fetchResiData();

        // Bersihkan pesan error dan tampilkan tabel
        errorMessage.classList.add('hidden');
        resiTable.classList.remove('hidden');
        dataTable.innerHTML = ''; // Kosongkan data tabel sebelumnya

        // Masukkan data ke tabel
        resiData.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.Tanggal}</td>
                <td>${item.Keterangan}</td>
            `;
            dataTable.appendChild(row);
        });
    } else {
        // Resi tidak valid, tampilkan pesan error
        errorMessage.textContent = 'Resi tidak ada, silahkan tanyakan kepada pasangan anda mengenai resi yang tepat.';
        errorMessage.classList.remove('hidden');
        resiTable.classList.add('hidden'); // Sembunyikan tabel jika sebelumnya muncul
    }
});
