package com.iridium.models

import Tipo
import Atividade
import java.time.LocalDate
import java.sql.Date

interface AtividadeRepository {
    suspend fun allAtividades(token: String): List<Atividade>
    suspend fun atividadesByTipo(tipo: Tipo, token: String): List<Atividade>
    suspend fun atividadesByConcluido(concluido: Boolean, token: String): List<Atividade>
    suspend fun atividadeByName(name: String, token: String): Atividade?
    suspend fun addAtividade(atividade: Atividade, token: String)
    suspend fun removeAtividade(name: String, token: String): Boolean
//    suspend fun switchAtividadePrazo(name: String, prazo: Date, token: String) : Boolean
    suspend fun switchAtividadeTipo(name: String, tipo: String, token: String) : Boolean
    suspend fun switchAtividadeDescricao(name: String, descricao: String, token: String) : Boolean
    suspend fun switchAtividadeDisciplina(name: String, disciplina: String, token: String) : Boolean
    suspend fun switchAtividadeName(name: String, newName: String, token: String) : Boolean
    suspend fun switchAtividadeConcluido(name: String, concluido: Boolean, token: String): Boolean
}
