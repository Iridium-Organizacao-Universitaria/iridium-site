package com.iridium.models

import Atividade

interface AtividadeRepository {
    suspend fun allAtividades(): List<Atividade>
    suspend fun atividadeByName(name: String): Atividade?
    suspend fun addAtividade(atividade: Atividade)
    suspend fun removeAtividade(name: String): Boolean
}

