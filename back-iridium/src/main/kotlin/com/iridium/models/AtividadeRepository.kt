package com.iridium.models

import Tipo
import Atividade

interface AtividadeRepository {
    suspend fun allAtividades(): List<Atividade>
    suspend fun atividadesByTipo(tipo: Tipo): List<Atividade>
    suspend fun atividadesByConcluido(concluido: Boolean): List<Atividade>
    suspend fun atividadeByName(name: String): Atividade?
    suspend fun addAtividade(atividade: Atividade)
    suspend fun removeAtividade(name: String): Boolean
    suspend fun switchAtividadeConcluido(name: String, disciplina: String): Boolean
}
