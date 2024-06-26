package com.iridium.db

import Disciplina
import kotlinx.coroutines.Dispatchers
import org.jetbrains.exposed.sql.Transaction
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction

import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable

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

suspend fun <T> suspendTransaction(block: Transaction.() -> T): T =
    newSuspendedTransaction(Dispatchers.IO, statement = block)


fun daoToModel(dao: DisciplinaDAO) = Disciplina(
    dao.name,
    dao.docente,
    dao.sigla,
    dao.apelido,
)