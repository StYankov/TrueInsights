import * as XLSX from 'xlsx';

export const parseCSV = str => {
  var arr = [];
  var quote = false; // 'true' means we're inside a quoted field

  // Iterate over each character, keep track of current row and column (of the returned array)
  for (var row = 0, col = 0, c = 0; c < str.length; c++) {
    var cc = str[c],
      nc = str[c + 1]; // Current character, next character
    arr[row] = arr[row] || []; // Create a new row if necessary
    arr[row][col] = arr[row][col] || ""; // Create a new column (start with empty string) if necessary

    // If the current character is a quotation mark, and we're inside a
    // quoted field, and the next character is also a quotation mark,
    // add a quotation mark to the current column and skip the next character
    if (cc == '"' && quote && nc == '"') {
      arr[row][col] += cc;
      ++c;
      continue;
    }

    // If it's just one quotation mark, begin/end quoted field
    if (cc == '"') {
      quote = !quote;
      continue;
    }

    // If it's a comma and we're not in a quoted field, move on to the next column
    if (cc == "," && !quote) {
      ++col;
      continue;
    }

    // If it's a newline (CRLF) and we're not in a quoted field, skip the next character
    // and move on to the next row and move to column 0 of that new row
    if (cc == "\r" && nc == "\n" && !quote) {
      ++row;
      col = 0;
      ++c;
      continue;
    }

    // If it's a newline (LF or CR) and we're not in a quoted field,
    // move on to the next row and move to column 0 of that new row
    if (cc == "\n" && !quote) {
      ++row;
      col = 0;
      continue;
    }
    if (cc == "\r" && !quote) {
      ++row;
      col = 0;
      continue;
    }

    // Otherwise, append the current character to the current column
    arr[row][col] += cc;
  }
  return arr;
};

export const getFileContents = async (file, type = 'text') =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;

    if(type === 'text')
      reader.readAsText(file);
    else
      reader.readAsBinaryString(file);
  });

export const parseXlsx = async file => {
  const binary = await getFileContents(file, 'binary');
  const workbook = XLSX.read(binary, {
    type: 'binary'
  });

  const sheet = workbook.SheetNames.length ? workbook.SheetNames[0] : null;

  if(!sheet)
    return [];

  var XL_row_object = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);

  return XL_row_object;
}

export const getFileType = filename => filename.split('.').pop();

export const extractUrls = (data, type, column) => {
  const result = [];

  if(data.length === 0)
    return result;

  if(type === 'xlsx') {
    for(const item of data)
      if(item[column])
        result.push(item[column]);
  }

  if(type === 'csv') {
    const columnIndex = data[0].indexOf(column);
    for(const item of data.slice(1))
      if(item[columnIndex])
        result.push(item[columnIndex]);
  }

  return result;
} 

export const parseUrls = urls => {
  const result = [];

  for(const url of urls) {
    const store = getStore(url);

    result.push({
      url: url,
      store: store,
      valid: store !== null
    });
  }

  return result;
}

export const getStore = url => {
  const map = {
    'tesco.com': 'tesco_uk',
    'auchan.fr': 'auchan_fr',
    'asda.com': 'asda_uk',
    'rewe.de': 'rewe_de',
    'amazon.de': 'amazon_de',
    'ozon.ru': 'ozon_ru',
    'wildberries.ru': 'wildberries_ru',
    'argos.co.uk': 'argos_uk',
    'amazon.co.uk': 'amazon_uk',
    'groceries.morrisons.com': 'morrisons_uk',
    'waitrose.com': 'waitrose_uk',
    'ocado.com': 'ocado_uk',
    'ah.nl': 'ah_nl',
    'delhaize.be': 'delhaize_nl',
    'jumbo.com': 'jumbo_nl',
    'naturasi.it': 'naturasi_it',
    'naturitas.es': 'naturitas_es',
    'nutritienda.com': 'nutritienda_es',
    'planetahuerto.es': 'planetahuerto_es',
    'plus.nl': 'plus_nl',
    'rossmann.de': 'rossmann_de',
    'dm.de': 'dm_de',
    'e.leclerc': 'leclerc_fr',
    'boots.com': 'boots_uk',
    'sainsburys.co.uk': 'sainsbury_uk',
    'lenovo.com': 'lenovo_de'
  }

  for(const key in map) {
    if(url.toLowerCase().indexOf(key) !== -1)
      return map[key];
  }

  return null;
}