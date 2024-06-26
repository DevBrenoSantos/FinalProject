import type Empresa from "../models/empresa";
import db from "../database/connection";
import log from "../utils/log";



const empresaDao = {
  get: (id: number) => {
    return db.query<Empresa, [number]>("SELECT * FROM empresa WHERE id = ?1").get(id);
  },
  getAll: () => {
    return db.query<Empresa, []>("SELECT * FROM empresa").all();
  },
  insert: (empresa: Empresa): boolean => {
    try {
      db.query<Empresa, [string, string, string, string]>(
        "INSERT INTO empresa (nome, cnpj, email, senha) VALUES (?1, ?2, ?3, ?4)"
      ).run(empresa.nome, empresa.cnpj, empresa.email, empresa.senha);
    } catch (e) {
      log("[Database]: Erro ao inserir empresa - " + e);
      return false;
    }
    log("[Database]: Empresa inserida com sucesso");
    return true;
  },
  update: (empresa: Empresa) => {
    db.query<Empresa, [string, string, string, string, number]>(
      "UPDATE empresa SET nome = ?1, cnpj = ?2, email = ?3, senha = ?4 WHERE id = ?5"
    ).run(empresa.nome, empresa.cnpj, empresa.email, empresa.senha, empresa.id);
  },
  delete: (id: number) => {
    db.query<Empresa, [number]>("DELETE FROM empresa WHERE id = ?1").run(id);
  },
  getByEmail: (email: string) => {
    return db.query<Empresa, [string]>("SELECT * FROM empresa WHERE email = ?1").get(email);
  },
  getByCnpj: (cnpj: string) => {
    return db.query<Empresa, [string]>("SELECT * FROM empresa WHERE cnpj = ?1").get(cnpj);
  },
  getByEmailSenha: (email: string, senha: string) => {
    return db.query<Empresa, [string, string]>("SELECT * FROM empresa WHERE email = ?1 AND senha = ?2").get(email, senha);
  },
  cadastrar: (nome: string, cnpj: string, email: string, senha: string) => {
    db.query<Empresa, [string, string, string, string]>(
      "INSERT INTO empresa (nome, cnpj, email, senha) VALUES (?1, ?2, ?3, ?4)"
    ).run(nome, cnpj, email, senha);
  }
}

export default empresaDao;