const xml = new XMLHttpRequest();
const url = './transactions.json';

xml.open('GET', url, true)
xml.send();
xml.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    let data = JSON.parse(this.responseText);
    createRows(data);
  }
};
const tableHeader = 
  `<thead>
    <tr>
      <th scope="col"></th>
      <th scope="col">Name</th>
      <th scope="col">Total Transactions</th>
      <th scope="col">Total Volume</th>
      <th scope="col">24h Volume</th>
      <th scope="col">Volume by Currency</th>
      <th scope="col">Notes</th>
    </tr>
  </thead>`;

function createRows(array) {
  let htmlRows = array.map((item) => {
    return `<tr class='Number'><td>${item.Number}</td><td class="Name">${item.Name}</td><td class="totalTransactions">${(item[`Total Transactions`]).toLocaleString()}</td></tr>`
  })
  document.getElementById('mainTable').innerHTML = tableHeader + htmlRows.join('')
}