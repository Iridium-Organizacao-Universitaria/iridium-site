package com.iridium.services

import com.iridium.models.Disciplina
import kotlinx.coroutines.Dispatchers
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction
import org.jetbrains.exposed.sql.transactions.transaction
import java.util.*

class DisciplinaServices(database : Database ){
    private object DisciplinaInfo : Table(){
        var id = uuid("id")
        var nome = varchar("nome", 255)
        var sigla = varchar("sigla", 255)
        var docente = varchar("docente", 255)
        var apelido = varchar("apelido", 255)
        var emAndamento = varchar("emAndamento", 5)

        override val primaryKey = PrimaryKey(id)
    }

    // criar as planilhas
    init{
        transaction(database) {
            SchemaUtils.create(DisciplinaInfo)
        }
    }

    private suspend fun <T> dbQuery(block: suspend () -> T): T = newSuspendedTransaction { block()}

    suspend fun save(disciplina: Disciplina): DisciplinaInfo = dbQuery {
        DisciplinaInfo.insertIgnore {
            it[id] = disciplina.id
            it[nome] = disciplina.nome
            it[sigla] = disciplina.sigla
            it[docente] = disciplina.docente
            it[apelido] = disciplina.apelido
            it[emAndamento] = disciplina.emAndamento
        }.let {
            Disciplina(
                id = it[DisciplinaInfo.id],
                nome = it[DisciplinaInfo.nome],
                sigla = it[DisciplinaInfo.sigla],
                docente = it[DisciplinaInfo.docente],
                apelido = it[DisciplinaInfo.apelido],
                emAndamento = it[DisciplinaInfo.emAndamento]
            )
        }
    }

    // por isso criei o ID
    suspend fun delete(disciplinaID: UUID, id: UUID){
        dbQuery {
            DisciplinaInfo.deleteWhere { (DisciplinaInfo.id eq disciplinaID) and (DisciplinaInfo.id.eq(id)) }
        }
    }

}