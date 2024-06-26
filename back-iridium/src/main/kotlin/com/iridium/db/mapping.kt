package com.iridium.db

import Disciplina
import Atividade
import Usuario
import kotlinx.coroutines.Dispatchers
import org.jetbrains.exposed.sql.Transaction
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.javatime.date

suspend fun <T> suspendTransaction(block: Transaction.() -> T): T =
    newSuspendedTransaction(Dispatchers.IO, statement = block)

////////////////// Usuário
object UsuarioTable : IntIdTable("usuario") {
    var nome = varchar("nome", 50)
    var email = varchar("email", 50)
    var senha = varchar("senha", 50)
}

class UsuarioDAO(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<UsuarioDAO>(UsuarioTable)
    var nome by UsuarioTable.nome
    var email by UsuarioTable.email
    var senha by UsuarioTable.senha
}

fun daoToModel(dao: UsuarioDAO) = Usuario(
    id = dao.id.value,
    dao.nome,
    dao.email,
    dao.senha,
)

////////////////// Disciplinas
object DisciplinaTable : IntIdTable("disciplina") {
    var name = varchar("name", 50)
    var docente = varchar("docente", 50)
    var sigla = varchar("sigla", 10)
    var apelido = varchar("apelido", 50)
    var andamento = bool("andamento").default(true)
    var token = varchar("token", 50)
}

class DisciplinaDAO(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<DisciplinaDAO>(DisciplinaTable)
    var name by DisciplinaTable.name
    var docente by DisciplinaTable.docente
    var sigla by DisciplinaTable.sigla
    var apelido by DisciplinaTable.apelido
    var andamento by DisciplinaTable.andamento
    var token by DisciplinaTable.token
}

fun daoToModel(dao: DisciplinaDAO) = Disciplina(
    dao.name,
    dao.docente,
    dao.sigla,
    dao.apelido,
    dao.andamento,
    dao.token,
)

////////////////// Atividades
object AtividadeTable : IntIdTable("atividade") {
    val name = varchar("name", 50)
    val descricao = varchar("descricao", 50)
    val tipo = varchar("tipo", 50)
    val concluido = bool("concluido").default(false)
    val disciplina = varchar("disciplina", 50)
    val token = varchar("token", 50)
    val prazo = date("prazo")
}

class AtividadeDAO(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<AtividadeDAO>(AtividadeTable)
    var name by AtividadeTable.name
    var descricao by AtividadeTable.descricao
    var tipo by AtividadeTable.tipo
    var concluido by AtividadeTable.concluido
    var disciplina by AtividadeTable.disciplina
    var token by AtividadeTable.token
    var prazo by AtividadeTable.prazo
}

fun daoToModel(dao: AtividadeDAO) = Atividade(
    dao.name,
    dao.descricao,
    Tipo.valueOf(dao.tipo),
    dao.concluido,
    dao.disciplina,
    dao.token,
    dao.prazo,
)