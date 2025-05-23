 const alternatifMakanan = [
      { nama: "Pisang", gambar: "https://res.cloudinary.com/dk0z4ums3/image/upload/v1627458125/attached_image/sehat-tiap-hari-berkat-manfaat-pisang.jpg" },
      { nama: "Oatmeal kering", gambar: "https://akcdn.detik.net.id/visual/2021/05/20/oat_43.jpeg?w=360&q=90" },
      { nama: "Dada ayam panggang", gambar: "https://akcdn.detik.net.id/visual/2019/08/13/ec4b1da1-1eb0-4f34-8afa-3d39899654a5_169.jpeg?w=1200" },
      { nama: "Telur rebus", gambar: "https://static.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/p2/214/2024/09/04/5-3421928526.jpg" },
      { nama: "Greek yoghurt plain (whole milk)", gambar: "https://m.media-amazon.com/images/I/71u46+Gkz1L._AC_UF894,1000_QL80_.jpg" },
      { nama: "Roti gandum dengan selai kacang", gambar: "https://img.okezone.com/content/2017/05/02/481/1681004/roti-gandum-olesan-selai-kacang-camilan-ringan-untuk-melawan-kanker-0ycMK6ImSu.jpg" },
      { nama: "Oatmeal dengan madu dan buah kering", gambar: "https://static.sscontent.com/thumb/500/500/products/124/v1287944_prozis_2-x-oat-porridge-quick-1-minute-500-g_6.webp" },
      { nama: "Nasi merah dengan dada ayam dan sayuran", gambar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB6j-e7sfWXGV_czpsO4325yNhVq49pQTtV0zYr5d6q4z2cU-nW4fSqxUh-sj6_Q1hLJk&usqp=CAU" },
      { nama: "Telur orak-arik dengan keju dan roti gandum", gambar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe8N09L4ULj_joUkB_jeiMOnVZO9Kv1uiW1g&s" },
      { nama: "Susu full cream atau susu mass gainer", gambar: "https://img.id.my-best.com/product_images/3ea0bf0a19a0f65736058250e6ad6587.png?ixlib=rails-4.3.1&q=70&lossless=0&w=800&h=800&fit=clip&s=954dd2e466b754952096255cc8a85e01" },
      { nama: "Roti gandum dengan telur rebus", gambar: "https://media.istockphoto.com/id/477082123/id/foto/telur-rebus-pada-roti-gandum-gandum-panggang.jpg?s=1024x1024&w=is&k=20&c=Sb_9RqkmLHXvYo9KKm4mew1fMstBjko7skEjDBpe-_E=" },
      { nama: "Oatmeal dengan buah segar", gambar: "https://assets.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/2023/04/17/oatmeal-buah-3133597622.jpg" },
      { nama: "Nasi merah dengan tempe dan sayuran", gambar: "https://pbs.twimg.com/media/Ew0VBxTVkAkEZpu.jpg:large" },
      { nama: "Salad ayam dengan minyak zaitun", gambar: "https://img-global.cpcdn.com/recipes/a5b4d09cce86027c/1200x630cq70/photo.jpg" }
    ];

    const kriteria = ["Protein", "Karbohidrat", "Lemak", "Serat", "Kemudahan Mencari"];

    function getBobot(fase, tipe) {
      if (fase === 'pre' && tipe === 'bulking') {
        return [5, 4, 3, 2, 2];
      } else if (fase === 'post' && tipe === 'bulking') {
        return [5, 3, 2, 3, 2];
      } else if (fase === 'pre' && tipe === 'cutting') {
        return [4, 2, 2, 5, 2];
      } else if (fase === 'post' && tipe === 'cutting') {
        return [5, 2, 1, 4, 3];
      } else if (tipe === 'maintenance') {
        return [3, 3, 3, 3, 3];
      } else {
        return [3, 3, 3, 3, 3];
      }
    }

    const nilaiAlternatif = [
      [1.00, 2.28, 1.00, 2.30, 5],
      [2.39, 4.68, 1.98, 5.00, 5],
      [5.00, 1.00, 2.10, 1.00, 5],
      [2.60, 1.06, 2.53, 1.00, 4],
      [2.11, 1.22, 1.70, 1.00, 5],
      [3.04, 2.86, 5.00, 3.75, 4],
      [1.77, 5.00, 1.50, 3.65, 4],
      [2.67, 1.84, 1.40, 2.00, 5],
      [2.81, 2.11, 2.44, 2.25, 4],
      [4.14, 4.70, 1.47, 1.00, 3],
      [2.53, 2.67, 1.70, 2.50, 5],
      [2.97, 4.34, 1.55, 3.50, 3],
      [2.25, 2.39, 1.70, 3.00, 5],
      [2.88, 1.41, 1.68, 2.00, 3]
    ];

    function normalisasi(data) {
      const transposed = kriteria.map((_, colIndex) => data.map(row => row[colIndex]));
      const maxValues = transposed.map(col => Math.max(...col));
      return data.map(row => row.map((val, i) => val / maxValues[i]));
    }

    function hitungSMART(normalized, weights) {
      return normalized.map(row => row.reduce((sum, val, i) => sum + val * weights[i], 0));
    }

    // Untuk radar chart, kita ingin data per kriteria tiap alternatif, tapi juga kita butuh menampilkan radar chart untuk makanan terbaik saja supaya tidak terlalu padat.

    function tampilkanHasil() {
      const fase = $('#fase').val();
      const tipe = $('#tipe').val();
      const bobot = getBobot(fase, tipe);
      const normalized = normalisasi(nilaiAlternatif);
      const skor = hitungSMART(normalized, bobot);

      // Gabungkan nama dan skor
      const hasil = alternatifMakanan.map((item, idx) => ({
        ...item,
        skor: skor[idx].toFixed(3),
        nilai: nilaiAlternatif[idx],
        nilaiNormal: normalized[idx]
      }));

      // Urutkan descending
      hasil.sort((a, b) => b.skor - a.skor);

      // Tampilkan card hasil
      let html = `<h2 class="text-xl font-semibold text-green-700 mb-4">Hasil Perhitungan dan Peringkat</h2>`;
      html += `<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">`;
      hasil.forEach((item, index) => {
        html += `
          <div class="bg-white rounded-lg shadow-md p-4 card-hover flex flex-col">
            <img src="${item.gambar}" alt="${item.nama}" class="h-40 object-cover rounded-md mb-3" />
            <h3 class="text-lg font-bold text-gray-800 mb-1">${index + 1}. ${item.nama}</h3>
            <p class="text-green-700 font-semibold mb-1">Skor: ${item.skor}</p>
            <p class="text-sm text-gray-600 flex-grow">Peringkat #${index + 1} dari 14 alternatif.</p>
          </div>`;
      });
      html += `</div>`;

      $('#hasil').html(html);

      // Radar chart untuk 3 alternatif terbaik saja (untuk memperjelas perbandingan)
      const top3 = hasil.slice(0, 3);

      if (top3.length === 0) {
  console.warn('Tidak ada data untuk ditampilkan di radar chart.');
  return;
}


      const radarLabels = kriteria;
      const radarDatasets = top3.map(item => ({
        label: `${item.nama} (Skor: ${item.skor})`,
        data: item.nilaiNormal,
        fill: true,
        backgroundColor: `rgba(${Math.floor(Math.random()*150+50)}, ${Math.floor(Math.random()*150+50)}, ${Math.floor(Math.random()*150+50)}, 0.3)`,
        borderColor: `rgba(${Math.floor(Math.random()*150+50)}, ${Math.floor(Math.random()*150+50)}, ${Math.floor(Math.random()*150+50)}, 1)`,
        pointBackgroundColor: 'white',
        pointBorderColor: 'rgba(0,0,0,0.5)',
        pointHoverBackgroundColor: 'rgba(0,0,0,0.8)',
        pointHoverBorderColor: 'white',
      }));

      if (window.chartInstance) {
        window.chartInstance.destroy();
      }

      const ctx = document.getElementById('chartCanvas').getContext('2d');
      window.chartInstance = new Chart(ctx, {
        type: 'radar',
        data: {
          labels: radarLabels,
          datasets: radarDatasets
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'top' },
            title: {
              display: true,
              text: 'Perbandingan 3 Alternatif Terbaik Berdasarkan Kriteria'
            }
          },
          scales: {
            r: {
              angleLines: { display: true },
              suggestedMin: 0,
              suggestedMax: 1,
              ticks: { stepSize: 0.2 }
            }
          }
        }
      });
    }

    $(document).ready(() => {
      $('#inputForm').submit((e) => {
        e.preventDefault();
        tampilkanHasil();
      });

      $('#resetButton').click(() => {
        $('#fase').val('pre');
        $('#tipe').val('cutting');
        $('#hasil').html('');
        if (window.chartInstance) {
          window.chartInstance.destroy();
        }
      });
    });
