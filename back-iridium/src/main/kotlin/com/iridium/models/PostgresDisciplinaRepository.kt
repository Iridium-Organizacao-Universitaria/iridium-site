package com.iridium.models

import Disciplina
import com.iridium.db.DisciplinaDAO
import com.iridium.db.DisciplinaTable
import com.iridium.db.daoToModel
import com.iridium.db.suspendTransaction
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.*


class PostgresDisciplinaRepository : DisciplinaRepository {
    override suspend fun allDisciplinas(token: String): List<Disciplina> = suspendTransaction {
        DisciplinaDAO
            .find { (DisciplinaTable.token eq token) }
            .map(::daoToModel)
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

    override suspend fun switchDisciplinaAndamento(name: String, andamento: Boolean ): Boolean = suspendTransaction {
        val disciplina = DisciplinaTable.select { DisciplinaTable.name eq name }.singleOrNull()
        if (disciplina != null) {
            val rowsUpdated = DisciplinaTable.update({ DisciplinaTable.name eq name }) {
                it[DisciplinaTable.andamento] = andamento
            }
            rowsUpdated == 1
        } else {
            false
        }
    }

    override suspend fun switchDisciplinaSigla(name: String, sigla: String): Boolean = suspendTransaction {
        val disciplina = DisciplinaTable.select { DisciplinaTable.name eq name }.singleOrNull()
        if(disciplina != null) {
            val rowsUpdated = DisciplinaTable.update({ DisciplinaTable.name eq name }) {
                it[DisciplinaTable.sigla] = sigla
            }
            rowsUpdated == 1
        } else {
            false
        }
    }

    override suspend fun switchDisciplinaDocente(name: String, docente: String ): Boolean = suspendTransaction {
        val disciplina = DisciplinaTable.select { DisciplinaTable.name eq name }.singleOrNull()
        if(disciplina != null) {
            val rowsUpdated = DisciplinaTable.update({ DisciplinaTable.name eq name }) {
                it[DisciplinaTable.docente] = docente
            }
            rowsUpdated == 1
        } else {
            false
        }
    }

    override suspend fun switchDisciplinaApelido(name: String, apelido: String ): Boolean = suspendTransaction {
        val disciplina = DisciplinaTable.select { DisciplinaTable.name eq name }.singleOrNull()
        if(disciplina != null) {
            val rowsUpdated = DisciplinaTable.update({ DisciplinaTable.name eq name }) {
                it[DisciplinaTable.apelido] = apelido
            }
            rowsUpdated == 1
        } else {
            false
        }
    }
}
