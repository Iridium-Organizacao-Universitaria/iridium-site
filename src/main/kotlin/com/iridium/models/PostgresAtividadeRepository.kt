package com.iridium.models

import Atividade
import com.iridium.db.AtividadeDAO
import com.iridium.db.AtividadeTable
import com.iridium.db.daoToModel
import com.iridium.db.suspendTransaction
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.deleteWhere

class PostgresAtividadeRepository : AtividadeRepository {
    override suspend fun allAtividades(): List<Atividade> = suspendTransaction {
        AtividadeDAO.all().map(::daoToModel)
    }

    override suspend fun atividadeByName(name: String): Atividade? = suspendTransaction {
        AtividadeDAO
            .find { (AtividadeTable.name eq name) }
            .limit(1)
            .map(::daoToModel)
            .firstOrNull()
    }

    override suspend fun addAtividade(atividade: Atividade): Unit = suspendTransaction {
        AtividadeDAO.new {
            name = atividade.name
            descricao = atividade.descricao
        }
    }

    override suspend fun removeAtividade(name: String): Boolean = suspendTransaction {
        val rowsDeleted = AtividadeTable.deleteWhere {
            AtividadeTable.name eq name
        }
        rowsDeleted == 1
    }
}