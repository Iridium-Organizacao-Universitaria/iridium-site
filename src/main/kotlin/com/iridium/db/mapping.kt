package com.iridium.db

import Disciplina
import Atividade
import kotlinx.coroutines.Dispatchers
import org.jetbrains.exposed.sql.Transaction
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction

import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable

////////////////// Disciplinas
object DisciplinaTable : IntIdTable("disciplina") {
    val name = varchar("name", 50)
    val docente = varchar("docente", 50)
    val sigla = varchar("sigla", 10)
    val apelido = varchar("apelido", 50)
}

class DisciplinaDAO(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<DisciplinaDAO>(DisciplinaTable)
    var name by DisciplinaTable.name
    var docente by DisciplinaTable.docente
    var sigla by DisciplinaTable.sigla
    var apelido by DisciplinaTable.apelido
}

//suspend fun <T> suspendTransaction(block: Transaction.() -> T): T =
//    newSuspendedTransaction(Dispatchers.IO, statement = block)

fun daoToModel(dao: DisciplinaDAO) = Disciplina(
    dao.name,
    dao.docente,
    dao.sigla,
    dao.apelido,
)

////////////////// Atividades
object AtividadeTable : IntIdTable("atividade") {
    val name = varchar("name", 50)
    val descricao = varchar("descricao", 50)
    val tipo = varchar("tipo", 10)
}

class AtividadeDAO(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<AtividadeDAO>(AtividadeTable)
    var name by AtividadeTable.name
    var descricao by AtividadeTable.descricao
    var tipo by AtividadeTable.tipo
}

suspend fun <T> suspendTransaction(block: Transaction.() -> T): T =
    newSuspendedTransaction(Dispatchers.IO, statement = block)

fun daoToModel(dao: AtividadeDAO) = Atividade(
    dao.name,
    dao.descricao,
    Tipo.valueOf(dao.tipo)
)