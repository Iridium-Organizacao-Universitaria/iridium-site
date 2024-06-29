package com.iridium.models

import Disciplina
import com.iridium.db.DisciplinaDAO
import com.iridium.db.DisciplinaTable
import com.iridium.db.daoToModel
import com.iridium.db.suspendTransaction
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.deleteWhere

class PostgresDisciplinaRepository : DisciplinaRepository {
    override suspend fun allDisciplinas(): List<Disciplina> = suspendTransaction {
        DisciplinaDAO.all().map(::daoToModel)
    }

    override suspend fun disciplinasByAndamento(andamento: Boolean): List<Disciplina> = suspendTransaction {
        DisciplinaDAO
            .find { (DisciplinaTable.andamento eq andamento) }
            .map(::daoToModel)
    }

    override suspend fun disciplinaByName(name: String): Disciplina? = suspendTransaction {
        DisciplinaDAO
            .find { (DisciplinaTable.name eq name) }
            .limit(1)
            .map(::daoToModel)
            .firstOrNull()
    }

    override suspend fun addDisciplina(disciplina: Disciplina): Unit = suspendTransaction {
        DisciplinaDAO.new {
            name = disciplina.name
            docente = disciplina.docente
            sigla = disciplina.sigla
            apelido = disciplina.apelido
        }
    }

    override suspend fun removeDisciplina(name: String): Boolean = suspendTransaction {
        val rowsDeleted = DisciplinaTable.deleteWhere {
            DisciplinaTable.name eq name
        }
        rowsDeleted == 1
    }
}