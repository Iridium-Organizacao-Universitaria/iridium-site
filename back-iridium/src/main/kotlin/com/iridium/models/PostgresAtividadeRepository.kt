package com.iridium.models

import Atividade
import Tipo
import com.iridium.db.AtividadeDAO
import com.iridium.db.AtividadeTable
import com.iridium.db.daoToModel
import com.iridium.db.suspendTransaction
//import java.time.LocalDate
//import java.sql.Date
//import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
//import org.jetbrains.exposed.sql.transactions.transaction

import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
//import org.jetbrains.exposed.sql.transactions.experimental.suspendTransaction
import org.jetbrains.exposed.sql.deleteWhere
import org.jetbrains.exposed.sql.*

class PostgresAtividadeRepository : AtividadeRepository {
    override suspend fun allAtividades(token: String): List<Atividade> = suspendTransaction {
        AtividadeDAO
            .find { AtividadeTable.token eq token }
            .map(::daoToModel)
    }

    override suspend fun atividadesByTipo(tipo: Tipo, token: String): List<Atividade> = suspendTransaction {
        AtividadeDAO
            .find { (AtividadeTable.tipo eq tipo.toString()) and (AtividadeTable.token eq token) }
            .map(::daoToModel)
    }

    override suspend fun atividadesByConcluido(concluido: Boolean, token: String): List<Atividade> = suspendTransaction {
        AtividadeDAO
            .find { (AtividadeTable.concluido eq concluido) and (AtividadeTable.token eq token) }
            .map(::daoToModel)
    }

    override suspend fun atividadeByName(name: String, token: String): Atividade? = suspendTransaction {
        AtividadeDAO
            .find { (AtividadeTable.name eq name) and (AtividadeTable.token eq token) }
            .limit(1)
            .map(::daoToModel)
            .firstOrNull()
    }

    override suspend fun addAtividade(atividade: Atividade, token: String): Unit = suspendTransaction {
        AtividadeDAO.new {
            name = atividade.name
            descricao = atividade.descricao
            tipo = atividade.tipo.toString()
            disciplina = atividade.disciplina
            prazo = atividade.prazo
            this.token = token
        }
    }

    override suspend fun removeAtividade(name: String, token: String): Boolean = suspendTransaction {
        val rowsDeleted = AtividadeTable.deleteWhere {
            (AtividadeTable.name eq name) and (AtividadeTable.token eq token)
        }
        rowsDeleted == 1
    }

    override suspend fun switchAtividadeTipo(name: String, tipo: String, token: String): Boolean = suspendTransaction {
        val atividade = AtividadeTable.select { (AtividadeTable.name eq name) and (AtividadeTable.token eq token) }.singleOrNull()
        if (atividade != null) {
            val rowsUpdated = AtividadeTable.update({ (AtividadeTable.name eq name) and (AtividadeTable.token eq token) }) {
                it[AtividadeTable.tipo] = tipo
            }
            rowsUpdated == 1
        } else {
            false
        }
    }

    override suspend fun switchAtividadeDescricao(name: String, descricao: String, token: String): Boolean = suspendTransaction {
        val atividade = AtividadeTable.select { (AtividadeTable.name eq name) and (AtividadeTable.token eq token) }.singleOrNull()
        if (atividade != null) {
            val rowsUpdated = AtividadeTable.update({ (AtividadeTable.name eq name) and (AtividadeTable.token eq token) }) {
                it[AtividadeTable.descricao] = descricao
            }
            rowsUpdated == 1
        } else {
            false
        }
    }

    override suspend fun switchAtividadeName(name: String, newName: String, token: String): Boolean = suspendTransaction {
        val atividade = AtividadeTable.select { (AtividadeTable.name eq name) and (AtividadeTable.token eq token) }.singleOrNull()
        if (atividade != null) {
            val rowsUpdated = AtividadeTable.update({ (AtividadeTable.name eq name) and (AtividadeTable.token eq token) }) {
                it[AtividadeTable.name] = newName
            }
            rowsUpdated == 1
        } else {
            false
        }
    }

    override suspend fun switchAtividadeDisciplina(name: String, disciplina: String, token: String): Boolean = suspendTransaction {
        val atividade = AtividadeTable.select { (AtividadeTable.name eq name) and (AtividadeTable.token eq token) }.singleOrNull()
        if (atividade != null) {
            val rowsUpdated = AtividadeTable.update({ (AtividadeTable.name eq name) and (AtividadeTable.token eq token) }) {
                it[AtividadeTable.disciplina] = disciplina
            }
            rowsUpdated == 1
        } else {
            false
        }
    }

    override suspend fun switchAtividadeConcluido(name: String, concluido: Boolean, token: String): Boolean = suspendTransaction {
        val atividade = AtividadeTable.select { (AtividadeTable.name eq name) and (AtividadeTable.token eq token) }.singleOrNull()
        if (atividade != null) {
            val rowsUpdated = AtividadeTable.update({ (AtividadeTable.name eq name) and (AtividadeTable.token eq token) }) {
                it[AtividadeTable.concluido] = concluido
            }
            rowsUpdated == 1
        } else {
            false
        }
    }

//    override suspend fun switchAtividadePrazo(name: String, prazo: Date, token: String) : Boolean = suspendTransaction {
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
}