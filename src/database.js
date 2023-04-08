import fs from 'node:fs/promises';
import { URL } from 'node:url';

const databasePath = new URL('../db.json', import.meta.url);
export class Database {
  #database = {};

  constructor() {
    fs.readFile(databasePath, 'utf8')
      .then((data) => {
        this.#database = JSON.parse(data);
      })
      .catch(() => {
        this.#persiste();
      });
  }

  #persiste() {
    fs.writeFile(databasePath, JSON.stringify(this.#database));
  }

  select(tabela, search) {
    let data = this.#database[tabela] ?? [];

    if (search) {
      data = data.filter((row) => {
        return Object.entries(search).some(([key, value]) => {
          return row[key].toLowerCase().includes(value.toLowerCase());
        });
      });
    }

    return data;
  }

  insert(tabela, dados) {
    if (Array.isArray(this.#database[tabela])) {
      this.#database[tabela].push(dados);
    } else {
      this.#database[tabela] = [dados];
    }
    this.#persiste();

    return dados;
  }

  delete(table, id) {
    const indexItem = this.#database[table].findIndex((row) => row.id === id);

    if (indexItem > -1) {
      this.#database[table].splice(indexItem, 1);
      this.#persiste();
    }

    return true;
  }

  update(table, id, dados) {
    const indexItem = this.#database[table].findIndex((row) => row.id === id);

    if (indexItem > -1) {
      this.#database[table][indexItem] = {
        ...this.#database[table][indexItem],
        ...dados,
      };
    }
  }
}
