
// Mendapatkan nilai dari textarea
const bahanTextarea = document.querySelector('textarea[name="bahan_resep"]');
const bahanList = document.getElementById('list-bahan');

// Memisahkan teks menjadi array per baris
const bahanArray = bahanTextarea.value.split('\n');

// Menampilkan setiap bahan dalam bentuk list item
bahanArray.forEach((bahan, index) => {
if (bahan.trim() !== '') {
    const listItem = document.createElement('li');
    listItem.textContent = `${index + 1}. ${bahan.trim()}`;
    bahanList.appendChild(listItem);
}
});