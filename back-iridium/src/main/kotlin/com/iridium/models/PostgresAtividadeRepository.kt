package com.iridium.models

import Atividade
import Tipo
import com.iridium.db.AtividadeDAO
import com.iridium.db.AtividadeTable
import com.iridium.db.daoToModel
import com.iridium.db.suspendTransaction
import java.time.LocalDate
import java.sql.Date
//import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
//import org.jetbrains.exposed.sql.transactions.transaction

import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
//import org.jetbrains.exposed.sql.transactions.experimental.suspendTransaction
import org.jetbrains.exposed.sql.deleteWhere
import org.jetbrains.exposed.sql.*

class PostgresAtividadeRepository : AtividadeRepository {
    override suspend fun allAtividades(): List<Atividade> = suspendTransaction {
        AtividadeDAO.all().map(::daoToModel)
    }

    override suspend fun atividadesByTipo(tipo: Tipo): List<Atividade> = suspendTransaction {
        AtividadeDAO
            .find { (AtividadeTable.tipo eq tipo.toString()) }
            .map(::daoToModel)
    }

    override suspend fun atividadesByConcluido(concluido: Boolean): List<Atividade> = suspendTransaction {
        AtividadeDAO
            .find{ (AtividadeTable.concluido eq concluido) }
            .map(::daoToModel)
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
            tipo = atividade.tipo.toString()
            disciplina = atividade.disciplina
            prazo = atividade.prazo
        }
    }

    override suspend fun removeAtividade(name: String): Boolean = suspendTransaction {
        val rowsDeleted = AtividadeTable.deleteWhere {
            AtividadeTable.name eq name
        }
        rowsDeleted == 1
    }

//    override suspend fun switchAtividadePrazo(name: String, prazo: Date) : Boolean = suspendTransaction {
//        val atividade = AtividadeTable.select { AtividadeTable.name eq name }.singleOrNull()
//        if(atividade != null) {
//            val rowsUpdated = AtividadeTable.update({ AtividadeTable.name eq name }) {
//                it.update(AtividadeTable.prazo, prazo)
//            }
//            rowsUpdated == 1
//        } else {
//            false
//        }
//    }

    override suspend fun switchAtividadeTipo(name: String, tipo: String) : Boolean = suspendTransaction {
        val atividade = AtividadeTable.select { AtividadeTable.name eq name }.singleOrNull()
        if(atividade != null) {
            val rowsUpdated = AtividadeTable.update({ AtividadeTable.name eq name }) {
                it[AtividadeTable.tipo] = tipo
            }
            rowsUpdated == 1
        } else {
            false
        }
    }

    override suspend fun switchAtividadeDescricao(name: String, descricao: String) : Boolean = suspendTransaction {
        val atividade = AtividadeTable.select { AtividadeTable.name eq name }.singleOrNull()
        if(atividade != null) {
            val rowsUpdated = AtividadeTable.update({ AtividadeTable.name eq name }) {
                it[AtividadeTable.descricao] = descricao
            }
            rowsUpdated == 1
        } else {
            false
        }
    }

    override suspend fun switchAtividadeName(name: String, newName: String) : Boolean = suspendTransaction {
        val atividade = AtividadeTable.select { AtividadeTable.name eq name }.singleOrNull()
        if(atividade != null) {
            val rowsUpdated = AtividadeTable.update({ AtividadeTable.name eq name }) {
                it[AtividadeTable.name] = newName
            }
            rowsUpdated == 1
        } else {
            false
        }
    }


    override suspend fun switchAtividadeDisciplina(name: String, disciplina: String) : Boolean = suspendTransaction {
        val atividade = AtividadeTable.select { AtividadeTable.name eq name }.singleOrNull()
        if(atividade != null) {
            val rowsUpdated = AtividadeTable.update({ AtividadeTable.name eq name }) {
                it[AtividadeTable.disciplina] = disciplina
            }
            rowsUpdated == 1
        } else {
            false
        }
    }

    override suspend fun switchAtividadeConcluido(name: String, concluido: Boolean): Boolean = suspendTransaction {
        val atividade = AtividadeTable.select { AtividadeTable.name eq name }.singleOrNull()
        if (atividade != null) {
            val rowsUpdated = AtividadeTable.update({ AtividadeTable.name eq name }) {
                it[AtividadeTable.concluido] = concluido
            }
            rowsUpdated == 1
        } else {
            false
        }
    }
}