window.onload = () => {
  
  const option =  [
    'technology',
    'football',
    'microsoft',
    'apple',
    'car',
    'motorcycle',
    'war',
    'business'
  ];
  
  const content = document.querySelector('.content');
  const value = option[Math.floor(Math.random() * option.length)];
  
  async function loadData(value) {
    try {
      // dapatkan data
      const data = await getData(value);
      // tampilkan data
      updateUI(data);
    } catch (error) {
      // tampilkan pesan error
      content.innerHTML = showError(error.message);
    }
  }
  
  loadData(value);
  
  function getData(value) {
    return fetch(`https://newsapi.org/v2/everything?q=${value}&apiKey=ffabde9d16a749c0b251a1bb8f343d15`)
      .then(response => {
        // jika "response.ok" bertuliskan boolean false, maka tampilkan teks status
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .then(response => {
        // jika jumlah artikel hanya berisi 0, maka tampilkan pesan "not found"
        if (response.articles.length == 0) throw new Error('Not Found');
        return response.articles;
      })
      .catch(error => {
        // jika mengalami error saat mengambil data 
        throw new Error(error);
      });
  }
  
  function updateUI(param) {
    // kosongkan isi element "content"
    content.innerHTML = '';
    // string kosong
    let str = '';
    // looping dan jalankan fungsi "showCard()"
    param.forEach(data => str += showCard(data));
    // tampilkan data ke element "content"
    content.insertAdjacentHTML('beforeend', str);
  }
  
  function showCard(data) {
    return `
    <div class="col-md-6">
      <div class="card my-2">
        <img src="${data.urlToImage}" alt="image" class="card-img-top">
        <div class="card-body">
          <h3 class="fw-normal">${data.title}</h3>
          <p class="fw-light mb-3">${data.description}</p>
          <a href="${data.url}" target="_blank" class="btn btn-primary rounded-1">read more</a>
        </div>
      </div>
    </div>
    `;
  }
  
  function showError(message) {
    return `
    <div class="col-md-6 mx-auto">
      <div class="alert alert-danger" role="alert">
        <h1 class="fw-normal mb-3">Alert</h1>
        <p class="fw-light my-auto">${message}</p>
      </div>
    </div>
    `;
  }
  
  const button = document.querySelectorAll('.button');
  button.forEach(btn => {
    btn.addEventListener('click', function() {
      // hapus class "active" pada semua tombol
      button.forEach(btn => btn.classList.remove('active'));
      // tambahkan class "active" pada tombol yang ditekan
      this.classList.add('active');
      // jalankan fungsi "filterData()"
      filterData(this);
    });
  });
  
  function filterData(param) {
    // teks pada tombol
    const value = param.textContent.trim().toLowerCase();
    // load atau dapatkan data berdasarkan isi variabel "value"
    loadData(value);
  }
  
  // input pencarian data atau artikel
  const searchInput = document.querySelector('.search-input');
  const btnSearch = document.querySelector('.btn-search');
  btnSearch.addEventListener('click', () => {
    // hapus class "active" pada semua tombol
    button.forEach(btn => btn.classList.remove('active'));
    // value input pencarian
    const value = searchInput.value.trim().toLowerCase();
    // load atau dapatkan data berdasarkan isi variabel "value"
    loadData(value);
    // hapus value input
    searchInput.value = '';
  });
  
}